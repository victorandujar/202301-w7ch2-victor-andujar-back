import { Router } from "express";
import multer from "multer";
import {
  createRobot,
  deleteRobotById,
  getRobotById,
  getRobots,
} from "../../controllers/robotsControllers/robotsControllers.js";

import auth from "../../middlewares/auth.js";
export const robotsRouter = Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename(req, file, callBack) {
    callBack(null, file.originalname);
  },
});

const upload = multer({ storage });

robotsRouter.get("/", getRobots);
robotsRouter.get("/:idRobot", getRobotById);
robotsRouter.delete("/delete/:idRobot", auth, deleteRobotById);
robotsRouter.post("/create/", upload.single("url"), createRobot);
