const {
	crearInforme,
	actualizarInformeById,
	obtenerInformeById,
	obtenerInformesPorIncidencia,
	obtenerInformesPorTecnico,
	obtenerTodosInformes,
	eliminarInformeById
} = require('../models/informe.model');
const PDFDocument = require('pdfkit');
const incidenciaModel = require('../models/incidencia.model');
const maquinaModel = require('../models/maquina.model');
const archivoModel = require('../models/archivo.model');


const informeCrear = async(req, res) =>{
	const { texto, tipo, id_incidencia, id_tecnico } = req.body;
	try {
		const informe = await crearInforme({ texto, tipo, id_incidencia, id_tecnico });
		return res.status(201).json({ 
			ok: true, 
			msg: 'Informe creado correctamente.', 
			informe 
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ 
			ok: false, 
			msg: 'Error del servidor. Consulte su administrador.' 
		});
	}
};

const informeActualizar = async(req, res) =>{
	const { id } = req.params;
	const { texto, tipo, id_incidencia, id_tecnico } = req.body;
	try {
		const existe = await obtenerInformeById(parseInt(id, 10));
		if (!existe) return res.status(404).json({ ok: false, msg: 'Informe no encontrado.' });
		const informe = await actualizarInformeById({ texto, tipo, id_incidencia, id_tecnico}, id);
		return res.status(200).json({ 
			ok: true, 
			msg: 'Informe actualizado correctamente.', 
			informe 
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ 
			ok: false, 
			msg: 'Error del servidor. Consulte su administrador.' 
		});
	}
};

const obtenerUnoInforme = async(req, res) =>{
	const { id } = req.params;
	try {
		const informe = await obtenerInformeById(id);
		if (!informe) return res.status(404).json({ ok: false, msg: 'Informe no encontrado.' });
		return res.status(200).json({ 
			ok: true, 
			msg: 'Informe encontrado correctamente.', 
			informe 
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ 
			ok: false, 
			msg: 'Error del servidor. Consulte su administrador.' 
		});
	}
};

const listarInformePorIncidencia = async(req, res) =>{
	const { id } = req.params;
	try {
		const informes = await obtenerInformesPorIncidencia(id);
		return res.status(200).json({ 
			ok: true, 
			msg: 'Informes por incidencia obtenidos correctamente.', 
			informes 
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ 
			ok: false, 
			msg: 'Error del servidor. Consulte su administrador.' 
		});
	}
};

const listarInformePorTecnico = async(req, res) =>{
	const { id } = req.params;
	try {
		const informes = await obtenerInformesPorTecnico(id);
		return res.status(200).json({ 
			ok: true, 
			msg: 'Informes por técnico obtenidos correctamente.', 
			informes 
		});
	
	} catch (error) {
		console.error(error);
		return res.status(500).json({ 
			ok: false, 
			msg: 'Error del servidor. Consulte su administrador.' 
		});
	}
};

const listarTodosInformes = async(req, res) =>{
	try {
		const informes = await obtenerTodosInformes();
		return res.status(200).json({ 
			ok: true, 
			msg: 'Informes obtenidos correctamente.', 
			informes 
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ 
			ok: false, 
			msg: 'Error del servidor. Consulte su administrador.' 
		});
	}
};

const informeEliminar = async(req, res) =>{
	const { id } = req.params;
	try {
		const existe = await obtenerInformeById(id);
		if (!existe) return res.status(404).json({ ok: false, msg: 'Informe no encontrado.' });
		const borrado = await eliminarInformeById(id);
		return res.status(200).json({ 
			ok: true, 
			msg: 'Informe eliminado correctamente.', 
			informe: borrado 
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ 
			ok: false, 
			msg: 'Error del servidor. Consulte su administrador.' 
		});
	}
};

