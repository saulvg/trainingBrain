import './loading.css';

const Loading = ({ children }) => {
  return (
    <div id='loader'>
      <div>{children}</div>
      <div className='loading'></div>
    </div>
  );
};
export default Loading;