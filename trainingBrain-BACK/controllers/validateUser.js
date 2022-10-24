const getDB = require("../database/getDB");

const validateUser = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        const { registrationCode } = req.params;

        const [users] = await connection.query(
            `SELECT id FROM users WHERE registrationCode = ?`, 
            [registrationCode]
        );

        /* console.log('USERS: ', users); */
        if(users.length < 1) {
            const error = new Error('There are no pending users to validate with this registration code');
            error.httpStatus = 404;
            throw error;
        }

        await connection.query(
            `UPDATE users SET active = true, registrationCode = NULL WHERE registrationCode = ?`,
            [registrationCode]
        );

        res.send({
            status: 'ok',
            message: 'User actived'
        })
    } catch (error) {
        console.error(error);
        next(error)
    }finally{
        if (connection) connection.release();
    }
} 
module.exports = validateUser;