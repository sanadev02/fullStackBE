const users = require("../controllers/user.controllers");
const auth = require("../lib/authentication");

module.exports = function(app){

    app.route("/user")
       .get(auth.isAuthenticated, users.getAll)
       .post(auth.isAuthenticated, users.NewUser);
    //auth.isAuthenticated,
    app.route("/login")
       .post(users.loginUser);

    app.route("/logout")
       .post(auth.isAuthenticated, users.logoutUser); 
}