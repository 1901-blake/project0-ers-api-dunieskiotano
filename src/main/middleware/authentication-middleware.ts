import { RoleDAO } from '../DAOs/roleDAO';
export function authMiddleware(req, res, next) {
    if (req.session.user === undefined) {
        //CHECKS IF USER IS DEFINED
        res.status(401).send('The incoming token has expired');
    } else {
        const user = req.session.user;
        switch (user.role) {
            case 1:
                next();
                break;
            case 2:
                next();
                break;
            case 3:
                next();
                break;
            default:
                res.status(401).send('The incoming token has expired');
        }
    }
}

 //MIDDLEWARE TO GRANT PERMISSIONS TO ADMIN
export function authAdminMiddleware(req, res, next) {
    
    if (req.session.user.role === 1) {
        next()
    } else {
        res.status(401).send('Error message: Access is denied. You may not have the appropriate permissions to perform this operation.');
    }
}

// MIDDLEWARE TO GRANT PERMISSIONS TO FINANCIAL MANAGER
export function authFinancialManagerMiddleware(req, res, next) {
    if (req.session.user.role === 2) {
        next();
    } else {
        res.status(401).send('Error message: Access is denied. You may not have the appropriate permissions to perform this operation.');
    }
}
// MIDDLEWARE TO GRANT PERMISSIONS TO BOTH ADMIN AND FINANCIAL MAMAGER
export function authAdminAndFinancialManagerMiddleware(req, res, next) {
    if (req.session.user.role === 1 || req.session.user.role === 2) {
        next();
    } else {
        res.status(401).send('Error message: Access is denied. You may not have the appropriate permissions to perform this operation.');
    }
}

//MIDDLEWARE TO GRANT PERMISSIONS TO ASSOCIATE
export function authAssociateMiddleware(req, res, next) {
    if (req.session.user.role === req.params.id && req.session.user==='Associate') {
        next()
    } else {
        res.status(401).send('Error message: Access is denied. You may not have the appropriate permissions to perform this operation.');
    }
}


