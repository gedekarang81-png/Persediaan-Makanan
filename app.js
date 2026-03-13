const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();

app.set("view engine", "ejs");

/* lokasi file view sekarang di folder utama */
app.set("views", __dirname);

/* supaya style.css bisa dibaca dari folder utama */
app.use(express.static(__dirname));

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'inventory-secret-key-123',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 }
}));

const makananRoutes = require("./routes/makanan");
app.use("/", makananRoutes);

app.listen(3000, () => {
    console.log("Server berjalan di http://localhost:3000");
});