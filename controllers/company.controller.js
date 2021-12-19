const Company = require("../models/company.model")

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        })
    }

    const company = new Company({
        i_company: req.body.i_company,
        name: req.body.name,
        info: req.body.info
    })

    Company.create(company, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the company."
            })
        else res.send(data)
    })
}

exports.findAll = (req, res) => {
  Company.getAll((err, data) => {
      if (err)
          res.status(500).send({
              message:
                  err.message || "Error occured while retrieving companies list"
          });
          else res.send(data);   
  });
}

exports.findOne = (req, res) => {
  Company.findById(req.params.i_company, (err, data) => {
      if(err) {
          if(err.kind === "not_found") {
              res.status(404).send({
                  message: `Not found company with specified i_company ${req.params.i_company}.`
              })
          } else {
              res.status(500).send({
                  message: "Error fetching company with i_company" + req.params.i_company
              })
          }
      }
      else res.send(data);
  })
}

exports.delete = (req, res) => {
  Company.remove(req.params.i_company, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found company with id ${req.params.i_company}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete company with id " + req.params.i_company
          });
        }
      } else res.send({ message: `The company has been deleted successfully!` });
    });
  };

  exports.update = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content cannot be empty!"
      });
    }
  
    Company.updateById(
      req.params.i_company, 
      new Company(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found company with id ${req.params.i_company}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating company with id " + req.params.i_company
            });
          }
        } else res.send(data);
      }
    );
  };

  