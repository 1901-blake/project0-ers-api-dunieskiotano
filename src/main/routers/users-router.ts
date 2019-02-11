import express from 'express';
import { appendFile } from 'fs';
import { UserDAO } from '../DAOs/userDAO';
import session from 'express-session';
import { authMiddleWare } from '../security/authentication-middleware';
export const userRouter = express.Router();
import { User } from '../models/user'
import { Role } from '../models/role'

//middleware to give way if all credentials are correct
// userRouter.all('', [
//     authMiddleWare('admin', 'finance-manager'),
//     (req, res, next) => {
//         next();
//     }]);

//Finds all users -- Roles allowed: Admin & Finance Manager
userRouter.get('', [authMiddleWare('admin', 'finance-manager'), async (req, res) => {
    try {
        const users = await UserDAO.getAllUsers()
        console.log(users);
        if (users && users.length) {//checks for an empty array
            res.json(users);//if array users is not empty, json is sent with the object
        } else {
            res.sendStatus(404);//if it is, message Not Found is displayed
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);//If there is an internal server error, message server will be displayed
    }
}])

//Finds users by ID -- Roles allowed: Finance Manager only!
userRouter.get('/:id',
    async (req, res) => {
        const idParam = +req.params.id;
        const user_id = req.session.user.userid;
        const role = req.session.user.role.role;
        try {
            const users = await UserDAO.getAllUsersById(idParam)
            if (user_id === +idParam || role !== 'associate') {
                if (users) {
                    res.json(users);//if there is no emptty array, then the object is sent
                } else {
                    res.sendStatus(404);//else a message of not found will be displayed
                }
            } else {
                res.sendStatus(401);
            }
        }

        catch (err) {
            console.log(err);
            res.sendStatus(500);//if there is an internal server error, the appropiate message will be displayed
        }
    })


//Updates user
userRouter.patch('/', [authMiddleWare('admin'), async (req, res) => {

    try {
        console.log(req.body);
        let u = new User(
            req.body.userid,
            req.body.username,
            req.body.password,
            req.body.firstname,
            req.body.lastname,
            req.body.email,
            new Role(
                req.body.roleid,
                req.body.role
            )
        );
        let user = await UserDAO.updateUser(u);//the request body is passed to the method updateUser in the UserDAO class
        if (user) {
            console.log(200);
            res.status(200).send(user);//if everything is ok, object user is sent and messaje Ok is displayed
        }
        else {
            console.log(201)
            res.status(401).send("Not Updated");
        }
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);//if there is any internal server error, the appropiate message will be displayed
    }

}]);

//Creates user --- Roles allowed: Admin && Finance Manager
userRouter.post('', [authMiddleWare('admin', 'finance-manager'), async (req, res) => {

    try {
        let u = new User(
            req.body.userid,
            req.body.username,
            req.body.password,
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.role
        )

        let createdUser = await UserDAO.createUsers(u);//request body is passed to method createUsers from UserDAO class
        if (createdUser) {//checks if the user is created successfully
            res.status(201).json(createdUser);//if ok, message Created will be displayed.
        }
        else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);

    }
}]);

userRouter.delete('/:id', [authMiddleWare('admin'), async (req, res) => {
    try {

        let idParams = +req.params.id;
        let userDeleted=UserDAO.deleteUser(idParams);
        res.status(200).json(userDeleted);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}])