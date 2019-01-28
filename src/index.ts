import { NextFunction } from 'express';
import express from 'express';
import bodyParse from 'body-parser';
import { userRouter } from './main/routers/users-router';
import session from 'express-session';
import { authRouter } from './main/routers/authentication-router';
import { reimbursementRouter } from './main/routers/reimbursement-router';
import { SSL_OP_NO_SSLv2 } from 'constants';
import {UserDAO} from './main/DAOs/userDAO';
import {RoleDAO} from './main/DAOs/roleDAO';
import {ReimbursementDAO} from './main/DAOs/reimbursementDAO';
import {ReimbursementTypeDAO} from './main/DAOs/reimbursementtypeDAO';
import {ReimbursementStatusDAO} from './main/DAOs/reimbursementestatusDAO';
/////////////////////////
let userDao= new UserDAO();

let reimbursementDao= new ReimbursementDAO();
//reimbursementDao.addReimbursements(3, 150.80, 1546300800, 0,'Beach', 2, 3, 2);
//userDao.getAllUsers().then(artArray => console.log(artArray));
////////////////////////////////

//userDao.getAllUsersById(2);

////////////////////////
//let roleDao= new RoleDAO();
//roleDao.getAllRoles().then(artArray => console.log(artArray));
////////////////////////////////
////////////////////////

//reimbursementDao.getAllReimbursements().then(artArray => console.log(artArray));
////////////////////////////////
//let reimbursementTypeDao= new ReimbursementTypeDAO();
//reimbursementTypeDao.getAllReimbursementTypes().then(artArray => console.log(artArray));
////////////////////////////////
////////////////////////////////
//let reimbursementStatusDao= new ReimbursementStatusDAO();
//reimbursementStatusDao.getAllReimbursementStatuses().then(artArray => console.log(artArray));
////////////////////////////////
//reimbursementStatusDao.getAllReimbursementsByStatus(2);



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
    saveUninitialized: false
}

app.use(session(sess));

app.use('/auth', authRouter);
app.use('/users', userRouter);//userRouter middleware is created here
app.use('/reimbursements/', reimbursementRouter);



app.listen(3200);
console.log("Session started successfully");
