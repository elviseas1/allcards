const User = require('../models/User')
const Card = require('../models/Card')
const bcrypt = require('bcryptjs')

module.exports = class ClientController {

    
    static async showClientsList(req, res) {
        
        var emptyClients =  true

        const clients = await User.findAll({
           where: {acesso: 1},
            include: [{
                model: Card,
                required: false
            }]
        })

        if(clients.length > 0){
            emptyClients = false
        }

        var returnClients = clients.map((result) => result.dataValues)

        returnClients = JSON.stringify(returnClients)

        returnClients = JSON.parse(returnClients)

        res.render('client/clients', {returnClients, emptyClients}) 
    }

    static createClient(req, res){
        res.render('client/addClient')
    }


    static async createClientPost(req, res){

        const  { name, email, cpf, useRegister, password, confirmpassword } = req.body

        // password match validation
        if (password != confirmpassword) {
            req.flash('message', 'As senhas não conferem,tente novamente!')
            res.render('auth/register')

            return
        }

        // chack if user exists
        const checkIfUserExists = await User.findOne({ where: { userName: useRegister} })

        if (checkIfUserExists) {
            req.flash('message', 'O email já está em uso!')
            res.render('auth/register')

            return
        }

        // create a password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const userName = useRegister;

        const user = {
            name,
            email,
            cpf,
            userName,
            password: hashedPassword,
            acesso: 1,
        }

        try {
            const createdUser = await User.create(user)

            // initialize session
            //req.session.userid = createdUser.id

            req.flash('message', 'Cadastro realizado com sucesso!')

            req.session.save(() => {
                res.redirect('/clients')
            })

        } catch(err) {
        console.log(err)
        }

    }

    static createClientCard(req, res){
        res.render('client/addClientCard')
    }

    static createClientCardPost(req, res){
        res.render('client/addClient')
    }
}