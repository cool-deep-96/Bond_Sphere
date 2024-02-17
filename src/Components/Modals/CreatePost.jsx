import React, { useState } from "react";
import { postEndPoints } from "../../apihandler/apiList";
import apicall from "../../apihandler/apiCall";
import toast from "react-hot-toast";

const CreatePost = () => {
    const [file, setFile] = useState(null);
    const[post, setPost] = useState(null);
    const [caption, setCaption] = useState(null);
    const [loading, setLoading] = useState(false);

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
        setLoading(true);
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
        try {
            const response = await apicall(
                method,
                url,
                data,
                headers);


                toast.success(response.message);

        } catch ( error){
                console.log(error.message);
                toast.error(error.message);
        }
        setLoading(false);
        
    }
    return (
        <>
            <div className='flex flex-col h-full justify-center place-items-center '>
                <div className=" border-2 border-green-800 rounded-3xl w-96 px-7 bg-green-200">
                    <p className='text-center text-3xl font-bold pt-4 mb-12'>Create New Post</p>
                    {file && <img src={file}/>}
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
                        <button onClick={createPostRequest} disabled={loading}
                            className='text-xl bg-blue-400 px-10 py-2 disabled:bg-gray-400 rounded-3xl text-white font-semibold'>
                            Post
                        </button>
                    </div>

                </div>

            </div>
        </>
    )
}

export default CreatePost;