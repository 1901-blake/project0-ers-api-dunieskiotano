import express from 'express';
import { User } from '../model/user';
import { appendFile } from 'fs';
import { UserDAO } from '../DAOs/userDAO';
import { authMiddleware } from '../middleware/authentication-middleware';
import session from 'express-session';
const users = new UserDAO();

let promise1 = Promise.resolve(users.getAllUsers());
export const userRouter = express.Router();

//users - find all
userRouter.all('*', [
    authMiddleware,
    (req, res, next) => {
        //res.json(users);
        next();
    }]);


/**
 * Finds all users'
 * Url: /users
 */
userRouter.get('', (req, res) => {
    users.getAllUsers().then(function (result) {
        res.json(result);
    })
})
/**
 * Finds users by id
 */

userRouter.get('/:id', (req, res) => {
    const idParam = +req.params.id;
    console.log(idParam);
    promise1.then(function (value) {
        value.forEach(element => {
            console.log(element.userId, idParam);
            if (element.userId === idParam) {
                res.status(200).send(element);
            }
        })
        res.status(401).send("Oops! Something went wrongTry again");

    }
    )
})

userRouter.patch('/', async (req, res) => {
    console.log(req.body);
    let user_id = parseInt(req.body.userid);
    let user = await UserDAO.updateUser(req, user_id);    
    res.status(201).send(user);
    // res.end(`Updating User: ${id}`);
});



/*userRouter.patch('', (req, res) => {
    const user_id = req.body.userId;

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
*/
/**
* Creates and saves a user
*/
userRouter.post('/', (req, res) => {
    res.json(users).send(201);
});