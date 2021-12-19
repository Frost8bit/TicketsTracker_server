const jwt=require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sql = require('../models/db');
const e = require('express');

module.exports.authenticate=function(req,res){
    const email=req.body.email;
    const password=req.body.password;
    sql.query('SELECT * FROM users WHERE email = ?',[email], function (error, results) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
        if(results.length >0){
            if (bcrypt.compareSync(password, results[0].password)) {
              var token=jwt.sign({i_user: results[0].i_user}, process.env.SECRET_KEY,{
                expiresIn: '8h'
            });
                res.json({
                  i_user: results[0].i_user,
                    email: email,
                    company: results[0].company,
                    role: results[0].role,
                    token: token,
                    name: results[0].name
                })
            }else{
                res.status(403, 'No user with this email and password combination found!').send({error: "Email and password does not match" });
            }
         
        }
        else{
          res.status(401).send({error: "User doesn't exist" });
        }
      }
    });
}