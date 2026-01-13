/**
 * @swagger
 * tags:
 *   name: Informes
 *   description: Gestión de informes asociados a incidencias y técnicos
 */

/**
 * @swagger
 * /informe/crear:
 *   post:
 *     summary: Crear un nuevo informe
 *     tags: [Informes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - texto
 *               - tipo
 *               - id_incidencia
 *             properties:
 *               texto:
 *                 type: string
 *                 example: Informe detallado sobre la incidencia
 *               tipo:
 *                 type: string
 *                 example: Correctivo
 *               id_incidencia:
 *                 type: integer
 *                 example: 10
 *               id_tecnico:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Informe creado correctamente
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               msg: Informe creado
 *               informe:
 *                 id_informe: 5
 *                 texto: Informe detallado sobre la incidencia
 *                 tipo: Correctivo
 *                 id_incidencia: 10
 *                 id_tecnico: 3
 *       400:
 *         description: Error de validación
 *       401:
 *         description: JWT inválido o no proporcionado
 */

/**
 * @swagger
 * /informe/actualizar/{id}:
 *   put:
 *     summary: Actualizar un informe existente
 *     tags: [Informes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del informe a actualizar
 *         schema:
 *           type: integer
 *           example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - texto
 *               - tipo
 *               - id_incidencia
 *             properties:
 *               texto:
 *                 type: string
 *                 example: Informe actualizado
 *               tipo:
 *                 type: string
 *                 example: Preventivo
 *               id_incidencia:
 *                 type: integer
 *                 example: 10
 *               id_tecnico:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Informe actualizado correctamente
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               msg: Informe actualizado
 *               informe:
 *                 id_informe: 5
 *                 texto: Informe actualizado
 *                 tipo: Preventivo
 *                 id_incidencia: 10
 *                 id_tecnico: 3
 *       400:
 *         description: Error de validación
 *       401:
 *         description: JWT inválido o no proporcionado
 */

/**
 * @swagger
 * /informe/{id}:
 *   get:
 *     summary: Obtener un informe por ID
 *     tags: [Informes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del informe
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Informe encontrado
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               informe:
 *                 id_informe: 5
 *                 texto: Informe detallado sobre la incidencia
 *                 tipo: Correctivo
 *                 id_incidencia: 10
 *                 id_tecnico: 3
 *       404:
 *         description: Informe no encontrado
 *       401:
 *         description: JWT inválido o no proporcionado
 */

/**
 * @swagger
 * /informe/por-incidencia/{id}:
 *   get:
 *     summary: Listar todos los informes de una incidencia
 *     tags: [Informes]
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
 *         description: Informes encontrados
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               informes:
 *                 - id_informe: 5
 *                   texto: Informe 1
 *                   tipo: Correctivo
 *                   id_incidencia: 10
 *                   id_tecnico: 3
 *                 - id_informe: 6
 *                   texto: Informe 2
 *                   tipo: Preventivo
 *                   id_incidencia: 10
 *                   id_tecnico: 2
 *       404:
 *         description: Incidencia no encontrada
 *       401:
 *         description: JWT inválido o no proporcionado
 */

/**
 * @swagger
 * /informe/por-incidencia/{id}/pdf:
 *   get:
 *     summary: Generar PDF con la incidencia, máquina y todos los informes
 *     tags: [Informes]
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
 *         description: PDF generado correctamente
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: JWT inválido o no proporcionado
 */

/**
 * @swagger
 * /informe/por-tecnico/{id}:
 *   get:
 *     summary: Listar informes asignados a un técnico
 *     tags: [Informes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del técnico
 *         schema:
 *           type: integer
 *           example: 3
 *     responses:
 *       200:
 *         description: Informes encontrados
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               informes:
 *                 - id_informe: 5
 *                   texto: Informe 1
 *                   tipo: Correctivo
 *                   id_incidencia: 10
 *                   id_tecnico: 3
 *       404:
 *         description: Técnico no encontrado o sin informes
 *       401:
 *         description: JWT inválido o no proporcionado
 */

/**
 * @swagger
 * /informe/todos:
 *   get:
 *     summary: Listar todos los informes (solo Admin/Jefe)
 *     tags: [Informes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Todos los informes
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               informes:
 *                 - id_informe: 5
 *                   texto: Informe 1
 *                   tipo: Correctivo
 *                   id_incidencia: 10
 *                   id_tecnico: 3
 *                 - id_informe: 6
 *                   texto: Informe 2
 *                   tipo: Preventivo
 *                   id_incidencia: 11
 *                   id_tecnico: 2
 *       403:
 *         description: Rol no autorizado
 *       401:
 *         description: JWT inválido o no proporcionado
 */

/**
 * @swagger
 * /informe/{id}:
 *   delete:
 *     summary: Eliminar un informe
 *     tags: [Informes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del informe
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Informe eliminado
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               msg: Informe eliminado
 *       403:
 *         description: Rol no autorizado
 *       404:
 *         description: Informe no encontrado
 */