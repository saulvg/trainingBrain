
//Componente que pinta un boton recibe props, la funcion manejadora del onClik y el texto que contendra el boton
const ConfirmBotton = ({ name, onClick, clas }) => {
  return (
    <button className={`general-buttons ${clas}`} onClick={onClick} >
      {name}
    </button>
  );
};

export default ConfirmBotton;
