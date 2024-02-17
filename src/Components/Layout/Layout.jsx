import React from 'react'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import { AppContextProvider } from '../../Context/AppContex'
import Footer from '../Footer/Footer'

export const Layout = () => {
  return (
    <>
    <AppContextProvider>
        <Header/>
        <Outlet/>
    </AppContextProvider>
    </>

  )
}

export default Layout;
