const User = require('../models/User')

const bcrypt = require('bcryptjs')
const fileUpload = require('express-fileupload')

module.exports = class AuthController {

    static login(req, res) {
        res.render('auth/login')
    }

    static async loginPost(req, res){
        const {userLogin, password } = req.body

        // find user
        const userReturn = await User.findOne({where: {userName: userLogin}})

        if (!userReturn) {
            req.flash('message', 'Usuário não encontrado!')
            res.render('auth/login')

            return
        }

        // check if password match
        const passwordMatch = bcrypt.compareSync(password, userReturn.password)

        if (!passwordMatch) {
            req.flash('message', 'Senha invalida!')
            res.render('auth/login')

            return
        }

        // initialize session
        req.session.userid = {
                id: userReturn.id,
                acesso: userReturn.acesso   
            }

        //console.log(userReturn)

        req.flash('message', 'Autenticação realizada com sucesso!')

        req.session.save((tipo) => {
            res.redirect('/')
        })
    }

    static register(req, res) {
        res.render('auth/register')
    }

    static async registerPost(req, res){

        const  { name, email, cpf, acesso,useRegister, password, confirmpassword } = req.body

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
            acesso: acesso,
            userName,
            password: hashedPassword,
        }

        try {
            const createdUser = await User.create(user)

            // initialize session
            req.session.userid = createdUser.id

            req.flash('message', 'Cadastro realizado com sucesso!')

            req.session.save(() => {
                res.redirect('/')
            })

        } catch(err) {
            console.log(err)
        }

    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }
}