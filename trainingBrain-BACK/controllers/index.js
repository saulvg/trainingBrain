const newUser = require('./newUser');
const validateUser = require('./validateUser');
const loginUser = require('./loginUser');
const recoverPassword = require('./recoverPassword');
const resetPassword = require('./resetPassword')



module.exports = {
    newUser,
    validateUser,
    loginUser,
    recoverPassword,
    resetPassword
};