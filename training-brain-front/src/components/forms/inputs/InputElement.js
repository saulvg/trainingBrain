const InputElement = ({type, id ,name, value, onChange, placeholder, required}) => {
    return(
        <label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
        </label>
    )
};

export default InputElement;