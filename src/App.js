import React, { useContext, useState } from 'react';
import AppContext from "./Context/AppContex";
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Body from './Components/Body/Body';
import Login from './Components/Login/Login';

const App = () => {
    const { authenticated } = useContext(AppContext);
    

    return (
        <>{ authenticated? 
            (<div className='flex flex-col'>
                <div className='fixed w-full top-0'>
                    
                        <Header />
                    
                    
                </div >
                <div className=" mt-14 ">
                    <Body />
                    
                </div>

                <div className='fixed w-full bottom-0' >
                    <Footer />
                </div>
            </div>) :
            (
                <div className='w-full h-full '>
                    <Login/>
                </div>
                
            )

            }

        </>

    )
}

export default App;