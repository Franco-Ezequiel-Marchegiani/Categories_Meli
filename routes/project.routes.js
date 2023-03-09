import { Router } from "express";
const router = Router();

router.get("/Projects");
router.post("/Projects");
router.put("/Projects/:id");
router.delete("/Projects/id");
router.get("/Projects/:id");

export default router;