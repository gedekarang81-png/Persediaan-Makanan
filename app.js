const express = require("express")
const session = require("express-session")
const path = require("path")

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(__dirname))

app.use(session({
secret: "persediaan-secret",
resave: false,
saveUninitialized: true
}))

const makananRoutes = require("./routes/makanan")

app.use("/", makananRoutes)

app.listen(3000, () => {
console.log("Server berjalan di http://localhost:3000")
})