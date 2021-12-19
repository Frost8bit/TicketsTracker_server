const sql = require("./db.js");
const moment = require('moment');

// constructor
const Comment = function(comment) {
    this.i_correspondence = comment.i_correspondence;
    this.i_ticket = comment.i_ticket;
    this.time_at = comment.time_at;
    this.text = comment.text;
    this.user = comment.user;

}

Comment.create = (newComment, result) => {
    var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    sql.query(`INSERT INTO tt_correspondence SET i_ticket = ?, text = ?, user = ?, type = 'comment', time_at = ?`, [newComment.i_ticket, newComment.text, newComment.user, mysqlTimestamp], (err, res) => { 
        if(err) {
            console.log("error:", err)
            result(err, null)
            return
        }
        console.log("added reply:", {id: res.isertId, ...newComment})
        result(null, {id:res.insertId, ...newComment})
    })
}

/*
Comment.findById = (i_comment, result) => {
    sql.query(`SELECT * FROM tt_comment WHERE i_comment = ${i_comment}`, (err, res) => {
        if(err){
            console.log("error:", err)
            result(err, null)
            return
        }
        if(res.length) {
            console.log("found comment:", res)
            result(null, res)
            return
        }

        result({kind: "not_found"}, null)
    })
}
*/

Comment.findByTicket = (i_ticket, result) => {
    sql.query(`SELECT * FROM tt_correspondence WHERE i_ticket = ${i_ticket} AND type = "comment"`, (err, res) => {
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

module.exports = Comment;