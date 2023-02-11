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
    await User.updateOne({id: req.user.id},{$set: {profile_picture: key,username,description: bio}})
    res.sendStatus(201)
})



module.exports = router