function requireAuth(role) {
    return (req, res, next) => {
        console.log('sesion:', req.session);

        if (!req.session.user) {
            return res.redirect('/html/users/login.html'); // si no hay sesión, vuelve al login
        }
        if (role && req.session.user.role !== role) {
            return res.status(403).send('Acceso denegado');
        }
        next();
    };
}

export default requireAuth;