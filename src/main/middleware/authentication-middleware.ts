import { RoleDAO } from '../DAOs/roleDAO';
import session from 'express-session';
export function authMiddleware(req, res, next) {
    if (req.session.user.role.role === undefined) {
        //CHECKS IF USER IS DEFINED
        res.status(401).send('The incoming token has expired');
    } else {
        const user = req.session.user.role.role;
        switch (user) {
            case 'admin':
                next();
                break;
            case 'finance-manager':
                next();
                break;
            case 'associate':
                next();
                break;
            default:
                res.status(401).send('The incoming token has expired');
        }
    }
}
export function authMiddleWare(...roles: string[]) {
    return (req, res, next) => {
        const user = req.session.user;
        if (!user) {
            res.sendStatus(401).send('The incoming token has expired');
            return;
        }

        const isPermitted = roles.some(role => {
            if (user.role.role === role) {
                return true;
            } else {
                return false;
            }
        })

        if (isPermitted) {
            next();
        }
        else {
            res.sendStatus(403);
        }
    }
}

/*
//MIDDLEWARE TO GRANT PERMISSIONS TO ADMIN
export function authAdminMiddleware(req, res, next) {

    if (req.session.user.role.role === "admin") {
        next()
    } else {
        res.status(401).send('Error message: Access is denied. You may not have the appropriate permissions to perform this operation.');
    }
}

// MIDDLEWARE TO GRANT PERMISSIONS TO FINANCIAL MANAGER
export function authFinancialManagerMiddleware(req, res, next) {
    if (req.session.user.role.role === 'finance-manager') {
        next();
    } else {
        res.status(401).send('Error message: Access is denied. You may not have the appropriate permissions to perform this operation.');
    }
}
// MIDDLEWARE TO GRANT PERMISSIONS TO BOTH ADMIN AND FINANCIAL MAMAGER
export function authAdminAndFinancialManagerMiddleware(req, res, next) {
    if (req.session.user.role.role === 'admin' || req.session.user.role.role === 'finance-manager') {
        next();
    } else {
        res.status(401).send('Error message: Access is denied. You may not have the appropriate permissions to perform this operation.');
    }
}

export function authAdminAndFinancialManagerAssociateMiddleware(req, res, next) {
    if (req.session.user.role.role === 'admin' || req.session.user.role.role === 'finance-manager' ||
    req.session.user.role.role === 'associate') {
        next();
    } else {
        res.status(401).send('Error message: Access is denied. You may not have the appropriate permissions to perform this operation.');
    }
}

//MIDDLEWARE TO GRANT PERMISSIONS TO ASSOCIATE
export function authAssociateMiddleware(req, res, next) {

}*/
