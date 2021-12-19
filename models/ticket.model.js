const sql = require("./db.js");
const moment = require('moment');


// constructor
const Ticket = function(ticket) {
    this.i_ticket = ticket.i_ticket;
    this.subject = ticket.subject;
    this.request_content = ticket.request_content;
    this.creator = ticket.creator;
    this.created_at = ticket.created_at;
    this.owner = ticket.owner;
    this.priority = ticket.priority;
    this.severity = ticket.severity;
    this.status = ticket.status;
}

Ticket.create = (newTicket, result) => 
{
  var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    //sql.query('INSERT INTO tickets SET ?', newTicket, (err, res) => {
    sql.query(`INSERT INTO tickets SET subject = ?, request_content = ?, creator = ?, created_at = ?`, [newTicket.subject, newTicket.request_content, newTicket.creator, mysqlTimestamp], (err, res) => {
        if(err) {
            console.log("error:", err)
            result(err, null)
            return
        }
        console.log("created ticket:", {id: res.isertId, ...newTicket})
        result(null, {id:res.insertId, ...newTicket})
    })
}

Ticket.findById = (i_ticket, result) => {
    sql.query(`SELECT * FROM tickets WHERE i_ticket = ${i_ticket}`, (err, res) => {
        if(err){
            console.log("error:", err)
            result(err, null)
            return
        }
        if(res.length) {
            console.log("found ticket:", res[0])
            result(null, res[0])
            return
        }

        result({kind: "not_found"}, null)
    })
}

Ticket.findByOwner = (name, result) => {
  sql.query(`SELECT * FROM tickets WHERE owner = '${name}' and tickets.status IN ('New','Open','Stalled','Closed','Waiting') ORDER BY FIELD (tickets.status, 'New', 'Open', 'Stalled', 'Waiting', 'Closed'), created_at DESC`,  (err, res) => {
      if(err){
          console.log("error:", err)
          result(err, null)
          return
      }
      if(res.length) {
          console.log("found ticket:", res)
          result(null, res)
          return
      }

      result({kind: "not_found"}, null)
  })
}

Ticket.findByCreator = (name, result) => {
  sql.query(`SELECT * FROM tickets WHERE creator = '${name}' and tickets.status IN ('New','Open','Stalled','Closed','Waiting') ORDER BY FIELD (tickets.status, 'New', 'Open', 'Stalled', 'Waiting', 'Closed'), created_at DESC`,  (err, res) => {
      if(err){
          console.log("error:", err)
          result(err, null)
          return
      }
      if(res.length) {
          console.log("found tickets:", res)
          result(null, res)
          return
      }

      result({kind: "not_found"}, null)
  })
}


Ticket.remove = (i_ticket, result) => {
    sql.query("DELETE FROM tickets WHERE i_ticket = ?", i_ticket, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted ticket with id: ", i_ticket);
      result(null, res);
    });
  };

   Ticket.updateById = (i_ticket, ticket, result) => {
    created = new Date();
    sql.query(
      "UPDATE tickets SET subject = ?, request_content = ?, creator = ?, created_at = ?, owner = ?, priority = ?, severity = ?, status = ? WHERE i_ticket = ?",
      [ticket.subject, ticket.request_content, ticket.creator, ticket.created_at, ticket.owner, ticket.priority, ticket.severity, ticket.status, i_ticket],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found ticket with the i_ticket
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated ticket: ", { i_ticket: i_ticket, ...ticket });
        result(null, { i_ticket: i_ticket, ...ticket });
      }
    );
  };

  Ticket.getAll = result => {
    sql.query("SELECT * FROM tickets where tickets.status IN ('New','Open','Stalled','Closed','Waiting') ORDER BY FIELD (tickets.status, 'New', 'Open', 'Stalled', 'Waiting', 'Closed'), created_at DESC", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("ticket: ", res);
        result(null, res);
    });
};

module.exports = Ticket