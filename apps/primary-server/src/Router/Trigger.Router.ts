import { Router } from "express";
import { prisma } from "@repo/database";

const router = Router();

router.get("/available", async (req, res) => {
    const availableTriggers = await prisma.availableTriggers.findMany({});
    res.json({
        availableTriggers
    })
});

export const triggerRouter = router;