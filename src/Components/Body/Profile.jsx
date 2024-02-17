import React, {  useEffect, useState} from "react";

import { userEndPoints } from "../../apihandler/apiList";
import apicall from "../../apihandler/apiCall";
import { Link, NavLink,useNavigate } from "react-router-dom";
import profileImg from '../../assets/profile3.jpeg'
import { useUserStore } from "../../zustand/Store";



const Profile = () => {
    const profile = useUserStore((state)=>state.profile);
    console.log(profile.followers);
    const profileData = {
                            userId: localStorage.getItem('userId'),
                            urlToImg: localStorage.getItem('urlToImg'),
                            _id: localStorage.getItem('_id')
                        } 



    const navigate = useNavigate();

 

    const isFollowed= (profile?.followers?.includes(profileData._id));



    const followResquest = async()=>{
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
        const url = userEndPoints.FOLLOW_REQUEST + profile._id;
        headers = headers;
        const data = null;

        try {
            const response = await apicall(
                method,
                url,
                data,
                headers
            )
            navigate('');


        } catch (error){
            navigate('/login');

        }
    }




    return (
        <><div className="w-full lg:flex pt-14 lg:justify-center">
            <div className="flex flex-col pt-2 lg:w-2/6 lg:self-place-center">
                <div className="flex flex-ro py-2 ">
                    <div className="pl-2">
                        <img src={profile?.urlToImg || profileImg} className="h-28 w-28 rounded-full"></img>
                    </div>
                    <div className="px-5 py-2 flex flex-col">
                        <div className="text-2xl font-bold">{profile?.userId}</div>
                        <div className="text-lg pt-3  ">{profile?.bio || <>
                        <div>
                            <button className="px-2 ">Add Bio </button>
                        </div>
                        </>}</div>
                    </div>
                </div>

                <div className="mx-2">
                  {
                    profile.userId == profileData.userId ?
                    (<Link to={'edit'}>
                    <button className="bg-green-600  w-full my-3 py-2 text-xl font-semibold text-white rounded-full">EDIT  PROFILE </button> 
                    </Link>) 
                    : (<button onClick={followResquest}
                        className={`${isFollowed? 'bg-white border-2 border-green-600':'bg-green-600 text-white'} w-full my-3 py-2 text-xl font-semibold  rounded-full`}>
                            {
                                isFollowed?  "U N F O L L O W" : "F O L L O W"
                            }
                        </button>)
                  }  
                  
                </div>

                <div className="flex flex-row justify-evenly  border-green-100 border-b-2">
                    <div className="flex flex-col ">
                        <NavLink to={``}>
                            <div className="text-center font-bold">{profile?.posts? profile?.posts.length:"0"}</div>
                            <button className='pb-3 px-3 font-semibold w-full'>
                                Posts
                            </button>
                        </NavLink>
                    </div>
                    <div className="flex flex-col ">
                        <NavLink to={`followers`}>
                            <div className="text-center font-bold">{profile?.followers? profile?.followers.length:"0"}</div>
                            <button className='pb-3 px-3   font-semibold w-full'>
                                followers
                            </button>
                        </NavLink>
                    </div>
                    <div className="flex flex-col ">
                        <NavLink to={`followings`}>
                            <div className="text-center font-bold">{profile?.followings? profile?.followings.length:"0"}</div>
                            <button className='pb-3 px-3  font-semibold w-full'>
                                following
                            </button>
                        </NavLink>
                    </div>

                </div>

            </div>
            </div>
        </>

    )
}
export default Profile;





