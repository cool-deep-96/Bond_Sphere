import React, { useContext, useState } from 'react';
import AppContext from "../../Context/AppContex";
import { NavLink } from 'react-router-dom';


const Footer = () => {
    const { value } = useContext(AppContext);
    const [togle, setTogle] = useState(false);
    return (
        <>
            <div className='flex flex-row justify-evenly pb-4 pb-1 max-h-[70px] bg-white px-4 border border-green-100'>
                <div>
                    <NavLink to='/'>
                    <button className='py-3 px-3 border rounded-lg bg-green-300 font-bold '>
                        Posts
                    </button>
                    </NavLink>
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