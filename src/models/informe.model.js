const connect = require('../configs/dbConnect');
const queries = require('./Querys/queryInforme');

const crearInforme = async({ texto, tipo, id_incidencia, id_tecnico }) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.crearInforme, [
			texto,
			tipo,
			id_incidencia,
			id_tecnico
		]);
		return result.rows[0];
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};

const actualizarInformeById = async({ texto, tipo, id_incidencia, id_tecnico }, id_informe) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.actualizarInformeById, [
			texto,
			tipo,
			id_incidencia,
			id_tecnico,
			id_informe
		]);
		return result.rows[0];
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};

const obtenerInformeById = async(id_informe) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.obtenerInformeById, [id_informe]);
		return result.rows[0];
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};

const obtenerInformesPorIncidencia = async(id_incidencia) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.obtenerInformesPorIncidencia, [id_incidencia]);
		return result.rows;
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};

const obtenerInformesPorTecnico = async(id_tecnico) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.obtenerInformesPorTecnico, [id_tecnico]);
		return result.rows;
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};

const obtenerTodosInformes = async() =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.obtenerTodosInformes);
		return result.rows;
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};

const eliminarInformeById = async(id_informe) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.eliminarInformeById, [id_informe]);
		return result.rows[0];
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};

module.exports = {
	crearInforme,
	actualizarInformeById,
	obtenerInformeById,
	obtenerInformesPorIncidencia,
	obtenerInformesPorTecnico,
	obtenerTodosInformes,
	eliminarInformeById
};
