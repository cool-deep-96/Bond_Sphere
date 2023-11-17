import React, { useContext, useState } from "react";
import { postEndPoints } from "../../apihandler/apiList";
import apicall from "../../apihandler/apiCall";
import AppContext from "../../Context/AppContex";

const CreatePost = () => {
    const {setAuthenticated} = useContext(AppContext)
    const [file, setFile] = useState(null);
    const[post, setPost] = useState(null);
    const [caption, setCaption] = useState(null);
    const [colorMessage, setColorMessage] = useState(true);
    const [message, setMessage] = useState('');
    const handleChange = (event) => {
        const selectedFile = event.target.files[0];
        setPost(selectedFile);

        if (selectedFile) {
            setFile(URL.createObjectURL(selectedFile));
        } else {
            setFile(null);
        }
    }
    
    const createPostRequest = async () => {
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

        const method = "POST";
        const url = postEndPoints.CREATE_REQUEST;
        headers = headers;
        const data = new FormData();
        data.append('caption', caption);
        data.append('urlToImg', post);

        await apicall(
            method,
            url,
            data,
            headers
        ).then(response => {
            setMessage("posted succesfully")
        }).catch(error => {
            setAuthenticated(false);
        })

    }
    return (
        <>
            <div className='flex flex-col h-full justify-center place-items-center '>
                <div className=" border-2 border-green-800 rounded-3xl w-96 px-7 bg-green-200">
                    <p className='text-center text-3xl font-bold pt-4 mb-12'>Create New Post</p>
                    {file && <img src={file}/>}
                    <p className={`text-xl ${colorMessage ? 'text-green-700' : 'text-red-700'} mb-9 text-center`}>{message}</p>
                    <p className='px-4 text-lg '>Choose new Post to be Post</p>
                    <input
                        className='text-xl mb-6 w-11/12 mx-3 py-1 px-3 border-2 border-green-300 bg-green-100 focus:outline-none focus:border-green-600 rounded-lg'
                        placeholder='userId'
                        type='file'
                        required
                        onChange={handleChange}
                    />
                    <input className='text-xl mb-2 w-11/12 mx-3 py-1 px-3 border-2 border-green-300 bg-green-100 focus:outline-none focus:border-green-600  rounded-lg'
                        placeholder='Caption for your new Post'
                        type="Text"
                        required
                        onChange={(event) => setCaption(event.target.value)}

                    />
                    <div className='flex justify-center mb-5'>
                        <button onClick={createPostRequest}
                            className='text-xl bg-blue-400 px-10 py-2 rounded-3xl text-white font-semibold'>
                            Post
                        </button>
                    </div>

                </div>

            </div>
        </>
    )
}

export default CreatePost;