const express = require('express')
let mongodb = require('mongodb')
let url = require('../url')

let mcl = mongodb.MongoClient
let router = express.Router()

router.get("/", (req, res) => {
 
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db('miniprj')
            db.collection('products').find().toArray((err, array) => {
                if (err)
                    console.log('Error :- ' + err)
                else {
                    console.log('Data sent')
                    res.json(array)
                    conn.close()
                }
            })
        }
    })
})

module.exports = router

router.post("/auth", (req, res) => {
    let u_name = req.body.uname
    let upwad = req.body.upwd
    let obj = {u_name , upwad}

    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db('miniprj')
            db.collection('users').find(obj).toArray((err, array) => {
                if (err)
                    console.log(err)
                else {
                    if(array.length > 0)
                        res.json({'auth' : 'success', 'user' : u_name})
                    else{
                        res.json({'auth' : 'failed'})
                        console.log('Auth response sent')
                        conn.close()
                    }
                }
            })
        }
    })
})

router.post("/fetchCart", (req,res) => {
    let u_name = req.body.uname
    let obj = {uname}

    mcl.connect(url, (err, conn) => {
        if(err)
            console.log('Error in connection: ', err)
        else{
            let db = conn.db('miniprj')
            db.collection('cart').find(obj).toArray((err, array)=>{
                if(err)
                    console.log(err)
                else{
                    res.json(array)
                    console.log('Cart response for ${obj.u_name} sent')
                    conn.close()
                }
            })
        }
    })
})

module.exports = router