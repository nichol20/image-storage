import { Router } from "express";

import { createPost } from "./controllers/CreatePost";
import { getPosts } from "./controllers/GetPosts";
import { GetUniquePost } from "./controllers/GetUniquePost";
import { favTogglePost } from "./controllers/FavTogglePost"
import { updatePost } from "./controllers/UpdatePost";
import { deletePost } from "./controllers/DeletePost";

const router = Router()

router.post('/posts', createPost)
router.get('/posts', getPosts)
router.get('/posts/:postId', GetUniquePost)
router.patch('/posts/:postId', updatePost)
router.put('/posts/:postId', favTogglePost)
router.delete('/posts/:postId', deletePost)

export { router }