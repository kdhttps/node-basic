const httpStatus = require('http-status');
const blog = require('./blog.helper');
const { handleCatch } = require('../utils/common');

function search(req, res) {
  blog.getBlogBySearch(req.body)
    .then(blogs => {
      return res.send(blogs);
    })
    .catch(error => handleCatch(error, res));
}

function get(req, res) {
  blog.getAllBlogs()
    .then(blogs => {
      return res.send(blogs);
    })
    .catch(error => handleCatch(error, res));
}

function add(req, res) {
  blog.addBlog(req.body)
    .then(blog => {
      return res.send(blog);
    })
    .catch(error => handleCatch(error, res));
}

function update(req, res) {
  blog.updateBlog(req.body, req.params.id)
    .then(blog => {
      return res.send(blog);
    })
    .catch(error => handleCatch(error, res));
}

function remove(req, res) {
  blog.removeBlog(req.params.id)
    .then(blog => {
      return res.send(blog);
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
