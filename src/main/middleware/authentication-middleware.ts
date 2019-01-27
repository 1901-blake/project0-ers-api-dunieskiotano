export function authMiddleware(req, res, next) {
    const user = req.session.user;
    switch (user.role.role) {
        case 'admin':
            next();
            break;
        case 'financial-manager':
            next();
            break;
        case 'associate':
            next();
            break;
        default:
            res.sendStatus(401).json({ message: 'The incoming token has expired' });

    }

}


