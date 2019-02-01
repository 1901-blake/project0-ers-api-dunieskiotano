import express from 'express';
import { json } from 'body-parser';
import session from 'express-session';
import { resolvePtr } from 'dns';
//import { users } from '../data';
import { User } from '../model/user';
import { UserDAO } from '../DAOs/userDAO';
import { promises } from 'fs';


export const authRouter = express.Router();
const users = new UserDAO();
let promise1 = Promise.resolve(users.getAllUsers());

//CHECKS FOR CREDENTIALS AND ALLOWS ACCESS IF CREDENTIALS MATCH DATABASE RECORDS
authRouter.post('/login', async (req, res) => {
    let flag = false;
    const result = await users.getAllUsers();
    result.forEach(element => {
        console.log(element.username, element.password);
        if (element.username === req.body.username) {
            if (element.password === req.body.password) {
                req.session.user = element;
                flag = true;
                res.status(200).send("Welcome, " + element.firstName + " " + element.lastName +
                    ". Your're logged in. \nRole: " + element.role.role);
            }
            else {
                flag = true;
                res.status(401).send("Invalid Credentials");
            }
        }

    });
    if (flag) {

    } else {
        res.status(401).send("Invalid Credentials!!");
    }
})


/*promise1.then(function (value) {
    value.forEach(element => {
        if (element.username === req.body.username) {
            if (element.password === req.body.password) {
                req.session.user = element;
                flag = true;
                res.status(200).send("Welcome, " + req.session.user.firstname + " " + req.session.user.lastname +
                    ". Your're logged in. \nRole: " + req.session.user.role);
            }
            else {
                flag = true;
                res.status(401).send("Invalid Credentials");
            }
        }

    });
    if (flag) {

    } else {
        res.status(401).send("Invalid Credentials!!");
    }
})

})

*/
