const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser')
const io = require('socket.io')();

// Use when you want to get data from other places to pass to UI
// const axios = require("axios");

app.use(cors())
app.use(bodyParser.json())
const serverPort = process.env.PORT || 24601;

app.listen(serverPort, () => console.log(`Listening on port ${serverPort}!!!!`));

// io.on('connection', (client) => {
//   client.on('subscribeToTimer', (interval) => {
//     console.log('client is subscribing to timer with interval ', interval);
//     setInterval(() => {
//       client.emit('timer', new Date());
//     }, interval);
//   });
// });

io.on("connection", socket => {
  setInterval(() => {
    socket.emit("timer", 'lol');
  }, 1000)
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
