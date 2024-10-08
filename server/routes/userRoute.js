import { Router } from "express";
import { getAll, create, getOne, update, remove, getUserEvents } from "../controllers/userController.js";
const router = Router();


router.get("/", getAll);

router.get("/:id", getOne);

router.get("/:id/events", getUserEvents);

router.post("/", create);

router.put("/:id", update );

router.delete("/:id", remove );


export default router;