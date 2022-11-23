const getDB = require('../../database/getDB')

const getFolders = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const idReqUser = req.userAuth.id
        const {idFolder} = req.body

        const [folders] = await connection.query(
            `SELECT id, id_user, folder_name, date, createdAt FROM folder_day WHERE id_user = ? && date > curdate() -1 ORDER BY createdAt DESC`,
            [idReqUser]
        );

        if (folders.length < 1) {
            const error = new Error("You haven't created folders yet");
            error.httpStatus = 400;
            throw(error)
        }

        res.send({
            status: 'ok',
            data: {
                folders
            }
        })
    } catch (error) {
        next(error);
    }finally{
        if (connection) connection.release();
    }
};

module.exports = getFolders