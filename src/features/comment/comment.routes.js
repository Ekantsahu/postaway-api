import express from "express";
import CommentController from "./comment.controller.js";

const router = express.Router();

router.get("/:id", CommentController.getComments);

router.post("/:id", CommentController.addComment);

router.put("/:id", CommentController.updateComment);

router.delete("/:id", CommentController.deleteComment);

export default router;