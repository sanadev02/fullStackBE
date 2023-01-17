const user = require("../models/user.models");

const isAuthenticated = function(req, res, next) {
    let token = req.get('X-Authorization');

    user.getIDFromToken(token, (err, id) => {
        console.log(token, id)
        if (err || id === null) {
            return res.sendStatus(401);
        }
        next();
    });
}

module.exports = {
    isAuthenticated:isAuthenticated,
}