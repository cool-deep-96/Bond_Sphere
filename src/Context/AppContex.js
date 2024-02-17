import React, { createContext, useEffect, useState } from "react";
import apicall from "../apihandler/apiCall";
import { userEndPoints, postEndPoints } from "../apihandler/apiList";
import { allPosts, user } from "../zustand/Store";


const AppContext = createContext();

const AppContextProvider = ({ children }) => {



    const values = {


    }
    return (
        <AppContext.Provider value={values} >
            {children}
        </AppContext.Provider>

    )
}

export default AppContext;
export { AppContextProvider };