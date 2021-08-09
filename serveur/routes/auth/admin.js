const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const { JWT_SECRET } = require('../../Keys')
const Admin= require("../../models/user/admin.js")
const bcrypt = require('bcrypt')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "iDriveGears@gmail.com",
        pass: "aok2020."
    }
})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
       return res.status(422).send({ error: "Veuillez remplir tout les champs" })
    }
    Admin.findOne({ email: email }).then(savedUser => {
        if (!savedUser) {
           return  res.status(422).send({ error: "Veuillez vérifier votre email" })
        }
        bcrypt.compare(password, savedUser.password).then(doMatch => {
            if (doMatch) {
                const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                res.status(200).send({ token: token })
            }
            else {

                return res.status(422).send({ error: "Veuillez vérifier votre mot de passe" })


            }
        }).catch(err => {
            res.status(400).json({ erreur: err })
        })

    }).catch(erreur => {
        res.status(400).json({ erreur: erreur })
    })


})

router.post('/signup',(req,res)=>{
    console.log(req.body)
    const { name, email, password } = req.body
    if (!name || !email ||!password ) {
        return res.status(422).send({ error: "Veuillez remplir tout les champs" })
    }
    Admin.findOne({ email: email }).then(savedUser => {
        if (savedUser) {
            return res.status(422).send({ error: 'Utilisateur existe déja' })
        }
        bcrypt.hash(password, 15).then(hashedpassword => {
            const newUser = new Admin({
                name: name,
                email: email,
                password: hashedpassword,
               
            })
            newUser.save().then(result => {
                res.json({ message: "le compte est bien créé" })
            }).catch(err => {
                console.log(err)
            })

        }).catch(err => {
            console.log(err)
        })


    }).catch(err => {
        console.log(err)
    })

})


router.post('/forgot-password', (req, res) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err)
        }
        const token = buffer.toString("hex")
        Admin.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    return res.status(422).json({ error: "Aucun utilisateur avec ce email" })
                }

                else {
                    user.resetToken = token
                    user.expireToken = Date.now() + 3600000
                    user.save().then(result => {
                        let mailoptions = {
                            from: "iDriveGears@gmail.com",
                            to: user.email,
                            subject: "Reset mot de passe",
                            html: `
                        <p>you requested for password reset</p>
                        <h5> click on this <a href="http://localhost:3000/reset/${token}"> Link </a> to reset your password</h5>
                        `
                        }
                        transporter.sendMail(mailoptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            }
                            else {
                                console.log('Email sent: ' + info.response);

                            }
                        });
                        res.json({ message: "check your mail" })

                    })
                }
            })
    })

})


router.post('/new-password',(req,res)=>{
    const newPassword = req.body.password
    const sentToken = req.body.token
    Admin.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
        .then(user => {

            if (!user) {
                return res.status(422).json({ error: "Réessayer session expirée" })
            }

            else {
                bcrypt.hash(newPassword, 15).then(hashedpassword => {
                    user.password = hashedpassword
                    user.resetToken = undefined
                    user.expireToken = undefined
                    user.save().then(saveduser => {
                        res.json({ message: "La mise a jour de votre mot de passe est bien faite" })
                    })
                }).catch(err => {
                    console.log(err)
                })
            }
        }).catch(err => {
            console.log(err)
        })


})



module.exports = router