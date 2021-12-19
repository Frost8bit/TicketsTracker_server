const Register = require("../models/register.model")
const bcrypt = require('bcryptjs')

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }

    const register = new Register({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
    })

    Register.create(register, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while registration."
            })
        else res.send(data)
    })
}