import passport from "passport";;
import passportLocal from "passport-local";
import { default as User, UserModel } from "../models/user";

const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            console.log('inside config')
            let user = await User.findOne({username: username})
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
              }
            
            user.comparePassword(password, (err: Error, isMatch: boolean) => {
                if(err) {
                    return done(err);
                }

                if(isMatch) {
                    return done(null, user);
                }
                    
                return done(null, false,{ message: 'Incorrect password' });
                
            })
            
        } catch(err) {
            return done(err);
        }
    }
));

passport.serializeUser((user: UserModel, done) => {
    console.info('Inside serializeUser callback');
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    console.info('Inside deserializeUser callback')
    try {

        let user = await User.findById(id);
        done(null ,user);

    } catch(err) {
        console.error(err);
        done(err);
    }
})