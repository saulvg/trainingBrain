const getDB = require("../../database/getDB");

const addExerciseToWorkout = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const idReqUser = req.userAuth.id
        const {idExercise, date, series, repetitions, weight} = req.body;

        if(!idExercise && !date && !series && !repetitions && !weight) {
            const error = new Error('Missing fields');
            error.httpStatus = 400;
            throw error;
        }

        const [exercise] = await connection.query(
            `SELECT id, id_user FROM exercises WHERE id = ?`,
            [idExercise]
        );

        if(exercise[0].id_user !== idReqUser){
            const error = new Error('You do not have permission');
            error.httpStatus = 403;
            throw(error)
        }

        await connection.query(
            `INSERT INTO day_training (id_user, id_exercises, date, series, repetitions, weight, createdAt) VALUES (?, ?, ? , ?, ?, ?, ?)`,
            [idReqUser, idExercise, date ,series, repetitions, weight, new Date()] 
        );

        res.send({
            status: 'ok',
            message: 'Craft day'
        })


    } catch (error) {
        next(error)
    }finally{
        if(connection) connection.release();
    }
}
module.exports = addExerciseToWorkout