import React from 'react'
import appwriteService from '../appwrite/config'
import {Link} from 'react-router-dom'
import Aos from 'aos'
import 'aos/dist/aos.css'

function PostCard({
    $id,
    title,
    featuredImage
}) {
  return (
    <Link to={`/post/${$id}`}>
       <div className='w-full bg-gray-100 rounded-xl p-4 h-full flex flex-col justify-center items-center hover:duration-200 hover:scale-110' data-aos='fade-up'>
        <div className='w-full justify-center mb-4 flex p-4 bg-green-400' >
            <img src={appwriteService.getFilePreview(featuredImage)} alt="title"
            className='rounded-xl w-11/12 h-60'
            ></img>
        </div>
        <h2 className='text-xl font-bold'>{title}</h2>
       </div>
    </Link>
  )
}

export default PostCard