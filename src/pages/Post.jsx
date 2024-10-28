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
            appwriteService
                .getPost(slug)
                .then((post) => {
                    if (post) {
                        setPost(post);
                    } else {
                        navigate("/");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching post:", error);
                })
                .finally(() => setLoading(false));
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

    if (loading) {
        return (
            <div className="w-full py-8 flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 to-indigo-500 text-white">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
            </div>
        );
    }

    return post ? (
        <div className="p-8 bg-gradient-to-br from-white to-indigo-50 min-h-screen text-black animate-fadeIn">
            <Container>
                <div className="w-full flex justify-center relative p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition-transform duration-300 transform hover:scale-105">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-[400px] transform transition-transform duration-300 hover:scale-110"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex space-x-3">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button className="bg-gradient-to-r from-green-400 to-green-600 text-white py-2 px-4 rounded-full shadow-md hover:scale-105 transform transition-transform duration-300">
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                className="bg-gradient-to-r from-red-400 to-red-600 text-white py-2 px-4 rounded-full shadow-md hover:scale-105 transform transition-transform duration-300"
                                onClick={deletePost}
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <h1 className="text-4xl font-extrabold text-center mt-8 text-gray-800">
                    {post.title}
                </h1>

                {post?.content ? (
                    <div
                        className="text-center w-full p-8 rounded-xl bg-white shadow-lg leading-relaxed text-gray-800 mt-6"
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
