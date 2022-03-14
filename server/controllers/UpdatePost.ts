import { Request, Response } from "express"
import mongoose from "mongoose"
import PostImage from "../models/PostImage"

export const updatePost = async (req: Request, res: Response) => {
  const { postId } = req.params
  const post = req.body

  if(!mongoose.Types.ObjectId.isValid(postId)) return res.status(404).send('No post with that id')

  const updatedPost = await PostImage.findByIdAndUpdate(postId, post, { new: true })

  res.json(updatedPost)
}