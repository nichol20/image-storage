import { Request, Response } from "express"
import mongoose from "mongoose"
import PostImage from "../models/PostImage"

export const favTogglePost = async (req: Request, res: Response) => {
  const { postId } = req.params
  const { isFavorite } = req.body

  if(!mongoose.Types.ObjectId.isValid(postId)) return res.status(404).json('No post with that id')

  const updatedPost = await PostImage.findByIdAndUpdate(postId, { favorite: isFavorite }, { new: true })

  res.json(updatedPost)
}