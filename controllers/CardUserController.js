const Card = require('../models/Card')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class CardUserController {

    static showCardUser(req, res) {
       
        res.render('user/cardUser')
    }
    // ATRELAR USUARIO A UM CARTÃO
    static async insertCodCarUser(req, res) {
        
        const id = req.params.id

        const cardUser = await Card.findOne({ where: { UserId : id}, raw: true })

       

        if(JSON.stringify(cardUser) === "null"){

            req.flash('message', 'OK!')

            res.render('client/clients')
        }else{
            req.flash('message', 'Uuario com codig já cadastrado!')
            res.render('client/clients')
        }

        

    }
    // IR PARA O CADASTRO DE DADOS DO CARTÃO ISSO
    static async updateCardUser(req, res){
        const id = req.params.id

        const cardUser = await Card.findOne({ where: { UserId : id}, raw: true })

        if(JSON.stringify(cardUser) === "null"){        

            req.flash('message', 'Cliente sem codigo!')

            res.render('client/clients')
        }else{
            res.render('user/cardUser', { cardUser })
        }

        
    }

    // ATUALIZAR DADOS DO CARTÃO
    static async updateCardUserSave(req, res){
        const id = req.body.id
        const UserId = req.body.userId

        const cardUserDate = {
            cor: req.body.cor,
            name: req.body.nome,
            profissao: req.body.profissao,
            phone: req.body.phone,
            email: req.body.email,
            whatsapp: req.body.whatsapp,
            image: req.body.hiddenArquivo,
        }

        try {
            await Card.update(cardUserDate, {where: { id: id }})

            req.flash('message', 'Dados do cartão atualizado com sucesso!')

            req.session.save(() => {
                res.redirect(`/cardUser/${UserId}`)
            })
        } catch (error) {
            console.log('Aconteceu um erro: ' + error)
        }

    }

    // ATUALIZAR DADOS DE RESDES SOSCIAIS DO CARTÃO
    static async updateCardUserSaveD(req, res){
        const id = req.body.id
        const UserId = req.body.userId

        const cardUserDate = {
            site: req.body.site,
            youtube: req.body.youtube,
            instagram: req.body.instagram,
            linkedin: req.body.linkedin,
        }

        try {
            await Card.update(cardUserDate, {where: { id: id }})

            req.flash('message', 'Dados do cartão atualizado com sucesso!')

            req.session.save(() => {
                res.redirect(`/cardUser/${UserId}`)
            })
        } catch (error) {
            console.log('Aconteceu um erro: ' + error)
        }

    }


    static loginQrCode(req, res) {
        const id = req.params.id

        res.render('user/loginQrCodes', {id})
    }

    static async loginQrCodePost(req, res) {
        const {userLogin, password, id } = req.body

        // find user
        const userReturn = await User.findOne({where: {userName: userLogin}}) 

        if (!userReturn) {
            req.flash('message', 'Usuário não encontrado!')
            res.render('user/loginQrCodes', {id})

            return
        }

        // check if password match
        const passwordMatch = bcrypt.compareSync(password, userReturn.password)

        if (!passwordMatch) {
            req.flash('message', 'Senha invalida!')
            rres.render('user/loginQrCodes', {id})

            return
        }


        //initialize session
        req.session.userid = {
            id: userReturn.id,
            acesso: userReturn.acesso   
        }

        const cardUserDate = {
            UserId: userReturn.id
        }

        const userCard = await Card.findOne({where: {
                UserId: userReturn.id, 
                codeCard: id
            }})

        console.log("AQUI - " + JSON.stringify(userCard))
        
        if(userCard === null){
            try {
                let tt = await Card.update(cardUserDate, {where: { codeCard: id }})

                req.flash('message', 'Dados do cartão atualizado com sucesso!')
    
                req.session.save(() => {
                    res.redirect(`/cardUser/${userReturn.id}`)
                })

            } catch (error) {
                console.log('Aconteceu um erro: ' + error)
            }
            
            
            
        }else{
            req.session.save(() => {
                res.redirect(`/cardUser/${userReturn.id}`)
            })

            req.session.save(() => {
                res.redirect('/')
            })
        }
    }
}