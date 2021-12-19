const sql = require("./db.js");
const moment = require('moment');

// constructor
const Reply = function(reply) {
    this.i_correspondence = reply.i_correspondence;
    this.i_ticket = reply.i_ticket;
    this.time_at = reply.time_at;
    this.text = reply.text;
    this.user = reply.user;
}

Reply.create = (newReply, result) => {
    var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    sql.query(`INSERT INTO tt_correspondence SET i_ticket = ?, text = ?, user = ?, type = 'reply', time_at= ?`, [newReply.i_ticket, newReply.text, newReply.user, mysqlTimestamp], (err, res) => {    
        if(err) {
            console.log("error:", err)
            result(err, null)
            return
        }
        console.log("added reply:", {id: res.isertId, ...newReply})
        result(null, {id:res.insertId, ...newReply})
    })
}

/*
Reply.findById = (i_reply, result) => {
    sql.query(`SELECT * FROM tt_reply WHERE i_reply = ${i_reply}`, (err, res) => {
        if(err){
            console.log("error:", err)
            result(err, null)
            return
        }
        if(res.length) {
            console.log("found reply:", res)
            result(null, res)
            return
        }

        result({kind: "not_found"}, null)
    })
}
*/

Reply.findByTicket = (i_ticket, result) => {
    sql.query(`SELECT * FROM tt_correspondence WHERE i_ticket = ${i_ticket} AND type = "reply"`, (err, res) => {
        if(err){
            console.log("error:", err)
            result(err, null)
            return
        }
        if(res.length) {
            console.log("found reply:", res)
            result(null, res)
            return
        }

        result({kind: "not_found"}, null)
    })
}

module.exports = Reply;