const getDB = require('../../database/getDB');

const newFolder = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const idReqUser = req.userAuth.id;
        const {folderName, date} = req.body;


        if(!folderName && !date) {
            const error = new Error('Missing fields');
            error.httpStatus = 400;
            throw(error);
        }

      
        const [newFolder] = await connection.query(
            `INSERT INTO folder_day
                (id_user, folder_name, date, createdAt)
            VALUES
                (?, ?, ?, ?)`,
            [
                idReqUser,
                folderName,
                date,
                new Date()
            ]
        );

        res.send({
            status:'ok',
            message:'The folder has been created',
            
        })
    } catch (error) {
        next(error)
    }finally{
        if(connection) connection.release()
    }
}

module.exports = newFolder