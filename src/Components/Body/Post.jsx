import React, { useEffect } from "react";
import { allPosts } from "../../zustand/Store";

import PostCard from "./PostCard";
import { postEndPoints } from "../../apihandler/apiList";
import apicall from "../../apihandler/apiCall";
import { redirect, useLoaderData } from "react-router-dom";
import PostSkeleton from "../Skeleton/PostSkeleton"
import { useState } from "react";



const Post = () => {
  const storePosts = allPosts((state) => state.storePosts);
  const data= useLoaderData();
  useEffect(()=>{
    storePosts(data?.post);
  },[]);
    const posts = allPosts((state) => state.post);


  if(!data ){
    return (
      <div className="w-full  py-20 ">
        <PostSkeleton/>
      </div>
    )
  }
   return (
        <>

            <div className="w-full  py-20 ">
                {
                    posts?.map((post) => {
                        return (

                        <div key={post._id}>
                            <PostCard post={post}/>
                        </div>

                        )})
                }
            </div>
        </>
    )

}

 export default Post;


 export const loader = async ()=>{
    try{
    let headers = null;
    if (localStorage.getItem("token")) {
        if (headers) {
          headers += {
            Authorization: localStorage.getItem("token"),
          };
        } else {
          headers = {
            Authorization: localStorage.getItem("token"),
          };
        }
      }
    const method = 'GET'
    const url = postEndPoints.GET_REQUEST;
    const data = null
    
        const response = await apicall(
            method,
            url,
            data,
            headers
        )

        return response;
        

      } catch (error) {
        if(error.message === 'Token is invalid'){
          localStorage.clear();
          throw redirect("/login");
        }else{
          return null;
        }
      }


 }
