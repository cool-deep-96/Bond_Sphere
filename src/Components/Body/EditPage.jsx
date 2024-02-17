import React, { useEffect, useState } from 'react'
import {  redirect, useNavigate, useParams } from 'react-router-dom';
import profileImg from '../../assets/profile3.jpeg'
import { userEndPoints } from '../../apihandler/apiList';
import apicall from '../../apihandler/apiCall';
import toast from 'react-hot-toast';

const EditPage = () => {
  const [file, setFile]= useState();
  const [profile, setProfile]= useState();
  const [bio, setBio] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  // const {userId} = useParams();
  // const navigate = useNavigate();
  const profileData = {
      userId: localStorage.getItem('userId'),
      urlToImg: localStorage.getItem('urlToImg'),
      _id: localStorage.getItem('_id')

  }
  useEffect(()=>{

  },[]);


  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
    setProfile(selectedFile);

    if (selectedFile) {
        setFile(URL.createObjectURL(selectedFile));
    } else {
        setFile(null);
    }
  }

  const handleSubmit= async (event)=>{
    event.preventDefault();
    setLoading(true);
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
      const method = 'PUT'
      const url = userEndPoints.UPDATE_REQUEST;
      const data = new FormData();
      if(profile) data.append('urlToImg', profile);
      if(password) data.append('password', password);
      if(bio) data.append('bio', bio);


          const response = await apicall(
              method,
              url,
              data,
              headers
          )
  
          console.log(response);
          if(response.photo) {toast.success(response.photo); localStorage.setItem('urlToImg', response.urlToImg)};
          if(response.bio) toast.success(response.bio);
          if(response.password) toast.success(response.password);
          
  
        } catch (error) {
          if(error.message === 'Token is invalid'){
            localStorage.clear();
            throw redirect("/login");
          }else{
            
            toast.error(error.message);
          }
        }
        setLoading(false);
  
  }
  

  return (
        <div className="w-full min-h-screen mb-20 flex flex-col pt-20 justify-center items-center">
                
            <form  onSubmit={handleSubmit}
            className=" w-96 flex flex-col justify-center items-center  lg:w-2/6 lg:self-place-center border-2 border-green-100 rounded-t-2xl" >
            <div className='text-center w-full mb-10 text-3xl font-semibold bg-green-100 rounded-2xl'>Edit Your Profile</div>
              <div className='flex'>
                <img src={file? `${file}`:`${profileData.urlToImg || profileImg}`} className='h-36 w-36   rounded-full '/>
              </div>
                <label htmlFor='photo' className='place-self-end mr-20 hover:cursor-pointer mb-4'>Update Profile</label>
                <input onChange={handleChange}
                 type='file' accept='image/*' id='photo' style={{display:'none'}}/>
              <div className='flex flex-col '>
              <label >Your userId</label>
              <input  type='text' className='py-1 px-4 text-lg mb-4 rounded-xl border-2 bg-gray-100 focus:outline-none focus:bg-green-200'
                disabled 
                value={profileData.userId} placeholder='Your UserId'/>
              <label >Your Email</label>
              <input  type='text' className='py-1 px-4 text-lg mb-4 rounded-xl border-2 bg-gray-100 focus:outline-none focus:bg-green-200'
                disabled 
                value='Test1@gmail.com' placeholder='Your Email'/>
              <label htmlFor='bio'>Your Bio</label>
              <input onChange={(e)=>setBio(e.target.value)}
                type='text' id='bio' className='py-1 px-4 text-lg mb-4 rounded-xl border-2 bg-green-100 focus:outline-none focus:bg-green-200' 
                 placeholder='Your Bio'/>
              <label htmlFor='password'>Enter Your Password</label>
              <input onChange={(e)=>setPassword(e.target.value)}
                type='password' id='password' className='py-1 px-4 text-lg mb-4 rounded-xl border-2 bg-green-100 focus:outline-none focus:bg-green-200' 
                 placeholder='Your Password'/>
                <div className='flex justify-center'>
                  <input type='submit' disabled={loading} value='CONFIRM UPDATE' className='py-2 mb-4 px-4 disabled:bg-gray-400 bg-blue-400 text-white font-semibold text-md rounded-tl-xl rounded-br-xl'/>
                </div>
              </div>
            </form >        
                
        </div>
    
  )
}

export default EditPage;
