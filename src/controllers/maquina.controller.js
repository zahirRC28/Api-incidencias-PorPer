const {
	crearMaquina,
	actualizarMaquinaById,
	obtenerMaquinaById,
	obtenerTodasMaquinas,
	obtenerMaquinasPorUsuario,
	obtenerMaquinasPorEstadoNombre,
	eliminarMaquinaById,
	obtenerEstadosMaquina,
	cambiarEstadoMaquina
} = require('../models/maquina.model');

const maquinaCrear = async(req, res) =>{
	const { nombre, modelo, prioridad_cliente, id_usuario } = req.body;
	try {
		//console.log(nombre);
		//console.log(modelo);
		//console.log(prioridad_cliente);
		//console.log(estado_nombre);
		//console.log(id_usuario);
		const maquina = await crearMaquina({ nombre, modelo, prioridad_cliente, id_usuario});
		//console.log(maquina);
		if(!maquina){
			return res.status(400).json({ 
				ok: false,
				msg: 'No se pudo crear la máquina.'
			});
		}
		return res.status(201).json({ 
            ok: true, 
            msg: 'Máquina creada correctamente.', 
            maquina 
        });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ 
            ok: false, 
            msg: 'Error del servidor. Consulte su administrador.' 
        });
	}
};

const maquinaActualizar = async(req, res) =>{
	const { id } = req.params;
	const { nombre, modelo, prioridad_cliente, estado_nombre, id_usuario } = req.body;
	try {
		const existe = await obtenerMaquinaById(id);
		if (!existe) return res.status(404).json({ ok: false, msg: 'Máquina no encontrada.' });
		const actualizada = await actualizarMaquinaById({ nombre, modelo, prioridad_cliente, estado_nombre, id_usuario }, id);
		return res.status(200).json({ 
            ok: true, 
            msg: 'Máquina actualizada correctamente.', 
            maquina: actualizada 
        });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ 
            ok: false, 
            msg: 'Error del servidor. Consulte su administrador.' 
        });
	}
};

const obtenerUnaMaquina = async(req, res) =>{
	const { id } = req.params;
	try {
		const maquina = await obtenerMaquinaById(id);
		if (!maquina) return res.status(404).json({
            ok: false, 
            msg: 'Máquina no encontrada.' 
        });
		return res.status(200).json({ 
            ok: true, 
            msg: 'Máquina encontrada correctamente.',
            maquina 
        });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ 
            ok: false, 
            msg: 'Error del servidor. Consulte su administrador.' 
        });
	}
};

const listarTodasMaquinas = async(req, res) =>{
	try {
		const maquinas = await obtenerTodasMaquinas();
		return res.status(200).json({ 
            ok: true, 
            msg: 'Máquinas obtenidas correctamente.', 
            maquinas 
        });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ 
            ok: false, 
            msg: 'Error del servidor. Consulte su administrador.' 
        });
	}
};

const listarMaquinasPorUsuario = async(req, res) =>{
	const { id } = req.params;
	try {
		const maquinas = await obtenerMaquinasPorUsuario(id);
		return res.status(200).json({ 
            ok: true, 
            msg: 'Máquinas del usuario obtenidas correctamente.', 
            maquinas 
        });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ 
            ok: false, 
            msg: 'Error del servidor. Consulte su administrador.' 
        });
	}
};

const listarManquinasPorEstado = async(req, res) =>{
	const { nombre } = req.params;
	try {
		const maquinas = await obtenerMaquinasPorEstadoNombre(nombre);
		return res.status(200).json({ 
            ok: true, 
            msg: 'Máquinas por estado obtenidas correctamente.', 
            maquinas 
        });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ 
            ok: false, 
            msg: 'Error del servidor. Consulte su administrador.' 
        });
	}
};

const maquinaEliminar = async(req, res) =>{
	const { id } = req.params;
	try {
		const existe = await obtenerMaquinaById(id);
		if (!existe) return res.status(404).json({ ok: false, msg: 'Máquina no encontrada.' });
		const borrada = await eliminarMaquinaById(id);
		return res.status(200).json({ 
            ok: true, 
            msg: 'Máquina eliminada correctamente.', 
            maquina: borrada 
        });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ 
            ok: false, 
            msg: 'Error del servidor. Consulte su administrador.' 
        });
	}
};

const estadosMaquina = async(req, res) =>{
	try {
		const estados = await obtenerEstadosMaquina();
		return res.status(200).json({ 
            ok: true, 
            msg: 'Estados de máquina obtenidos correctamente.', 
            estados 
        });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ 
            ok: false, 
            msg: 'Error del servidor. Consulte su administrador.' 
        });
	}
};

const cambiarMaquinaEstado = async(req, res) =>{
	const { id } = req.params;
	const { estado_nombre } = req.body;
	try {
		const existe = await obtenerMaquinaById(id);
		//console.log(existe);
		if (!existe) return res.status(404).json({ ok: false, msg: 'Máquina no encontrada.' });
		const maquina = await cambiarEstadoMaquina(estado_nombre, id);
		console.log(maquina);
		return res.status(200).json({ 
            ok: true, 
            msg: 'Estado de máquina actualizado correctamente.', 
            maquina 
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
	maquinaCrear,
    maquinaActualizar,
    maquinaEliminar,
    obtenerUnaMaquina,
    listarTodasMaquinas,
    listarMaquinasPorUsuario,
    listarManquinasPorEstado,
	estadosMaquina,
	cambiarMaquinaEstado
};
