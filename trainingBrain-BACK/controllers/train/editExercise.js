const getDB = require('../../database/getDB')

const editExercise = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const idReqUser = req.userAuth.id

        const {
            idExercise,
            exerciseName, 
            exerciseDescription
        } = req.body

        if(!idExercise){
            const error = new Error('Missing fields');
            error.httpStatus = 400;
            throw error;
        }

        const [exercise] = await connection.query(
            `SELECT id FROM exercises WHERE id = ? AND id_user = ?`,
            [idExercise, idReqUser]
        ) 

        if(exercise.length < 1){
            const error = new Error('You do not have permission');
            error.httpStatus = 403;
            throw error;
        }

        if(exerciseName) {
            await connection.query(
                `UPDATE exercises SET exerciseName = ?, modifiedAt = ? WHERE id = ?`,
                [exerciseName, new Date(), idExercise]
            )
        }

        if(exerciseDescription) {
            await connection.query(
                `UPDATE exercises SET exerciseDescription = ?, modifiedAt = ? WHERE id = ?`,
                [exerciseDescription, new Date(), idExercise]
            )
        }

        res.send({
            status:'ok',
            message: 'Changes update successfully'
        })
    } catch (error) {
        next(error)
    }finally{
        if(connection) connection.release()
    }
}
module.exports = editExercise;