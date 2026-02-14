import express from "express";
import {and, desc, eq, getTableColumns, ilike, or, sql} from "drizzle-orm";
import {departments, subjects} from "../db/Schema";
import { db } from "../db"

const router = express.Router();

router.get("/", async (req, res) => {
    try {

        const {search, department, page = 1, limit = 10} = req.query;
        const rawPage = Array.isArray(page) ? page[0] : page;
        const rawLimit = Array.isArray(limit) ? limit[0] : limit;
        const pageNum = Number(rawPage);
        const limitNum = Number(rawLimit);
        const currentPage = Number.isFinite(pageNum) && pageNum > 0 ? Math.floor(pageNum) : 1;
        const limitPerPage = Number.isFinite(limitNum) && limitNum > 0
          ? Math.min(100, Math.floor(limitNum))
          : 10;

        const offset = (currentPage - 1) * limitPerPage;

        const filterConditions = [];

        // If search query exists, filter by subject name or subject code
        if (search) {
            filterConditions.push(
                or(
                    ilike(subjects.name, `%${search}%`),
                    ilike(subjects.code, `%${search}%`),
                )
            );
        }

        // If department filter exists, match department name
        if (department) {
            const deptPattern = `%${String(department).replace(/[%_]/g, '\\$&')}%`;
            filterConditions.push(ilike(departments.name, deptPattern));
        }

        // Combine all filters using AND if any exists
        const whereClause = filterConditions.length > 0 ? and(...filterConditions) : undefined;

        const countResults = await db
            .select({count: sql<number>`count(*)`})
            .from(subjects)
            .leftJoin(departments, eq(subjects.departmentId, departments.id))
            .where(whereClause);

        const totalCount = countResults[0]?.count ?? 0;

        const subjectsList = await db
            .select({
                ...getTableColumns(subjects),
                department: {...getTableColumns(departments)},
            }).from(subjects).leftJoin(departments, eq(subjects.departmentId, departments.id))
            .where(whereClause).orderBy(desc(subjects.createdAt))
            .limit(limitPerPage)
            .offset(offset);


        res.status(200).json({
            data: subjectsList,
            pagination: {
                page: currentPage,
                limit: limitPerPage,
                total: totalCount,
                totalPages: Math.ceil(totalCount / limitPerPage),
            },
        });

    }catch (e) {
        console.error(`GET /subjects error: ${e}`);
        res.status(500).json({error: 'Failed to get subjects'});
    }
});

export default router;