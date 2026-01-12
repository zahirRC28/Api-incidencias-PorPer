const {
	crearMantenimiento,
	actualizarMantenimientoById,
	obtenerMantenimientoById,
	obtenerTodosMantenimientos,
	obtenerMantenimientosPorMaquina,
	eliminarMantenimientoById,
	obtenerEstadosMantenimiento,
	cambiarEstadoMantenimiento
} = require('../models/mantenimiento.model');

const mantenimeintoCrear = async(req, res) =>{
	const { periodo, frecuencia, genera_incidencia, estado_nombre, id_maquina, id_jefe } = req.body;
	try {
		const mant = await crearMantenimiento({ periodo, frecuencia, genera_incidencia: !!genera_incidencia, estado_nombre, id_maquina, id_jefe});
		return res.status(201).json({ 
			ok: true, 
			msg: 'Mantenimiento creado correctamente.',
			mantenimiento: mant 
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ 
			ok: false, 
			msg: 'Error del servidor. Consulte su administrador.' 
		});
	}
};

const mantenimientoActualizar = async(req, res) =>{
	const { id } = req.params;
	const { periodo, frecuencia, genera_incidencia, estado_nombre, id_maquina, id_jefe } = req.body;
	try {
		const existe = await obtenerMantenimientoById(id);
		if (!existe) return res.status(404).json({ ok: false, msg: 'Mantenimiento no encontrado.' });
		const manteni = await actualizarMantenimientoById({ periodo, frecuencia, genera_incidencia: !!genera_incidencia, estado_nombre, id_maquina, id_jefe }, id);
		return res.status(200).json({ 
			ok: true, 
			msg: 'Mantenimiento actualizado correctamente.', 
			mantenimiento: manteni });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ 
			ok: false, 
			msg: 'Error del servidor. Consulte su administrador.' 
		});
	}
};

const obtenerUnoMantenimiento = async(req, res) =>{
	const { id } = req.params;
	try {
		const manteni = await obtenerMantenimientoById(id);
		if (!manteni) return res.status(404).json({ ok: false, msg: 'Mantenimiento no encontrado.' });
		return res.status(200).json({ 
			ok: true, msg: 'Mantenimiento encontrado correctamente.', 
			mantenimiento: manteni 
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ 
			ok: false, 
			msg: 'Error del servidor. Consulte su administrador.' 
		});
	}
};

const listarTodosMantenimiento = async(req, res) =>{
	try {
		const mantenis = await obtenerTodosMantenimientos();
		return res.status(200).json({ 
			ok: true, 
			msg: 'Mantenimientos obtenidos correctamente.', 
			mantenimientos: mantenis 
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ 
			ok: false, 
			msg: 'Error del servidor. Consulte su administrador.' 
		});
	}
};

const listarMantenimientoPorMaquina = async(req, res) =>{
	const { id } = req.params;
	try {
		const mantenis = await obtenerMantenimientosPorMaquina(id);
		return res.status(200).json({ 
			ok: true, 
			msg: 'Mantenimientos por máquina obtenidos correctamente.', 
			mantenimientos: mantenis });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ 
			ok: false, 
			msg: 'Error del servidor. Consulte su administrador.' 
		});
	}
};

const mantenimeintoEliminar = async(req, res) =>{
	const { id } = req.params;
	try {
		const existe = await obtenerMantenimientoById(id);
		if (!existe) return res.status(404).json({ ok: false, msg: 'Mantenimiento no encontrado.' });
		const borrado = await eliminarMantenimientoById(id);
		return res.status(200).json({ 
			ok: true, 
			msg: 'Mantenimiento eliminado correctamente.', 
			mantenimiento: borrado 
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ 
			ok: false, 
			msg: 'Error del servidor. Consulte su administrador.' 
		});
	}
};

const estadosMantenimiento = async(req, res) =>{
	try {
		const estads = await obtenerEstadosMantenimiento();
		return res.status(200).json({ 
			ok: true, 
			msg: 'Estados de mantenimiento obtenidos correctamente.', 
			estados: estads 
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ 
			ok: false, 
			msg: 'Error del servidor. Consulte su administrador.' 
		});
	}
};

const mantenimientoCambiarEstado = async(req, res) =>{
	const { id } = req.params;
	const { estado_nombre } = req.body;
	try {
		const existe = await obtenerMantenimientoById(id);
		if (!existe) return res.status(404).json({ ok: false, msg: 'Mantenimiento no encontrado.' });
		const manteni = await cambiarEstadoMantenimiento(estado_nombre, id);
		return res.status(200).json({ 
			ok: true, 
			msg: 'Estado de mantenimiento actualizado correctamente.', 
			mantenimiento: manteni 
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ 
			ok: false, 
			msg: 'Error del servidor. Consulte su administrador.' 
		});
	}
};

module.exports = {
	mantenimeintoCrear,
	mantenimientoActualizar,
	obtenerUnoMantenimiento,
	listarTodosMantenimiento,
	listarMantenimientoPorMaquina,
	mantenimeintoEliminar,
	estadosMantenimiento,
	mantenimientoCambiarEstado
};
