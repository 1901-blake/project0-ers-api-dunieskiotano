import express from 'express';
import { User } from '../model/user';
import { appendFile } from 'fs';
import { UserDAO } from '../DAOs/userDAO';
import {
    authMiddleware, authAdminMiddleware, authAssociateMiddleware,
    authAdminAndFinancialManagerMiddleware, authFinancialManagerMiddleware

} from '../middleware/authentication-middleware';
import session from 'express-session';
const users = new UserDAO();

let promise1 = Promise.resolve(users.getAllUsers());
export const userRouter = express.Router();

//FINDS ALL USERS
userRouter.all('', [
    authMiddleware,
    (req, res, next) => {
        //res.json(users);
        next();
    }]);



// FINDS ALL USERS
userRouter.get('', [authAdminAndFinancialManagerMiddleware, (req, res) => {
    users.getAllUsers().then(function (result) {
        res.json(result);
    })
}])


//FINDS ALL USERS BY ID 
userRouter.get('/:id', [authAdminAndFinancialManagerMiddleware,
    (req, res) => {
        const idParam = +req.params.id;
        console.log('PARAMETER', idParam);
        promise1.then(function (result) {
            result.map(elem => {
                if (elem.userid === idParam) {
                    res.json(elem)
                }
            })
            //PRINTS A MESSAGE IF USER IS NOT FOUND
            res.status(401).send("Oops! Something went wrong. It seems that the user you're trying to find does not exist");

        }
        )
    }])


//UPDATES USERS 
userRouter.patch('/', [authFinancialManagerMiddleware, async (req, res) => {
    let user = await UserDAO.updateUser(req.body);
    res.status(201).send(user);

}]);


//CREATES A USER  --- ADMIN AND FINANCIAL MANAGER
userRouter.post('', [authAdminAndFinancialManagerMiddleware, (req, res) => {
    let reqBody = req.body;
    users.addUsers(
        reqBody.username,
        reqBody.password,
        reqBody.firstName,
        reqBody.lastName,
        reqBody.email,
        reqBody.role)

    res.status(200).send("Success!! User has been created!!! Good job!");
}]);