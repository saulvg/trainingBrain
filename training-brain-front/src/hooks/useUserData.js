import { useEffect, useState } from "react";
import decode from 'jwt-decode'

const useUserData =  (token) => {

    const [error, setError] = useState('')
    const [username, setUsername] = useState('');


    useEffect(()=>{
        const loadData = async () => {
            try {
                const decoded = decode(token);
                const res = await fetch(`${process.env.REACT_APP_BACKEND}/users/${decoded.id}`,{
                    method:'GET',
                    headers:{
                        Authorization: token, 
                        'Content-Type':'application/json'
                    },
                })
                const body = await res.json();
               
                if(res.ok){
                    setUsername(body.data.user.username);

                }else{
                    setError(body.message)
                }
            } catch (error) {
                console.error(error);
            }
        }
        loadData();
    },[token, setUsername])

    return {username, error}
}

export default useUserData;