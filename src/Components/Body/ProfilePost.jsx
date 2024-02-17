import React, { useEffect } from 'react'
import { postEndPoints } from '../../apihandler/apiList';
import { redirect, useLoaderData } from 'react-router-dom';
import apicall from '../../apihandler/apiCall';

const ProfilePost = () => {
    const post= useLoaderData();
    console.log(post)

    useEffect(()=>{

    },[]);

  return (
    <div className="w-full lg:flex pb-14 lg:justify-center">
            <div className="grid grid-cols-3 gap-0.5 pb-2 p-1 lg:w-2/6 lg:self-place-center">
            {
                    post?.post[0]?.posts?.map((post) =>{
                        return(
                            
                            <div key={post._id} className="max-h-40 min-h-36">
                                <img src={post.urlToImg} className='h-full'/>
                            </div>
                              
                        )
                    })
                    

            }
            </div>
    </div>
  )
}

export default ProfilePost;

export const loader= async ({params})=>{
  const {userId} = params;
          
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
  const url = postEndPoints.GET_REQUEST+`/${userId}`;
  headers = headers;
  const data = null;

  try{
      const response = await apicall(
          method,
          url,
          data,
          headers
      )
      console.log(response)

      return response;
      

  } catch (error) {
    if(error.message === 'Token is invalid'){
        localStorage.clear();
        throw redirect("/login");
      }else{
        return null
      }
  }
  

}
