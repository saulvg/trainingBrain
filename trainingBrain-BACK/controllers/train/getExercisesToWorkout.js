const getDB = require("../../database/getDB");

const getExercisesToWorkout = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const idReqUser = req.userAuth.id
        const {date} = req.body

        const [day_training] = await connection.query(
            `SELECT id_exercises, date, series, repetitions, weight FROM day_training WHERE date = ? && id_user = ?`,
            [date, idReqUser] 
        );

       
        if(day_training.length < 1) {
            const error = new Error('Training day does not exist')
            error.httpStatus = 404;
            throw(error)
        }


        const exercises = []
        for(let idExercise of day_training){
            const [exercise] = await connection.query(
                `SELECT id, id_user, exerciseName, exerciseDescription, exercisePhoto FROM exercises WHERE id = ? && id_user = ?`,
                [idExercise.id_exercises, idReqUser]
            );
            exercises.push(exercise);
        }
        


        


       /*  if(exercise[0].id_user !== idReqUser){
            const error = new Error('You do not have permission');
            error.httpStatus = 403;
            throw(error)
        }
 */
        

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
module.exports = getExercisesToWorkout