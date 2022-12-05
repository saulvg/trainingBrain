const getDB = require("../../database/getDB");

const getFolder = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB()
    } catch (error) {
        next(error)
    }finally{
        if(connection) connection.release()
    }
}

module.exports = getFolder