import { RoleDAO } from '../DAOs/roleDAO';
import session from 'express-session';
export function authMiddleware(req, res, next) {
    console.log('AAAAAAAA',req.session.user.role);
    if (req.session.user.role=== undefined) {
        //CHECKS IF USER IS DEFINED
        res.status(401).send('The incoming token has expired');
    } else {
        const user = req.session.user.role;
        console.log('AAAAAAAA',req.session.user.role);
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

 //MIDDLEWARE TO GRANT PERMISSIONS TO ADMIN
export function authAdminMiddleware(req, res, next) {
    
    if (req.session.user.role === "admin") {
        next()
    } else {
        res.status(401).send('Error message: Access is denied. You may not have the appropriate permissions to perform this operation.');
    }
}

// MIDDLEWARE TO GRANT PERMISSIONS TO FINANCIAL MANAGER
export function authFinancialManagerMiddleware(req, res, next) {
    if (req.session.user.role === 'finance-manager') {
        next();
    } else {
        res.status(401).send('Error message: Access is denied. You may not have the appropriate permissions to perform this operation.');
    }
}
// MIDDLEWARE TO GRANT PERMISSIONS TO BOTH ADMIN AND FINANCIAL MAMAGER
export function authAdminAndFinancialManagerMiddleware(req, res, next) {
    if (req.session.user.role === 'admin' || req.session.user.role === 'finance-manager') {
        next();
    } else {
        res.status(401).send('Error message: Access is denied. You may not have the appropriate permissions to perform this operation.');
    }
}

//MIDDLEWARE TO GRANT PERMISSIONS TO ASSOCIATE
export function authAssociateMiddleware(req, res, next) {
    if (req.session.user.role === req.params.id && req.session.user==='associate') {
        next()
    } else {
        res.status(401).send('Error message: Access is denied. You may not have the appropriate permissions to perform this operation.');
    }
}


