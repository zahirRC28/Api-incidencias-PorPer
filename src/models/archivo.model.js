const connect = require('../configs/dbConnect');
const queries = require('./Querys/queryArchivo');

const crearArchivoIncidencia = async({ id_incidencia, url, mime_type, nombre_original, tamano }) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.crearArchivoIncidencia,[
			id_incidencia,
			url,
			mime_type,
			nombre_original,
			tamano
		]);
	    return result.rows[0];
	} catch (error) {
		console.log(error);
		throw error;
	}finally{
		cliente.release();
	}
}
const obtenerArchivosPorIncidencia = async(id_incidencia) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.obtenerArchivosPorIncidencia,[id_incidencia]);
		return result.rows;
	} catch (error) {
		console.log(error);
		throw error;
	}finally{
		cliente.release();
	}
}
const eliminarArchivoById = async(id_archivo) =>{
	let cliente, result;
	try {
		cliente = await connect();
		result = await cliente.query(queries.eliminarArchivoById,[id_archivo]);
		return result.rows[0];
	} catch (error) {
		console.log(error);
		throw error;
	}finally{
		cliente.release();
	}
}

module.exports = {
    crearArchivoIncidencia,
    obtenerArchivosPorIncidencia,
    eliminarArchivoById
}