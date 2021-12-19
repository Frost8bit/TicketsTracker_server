const sql = require("./db.js");

// constructor
const Company = function(company) {
    this.i_company = company.i_company;
    this.name = company.name;
    this.info = company.info;
}

Company.create = (newCompany, result) => 
{
    sql.query(`INSERT INTO companies SET name = ?, info = ?`, [newCompany.name, newCompany.info], (err, res) => {
        if(err) {
            console.log("error:", err)
            result(err, null)
            return
        }
        console.log("created company:", {id: res.insertId, ...newCompany})
        result(null, {id:res.insertId, ...newCompany})
    })
}

Company.findById = (i_company, result) => {
  sql.query(`SELECT * FROM companies WHERE i_company = ${i_company}`, (err, res) => {
      if(err){
          console.log("error:", err)
          result(err, null)
          return
      }
      if(res.length) {
          console.log("found company:", res[0])
          result(null, res[0])
          return
      }

      result({kind: "not found"}, null)
  })
}

Company.remove = (i_company, result) => {
    sql.query("DELETE FROM companies WHERE i_company = ?", i_company, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted company with id: ", i_company);
      result(null, res);
    });
  };

  Company.updateById = (i_company, company, result) => {
    sql.query(
      "UPDATE companies SET name = ?, info = ? WHERE i_company = ?",
      [company.name, company.info, i_company],
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
  
        console.log("updated company: ", { i_company: i_company, ...company });
        result(null, { i_company: i_company, ...company });
      }
    );
  };

  Company.getAll = result => {
    sql.query("SELECT * FROM companies", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("companies: ", res);
        result(null, res);
    });
};


module.exports = Company