//Este middleware personalizado, nos sirve para saber si el usuario esta reguistrado o no, si su token es valido
const getDB = require('../database/getDB');
const jwt = require('jsonwebtoken');

const isAuth = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //Obtenemos la cabezera de autentificacion(el token)
        const {authorization} = req.headers;
        if(!authorization) {
            const error = new Error('Missing authentication header');
            error.httpStatus = 401;
            throw(error);
        }

        let tokenInfo;
        //creamos este try-catch para en el caso de que el metodo que vamos a utilizar falle, salga en el catch un mensaje personalizado por nosotros y no un mensaje generico en ingles
        try {
            tokenInfo = jwt.verify(authorization, process.env.SECRET)
        } catch (_) {
            const error = new Error('Token is not valid');
            error.httpStatus = 401;
            throw(error);
        }

        const [users] = await connection.query(
            `SELECT active, deleted FROM users WHERE id = ?`,
            [tokenInfo.id]
        )

        if (!users[0].active || users[0].delete){
            const error = new Error('Token is not valid');
            error.httpStatus = 401;
            throw(error);
        };

        req.userAuth = tokenInfo;
        next();

    } catch (error) {
        next(error)
    }finally{
        if (connection) connection.release()
    }
};

module.exports = isAuth;