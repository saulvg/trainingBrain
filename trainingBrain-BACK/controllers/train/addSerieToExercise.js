const getDB = require("../../database/getDB");

const addSerieToExercise = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();
        
        const idReqUser = req.userAuth.id
        const {idExercise, idFolder, expectedReps} = req.body;

        if(!idExercise || !idFolder || !expectedReps ) {
            const error = new Error('Missing fields');
            error.httpStatus = 400;
            throw error;
        }

        const [exercises] = await connection.query(
            `SELECT id, id_user FROM exercises WHERE id = ? && id_user = ?`,
            [idExercise, idReqUser]
        );
        if(exercises.length <= 0){
            const error = new Error('You can not choose this exercise');
            error.httpStatus = 403;
            throw error;
        }
        const [folder] = await connection.query(
            `SELECT id, id_user FROM folder_day WHERE id = ? && id_user = ?`,
            [idFolder, idReqUser]
        );
        if(folder.length <= 0){
            const error = new Error('You can not choose this folder');
            error.httpStatus = 403;
            throw error;
        }
        await connection.query(
            `INSERT INTO train_rules (id_user, id_exercises, id_folder_day, expected_reps, createdAt) VALUES (?, ?, ?, ?, ?)`,
            [idReqUser, idExercise, idFolder, expectedReps, new Date()]
        );

        res.send({
            status: 'ok',
            message: 'Crazf serie'
        })
        
    } catch (error) {
        next(error)
    }finally{
        if(connection) connection.release()
    }

}

module.exports = addSerieToExercise