const { id } = require("date-fns/locale");
const getDB = require("../../database/getDB");

const getTrainDay= async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const idReqUser = req.userAuth.id
        const {idFolder} = req.params
   


        const [train_rules_idExercises] = await connection.query(
            `SELECT id_exercises FROM train_rules WHERE id_folder_day = ? && id_user = ?`,
            [idFolder, idReqUser] 
        );
       
        if(train_rules_idExercises.length < 1) {
            const error = new Error('Training day does not exist')
            error.httpStatus = 404;
            throw(error)
        }


        
        let idExercises = train_rules_idExercises.map((id_exercises)=>id_exercises.id_exercises).reduce((acc, id_exercise) => {
            if (!acc.find(repId => repId === id_exercise)){
                acc.push(id_exercise)
            }
            return acc
        },[])

        

        const exercises=[];
        for(let idExercise of idExercises){
            const [info_exercise] = await connection.query(
                `SELECT 
                    id, id_user, exerciseName, exerciseDescription, exercisePhoto 
                FROM 
                    exercises 
                WHERE 
                    id = ? && id_user = ?`,
                [idExercise, idReqUser]
            )
            const [plus_info_exercise] = await connection.query(
                `SELECT  id, expected_reps FROM train_rules WHERE id_exercises = ? && id_user = ?`,
                [idExercise, idReqUser] 
            )
            info_exercise[0].series = plus_info_exercise.length
            //info_exercise[0].repetitions = plus_info_exercise.map((reps)=>reps.expected_reps)
            info_exercise[0].repetitions = plus_info_exercise
            exercises.push(info_exercise);
        }

    
        const [folderName] = await connection.query(
            `SELECT folder_name FROM folder_day WHERE id = ?`,
            [idFolder]
        );

        
            
        res.send({
            status: 'ok',
            data: {
                exercises,
                folderName: folderName[0].folder_name
            }
        })


    } catch (error) {
        next(error)
    }finally{
        if(connection) connection.release();
    }
}
module.exports = getTrainDay