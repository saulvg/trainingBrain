import { useState, useEffect } from "react";

//custoomHook que guarda el valor del token en el localStorage
export const useLocalStorage = (key) => {
    const [value, setValue] = useState(localStorage.getItem(key) ?? '');
    useEffect(() => {
        localStorage.setItem(key, value);
    }, [key, value]);
    return [value, setValue];

};

