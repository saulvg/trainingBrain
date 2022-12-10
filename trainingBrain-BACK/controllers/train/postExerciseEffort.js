const getDB = require('../../database/getDB')

const postExerciseEffort = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const idReqUser = req.userAuth.id
        const {idUser, idFolder, effort} = req.body
        const folderParam = req.params.idFolder
        
        if(idReqUser !== Number(idUser) || idFolder !== folderParam){
            const error = new Error('You do not have permission');
            error.httpStatus = 403;
            throw error
        }

        /* const [id_rep] = await connection.query(
            `SELECT id, id_user, id_exercises, id_folder_day FROM train_rules WHERE id_user = ? && id_folder_day = ?`,
            [idUser, idFolder]
        );

        console.log('soy id_rep', id_rep);

        console.log('EFFORT',effort); */

        for(let currentEffort in effort){
            await connection.query(
                `UPDATE train_rules SET reps_done = ?, weight = ? WHERE id = ?;`,
                [effort[currentEffort].reps, effort[currentEffort].weight, currentEffort]
            )
        }


        res.send({
            status:'ok',
            message: 'successfully post'
        })

    } catch (error) {
        next(error);
    }finally {
        if(connection) connection.release();
    }
} 

module.exports = postExerciseEffort