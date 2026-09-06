'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const config = require(__dirname + '/../../database/config.js');

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js' &&
            file.indexOf('.test.js') === -1
        );
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

/**
 * @typedef {Object} Database
 * @property {Sequelize.Sequelize} sequelize
 * @property {typeof Sequelize} Sequelize
 * @property {import('./do')} DO
 * @property {import('./expense')} Expense
 * @property {import('./user')} User
 */

/** @type {Database & Record<string, any>} */
const exportedDb = db;

module.exports = exportedDb;
