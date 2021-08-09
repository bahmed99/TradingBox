const express = require('express')
const router = express.Router()
const Client = require("../../models/user/client")
const Video = require("../../models/video/index")
const requireLoginClient = require('../../middleWare/requireLoginClient')


router.put("/updateProfile", requireLoginClient, (req, res) => {
    const data = req.body
    Client.findById(req.client._id).then(result => {
        result.name = data.name
        result.date = data.date
        result.email = data.email
        result.tel = data.tel
        result.save().then(resultat => {

            res.send(resultat)
        })
    }).catch(err => {
        res.status(400).send({ error: err })
    })
})

router.put("/updatePassword", requireLoginClient, (req, res) => {
    const password = req.body.password
    Client.findById(req.client._id).then(result => {
        bcrypt.hash(password, 15).then(hashedPassword => {
            result.password = hashedPassword
            result.save().then(resultat => {
                res.send(resultat)
            }).catch(erreur => {
                res.send({ erreur: erreur })
            })
        })
    }).catch(err => {
        res.status(400).send({ error: err })
    })
})

router.get("/videos",requireLoginClient,(req,res)=>{
    Video.find().then(resultat=>{
        res.status(200).send(resultat)
    }).catch(erreur=>{
        res.status(400).send({erreur:erreur})
    })

})

router.put('/like',requireLoginClient,(req,res)=>{
    Video.findByIdAndUpdate(req.body.videoId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.put('/unlike',requireLoginClient,(req,res)=>{
    Video.findByIdAndUpdate(req.body.videoId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})


router.put('/comment',requireLoginClient,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Video.findByIdAndUpdate(req.body.videoId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})







module.exports = router