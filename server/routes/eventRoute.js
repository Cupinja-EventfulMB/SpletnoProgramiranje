import { Router } from "express";
import { getAll, create, getOne, update, remove, going, notGoing } from "../controllers/eventController.js";
const router = Router();


router.get("/", getAll);

router.get("/:id", getOne);

router.post("/", create);

router.put("/:id", update );

router.delete("/:id", remove );

router.post("/going", going);

router.delete("/going", notGoing);


export default router;