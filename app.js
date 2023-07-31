const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')
const port = process.env.PORT || 3001;


const app = express()

const conn = require('./db/conn')

// Models
const Address = require('./models/Address')
const User = require('./models/User')
const Card = require('./models/Card')
//const CardUser = require('./models/cardUser')
//const UserCard = require('./models/UserCard')



// Import Routes
const cardRoutes = require('./routes/cardRoutes')
const authRoutes = require('./routes/authRoutes')
const clientRoutes = require('./routes/clientRoutes')
const cardUserRoutes = require('./routes/cardUserRoutes')
//const cardUserQrCode = require('./routes/cardUserRoutes')

// Import Controller
const CardController = require('./controllers/CardController')
const cardUserQrCodeController = require('./controllers/cardUserQrCodeController')


// template enine
var hbs = exphbs.create({defaultLayout: 'main'});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// receber resposta do body
app.use(
    express.urlencoded({
        extended: true
    })
)

// para receber o dado em json
app.use(express.json())

// session middleware
app.use(
    session({
        name: 'session',
        secret: 'nosso_secret', // colocar um chave secreta para seguranca do sistema
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function(){},
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 3600000,
            expires: new Date(Date.now() + 3600000),
            httpOnly: true 
        }
    })
)

// flash messages
app.use(flash())

// public path
app.use(express.static('public'))

// set session to res
 app.use((req, res, next) => {

    if (req.session.userid) {
        res.locals.session = req.session
        console.log(req.session)
    }

    next()
})

// Routes
app.use('/', cardRoutes)
app.use('/', authRoutes)
app.use('/', clientRoutes)
app.use('/', cardUserRoutes)

app.get('/', CardController.showCard)
app.get('/:code', cardUserQrCodeController.showCardUserQrCode)

conn
    .sync(/*{ force: true }*/) 
    .then(() => {
        //app.listen(3000)
        app.listen(port, () => console.log(`Example app listening on port ${port}!`));
    })
    .catch((err) => console.log(err))