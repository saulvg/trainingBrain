// ## Style ##
/* import './Forms.css'; */

//Componente que pinta un boton recibe props, la funcion manejadora del onClik y el texto que contendra el boton
const ConfirmBotton = ({ name, onClick }) => {
  return (
    <button className='button-first-forms' onClick={onClick}>
      {name}
    </button>
  );
};

export default ConfirmBotton;
