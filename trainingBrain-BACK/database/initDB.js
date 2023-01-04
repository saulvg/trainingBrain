const getDB = require('./getDB.js');

const {format} = require('date-fns');
function formatDate (date) {
    return format(date, 'yyyy-MM-dd HH:mm:ss')
}

async function initDB() {
    let connection;

    try{

        connection = await getDB();
        
        await connection.query('DROP TABLE IF EXISTS train_rules');
        await connection.query('DROP TABLE IF EXISTS folder_day');
        await connection.query('DROP TABLE IF EXISTS exercises');
        await connection.query('DROP TABLE IF EXISTS users');

        

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
            CREATE TABLE folder_day (
                id INT PRIMARY KEY AUTO_INCREMENT,
                id_user INT NOT NULL,
                folder_name VARCHAR(50) NOT NULL,
                date DATE NOT NULL,
                createdAt DATETIME NOT NULL,
                modifiedAt DATETIME,
                FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE
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
                FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        await connection.query(`
                CREATE TABLE train_rules (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    id_user INT NOT NULL,
                    id_exercises INT NOT NULL,
                    id_folder_day INT NOT NULL,
                    expected_reps VARCHAR(50) NOT NULL,
                    reps_done VARCHAR(50),
                    weight VARCHAR(50),
                    createdAt DATETIME NOT NULL, 
                    modifiedAt DATETIME,
                    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
                    FOREIGN KEY (id_exercises) REFERENCES exercises(id) ON DELETE CASCADE,
                    FOREIGN KEY (id_folder_day) REFERENCES folder_day(id) ON DELETE CASCADE

                )
        `);
   

        const emailUsers = ['sspamvg@gmail.com', 'sspamvg23@gmail.com']
        for(let emailUser of emailUsers) {
            await connection.query(
                `INSERT INTO users (
                    email,
                    username,
                    password,
                    role,
                    active,
                    createdAt
                )
                VALUES (
                    "${emailUser}",
                    "saulvg",
                    "$2b$10$krTWdhf/ExV5vz06lowC4ea64h80fku8wvZ7JXJdcUnfd03aEcnIS",
                    "normal",
                    true,
                    "${formatDate(new Date())}"
                )`
            )
        }

        for(let i = 1; i <= 5; i++){
            let min = Math.ceil(1)
            let max = Math.floor(2)
            let idUs = Math.floor(Math.random() * (max - min + 1) + min)
            await connection.query(
                `INSERT INTO exercises ( 
                    id_user ,
                    exerciseName ,
                    exerciseDescription ,
                    createdAt
                )
                VALUES (
                    ${idUs},
                    "Jalon ${i}",
                    "Tira de la barra con ganas y echa espalda",
                    "${formatDate(new Date())}"
                )`
            )

            
        }
        
    }catch(error){
        console.error(error);
    }finally{
        if(connection) connection.release();

        process.exit()
    }
}

initDB();