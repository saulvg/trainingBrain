import { useEffect, useState } from "react"

const SelectFolder = ({setIdFolder, token, setError, setChooseFolder}) => {
    const [folders, setFolders] = useState([])

    useEffect(()=>{
        const getFolders = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_BACKEND}/users/profile/exercises/folders`, {
                    method: 'GET',
                    headers: {
                        Authorization: token
                    }
                });

                const body = await res.json();

                if(res.ok){
                    setFolders(body.data.folders);
                }else{
                    setError(body.message)
                }
            }catch(error){
                console.error(error);
            }
        }
        getFolders();
    }, [setIdFolder, token, setError]);

    return(
        <ul>
            {folders.map((folder)=>{
                return(
                    <li key={folder.id} onClick={()=> {
                        setIdFolder(folder.id)
                        setChooseFolder(false)
                    }}>
                        <div>Name:{folder.folder_name} Date:{folder.date.slice(0,10)}</div>
                    </li>
                )
            })}
        </ul>
    )
}

export default SelectFolder