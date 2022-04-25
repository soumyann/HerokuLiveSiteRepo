// import 3rd party modules to support the express server
import createError from 'http-errors';
import express, { NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

// module for connecting to MongoDB
import mongoose from 'mongoose';

// modules for authentication
import session from 'express-session'; // cookie-based authentication
import passport from 'passport'; // authentication middleware
import passportLocal from 'passport-local'; // authentication strategy (username / password)
import flash from 'connect-flash'; // auth messaging and error management

// modules for JWT support
import cors from 'cors';
import passportJWT from 'passport-jwt';

// define JWT aliases
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

// authentication objects
let localStrategy = passportLocal.Strategy; // alias

// import a user Model
import User from '../Models/user';

// App configuration

// Import routers
import indexRouter from '../Routes/index';
import authRouter from '../Routes/auth';
import contactListRouter from '../Routes/contact-list';

const app = express();

// db configuration
import * as DBConfig from './db';
mongoose.connect(DBConfig.RemoteURI);

const db = mongoose.connection; // alias for mongoose.connection
db.on("error", function()
{
  console.error("Connection Error");
});
db.once("open", function()
{
  console.log(`Connected to MongoDB at ${DBConfig.HostName}`);
});

// view engine setup
app.set('views', path.join(__dirname, '../Views'));
app.set('view engine', 'ejs');

// add middleware functions
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../Client')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

// setup cors
app.use(cors());

// setup express session
app.use(session({
  secret: DBConfig.SessionSecret,
  saveUninitialized: false,
  resave: false
}));

// initialize flash middleware
app.use(flash());

// initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());

// implement an Auth Strategy
passport.use(User.createStrategy());

// serialize and deserialize user data
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// JWT Options
let jwtOptions = 
{
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: DBConfig.SessionSecret
}

// JWT Strategy configuration
let strategy = new JWTStrategy(jwtOptions, function(jwt_payload, done)
{
  User.findById(jwt_payload.id)
    .then(user => {
      return done(null, user);
    })
    .catch(err => {
      return done(err, false);
    });
});

passport.use(strategy);

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', contactListRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) 
{
  next(createError(404));
});

// error handler
app.use(function(err: createError.HttpError, req: express.Request, res: express.Response, next: NextFunction) 
{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  let message = err.message;
  let error = err;

  // render the error page
  res.status(err.status || 500);
  res.render('error', {message: message, error: error, title: '', page: '', displayName: ''});
});

export default app;
