const Sequelize = require("sequelize");
const initModels = require("./init-models");
let prod = true

const sequelize = new Sequelize(process.env.DB_SCHEMA, prod ? process.env.DB_USER:'root', prod? process.env.DB_PASS:'admin201!', {
    host: prod? process.env.DB_HOST: 'localhost',
    port: prod? process.env.DB_PORT: 3308,
    dialect: "mysql",
    operatorsAliases: 0,
    logging: prod ? false : console.log,
    pool: {
        max: 5,
        min: 0,
        acquire: process.env.AQUIRE_TIME,
        idle: 10000
    },
    define: {
        //prevent sequelize from pluralizing table names
        freezeTableName: true
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.models = initModels(sequelize);

module.exports = db;