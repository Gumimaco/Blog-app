const {Router} = require("express")
const User = require('../database/models/User')
const router = Router()

const is_authenticated = (req,res,next) => {
    if (req.user) next()
    else res.sendStatus(401)
}

router.get('/:id', async (req,res) => {
    const {id} = req.params
    let user = await User.findOne({id: id})
    if (user) res.send(user)
    else res.sendStatus(401)
})


router.put('/change-settings',is_authenticated, async (req,res) => {
    const {key,username,bio} = req.body
    if (key !== undefined && key !== req.user.profile_picture) {
        await User.updateOne({id: req.user.id},{$set: {profile_picture: key}})
    }
    if (username !== req.user.username) {
        await User.updateOne({id: req.user.id},{$set: {username}})
    }
    if (bio !== req.user.description) {
        await User.updateOne({id: req.user.id},{$set: {description: bio}})
    }
    res.sendStatus(201)
})



module.exports = router