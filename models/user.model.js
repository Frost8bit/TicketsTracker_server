const sql = require("./db.js");

// constructor
const User = function(user) {
    this.i_user = user.i_user;
    this.email = user.email;
    this.password = user.password;
    this.name = user.name;
    this.role = user.role;
    this.company = user.company;
}

User.create = (newUser, result) => 
{
    sql.query(`INSERT INTO users SET email = ?, password = ?, name = ?, role = ?, company = ?`, [newUser.email, newUser.password, newUser.name, newUser.role, newUser.company], (err, res) => {
        if(err) {
            console.log("error:", err)
            result(err, null)
            return
        }
        console.log("created user:", {id: res.isertId, ...newUser})
        result(null, {id:res.insertId, ...newUser})
    })
}

User.findNameByEmail = (email, result) => {
    sql.query(`SELECT name FROM users WHERE email = ?`, email, (err, res) => {
        if(err){
            console.log("error:", err)
            result.json(err, null)
            return
        }
        if(res.length) {
            console.log("found user:", res);
            result(null, JSON.stringify(res[0]))
            return
        }

        result({kind: "not_found"}, null)
    })
}

User.findNameById = (i_user, result) => {
    sql.query(`SELECT * FROM users WHERE i_user = ${i_user}`, (err, res) => {
        if(err){
            console.log("error:", err)
            result(err, null)
            return
        }
        if(res.length) {
            console.log("found user:", res[0])
            result(null, res[0])
            return
        }

        result({kind: "not_found"}, null)
    })
}


User.remove = (i_user, result) => {
    sql.query("DELETE FROM users WHERE i_user = ?", i_user, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted ticket with id: ", i_user);
      result(null, res);
    });
  };

  User.updateById = (i_user, user, result) => {
    sql.query(
      "UPDATE users SET email = ?, name = ?, role = ?, company = ? WHERE i_user = ?",
      [user.email, user.name, user.role, user.company, i_user],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated user: ", { i_user: i_user, ...user });
        result(null, { i_user: i_user, ...user });
      }
    );
  };

  User.getAll = result => {
    sql.query("SELECT * FROM users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("users: ", res);
        result(null, res);
    });
};

  User.getAdmins = result => {
    sql.query("SELECT name FROM users where role='admin'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("admins: ", res);
        result(null, res);
    });
};

User.getCustomers = result => {
  sql.query("SELECT name FROM users where role='customer'", (err, res) => {
      if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
      }
      console.log("users: ", res);
      result(null, res);
  });
};

module.exports = User