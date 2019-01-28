import { RoleDAO } from '../DAOs/roleDAO';
export function authMiddleware(req, res, next) {
    if (req.session.user === undefined) {
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

export function authAdminMiddleware(req, res, next) {
    console.log(req.session.user.role);
    if (req.session.user.role === 1) {
        next()
    } else {
        res.status(401).send('Error message: Access is denied. You may not have the appropriate permissions to perform this operation.');
    }
}

export function authFinancialManagerMiddleware(req, res, next) {
    if (req.session.user.role === 2) {
        next();
    } else {
        res.status(401).send('Error message: Access is denied. You may not have the appropriate permissions to perform this operation.');
    }
}

export function authAdminAndFinancialManagerMiddleware(req, res, next) {
    if (req.session.user.role === 1 || req.session.user.role === 2) {
        next();
    } else {
        res.status(401).send('Error message: Access is denied. You may not have the appropriate permissions to perform this operation.');
    }
}
export function authAssociateMiddleware(req, res, next) {
    if (req.session.user.role === 3) {
        next()
    } else {
        res.status(401).send('Error message: Access is denied. You may not have the appropriate permissions to perform this operation.');
    }
}


