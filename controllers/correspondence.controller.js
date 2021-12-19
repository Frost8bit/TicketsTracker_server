const Correspondence = require("../models/correspondence.model")
/*
    const correspondence = new Correspondence({
        i_reply: req.body.i_reply,
        i_ticket: req.body.i_ticket,
        time_at: req.body.time_at,
        text: req.body.text,
        user: req.body.user,
        type: req.body.type
    })
*/
 
exports.verboseAllByTicket = (req, res) => {
    Correspondence.verboseByTicket(req.params.i_ticket, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found correspondence with i_ticket ${req.params.i_ticket}.`
                })
            } else {
                res.status(500).send({
                    message: "Error retrieving correspondence with i_ticket" + req.params.i_reply
                })
            }
        }
        else res.send(data);
    })
}

