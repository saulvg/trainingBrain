//Consegimos una conexion con la base de datos
const getDB = require('../database/getDB');
//Importamos 
//const {generateRandomString, sendMail} = require('../helpers')
const {PUBLIC_HOST} = precess.env

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
        if(!(email || password)){
            const error = new Error('Faltan campos')
            error.httpStatus = 400;
            throw error
        }

        //Generamos un codigo de registro
        const registrationCode = generateRandomString(40);
        //Haseamos la password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        //Guardamos el usuario en la base de datos
        await connection.query(
            `INSERT INTO users (email, password, registrationCode, createdAt) VALUES (?, ?, ?, ?)`,
            [email, password, registrationCode, new Date()]
        );

        //Enviamos un mensaje al usuario para que active su usuario
            const emailBody = `
                Te acabas de registrar en Training Brain.
                Entra en el enlace para verificar tu cuenta, ${PUBLIC_HOST}/users/validate/${registrationCode}}
            `;

            await sendMail({
                to: email,
                subject: 'Activa tu usuario de Training Brain',
                body: emailBody
            });

            res.send({
                status: 'ok',
                message: 'Usuario registrado, comprueba tu email para activarlo'
            })

    }catch(error){
        console.error(error);
        //este next, nos lleva directos al sigiente middleware en el que podamos entrar (en este caso en el archivo server al que importamos esta funcion )
        next(error)
    }finally{
        if(connection) connection.release();
    }
}