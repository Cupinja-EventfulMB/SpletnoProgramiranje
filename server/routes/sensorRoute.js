import { Router } from "express";
import { getAll, getOne, create, remove } from "../controllers/sensorController.js";
const sensorRouter = Router();

sensorRouter.get("/", getAll);

sensorRouter.get("/:id", getOne);

sensorRouter.post("/", create);

sensorRouter.delete("/:id", remove);

export default sensorRouter;