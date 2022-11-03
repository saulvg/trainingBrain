import { useContext, useEffect, useState } from "react";
import decode from 'jwt-decode'
import { AuthContext } from "../App";

const useUserData =  (token) => {

    /* const {token} = useContext(AuthContext) */
    const decoded = decode(token);
   

    const [username1, setUserName1] = useState('');
    const [height1, setHeight1] = useState('');
    const [weight1, setWeight1] = useState('');
    const [age1, setAge1] = useState('');

    const [error, setError] = useState('')

    useEffect(()=>{
        const userData = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_BACKEND}/users/${decoded.id}`,{
                    method:'GET',
                    headers:{
                        Authorization: token, 
                        'Content-Type':'application/json'
                    },
                })
                const body = await res.json();
                console.log(body);
                if(res.ok){
                    //console.log(body.data.user.username);
                    setUserName1(body.data.user.username);
                    setHeight1(body.data.user.height);
                    setWeight1(body.data.user.weight);
                    setAge1(body.data.user.age);

                }else{
                    setError(body.message)
                }
            } catch (error) {
                console.error(error);
            }
        }
        userData();
    },[username1, height1, error, token, decoded])

    return {username1, setUserName1, age1, height1, weight1, error}
}

export default useUserData;