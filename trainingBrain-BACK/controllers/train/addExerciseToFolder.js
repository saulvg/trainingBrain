const getDB = require("../../database/getDB");

const addExerciseToFolder = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const idReqUser = req.userAuth.id
        const {idExercise, idFolder, series, repetitions} = req.body;

        if(!idExercise && !idFolder && !series && !repetitions ) {
            const error = new Error('Missing fields');
            error.httpStatus = 400;
            throw error;
        }

        const [exercise] = await connection.query(
            `SELECT id, id_user FROM exercises WHERE id = ?`,
            [idExercise]
        );

        const [folderDay] = await connection.query(
            `SELECT id, id_user FROM folder_day WHERE id = ?`,
            [idFolder]
        );

        console.log('exercise', exercise);
        console.log('folderDay', folderDay);
        if((exercise[0]?.id_user !== idReqUser) || (folderDay[0]?.id_user !== idReqUser)){
            const error = new Error('You do not have permission');
            error.httpStatus = 403;
            throw(error)
        }

        await connection.query(
            `INSERT INTO day_training (id_user, id_exercises, id_folder_day, series, repetitions, createdAt) VALUES (?, ? , ?, ?, ?, ?)`,
            [idReqUser, idExercise, idFolder ,series, repetitions, new Date()] 
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
module.exports = addExerciseToFolder