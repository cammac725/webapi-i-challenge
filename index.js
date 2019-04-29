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
      res.status(500).json({ error: "The users information could not be retrieved." })
    })
})

server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json({
          success: true,
          user
        })
      } else {
        res.status(404).json({
          success: false,
          message: "The user with the specified ID does not exist."
        })
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The user information could not be retrieved." })
    })
})

server.listen(3000, () => {
  console.log("\nServer is running on port 3000\n")
})
