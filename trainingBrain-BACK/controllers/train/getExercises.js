const getDB = require("../../database/getDB");

const getExercises = async (req, res, next) => {
    let connection;

    try {

        connection = await getDB();
        const idReqUser = req.userAuth.id; 

        const [exercises] = await connection.query(
            `SELECT 
                id, exerciseName, exerciseDescription, exercisePhoto, createdAt 
            FROM 
                exercises 
            WHERE 
                id_user = ? 
            ORDER BY
                createdAt DESC`,
            [idReqUser]
        );

        if (exercises.length < 1) {
            const error = new Error("You haven't created exercises yet");
            error.httpStatus = 400;
            throw(error)
        }

        res.send({
            status: 'ok',
            data: {
                exercises
            }
        })
    } catch (error) {
        next(error)
    }finally{
        if(connection) connection.release()
    }
} 

module.exports = getExercises