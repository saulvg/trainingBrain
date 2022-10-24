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
/**
 * ###############################
 * ## Controladores de usuarios ##
 * ###############################
 */

const { newUser, validateUser } = require('./controllers/index');



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
app.get('/users/validate/:registrationCode', validateUser)


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
        message: error.message,
    });
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