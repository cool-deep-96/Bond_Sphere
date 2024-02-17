import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import  Layout from './Components/Layout/Layout'
import Login from './Components/Login/Login';
import Post , {loader as postLoader } from './Components/Body/Post';
import Layout2 from './Components/Layout/Layout2';
import ProfileLayout, { loader as profileLoader} from './Components/Layout/ProfileLayout';
import ProfilePost, {loader as profilePostLoader} from './Components/Body/ProfilePost';
import Followers, {loader as followersLoader} from './Components/Body/Followers';
import Followings, {loader as followingsLoader} from './Components/Body/Followings';
import EditPage from './Components/Body/EditPage';


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Layout/>}>
            <Route path='' element={<Layout2/>}>
                <Route path='' element={<Post/>} loader={postLoader}/>
                <Route path='profile/:userId'element={<ProfileLayout/>} loader={profileLoader} >
                    <Route path='' element={<ProfilePost/>} loader={profilePostLoader} />
                    <Route path='followers' element = {<Followers/>} loader={followersLoader}/>
                    <Route path ='followings' element = {<Followings/>} loader={followingsLoader}/>
                    
                </Route>
            </Route>
            <Route path='login' element={<Login/>}/>
            <Route path='profile/:userId/edit' element= {<EditPage/>}/>   
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
        <Toaster />
    </React.StrictMode>
)

