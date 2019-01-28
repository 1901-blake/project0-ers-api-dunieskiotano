export function authMiddleware(req, res, next) {
    if(req.session.user === undefined){
        res.status(401).send('The incoming token has expired');
    } else{
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


