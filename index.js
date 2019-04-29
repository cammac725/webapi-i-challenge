// implement your API here
const express = require('express');
const db = require('./data/db.js');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.send('Welcome to Lambda Users')
})

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json({ success: true, users })
    })
    .catch(err => {
      res.status(err.code).json({ success: false, })
    })
})

server.listen(3000, () => {
  console.log("\nServer is running on port 3000\n")
})
