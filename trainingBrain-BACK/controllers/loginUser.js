const getDB = require("../database/getDB");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const loginUser = async (req, res, next) => {
    let connection;
    try {
       connection = await getDB();
       
       const {email, password} = req.body;

       if(!email || !password) {
        const error = new Error('Missing fields');
        error.httpStatus = 400;
        throw error;
       }

       const [users] = await connection.query(
        `SELECT id, password, active FROM users WHERE email = ?`,
        [email]
       );

       let validatePassword;
       if(users.length > 0){
        validatePassword = await bcrypt.compare(password, users[0].password)
       };

       if(users.length < 1 || !validatePassword) {
        const error = new Error('The email or password is incorrect');
        error.httpStatus = 401;
        throw error;
       }

       if(!users[0].active){
        const error = new Error('User pending activation');
        error.httpStatus = 401;
        throw error;
       }


       const token = jwt.sign({
        id: users[0].id,}, process.env.SECRET, {
        expiresIn: '1d'
       });

       res.send({
        status: 'ok',
        data: {
            token
        }
       })

    } catch (error) {
        next(error)
    }finally{
        if(connection) connection.release();
    }
};

module.exports = loginUser;