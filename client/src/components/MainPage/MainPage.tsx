import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ImageCard } from '../ImageCard/ImageCard'
import { AddImage } from '../AddImage/AddImage'
import { searchIcon, addIcon, gridIcon, listIcon } from '../../images'
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
  const [ showFavorites, setShowFavorites ] = useState(false)
  const [ organization, setOrganization ] = useState('grid')
  const [ isCardsActive, setIsCardsActive ] = useState(false)
  const dispatch = useDispatch()
  const posts = useSelector((state: IState) => state.posts)

  useEffect(() => {
    const showSearchedPosts = () => {
      let filteredData: FilteredData = []
  
      posts.forEach(post => {
        const filteredTags = post.tags.filter(tag => tag.toLocaleLowerCase().includes(searchTerm.toLowerCase()))
        
        if(post.title.toLowerCase().includes(searchTerm.toLowerCase())) filteredData.push(post)
  
        filteredTags.forEach(tag => {
          if(post.tags.includes(tag) && !filteredData.includes(post)) {
            filteredData.push(post)
          }
        })
      })
      

      if(showFavorites) {
        filteredData = filteredData.filter(post => post.favorite === true)
      }

      setPostFiltered(filteredData.reverse())
    }

    if(posts.length > 0) {
      showSearchedPosts()
    }
  }, [posts, searchTerm, showFavorites])

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

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

        <div className="organization-box">
          <button className="list" onClick={() => setOrganization('list')}>
            <img src={listIcon} alt="list" />
          </button>

          <button className="grid" onClick={() => setOrganization('grid')}>
            <img src={gridIcon} alt="grid" />
          </button>
        </div>

        <button className="add-image-functionality" onClick={() => setAddImageWindow(true)}>
          <img src={addIcon} alt="add" />
        </button>

        <button className="show-favorites" onClick={() => setShowFavorites(!showFavorites)}>
          { showFavorites ?  'Show all' : 'Show only favorites' }
        </button>

        <div className="active-images-box">
          <input type="checkbox" onChange={() => setIsCardsActive(!isCardsActive)} />
          <span>Cards active</span>
        </div>
      </div>

      <div className={`container-image-card ${organization}`}>
        { 
          postFiltered.map((post,i) => (
            <ImageCard data={post} key={i} organization={organization} isActive={isCardsActive} />
          )) 
        }
      </div>
    </div>
  )
}

