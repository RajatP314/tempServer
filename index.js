let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

//console.log(io);
io.set('origins', '*:*');

app.all('/', (req, res)=>{
	res.sendFile(__dirname + "/index.html");
});

io.on('connection', (socket)=>{
	console.log('user connected');
	socket.on('disconnect', (socket)=>{
		console.log('user disconnected');
	});
	socket.on('keypress', (letter)=>{
		console.log('pressed');
		io.emit('keypress', letter);
	});
});

http.listen( (process.env.PORT || 8080), ()=>{
	console.log("page works");
});
