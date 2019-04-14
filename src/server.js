const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const app = express()

app.use(cors())

const server = require('http').Server(app)
const io = require('socket.io')(server)

// Responsavel para o RealTime 
io.on('connection', sockets => {
    socket.on('connectRoom', box => {
        socket.join(box)
    })
})


mongoose.connect(
    'mongodb+srv://admin:admin@omnistack-kcuna.mongodb.net/files?retryWrites=true',
    {
    useNewUrlParser: true
    }
)

app.use((req, res, next) => {
    req.io = io;

    //Todas as requisições vao passar pela rota default, receber a permissao de acesso ao .io
    //E entao seguir para a path requisitada.
    return next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))

app.use(require('./routes.js'))

// Server habilita a API a receber requisições http e HS (sockets), pra realizar a atualização dos usuarios abertos realtime
server.listen(process.env.PORT || 8080)
