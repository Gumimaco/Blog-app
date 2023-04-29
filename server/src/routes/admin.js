const { Router } = require("express");
const Blog = require("../database/models/Blog");
const Comment = require("../database/models/Comment");
const User = require("../database/models/User");

const router = Router();

const is_Admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) next();
  else res.sendStatus(401);
};
router.get("/all-posts", is_Admin, async (req, res) => {
  const blogs = await Blog.find({});
  res.send(blogs);
});
router.get("/all-users", is_Admin, async (req, res) => {
  const users = await User.find({});
  res.send(users);
});
router.get("/all-comments", is_Admin, async (req, res) => {
  const comments = await Comment.find({});
  res.send(comments);
});

router.delete("/post/:id", is_Admin, async (req, res) => {
  const { id } = req.params;
  const post = await Blog.deleteOne({ _id: id });
  res.sendStatus(200);
});
router.delete("/user/:id", is_Admin, async (req, res) => {
  const { id } = req.params;
  const user = await User.deleteOne({ _id: id });
  res.sendStatus(200);
});
router.delete("/comment/:id", is_Admin, async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.deleteOne({ _id: id });
  res.sendStatus(200);
});
module.exports = router;
