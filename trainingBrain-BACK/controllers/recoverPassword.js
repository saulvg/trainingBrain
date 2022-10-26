const getDB = require("../database/getDB");
const { generateRandomString, sendMail } = require("../helpers");

const recoverPassword = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        const {email} = req.body;

        if(!email) {
            const error = new Error('Missing fields');
            error.httpStatus = 400
            throw error
        }

        const [users] = await connection.query(
            `SELECT id FROM users WHERE email = ?`,
            [email]
        );

        if (users.length > 0) {
            const recoverCode = generateRandomString(20);
            const emailBody = `A password change was requested for the user registered with this email in *Training Brain*
            The recovery code is: " ${recoverCode} "
            If you have not requested the password change, please ignore this email`;
            
            await sendMail({
                to: email,
                subject: 'Change of password',
                body: emailBody
    
            });
    
            await connection.query(
                `UPDATE users SET recoverCode = ?, modifiedAt = ? WHERE email = ?`,
                [recoverCode, new Date(), email]
            );
        }


        res.send({
            status: 'ok',
            message: 'If the email exists, a recover code has been sent'
        });

    } catch (error) {
        next(error)
    }finally{
        if(connection) connection.release();
    }

}

module.exports = recoverPassword;