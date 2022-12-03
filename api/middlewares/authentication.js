const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const { User } = require("../models");

function passwordsMatch(submittedPassword, storedPasswordHash){
    return bcrypt.compareSync(submittedPassword, storedPasswordHash);
}

/*
The following code runs at login time.
The usernameField and passwordField options refer to the HTTP requests body parameter 
names. I've set this to look for an `email` parameter, but you may prefer to use
a `username` parameter instead of an email. 
BESt PRACTICE: don't state why login failed to the user.
 */
passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
},
(email, password, done) => {
    User.findOne({ where: { email } })
    .then((user) => {
        if(!user) {
            console.log("\n\nFailed Login: user does not exist\n\n");
            return done(null, false, { message: "Failed Login" });
        }

        if(passwordsMatch(password, user.passwordHash) === false){
            console.log("\n\nFailed Login: password did not match\n\n");
            return done(null, false, { message: "Failed Login" });
        }

        console.log("\n\nSuccessful Login\n\n");
        return done(null, user, {message: "Successful Logged In!" });
    })
    .catch(error => { return done(error) });
}
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findByFk(id).then((user) => {
        if(!user){
            done(null, false);
            return;
        }

        done(null, user);
        return;
    })
    .catch(error => done(error, null));
}); 

passport.isAuthenticated = () => 
    (req, res, next) => (req.user ? next() : res.sendStatus(401));


module.exports = passport;