const user = require("../controllers/user.controllers");
const auth = require("../lib/authentication");

module.exports = function(app){

    app.route("/user")
       .get(auth.isAuthenticated, user.getAll)
       .post(auth.isAuthenticated, user.NewUser);
    //auth.isAuthenticated,
    app.route("/login")
       .post(user.loginUser);

    app.route("/logout")
       .post(auth.isAuthenticated, user.logoutUser); 
}