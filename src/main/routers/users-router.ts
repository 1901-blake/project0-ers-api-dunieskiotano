import express from 'express';
import { User } from '../model/user';
import { appendFile } from 'fs';
import { UserDAO } from '../DAOs/userDAO';
import {
    authMiddleware, authAdminMiddleware, authAssociateMiddleware,
    authAdminAndFinancialManagerMiddleware
  
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
userRouter.get('', [authAdminAndFinancialManagerMiddleware,(req, res) => {
    users.getAllUsers().then(function (result) {
        res.json(result);
    })
}])


//FINDS ALL USERS BY ID 
userRouter.get('/:id', [authAdminAndFinancialManagerMiddleware,
   (req, res) => {
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
    }])


    //UPDATES USERS 
userRouter.patch('/', [authAdminMiddleware, async (req, res) => {
    let user = await UserDAO.updateUser(req.body);
    res.status(201).send(user);

}]);


/*userRouter.post('/', (req, res) => {
    res.json(users).send(201);
});*/