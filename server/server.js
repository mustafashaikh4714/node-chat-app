const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var port = process.env.PORT || 3000
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user is Connected');

    socket.emit('newMessage', {
        from: 'Admin',
        text: "Welcome to chat App",
        createdAt: new Date().getTime()
    })

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: "New user joind",
        createdAt: new Date().getTime()
    })

    socket.on('createMessage', function (message) {
       console.log('createMessage', message);

       io.emit('newMessage', {
           from: message.from,
           text: message.text,
           createdAt: new Date().getTime()
       })
    // socket.broadcast.emit('newMessage', {
    //     from: message.from,
    //     text: message.text,
    //     createdAt: new Date().getTime()
    // })
})

    socket.on('disconnect', () => {
        console.log('user was disconnected');  
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})