const path = require('path');
const fs = require('fs');
const { crearArchivoIncidencia, eliminarArchivoById, obtenerArchivosPorIncidencia } = require('../models/archivo.model');
const { obtenerIncidenciaById, actualizarFotoPrincipal } = require('../models/incidencia.model');

const subirArchivo= async(req, res) =>{
	const { id } = req.params;
	try {
		const incidencia = await obtenerIncidenciaById(parseInt(id, 10));
		if (!incidencia) {
				return res.status(404).json({ ok: false, msg: 'Incidencia no encontrada.' });
			}
			if (!req.file) {
				return res.status(400).json({ ok: false, msg: 'No se subió ningún archivo.' });
			}

			const url = `/uploads/incidencias/${req.file.filename}`;
			const archivo = await crearArchivoIncidencia({
				id_incidencia: parseInt(id, 10),
				url,
				mime_type: req.file.mimetype,
				nombre_original: req.file.originalname,
				tamano: req.file.size
			});
			return res.status(201).json({
				ok: true,
				msg: 'Archivo subido correctamente.',
				archivo
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({ ok: false, msg: 'Error del servidor. Consulte su administrador.' });
		}
}
const listarArchivos= async(req, res) =>{
	const { id } = req.params;
	try {
		const incidencia = await obtenerIncidenciaById(parseInt(id, 10));
		if (!incidencia) {
			return res.status(404).json({ ok: false, msg: 'Incidencia no encontrada.' });
		}
		const archivos = await obtenerArchivosPorIncidencia(parseInt(id, 10));
		return res.status(200).json({ ok: true, msg: 'Archivos obtenidos correctamente.', archivos });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ ok: false, msg: 'Error del servidor. Consulte su administrador.' });
	}
}
const eliminarArchivo= async(req, res) =>{
	const { id } = req.params; // id del archivo
	try {
		const archivo = await eliminarArchivoById(parseInt(id, 10));
		if (!archivo) {
			return res.status(404).json({ ok: false, msg: 'Archivo no encontrado.' });
		}
		// borrar archivo físico si existe
		if (archivo.url) {
			const p = path.join(__dirname, '..', '..', archivo.url.replace('/', path.sep));
			fs.unlink(p, () => {});
		}
		return res.status(200).json({ ok: true, msg: 'Archivo eliminado correctamente.', archivo });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ ok: false, msg: 'Error del servidor. Consulte su administrador.' });
	}

	
}
const subirFotoPrincipal = async(req, res) =>{
		const { id } = req.params;
		try {
			const incidencia = await obtenerIncidenciaById(parseInt(id, 10));
			if (!incidencia) {
				return res.status(404).json({ ok: false, msg: 'Incidencia no encontrada.' });
			}
			if (!req.file) {
				return res.status(400).json({ ok: false, msg: 'No se subió ningún archivo.' });
			}

			const esImagen = (req.file.mimetype && req.file.mimetype.startsWith('image/'))
				|| /\.(jpe?g|png|webp|gif)$/i.test(req.file.originalname || '');
			if (!esImagen) {
				return res.status(400).json({ ok: false, msg: 'Solo se permiten imágenes para la foto principal.' });
			}

			const url = `/uploads/incidencias/${req.file.filename}`;
			const archivo = await crearArchivoIncidencia({
				id_incidencia: parseInt(id, 10),
				url,
				mime_type: req.file.mimetype,
				nombre_original: req.file.originalname,
				tamano: req.file.size
			});

			const incidenciaActualizada = await actualizarFotoPrincipal(url, parseInt(id, 10));
			return res.status(201).json({
				ok: true,
				msg: 'Foto principal subida y establecida correctamente.',
				archivo,
				incidencia: incidenciaActualizada
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({ ok: false, msg: 'Error del servidor. Consulte su administrador.' });
		}
	}
module.exports = {
    subirArchivo,
    listarArchivos,
	eliminarArchivo,
	subirFotoPrincipal
}