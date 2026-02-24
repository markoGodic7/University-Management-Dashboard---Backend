import express from "express";
import {classes, departments, subjects, user} from "../db/Schema/index.js";
import {db} from "../db/index.js";
import {and, desc, eq, getTableColumns, ilike, or, sql} from "drizzle-orm";

import { randomBytes } from "crypto";

const router = express.Router();

// Get all classes with optional search, subject, teacher filters, and pagination
router.get("/", async (req, res) => {
    try {
        const { search, subject, teacher, page = 1, limit = 10 } = req.query;
        const normalizeQuery = (value: unknown) =>
            Array.isArray(value) ? value[0] : typeof value === "string" ? value : undefined;
        const searchTerm = normalizeQuery(search)?.trim();
        const subjectTerm = normalizeQuery(subject)?.trim();
        const teacherTerm = normalizeQuery(teacher)?.trim();

        const parsedPage = Number(page);
        const parsedLimit = Number(limit);
        const currentPage = Number.isFinite(parsedPage) && parsedPage > 0 ? Math.floor(parsedPage) : 1;
        const limitPerPage = Number.isFinite(parsedLimit) && parsedLimit > 0 ? Math.min(parsedLimit, 100) : 10;

        const offset = (currentPage - 1) * limitPerPage;

        const filterConditions = [];

        if (searchTerm) {
            filterConditions.push(
                or(
                    ilike(classes.name, `%${searchTerm}%`),
                    ilike(classes.inviteCode, `%${searchTerm}%`)
                )
            );
        }

        if (subjectTerm) {
            filterConditions.push(ilike(subjects.name, `%${subjectTerm}%`));
        }

        if (teacherTerm) {
            filterConditions.push(ilike(user.name, `%${teacherTerm}%`));
        }

        const whereClause =
            filterConditions.length > 0 ? and(...filterConditions) : undefined;

        const countResult = await db
            .select({ count: sql<number>`count(*)` })
            .from(classes)
            .leftJoin(subjects, eq(classes.subjectId, subjects.id))
            .leftJoin(user, eq(classes.teacherId, user.id))
            .where(whereClause);

        const totalCount = countResult[0]?.count ?? 0;

        const classesList = await db
            .select({
                ...getTableColumns(classes),
                subject: {
                    ...getTableColumns(subjects),
                },
                teacher: {
                    id: user.id,
                    name: user.name,
                    image: user.image,
                },
            })
            .from(classes)
            .leftJoin(subjects, eq(classes.subjectId, subjects.id))
            .leftJoin(user, eq(classes.teacherId, user.id))
            .where(whereClause)
            .orderBy(desc(classes.createdAt))
            .limit(limitPerPage)
            .offset(offset);

        res.status(200).json({
            data: classesList,
            pagination: {
                page: currentPage,
                limit: limitPerPage,
                total: totalCount,
                totalPages: Math.ceil(totalCount / limitPerPage),
            },
        });
    } catch (error) {
        console.error("GET /classes error:", error);
        res.status(500).json({ error: "Failed to fetch classes" });
    }
});

// Get classes details with techer, subject and department
router.get("/:id", async(req, res) => {
    // const classId = Number(req.params.id);
    //
    // if(!Number.isFinite(classId)) return res.status(400).json({ error: "No Class found" });
    //
    // const[classDetails] = await db
    //     .select({
    //         ...getTableColumns(classes),
    //         subjects: {
    //             ...getTableColumns(subjects),
    //         },
    //         department: {
    //             ...getTableColumns(departments),
    //         },
    //         teacher: {
    //             ...getTableColumns(user),
    //             id: user.id,
    //             name: user.name,
    //             image: user.image,
    //         }
    //     })
    //     .from(classes)
    //     .leftJoin(subjects, eq(classes.subjectId, subjects.id))
    //     .leftJoin(user, eq(classes.teacherId, user.id))
    //     .leftJoin(departments, eq(subjects.departmentId, departments.id))
    //     .where(eq(classes.id, classId))
    //
    //     if(!classDetails) return res.status(404).json({ error: "No class found" });
    //
    //     res.status(200).json({ data: classDetails });

    try {
        const classId = Number(req.params.id);
        if (!Number.isInteger(classId) || classId <= 0) {
            return res.status(400).json({ error: "Invalid class id" });
        }

        const [classDetails] = await db
            .select({
                ...getTableColumns(classes),
                subjects: {
                    ...getTableColumns(subjects),
                },
                department: {
                    ...getTableColumns(departments),
                },
                teacher: {
                    ...getTableColumns(user),
                    id: user.id,
                    name: user.name,
                    image: user.image,
                }
            })
            .from(classes)
            .leftJoin(subjects, eq(classes.subjectId, subjects.id))
            .leftJoin(user, eq(classes.teacherId, user.id))
            .leftJoin(departments, eq(subjects.departmentId, departments.id))
            .where(eq(classes.id, classId));

        if (!classDetails) return res.status(404).json({ error: "Class not found" });

        res.status(200).json({ data: classDetails });
    } catch (error) {
        console.error("GET /classes/:id error:", error);
        res.status(500).json({ error: "Failed to fetch class" });
    }

})

router.post('/', async (req, res) => {
    try {
        const {
            name,
            teacherId,
            subjectId,
            capacity,
            description,
            status,
            bannerUrl,
            bannerCldPubId,
            } = req.body;

        if (!name || !teacherId || !subjectId) {
            return res.status(400).json({ error: "name, teacherId, and subjectId are required" });
        }

        const parsedCapacity = capacity == null ? undefined : Number(capacity);
        const isValidNumber = parsedCapacity !== undefined && Number.isFinite(parsedCapacity);

        if (capacity != null && (!isValidNumber || parsedCapacity! <= 0)) {
            return res.status(400).json({ error: "capacity must be a positive number" });
        }

        const [createdClass] = await db
            .insert(classes)
            .values({
                subjectId,
                inviteCode: randomBytes(8).toString("hex"),
                name,
                teacherId,
                bannerCldPubId,
                bannerUrl,
                capacity,
                description,
                schedules: [],
                status,
            })
            .returning({ id: classes.id });


        if(!createdClass) throw Error;

        res.status(201).json({ data: createdClass });
    }catch(e){
        console.error(`POST /classes error ${e}`);
        res.status(500).json({error: e});
    }
})

export default router;