/**
 * @swagger
 * tags:
 *   name: Archivos
 *   description: Gestión de archivos asociados a incidencias (subida, listado, eliminación)
 */

/**
 * @swagger
 * /incidencia/{id}/archivo:
 *   post:
 *     summary: Subir un archivo a una incidencia
 *     tags: [Archivos]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la incidencia
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: formData
 *         name: archivo
 *         required: true
 *         description: Archivo a subir (jpg, jpeg, png, webp, pdf, máximo 10MB)
 *         type: string
 *         format: binary
 *     responses:
 *       201:
 *         description: Archivo subido correctamente
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               msg: Archivo subido
 *               archivo:
 *                 id_archivo: 15
 *                 nombre: documento-1689923456789.pdf
 *                 url: https://cloudinary.com/...
 *       400:
 *         description: Error de validación o formato de archivo no permitido
 *       401:
 *         description: JWT inválido o no proporcionado
 */

/**
 * @swagger
 * /incidencia/{id}/fotoPrincipal:
 *   post:
 *     summary: Subir la foto principal de una incidencia
 *     tags: [Archivos]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la incidencia
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: formData
 *         name: archivo
 *         required: true
 *         description: Imagen principal (jpg, jpeg, png, webp, máximo 10MB)
 *         type: string
 *         format: binary
 *     responses:
 *       201:
 *         description: Foto principal subida correctamente
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               msg: Foto principal subida y asignada
 *               archivo:
 *                 id_archivo: 16
 *                 nombre: principal-1689923456789.jpg
 *                 url: https://cloudinary.com/...
 *       400:
 *         description: Error de validación o formato de archivo no permitido
 *       401:
 *         description: JWT inválido o no proporcionado
 */

/**
 * @swagger
 * /incidencia/{id}/archivos:
 *   get:
 *     summary: Listar todos los archivos de una incidencia
 *     tags: [Archivos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la incidencia
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Archivos encontrados
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               archivos:
 *                 - id_archivo: 15
 *                   nombre: documento-1689923456789.pdf
 *                   url: https://cloudinary.com/...
 *                 - id_archivo: 16
 *                   nombre: principal-1689923456789.jpg
 *                   url: https://cloudinary.com/...
 *       404:
 *         description: Incidencia no encontrada
 *       401:
 *         description: JWT inválido o no proporcionado
 */

/**
 * @swagger
 * /incidencia/archivo/{id}:
 *   delete:
 *     summary: Eliminar un archivo por ID
 *     tags: [Archivos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del archivo
 *         schema:
 *           type: integer
 *           example: 15
 *     responses:
 *       200:
 *         description: Archivo eliminado correctamente
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               msg: Archivo eliminado
 *       403:
 *         description: Rol no autorizado
 *       404:
 *         description: Archivo no encontrado
 */