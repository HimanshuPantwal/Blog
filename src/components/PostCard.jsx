import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'
import Aos from 'aos'
import 'aos/dist/aos.css'

function PostCard({
  $id,
  title,
  featuredImage
}) {
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-white  h-[350px] flex flex-col justify-start items-center space-y-3 hover:scale-105 hover:duration-500  outline outline-blue-900 outline-1 mx-2'>
        <div className='w-full h-60 justify-center mb-4 flex' >
          <img src={appwriteService.getFilePreview(featuredImage)} alt="title"
            className=' w-full h-60 duration-300'
          ></img>
        </div>
        <h2 className='text-xl font-bold w-full overflow-hidden line-clamp-2 text-center p-2'>{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard