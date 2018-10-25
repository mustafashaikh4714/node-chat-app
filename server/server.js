const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const {generateMessage} = require('./utils/message')

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var port = process.env.PORT || 3000
app.use(express.static(publicPath));

 io.on('connection', (socket) => {
    console.log('New user is Connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat App'))
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))

    socket.on('createMessage', function (message) {
       console.log('createMessage', message);
       io.emit('newMessage', generateMessage(message.from, message.text))
    })

    socket.on('disconnect', () => {
        console.log('user was disconnected');  
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})