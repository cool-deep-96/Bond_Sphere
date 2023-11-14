import React, { useContext, useState } from 'react';
import AppContext from '../../Context/AppContex';
import { userEndPoints } from '../../apihandler/apiList';
import apicall from "../../apihandler/apiCall";



const Login = () => {
    const { getAllPosts } = useContext(AppContext);
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState("");
    const [togle, setTogle] = useState(true);
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passMessage, setPassMessage] = useState("");
    const [image, setImage] = useState('');
    const [colorMessage, setColorMessage] = useState(false);


    const loginRequest = async () => {
        const method = "POST";
        const url = userEndPoints.LOGIN_REQUEST;
        const data = {
            userId: userId,
            password: password
        }
        const headers = null
        await apicall(
            method,
            url,
            data,
            headers
        ).then(response => {
            console.log(response.token)
            localStorage.setItem('token', response.token);
            getAllPosts();
            
            console.log(response, "success");
        }).catch(error => {
            setMessage(error.message);
            console.log(error.message);
        })

    }

    const createRequest = async () => {

        if (confirmPassword != password) {

            setPassMessage(" Password doesn't match ");
            return;
        }
        setPassMessage("");

        const method = "POST";
        const url = userEndPoints.CREATE_REQUEST;
        const data = new FormData();
        data.append('userId', userId);
        data.append('email', email);
        data.append('urlToImg', image);
        data.append('password', password);

        const headers = null

        await apicall(
            method,
            url,
            data,
            headers
        ).then((response) => {
            setColorMessage(true);
            setMessage(response.message);
        }).catch((error) => {
            setColorMessage(false);
            setMessage(error.message);
        })

    }


    return (
        <>
            {togle ?

                (<div className='flex flex-col h-full justify-center place-items-center'>
                    <div className=" border-2 border-green-800 rounded-3xl w-96 px-7 ">
                        <p className='text-center text-3xl font-bold pt-4 mb-12'>Login</p>
                        <p className={`text-xl ${colorMessage ? 'text-green-700' : 'text-red-700'} mb-9 text-center`}>{message}</p>
                        <p className='px-4 text-lg '>Enter Your userId</p>
                        <input
                            className='text-xl mb-6 w-11/12 mx-3 py-1 px-3 border-2 border-green-300 bg-green-100 focus:outline-none focus:border-green-600 rounded-lg'
                            placeholder='userId'
                            type='text'
                            required
                            onChange={(event) => setUserId(event.target.value)}
                        />
                        <p className='px-4 text-lg '>Enter Your Password</p>
                        <input className='text-xl mb-2 w-11/12 mx-3 py-1 px-3 border-2 border-green-300 bg-green-100 focus:outline-none focus:border-green-600  rounded-lg'
                            placeholder='Password'
                            type="password"
                            required
                            onChange={(event) => setPassword(event.target.value)}

                        />
                        <p className='text-gray-400 mb-4 pl-4'>Forget userId/Password?</p>
                        <div className='flex justify-center mb-5'>
                            <button onClick={loginRequest}
                                className='text-xl bg-blue-400 px-10 py-2 rounded-3xl text-white font-semibold'>
                                Login
                            </button>
                        </div>
                        <p onClick={() => { setTogle(!togle); setMessage(''); setPassMessage('') }}
                            className='text-blue-800 pl-4 mb-10 hover:cursor-pointer'>New user?</p>

                    </div>

                </div>) :
                (
                    <div className='flex flex-col h-full justify-center place-items-center'>
                        <div className=" border-2 border-green-800 rounded-3xl w-96 px-7">
                            <p className='text-center text-3xl font-bold pt-4 mb-12'>Register User</p>
                            <p className={`text-xl ${colorMessage ? 'text-green-700' : 'text-red-700'} mb-9 text-center`}>{message}</p>
                            <p className='px-4 text-lg '>Enter Your Email</p>
                            <input onChange={(event) => setEmail(event.target.value)}
                                className='text-xl mb-2 w-11/12 mx-3 py-1 px-3 border-2 border-green-300 bg-green-100 focus:outline-none focus:border-green-600 rounded-lg'
                                placeholder='Email'
                                type='email'
                                required />
                            <p className='px-4 text-lg '>Create Your userId</p>
                            <input onChange={(event) => setUserId(event.target.value)}
                                className='text-xl mb-2 w-11/12 mx-3 py-1 px-3 border-2 border-green-300 bg-green-100 focus:outline-none focus:border-green-600 rounded-lg'
                                placeholder='Create New userId'
                                type='text'
                                required />
                            <p className='px-4 text-lg '>Create Your Password</p>
                            <input onChange={(event) => setPassword(event.target.value)}
                                className='text-xl mb-2 w-11/12 mx-3 py-1 px-3 border-2 border-green-300 bg-green-100 focus:outline-none focus:border-green-600  rounded-lg'
                                placeholder='Password'
                                type="password"
                                required
                            />
                            <p className='px-4 text-lg '>Confirmed Your Password</p>
                            <input onChange={(event) => setConfirmPassword(event.target.value)}

                                className='text-xl mb-2 w-11/12 mx-3 py-1 px-3 border-2 border-green-300 bg-green-100 focus:outline-none focus:border-green-600  rounded-lg'
                                placeholder='Confirmed Password'
                                type="password"
                                required
                            />
                            <p className='text-red-700 pl-5 mb-4'>{passMessage}</p>
                            <div className='grid grid-cols-2 '>
                                <p className='px-4 text-lg'>Profile Photo</p>
                                <input type="file" onChange={(event) => setImage(event.target.files[0])} />

                                
                            </div>
                            <div className='flex justify-center my-5'>
                                    <button onClick={createRequest}
                                        className='text-xl bg-blue-400 px-10 py-2 rounded-3xl text-white font-semibold'>
                                        Register
                                    </button>
                                </div>


                            <p onClick={() => { setTogle(!togle); setMessage(''); setPassMessage('') }}
                                className='text-blue-800 pl-4 mb-10 hover:cursor-pointer'>Already Registered ?</p>

                        </div>

                    </div>

                )

            }
        </>

    )
}

export default Login;