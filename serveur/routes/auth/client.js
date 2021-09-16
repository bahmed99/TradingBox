const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { JWT_SECRET } = require("../../Keys");
const Client = require("../../models/user/client");
const bcrypt = require("bcrypt");

var transporter = nodemailer.createTransport({
  service: "gmail",


  auth: {
    user: "ahmed.bahri@ensi-uma.tn",
    pass: "ahmed200",
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: "Veuillez remplir tout les champs" });
  }
  Client.findOne({ email: email })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(422).send({ error: "Veuillez vérifier votre email" });
      }
      bcrypt
        .compare(password, savedUser.password)
        .then((doMatch) => {
          if (doMatch) {
            const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
            res.status(200).send({ token: token })
          } else {
            return res
              .status(422)
              .send({ error: "Veuillez vérifier votre mot de passe" });
          }
        })
        .catch((err) => {
          res.status(400).json({ erreur: err });
        });
    })
    .catch((erreur) => {
      res.status(400).json({ erreur: erreur });
    });
});

router.post("/signup", (req, res) => {
  const { email, password, portfolio_size, strategy_suggestion,api,secret_key } = req.body;
  if (!email || !password || !portfolio_size || !strategy_suggestion || !api ||!secret_key) {
    return res.status(422).send({ error: "Veuillez remplir tout les champs" });
  }
  Client.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).send({ error: "Utilisateur existe déja" });
      }
      bcrypt
        .hash(password, 15)
        .then((hashedpassword) => {
          bcrypt.hash(api,15).then(hashedApi=>{
            const newUser = new Client({
              email: email,
              password: hashedpassword,
              portfolio_size: portfolio_size,
              strategy_suggestion: strategy_suggestion,
              api:hashedApi,
              secret_key:secret_key
            });
            newUser
              .save()
              .then((result) => {
                res.json({ message: "le compte est bien créé" });
              })
              .catch((err) => {
                console.log(err);
              });
          }).catch(apiErreur=>{
            res.send(apiErreur)
          })
         
        })
        .catch((err2) => {
          console.log(err2);
        });
    })
    .catch((err3) => {
      console.log(err3);
    });
});

router.post("/forgot-password", (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    Client.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res
          .status(422)
          .json({ error: "Aucun utilisateur avec ce email" });
      } else {
        user.resetToken = token;
        user.expireToken = Date.now() + 3600000;
        user.save().then((result) => {
          let mailoptions = {
            from: "ahmed.bahri@ensi-uma.tn",
            to: user.email,
            subject: "Reset mot de passe",
            html: `
                        <p>you requested for password reset</p>
                        <h5> Alternatively, you can enter the following password reset code: ${token} </h5>
                        `,
          };
          transporter.sendMail(mailoptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {

              
              console.log("Email sent: " + info.response);
            }
          });
          res.json({ message: "check your mail" });
        });
      }
    });
  });
});

router.post("/new-password", (req, res) => {
  const newPassword = req.body.password;
  const sentToken = req.body.token;
  Client.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        return res.status(422).json({ error: "Réessayer session expirée" });
      } else {
        bcrypt
          .hash(newPassword, 15)
          .then((hashedpassword) => {
            user.password = hashedpassword;
            user.resetToken = undefined;
            user.expireToken = undefined;
            user.save().then((saveduser) => {
              res.json({
                message: "La mise a jour de votre mot de passe est bien faite",
              });
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});


router.post("/check_mail",(req,res)=>{
  console.log(req.body.email)
  Client.findOne({email:req.body.email}).then(savedUser=>{
    if (!savedUser) {
       res.send({ error: false });
    }
    else {
       res.send({ error: true });
    }

  })
})

module.exports = router;