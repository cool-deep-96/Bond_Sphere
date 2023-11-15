import React from "react";
import Profile from "./Profile";
import { Route, Routes } from "react-router-dom";
import Post from "./Post";


const Body = () => {
    return (
        <>
        <div className=" pt-5 px-5">
            <Routes>
                <Route path = '/' element = {<Post/>}/>
                <Route path='/profile/:userId' element={<Profile /> }/>
            </Routes>

        </div>
        </>

    )
}

export default Body;