import { Dispatch } from "redux";

import { api } from "../../api";
import { CREATE, DELETE, FETCHPOST, FETCH_ALL, TOGGLEFAVORITEFROMIMAGECARD, TOGGLEFAVORITEFROMIMAGEPAGE, UPDATE } from "../constants";

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

export const updatePost = (id: string, post: IPostData) => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.patch(`/posts/${id}`, post)
    dispatch({ type: UPDATE, payload: data })
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

export const toggleFavoritePostFromImageCard = (id: string, isFavorite: Boolean) => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.put(`/posts/${id}`, { isFavorite })

    dispatch({ type: TOGGLEFAVORITEFROMIMAGECARD, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const toggleFavoritePostFromImagePage = (id: string, isFavorite: Boolean) => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.put(`/posts/${id}`, { isFavorite })

    dispatch({ type: TOGGLEFAVORITEFROMIMAGEPAGE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const deletePost = (id: string) => async (dispatch: Dispatch) => {
  try {
    await api.delete(`/posts/${id}`)
    dispatch({ type: DELETE, payload: id })
  } catch (error: any) {
      console.log(error)
  }
}