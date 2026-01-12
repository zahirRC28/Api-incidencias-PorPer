const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const { verificarJWT } = require('../middlewares/validarJWT');
const { verificarRol } = require('../middlewares/verificarRol');
const { checksValidaciones } = require('../middlewares/checkValidations');
const { informeCrear, informeActualizar, obtenerUnoInforme, listarInformePorIncidencia, listarInformePorTecnico, listarTodosInformes, informeEliminar, generarPdfPorIncidencia } = require('../controllers/informe.controller');

// Crear informe
router.post('/informe/crear', [
  verificarRol(['Administrador','Jefe','Tecnico']),
  check('texto')
    .notEmpty().withMessage('El texto es obligatorio').bail(),
  check('tipo')
    .notEmpty().withMessage('El tipo es obligatorio').bail(),
  check('id_incidencia')
    .notEmpty().withMessage('id de la incidencia es obligatorio').bail()
    .isInt().withMessage('id_incidencia debe ser entero').bail(),
  check('id_tecnico')
    .optional({ checkFalsy: true })
    .isInt().withMessage('id_tecnico debe ser entero').bail(),
  checksValidaciones
], informeCrear);

// Actualizar informe
router.put('/informe/actualizar/:id', [
  verificarRol(['Administrador','Jefe','Tecnico']),
  check('id')
    .notEmpty().withMessage('Se necesita el Id del informe').bail()
    .isInt().withMessage('id debe ser entero').bail(),
  check('texto')
    .notEmpty().withMessage('El texto es obligatorio').bail(),
  check('tipo')
    .notEmpty().withMessage('El tipo es obligatorio').bail(),
  check('id_incidencia')
    .notEmpty().withMessage('id de la incidencia es obligatorio').bail()
    .isInt().withMessage('id_incidencia debe ser entero').bail(),
  check('id_tecnico')
    .optional({ checkFalsy: true })
    .isInt().withMessage('id_tecnico debe ser entero').bail(),
  checksValidaciones
], informeActualizar);

// Obtener informe por id
router.get('/informe/:id', [
  verificarRol(['Administrador','Jefe','Tecnico']),
  check('id')
    .notEmpty().withMessage('Se necesita el Id del informe').bail()
    .isInt().withMessage('id debe ser entero').bail(),
  checksValidaciones
], obtenerUnoInforme);

// Listar informes por incidencia
router.get('/informe/por-incidencia/:id', [
  verificarRol(['Administrador','Jefe','Tecnico']),
  check('id')
    .notEmpty().withMessage('Se necesita el Id de la incidencia').bail()
    .isInt().withMessage('id debe ser entero').bail(),
  checksValidaciones
], listarInformePorIncidencia);

// Generar PDF con incidencia + máquina + informes
router.get('/informe/por-incidencia/:id/pdf', [
  verificarRol(['Administrador','Jefe','Tecnico']),
  check('id')
    .notEmpty().withMessage('Se necesita el Id de la incidencia').bail()
    .isInt().withMessage('id debe ser entero').bail(),
  checksValidaciones
], generarPdfPorIncidencia);

// Listar informes por técnico
router.get('/informe/por-tecnico/:id', [
  verificarRol(['Administrador','Jefe']),
  check('id')
    .notEmpty().withMessage('Se necesita el Id del tecnico').bail()
    .isInt().withMessage('id debe ser entero').bail(),
  checksValidaciones
], listarInformePorTecnico);

// Listar todos los informes
router.get('/informe/todos', [
  verificarRol(['Administrador','Jefe'])
], listarTodosInformes);

// Eliminar informe
router.delete('/informe/:id', [
  verificarRol(['Administrador','Jefe']),
  check('id')
    .notEmpty().withMessage('Se necesita el Id del informe').bail()
    .isInt().withMessage('id debe ser entero').bail(),
  checksValidaciones
], informeEliminar);

module.exports = router;