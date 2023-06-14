import { Router } from "express";
import {getAll, getOne, create, update, remove, getEventsByLocation} from "../controllers/locationController.js";
const router = Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.get("/events/:id", getEventsByLocation);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;