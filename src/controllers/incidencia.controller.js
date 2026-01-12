const {
	crearIncidencia,
	obtenerIncidenciaById,
	obtenerIncidenciasPorCreador,
	obtenerTodasIncidencias,
	obtenerTodasIncidenciasOrdenPrioridad,
	obtenerIncidenciasPorEstadoNombre,
	obtenerIncidenciasPorPrioridadNombre,
	actualizarIncidenciaById,
	eliminarIncidenciaById,
	cambiarEstadoIncidencia,
	cambiarPrioridadIncidencia,
	incidenciasDeJefe,
	incidenciasDeTecnico,
	estadosIncidencia,
	prioridadIncidencia,
	asignarTecnico,
	asignarJefe
} = require('../models/incidencia.model');

const { obtenerMaquinaById } = require('../models/maquina.model')
const { obtenerArchivosPorIncidencia } = require('../models/archivo.model');

const incidenciaCrear = async(req, res) =>{
	const { titulo, descripcion, id_maquina, id_usuario_creador } = req.body;
	try {
		let id_usuario_creador_final = id_usuario_creador;
		const rolUser = req.userToken.rol
		if(rolUser == 'Cliente'){
			id_usuario_creador_final = req.userToken.uid;
		}
		
		const comprobarMaquina = await obtenerMaquinaById(id_maquina);
		const { id_estado_maquina } = comprobarMaquina
		if(id_estado_maquina !== 1){
			return res.status(400).json({
				ok: false,
				msg: 'La maquina seleccionada no se puede usar para crear una incidencia'
			})
		}
		//console.log(comprobarMaquina);
		let foto_url = null;

		const values = {
			titulo,
			descripcion,
			foto_url,
			id_maquina: id_maquina,
			id_usuario_creador: id_usuario_creador_final
		};
		//console.log(values);
		const incidencia = await crearIncidencia(values);
		//console.log(incidencia);
		return res.status(201).json({
			ok: true,
			msg: 'Incidencia creada correctamente.',
			incidencia
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			ok: false,
			msg: 'Error del servidor. Consulte su administrador.'
		});
	}
};

const miasIncidencias = async(req, res) =>{
	try {
		const id_usuario_creador = req.userToken.uid;
		const incidencias = await obtenerIncidenciasPorCreador(id_usuario_creador);
		return res.status(200).json({
			ok: true,
			msg: 'Incidencias del usuario obtenidas correctamente.',
			incidencias
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			ok: false,
			msg: 'Error del servidor. Consulte su administrador.'
		});
	}
};

const todasIncidencias = async(req, res) =>{
	try {
		const incidencias = await obtenerTodasIncidencias();
		return res.status(200).json({
			ok: true,
			msg: 'Todas las incidencias obtenidas correctamente.',
			incidencias
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			ok: false,
			msg: 'Error del servidor. Consulte su administrador.'
		});
	}
};

const incidenciasOrdenPrioridad = async(req, res) =>{
	try {
		const incidencias = await obtenerTodasIncidenciasOrdenPrioridad();
		return res.status(200).json({ 
			ok: true, 
			msg: 'Incidencias ordenadas por prioridad obtenidas correctamente.', 
			incidencias 
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ 
			ok: false, 
			msg: 'Error del servidor. Consulte su administrador.' 
		
		});
	}
};

const incidenciasPorEstado = async(req, res) =>{
	const { nombre } = req.params;
	try {
		const incidencias = await obtenerIncidenciasPorEstadoNombre(nombre);
		return res.status(200).json({ 
			ok: true, 
			msg: 'Incidencias por estado obtenidas correctamente.', 
			incidencias 
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ 
			ok: false, 
			msg: 'Error del servidor. Consulte su administrador.' 
		
		});
	}
};

const incidenciasPorPrioridad = async(req, res) =>{
	const { nombre } = req.params;
	try {
		const incidencias = await obtenerIncidenciasPorPrioridadNombre(nombre);
		return res.status(200).json({ 
			ok: true, 
			msg: 'Incidencias por prioridad obtenidas correctamente.', 
			incidencias 
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ 
			ok: false, 
			msg: 'Error del servidor. Consulte su administrador.' 
		});
	}
};

const obtenerUnaIncidencia = async(req, res) =>{
	const { id } = req.params;
	try {
		const incidencia = await obtenerIncidenciaById(id);
		if (!incidencia) {
			return res.status(400).json({ 
				ok: false, 
				msg: 'Incidencia no encontrada.' 
			});
		}
		const archivos = await obtenerArchivosPorIncidencia(id);
		return res.status(200).json({
			ok: true,
			msg: 'Incidencia encontrada correctamente.',
			incidencia: {
				...incidencia,
				archivos
			}
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			ok: false,
			msg: 'Error del servidor. Consulte su administrador.'
		});
	}
};

const actualizarIncidencia = async(req, res) =>{
	const { id } = req.params;
	const { titulo, descripcion, id_maquina, id_tecnico, id_jefe, estado_nombre, prioridad_nombre } = req.body;
	try {
		const incidenciaActual = await obtenerIncidenciaById(id);
		if (!incidenciaActual) {
			return res.status(404).json({ 
				ok: false, 
				msg: 'Incidencia no encontrada.' 
			});
		}

		let nuevaFotoUrl = incidenciaActual.foto_url;

		const values = {
			titulo,
			descripcion,
			foto_url: nuevaFotoUrl,
			id_maquina: parseInt(id_maquina, 10),
			id_tecnico: id_tecnico ? parseInt(id_tecnico, 10) : null,
			id_jefe: id_jefe ? parseInt(id_jefe, 10) : null,
			estado_nombre,
			prioridad_nombre
		};

		const incidencia = await actualizarIncidenciaById(values, id);
		return res.status(200).json({
			ok: true,
			msg: 'Incidencia actualizada correctamente.',
			incidencia
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			ok: false,
			msg: 'Error del servidor. Consulte su administrador.'
		});
	}
};

