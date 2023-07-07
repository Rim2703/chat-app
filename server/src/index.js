const express = require('express')
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const http = require('http')
const socketIO = require('socket.io')

const app = express()

const server = http.createServer(app)
const io = socketIO(server)

app.use(cors())
app.use(express.json())

const users = [{}]

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
})

    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send("hello")
})

io.on("connection", (socket) => {
    console.log("Hey Socket")

    socket.on('join', ({ user }) => {
        users[socket.id] = user
        console.log(`${user} has joined `)
        socket.broadcast.emit('userJoined', { user: "Admin", message: `${users[socket.id]} has joined` })
        socket.emit('welcome', { user: "Admin", message: `welcome to the chat, ${users[socket.id]}` })

    })

    socket.on('message', ({ message, id }) => {
        io.emit('sendMessage', { user: users[id], message, id })
    })

    socket.on('disconnected', () => {
        socket.broadcast.emit('leave', { user: "Admin", message: `${users[socket.id]} has left` })
        console.log('user left')
    })
})


server.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`)
})
