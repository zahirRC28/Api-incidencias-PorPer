const express = require('express');
const path = require('path');
const multer = require('multer');
const { check } = require('express-validator');
const router = express.Router();

const { verificarJWT } = require('../middlewares/validarJWT');
const { verificarRol } = require('../middlewares/verificarRol');
const { checksValidaciones } = require('../middlewares/checkValidations');
const { subirArchivo, listarArchivos, eliminarArchivo, subirFotoPrincipal } = require('../controllers/archivo.controller');

//opción de almacenamiento que guarda los archivos subidos directamente en la memoria RAM del servidor
const storage = multer.memoryStorage();

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.pdf'];

const attachmentFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Formato de archivo no permitido'), false);
  }
};


const uploadAttachments = multer({
  storage,
  fileFilter: attachmentFilter,
  limits: { fileSize: 10 * 1024 * 1024 }
});


router.post('/incidencia/:id/archivo', [
	verificarJWT,
	uploadAttachments.single('archivo'),
	check('id')
		.notEmpty().withMessage('Se necesita el Id de la incidencia').bail()
		.isInt().withMessage('id debe ser entero').bail(),
	checksValidaciones
], subirArchivo);


router.post('/incidencia/:id/fotoPrincipal', [
	verificarJWT,
	uploadAttachments.single('archivo'),
	check('id')
		.notEmpty().withMessage('Se necesita el Id de la incidencia').bail()
		.isInt().withMessage('id debe ser entero').bail(),
	checksValidaciones
], subirFotoPrincipal);


router.get('/incidencia/:id/archivos', [
	verificarJWT,
	check('id')
		.notEmpty().withMessage('Se necesita el Id de la incidencia').bail()
		.isInt().withMessage('id debe ser entero').bail(),
	checksValidaciones
], listarArchivos);


router.delete('/incidencia/archivo/:id', [
	verificarRol(['Administrador', 'Jefe']),
	check('id')
		.notEmpty().withMessage('Se necesita el Id del archivo').bail()
		.isInt().withMessage('id debe ser entero').bail(),
	checksValidaciones
], eliminarArchivo);

module.exports = router;
