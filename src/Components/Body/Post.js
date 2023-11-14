import React, { useState } from "react";
import { allPosts } from "../../zustand/Store";

import PostCard from "./PostCard";


const Post = () => {

    const posts = allPosts((state) => state.post);


    return (
        <>

            <div className="w-full  overflow-hidden ">
                {
                    posts.map((post, index) => {
                        return (<>
                        <div key={index}>
                            <PostCard post={post}/>
                        </div>

                        </> )})
                }
            </div>
        </>
    )

}

 export default Post;
