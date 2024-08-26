import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'
import Aos from 'aos'
import 'aos/dist/aos.css'

function PostCard({
  $id,
  title,
  featuredImage,
  content
}) {
  let newContent=content.slice(3)
  newContent=newContent.slice(0,-10)
  return (
    <Link to={`/post/${$id}`}>
        <img src={appwriteService.getFilePreview(featuredImage)} alt="title"
          className=' w-full h-40 object-cover'
        ></img>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 line-clamp-3">{title}</h3>
        <div className="text-sm text-gray-700 line-clamp-2">{newContent}</div>
      </div>
    </Link>
  )
}

export default PostCard