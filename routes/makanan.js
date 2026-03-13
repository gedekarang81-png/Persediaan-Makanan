const express = require("express")
const router = express.Router()
const path = require("path")

const db = require("../config/database")

function checkLogin(req,res,next){
if(req.session.user){
next()
}else{
res.redirect("/login")
}
}

router.get("/login",(req,res)=>{
res.sendFile(path.join(__dirname,"../login.html"))
})

router.post("/login",(req,res)=>{

const username = req.body.username
const password = req.body.password

db.query(
"SELECT * FROM users WHERE username=? AND password=?",
[username,password],
(err,result)=>{

if(result && result.length>0){

req.session.user=result[0].username
req.session.role=result[0].role

res.redirect("/")

}else{

res.send("Login gagal")

}

})

})

router.get("/",checkLogin,(req,res)=>{
res.sendFile(path.join(__dirname,"../index.html"))
})

router.get("/data",checkLogin,(req,res)=>{

db.query("SELECT * FROM makanan",(err,result)=>{

res.json({
user:req.session.user,
role:req.session.role,
data:result
})

})

})

router.post("/tambah",(req,res)=>{

const nama=req.body.nama_makanan
const stok=req.body.stok
const harga=req.body.harga

db.query(
"INSERT INTO makanan (nama_makanan,stok,harga) VALUES (?,?,?)",
[nama,stok,harga],
()=>{
res.redirect("/")
})

})

router.get("/hapus/:id",(req,res)=>{

db.query(
"DELETE FROM makanan WHERE id=?",
[req.params.id],
()=>{
res.redirect("/")
})

})

router.get("/logout",(req,res)=>{
req.session.destroy(()=>{
res.redirect("/login")
})
})

module.exports = router