require("dotenv").config();
const { Sequelize } = require('sequelize');

//find way to remove dialect option if local

const sequelize = new Sequelize(
    process.env.DATABASE_URL,
    {
        dialect: "postgres",
        ssl: process.env.ENVIRONMENT === 'production',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
)

async function syncDB(sequelize, options){
    const { force, alter } = options
    try {
        if (force)
            await sequelize.sync({ force: true })
        else if (alter)
            await sequelize.sync({ alter: true })
        else
            await sequelize.sync()
    } catch (err){
        console.log(err)
    }
}

module.exports = {
    sequelize, syncDB
};