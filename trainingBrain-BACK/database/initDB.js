const getDB = require('./getDB.js');

const {format} = require('date-fns');
function formatDate (date) {
    return format(date, 'yyyy-MM-dd HH:mm:ss')
}

async function initDB() {
    let connection;

    try{
        connection = await getDB();
        await connection.query('DROP TABLE IF EXISTS exercises');
        await connection.query('DROP TABLE IF EXISTS users');
        /* await connection.query('DROP TABLE IF EXISTS week')
        await connection.query('DROP TABLE IF EXISTS training'); */

        await connection.query(`
            CREATE TABLE users (
                id INT PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(100) UNIQUE NOT NULL,
                username VARCHAR(100) NOT NULL,
                weight INT,
                height INT,
                age INT,
                password VARCHAR(100) NOT NULL,
                avatar VARCHAR(50),
                role ENUM("admin", "normal") DEFAULT "normal" NOT NULL,
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
                exerciseName VARCHAR(50) NOT NULL,
                exerciseDescription VARCHAR(256),
                exercisePhoto VARCHAR(150),
                createdAt DATETIME NOT NULL, 
                modifiedAt DATETIME,
                FOREIGN KEY (id_user) REFERENCES users(id)
            )
        `);


        await connection.query(`
            CREATE TABLE day_training (
                id INT PRIMARY KEY AUTO_INCREMENT,
                id_user INT NOT NULL,            
                id_exercises INT NOT NULL,
                date DATE NOT NULL,
                series INT NOT NULL,
                repetitions INT NOT NULL,
                weight VARCHAR(10),
                createdAt DATETIME NOT NULL, 
                modifiedAt DATETIME,
                FOREIGN KEY (id_user) REFERENCES users(id),
                FOREIGN KEY (id_exercises) REFERENCES exercises(id)


            )
        `); 

        /* await connection.query(`
            CREATE TABLE week (
                id INT PRIMARY KEY AUTO_INCREMENT,
                id_training INT,
                day_Week VARCHAR(20) NOT NULL,
                FOREIGN KEY (id_training) REFERENCES training(id)
            )
        `) */
    }catch(error){
        console.error(error);
    }finally{
        if(connection) connection.release();

        process.exit()
    }
}

initDB();