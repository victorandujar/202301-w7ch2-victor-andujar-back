import { Router } from "express";
import multer from "multer";
import {
  loginUser,
  registerUser,
} from "../../controllers/usersControllers/usersControllers.js";

const usersRouter = Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename(req, file, callBack) {
    callBack(null, file.originalname);
  },
});

const upload = multer({ storage });

usersRouter.post("/login", loginUser);
usersRouter.post("/register", upload.single("image"), registerUser);

export default usersRouter;
