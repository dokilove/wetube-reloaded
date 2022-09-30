import express, { application } from "express";
import {
  registerView,
  createComment,
  deleteComment,
} from "../controllers/videoControllers";
import { protectorMiddleware } from "../middlewares";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter
  .route("/videos/:id([0-9a-f]{24})/comment")
  .all(protectorMiddleware)
  .post(createComment);

apiRouter
  .route("/comments/:id([0-9a-f]{24})")
  .all(protectorMiddleware)
  .delete(deleteComment);

export default apiRouter;
