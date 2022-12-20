// ## Style ##
/* import './Forms.css'; */

//Componente que pinta un boton recibe props, la funcion manejadora del onClik y el texto que contendra el boton
const ConfirmBotton = ({ name, onClick }) => {
  return (
    <button className='general-buttons' onClick={onClick}>
      {name}
    </button>
  );
};

export default ConfirmBotton;
