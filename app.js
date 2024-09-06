const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize } = require('./src/models');
const router = require('./src/routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.use('/', async (req, res, next) => {
    try {
        return res.status(200).json({
            message: 'successfull',
        });
    } catch (error) {
        next(error);
    }
});

app.use((req, res, next) => {
    next({
        status: 404,
        message: 'requested url not found',
    });
});

app.use((error, req, res, next) => {
    const status = error.status || 500;

    if (res.headersSent) {
        return next(error);
    }

    res.status(status).json({
        errors: error.message || error,
    });
});

app.listen(process.env.PORT, async () => {
    try {
        console.log(`Server started at port ${process.env.PORT}`);
        await sequelize.authenticate();
        console.log('Database connected');
    } catch (error) {
        console.log('Error : ', error);
    }
});
