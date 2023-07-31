const Card = require('../models/Card')
const User = require('../models/User')
//const { op } = require('sequelize')
const qrcode = require('qrcode')

module.exports = class cardUserQrCodeController {

    static async showCardUserQrCode(req, res) { 

        const qrCode = req.params.code

        const cardUser = await Card.findOne({ where: { codeCard : qrCode}, raw: true })

        res.render('user/cardUserQrCode', { title: 'Sua Pagina', layout: 'mainQrCode', cardUser })

    }
}