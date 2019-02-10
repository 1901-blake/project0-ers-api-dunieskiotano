import express from 'express';
import { json } from 'body-parser';
import session from 'express-session';
import { resolvePtr } from 'dns';
import { UserDAO } from '../DAOs/userDAO';
export const authRouter = express.Router();

//Checks for credentials and allows access if credentials match DB records
authRouter.post('/login', async (req, res) => {
    let flag = false;
    const result = await UserDAO.getAllUsers();
    result.forEach(user => {
        if (user.username === req.body.username) {
            if (user.password === req.body.password) {
                req.session.user = user;
                
                flag = true;
                res.json(user);
                //res.status(200).json(`Welcome, ${user.firstName} ${user.lastName}. Your're logged in as '${user.role.role}'`);
            }
            else {
                flag = false;
                res.status(401).send("Invalid Credentials");
            }
        }
    });
    if (flag) {

    } else {
        res.status(400).send("Invalid Credentials!!");
    }
})
