import React from 'react'
import { Link } from 'react-router-dom'

import { IPostDataFromServer } from '../MainPage/MainPage'

import * as img from '../../images'

import './style.css'
interface IImageCardProps {
  data: IPostDataFromServer
}

export const ImageCard = ({ data }: IImageCardProps) => {
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
                  <input type='checkbox' />
                  <img src={img.heartIcon} alt="heart icon" />
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

