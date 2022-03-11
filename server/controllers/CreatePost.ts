import { Request, Response } from "express"

import PostImage from "../models/PostImage"

export const createPost = async (req: Request, res: Response) => {
  const post = req.body
  const newPost = new PostImage(post)

  try {
      await newPost.save()

      res.status(201).json(newPost)
  } catch (error) {
      res.status(409).json({ message: error.message })
  }
}