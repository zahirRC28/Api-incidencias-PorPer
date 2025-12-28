const express = require('express');
const router = express.Router();
const { crearUsuario, actualizarUsuario, obtenerTodosUsers, obtenerUser, todosRoles, eliminarUser } = require('../controllers/user.controller');
const { verificarRol } = require("../middlewares/verificarRol");
const { verificarJWT } = require('../middlewares/validarJWT');
const { checksValidaciones } = require('../middlewares/checkValidations');
const { check } = require('express-validator');

router.post('/user/crear',[
    check('nombre')
        .notEmpty().withMessage('El nombre no puede estar vacio')
        .bail()
        .trim()
        .isLength({ min: 2 }).withMessage('El nombre es demasiado corto')
        .bail()
    ,check('correo')
        .notEmpty().withMessage("Tienes que escribir un correo").bail()
        .trim()
        .normalizeEmail()
        .isEmail().withMessage("Escriba un correo electrónico válido.").bail()
        .isLength({ min: 5, max: 50 }).withMessage("El correo no tiene logitud suficiente").bail()
    ,check('contrasenia')
        .notEmpty().withMessage("Tienes que escribir una contraseña").bail()
        .isStrongPassword({ minLength: 6 }).withMessage("La contraseña debe tener entre 6 y 10 caracteres, contener por lo menos una minúscula, una mayúscula, un número y un símbolo.").bail()
    ,checksValidaciones
    ,verificarRol(['Administrador'])
],crearUsuario);

router.put('/user/actualizar/:id',[
    check('id')
        .notEmpty().withMessage('Se necesita el Id de usuario')
        .bail()
        .trim()
        .isInt().withMessage('El id de usuario tiene que ser un numero entero')
        .bail()
    ,check('nombre')
        .notEmpty().withMessage('El nombre no puede estar vacio')
        .bail()
        .trim()
        .isLength({ min: 2 }).withMessage('El nombre es demasiado corto')
        .bail()
    ,check('correo')
        .notEmpty().withMessage("Tienes que escribir un correo").bail()
        .trim()
        .normalizeEmail()
        .isEmail().withMessage("Escriba un correo electrónico válido.").bail()
        .isLength({ min: 5, max: 50 }).withMessage("El correo no tiene logitud suficiente").bail()
    ,check('contrasenia')
        .optional({ checkFalsy: true })
        .isStrongPassword({ minLength: 6 }).withMessage("La contraseña debe tener entre 6 y 10 caracteres, contener por lo menos una minúscula, una mayúscula, un número y un símbolo.").bail()
    ,checksValidaciones
    ,verificarRol(['Administrador'])
],actualizarUsuario);

router.delete('/user/eliminar/:id',[
    check('id')
        .notEmpty().withMessage('Se necesita el Id de usuario')
        .bail()
        .trim()
        .isInt().withMessage('El id de usuario tiene que ser un numero entero')
        .bail()
    ,check('correo')
        .notEmpty().withMessage("Tienes que escribir un correo").bail()
        .trim()
        .normalizeEmail()
        .isEmail().withMessage("Escriba un correo electrónico válido.").bail()
        .isLength({ min: 5, max: 50 }).withMessage("El correo no tiene logitud suficiente").bail()
    ,checksValidaciones
    ,verificarRol(['Administrador'])
],eliminarUser);

router.get('/user/usuario/:id',[
    check('id')
        .notEmpty().withMessage('Se necesita el Id de usuario')
        .bail()
        .trim()
        .isInt().withMessage('El id de usuario tiene que ser un numero entero')
        .bail()
    ,checksValidaciones
    ,verificarJWT
], obtenerUser);
router.get('/user/todosUsuarios/:id',[
    check('id')
        .notEmpty().withMessage('Se necesita el Id de usuario')
        .bail()
        .trim()
        .isInt().withMessage('El id de usuario tiene que ser un numero entero')
        .bail()
    ,checksValidaciones
    ,verificarRol(['Administrador'])
],obtenerTodosUsers);
router.get('/user/todosRoles',verificarRol(['Administrador']),todosRoles);

module.exports = router;