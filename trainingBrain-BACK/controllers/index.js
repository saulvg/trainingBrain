const newUser = require('./newUser');
const validateUser = require('./validateUser');
const loginUser = require('./loginUser');
const recoverPassword = require('./recoverPassword');
const resetPassword = require('./resetPassword');
const getUser = require('../controllers/getUser');
const editUser = require('./editUser');
const editPassword = require('./editPassword');
const deleteUser = require('./deleteUser')



module.exports = {
    newUser,
    validateUser,
    loginUser,
    recoverPassword,
    resetPassword,
    getUser,
    editUser,
    editPassword,
    deleteUser
};