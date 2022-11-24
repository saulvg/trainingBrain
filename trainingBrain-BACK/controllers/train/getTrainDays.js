const getDB = require('../../database/getDB')
const {format} = require('date-fns');


function formatDate (date) {
    return format(date, 'yyyy-MM-dd')
}

const getTrainDays = async (req, res, next) => {
    let connection;

    try {
        
        connection = await getDB();

        const idReqUser = req.userAuth.id;
        const {pastOrFutureTrainDay} = req.body;
        const fDate = formatDate(new Date());
        
        let training_days;

        if(!pastOrFutureTrainDay || pastOrFutureTrainDay === 'future') {
            [training_days] = await connection.query(
                `SELECT id_exercises, series, repetitions FROM day_training WHERE id_user = ? && date >= ?`,
                [idReqUser, fDate]
            )
        }else if(pastOrFutureTrainDay === 'past'){
            [training_days] = await connection.query(
                `SELECT id_exercises, series, repetitions FROM day_training WHERE id_user = ? && date < ?`,
                [idReqUser, fDate]
            )
        }

        const exercises = []
        for(let idExercise of training_days) {
            const [exercise] = await connection.query(
                `SELECT 
                    id, id_user, exerciseName, exerciseDescription, exercisePhoto 
                FROM 
                    exercises 
                WHERE 
                    id = ? && id_user = ?`,
                [idExercise.id_exercises, idReqUser]
            );
            exercises.push(exercise);
        }


        res.send({
            status: 'ok',
            data: {
                training_days,
                exercises
            }
        })


    } catch (error) {
        next(error)
    }finally{
        if(connection) connection.release()
    }
}

module.exports = getTrainDays