const express = require('express');
const httpStatus = require('http-status');
const router = express.Router();

const todo = require('../helpers/todo');

router.post('/todo/search', (req, res) => {
  todo.getTodoBySearch(req.body)
    .then(todos => {
      return res.send(todos);
    })
    .catch(error => {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    });
});

router.get('/todo', (req, res) => {
  todo.getAllTodos()
    .then(todos => {
      return res.send(todos);
    })
    .catch(error => {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    });
});

router.post('/todo', (req, res) => {
  todo.addTodo(req.body)
    .then(todo => {
      return res.send(todo);
    })
    .catch(error => {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    });
});

router.put('/todo/:id', (req, res) => {
  todo.updateTodo(req.body, req.params.id)
    .then(todo => {
      return res.send(todo);
    })
    .catch(error => {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    });
});

router.delete('/todo/:id', (req, res) => {
  todo.removeTodo(req.params.id)
    .then(todo => {
      return res.send(todo);
    })
    .catch(error => {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    });
});

module.exports = router;
