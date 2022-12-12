const newExercise = require('./newExercise');
const getExercises = require('./getExercises');
/* const addExerciseToFolder = require('./DELETEDaddExerciseToFolder'); */
const getTrainDay = require('./getTrainDay');
/* const getTrainDays = require('./DELETEDgetTrainDays'); */
const newFolder = require('./newFolder');
const getFolders = require('./getFolders');
const getFolder = require('./getFolder');
const addSerieToExercise = require('./addSerieToExercise');
const postExerciseEffort = require('./postExerciseEffort');



module.exports = {
    newExercise,
    getExercises,
    /* addExerciseToFolder, */
    getTrainDay,
    newFolder,
    getFolders,
    getFolder, 
    addSerieToExercise,
    postExerciseEffort
}