require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const path = require('path');

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
const {newExercise, getExercises, getTrainDay, newFolder, getFolders, addSerieToExercise, postExerciseEffort, editExercise} = require('./controllers/train');




app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Middleware que deserializa un body en formato "form-data" y lo pone disponible
// en la propiedad "request.body". Si hay algún archivo estará disponible en la
// propiedad "request.files".
app.use(fileUpload());

// Archivos estáticos, middleware recursos statico
app.use('/uploads', express.static(path.join(__dirname, '/static/uploads')));



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


/* ## Train ##*/

//Crear un nuevo ejercicio
app.post('/users/profile/craft_training/exercises', isAuth, newExercise);

//Editar un ejercicio
app.put('/users/profile/craft_training/exercises/edit', isAuth, editExercise);

//Retornar el listado de ejercicios
app.get('/users/profile/craft_training/exercises', isAuth, getExercises);

//Craftea una carpeta para el dia de entrenamiento
app.post('/users/profile/exercises/craft_training/folder', isAuth, newFolder);

//Add una serie a el ejercicio de un entreno
app.post('/users/profile/exercises/craft_training/serie', isAuth, addSerieToExercise);

//Retorna el listado de carpetas
app.get('/users/profile/training/:pastOrFutureTrainings', isAuth, getFolders);

//Retorna ejercicios de una carpeta
app.get('/users/profile/training/folder/:idFolder', isAuth, getTrainDay);

//Add el esfuerzo de un ejercicio de un dia en concreto
app.post('/users/profile/training/:idFolder/effort', isAuth, postExerciseEffort);





/**
 * ##################################
 * ## Middleware Error & Not Found ##
 * ##################################
 */

//Intentamos entrar en el middleware de error, si no fuese posible entrariamos en el de no encontrado, el orden es importante
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