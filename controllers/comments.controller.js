const Comment = require("../models/comments.model")

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }

    const comment = new Comment({
        i_correspondence: req.body.i_correspondence,
        i_ticket: req.body.i_ticket,
        time_at: req.body.time_at,
        text: req.body.text,
        user: req.body.user
    })

    Comment.create(comment, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the comment."
            })
        else res.send(data)
    })
}

exports.findOne = (req, res) => {
    Comment.findById(req.params.i_comment, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found comment with i_comment ${req.params.i_comment}.`
                })
            } else {
                res.status(500).send({
                    message: "Error retrieving comment with i_comment" + req.params.i_comment
                })
            }
        }
        else res.send(data);
    })
}

exports.findAllByTicket = (req, res) => {
    Comment.findByTicket(req.params.i_ticket, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found comments with i_ticket ${req.params.i_ticket}.`
                })
            } else {
                res.status(500).send({
                    message: "Error retrieving comments with i_ticket" + req.params.i_ticket
                })
            }
        }
        else res.send(data);
    })
}

