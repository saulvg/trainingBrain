const getDB = require('./getDB.js');

const {format} = require('date-fns');
function formatDate (date) {
    return format(date, 'yyyy-MM-dd HH:mm:ss')
}

async function initDB() {
    let connection;

    try{
        connection = await getDB();
        await connection.query('DROP TABLE IF EXISTS users');
        await connection.query('DROP TABLE IF EXISTS week')
        await connection.query('DROP TABLE IF EXISTS training');
        await connection.query('DROP TABLE IF EXISTS exercises');

        await connection.query(`
            CREATE TABLE users (
                id INT PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                avatar VARCHAR(50),
                active BOOLEAN DEFAULT false,
                deleted BOOLEAN DEFAULT false,
                registrationCode VARCHAR(100),
                recoverCode VARCHAR(100),
                createdAt DATETIME NOT NULL,
                modifiedAt DATETIME
            )
        `);

        await connection.query(`
            CREATE TABLE exercises (
                id INT PRIMARY KEY AUTO_INCREMENT, 
                id_user INT NOT NULL,
                name VARCHAR(50) NOT NULL,
                description VARCHAR(256),
                series INT,
                repetitions INT,
                weight DECIMAL,
                createdAt DATETIME NOT NULL, 
                modifiedAt DATETIME
            )
        `);

        await connection.query(`
            CREATE TABLE training (
                id INT PRIMARY KEY AUTO_INCREMENT,
                id_exercise1 INT,
                id_exercise2 INT,
                FOREIGN KEY (id_exercise1) REFERENCES exercises(id),
                FOREIGN KEY (id_exercise2) REFERENCES exercises(id)


            )
        `);

        await connection.query(`
            CREATE TABLE week (
                id INT PRIMARY KEY AUTO_INCREMENT,
                id_training INT,
                day_Week VARCHAR(20) NOT NULL,
                FOREIGN KEY (id_training) REFERENCES training(id)
            )
        `)
    }catch(error){
        console.error(error);
    }finally{
        if(connection) connection.release();

        process.exit()
    }
}

initDB();