const { useEffect, useState } = require("react");



const useTrainigFolders = (token, pastOrFutureTrainings, modalFolder) => {
    const [folders, setFolders] = useState([]);
    const [error, setError] = useState('');

    useEffect(()=>{
        const getFolders = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_BACKEND}/users/profile/training/${pastOrFutureTrainings}`, {
                    method: 'GET',
                    headers: {
                        Authorization: token,
                    },
                    
                });

                const body = await res.json();

                if(res.ok){
                    setFolders(body.data.folders);
                    setError('');
                }else{
                    setError(body.message)
                }
            }catch(error){
                console.error(error);
            }
        }
        getFolders();
    }, [token, setFolders, pastOrFutureTrainings, error, modalFolder]);

    return {folders, error}

}

export default useTrainigFolders;