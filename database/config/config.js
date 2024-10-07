require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        host: process.env[`${env}_DB_HOST`],
        database: process.env[`${env}_DB_NAME`],
        user: process.env[`${env}_DB_USER`],
        password: process.env[`${env}_DB_PASSWORD`] || '',
        dialect: 'postgres',
        logging: false,
        port: process.env[`${env}_DB_PORT`] || 5432,
    },
    test: {
        host: process.env[`${env}_DB_HOST`],
        database: process.env[`${env}_DB_NAME`],
        user: process.env[`${env}_DB_USER`],
        password: process.env[`${env}_DB_PASSWORD`] || '',
        dialect: 'postgres',
        logging: false,
        port: process.env[`${env}_DB_PORT`],
    },
};

module.exports = config;
