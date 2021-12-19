const sql = require("./db.js");

const Register = function(register) {
    this.email = register.email;
    this.password = register.password;
}

Register.create = (newRegister, result) => {
    sql.query("INSERT INTO users SET ?", newRegister, (err, res) => {
        if(err) {
            console.log("error:", err)
            result(err, null)
            return
        }
        console.log("created users:", {id: res.isertId, ...newRegister})
        result(null, {id:res.insertId, ...newRegister})
    })
}

module.exports = Register