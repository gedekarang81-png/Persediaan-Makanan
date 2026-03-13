const db = require("../config/database");

class Makanan {

  static getAll(callback){
    db.query("SELECT * FROM makanan", callback);
  }

  static tambah(data, callback){
    db.query("INSERT INTO makanan SET ?", data, callback);
  }

  static hapus(id, callback){
    db.query("DELETE FROM makanan WHERE id=?", [id], callback);
  }

}

module.exports = Makanan;