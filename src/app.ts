import express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/routes";
import mongoose from "mongoose";
import session from "express-session";
import uuid from "uuid/v4";
import MongoStoreFactory from "connect-mongo";
// import * as passportConfig from "./config/passport";
import "./config/passport";
import passport from "passport";

class App {
    public app: express.Application;
    public routes: Routes = new Routes();
    private mongoURL: string = 'mongodb://localhost/testDB';

    constructor() {
        this.app = express();
        this.config();
        this.mongoSetup();                                                                                                                                                                                                              
        this.sessionSetup();
        this.passportSetup();
        this.routes.routes(this.app);
    }

    private passportSetup(): void {
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }

    private sessionSetup(): void {
        const MongoStore = MongoStoreFactory(session);
        
        this.app.use(session({
            genid: (req) => {
                console.log('Inside session middleware');
                console.log(req.sessionID);
                return uuid();
            }, 
            secret: 'greenlinessuck',
            store: new MongoStore({ mongooseConnection: mongoose.connection}),
            resave: false,
            saveUninitialized: true
        }))
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoURL, { useNewUrlParser: true})
            .then(() => {
                console.log('Connected to Mongo')
            })
            .catch(err => {
                console.error(err);
            }) 
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());

        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));

    }
}

export default new App().app;