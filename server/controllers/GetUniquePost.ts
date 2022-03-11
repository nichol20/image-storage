import { Request, Response } from "express"
import mongoose from "mongoose"

import PostImage from "../models/PostImage"

export const GetUniquePost = async (req: Request, res: Response) => {
    const { postId } = req.params

    if(!mongoose.Types.ObjectId.isValid(postId)) return res.status(404).send('no post with that id')

    const post = await PostImage.findById(postId)

    res.json(post)
}