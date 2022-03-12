import { Router } from "express";

import { createPost } from "./controllers/CreatePost";
import { getPosts } from "./controllers/GetPosts";
import { GetUniquePost } from "./controllers/GetUniquePost";
import { favTogglePost } from "./controllers/FavTogglePost"

const router = Router()

router.get('/posts', getPosts)
router.post('/posts', createPost)
router.get('/posts/:postId', GetUniquePost)
router.put('/posts/:postId', favTogglePost)

export { router }