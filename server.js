require('dotenv').config()
const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser')
const io = require('socket.io')();

// Use when you want to get data from other places to pass to UI
// const axios = require("axios");

app.use(cors())
app.use(bodyParser.json())

// io.on('connection', (client) => {
//   client.on('subscribeToTimer', (interval) => {
//     console.log('client is subscribing to timer with interval ', interval);
//     setInterval(() => {
//       client.emit('timer', new Date());
//     }, interval);
//   });
// });

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}!!!!`));


let socket

io.on("connection", socket => {
  // socket.emit('socket_order', {
  //   name: 'Jon',
  //   order: {
  //     name: 'Chicken Sandiwch',
  //     deadline: '2019-01-07T16:33:59+08:00',
  //     period: 'Lunch',
  //     comments: ['Only Shit yo'],
  //   }
  // })
  // socket.emit('delete_last_order', {name:'Jon'})
  console.log('client connected')
});

app.post('/sendOrder', (req,res) => {
  io.emit('socket_order', req.body)
  res.send('server received.')
})

app.post('/deleteLastOrder', (req,res) => {
  io.emit('delete_last_order', req.body)
  res.send('server received.')
})


const port = 8000;
io.listen(port);
console.log('listening on port ', port);
