const getDB = require('../../database/getDB');
const { savePhoto } = require('../../helpers');

const newExercise = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const idReqUser = req.userAuth.id;

        const {
            exerciseName,
            exerciseDescription,
        } = req.body
        if(!exerciseName) {
            const error = new Error('Missing fields');
            error.httpStatus = 400;
            throw(error);
        }

        const exercisePhoto = req.files?.exercisePhoto;
        let savedPhoto;
        if (exercisePhoto) {
            savedPhoto = await savePhoto(exercisePhoto);
        }else {
            savedPhoto = ''
        }


        const [newExercise] = await connection.query(
            `INSERT INTO exercises
                (id_user, exerciseName, exerciseDescription, exercisePhoto, createdAt)
            VALUES
                (?, ?, ?, ?, ?)`,
            [
                idReqUser,
                exerciseName,
                exerciseDescription,
                savedPhoto,
                new Date()
            ]
        );

        res.send({
            status:'ok',
            message:'The exercise has been created',
            data: {
                id: newExercise.insertId
            }
        })
    } catch (error) {
        next(error)
    }finally{
        if(connection) connection.release()
    }
}

module.exports = newExercise