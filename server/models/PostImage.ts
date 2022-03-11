import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  title: String,
  tags: [String],
  imageFile: String,
  favorite: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
})

const PostImage = mongoose.model('PostImage', imageSchema)

export default PostImage