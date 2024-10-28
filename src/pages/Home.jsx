import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

function Home() {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState("");
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    useEffect(() => {
        authService.getCurrentUser().then((resp) => {
            setUser(resp.name);
        });
    }, [authStatus]);

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    if (authStatus && posts.length === 0) {
        return (
            <div className="w-full py-8 text-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-200">
                <Container>
                    <div className="flex justify-center items-center h-screen p-4 space-x-4">
                        <div className="w-3/4 md:w-1/2 text-center p-8 rounded-lg shadow-lg bg-white flex flex-col items-center justify-center">
                        
                            <div className="text-5xl font-extrabold text-gray-900 mb-4 font-serif">
                                Welcome {user.toUpperCase()}
                            </div>
                            <img src="https://plus.unsplash.com/premium_vector-1682310595106-ecf4ee316a54?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                            <p className="text-2xl text-gray-700 mb-6 font-serif">
                                Share your stories, express your ideas, and connect with the world—one blog at a time.
                            </p>
                            <Link to="/add-post" className="text-xl font-semibold text-indigo-600 hover:text-indigo-400 transition-colors">
                                Click here to write your first blog
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        );
    } else if (authStatus && posts.length >= 1) {
        return (
            <div className="w-full py-8 min-h-screen bg-gradient-to-b from-blue-50 to-blue-200 ">
                <Container>
                    <div className="w-full relative p-4 flex items-center justify-center" data-aos="flip-left">
                        <div className="text-4xl text-center font-extrabold font-serif absolute top-20  w-full">
                            WELCOME {user.toUpperCase()}
                        </div>
                        <img src="https://plus.unsplash.com/premium_vector-1682310595106-ecf4ee316a54?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full p-2" data-aos='fade-left'>
                        {posts.map((post, index) => (
                            <div
                                key={post.$id}
                                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-110 duration-200"
                                data-aos="fade-down"
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        );
    } else if (!authStatus) {
        return (
            <div className="w-full py-8 text-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-200">
                <Container>
                    <div className="flex justify-center items-center h-screen p-4 space-x-4" data-aos="fade-up">
                        <div className="w-3/4 md:w-1/2 text-center p-8 rounded-lg shadow-lg bg-white flex flex-col items-center justify-center">
                            <p className="text-3xl font-extrabold text-gray-900 mb-6 font-serif">
                                Share your stories, express your ideas, and connect with the world—one blog at a time.
                            </p>
                            <Link to="/login" className="text-xl font-semibold text-indigo-600 hover:text-indigo-400 transition-colors">
                                Login to read posts
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Home;
