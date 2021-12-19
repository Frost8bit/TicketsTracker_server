const Reply = require("../models/replies.model")

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }

    const reply = new Reply({
        i_correspondence: req.body.i_correspondence,
        i_ticket: req.body.i_ticket,
        time_at: req.body.time_at,
        text: req.body.text,
        user: req.body.user
    })

    Reply.create(reply, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Unexpected error occurred while adding reply."
            })
        else res.send(data)
    })
}

exports.findOne = (req, res) => {
    Reply.findById(req.params.i_reply, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found reply with i_reply ${req.params.i_reply}.`
                })
            } else {
                res.status(500).send({
                    message: "Error retrieving reply with i_reply" + req.params.i_reply
                })
            }
        }
        else res.send(data);
    })
}

exports.findAllByTicket = (req, res) => {
    Reply.findByTicket(req.params.i_ticket, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found replies with i_ticket ${req.params.i_ticket}.`
                })
            } else {
                res.status(500).send({
                    message: "Error retrieving replies with i_ticket" + req.params.i_reply
                })
            }
        }
        else res.send(data);
    })
}

