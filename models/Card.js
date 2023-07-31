const { DataTypes } = require('sequelize')

const db = require('../db/conn')

// Adress
const User = require('./User')

const Card = db.define('Card', { 
    codeCard: {
        type: DataTypes.STRING,
        require: true,
    },
    cor: {
        type: DataTypes.STRING,
        require: false,
    },
    name: {
        type: DataTypes.STRING,
        require: false,
    },
    profissao: {
        type: DataTypes.STRING,
        require: false,
    },
    phone: {
        type: DataTypes.STRING,
        require: false
    },
    email: {
        type: DataTypes.STRING,
        require: false,
    },
    whatsapp: {
        type: DataTypes.STRING,
        require: false
    },
    site: {
        type: DataTypes.STRING,
        require: false
    },
    youtube: {
        type: DataTypes.STRING,
        require: false
    },
    instagram: {
        type: DataTypes.STRING,
        require: false
    },
    linkedin: {
        type: DataTypes.STRING,
        require: false
    },
    image: {
        type: DataTypes.TEXT,
        require: false,
    },
    mapLongitude: {
        type: DataTypes.STRING,
        require: false,
    },
    mapLatitude: {
        type: DataTypes.STRING,
        require: false,
    },
    qrcodeCode: {
        type: DataTypes.TEXT,
        require: true,
    },
    UserIdAdm: {
        type: DataTypes.INTEGER,
        require: true,
    },
})

Card.belongsTo(User)
User.hasMany(Card) 


module.exports = Card