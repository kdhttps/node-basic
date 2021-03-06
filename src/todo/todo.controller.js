const httpStatus = require('http-status');
const todo = require('./todo.helper');
const { handleCatch } = require('../utils/common');

function search(req, res) {
  todo.getTodoBySearch(req.body)
    .then(todos => {
      return res.send(todos);
    })
    .catch(error => handleCatch(error, res));
}

function get(req, res) {
  todo.getAllTodos()
    .then(todos => {
      return res.send(todos);
    })
    .catch(error => handleCatch(error, res));
}

function add(req, res) {
  todo.addTodo(req.body)
    .then(todo => {
      return res.send(todo);
    })
    .catch(error => handleCatch(error, res));
}

function update(req, res) {
  todo.updateTodo(req.body, req.params.id)
    .then(todo => {
      return res.send(todo);
    })
    .catch(error => handleCatch(error, res));
}

function remove(req, res) {
  todo.removeTodo(req.params.id)
    .then(todo => {
      return res.send(todo);
    })
    .catch(error => {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    });
}

module.exports = {
  search,
  get,
  add,
  update,
  remove,
};
