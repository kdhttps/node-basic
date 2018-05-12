const todo = require('../models/todo');

/**
 * Get all active todos
 * @return {todos} - return all todos
 * @return {err} - return error
 */
let getTodoBySearch = (params) => {
  return todo
    .search(params)
    .then((todos) => Promise.resolve(todos))
    .catch((err) => Promise.reject(err));
};

/**
 * Get all active todos
 * @return {todos} - return all todos
 * @return {err} - return error
 */
let getAllTodos = () => {
  return todo
    .find({})
    .sort({name: 1})
    .exec()
    .then((todos) => Promise.resolve(todos))
    .catch((err) => Promise.reject(err));
};

/**
 * Get todo by Id
 * @param {ObjectId} id - todo id
 * @return {todo} - return todo
 * @return {err} - return error
 */
let getTodoById = (id) => {
  return todo
    .findById(id)
    .exec()
    .then((todo) => Promise.resolve(todo))
    .catch((err) => Promise.reject(err));
};

/**
 * Get todo by name
 * @param {String} name - todo name
 * @return {todos} - return todo
 * @return {err} - return error
 */
let getTodoByName = (name) => {
  return todo
    .findOne({
      name: new RegExp('^' + name + '$', "i")
    })
    .exec()
    .then((todo) => Promise.resolve(todo))
    .catch((err) => Promise.reject(err));
};

/**
 * Add todo
 * @param {object} req - Request json object
 * @return {todo} - return todo
 * @return {err} - return error
 */
let addTodo = (req) => {
  let oTodo = new todo();
  oTodo.name = req.name;
  oTodo.description = req.description;

  return oTodo.save()
    .then(todo => Promise.resolve(todo))
    .catch(err => Promise.reject(err));
};

/**
 * Update todo
 * @param {object} req - Request json object
 * @return {todo} - return todo
 * @return {err} - return error
 */
let updateTodo = (req, id) => {
  return todo
    .findById(id)
    .exec()
    .then((oTodo) => {
      oTodo.name = req.name || oTodo.name;
      oTodo.description = req.description || oTodo.description;
      return oTodo.save()
        .then(updatedTodo => Promise.resolve(updatedTodo))
        .catch(err => Promise.reject(err));
    })
    .catch(err => Promise.reject(err));
};

/**
 * Remove todo by Id
 * @param {ObjectId} id - todo id
 * @return {todo} - return todo
 * @return {err} - return error
 */
let removeTodo = (id) => {
  return todo
    .findById(id)
    .exec()
    .then((oTodo) => {
      return oTodo
        .remove()
        .then((rTodo) => Promise.resolve(rTodo))
        .catch(err => Promise.reject(err));
    })
    .catch(err => Promise.reject(err));
};

module.exports = {
  getAllTodos,
  getTodoById,
  getTodoByName,
  addTodo,
  updateTodo,
  removeTodo,
  getTodoBySearch
};
