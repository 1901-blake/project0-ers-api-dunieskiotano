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
let promise1=Promise.resolve(users.getAllUsers());

authRouter.post('/login', (req, res) =>{
    let u=[];
    let flag = false;
    promise1.then(function (value){
        value.forEach(element => {
            if(element.username===req.body.username){
                if(element.password===req.body.password){
                    console.log(element.username, req.body.username);
                    req.session.user = element;
                    flag = true;
                    res.status(200).send("You're logged in");
                }
                else{
                    flag=true;
                    res.status(401).send("Invalid Credentials");
                }
            }
            
        });
        if(flag){

        }else{
            res.status(401).send("Invalid Credentials!!");
        }
    })
    
})
    
    
       

      

        //find(elem => {

        // return (req.body.username === elem.username);
        // });

        //if (user) {
        //  if (req.body.password === user.) {
        //    req.session.user = user;
        //   res.json(user);

        //}
        // }

        // res.status(400).json({ message: "Invalid Credentials" });



        /*if (req.body.username === "dunieski" && req.body.password === 'password') {
            const user = {
                username: req.body.username,
                role: 'admin'
            };
    
            
            res.json(user);
        }
    
    
        else if (req.body.username === 'yanet' && req.body.password === 'password') {
            req.body.session = 'associate';
            const user = {
                username: req.body.password,
                role: 'associate'
            };
            
            res.json(user);
        }
        else {
            res.sendStatus(401);
            res.send('There has been a problem with your login sessions')
        }
    */
        //authRouter.get('/info', (req, res) => {
       //     res.json(req.session.user);
        //})

   // }
   // );
    