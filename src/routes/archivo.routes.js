const express = require('express');
const path = require('path');
const multer = require('multer');
const { check } = require('express-validator');
const router = express.Router();

const { verificarJWT } = require('../middlewares/validarJWT');
const { verificarRol } = require('../middlewares/verificarRol');
const { checksValidaciones } = require('../middlewares/checkValidations');
const { subirArchivo, listarArchivos, eliminarArchivo, subirFotoPrincipal } = require('../controllers/archivo.controller');

// Multer for attachments (images + pdf)
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '..', '..', 'uploads', 'incidencias'));
	},
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		const base = path.basename(file.originalname, ext)
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '');
		const unique = Date.now();
		cb(null, `${base}-${unique}${ext}`);
	}
});

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.pdf'];

const attachmentFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Formato de archivo no permitido'), false);
  }
};


const uploadAttachments = multer({ storage, fileFilter: attachmentFilter, limits: { fileSize: 10 * 1024 * 1024 } });

// Upload attachment to an incidencia
router.post('/incidencia/:id/archivo', [
	verificarJWT,
	uploadAttachments.single('archivo'),
	check('id')
		.notEmpty().withMessage('Se necesita el Id de la incidencia').bail()
		.isInt().withMessage('id debe ser entero').bail(),
	checksValidaciones
], subirArchivo);

// Upload principal image and set it as principal automatically
router.post('/incidencia/:id/fotoPrincipal', [
	verificarJWT,
	uploadAttachments.single('archivo'),
	check('id')
		.notEmpty().withMessage('Se necesita el Id de la incidencia').bail()
		.isInt().withMessage('id debe ser entero').bail(),
	checksValidaciones
], subirFotoPrincipal);

// List attachments of an incidencia
router.get('/incidencia/:id/archivos', [
	verificarJWT,
	check('id')
		.notEmpty().withMessage('Se necesita el Id de la incidencia').bail()
		.isInt().withMessage('id debe ser entero').bail(),
	checksValidaciones
], listarArchivos);

// Delete an attachment (by id_archivo)
router.delete('/incidencia/archivo/:id', [
	verificarRol(['Administrador', 'Jefe']),
	check('id')
		.notEmpty().withMessage('Se necesita el Id del archivo').bail()
		.isInt().withMessage('id debe ser entero').bail(),
	checksValidaciones
], eliminarArchivo);

module.exports = router;
