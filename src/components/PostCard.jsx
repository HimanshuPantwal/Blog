import React, { useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

function PostCard({ $id, title, featuredImage, content }) {
    useEffect(() => {
        Aos.init({ duration: 1000 });  
    }, []);
    return (
        <Link
            to={`/post/${$id}`}
            className="block transform transition-transform duration-300"
            data-aos="fade-down"
        >
            <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="relative">
                    <img
                        src={appwriteService.getFilePreview(featuredImage)}
                        alt={title}
                        className="w-full h-48 object-cover transition-transform duration-300 transform "
                    />
                </div>
                <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-1 text-center line-clamp-2">
                        {title}
                    </h3>
                    <p className="text-gray-600 text-sm text-center line-clamp-3" dangerouslySetInnerHTML={{ __html: content }}></p>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;
