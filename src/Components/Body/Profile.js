import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContex";
import { userEndPoints } from "../../apihandler/apiList";
import apicall from "../../apihandler/apiCall";
import { useParams } from "react-router-dom";
import { user } from "../../zustand/Store";


const Profile = (props) => {
    const { userId } = useParams();
    console.log(userId);
    const { setAuthenticated } = useContext(AppContext);
    const storeOther = user((state) => state.storeOther);
    const profile = user((state) => state.otherProfile)
    
    const userRequest = async () => {
        
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
        const method = "GET";
        const url = userEndPoints.USER_REQUEST + userId;
        headers = headers;
        const data = null;
        await apicall(
            method,
            url,
            data,
            headers
        ).then(response => {
            console.log(response[0]);
            storeOther(response[0]);

        }).catch(error => {
            console.log(error)
            setAuthenticated(false);
        })
    }

    useEffect(() => {
        userRequest();
    },[])


    return (
        <>
            <div className="flex flex-col">
                <div className="flex flex-row ">
                    <div className="">
                        <img src={profile.urlToImg} className="h-28 w-28"></img>
                    </div>
                    <div className="px-5 py-2 flex flex-col">
                        <p className="text-2xl font-bold">{profile.userId}</p>
                        <p className="text-lg pt-3 w-8/12 ">this is bio sectionjsldkjfkd</p>
                    </div>
                </div>
                <div className="flex flex-row justify-evenly pt-10 border-green-100 border-b-2">
                    <div className="flex flex-col ">
                        <p className="text-center font-bold">42</p>
                        <button className='pb-3 px-3 font-semibold w-full'>
                            Posts
                        </button>
                    </div>
                    <div className="flex flex-col ">
                    <p className="text-center font-bold">{profile.followers? profile.followers.length:"0"}</p>
                        <button className='pb-3 px-3   font-semibold w-full'>
                            followers
                        </button>
                    </div>
                    <div className="flex flex-col ">
                    <p className="text-center font-bold">{profile.followings? profile.followings.length:"0"}</p>
                        <button className='pb-3 px-3  font-semibold w-full'>
                        following
                        </button>
                    </div>

                </div>

            </div>
        </>

    )
}

export default Profile;