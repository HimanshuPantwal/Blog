import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []); 

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 flex items-center justify-center">
                <h1 className="font-bold text-4xl h-[300px] text-center">No Posts Yet</h1>
            </div>
        );
    } else {
        return (
            <div className="w-full py-8 bg-gradient-to-b from-indigo-100 to-indigo-300 min-h-screen">
                <Container>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {posts.map((post, index) => (
                            <div
                                key={post.$id}
                                className="transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl bg-white shadow-lg rounded-xl overflow-hidden"
                                style={{ transitionDelay: `${index * 100}ms` }} 
                            >
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        );
    }
}

export default AllPosts;
