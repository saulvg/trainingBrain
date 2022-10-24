//Consegimos una conexion con la base de datos
const getDB = require('../database/getDB');
//Importamos 
const {generateRandomString, sendMail} = require('../helpers');
const {PUBLIC_HOST} = process.env;

//Dependencia bcrypt para hashear la password
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Funcion controladora del endpoint '/users' metodo 'POST'
//Registrar un nuevo usuario
const newUser = async (req, res, next) =>{
    let connection;

    try{

        //Intentamos obtener una nueva conexion
        connection = await getDB();

        //Obtenemos los campos del body
        const {email, password} = req.body;

        //Como estos campos son obligatorios, comprobamos que esten
        if(!email || !password){
            const error = new Error('Missing fields')
            error.httpStatus = 400;
            throw error
        };

        //Generamos un codigo de registro
        const registrationCode = generateRandomString(40);
        //Haseamos la password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        //Guardamos el usuario en la base de datos
        await connection.query(
            `INSERT INTO users (email, password, registrationCode, createdAt) VALUES (?, ?, ?, ?)`,
            [email, hashedPassword, registrationCode, new Date()]
        );

        //Enviamos un mensaje al usuario para que active su usuario
            const emailBody = `
                You just singed up for Training Brain.
                Enter the link to verify your account, ${PUBLIC_HOST}/users/validate/${registrationCode}}
            `;

            await sendMail({
                to: email,
                subject: 'Active your Training Brain user',
                body: emailBody
            });

            res.send({
                status: 'ok',
                message: 'Registered user, check your email to activateit'
            });

    }catch(error){
        console.error(error);
        //este next, nos lleva directos al sigiente middleware en el que podamos entrar (en este caso en el archivo server al que importamos esta funcion )
        next(error);
    }finally{
        if(connection) connection.release();
    }
};


module.exports = newUser;