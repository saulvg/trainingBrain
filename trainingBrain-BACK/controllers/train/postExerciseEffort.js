const getDB = require('../../database/getDB')

const postExerciseEffort = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const idReqUser = req.userAuth.id
        const {effort} = req.body
        const folderParam = req.params.idFolder


        let user_effort =[]

        for(let idEffort in effort){
            const [id_effort] = await connection.query(
                `SELECT id FROM train_rules WHERE id_user = ? AND id_folder_day = ? AND id = ?`,
                [idReqUser, folderParam, idEffort]
            )
            if(id_effort.length === 0){
                continue;
            }else{
                user_effort.push(id_effort)
            }

        }

        if(user_effort.length <= 0){
            const error = new Error('You do not have permission');
            error.httpStatus = 403;
            throw error
        }
        
        for(let currentEffort in effort){
            await connection.query(
                `UPDATE train_rules SET reps_done = ?, weight = ? WHERE id = ? AND id_user = ?;`,
                [effort[currentEffort].reps, effort[currentEffort].weight, currentEffort, idReqUser]
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