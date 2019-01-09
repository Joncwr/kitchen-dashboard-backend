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

let orders
var SocketIO

const sendOrders = (req) => {
  return new Promise((resolve, reject) => {
    io.emit('getOrders', req)
    if (orders) {
      resolve(orders)
      orders = null
    }
    else {
      setTimeout(() => {
        if (orders) {
          resolve(orders)
          orders = null
        }
        else {
          setTimeout(() => {
            if (orders) {
              reject(orders)
              orders = null
            }
          }, 1000)
        }
      }, 1000)
    }
  });
}

io.on("connection", socket => {
  SocketIO = socket
  socket.on('sendOrders', res => {
    orders = res
  })
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

app.post('/deleteOrder', (req,res) => {
  io.emit('deleteOrder', req.body)
  res.send('deleted order')
})

app.post('/getOrders', (req,res) => {
  io.emit('getOrders', req.body)
  sendOrders(req.body).then(val => {
    res.send(val)
  })
  .catch(err => console.log(err))
  // if (SocketIO) {
  //   SocketIO.on('sendOrders', data => {
  //     res.send(data)
  //   })
  // }
})

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
