import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import CreatePost from '../Modals/CreatePost';



const Footer = () => {
    const [toggle, setTogle] = useState(false);
    

    return (
        <>
        <div className='fixed bottom-0 w-full '>

            <div>
                {toggle ? <CreatePost /> : <></>}
            </div>
            <div className='flex flex-row justify-evenly pb-3  max-h-[70px] bg-white px-4 border border-green-100'>
                <div>
                    <NavLink to='/'>
                        <button className='py-2 px-3 border rounded-lg bg-green-300 font-bold '>
                            Posts
                        </button>
                    </NavLink>
                </div>
                <div>
                        <button className='py-2 px-4 border rounded-lg bg-green-300 font-bold '
                            onClick={() => setTogle(!toggle)}>
                            {toggle ? "-" : "+"}
                        </button>
                </div>
                <div>
                    <button className='py-2 px-3 border rounded-lg bg-green-300 font-bold '>
                        All User
                    </button>
                </div>
            </div>
        </div>



        </>
    )
}

export default Footer;