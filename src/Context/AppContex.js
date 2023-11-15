import React, { createContext, useEffect, useState } from "react";
import apicall from "../apihandler/apiCall";
import { userEndPoints, postEndPoints } from "../apihandler/apiList";
import { allPosts, user } from "../zustand/Store";


const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState();
    const storePosts = allPosts((state) => state.storePosts);
    const storeProfile = user((state) => state.storeProfile);

    const getAllPosts = async () => {
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
        const method = 'GET'
        const url = postEndPoints.GET_REQUEST;
        const data = null

        await apicall(
            method,
            url,
            data,
            headers
        ).then(response => {
            storePosts(response.post);
            storeProfile(response.user);
            setAuthenticated(true);
            
            
        }).catch(error => {
            setAuthenticated(false);
        })
    }

    useEffect(() => {
        getAllPosts();

    },[])

    const values = {
        authenticated,
        setAuthenticated,
        getAllPosts

    }
    return (
        <AppContext.Provider value={values} >
            {children}
        </AppContext.Provider>

    )
}

export default AppContext;
export { AppContextProvider };