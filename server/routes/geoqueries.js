import { Router } from "express";
import { getAllNearby as getAllEvents } from "../controllers/eventController.js";
import { getAllNearby as getAllInstitutions } from "../controllers/institutionController.js";

const router = Router();

router.get("/nearbyinstitutions", getAllInstitutions);
router.get("/nearbyevents", getAllEvents);

export default router;
