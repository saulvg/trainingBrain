const getDB = require("../../database/getDB");

const getTrainDay= async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const idReqUser = req.userAuth.id
        const {idExercise} = req.params
   

        const [day_training] = await connection.query(
            `SELECT id_exercises, date, series, repetitions, weight FROM day_training WHERE id_exercises = ? && id_user = ?`,
            [idExercise, idReqUser] 
        );

       
       /*  if(day_training.length < 1) {
            const error = new Error('Training day does not exist')
            error.httpStatus = 404;
            throw(error)
        } */


        const exercises = []
        for(let idEx of day_training){
            const [exercise] = await connection.query(
                `SELECT 
                    id, id_user, exerciseName, exerciseDescription, exercisePhoto 
                FROM 
                    exercises 
                WHERE 
                    id = ? && id_user = ?`,
                [idEx.id_exercises, idReqUser]
            );
            exercises.push(exercise);
        }
            
        res.send({
            status: 'ok',
            data: {
                exercises,
                day_training
            }
        })


    } catch (error) {
        next(error)
    }finally{
        if(connection) connection.release();
    }
}
module.exports = getTrainDay