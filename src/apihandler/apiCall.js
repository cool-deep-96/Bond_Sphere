import axios from 'axios';
// import { alerts } from '../zustand/Store';
// import { useContext } from 'react';
// import AppContext from '../Context/AppContex';


// const message = alerts((state) => state.message);
// const setMessage = alerts((state) => state.setMessage);


async function apicall  (
    method,
    url,
    data,
    headers
){
        const response = await axios({
            method : method,
            url : url,
            data : data,
            headers: headers
        }).then((response )=>{
            // setMessage(response.data.message);
            console.log(response, "ok");
            console.log(response.data);
            return response.data;
        }).catch((error) => {
            if(error.response){
                throw new Error (error.response.data.message);
            }
            else if(error.request){
                throw new Error("Network Error occured");
            }else{
                throw new Error(error.message);
            }     
        })

        return response;

    
    
}

export default apicall;