require('dotenv').config();

const BACKEND_ENVIRONMENT = process.env.NODE_ENV || 'development';

const JWT_SECRET = process.env.JWT_SECRET || 'jkshncuih7368ewnchjsr33333$KJ76';

module.exports = {
    BACKEND_ENVIRONMENT,
    JWT_SECRET,
};
