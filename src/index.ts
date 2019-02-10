import { NextFunction } from 'express';
import express from 'express';
import bodyParse from 'body-parser';
import { userRouter } from './main/routers/users-router';
import session from 'express-session';
import { authRouter } from './main/routers/authentication-router';
import { reimbursementRouter } from './main/routers/reimbursement-router';

//////////////////////
const app = express();
app.use('/', express.static(__dirname + '/main/public/'));
app.use('/src/main/assets/',express.static(__dirname + '/main/assets/'));
//BODY-PARSER MIDDLEWARE IS CREATED HERE TO PARSE JSON INTO JS
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));


//CREATES LOGIN MIDDLEWARE HERE
app.use((req, res, next) => {
  console.log(`request was made with url: ${req.path}
    and method: ${req.method}`);

  next(); // will pass the request on to search for the next piece of middleware
});

// SET UP EXPRESS TO ATTACH SESSIONS
const sess = {
  secret: 'created',
  cookie: { secure: false },
  resave: false,
  saveUninitialized: false
}

app.use(session(sess));

app.use((req, resp, next) => {
  (process.env.MOVIE_API_STAGE === 'prod')
    ? resp.header('Access-Control-Allow-Origin', process.env.DEMO_APP_URL)
    : resp.header('Access-Control-Allow-Origin', 'http://localhost:5500');
  resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  resp.header('Access-Control-Allow-Credentials', 'true');
  resp.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

///ALLOW CROSS ORIGINS
/*app.use((req, resp, next) => {
 (process.env.MOVIE_API_STAGE === 'prod')
   ? resp.header('Access-Control-Allow-Origin', process.env.DEMO_APP_URL)
   : resp.header('Access-Control-Allow-Origin', 'http://localhost:5500',);
 resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
 resp.header('Access-Control-Allow-Credentials', 'true');
 next();
});*/

//AUTH MIDDLEWARE
app.use('/auth', authRouter);
//USER_ROUTER MIDDLE WARE
app.use('/users', userRouter);
//REIMBURSEMENTS_ROUTER
app.use('/reimbursements/', reimbursementRouter);


app.listen(3200);
//PRINTS CONFIRMATION THAT HAS SESSION STARTED SUCCESSFULLY
console.log("Session started successfully");


