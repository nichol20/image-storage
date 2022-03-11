import { Dispatch } from "redux";

import { api } from "../../api";
import { CREATE, FETCHPOST, FETCH_ALL } from "../constants";

interface IPostData {
  title: string
  tags: string[] | unknown
  imageFile: string
}


export const getPosts = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.get('/posts')
    dispatch({ type: FETCH_ALL, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const createPost = (post: IPostData) => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.post('/posts', post)
    dispatch({ type: CREATE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const getUniquePost = (id: string) => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.get(`/posts/${id}`)

    dispatch({ type: FETCHPOST, payload: data})
  } catch (error) {
    console.log(error)
  }
}