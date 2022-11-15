const getDB = require('../database/getDB');

const getUser = async (req, res, next) => {
    let connection;
    
    try{
        connection = await getDB();

        const {idUser} = req.params;
        const idReqUser = req.userAuth.id;

        const [users] = await connection.query(
            `SELECT id, email, username, weight, height, age FROM users WHERE id = ?`,
            [idUser]
        );
        const userInfo = {
            username: users[0].username
        };

        if (users[0].id === idReqUser){
            
            userInfo.email = users[0].email;
            userInfo.weight = users[0].weight;
            userInfo.height = users[0].height;
            userInfo.age = users[0].age;
        };

        res.send({
            status: 'ok',
            data: {
                user:userInfo
            }
        })


    }catch(error){
        next(error)
    }finally{
        if (connection) connection.release()
    }
} 

module.exports = getUser;