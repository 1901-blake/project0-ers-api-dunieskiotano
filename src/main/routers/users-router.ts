import express from 'express';
import { User } from '../model/user';
import { appendFile } from 'fs';
import { UserDAO } from '../DAOs/userDAO';

import session from 'express-session';
import { authMiddleWare } from '../middleware/authentication-middleware';
export const userRouter = express.Router();




//FINDS ALL USERS
userRouter.all('', [
    authMiddleWare('admin', 'finance-manager'),
    (req, res, next) => {
        //res.json(users);
        next();
    }]);


userRouter.get('', [authMiddleWare('finance-manager', 'admin'), async (req, res) => {
    try {
        const users = await UserDAO.getAllUsers();
        res.json(users);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}])

// FINDS ALL USERS
userRouter.get('', [authMiddleWare('finance-manager', 'admin'), async (req, res) => {
    try {
        const user = await UserDAO.getAllUsers()
        if (user && user.length) {
            res.json(user);
        }
        else {
            res.sendStatus(404);
        }
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}])


//FINDS ALL USERS BY ID 
userRouter.get('/:id', [authMiddleWare('finance-manager'),
async (req, res) => {
    const idParam = +req.params.id;
    try {
        const users = await UserDAO.getAllUsersById(idParam);
        if (users) {
            res.json(users);
        }
        else {
            res.sendStatus(404);
        }
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
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
    try {
        let createdUser = await UserDAO.createUsers(reqBody);
        if (createdUser) {
            res.status(201).json(createdUser);
        }
        else {
            res.sendStatus(500);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}]);