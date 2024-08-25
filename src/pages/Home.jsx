import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import authService from '../appwrite/auth';
import { Container, PostCard } from '../components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Aos from 'aos'
import 'aos/dist/aos.css'
function Home() {
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState('');
    const authStatus = useSelector(state => state.auth.status)
    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
    useEffect(() => {
        authService.getCurrentUser().then((resp) => {
            setUser(resp.name)
        })
    }, [authStatus])
    useEffect(() => {
        Aos.init({ duration: 2000 })
    })
    if (authStatus && posts.length === 0) {
        return (
            <div className="w-full py-8 text-center">
                <Container>
                    <div className="flex  justify-around h-screen p-4 spac-x-4" data-aos='fade-up'>
                        <div className="w-1/2 text-center p-6  rounded-lg shadow-lg bg-white flex flex-col items-center justify-center">
                            <div className='text-4xl font-extrabold text-gray-800 mb-4 font-serif  text-wrap'>
                                Welcome {user}
                            </div>
                            <div className='text-4xl font-extrabold text-gray-800 mb-4 font-serif  text-wrap  
                               '>Share your stories, express your ideas, and connect with the world—one blog at a time.</div>
                            <Link to='/add-post' className="text-2xl font-bold hover:text-gray-500">
                                Click here to write your first blog
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    else
        if (authStatus && posts.length >= 1) {
            return (
                <div className='w-full py-8'>
                    <Container>
                        <div className='text-4xl text-center font-extrabold mb-4 font-sans text-yellow-500 text-pretty'>
                            Welcome {user}
                        </div>
                        <div className='flex flex-wrap'>
                            {posts.map((post) => (
                                <div key={post.$id} className='p-2 w-1/4'>
                                    <PostCard {...post} />
                                </div>
                            ))}
                        </div>
                    </Container>
                </div>
            )
        }
        else
            if (!authStatus) {
                return <div className="flex  justify-around h-screen p-4 spac-x-4" data-aos='fade-up'>
                    <div className="w-1/2 text-center p-6  rounded-lg shadow-lg bg-white flex flex-col items-center justify-center">
                        <div className='text-4xl font-extrabold text-gray-800 mb-4 font-serif  text-wrap  
               '>Share your stories, express your ideas, and connect with the world—one blog at a time.</div>
                        <Link to='/login' className="text-2xl font-bold hover:text-gray-500">
                            Login to read posts
                        </Link>
                    </div>
                </div>
            }
}
export default Home