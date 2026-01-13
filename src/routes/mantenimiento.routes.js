const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const { verificarJWT } = require('../middlewares/validarJWT');
const { verificarRol } = require('../middlewares/verificarRol');
const { checksValidaciones } = require('../middlewares/checkValidations');
const { mantenimeintoCrear, mantenimientoActualizar, obtenerUnoMantenimiento, listarTodosMantenimiento, listarMantenimientoPorMaquina, mantenimeintoEliminar, estadosMantenimiento, mantenimientoCambiarEstado } = require('../controllers/mantenimiento.controller');

router.post('/mantenimiento/crear', [
  verificarRol(['Administrador', 'Jefe']),
  check('periodo')
    .notEmpty().withMessage('El periodo es obligatorio').bail(),
  check('frecuencia')
    .notEmpty().withMessage('La frecuencia es obligatoria').bail(),
  check('genera_incidencia')
    .optional({ checkFalsy: true })
    .isBoolean().withMessage('genera_incidencia debe ser boolean').bail(),
  check('estado_nombre')
    .notEmpty().withMessage('estado_nombre es obligatorio').bail(),
  check('id_maquina')
    .notEmpty().withMessage('id de la maquina es obligatorio').bail()
    .isInt().withMessage('id_maquina debe ser entero').bail(),
  check('id_jefe')
    .optional({ checkFalsy: true })
    .isInt().withMessage('id_jefe debe ser entero').bail(),
  checksValidaciones
], mantenimeintoCrear);

router.put('/mantenimiento/actualizar/:id', [
  verificarRol(['Administrador', 'Jefe']),
  check('id')
    .notEmpty().withMessage('Se necesita el Id del mantenimiento').bail()
    .isInt().withMessage('id debe ser entero').bail(),
  check('periodo')
    .notEmpty().withMessage('El periodo es obligatorio').bail(),
  check('frecuencia')
    .notEmpty().withMessage('La frecuencia es obligatoria').bail(),
  check('genera_incidencia')
    .optional({ checkFalsy: true })
    .isBoolean().withMessage('genera_incidencia debe ser boolean').bail(),
  check('estado_nombre')
    .notEmpty().withMessage('estado_nombre es obligatorio').bail(),
  check('id_maquina')
    .notEmpty().withMessage('id de la maquina es obligatorio').bail()
    .isInt().withMessage('id_maquina debe ser entero').bail(),
  check('id_jefe')
    .optional({ checkFalsy: true })
    .isInt().withMessage('id_jefe debe ser entero').bail(),
  checksValidaciones
], mantenimientoActualizar);

router.get('/mantenimiento/:id', [
  verificarRol(['Administrador', 'Jefe']),
  check('id')
    .notEmpty().withMessage('Se necesita el Id del mantenimiento').bail()
    .isInt().withMessage('id debe ser entero').bail(),
  checksValidaciones
], obtenerUnoMantenimiento);

router.get('/mantenimiento/todos', [
  verificarRol(['Administrador', 'Jefe'])
], listarTodosMantenimiento);

router.get('/mantenimiento/porMaquina/:id', [
  verificarRol(['Administrador', 'Jefe']),
  check('id')
    .notEmpty().withMessage('Se necesita el Id de la maquina').bail()
    .isInt().withMessage('id debe ser entero').bail(),
  checksValidaciones
], listarMantenimientoPorMaquina);

router.delete('/mantenimiento/:id', [
  verificarRol(['Administrador', 'Jefe']),
  check('id')
    .notEmpty().withMessage('Se necesita el Id del mantenimiento').bail()
    .isInt().withMessage('id debe ser entero').bail(),
  checksValidaciones
], mantenimeintoEliminar);

router.get('/mantenimiento/estados', [
  verificarRol(['Administrador', 'Jefe'])
], estadosMantenimiento);

router.put('/mantenimiento/:id/estado', [
  verificarRol(['Administrador', 'Jefe']),
  check('id')
    .notEmpty().withMessage('Se necesita el Id del mantenimiento').bail()
    .isInt().withMessage('id debe ser entero').bail(),
  check('estado_nombre').notEmpty().withMessage('estado_nombre es obligatorio').bail(),
  checksValidaciones
], mantenimientoCambiarEstado);

module.exports = router;