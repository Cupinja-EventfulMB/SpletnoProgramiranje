import { Router } from "express";
import { getAll, create, getOne, update, remove, getInstitutionEvents } from "../controllers/institutionController.js";
const router = Router();


router.get("/", getAll);

router.get("/:id", getOne);

router.get("/:id/getEvents", getInstitutionEvents);

router.post("/", create);

router.put("/:id", update );

router.delete("/:id", remove );


export default router;