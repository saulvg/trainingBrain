require('dotenv').config();

const express = require('express');
const morgan = require('morgan')
const cors = require('cors')

const app = express();
const {PORT} = process.env;



/**
 * #################
 * ## Middlewares ##
 * #################
 */
/**
 * ###############################
 * ## Controladores de usuarios ##
 * ###############################
 */
/**
 * ###############################
 * ## Controladores de entradas ##
 * ###############################
 */

app.use(morgan('dev'));
app.use(cors());

app.use(express.json());


app.use((req, res) => {
    res.status(404).send({
        status:'error',
        message: 'Not found'
    });
});

app.listen(PORT, () => {
    console.log(`Server listening http://localhost${PORT}`);
})