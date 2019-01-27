import express from 'express';
import { json } from 'body-parser';
import session from 'express-session';
import { resolvePtr } from 'dns';
import { users } from '../data';
import { User } from '../model/user';


export const authRouter = express.Router();

authRouter.post('/login', (req, res) => {
    const user: User = users.find(elem => {

        return (req.body.username === elem.username);
    });

    if (user) {
        if (req.body.password === user.password) {
            req.session.user = user;
            res.json(user);

        }
    }

    res.status(400).json({ message: "Invalid Credentials" });
    


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
    authRouter.get('/info', (req, res) => {
        res.json(req.session.user);
    })

}
);
console.log(users);