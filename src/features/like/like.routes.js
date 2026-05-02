import express from "express";
import LikeController from "./like.controller.js";

const router = express.Router();

router.get("/:postId", LikeController.getLikes);

router.get("/toggle/:postId", LikeController.toggleLike);

export default router;