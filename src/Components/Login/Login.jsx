import React, { useContext, useState } from 'react';
import AppContext from '../../Context/AppContex';
import { userEndPoints } from '../../apihandler/apiList';
import apicall from "../../apihandler/apiCall";
import{ useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';



const Login = () => {

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState("");
    const [togle, setTogle] = useState(true);
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passMessage, setPassMessage] = useState("");
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const loginRequest = async () => {
        setLoading(true);
        const method = "POST";
        const url = userEndPoints.LOGIN_REQUEST;
        const data = {
            userId: userId,
            password: password
        }
        const headers = null;
        try{
           const response = await apicall(
                method,
                url,
                data,
                headers
            );
            localStorage.setItem('token', response.token);
            localStorage.setItem('userId', response.userId);
            localStorage.setItem('_id', response._id);
            (response.urlToImg && localStorage.setItem('urlToImg', response.urlToImg));


            toast.success(response.message);

            
            navigate('/');
            
        } catch(error){

            toast.error(error.message); 

        }
        setLoading(false);


    }

    const createRequest = async () => {
        setLoading(true);
        try{

        if (confirmPassword != password) {

            setPassMessage(" Password doesn't match ");
            throw new Error();
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

        
            const response = await apicall(
                        method,
                        url,
                        data,
                        headers
                    )


            toast.success(response.message);

        }catch (error){

            toast.error(error.message);

        }
        setLoading(false);
    }


    return (
        <>
            <div className='min-w-screen-sm h-screen'>

            {togle ?

                (<div className='flex flex-col h-full justify-center place-items-center'>
                    <div className=" border-2 border-green-800 rounded-3xl w-96 px-7 ">
                        <p className='text-center text-3xl font-bold pt-4 mb-12'>Login</p>
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
                            <button onClick={loginRequest} disabled={loading}
                                className='text-xl bg-blue-400 disabled:bg-gray-400 px-10 py-2 rounded-3xl text-white font-semibold'>
                                Login
                            </button>
                        </div>
                        <p onClick={() => { setTogle(!togle);}}
                            className='text-blue-800 pl-4 mb-10 hover:cursor-pointer'>New user?</p>

                    </div>

                </div>) :
                (
                    <div className='flex flex-col h-full justify-center place-items-center'>
                        <div className=" border-2 border-green-800 rounded-3xl w-96 px-7">
                            <p className='text-center text-3xl font-bold pt-4 mb-12'>Register User</p>
                
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
                                <input type="file" accept='image/*' onChange={(event) => setImage(event.target.files[0])} />

                                
                            </div>
                            <div className='flex justify-center my-5'>
                                    <button onClick={createRequest} disabled={loading}
                                        className='text-xl bg-blue-400 px-10 disabled:bg-gray-400 py-2 rounded-3xl text-white font-semibold'>
                                        Register
                                    </button>
                                </div>


                            <p onClick={() => { setTogle(!togle);}}
                                className='text-blue-800 pl-4 mb-10 hover:cursor-pointer'>Already Registered ?</p>

                        </div>

                    </div>
            

                )

            }
            </div>
        </>

    )
}

export default Login;