import { Router } from "express";
import { getAll, create, getOne, update, remove } from "../controllers/eventController.js";
import { getAll, create, getOne, update, remove } from "../controllers/institutionController.js";
const router = Router();

//EVENT ROUTES
router.get("/event", getAll);

router.get("/event/:id", getOne);

router.post("/event", create);

router.put("/event/:id", update );

router.delete("/event/:id", remove );

//INSTITUTION ROUTES

//USER ROUTES


export default router;