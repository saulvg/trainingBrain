// ## Style ##
import './error.css';

//Componente para pintar errores o mensajes de alerta, recibe como prop el mensaje que mostrara
const Error = ({ children }) => {
  
  return (
    <div className='body-error'>
      <div id='container-error'>
        <div id='error-message'>❗ {children}</div>
      </div>
    </div>
  );
};
export default Error;
