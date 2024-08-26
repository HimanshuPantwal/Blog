import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => { }, [])
    appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })
    if (posts.length === 0) {
        return <div className=' w-full py-8 flex items-center justify-center'>
            <h1 className='font-bold text-4xl h-[300px] text-center'>No Posts Yet</h1>
        </div>
    }
    else {
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-wrap justify-center gap-4'>
                    {
                        posts.map((post,index)=>{
                            const translateYValue = `translate-y-${index * 4}`;
                              return (
                                <div key={post.$id} className={`bg-white shadow-lg rounded-lg overflow-hidden w-72 h-80 transform translate-y-${translateYValue}`}>
                                  <PostCard {...post}/>
                                </div>
                              )
                        })
                    }
                    </div>
                </Container>
            </div>
        )
    }
}
export default AllPosts


