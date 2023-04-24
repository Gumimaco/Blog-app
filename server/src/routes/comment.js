const {Router} = require("express")
const Blog = require('../database/models/Blog')
const Comment = require('../database/models/Comment')
const User = require('../database/models/User')

const router = Router()

const is_authenticated = (req,res,next) => {
    if (req.user) next()
    else res.sendStatus(401)
}

router.post('/create-comment', is_authenticated, async (req,res) => {
    const {comment_body,parent_id,blog_id} = req.body
    const comment = await Comment.create({creator: req.user.id, createdAt: new Date(), content: comment_body})

    if (parent_id === 0) {
        await Blog.updateOne({_id: blog_id},{ $push: { comments: { $each: [comment.id], $position: 0 }}})
    } else {
        await Comment.updateOne({_id: parent_id},{ $push: { comments: { $each: [comment.id], $position: 0 }}})
    }
    res.send(comment)
})

router.get('/:id', async (req,res) => {
    const {id} = req.params
    const comment = await Comment.findOne({_id: id})
    const user = await User.findOne({_id: comment.creator})
    res.send({comment,user})
})

module.exports = router