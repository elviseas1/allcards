const Card = require('../models/Card')
const User = require('../models/User')
//const { op } = require('sequelize')
const qrcode = require('qrcode')

module.exports = class CardController {

    static async showCardList(req, res) { 

        
        var emptyCards =  true

        const cards = await Card.findAll({include: [{model: User}]})
        //const cards = await Card.findAll()

        //  console.log("1" + cards)

        if(cards.length > 0){
            emptyCards = false
        }

        var returnCards = cards.map((result) => result.dataValues)

        returnCards = JSON.stringify(returnCards)

        returnCards = JSON.parse(returnCards)
    
        res.render('card/cards', {returnCards, emptyCards})
    }

    static createCard(req, res){
        res.render('card/create')
    }
    
    static showCard(req, res) {
        res.render('card/home')
    }
    
    //createCardSave
    static async createCardSave(req, res){

        var countCode = 0

        for(var i = 0; i < req.body.numberCard; i++){

            function generateCode(){
                return Math.floor(Math.random() * 999999 + 100000)
            }

            const gerarQrCode = (codigo) => {
                qrcode.toDataURL('https://c.cardsall.com.br/' + codigo, function (err, url) {
                    salvarCode(url)
                })
            }

            const salvarCode = async (url) => {
                const card = {
                    codeCard: codigo,
                    UserIdAdm: req.session.userid,
                    qrcodeCode: url,
                }

                try {
                    await Card.create(card)
        
                    req.flash('message', 'Cadastro realizado com sucesso!')
        
                } catch(err) {
                    console.log(err)
                }

            }

            const codigo = generateCode()
            const codeReturn = await Card.findOne({where: {codeCard: codigo}})

            while (codeReturn) {
                codigo = generateCode()
                codeReturn = await Card.findOne({where: {codeCard: codigo}})               
            }

            gerarQrCode(codigo)
        }

        var emptyCards =  true

        const cards = await Card.findAll()

        if(cards.length > 0){
            emptyCards = false
        }

        const returnCards = cards.map((result) => result.dataValues)
        
        res.render('card/cards', {returnCards, emptyCards})

    }
}