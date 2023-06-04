import express from "express";
import * as postController from "../controllers/post";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

router.get("/all", postController.getPosts);
router.get("/limit", postController.getPostsLimit);
router.get("/new-post", postController.getNewPosts);
router.post("/", verifyToken, postController.createNewPost);
router.get("/", postController.getMyPost);
router.put("/", postController.updateMyPost);
router.delete("/:id", postController.removeMyPost);

export default router;
