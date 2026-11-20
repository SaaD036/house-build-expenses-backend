require('dotenv').config();

const BACKEND_ENVIRONMENT = process.env.NODE_ENV || 'development';

const JWT_SECRET = process.env.JWT_SECRET || 'jkshncuih7368ewnchjsr33333$KJ76';

const CLOUDINARY_FOLDERS = {
    HOUSES: 'houses',
};

module.exports = {
    JWT_SECRET,
    CLOUDINARY_FOLDERS,
    BACKEND_ENVIRONMENT,
};
