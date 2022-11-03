const InputElement = ({labelName, type, id ,name, value, onChange, placeholder, required}) => {
    return(
        <label>
            {labelName}
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