const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const { verificarJWT } = require('../middlewares/validarJWT');
const { verificarRol } = require('../middlewares/verificarRol');
const { checksValidaciones } = require('../middlewares/checkValidations');
const { incidenciaCrear, actualizarIncidencia, eliminarIncidencia, miasIncidencias, obtenerUnaIncidencia, todasIncidencias, incidenciasOrdenPrioridad, incidenciasPorEstado, incidenciasPorPrioridad, cambiarEstado, cambiarPrioridad, incidenciasTieneJefe, incidenciasTieneTecnico, todasEstadosIncidencia, todasPrioridadesIncidencia, asignarTecnicoCon, asignarJefeCon } = require('../controllers/incidencia.controller');


router.post('/incidencia/crear', [
	verificarRol(['Administrador', 'Jefe', 'Cliente']),
	check('titulo')
		.notEmpty().withMessage('El título es obligatorio').bail()
		.isLength({ max: 80 }).withMessage('El título debe tener máximo 80 caracteres').bail(),
	check('descripcion')
		.notEmpty().withMessage('La descripción es obligatoria').bail(),
	check('id_maquina')
		.notEmpty().withMessage('id de la maquina es obligatorio').bail()
		.isInt().withMessage('id_maquina debe ser entero').bail(),
	checksValidaciones
], incidenciaCrear);

router.get('/incidencia/mias', [
	verificarRol(['Administrador', 'Jefe', 'Cliente'])
],	miasIncidencias);

router.get('/incidencia/todas', [
	verificarRol(['Administrador', 'Jefe'])
], todasIncidencias);

router.get('/incidencia/orden/prioridad', [
	verificarRol(['Administrador', 'Jefe'])
], incidenciasOrdenPrioridad);

router.get('/incidencia/por-estado/:nombre', [
	verificarRol(['Administrador', 'Jefe']),
	check('nombre')
		.notEmpty().withMessage('nombre del estado es obligatorio').bail(),
	checksValidaciones
], incidenciasPorEstado);

router.get('/incidencia/por-prioridad/:nombre', [
	verificarRol(['Administrador', 'Jefe']),
	check('nombre')
		.notEmpty().withMessage('nombre de la prioridad es obligatorio').bail(),
	checksValidaciones
], incidenciasPorPrioridad);

router.get('/incidencia/:id', [
	verificarRol(['Administrador', 'Jefe','Tecnico', 'Cliente']),
	check('id')
		.notEmpty().bail()
		.isInt().withMessage('id debe ser entero').bail(),
	checksValidaciones
], obtenerUnaIncidencia);

router.put('/incidencia/:id', [
	verificarJWT,
	check('id')
		.notEmpty().withMessage('Se necesita el Id de la incidencia').bail()
		.isInt().withMessage('id debe ser entero').bail(),
	check('titulo')
		.notEmpty().withMessage('El título es obligatorio').bail()
		.isLength({ max: 80 }).withMessage('El título debe tener máximo 80 caracteres').bail(),
	check('descripcion')
		.notEmpty().withMessage('La descripción es obligatoria').bail(),
	check('id_maquina')
		.notEmpty().withMessage('id de la maquina es obligatorio').bail()
		.isInt().withMessage('id_maquina debe ser entero').bail(),
	check('id_tecnico')
		.optional({ checkFalsy: true })
		.isInt().withMessage('id_tecnico debe ser entero').bail(),
	check('id_jefe')
		.optional({ checkFalsy: true })
		.isInt().withMessage('id_jefe debe ser entero').bail(),
	check('estado_nombre')
		.notEmpty().withMessage('el estado es obligatorio').bail(),
	check('prioridad_nombre')
		.notEmpty().withMessage('la prioridad es obligatorio').bail(),
	checksValidaciones
], actualizarIncidencia);

router.delete('/incidencia/:id', [
	verificarRol(['Administrador', 'Jefe']),
	check('id')
		.notEmpty().withMessage('Se necesita el Id de la incidencia').bail()
		.isInt().withMessage('id debe ser entero').bail(),
	checksValidaciones
], eliminarIncidencia);

router.put('/incidencia/:id/estado', [
	verificarRol(['Administrador', 'Jefe', 'Tecnico']),
	check('id')
		.notEmpty().withMessage('Se necesita el Id de la incidencia').bail()
		.isInt().withMessage('id debe ser entero').bail(),
	check('estado_nombre')
		.notEmpty().withMessage('estado_nombre es obligatorio').bail(),
	checksValidaciones
], cambiarEstado);

router.put('/incidencia/:id/prioridad', [
	verificarRol(['Administrador', 'Jefe']),
	check('id')
		.notEmpty().withMessage('Se necesita el Id de la incidencia').bail()
		.isInt().withMessage('id debe ser entero').bail(),
	check('prioridad_nombre')
		.notEmpty().withMessage('prioridad_nombre es obligatorio').bail(),
	checksValidaciones
], cambiarPrioridad);

router.put('/incidencia/:id/asignar-tecnico', [
	verificarRol(['Administrador', 'Jefe']),
	check('id')
		.notEmpty().withMessage('Se necesita el Id de la incidencia').bail()
		.isInt().withMessage('id debe ser entero').bail(),
	check('id_tecnico')
		.notEmpty().withMessage('Se necesita el id del técnico').bail()
		.isInt().withMessage('id_tecnico debe ser entero').bail(),
	checksValidaciones
], asignarTecnicoCon);

router.put('/incidencia/:id/asignar-jefe', [
	verificarRol(['Administrador', 'Jefe']),
	check('id')
		.notEmpty().withMessage('Se necesita el Id de la incidencia').bail()
		.isInt().withMessage('id debe ser entero').bail(),
	check('id_jefe')
		.notEmpty().withMessage('Se necesita el id del jefe').bail()
		.isInt().withMessage('id_jefe debe ser entero').bail(),
	checksValidaciones
], asignarJefeCon);

router.get('/incidencia/porJefe/:id_jefe', [
	verificarRol(['Administrador', 'Jefe']),
	check('id_jefe')
		.notEmpty().withMessage('Se necesita el Id de la incidencia').bail()
		.isInt().withMessage('id debe ser entero').bail(),
	checksValidaciones
], incidenciasTieneJefe);

router.get('/incidencia/porTecnico/:id_tecnico', [
	verificarRol(['Administrador', 'Jefe', 'Tecnico']),
	check('id_tecnico')
		.notEmpty().withMessage('Se necesita el id del técnico').bail()
		.isInt().withMessage('id_tecnico debe ser entero').bail(),
	checksValidaciones
], incidenciasTieneTecnico);

router.get('/incidencia/todas/estados', [
	verificarRol(['Administrador', 'Jefe', 'Tecnico', 'Cliente'])
], todasEstadosIncidencia);

router.get('/incidencia/todas/prioridades', [
	verificarRol(['Administrador', 'Jefe','Cliente'])
], todasPrioridadesIncidencia);

module.exports = router;
