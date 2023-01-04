import './loading.css';

const Loading = ({ children, clas, fatherClas}) => {
  return (
    <div id='loader' className={fatherClas}>
      <div className='loading-children'>{children}</div>
      <div className={`loading ${clas}`}></div>
    </div>
  );
};
export default Loading;