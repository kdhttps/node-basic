/**
 * Created by KD
 */
const user = require('./user.model');

/**
 * Check username and password
 * @param {ObjectId} id - user id
 * @return {user} - return user
 * @return {err} - return error
 */
let getByUsernamePassword = (username, password) => {
  return user
    .findOne({username, password})
    .exec()
    .then((user) => {
      return Promise.resolve(user);
    })
    .catch((err) => Promise.reject(err));
};

/**
 * Get all active users
 * @return {users} - return all users
 * @return {err} - return error
 */
let getAllUsers = () => {
  return user
    .find({})
    .sort({name: 1})
    .exec()
    .then((users) => Promise.resolve(users))
    .catch((err) => Promise.reject(err));
};

/**
 * Get user by Id
 * @param {ObjectId} id - user id
 * @return {user} - return user
 * @return {err} - return error
 */
let getUserById = (id) => {
  return user
    .findById(id)
    .exec()
    .then((user) => Promise.resolve(user))
    .catch((err) => Promise.reject(err));
};

/**
 * Get user by name
 * @param {String} name - user name
 * @return {users} - return user
 * @return {err} - return error
 */
let getUserByName = (name) => {
  return user
    .findOne({
      name: new RegExp('^' + name + '$', "i")
    })
    .exec()
    .then((user) => Promise.resolve(user))
    .catch((err) => Promise.reject(err));
};

/**
 * Add user
 * @param {object} req - Request json object
 * @return {user} - return user
 * @return {err} - return error
 */
let addUser = (req) => {
  let oUser = new user();
  oUser.name = req.name;
  oUser.description = req.description;

  return oUser.save()
    .then(user => Promise.resolve(user))
    .catch(err => Promise.reject(err));
};

/**
 * Update user
 * @param {object} req - Request json object
 * @return {user} - return user
 * @return {err} - return error
 */
let updateUser = (req, id) => {
  return user
    .findById(id)
    .exec()
    .then((oUser) => {
      oUser.name = req.name || oUser.name;
      oUser.description = req.description || oUser.description;
      return oUser.save()
        .then(updatedUser => Promise.resolve(updatedUser))
        .catch(err => Promise.reject(err));
    })
    .catch(err => Promise.reject(err));
};

/**
 * Remove user by Id
 * @param {ObjectId} id - user id
 * @return {user} - return user
 * @return {err} - return error
 */
let removeUser = (id) => {
  return user
    .findById(id)
    .exec()
    .then((oUser) => {
      return oUser
        .remove()
        .then((rUser) => Promise.resolve(rUser))
        .catch(err => Promise.reject(err));
    })
    .catch(err => Promise.reject(err));
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByName,
  addUser,
  updateUser,
  removeUser,
  getByUsernamePassword
};
