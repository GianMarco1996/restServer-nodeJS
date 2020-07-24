const jwt = require('jsonwebtoken');


//=======================
//  Vereficar token
//=======================
let verificarToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.data;
        next();

    });



};

//=======================
//  Vereficar Admin_Role
//=======================
let verificarAdminRole = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {

        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es Administrador'
            }
        });
    }
};


module.exports = {
    verificarToken,
    verificarAdminRole
}