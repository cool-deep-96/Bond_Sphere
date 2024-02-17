import React, { useEffect }  from 'react';
import profileImg from "../../assets/profile3.jpeg"
import { Link, NavLink } from 'react-router-dom';



const Header = () => {
  const profileData = {
    userId: localStorage.getItem('userId'),
  } 
  
  if(localStorage.getItem('urlToImg') != null)  profileData.urlToImg = localStorage.getItem('urlToImg');

  useEffect(()=>{

  })
    return (
        <>
        <div className='fixed w-full justify-self-center'>
            <div className='  px-3 py-2 flex flex-row justify-between bg-green-600'>
            <Link to=''>
            <div className='text-3xl py-2 text-white '>
                Bond<span className='text-orange-500'>Sphere</span>
            </div>
            </Link>
            <div>
                {profileData.userId && <NavLink to={`/profile/${profileData.userId}`}>
                <img src={profileData.urlToImg!= null ? profileData.urlToImg : profileImg} className='h-12 w-12 rounded-full' alt='profile'/>
                </NavLink>}
            </div>
        </div>
        </div>
        
        


        </>
    )
}

export default Header;