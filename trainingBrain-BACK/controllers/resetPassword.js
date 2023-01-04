const getDB = require("../database/getDB");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const resetPassword = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        const {recoverCode, newPassword} = req.body;

        if(!recoverCode && !newPassword ) {
            const error = new Error('Missing fields');
            error.httpStatus = 400;
            throw(error);
        }

        const [users] = await connection.query(
            `SELECT id FROM users WHERE recoverCode = ?`,
            [recoverCode]
        );

        if(users.length < 1){
            const error = new Error('Wrong recovery code');
            error.httpStatus = 404;
            throw(error);
        };

        const regExpPass = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-])(?=.{8,})/
        if(!regExpPass.test(newPassword)){
            const error = new Error('Wrong password. The password must be between 8 to 16 characters long and have at least one uppercase letter, one lowercase letter, one number, and one special character(! @ # $ % ^ & * -).');
            error.httpStatus = 404;
            throw(error);  
        }

        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        await connection.query(
            `UPDATE users SET password = ?, recoverCode = NULL, modifiedAt = ? WHERE id = ?`,
            [hashedPassword, new Date(), users[0].id]
        );

        res.send({
            status: 'ok', 
            message: 'Update password'
        });

    } catch (error) {
        next(error)
    }finally{
        if(connection) connection.release();
    }
};

module.exports = resetPassword;