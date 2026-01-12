const connect = require('../configs/dbConnect');
const queries = require('./Querys/queryMantenimiento');

const crearMantenimiento = async({ periodo, frecuencia, genera_incidencia, estado_nombre, id_maquina, id_jefe }) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.crearMantenimiento, [
			periodo,
			frecuencia,
			genera_incidencia,
			estado_nombre,
			id_maquina,
			id_jefe
		]);
		return result.rows[0];
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};

const actualizarMantenimientoById = async({ periodo, frecuencia, genera_incidencia, estado_nombre, id_maquina, id_jefe }, id_mantenimiento) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.actualizarMantenimientoById, [
			periodo,
			frecuencia,
			genera_incidencia,
			estado_nombre,
			id_maquina,
			id_jefe,
			id_mantenimiento
		]);
		return result.rows[0];
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};

const obtenerMantenimientoById = async(id_mantenimiento) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.obtenerMantenimientoById, [id_mantenimiento]);
		return result.rows[0];
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};

const obtenerTodosMantenimientos = async() =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.obtenerTodosMantenimientos);
		return result.rows;
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};

const obtenerMantenimientosPorMaquina = async(id_maquina) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.obtenerMantenimientosPorMaquina, [id_maquina]);
		return result.rows;
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};

const eliminarMantenimientoById = async(id_mantenimiento) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.eliminarMantenimientoById, [id_mantenimiento]);
		return result.rows[0];
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};

const obtenerEstadosMantenimiento = async() =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.obtenerEstadosMantenimiento);
		return result.rows;
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};

const cambiarEstadoMantenimiento = async(estado_nombre, id_mantenimiento) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.cambiarEstadoMantenimiento, [estado_nombre, id_mantenimiento]);
		return result.rows[0];
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};

module.exports = {
	crearMantenimiento,
	actualizarMantenimientoById,
	obtenerMantenimientoById,
	obtenerTodosMantenimientos,
	obtenerMantenimientosPorMaquina,
	eliminarMantenimientoById,
	obtenerEstadosMantenimiento,
	cambiarEstadoMantenimiento
};
