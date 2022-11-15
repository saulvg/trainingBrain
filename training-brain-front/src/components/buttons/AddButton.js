const AddButton = ({ name, onClick }) => {
    return (
      <button className='' onClick={onClick}>
        {name}
      </button>
    );
  };
  
  export default AddButton;