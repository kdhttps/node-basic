const blog = require('./blog.model');

/**
 * Get all active blogs
 * @return {blogs} - return all blogs
 * @return {err} - return error
 */
let getBlogBySearch = (params) => {
  return blog
    .search(params)
    .then((blogs) => Promise.resolve(blogs))
    .catch((err) => Promise.reject(err));
};

/**
 * Get all active blogs
 * @return {blogs} - return all blogs
 * @return {err} - return error
 */
let getAllBlogs = () => {
  return blog
    .find({})
    .sort({title: 1})
    .exec()
    .then((blogs) => Promise.resolve(blogs))
    .catch((err) => Promise.reject(err));
};

/**
 * Get blog by Id
 * @param {ObjectId} id - blog id
 * @return {blog} - return blog
 * @return {err} - return error
 */
let getBlogById = (id) => {
  return blog
    .findById(id)
    .exec()
    .then((blog) => Promise.resolve(blog))
    .catch((err) => Promise.reject(err));
};

/**
 * Get blog by title
 * @param {String} title - blog title
 * @return {blogs} - return blog
 * @return {err} - return error
 */
let getBlogByName = (title) => {
  return blog
    .findOne({
      title: new RegExp('^' + title + '$', "i")
    })
    .exec()
    .then((blog) => Promise.resolve(blog))
    .catch((err) => Promise.reject(err));
};

/**
 * Add blog
 * @param {object} req - Request json object
 * @return {blog} - return blog
 * @return {err} - return error
 */
let addBlog = (req) => {
  let oBlog = new blog();
  oBlog.title = req.title;
  oBlog.content = req.content;

  return oBlog.save()
    .then(blog => Promise.resolve(blog))
    .catch(err => Promise.reject(err));
};

/**
 * Update blog
 * @param {object} req - Request json object
 * @return {blog} - return blog
 * @return {err} - return error
 */
let updateBlog = (req, id) => {
  return blog
    .findById(id)
    .exec()
    .then((oBlog) => {
      oBlog.title = req.title || oBlog.title;
      oBlog.content = req.content || oBlog.content;
      return oBlog.save()
        .then(updatedBlog => Promise.resolve(updatedBlog))
        .catch(err => Promise.reject(err));
    })
    .catch(err => Promise.reject(err));
};

/**
 * Remove blog by Id
 * @param {ObjectId} id - blog id
 * @return {blog} - return blog
 * @return {err} - return error
 */
let removeBlog = (id) => {
  return blog
    .findById(id)
    .exec()
    .then((oBlog) => {
      return oBlog
        .remove()
        .then((rBlog) => Promise.resolve(rBlog))
        .catch(err => Promise.reject(err));
    })
    .catch(err => Promise.reject(err));
};

module.exports = {
  getAllBlogs,
  getBlogById,
  getBlogByName,
  addBlog,
  updateBlog,
  removeBlog,
  getBlogBySearch
};
