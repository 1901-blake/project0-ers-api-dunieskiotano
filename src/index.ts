import { NextFunction } from 'express';
import express from 'express';
import bodyParse from 'body-parser';
import { userRouter } from './main/routers/users-router';
import session from 'express-session';
import { authRouter } from './main/routers/authentication-router';
import { reimbursementRouter } from './main/routers/reimbursement-router';
import { SSL_OP_NO_SSLv2 } from 'constants';
import {UserDAO} from './main/DAOs/userDAO';


let userDao= new UserDAO();

userDao.getAllUsers().then(artArray => console.log(artArray));

console.log('hello world');

const app = express();

app.use(bodyParse.json())//body-parser middleware is created here
app.use(bodyParse.urlencoded({ extended: true }));

//creates login middleware
app.use((req, res, next) => {
    console.log(`request was made with url: ${req.path}
    and method: ${req.method}`);
    next(); // will pass the request on to search for the next piece of middleware
});

// set up express to attach sessions
const sess = {
    secret: 'created',
    cookie: { secure: false },
    resave: false,
    saveUnitialized: false
}

app.use(session(sess));

app.use('/auth', authRouter);
app.use('/users', userRouter);//userRouter middleware is created here
app.use('/reimbursements/', reimbursementRouter);



app.listen(3200);
console.log("Session started successfully");

