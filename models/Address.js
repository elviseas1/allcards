const { DataTypes } = require('sequelize')

const db = require('../db/conn')


const AddressUser = db.define('AddressUser', { 
    rua: {
        type: DataTypes.STRING,
        require: true,
    },
    numero: {
        type: DataTypes.INTEGER,
        require: true,
    },
    bairro: {
        type: DataTypes.STRING,
        require: true,
    },
    cep: {
        type: DataTypes.STRING,
        require: true,
    },
})

module.exports = AddressUser