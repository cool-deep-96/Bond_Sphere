import React, { useContext } from 'react';
import AppContext from "./Context/AppContex";
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Body from './Components/Body/Body';
import Login from './Components/Login/Login';

const App = () => {
    const { authenticated } = useContext(AppContext);
    

    return (
        <>
        

        </>

    )
}

export default App;