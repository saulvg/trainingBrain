// ## Style ##
import './error.css';
//Componente para pintar errores o mensajes de alerta, recibe como prop el mensaje que mostrara
const Error = ({ children }) => {
  return (
    <div className='bodyError'>
      <div id='nExperiences'>
        <div id='nExperiencesStyle'>❗ {children}</div>
      </div>
    </div>
  );
};
export default Error;
