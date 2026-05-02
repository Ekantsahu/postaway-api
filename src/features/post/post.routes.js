import express from "express";
import PostController from "./post.controller.js";
import { upload } from "../../middleware/fileUpload.middleware.js";

const router = express.Router();

router.get("/all", PostController.getAllPosts);
router.get("/filter", PostController.filterPosts);
router.get("/",PostController.getUserPosts);
router.get("/:id", PostController.getPostById);

router.post("/",upload.single("image"), PostController.createPost);
// router.post("/", (req, res) => {
//   res.json({ success: true, message: "POST works" });
// });
router.put("/:id",upload.single("image"), PostController.updatePost);
router.delete("/:id", PostController.deletePost);

export default router;