const generarPdfPorIncidencia = async (req, res) => {
	const { id } = req.params;
	try {
		const incidencia = await incidenciaModel.obtenerIncidenciaById(id);
		if (!incidencia) return res.status(404).json({ ok: false, msg: 'Incidencia no encontrada.' });

		const maquina = incidencia.id_maquina ? await maquinaModel.obtenerMaquinaById(incidencia.id_maquina) : null;
		const informes = await obtenerInformesPorIncidencia(id);
		const archivos = await archivoModel.obtenerArchivosPorIncidencia(id);


		const doc = new PDFDocument({ size: 'A4', margin: 50 });
		const filename = `informe_incidencia_${id}.pdf`;
		res.setHeader('Content-Type', 'application/pdf');
		res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

		// start piping before async image operations
		doc.pipe(res);

		doc.fontSize(18).text('Informe de Incidencia', { align: 'center' });
		doc.moveDown();

		doc.fontSize(12).text(`ID incidencia: ${incidencia.id_incidencia || id}`);
		doc.text(`Título: ${incidencia.titulo || ''}`);
		doc.text(`Descripción: ${incidencia.descripcion || ''}`);
		doc.text(`Estado: ${incidencia.estado_nombre || ''}`);
		doc.text(`Prioridad: ${incidencia.prioridad_nombre || ''}`);
		doc.text(`Fecha creación: ${incidencia.fecha_creacion || ''}`);
		doc.moveDown();

		if (maquina) {
			doc.fontSize(14).text('Máquina afectada');
			doc.fontSize(12).text(`ID: ${maquina.id_maquina || ''}`);
			doc.text(`Nombre: ${maquina.nombre || maquina.nombre || ''}`);
			doc.text(`Modelo: ${maquina.modelo || ''}`);
			doc.text(`Estado: ${maquina.estado_nombre || ''}`);
			doc.moveDown();
		}

		// Foto principal de la incidencia (si existe) — mostrar URL y marcarla como principal
		if (incidencia.foto_url) {
			doc.addPage();
			doc.fontSize(14).text('Foto principal de la incidencia (URL)', { align: 'left' });
			doc.moveDown(0.5);
			doc.fontSize(12).text(incidencia.foto_url);
			doc.moveDown();
		}

		doc.fontSize(14).text('Informes relacionados');
		doc.moveDown(0.5);
		if (!informes || informes.length === 0) {
			doc.fontSize(12).text('No hay informes para esta incidencia.');
		} else {
			for (let idx = 0; idx < informes.length; idx++) {
				const inf = informes[idx];
				doc.fontSize(12).text(`${idx + 1}. Tipo: ${inf.tipo || ''} — Fecha: ${inf.fecha || ''}`);
				doc.text(`Técnico: ${inf.tecnico_nombre || 'N/A'}`);
				doc.text(`Texto: ${inf.texto || ''}`);
				doc.moveDown();
			}
		}

		// Archivos adicionales
		doc.addPage();
		doc.fontSize(14).text('Archivos adjuntos');
		doc.moveDown(0.5);

		if (!archivos || archivos.length === 0) {
			doc.fontSize(12).text('No hay archivos adjuntos.');
		} else {
			for (let i = 0; i < archivos.length; i++) {
				const arch = archivos[i];
				doc.fontSize(12).text(`${i + 1}. ${arch.nombre_original || arch.url}`);
				doc.text(`Tipo MIME: ${arch.mime_type || 'N/A'}`);
				doc.text(`Tamaño: ${arch.tamano || 'N/A'}`);
				doc.text(`URL: ${arch.url}`); // URL completa de Cloudinary
				const isPrincipal = incidencia.foto_url && incidencia.foto_url === arch.url;
				if (isPrincipal) doc.text('(Imagen principal)');
				doc.moveDown();
			}
		}

		// terminar PDF
		doc.end();

	} catch (error) {
		console.error(error);
		const payload = { ok: false, msg: 'Error generando PDF.' };
		if (process.env.NODE_ENV !== 'production') {
			payload.error = error.message;
			payload.stack = error.stack;
		}
		return res.status(500).json(payload);
	}
};

module.exports = {
	informeCrear,
	informeActualizar,
	obtenerUnoInforme,
	listarInformePorIncidencia,
	listarInformePorTecnico,
	listarTodosInformes,
	informeEliminar
    ,generarPdfPorIncidencia
};
