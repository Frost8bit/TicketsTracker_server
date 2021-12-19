const User = require("../models/user.model")
const bcrypt = require('bcryptjs')
const express = require('express')


exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        })
    }

    const user = new User({
        i_user: req.body.i_user,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        creator: req.body.creator,
        name: req.body.name,
        role: req.body.role,
        company: req.body.company
    })


    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user."
            })
        else res.send(data)
    })
}

exports.findByEmail = (req, res) => {
    User.findNameByEmail(req.body.email, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with email ${req.body.email}.`
                })
            } else {
                res.status(500).send({
                    message: "Error retrieving user with email " + req.body.email
                })
            }
        }
        else res.send(data);
    })
}

exports.findOne = (req, res) => {
  User.findNameById(req.params.i_user, (err, data) => {
      if(err) {
          if(err.kind === "not_found") {
              res.status(404).send({
                  message: `Not found user with i_user ${req.params.i_user}.`
              })
          } else {
              res.status(500).send({
                  message: "Error retrieving user with i_user" + req.params.i_user
              })
          }
      }
      else res.send(data);
  })
}

exports.findAll = (req, res) => {
  User.getAll((err, data) => {
      if (err)
          res.status(500).send({
              message:
                  err.message || "Error occured while retrieving users list"

          });
          else res.send(data);   
  });
}

exports.findAllAdmins = (req, res) => {
  User.getAdmins((err, data) => {
      if (err)
          res.status(500).send({
              message:
                  err.message || "Error occured while retrieving admins list"

          });
          else res.send(data);   
  });
}

exports.findAllCustomers = (req, res) => {
  User.getCustomers((err, data) => {
      if (err)
          res.status(500).send({
              message:
                  err.message || "Error occured while retrieving users list"

          });
          else res.send(data);   
  });
}

exports.delete = (req, res) => {
  User.remove(req.params.i_user, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with id ${req.params.i_user}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete user with id " + req.params.i_user
          });
        }
      } else res.send({ message: `The user has been deleted successfully!` });
    });
  };

  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    User.updateById(
      req.params.i_user, 
      new User(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found user with id ${req.params.i_user}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating user with id " + req.params.i_user
            });
          }
        } else res.send(data);
      }
    );
  };

  