// ## Style ##
import './loading.css';
//Componente que mostramos cuando necesitamos cargar en alguna parte de la pagina, recibe como prop el mensaje que se quiera mostrar mientras carga y una class por si hiciese falta cambair algun estilo
const Loading = ({ children, clas }) => {
  return (
    <div id='entryCreated' className={clas}>
      <div>{children}</div>
      <div className='loading'></div>
    </div>
  );
};
export default Loading;