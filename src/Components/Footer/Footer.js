import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import CreatePost from '../Modals/CreatePost';
import { user } from '../../zustand/Store';


const Footer = () => {
    const [toggle, setTogle] = useState(false);
    const profileData = user((state) => state.profileData);
    const otherProfile = user((state) => state.otherProfile);
    console.log(profileData.userId)
    console.log(otherProfile.userId);


    return (
        <>
            <div>
                {toggle ? <CreatePost /> : <></>}
            </div>
            <div className='flex flex-row justify-evenly pb-4 pb-1 max-h-[70px] bg-white px-4 border border-green-100'>
                <div>
                    <NavLink to='/'>
                        <button className='py-3 px-3 border rounded-lg bg-green-300 font-bold '>
                            Posts
                        </button>
                    </NavLink>
                </div>
                <div>
                    { ((otherProfile.userID) || profileData.userId === otherProfile.userId)?
                        (<button className='py-3 px-3 border rounded-lg bg-green-300 font-bold '
                            onClick={() => setTogle(!toggle)}>
                            {toggle ? "-" : "+"}
                        </button>):(<></>)
                    }

                </div>
                <div>
                    <button className='py-3 px-3 border rounded-lg bg-green-300 font-bold '>
                        All User
                    </button>
                </div>



            </div>



        </>
    )
}

export default Footer;