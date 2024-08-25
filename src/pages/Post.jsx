import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [loading, setLoading] = useState(true)
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => { return state.auth.userData });
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);
    console.log("email", userData?.$id)
    console.log("post", post?.userId)
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
            <div className="p-16">
                <Container>
                    <div className="w-full flex justify-center relative border p-2 bg-white/90">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-xl size-[400px]"
                        />

                        {isAuthor && (
                            <div className="absolute right-6 top-6">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="mr-3">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    <h1 className="text-2xl font-bold w-full text-center bg-green-200 p-2">{post.title}</h1>
                    <div className="browser-css text-center w-full bg-green-200 p-2">
                        {parse(post.content)}
                    </div>
                </Container>
            </div>
        ) :  <div className=' w-full py-8 flex items-center justify-center'>
        <h1 className='font-bold text-4xl h-[300px] text-center'>No Post Yet</h1>       
        </div>
}