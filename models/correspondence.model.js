const sql = require("./db.js");

// constructor
const Correspondence = function(correspondence) {
    this.i_reply = correspondence.i_reply;
    this.i_ticket = correspondence.i_ticket;
    this.time_at = correspondence.time_at;
    this.text = correspondence.text;
    this.user = correspondence.user;
    this.type = correspondence.type;
}

Correspondence.verboseByTicket = (i_ticket, result) => {
    sql.query(`SELECT * FROM tt_correspondence WHERE i_ticket = ${i_ticket} ORDER BY time_at`, (err, res) => {
        if(err){
            console.log("error:", err)
            result(err, null)
            return
        }
        if(res.length) {
            console.log("found correspondence:", res)
            result(null, res)
            return
        }

        result({kind: "not_found"}, null)
    })
}


module.exports = Correspondence;