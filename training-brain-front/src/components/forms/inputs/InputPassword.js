import "./styleInputs.css"
import { useState } from "react";


const InputPassword = ({labelName,type, id ,name, value, onChange, placeholder, required, clas}) => {
    
    const [togglePassword, setTogglePassword] = useState(true)
    
    return(
        <label>
            {labelName}
            <div id='box-input-password'>
                <input className={`input-element ${clas}`}
                    type={togglePassword ? type : ''}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    onContextMenu = {() => 'false'}
                    />
                    <span onClick={()=>{setTogglePassword(!togglePassword)}} style={{backgroundImage: `url('${process.env.REACT_APP_FRONTEND}/img/show-password.png')`}}></span>
                
            </div>
        </label>
    )
};

export default InputPassword; 