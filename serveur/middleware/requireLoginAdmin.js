const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../Keys')
const mongoose = require('mongoose')
const Admin = require("../models/user/admin") 

module.exports = (req,res,next) =>{
    const {authorization} = req.headers
    if (!authorization)
    {
        return res.status(401).json({error:"you must be logged in 1"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err)
        {
            return res.status(401).json({error:"you must be logged in"})
        }
        const {_id} = payload 
        Admin.findById(_id).then(userdata=>{
            req.admin = userdata
            next()
        })
    }) 

}