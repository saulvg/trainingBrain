import { useState } from "react";


const InputPassword = ({type, id ,name, value, onChange, placeholder, required}) => {
    
    const [togglePassword, setTogglePassword] = useState(true)
    
    return(
        <label>
            <div>
                <input
                    type={togglePassword ? type : ''}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    />
                <span onClick={()=>{setTogglePassword(!togglePassword)}}>👀</span>
            </div>
        </label>
    )
};

export default InputPassword; 