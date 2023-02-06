const getDB = require('../../database/getDB');

const deleteExercise = async (req, res, next) => {
    let connection
    try {
        connection = await getDB();

        const idReqUser = req.userAuth.id

        const {idExercise} = req.body
        
        await connection.query(
            `DELETE FROM exercises WHERE id = ? AND id_user = ?`,
            [idExercise, idReqUser]
        ); 


        res.send({
            status: 'ok',
            message: 'Exercise deleted'
        })

    } catch (error) {
        next(error)
    }finally{
        if (connection) connection.release()
    }
}

module.exports = deleteExercise;