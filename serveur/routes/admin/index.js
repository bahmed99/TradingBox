const express = require('express')
const router = express.Router()
const requireLoginAdmin = require('../../middleWare/requireLoginAdmin')
const Video = require("../../models/video/index")
const multer = require('multer');
const fs = require('fs');
const Client = require("../../models/user/client")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/uploads/videos');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);

    }
});

const upload = multer({
    storage: storage,
})

router.post("/uploadVideo", requireLoginAdmin, upload.single('video'), (req, res) => {
    const newVideo = new Video({
        title: req.body.title,
        description: req.body.description,
        video: req.file.originalname
    })
    newVideo.save().then(resultat => {
        res.send(resultat)
    }).catch(erreur => {
        res.send({ erreur: erreur })
    })
})

router.delete("/deleteVideo/:id", requireLoginAdmin, (req, res) => {
    Video.findOne({ _id: req.params.id }).then(resultat => {
        fs.unlink(`../client/public/uploads/videos/${resultat.video}`, function (err) {
            if (err) return console.log(err);
            console.log('file deleted successfully');
        });
        resultat.remove().then(result => {
            res.send(result)
        }).catch(err => {
            res.send({ erreur: err })
        })
    }).catch(erreur => {
        res.send({ erreur: erreur })
    })

})

router.get("/videos", requireLoginAdmin, (req, res) => {
    Video.find().then(resultat => {
        res.status(200).send(resultat)
    }).catch(erreur => {
        res.status(400).send({ erreur: erreur })
    })

})



router.put("/updateVideo/:id", requireLoginAdmin ,(req, res) => {
    Video.findOne({_id:req.body.videoId}).then(result=>{
        result.title=req.body.title
        result.description=req.body.description
        result.save().then(resultat=>{
            res.send(resultat)
              
         
        }).catch(erreur=>{
            res.send({erreur:erreur})
        })
    }).catch(err=>{
        res.send({erreur:err})
    })
})




router.get('/clients',requireLoginAdmin, (req, res) => {
    Client.find().select('-password').then(resultats => {
        res.status(200).send(resultats)
    }).catch(erreur => {
        res.status(400).send({ erreur: erreur })
    })
})



router.delete('/client/:id',requireLoginAdmin, (req, res) => {
    Client.findOne({_id:req.params.id}).then(resultat => {
        resultat.remove().then(result=>{
            res.status(200).send(result)
        }).catch(err=>{
            res.status(400).send({erreur:err})
        })
    }).catch(erreur => {
        res.status(400).send({ erreur: erreur })
    })
})








module.exports = router