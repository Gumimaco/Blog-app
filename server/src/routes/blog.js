const {Router} = require("express")
const Blog = require('../database/models/Blog')
const Draft = require('../database/models/DraftBlog')

const router = Router()

const is_authenticated = (req,res,next) => {
    console.log("authenticating")
    if (req.user) {
        console.log("USER FOUND")
        next()
    }
    else {
        res.sendStatus(401)
    }
}

router.post('/create-post',is_authenticated, async (req,res) => {
    const {tags,textArea,title} = req.body
    // check if succesfull later too boring for now 
    const blog = await Blog.create({title: title,c_email: req.user.email, creator: req.user.id, tags,content: textArea})
    res.send(blog)
})

router.delete('/delete-draft/:id',is_authenticated, async (req,res) => {
    const {id} = req.params
    draft = await Draft.findOne({_id: id})
    if (!draft || draft.creator !== req.user.id) {
        res.sendStatus(400)
    } else {
        await Draft.deleteOne({_id: id})
        res.sendStatus(200)
    }
})

router.get('/last-posts',async (req,res) => {
    const blogs = await Blog.find({}).sort({createdAt: -1})
    res.send(blogs)
})

router.get('/last-draft',is_authenticated,async (req,res) => {
    last_draft = await Draft.find({creator: req.user.id}).sort({createdAt: -1})
    if (last_draft.length !== 0) {
        res.send(last_draft[0].id)
    } else {
        console.log("Creating")
        url_id = await Draft.create({creator: req.user.id})
        res.send(url_id.id)
    }
})
router.get('/draft/:id',is_authenticated, async (req,res) => {
    const draft_id = req.params.id
    draft = await Draft.findOne({_id: draft_id})
    if (draft.creator !== req.user.id) {
        res.sendStatus(400)
    } else {
        res.send(draft)
    }
})
router.put('/draft/:id',is_authenticated, async (req,res) => {
    const draft_id = req.params.id
    const {title,textArea,tags} = req.body
    const draft = await Draft.findOne({_id: draft_id})
    if (draft.creator !== req.user.id) {
        res.sendStatus(400)
    } else {
        await Draft.updateOne({_id: draft_id, creator: req.user.id},{$set: {title: title,content: textArea,tags: tags}})
        res.sendStatus(201)
    }
})


module.exports = router