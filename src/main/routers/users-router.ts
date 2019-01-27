import express from 'express';
import { User } from '../model/user';
import { appendFile } from 'fs';
import { users } from '../data';
import { authMiddleware } from '../middleware/authentication-middleware';
import session from 'express-session';


export const userRouter = express.Router();


//users - find all
userRouter.all('*', [
    authMiddleware,
    (req, res) => {
        res.json(users);
    }]);


/**
 * Finds all users'
 * Url: /users
 */
userRouter.get('', (req, res) => {
    res.json(users);
    console.log(users);
});

/**
 * Finds users by id
 */

userRouter.get('/:id', (req, res) => {
    const idParam = req.params.id;
    const user = users.find(ele => ele.userId === parseInt(idParam));
    res.json(user);
});




/**
 * Update user
 */

userRouter.patch('', (req, res) => {
    const user = users.find(ele => ele.userId === parseInt(req.body.userId));//returns true or false if the the ids match
    if (user) {
        const userProperty: string[] = Object.keys(user);//here we create a string of user properties
        userProperty.forEach(prop => {
            if (req.body[prop]) {
                user[prop] = req.body[prop];
            }
        })
        //
        res.send(user);
    }


});

/**
* Creates and saves a user
*/
userRouter.post('/', (req, res) => {
    users.push(req.body);
    res.status(201).send(req.body);
});