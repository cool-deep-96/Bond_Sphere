import React, { useState } from "react";
import { postEndPoints } from "../../apihandler/apiList";
import apicall from "../../apihandler/apiCall";
import { allPosts  } from "../../zustand/Store";
import { NavLink, useNavigate } from "react-router-dom";
import profileImg from '../../assets/profile3.jpeg'


const PostCard = (props) => {
    const [commentTogle, setCommentTogle] = useState(false);
    const [comment, setComment] = useState("");
    const post = props.post;
    const updatePosts = allPosts((state) => state.updatePosts);
    const navigate = useNavigate();
    const profileData = {
        userId: localStorage.getItem('userId'),
        urlToImg: localStorage.getItem('urlToImg')}  

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
        if (comment === '') {
            return;
        }

        const method = "PUT";
        const url = postEndPoints.COMMENT_REQUEST + post._id;
        headers = headers;
        const data = {
            comment: comment
        };
        try {
            const response = await apicall(
                method,
                url,
                data,
                headers
            )
            updatePosts(response);
            setComment("");
            setCommentTogle(true);

        } catch (error){
            navigate('/login');

        }






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

        try {
            const response = await apicall(
                method,
                url,
                data,
                headers
            )
            updatePosts(response);
        

        } catch (error){
            navigate('/login');

        }



    }

    return (
        <><div className="min-w-screen lg:flex lg:justify-center mb-5">
            <div className=" lg:w-2/6 lg:self-place-center">

                <div>

                <div className="py-3 px-3 flex justify-between">
                    <div className="text-2xl font-bold  ">
                        <NavLink to={`/profile/${post.userObjectId.userId}`}>
                            <div className="flex gap-2">
                                {

                                <img src={post.userObjectId.urlToImg || profileImg} className="h-10 w-10 rounded-full"/>
                                }
                               <div>{post.userObjectId.userId} </div>
                            </div>
                            
                        </NavLink>

                    </div>
                    <div>
                        ---
                    </div>

                </div>
                <div className="px-2 ">
                    <img className="w-full " src={post.urlToImg}></img>
                </div>
                <p className="my-3 mx-2 text-xl">{post.caption}</p>
                <div className="flex gap-4 px-3 mt-4 font-semibold items-center">
                    <div className="flex flex-col items-center">
                        {/* <div>{post.likes.length}</div> */}
                        <button className="text-xl" onClick={likeRequest}>
                            {post.likes.some(user => user.userId === profileData.userId) ? "Liked" : "Like"}
                        </button>
                        
                    </div>
                    
                    <button className="text-xl" onClick={() => { setCommentTogle(!commentTogle) }}>
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
                    <div className="max-h-96 overflow-hidden overflow-scroll overflow-x-hidden">

                    {post.comments.map((comment) => {
                        return (
                            <div key={comment._id} className="mx-5 px-3 py-1 flex flex-row w-10/12 gap-3 m-1 border-gray-200 border-2 ">
                                <p className="font-semibold">
                                    <NavLink to={`/profile/${comment.commentedBY}`}>
                                        {comment.commentedBY}
                                    </NavLink>

                                </p>
                                <p>{comment.comment}</p>
                            </div>
                        )
                    })
                    }
                    </div>
                </>) : (<></>)
            }
            </div>
         </div>

        </>
    )

}

export default PostCard;