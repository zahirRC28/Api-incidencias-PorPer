const connect = require('../configs/dbConnect');
const queries = require('./Querys/queryMaquina');

const crearMaquina = async({ nombre, modelo, prioridad_cliente, estado_nombre = "Funcionando", id_usuario }) =>{
	let cliente, result;
	//console.log("Dentro del modelo");
	//console.log(nombre);
	//console.log(modelo);
	//console.log(prioridad_cliente);
	//console.log(estado_nombre);
	//console.log(id_usuario);
	try {
		cliente = await connect();
		result = await cliente.query(queries.crearMaquina, [
			nombre,
			modelo,
			prioridad_cliente,
			estado_nombre,
			id_usuario
		]);
		return result.rows[0];
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};

const actualizarMaquinaById = async({ nombre, modelo, prioridad_cliente, estado_nombre, id_usuario }, id_maquina) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.actualizarMaquinaById, [
			nombre,
			modelo,
			prioridad_cliente,
			estado_nombre,
			id_usuario,
			id_maquina
		]);
		return result.rows[0];
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};

const obtenerMaquinaById = async(id_maquina) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.obtenerMaquinaById, [id_maquina]);
		return result.rows[0];
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};

const obtenerTodasMaquinas = async() =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.obtenerTodasMaquinas);
		return result.rows;
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};

const obtenerMaquinasPorUsuario = async(id_usuario) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.obtenerMaquinasPorUsuario, [id_usuario]);
		return result.rows;
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};

const obtenerMaquinasPorEstadoNombre = async(estado_nombre) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.obtenerMaquinasPorEstadoNombre, [estado_nombre]);
		return result.rows;
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};

const eliminarMaquinaById = async(id_maquina) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.eliminarMaquinaById, [id_maquina]);
		return result.rows[0];
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};

const obtenerEstadosMaquina = async() =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.obtenerEstadosMaquina);
		return result.rows;
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};

const cambiarEstadoMaquina = async(estado_nombre, id_maquina) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.cambiarEstadoMaquina, [estado_nombre, id_maquina]);
		return result.rows[0];
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		cliente.release();
	}
};

module.exports = {
	crearMaquina,
	actualizarMaquinaById,
	obtenerMaquinaById,
	obtenerTodasMaquinas,
	obtenerMaquinasPorUsuario,
	obtenerMaquinasPorEstadoNombre,
	eliminarMaquinaById,
	obtenerEstadosMaquina,
	cambiarEstadoMaquina
};
