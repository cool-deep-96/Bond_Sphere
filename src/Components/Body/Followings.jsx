import React from 'react'
import { userEndPoints } from '../../apihandler/apiList';
import { NavLink, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import apicall from '../../apihandler/apiCall';
import profileImg from '../../assets/profile3.jpeg'

const Followings = () => {
  const navigate = useNavigate();
  const FollowingsList = useLoaderData();
  console.log(FollowingsList);

  const profileData = {
    userId: localStorage.getItem('userId'),
    urlToImg: localStorage.getItem('urlToImg'),
    _id: localStorage.getItem('_id')
} 

  
  const followResquest = async(_id)=>{
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
    const url = userEndPoints.FOLLOW_REQUEST +_id;
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
    <div className="w-full lg:flex  lg:justify-center">
      <div className="flex flex-col pt-2 mb-14 lg:w-2/6 lg:self-place-center">
        {
          FollowingsList[0].followings.map((following) => {
            console.log(following.followings)
            return (
              <div key={following._id} className='flex flex-row my-2 mx-4 justify-between items-center border-2 rounded-xl px-5'>
                <NavLink to={'/profile/'+following.userId}>

                <div className='flex flex-row justify-center items-center'>
                  <div className='h-16 w-16 rounded-full p-2 '>
                    <img src={following.urlToImg || profileImg} className='h-full w-full rounded-full' />
                  </div>
                  <div className='text-lg font-bold px-4'>
                    {following.userId}
                  </div>
                </div>
                </NavLink>
                <div className="mx-2">

                {
                  (following.userId === profileData.userId)? (<></>):
                  <button onClick={()=> followResquest(following._id)}
                    className={`${(following.followers.includes(profileData._id))? 'bg-white border-2 border-green-600' : 'bg-green-600 text-white'}  px-3 py-2 text-sm font-semibold w-36 rounded-full`}>
                    {
                      (following?.followers.includes(profileData._id))? "U N F O L L O W" : "F O L L O W"
                    }
                  </button>
                }
                </div>

              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Followings;

export const loader = async ({ params }) => {
  try {
    const { userId } = params;
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
    const url = userEndPoints.GET_FOLLOWINGS + userId;
    const data = null
    const response = await apicall(
      method,
      url,
      data,
      headers
    )

    return response;


  } catch (error) {

    throw redirect("/login");
  }

}
