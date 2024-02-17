import React, { useEffect } from 'react'
import { Navigate, Outlet, redirect, useLoaderData } from 'react-router-dom'
import Profile from '../Body/Profile'
import { useUserStore } from '../../zustand/Store'
import { userEndPoints } from '../../apihandler/apiList'
import apicall from '../../apihandler/apiCall'


export const ProfileLayout = () => {
  const storeProfile = useUserStore((state) => state.storeProfile);
  const user = useLoaderData();
  if(user){
    storeProfile(user);
  }
  
  console.log('profileLayout');
  useEffect(()=>{

  },[]);



  return (
    <>
        <Profile/>
        <Outlet/>
    </>

  )
}

export default ProfileLayout;

export const loader= async ({params}) => {
  const { userId } = params
          
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

  try{
      const response = await apicall(
          method,
          url,
          data,
          headers
      )
      console.log(response[0])

      return response[0];
      

  } catch (error) {
    if(error.message === 'Token is invalid'){
        localStorage.clear();
        throw redirect("/login");
      }else{
      console.log(error.message);
      return {}
      }
  }

}
