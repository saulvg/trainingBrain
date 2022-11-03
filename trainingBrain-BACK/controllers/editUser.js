const getDB = require('../database/getDB');

const editUser = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const {idUser} = req.params;

        const {username, weight, height, age} = req.body;
        const [users] = await connection.query(
            `SELECT  username, height, weight, age FROM users WHERE id = ?`,
            [idUser]
        );

        if(username && username !== users[0].username) {
            await connection.query(
                `UPDATE users SET username = ?, modifiedAt = ? WHERE id = ?`,
                [username, new Date(), idUser]
            );
        };
        
        if(height && height !== users[0].height) {
            await connection.query(
                `UPDATE users SET height = ?, modifiedAt = ? WHERE id = ?`,
                [height, new Date(), idUser]
            );
        };

        if(weight && weight !== users[0].weight) {
            await connection.query(
                `UPDATE users SET weight = ?, modifiedAt = ? WHERE id = ?`,
                [weight, new Date(), idUser]
            );
        };

        if(age && age !== users[0].age) {
            await connection.query(
                `UPDATE users SET age = ?, modifiedAt = ? WHERE id = ?`,
                [age, new Date(), idUser]
            );
        };

        res.send({
            status: 'ok',
            message: 'Changes updated successfully'
        })

        

    } catch (error) {
        next(error);
    }finally{
        if(connection) connection.release();
    }
};

module.exports = editUser;