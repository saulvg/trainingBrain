const getDB = require('../database/getDB');
const {generateRandomString} = require('../helpers')
const deleteUser = async (req, res, next) => {
    let connection
    try {
        connection = await getDB();

        const idReqUser = req.userAuth.id


        

        await connection.query(
            `UPDATE users SET password = ?, username = ?, active = 0, deleted = 1, email = ?, weight = ?, height = ?, age = ?, modifiedAt = ?
            WHERE id = ?`,
            [
                generateRandomString(20),
                generateRandomString(20), 
                generateRandomString(20),
                0,
                0,
                0,
                new Date(),
                idReqUser
            ]
        ); 

        await connection.query(
            `DELETE FROM users WHERE id = ? AND deleted = ?`,
            [idReqUser, 1]
        )

        res.send({
            status: 'ok',
            message: 'User deleted'
        })

    } catch (error) {
        next(error)
    }finally{
        if (connection) connection.release()
    }
}

module.exports = deleteUser;