const { Sequelize } = require('sequelize')

// Conexão com o banco de dados "Colocar todas estas informções num arquivo .ENV"
const sequelize = new Sequelize('u602199546_allcards', 'u602199546_adminallcard', 'Eliani13795*', {
    host: '213.190.6.22',
    dialect: 'mysql',
})

try {
    sequelize.authenticate()
    console.log('Conectamos com sucesso!')
} catch (err) {
    console.log(`Não foi possível conectar: ${err}`)
}

module.exports = sequelize