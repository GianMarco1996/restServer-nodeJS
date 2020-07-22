const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es requerido']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

//El metodo toJSON en un esquema siempre se llama cuando se intenta imprimir
//No usamos un array function poq' necesitamos el this
usuarioSchema.methods.toJSON = function () {
    //user almacena lo que tenemos en el esquema
    let user = this;
    //Se toma el objeto de ese usuario
    let userObject = user.toObject();
    //Se quita el password del objeto
    delete userObject.password;
    //Retorna el objeto sin el password
    return userObject;
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico!' })

module.exports = mongoose.model('Usuario', usuarioSchema);