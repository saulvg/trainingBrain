require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const {PORT} = process.env;




/**
 * #################
 * ## Middlewares ##
 * #################
 */

const {isAuth, userExists, canEditUser} = require('./middelwares')
/**
 * ###############################
 * ## Controladores de usuarios ##
 * ###############################
 */

const { newUser, validateUser, loginUser, recoverPassword, resetPassword, getUser, editUser, editPassword, deleteUser} = require('./controllers/index');



app.use(morgan('dev'));
app.use(express.json());
app.use(cors());




/**
 * ###########################
 * ## Endopoins de usuarios ##
 * ###########################
 */

//Crear un nuevo usuario
app.post('/users', newUser);

//Valida un nuevo usuario
app.get('/users/validate/:registrationCode', validateUser);

//logear un usuario
app.post('/users/login', loginUser);

//Envia un correo con el codigo de reseteo de la password a un email
app.put('/users/password/recover', recoverPassword);

//Cambia la password de un usuario con el codigo de reseteo
app.put('/users/password/reset', resetPassword);

//Obtener informacion del usuario
app.get('/users/:idUser', isAuth, userExists, getUser);

//Editar la informacion de un usuario
app.put('/users/:idUser', isAuth, userExists, canEditUser, editUser);

//Editar la contraseña de un usuario
app.put('/users/:idUser/password', isAuth, userExists, canEditUser, editPassword);

//Anonimizar un usuario
app.delete('/users/:idUser', isAuth, userExists, canEditUser, deleteUser);

/**
 * ##################################
 * ## Middleware Error & Not Found ##
 * ##################################
 */

//Intentamos entrar en el middleware de error, si no fuese posible entrariamos en el de no encontrado, el orden es imoportante
//Middleware de error.
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
    console.log('ERROR:',error); //esto unicamente es para que en consola se nos muestre un error algo mas claro del error
    res.status(error.httpStatus || 500).send({
        status: 'error',
        message: error.message    });
});

app.use((req, res) => {
    res.status(404).send({
        status:'error',
        message: 'Not found'
    });
});

app.listen(PORT, () => {
    console.log(`Server listening http://localhost${PORT}`);
});