import React, { useContext } from 'react';
import profileImg from "../../assets/profile3.jpg"
import { NavLink } from 'react-router-dom';
import { user } from '../../zustand/Store';
import { userEndPoints } from '../../apihandler/apiList';


const Header = () => {

    const storeProfile = user((state) => state.storeProfile);

    const getUser = async () => {
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
        const url = userEndPoints.GET_USER+"/";
        const data = null

        await apicall(
            method,
            url,
            data,
            headers
        ).then(response => {
            storePosts(response);
            console.log(response);
            setAuthenticated(true);
            
            
        }).catch(error => {
            setAuthenticated(false);
        })
    }
    
    
    return (
        <>
        <div className='w-full px-3 py-2 flex flex-row justify-between bg-green-600'>
            <div className='text-3xl text-white '>
                BondSphere
            </div>
            <div>
                <NavLink to='/profile'>
                <img src={profileImg} className='h-12 w-12 rounded-full'/>
                </NavLink>
            </div>

        </div>
        


        </>
    )
}

export default Header;