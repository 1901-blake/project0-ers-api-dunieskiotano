import express from 'express';
import { User } from '../model/user';
import { appendFile } from 'fs';
import { UserDAO } from '../DAOs/userDAO';
import { authMiddleware } from '../middleware/authentication-middleware';
import session from 'express-session';
import { authMiddleWare } from '../middleware/authentication-middleware';
const users = new UserDAO();


let promise1 = Promise.resolve(UserDAO.getAllUsers());
export const userRouter = express.Router();

//FINDS ALL USERS
userRouter.all('', [
    authMiddleware,
    (req, res, next) => {
        //res.json(users);
        next();
    }]);


userRouter.get('', [authMiddleWare('admin', 'finance-manager'), (req, res) => {
    UserDAO.getAllUsers().then(function (result) {
        res.json(result);
    })
}])

/*// FINDS ALL USERS
userRouter.get('', [authMiddleware('finance-manager', 'admin'), (req, res) => {
    users.getAllUsers().then(function (result) {
        res.json(result);
    })
}])
*/

//FINDS ALL USERS BY ID 
userRouter.get('/:id', [authMiddleWare('finance-manager'),
async (req, res) => {
    const idParam = +req.params.id;
    try {
        const users = await UserDAO.getAllUsersById(idParam);
        res.json(users);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
    //console.log('PARAMETER', idParam);
    //promise1.then(function (result) {
    // result.map(elem => {
    //if (elem.userid === idParam) {
    //    res.json(elem)
    // }
    // })
    //PRINTS A MESSAGE IF USER IS NOT FOUND
    // res.status(401).send("Oops! Something went wrong. It seems that the user you're trying to find does not exist");

    // }
    //)
}])


//UPDATES USERS 
userRouter.patch('/', [authMiddleWare('admin'), async (req, res) => {
    try {
        let user = await UserDAO.updateUser(req.body);
        res.status(201).send(user);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

}]);


//CREATES A USER  --- ADMIN AND FINANCIAL MANAGER
userRouter.post('', [authMiddleWare('admin', 'finance-manager'), async (req, res) => {
    let reqBody = req.body;
    let createdUser = await users.addUsers(reqBody);
    if (createdUser) {
        res.status(201).json(createdUser);
    }
    else {
        res.sendStatus(500);
    }
}]);