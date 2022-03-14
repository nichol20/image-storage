import { Request, Response } from "express"
import mongoose from "mongoose"
import PostImage from "../models/PostImage"

export const deletePost = async (req: Request, res: Response) => {
  const { postId } = req.params
  
  if(!mongoose.Types.ObjectId.isValid(postId)) return res.status(404).send('No post with that id')

  await PostImage.findByIdAndRemove(postId)

  res.json({ message: 'Post deleted succesfully' })
}