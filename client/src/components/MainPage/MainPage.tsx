import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ImageCard } from '../ImageCard/ImageCard'
import { AddImage } from '../AddImage/AddImage'
import { searchIcon, addIcon } from '../../images'
import { getPosts } from '../../redux/actions/posts'

import './style.css'

export interface IPostDataFromServer {
  title: string
  tags: string[]
  imageFile: string
  favorite: Boolean
  createdAt:  Date
  _id: string
}

interface IState {
  posts: IPostDataFromServer[]
}

type FilteredData = IPostDataFromServer[]

export const MainPage = () => {
  const [ searchTerm, setSeatchTerm ] = useState('')
  const [ addImageWindow, setAddImageWindow ] = useState(false)
  const [ postFiltered, setPostFiltered ] = useState<FilteredData>(Array)
  const dispatch = useDispatch()
  const posts = useSelector((state: IState) => state.posts)

  useEffect(() => {
    const showSearchedPosts = () => {
      let filteredData: FilteredData = []
  
      posts.forEach(post => {
        const filteredTags = post.tags.filter(tag => tag.includes(searchTerm))
  
        filteredTags.forEach(tag => {
          if(post.tags.includes(tag) && !filteredData.includes(post)) {
            filteredData.push(post)
          }
        })
      })
  
      setPostFiltered(filteredData)
    }

    if(posts.length > 0) {
      showSearchedPosts()
    }
  }, [posts, searchTerm])

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  if(!posts) {
    return (<>Loading ...</>)
  }

  return (
    <div className="main-page">
      { addImageWindow ? (<AddImage setAddImageWindow={setAddImageWindow} />) : (<></>)}

      <div className="search-box">
        <input
         type="text" 
         placeholder='search an image' 
         onChange={e => setSeatchTerm(e.target.value)} 
        />
        <button>
          <img src={searchIcon} alt="search icon" />
        </button>
      </div>

      <div className="functionalities-main-page">
        <button className="add-image-functionality" onClick={() => setAddImageWindow(true)}>
          <img src={addIcon} alt="add" />
        </button>
      </div>

      <div className="container-image-card">
        { postFiltered.map((post,i) => (<ImageCard data={post} key={i} />) ) }
      </div>
    </div>
  )
}

