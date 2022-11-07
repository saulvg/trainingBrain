const getDB = require("../database/getDB");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { isValid } = require("date-fns");

const editPassword = async (req, res, next) => {
    
    let connection;
    try {
        connection = await getDB();

        const idReqUser = req.userAuth.id;

        const {oldPassword, newPassword} = req.body;

        const [users] = await connection.query(
            `SELECT password FROM users WHERE id = ?`,
            [idReqUser]
        );

        const isValid = await bcrypt.compare(oldPassword, users[0].password);


        if(!isValid) {
            const error = new Error('The password is not correct');
            error.httpStatus = 401;
            throw error;
        };

        const hashedPassword = await bcrypt.hash(newPassword,saltRounds);

        await connection.query(
            `UPDATE users SET password = ?, modifiedAt = ? WHERE id = ?`,
            [hashedPassword, new Date(), idReqUser]
        );

        res.send({
            status: 'ok',
            message: 'Password update successfully' 
        });

    } catch (error) {
        next(error)
    }finally{
        if(connection) connection.release();
    }
};

module.exports = editPassword;