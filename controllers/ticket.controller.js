const Ticket = require("../models/ticket.model")

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        })
    }

    const ticket = new Ticket({
        i_ticket: req.body.i_ticket,
        subject: req.body.subject,
        request_content: req.body.request_content,
        creator: req.body.creator,
        created_at: req.body.created_at,
        owner: req.body.owner,
        priority: req.body.priority,
        severity: req.body.severity,
        status: req.body.status
    })

    Ticket.create(ticket, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the ticket."
            })
        else res.send(data)
    })
}

exports.findOne = (req, res) => {
    Ticket.findById(req.params.i_ticket, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found ticket with specified i_ticket ${req.params.i_ticket}.`
                })
            } else {
                res.status(500).send({
                    message: "Error retrieving ticket with i_ticket" + req.params.i_ticket
                })
            }
        }
        else res.send(data);
    })
}

exports.findAllByOwner = (req, res) => {
  Ticket.findByOwner(req.params.name, (err, data) => {
      if(err) {
          if(err.kind === "not_found") {
              res.status(404).send({
                  message: `Not found tickets for specified owner ${req.params.name}.`
              })
          } else {
              res.status(500).send({
                  message: "Error retrieving tickets of owner " + req.params.name
              })
          }
      }
      else res.send(data);
  })
}

exports.findAllByCreator = (req, res) => {
  Ticket.findByCreator(req.params.name, (err, data) => {
      if(err) {
          if(err.kind === "not_found") {
              res.status(404).send({
                  message: `Not found tickets for specified creator ${req.params.name}.`
              })
          } else {
              res.status(500).send({
                  message: "Error retrieving tickets of creator " + req.params.name
              })
          }
      }
      else res.send(data);
  })
}

exports.findAll = (req, res) => {
  Ticket.getAll((err, data) => {
      if (err)
          res.status(500).send({
              message:
                  err.message || "Error occured while retrieving tickets list"

          });
          else res.send(data);   
  });
}

exports.delete = (req, res) => {
    Ticket.remove(req.params.i_ticket, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found ticket with id ${req.params.i_ticket}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete ticket with id " + req.params.i_ticket
          });
        }
      } else res.send({ message: `The ticket was deleted successfully!` });
    });
  };

  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Ticket.updateById(
      req.params.i_ticket, 
      new Ticket(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found ticket with id ${req.params.i_ticket}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating ticket with id " + req.params.i_ticket
            });
          }
        } else res.send(data);
      }
    );
  };

  