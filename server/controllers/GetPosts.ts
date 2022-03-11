import { Request, Response } from "express"

import PostImage from "../models/PostImage"

export const getPosts = async (req: Request, res: Response) => {
    try {
        const postMessages = await PostImage.find()

        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}