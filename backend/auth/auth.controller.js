
const passport = require("passport");
const { clientID, clientSec, show } = require("../components");
const userModel = require("../database/db.schema");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(new GoogleStrategy({
    
    clientID : clientID,
    clientSecret : clientSec,
    callbackURL: "/auth/google/callback",
    proxy: true
    }
    ,
    async (accessToken, refreshToken, profile, done) => {
        try{
            let user = await userModel.findOne({email : profile.emails[0].value})

            //date
            const now = new Date();
            const time = now.toLocaleTimeString('en-GB', { hour12: false }); 
            const day = now.toLocaleString('en-US', { weekday: 'long' });
            const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
            const formatted = `${time} ${day} ${date}`;

            if (!user){
                user = await userModel.create({
                    email : profile.emails[0].value,
                    name : profile.displayName,
                    envKey : "default",
                    dateCreated : formatted,
                    lockerRoom : "#101"   
                })
            }

            return done(null, user);
        }
        catch(err){
            show(err)
            return done(err, null);
        }
}))

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.findById(id)
        done(null, user)
    } catch (err) {
        done(err, null)
    }
})

module.exports = passport