import session from 'express-session';

//Middleware created to grant permissions based on roles and business rules
export function authMiddleWare(...roles: string[]) {
    
    return (req, res, next) => {
        const user = req.session.user;
        
        if (!user) {
            
            res.sendStatus(401);
            //res.send('The incoming token has expired');
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
            return;
        }
        else {
            
            res.sendStatus(401);
        }
    }
}
