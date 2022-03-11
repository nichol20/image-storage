import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getUniquePost } from '../../redux/actions/posts'
import { IPostDataFromServer } from '../MainPage/MainPage'
import * as img from '../../images'

import './style.css'

interface IState {
  posts: IPostDataFromServer
}

export const ImagePage = () => {
  const { postId } = useParams()
  const dispatch = useDispatch()
  const post = useSelector((state: IState) => state.posts)

  useEffect(() => {
    dispatch(getUniquePost(postId!))
  }, [dispatch, postId])

  return (
    <div className="image-page">
      <div className="container-image-page">
        <div className="image-box-image-page">
          <img src={post.imageFile} alt={post.title}/>
        </div>

        <ul className="functionalities-image-page">
            <li>
              <div className="fav-functionality">  
                <input type='checkbox' />
                <img src={img.heartIcon} alt="heart icon" />
              </div>
            </li>
            <li>
              <a href={post.imageFile} download={post.title} >
                <img src={img.downloadIcon} alt="download icon" />
              </a>
            </li>
            <li>
              <button className='full-image-toggle'>

              </button>
            </li>
          </ul>
      </div>
    </div>
  )
}

