const express = require('express')
let mongodb = require('mongodb')

let url = require('../url')
let mcl = mongodb.MongoClient
let router = express.Router()

router.post("/",(req,res)=>{
    let obj = req.body
    mcl.connect(url,(err,conn)=>{
        if(err)
            console.log('Error in connection :-', err)
        else{
            let db = conn.db("miniprj")
            db.collection('products').insertOne(obj, (err) => {
                if (err)
                    res.json({ 'insert': 'Error ' + err })
                else{
                    console.log("Data inserted")
                    res.json({'insert' : 'Success'})
                    conn.close()
                }
            })
        }
    })
})

router.post("/createUser",(req,res)=>{
    let obj = {
        "userid" : req.body.userid,
        "u_name" : req.body.uname,
        "upwad" : req.body.upwd,
        "email" : req.body.email,
        "address" : req.body.address,
        "contact" : req.body.contact
    }
    mcl.connect(url,(err,conn)=>{
        if(err)
            console.log('Error in connection :-', err)
        else{
            let db = conn.db("miniprj")
            db.collection('users').insertOne(obj, (err) => {
                if (err)
                    res.json({ 'userInsert': 'Error ' + err })
                else{
                    console.log("User inserted")
                    res.json({'userInsert' : 'Success'})
                    conn.close()
                }
            })
        }
    })
})

router.post("/cartInsert",(req,res)=>{
    let obj = {
        "p_id" : req.body.p_id,
        "p_cost" : req.body.p_cost,
        qty : 1,
        "p_img" : req.body.p_img,
        "u_name" : req.body.uname
    }
    mcl.connect(url,(err,conn)=>{
        if(err)
            console.log('Error in connection :-', err)
        else{
            let db = conn.db("miniprj")
            db.collection('cart').insertOne(obj, (err) => {
                if (err)
                    res.json({ 'cartInsert': 'Error ' + err })
                else{
                    console.log("Product in Cart inserted")
                    res.json({'cartInsert' : 'Success'})
                    conn.close()
                }
            })
        }
    })
})
module.exports = router
