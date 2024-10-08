import { Router } from "express";
import { getAll, create, getOne, update, remove } from "../controllers/notificationController.js";
const router = Router();


router.get("/", getAll);

router.get("/:id", getOne);

router.post("/", create);

router.put("/:id", update );

router.delete("/:id", remove );


export default router;