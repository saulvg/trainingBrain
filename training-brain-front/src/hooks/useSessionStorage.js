import { useState, useEffect } from "react";

//Custom Hook que guarda el valor del token en el localStorage
const useLocalStorage = (key) => {
    const [value, setValue] = useState(localStorage.getItem(key));
    useEffect(()=>{
        localStorage.getItem(key, value)
    },[key, value]);
    return [value, setValue];
};

export default useLocalStorage;