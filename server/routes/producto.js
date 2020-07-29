const express = require('express');

const Producto = require('../models/producto');

const _ = require('underscore');

const { verificarToken } = require('../middlewares/autenticacion');

const app = express();


app.get('/producto', verificarToken, (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Producto.find({ disponible: true })
        .skip(desde)
        .limit(limite)
        .populate('categoria usuario', 'descripcion nombre email')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            Producto.count({ disponible: true }, (err, contador) => {
                res.json({
                    ok: true,
                    productos,
                    total: contador
                });
            });
        });
});

app.get('/producto/:id', verificarToken, (req, res) => {
    let id = req.params.id;

    Producto.findById(id)
        .populate('categoria usuario', 'descripcion nombre email')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productoDB.disponible) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: `El ID: ${id} no existe`
                    }
                });
            }

            res.json({
                ok: true,
                producto: productoDB
            });
        });
});

app.get('/producto/buscar/:termino', verificarToken, (req, res) => {
    let termino = req.params.termino;
    let regExp = new RegExp(termino, 'i');

    Producto.find({ nombre: regExp })
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            });
        });
})

app.post('/producto', verificarToken, (req, res) => {
    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });
    });
});

app.put('/producto/:id', verificarToken, (req, res) => {
    let id = req.params.id;

    let body = _.pick(req.body, ['nombre', 'precioUni', 'descripcion']);

    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB.disponible) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `El producto con el ID ${id} no existe`
                }
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });
    })
});

app.delete('/producto/:id', verificarToken, (req, res) => {
    let id = req.params.id;

    let estActualizado = {
        disponible: false
    };

    Producto.findByIdAndUpdate(id, estActualizado, { new: true }, (err, productoBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            message: `El producto con ID: ${id} se elimino`,
            producto: productoBorrado
        })
    });
});


module.exports = app;