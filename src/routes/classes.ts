import express from "express";
import {classes, subjects, user} from "../db/Schema/index.js";
import {db} from "../db/index.js";
import {and, desc, eq, getTableColumns, ilike, or, sql} from "drizzle-orm";

import { randomBytes } from "crypto";

const router = express.Router();

// Get all classes with optional search, subject, teacher filters, and pagination
router.get("/", async (req, res) => {
    try {
        const { search, subject, teacher, page = 1, limit = 10 } = req.query;

        // const currentPage = Math.max(1, +page);
        // const limitPerPage = Math.max(1, +limit);

        const parsedPage = Number(page);
        const parsedLimit = Number(limit);
        const currentPage = Number.isFinite(parsedPage) && parsedPage > 0 ? Math.floor(parsedPage) : 1;
        const limitPerPage = Number.isFinite(parsedLimit) && parsedLimit > 0 ? Math.min(parsedLimit, 100) : 10;

        const offset = (currentPage - 1) * limitPerPage;

        const filterConditions = [];

        if (search) {
            filterConditions.push(
                or(
                    ilike(classes.name, `%${search}%`),
                    ilike(classes.inviteCode, `%${search}%`)
                )
            );
        }

        if (subject) {
            filterConditions.push(ilike(subjects.name, `%${subject}%`));
        }

        if (teacher) {
            filterConditions.push(ilike(user.name, `%${teacher}%`));
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