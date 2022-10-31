const newUser = require('./newUser');
const validateUser = require('./validateUser');
const loginUser = require('./loginUser');
const recoverPassword = require('./recoverPassword');
const resetPassword = require('./resetPassword');
const getUser = require('../controllers/getUser');



module.exports = {
    newUser,
    validateUser,
    loginUser,
    recoverPassword,
    resetPassword,
    getUser
};