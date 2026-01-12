const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const { verificarJWT } = require('../middlewares/validarJWT');
const { verificarRol } = require('../middlewares/verificarRol');
const { checksValidaciones } = require('../middlewares/checkValidations');
const { maquinaCrear, maquinaActualizar, maquinaEliminar, obtenerUnaMaquina, listarTodasMaquinas, listarMaquinasPorUsuario, listarManquinasPorEstado, estadosMaquina, cambiarMaquinaEstado } = require('../controllers/maquina.controller');

// Crear máquina
router.post('/maquina/crear', [
  verificarRol(['Administrador']),
  check('nombre')
    .notEmpty().withMessage('El nombre es obligatorio').bail()
    .matches(/^[a-zA-Z0-9\s-]+$/)
    .withMessage('El nombre solo puede contener letras y números').bail(),
  check('modelo')
    .notEmpty().withMessage('El modelo es obligatorio').bail()
    .matches(/^[a-zA-Z0-9\s-]+$/)
    .withMessage('El nombre solo puede contener letras y números').bail(),
  check('prioridad_cliente')
    .optional({ checkFalsy: true }),
  check('id_usuario')
    .notEmpty().withMessage('El usuario creador es obligatorio').bail()
    .isInt().withMessage('id_usuario debe ser entero').bail(),
  checksValidaciones
], maquinaCrear);

// Actualizar máquina
router.put('/maquina/actualizar/:id', [
  verificarRol(['Administrador']),
  check('id')
    .notEmpty().withMessage('Se necesita el Id de la maquina').bail()
    .isInt().withMessage('id debe ser entero').bail(),
  check('nombre')
    .notEmpty().withMessage('El nombre es obligatorio').bail()
    .matches(/^[a-zA-Z0-9\s-]+$/)
    .withMessage('El nombre solo puede contener letras y números').bail(),
  check('modelo')
    .notEmpty().withMessage('El modelo es obligatorio').bail()
    .matches(/^[a-zA-Z0-9\s-]+$/)
    .withMessage('El nombre solo puede contener letras y números').bail(),
  check('estado_nombre')
    .notEmpty().withMessage('estado_nombre es obligatorio').bail(),
  check('prioridad_cliente')
    .optional({ checkFalsy: true }),
  check('id_usuario')
    .optional({ checkFalsy: true })
    .isInt().withMessage('id_usuario debe ser entero').bail(),
  checksValidaciones
], maquinaActualizar);

// Obtener una máquina
router.get('/maquina/maquina/:id', [
  verificarRol(['Administrador', 'Jefe','Cliente']),
  check('id')
    .notEmpty().withMessage('Se necesita el Id de la maquina').bail()
    .isInt().withMessage('id debe ser entero').bail(),
  checksValidaciones
], obtenerUnaMaquina);

// Listar todas las máquinas
router.get('/maquina/todas', [
  verificarRol(['Administrador', 'Jefe', 'Tecnico'])
], listarTodasMaquinas);

// Listar máquinas por usuario
router.get('/maquina/porUsuario/:id', [
  verificarRol(['Administrador', 'Cliente']),
  check('id')
    .notEmpty().withMessage('Se necesita el Id de usuario').bail()
    .isInt().withMessage('id debe ser entero').bail(),
  checksValidaciones
], listarMaquinasPorUsuario);

// Listar máquinas por estado
router.get('/maquina/porEstado/:nombre', [
  verificarRol(['Administrador', 'Jefe']),
  check('nombre').notEmpty().withMessage('nombre del estado es obligatorio').bail(),
  checksValidaciones
], listarManquinasPorEstado);

// Eliminar máquina
router.delete('/maquina/eliminar/:id', [
  verificarRol(['Administrador']),
  check('id')
    .notEmpty().withMessage('Se necesita el Id de la maquina').bail()
    .isInt().withMessage('id debe ser entero').bail(),
  checksValidaciones
], maquinaEliminar);

// Estados de máquina
router.get('/maquina/estados', [
  verificarRol(['Administrador', 'Jefe'])
], estadosMaquina);

// Cambiar estado de máquina
router.put('/maquina/:id/estado', [
  verificarRol(['Administrador', 'Jefe', 'Cliente']),
  check('id')
    .notEmpty().withMessage('Se necesita el Id de la maquina').bail()
    .isInt().withMessage('id debe ser entero').bail(),
  check('estado_nombre').notEmpty().withMessage('estado_nombre es obligatorio').bail(),
  checksValidaciones
], cambiarMaquinaEstado);

module.exports = router;