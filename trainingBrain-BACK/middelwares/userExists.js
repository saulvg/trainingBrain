const getDB =  require('../database/getDB')

const userExists = async (req, res, next) =>{
    let connection;

    try {
        connection = await getDB();

        const {idUser} = req.params; 
        
        const [users] = await connection.query(
            `SELECT id FROM users WHERE id = ? AND deleted = false`,
            [idUser]
        );

        if(users.length < 1) {
            const error = new Error('User does not exist')
            error.httpStatus = 404;
            throw(error)
        }

        next();
    } catch (error) {
        next(error)
    }finally{
        if(connection) connection.release();
    }



}

module.exports = userExists;