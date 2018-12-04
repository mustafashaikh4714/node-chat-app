var socket = io();

socket.on('connect', function () {
    console.log('Connected to the server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from the server'); 
});

socket.on('newMessage', function (message) {
 var formattedTime = moment(message.createdAt).format('h:mm a')
 var template = jQuery('#message-template').html();
 var html = Mustache.render(template, {
     text:message.text,
     from: message.from,
     createdAt:formattedTime
 })
   jQuery('#messages').append(html);
//  var li = jQuery('<li></li>');
//  li.text(`${message.from}: ${formattedTime} : ${message.text}`);

//  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a')
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
     from:message.from,
     url:message.url,
     createdAt:formattedTime
 })
   jQuery('#messages').append(html);


    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target = "_blank">My Location</a>');

    // li.text(`${message.from}: `);
    // a.attr('href', message.url)

    // li.append(a);
    // jQuery('#messages').append(li);


})


jQuery('#message-form').on('submit', function (e) {
   e.preventDefault();
   var messageTextBox = jQuery('[name=message]');
   socket.emit('createMessage', {
       from:'User',
       text:messageTextBox.val()
   }, function () {
       messageTextBox.val('')
   })
})

var buttonLocation = jQuery('#send-location');

buttonLocation.on('click', function () {
    if(!navigator.geolocation) {
       return alert('geolocation is not supported by your browser.')
    }

    navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage',  {
        latitude: position.coords.latitude, 
        longitude:position.coords.longitude
    })
    
    }, function () {
        console.log('unable to fetch the location');
        
    })
})