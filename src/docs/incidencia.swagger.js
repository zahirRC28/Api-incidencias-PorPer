/**
 * @swagger
 * /incidencia/crear:
 *   post:
 *     summary: Crear una incidencia
 *     tags: [Incidencias]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descripcion
 *               - id_maquina
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Error en la máquina CNC
 *               descripcion:
 *                 type: string
 *                 example: La máquina no arranca al encender
 *               id_maquina:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Incidencia creada correctamente
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               msg: Incidencia creada
 *               id_incidencia: 12
 *       400:
 *         description: Datos incorrectos
 *         content:
 *           application/json:
 *             example:
 *               ok: false
 *               errores:
 *                 - msg: El título es obligatorio
 *       403:
 *         description: No autorizado por rol
 */
/**
 * @swagger
 * /incidencia/mias:
 *   get:
 *     summary: Obtener mis incidencias
 *     tags: [Incidencias]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de incidencias del usuario
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               incidencias:
 *                 - id_incidencia: 1
 *                   titulo: Error eléctrico
 *                   estado: Abierta
 *       401:
 *         description: Token no válido
 */
/**
 * @swagger
 * /incidencia/todas:
 *   get:
 *     summary: Obtener todas las incidencias
 *     tags: [Incidencias]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista completa de incidencias
 *       403:
 *         description: Rol no autorizado
 */
/**
 * @swagger
 * /incidencia/{id}:
 *   get:
 *     summary: Obtener una incidencia por ID
 *     tags: [Incidencias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     responses:
 *       200:
 *         description: Incidencia encontrada
 *         content:
 *           application/json:
 *             example:
 *               id_incidencia: 5
 *               titulo: Fuga hidráulica
 *               estado: En proceso
 *       404:
 *         description: Incidencia no encontrada
 */
/**
 * @swagger
 * /incidencia/{id}:
 *   put:
 *     summary: Actualizar una incidencia
 *     tags: [Incidencias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             titulo: Fuga hidráulica grave
 *             descripcion: Aumentó la fuga de aceite
 *             id_maquina: 2
 *             estado_nombre: En proceso
 *             prioridad_nombre: Alta
 *     responses:
 *       200:
 *         description: Incidencia actualizada
 *       400:
 *         description: Datos inválidos
 */
/**
 * @swagger
 * /incidencia/{id}/estado:
 *   put:
 *     summary: Cambiar estado de la incidencia
 *     tags: [Incidencias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             estado_nombre: Cerrada
 *     responses:
 *       200:
 *         description: Estado actualizado
 */
/**
 * @swagger
 * /incidencia/{id}/asignar-tecnico:
 *   put:
 *     summary: Asignar técnico a una incidencia
 *     tags: [Incidencias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             id_tecnico: 7
 *     responses:
 *       200:
 *         description: Técnico asignado
 */
/**
 * @swagger
 * /incidencia/{id}/asignar-jefe:
 *   put:
 *     summary: Asignar jefe a una incidencia
 *     tags: [Incidencias]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             id_jefe: 2
 *     responses:
 *       200:
 *         description: Jefe asignado
 */

/**
 * @swagger
 * /incidencia/todas/estados:
 *   get:
 *     summary: Obtener todos los estados de incidencia
 *     tags: [Incidencias]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de estados
 */

/**
 * @swagger
 * /incidencia/todas/prioridades:
 *   get:
 *     summary: Obtener todas las prioridades
 *     tags: [Incidencias]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de prioridades
 */