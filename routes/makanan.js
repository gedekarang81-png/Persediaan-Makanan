const express = require("express");
const router = express.Router();
const db = require("../config/database");

function checkLogin(req, res, next) {
    if (req.session.user) next();
    else res.redirect("/login");
}

router.get("/login", (req, res) => {
    if (req.session.user) return res.redirect("/");
    res.render("login", { error: null });
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password],
        (err, results) => {
            if (err) throw err;

            if (results.length > 0) {
                req.session.user = results[0].username;
                req.session.role = results[0].role;
                res.redirect("/");
            } else {
                res.render("login", { error: "Username atau Password salah!" });
            }
        }
    );
});

router.get("/", checkLogin, (req, res) => {
    db.query("SELECT * FROM makanan", (err, results) => {
        if (err) throw err;

        res.render("index", {
            makanan: results,
            user: req.session.user,
            role: req.session.role
        });
    });
});

router.post("/tambah", checkLogin, (req, res) => {
    const { nama_makanan, stok, harga } = req.body;

    db.query(
        "INSERT INTO makanan (nama_makanan, stok, harga) VALUES (?,?,?)",
        [nama_makanan, stok, harga],
        () => {
            res.redirect("/");
        }
    );
});

router.get("/hapus/:id", checkLogin, (req, res) => {

    if (req.session.role !== "admin") {
        return res.send("<script>alert('Akses Ditolak!');window.location='/'</script>");
    }

    db.query("DELETE FROM makanan WHERE id=?", [req.params.id], () => {
        res.redirect("/");
    });

});

router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});

module.exports = router;