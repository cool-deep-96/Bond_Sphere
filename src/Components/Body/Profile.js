import React from "react";
import profileImg from "../../assets/profile3.jpg";
import { user } from "../../zustand/Store";


const Profile = () => {
    const profile = user((state) => state.profile);
    console.log(profile);


    return (
        <>
            <div className="flex flex-col">
                <div className="flex flex-row ">
                    <div classname="">
                        <img src={profileImg} className="h-28 w-28"></img>
                    </div>
                    <div className="px-5 py-2 flex flex-col">
                        <p className="text-2xl font-bold">kuldeep kumar</p>
                        <p className="text-lg pt-3 w-8/12 ">this is bio sectionjsldkjfkd</p>
                    </div>
                </div>
                <div className="flex flex-row justify-evenly pt-10 border-green-100 border-b-2">
                    <div className="flex flex-col ">
                        <p className="text-center font-bold">42</p>
                        <button className='pb-3 px-3 font-semibold w-full'>
                            Posts
                        </button>
                    </div>
                    <div className="flex flex-col ">
                    <p className="text-center font-bold">375</p>
                        <button className='pb-3 px-3   font-semibold w-full'>
                            followers
                        </button>
                    </div>
                    <div className="flex flex-col ">
                    <p className="text-center font-bold">239</p>
                        <button className='pb-3 px-3  font-semibold w-full'>
                        following
                        </button>
                    </div>

                </div>

            </div>
        </>

    )
}

export default Profile;