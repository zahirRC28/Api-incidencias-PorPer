const connect = require('../configs/dbConnect');
const queries = require('./Querys/queryIncidencia');

const crearIncidencia = async({ titulo, descripcion, foto_url, id_maquina, id_usuario_creador }) =>{
	let cliente, result;
	try {
		cliente = await connect();
		//console.log(titulo, descripcion, foto_url, id_maquina, id_usuario_creador, estado_nombre, prioridad_nombre)
		result = await cliente.query(queries.crearIncidencia,[
			titulo,
			descripcion,
			foto_url,
			id_maquina,
			id_usuario_creador,
		]);
		//console.log(result);
		return result.rows[0];
	} catch (error) {
		console.log(error);
		throw error;
	}finally{
		cliente.release();
	}
};

const obtenerIncidenciaById = async(id_incidencia) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.obtenerIncidenciaById,[id_incidencia]);
		return result.rows[0];
	} catch (error) {
		console.log(error);
		throw error;
	}finally{
		cliente.release();
	}
};

const obtenerIncidenciasPorCreador = async(id_usuario_creador) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.obtenerIncidenciasPorCreador,[id_usuario_creador]);
		return result.rows;
	} catch (error) {
		console.log(error);
		throw error;
	}finally{
		cliente.release();
	}
};

const obtenerTodasIncidencias = async() =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.obtenerTodasIncidencias);
		return result.rows;
	} catch (error) {
		console.log(error);
		throw error;
	}finally{
		cliente.release();
	}
};

const obtenerTodasIncidenciasOrdenPrioridad = async() =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.obtenerTodasIncidenciasOrdenPrioridad);
		return result.rows;
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};

const obtenerIncidenciasPorEstadoNombre = async(estado_nombre) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.obtenerIncidenciasPorEstadoNombre, [estado_nombre]);
		return result.rows;
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};

const obtenerIncidenciasPorPrioridadNombre = async(prioridad_nombre) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.obtenerIncidenciasPorPrioridadNombre, [prioridad_nombre]);
		return result.rows;
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};

const actualizarIncidenciaById = async({ titulo, descripcion, foto_url, id_maquina, id_tecnico, id_jefe, estado_nombre, prioridad_nombre }, id_incidencia) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.actualizarIncidenciaById,[
			titulo,
			descripcion,
			foto_url,
			id_maquina,
			id_tecnico,
			id_jefe,
			estado_nombre,
			prioridad_nombre,
			id_incidencia
		]);
		return result.rows[0];
	} catch (error) {
		console.log(error);
		throw error;
	}finally{
		cliente.release();
	}
};

const eliminarIncidenciaById = async(id_incidencia) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.eliminarIncidenciaById,[id_incidencia]);
		return result.rows[0];
	} catch (error) {
		console.log(error);
		throw error;
	}finally{
		cliente.release();
	}
};

const cambiarEstadoIncidencia = async(estado_nombre, id_incidencia) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.cambiarEstadoIncidencia, [estado_nombre, id_incidencia]);
		return result.rows[0];
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};

const cambiarPrioridadIncidencia = async(prioridad_nombre, id_incidencia) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.cambiarPrioridadIncidencia, [prioridad_nombre, id_incidencia]);
		return result.rows[0];
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};

const actualizarFotoPrincipal = async(foto_url, id_incidencia) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.actualizarFotoPrincipal, [foto_url, id_incidencia]);
		return result.rows[0];
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};

const incidenciasDeTecnico = async(id_tecnico) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.incidenciasTecnico, [id_tecnico]);
		return result.rows;
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};
const incidenciasDeJefe = async(id_jefe) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.incidenciasJefe, [id_jefe]);
		return result.rows;
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};
const asignarTecnico = async(id_tecnico, id_incidencia) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.asignarTecnicoIncidencia, [id_tecnico, id_incidencia]);
		return result.rows[0];
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};
const asignarJefe = async(id_jefe, id_incidencia) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.asignarJefeIncidencia, [id_jefe, id_incidencia]);
		return result.rows[0];
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};
const estadosIncidencia = async()=>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.obtenerTodosEstadosIncidencia)
		return result.rows
	} catch (error) {
	console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
}
const prioridadIncidencia = async()=>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.obtenerTodasPrioridadesIncidencia)
		return result.rows
	} catch (error) {
	console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
}

module.exports = {
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
	incidenciasDeTecnico,
	incidenciasDeJefe,
	actualizarFotoPrincipal,
	estadosIncidencia,
	prioridadIncidencia,
    asignarTecnico,
    asignarJefe
}
