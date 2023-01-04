import "./styleInputs.css"
const InputElement = ({labelName, type, id ,name, value, onChange, placeholder, required, clas, autocomplete}) => {
    return(
        <label>
            {labelName}
            <input className={`input-element ${clas}` }
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                autoComplete={autocomplete}
            />
        </label>
    )
};

export default InputElement;