import React, { useContext, useState } from "react";
import {  postEndPoints } from "../../apihandler/apiList";
import apicall from "../../apihandler/apiCall";
import AppContext from "../../Context/AppContex";
import { allPosts, user } from "../../zustand/Store";
import { NavLink } from "react-router-dom";


const PostCard = (props) => {
    const { setAuthenticated } = useContext(AppContext);
    const [commentTogle, setCommentTogle] = useState(false);
    const [comment, setComment] = useState("");
    const index = props.index;
    const post = props.post;
    const updatePosts = allPosts((state) => state.updatePosts);
    const profileData = user((state) => state.profileData);


    const commentRequest = async (event) => {
        event.preventDefault();
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
        if(comment === ''){
            return ;
        }

        const method = "PUT";
        const url = postEndPoints.COMMENT_REQUEST + post._id;
        headers = headers;
        const data = {
            comment: comment
        };
        
        console.log(url);

        await apicall(
            method,
            url,
            data,
            headers
        ).then(response => {
            updatePosts(response);
            setComment("");
            setCommentTogle(true);

        }).catch(error => {
            setAuthenticated(false);
        })
        
        

    }

    const likeRequest = async () => {
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

        const method = "PUT";
        const url = postEndPoints.LIKE_REQUEST + post._id;
        headers = headers;
        const data = null;
        
        console.log(url);

        await apicall(
            method,
            url,
            data,
            headers
        ).then(response => {
            updatePosts(response);

        }).catch(error => {
            setAuthenticated(false);
        })
        
        

    }

    return (
        <>
            <div className="" key={index}>

                <div className="py-3 px-3 flex justify-between">
                    <div className="text-2xl font-bold">
                        <NavLink to={`/profile/${post.userId}`}>
                            {post.userId}
                        </NavLink>
                        
                    </div>
                    <div>
                        ---
                    </div>

                </div>
                <div className="flex  justify-center">
                    <img className="w-full" src={post.urlToImg}></img>
                </div>
                <p>{post.caption}</p>
                <div className="flex gap-4 px-3 mt-4 font-semibold">
                    <button className="" onClick={likeRequest}>
                        {post.likes.some(user => user.userId === profileData.userId)? "liked" : "like"}
                    </button>
                    <button onClick={() => { setCommentTogle(!commentTogle) }}>
                        comments
                    </button>

                </div>
                

            </div>
            {
                commentTogle ? (<>
                    <form onSubmit={commentRequest}>
                        <div className="flex flex-row justify-center">
                            <input onChange={(event) => { setComment(event.target.value) }}
                                value={comment}
                                className='px-2 text-xl w-10/12 border-gray-200 border-2 border-r-0' placeholder="write..." />
                            <div className="px-1 text-xl bg-green-400 text-white border-gray-200 border-2 border-l-0">
                                <button type="submit">
                                    Post
                                </button>
                            </div>
                        </div>
                    </form>


                    {post.comments.map((comment) => {
                        return (<>
                            <div className="mx-5 px-3 py-1 flex flex-row w-10/12 gap-3 m-1 border-gray-200 border-2 ">
                                <p className="font-semibold">
                                    <NavLink to={`/profile/${comment.commentedBY}`}>
                                        {comment.commentedBY}
                                    </NavLink>
                                    
                                </p>
                                <p>{comment.comment}</p>
                            </div>
                        </>)
                    })
                    }
                </>) : (<></>)
            }

        </>
    )

}

export default PostCard;