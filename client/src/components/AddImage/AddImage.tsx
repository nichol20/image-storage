import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'

import { removeIcon } from '../../images'
import { createPost, updatePost } from '../../redux/actions/posts'

import './style.css'

interface IBase64 {
  base64: string
}

interface IAddImage {
  setAddImageWindow: Function
  currentId?: string
  props?: {
    imageFile: string
    tags: string[]
    title: string
  }
}

export const AddImage = ({ setAddImageWindow, currentId, props }: IAddImage) => {
  const [ imageFile, setImageFile ] = useState('')
  const [ tags, setTags ] = useState(Array)
  const [ title, setTitle ] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if(currentId) {
      setImageFile(props!.imageFile)
      setTags(props!.tags)
      setTitle(props!.title)
    }
  }, [currentId, props])

  const handleOnChangeTagsInput = (e: ChangeEvent) => {
    const tag = (e.target as HTMLInputElement).value;
      if(tag.length >= 1 && tag.includes(' ')){
        const newTag = tag.split(' ')
        setTags([...tags, newTag[0]]);
        (e.target as HTMLInputElement).value = ''
      }
  }

  const removeTag = (index: number) => {
    let newTagsValue = [...tags]
    newTagsValue.splice(index, 1)

    setTags(newTagsValue)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if(currentId) dispatch(updatePost(currentId, { title, imageFile, tags }))
    else dispatch(createPost({ title, imageFile, tags }))
    setAddImageWindow(false)
  }

  return (
    <div className="add-image">
      <div className="close-add-image-window" onClick={() => setAddImageWindow(false)} />
      <form className="form-add-image" onSubmit={handleSubmit}>
        <div className="image-box-add-image">
          <img src={imageFile} alt="" />  
        </div>
        <FileBase 
         type="file"
         multiple={false}
         onDone={({ base64 }: IBase64) => setImageFile(base64)}
         defaultValue={imageFile}
        />
        <input
         className="input-image-name" 
         type="text" 
         placeholder='Name' 
         onChange={e => setTitle(e.target.value)}
         defaultValue={title}
        />
        <div className="tags-wrapper">
          {
            tags.map((tag, index) => (
              <span key={index} >
                {tag}
                <button type="button" onClick={() => removeTag(index)}>
                  <img src={removeIcon} alt="delete" />
                </button>
              </span>
            )) 
          }
          <input placeholder='Add some tags' onChange={e => handleOnChangeTagsInput(e)}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

