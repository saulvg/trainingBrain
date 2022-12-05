import useTrainigFolders from "../../hooks/useTrainingFolders"


const SelectFolder = ({setIdFolder, token, setError, setChooseFolder}) => {

    const pastOrFutureTrainings = 'future'
   const {folders, error} = useTrainigFolders(token, pastOrFutureTrainings);

   if(error){
    setError(error)
   }
    
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