'use strict';
var path = require('path');
var express = require('express');
var webSocket = require('ws');

const wss = new webSocket.Server({
    noServer: true
});
var app = express();

var staticPath = path.join(__dirname, '/');
app.use(express.static(staticPath));

// Allows you to set port in the project properties.
app.set('port', process.env.PORT || 3000);

let obj = {
    host: {},
    controller: {}
}

wss.on('connection', (ws) => {
    console.log(123);
    ws.on('message', (message) => {
        console.log(message);
        let m = JSON.parse(message);
        switch (m.type) {
            case 'connect':
                obj[m.data.role] = ws;
                break;
            case 'position':
                obj['host'].send(JSON.stringify(m));
                break;
            case 'rotation':
                obj['host'].send(JSON.stringify(m));
                break;
            default:
                break;
		}
    })
});


var server = app.listen(app.get('port'), function () {
    console.log('listening');
});
server.on('upgrade', function upgrade(request, socket, head) {
    wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit('connection', ws, request);
    });
});