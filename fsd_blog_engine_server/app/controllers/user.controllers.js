const { json } = require("body-parser");
const Joi = require("joi");
const user = require("../models/user.models");

const getAll = (req, res, next) => {
    user.getAllUsers((err, num_rows, results)=> {
        if(err) {
            console.log(err)
            return res.sendStatus(500);
        }
        return res.status(200).send(results);
    })  
}

const NewUser = (req, res, next) => {

    const schema = Joi.object({
        "first_name": Joi.string().required(),
        "last_name": Joi.string().required(),
        "email": Joi.string().email().required(),
        "password": Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!*?&]{8,}$/).required()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let temp_user = Object.assign({}, req.body);

    user.addNewUser(temp_user, (err, id) => {
        if (err)
            return res.sendStatus(500); 

        return res.status(201).send({ user_id: id })
    })
}


const loginUser = (req,res) => {

    const schema = Joi.object({
        "email": Joi.string().email().required(),
        "password": Joi.string().required()
    })

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    user.authenticateUser(req.body.email, req.body.password, (err,id) => {
        if(err === 404) return res.status(400).send("Invalid email/password supplied")
        if(err) return res.sendStatus(500)

        user.getToken(id, (err, token) => {
            if (err) return res.sendStatus(500)

            if(token){
                return res.status(200).send({user_id: id, session_token: token})
            }else{
                user.setToken(id, (err, token) => {
                    if (err) return res.sendStatus(500)
                    return res.status(200).send({user_id: id, session_token: token})
                })
            }
            
        })
    })
}

const logoutUser = (req, res, next) => {
    let token = req.get('X-Authorization');
        user.removeToken(token,(err) => {
            if(err){ 
                console.log(err)
                return res.sendStatus(500) 
            }
            return res.status(201).send("User logged out");
        })
}

module.exports = {
    getAll:getAll,
    NewUser:NewUser,
    loginUser:loginUser,
    logoutUser:logoutUser,
}