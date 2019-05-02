// implement your API here
const express = require('express');
const db = require('./data/db');
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
      res.status(500).json({ message: "The user information could not be retrieved." })
    })
})

server.post('/api/users', (req, res) => {
  const userInfo = req.body;
  db.insert(userInfo)
    .then(user => {
      if (!user.name || !user.bio) {
        res.status(400).json({
          success: false,
          errorMessage: "Please provide name and bio for the user."
        })
      } else {
        res.status(201).json({
          success: true,
          user
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "There was an error while saving the user to the database"
      })
    })
})

server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end()
      } else {
        res.status(404).json({
          success: false,
          message: "The user with the specified ID does not exist."
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "The user could not be removed"
      })
    })
})

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db.update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json({
          success: true,
          updated
        })
      } else {
        res.status(404).json({
          success: false,
          message: "The user with the specified ID does not exist."
        })
      }
    })
})


server.listen(3000, () => {
  console.log("\nServer is running on port 3000\n")
})