const eliminarIncidencia = async(req, res) =>{
	const { id } = req.params;
	try {
		const incidenciaActual = await obtenerIncidenciaById(id);
		if (!incidenciaActual) {
			return res.status(404).json({ 
				ok: false, 
				msg: 'Incidencia no encontrada.' 
			});
		}
		const eliminada = await eliminarIncidenciaById(id);
		return res.status(200).json({
			ok: true,
			msg: 'Incidencia eliminada correctamente.',
			incidencia: eliminada
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			ok: false,
			msg: 'Error del servidor. Consulte su administrador.'
		});
	}
};

const cambiarEstado = async(req, res) =>{
	const { id } = req.params;
	const { estado_nombre } = req.body;
	try {
		const existe = await obtenerIncidenciaById(parseInt(id, 10));
		if (!existe) return res.status(404).json({ ok: false, msg: 'Incidencia no encontrada.' });
		const incidencia = await cambiarEstadoIncidencia(estado_nombre, id);
		return res.status(200).json({ 
			ok: true, 
			msg: 'Estado de incidencia actualizado correctamente.', 
			incidencia 
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ 
			ok: false, 
			msg: 'Error del servidor. Consulte su administrador.' 
		});
	}
};

const cambiarPrioridad = async(req, res) =>{
	const { id } = req.params;
	const { prioridad_nombre } = req.body;
	try {
		const existe = await obtenerIncidenciaById(id);
		if (!existe) return res.status(404).json({ ok: false, msg: 'Incidencia no encontrada.' });
		const incidencia = await cambiarPrioridadIncidencia(prioridad_nombre, id);
		return res.status(200).json({ 
			ok: true, 
			msg: 'Prioridad de incidencia actualizada correctamente.', 
			incidencia 
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ 
			ok: false, 
			msg: 'Error del servidor. Consulte su administrador.' 
		});
	}
};
const asignarTecnicoCon = async(req, res) =>{
	const { id } = req.params;
	const { id_tecnico } = req.body;
	try {
		const existe = await obtenerIncidenciaById(id);
		if (!existe) return res.status(404).json({ ok: false, msg: 'Incidencia no encontrada.' });
		const incidencia = await asignarTecnico(id_tecnico, id);
		return res.status(200).json({ 
			ok: true, 
			msg: 'Técnico asignado correctamente.', 
			incidencia 
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ 
			ok: false, 
			msg: 'Error del servidor. Consulte su administrador.' 
		});
	}
};
const asignarJefeCon = async(req, res) =>{
	const { id } = req.params;
	const { id_jefe } = req.body;
	try {
		const existe = await obtenerIncidenciaById(id);
		if (!existe) return res.status(404).json({ ok: false, msg: 'Incidencia no encontrada.' });
		const incidencia = await asignarJefe(id_jefe, id);
		return res.status(200).json({ 
			ok: true, 
			msg: 'Jefe asignado correctamente.', 
			incidencia 
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ 
			ok: false, 
			msg: 'Error del servidor. Consulte su administrador.' 
		});
	}
};
const incidenciasTieneTecnico = async(req, res) =>{
	const { id_tecnico } = req.params;
	try {
		console.log(id_tecnico);
		const incidencias = await incidenciasDeTecnico(id_tecnico);
		return res.status(200).json({
			ok: true,
			msg: 'Las incidencias del técnico se contaron correctamente.',
			incidencias
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			ok: false,
			msg: 'Error del servidor. Consulte su administrador.'
		});
	}
};
const incidenciasTieneJefe = async(req, res) =>{
	const { id_jefe } = req.params;
	try {
		const incidencias = await incidenciasDeJefe(id_jefe);
		return res.status(200).json({
			ok: true,
			msg: 'Las incidencias por jefe obtenido correctamente.',
			incidencias
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			ok: false,
			msg: 'Error del servidor. Consulte su administrador.'
		});
	}
};

const todasEstadosIncidencia = async(req, res)=>{
	try {
		const estados = await estadosIncidencia();
		//console.log(estados)
		return res.status(200).json({
			ok: true,
			msg: 'Estas son todos los estados de Incidencia',
			estados
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			ok: false,
			msg: 'Error del servidor. Consulte su administrador.'
		});
	}
}
const todasPrioridadesIncidencia = async(req, res)=>{
	try {
		const prioridades = await prioridadIncidencia();
		return res.status(200).json({
			ok:true,
			msg: 'Estos son todas las prioridades de Incidencia',
			prioridades
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			ok: false,
			msg: 'Error del servidor. Consulte su administrador.'
		});
	}
}

module.exports = {
	incidenciaCrear,
	actualizarIncidencia,
	eliminarIncidencia,
	obtenerUnaIncidencia,
	todasIncidencias,
	miasIncidencias,
	incidenciasOrdenPrioridad,
	incidenciasPorEstado,
	incidenciasPorPrioridad,
	cambiarEstado,
	cambiarPrioridad,
	incidenciasTieneTecnico,
	incidenciasTieneJefe,
	todasEstadosIncidencia,
	todasPrioridadesIncidencia,
	asignarTecnicoCon,
	asignarJefeCon,
}
