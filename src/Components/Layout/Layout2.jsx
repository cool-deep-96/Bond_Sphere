import React from 'react'
import { Outlet } from 'react-router-dom'
import { AppContextProvider } from '../../Context/AppContex'
import Footer from '../Footer/Footer'


export const Layout2 = () => {
  return (
    <>
    <AppContextProvider>
        <Outlet/>
        <Footer/>
        
    </AppContextProvider>
    </>

  )
}

export default Layout2;
