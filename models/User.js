const { DataTypes } = require('sequelize')

const db = require('../db/conn')

// Adress
const Adress = require('./Address')

const User = db.define('User', { 
    userName: {
        type: DataTypes.STRING,
        require: true,
    },
    password: {
        type: DataTypes.STRING,
        require: true,
    },
    name: {
        type: DataTypes.STRING,
        require: true,
    },
    email: {
        type: DataTypes.STRING,
        require: true,
    },
    image: {
        type: DataTypes.TEXT,
        require: false,
    },
    cpf: {
        type: DataTypes.STRING,
        require: true
    },
    acesso: {
        type: DataTypes.BOOLEAN,
        require: false
    },
    phone: {
        type: DataTypes.STRING,
        require: false
    }
})

 User.belongsTo(Adress)
 Adress.hasMany(User)

module.exports = User