import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { deletePost, getUniquePost, toggleFavoritePostFromImagePage } from '../../redux/actions/posts'
import { IPostDataFromServer } from '../MainPage/MainPage'
import * as img from '../../images'

import './style.css'
import { AddImage } from '../AddImage/AddImage'

interface IState {
  posts: IPostDataFromServer
}

export const ImagePage = () => {
  const { postId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const post = useSelector((state: IState) => state.posts)
  const [ showFullImage, setShowFullImage ] = useState(false)
  const [ addImageWindow, setAddImageWindow ] = useState(false)

  useEffect(() => {
    dispatch(getUniquePost(postId!))
  }, [dispatch, postId])

  const deleteImage = (id: string) => {
    dispatch(deletePost(id))
    setTimeout(() => navigate('/'), 1000)
  }

  return (
    <div className="image-page">
      { addImageWindow ? (
        <AddImage
         setAddImageWindow={setAddImageWindow} 
         currentId={postId} 
         props={{imageFile: post.imageFile, tags: post.tags, title: post.title}}
        />
      ) : (<></>)}
      <div className="container-image-page">
        <div className={`image-box-image-page ${ showFullImage ? '' : 'normal'}`}>
          <img src={post.imageFile} alt={post.title}/>
        </div>

        <ul className="functionalities-image-page">
            <li>
              <div className="fav-functionality">  
                <input
                 type='checkbox'
                 onChange={() => dispatch(toggleFavoritePostFromImagePage(post._id, !post.favorite))}
                />
                <img src={img.heartIcon} alt="heart icon" className={ post.favorite ? 'favorited' : ''} />
              </div>
            </li>
            <li>
              <a href={post.imageFile} download={post.title} >
                <img src={img.downloadIcon} alt="download icon" />
              </a>
            </li>
            <li>
              <button onClick={() => setAddImageWindow(true)}>
                <img src={img.pencilIcon} alt="pencil icon" />
              </button>
            </li>
            <li>
              <button onClick={() => deleteImage(postId!)}>
                <img src={img.trashIcon} alt="trash icon" />
              </button>
            </li>
            <li>
              <button className='full-image-toggle' onClick={() => setShowFullImage(!showFullImage)} >
                <img
                 src={ showFullImage ? img.contractIcon : img.expandIcon }
                 alt={ showFullImage ? 'contract' : 'expand' } 
                />
              </button>
            </li>
          </ul>
      </div>
    </div>
  )
}

