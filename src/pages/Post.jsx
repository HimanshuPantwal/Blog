import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import { useSelector } from "react-redux";

export default function Post() {
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    navigate("/");
                }
            }).catch((error) => {
                console.error("Error fetching post:", error);
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const isAuthor = post && userData ? post?.userId === userData?.$id : false;

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="p-16 bg-gradient-to-br bg-white min-h-screen text-white animate-fadeIn">
            <Container>
                <div className="w-full flex justify-center relative p-6 bg-white/10 rounded-xl transition-transform duration-300 hover:scale-105 border-none outline-none">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-[400px] transform transition-transform duration-300 hover:scale-110"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex space-x-3">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button className="bg-gradient-to-r from-green-400 to-green-600 text-white py-2 px-4 rounded-full shadow-md transform transition-transform hover:scale-105 hover:shadow-lg duration-300">
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                className="bg-gradient-to-r from-red-400 to-red-600 text-white py-2 px-4 rounded-full shadow-md transform transition-transform hover:scale-105 hover:shadow-lg duration-300"
                                onClick={deletePost}
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <h1 className="text-3xl font-extrabold w-full text-center p-4 mt-8 rounded-xl outline-none border-none transition-colors text-black">
                    {post.title}
                </h1>

                {post?.content ? (
                    <div
                        className="browser-css text-center w-full p-6 rounded-xl text-lg shadow-lg leading-relaxed text-black"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                ) : (
                    <p className="text-center text-gray-500">Content not available</p>
                )}
            </Container>
        </div>
    ) : (
        <div className="w-full py-8 flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 to-indigo-500 text-white animate-fadeIn">
            <h1 className="font-bold text-4xl h-[300px] text-center">No Post Yet</h1>
        </div>
    );
}
