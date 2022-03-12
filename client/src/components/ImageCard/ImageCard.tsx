import React from 'react'
import { Link } from 'react-router-dom'

import { IPostDataFromServer } from '../MainPage/MainPage'

import * as img from '../../images'

import './style.css'
import { useDispatch } from 'react-redux'
import { toggleFavoritePostFromImageCard } from '../../redux/actions/posts'
interface IImageCardProps {
  data: IPostDataFromServer
}

export const ImageCard = ({ data }: IImageCardProps) => {
  const dispatch = useDispatch()
  
  return (
    <div className="image-card">
      <div className="image-box-image-card">
        <img src={data.imageFile} alt={data.title} />
      </div>
      <div className="image-details-image-card">
        <h2>{data.title}</h2>
        <div className="functionalities-container-image-card">
          <div className="tags-container">  
            <ul className="tags">
              {data.tags.map((tag, i) => (<li key={i}>{tag}</li>))}
            </ul>
          </div>
          <ul className="functionalities-image-card">
            <li>
                <div className="fav-functionality">  
                  <input
                   type='checkbox' 
                   onChange={() => dispatch(toggleFavoritePostFromImageCard(data._id, !data.favorite))}
                  />
                  <img src={img.heartIcon} alt="heart icon" className={ data.favorite ? 'favorited' : ''} />
                </div>
            </li>
            <li>
                <a href={data.imageFile} download={data.title} >
                  <img src={img.downloadIcon} alt="download icon" />
                </a>
            </li>
            <li>
                <Link to={`/posts/${data._id}`} >
                  <img src={img.linkIcon} alt="link icon" />
                </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

