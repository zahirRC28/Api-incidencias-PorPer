/**
 * @swagger
 * tags:
 *   name: Mantenimientos
 *   description: Gestión de mantenimientos de máquinas
 */

/**
 * @swagger
 * /mantenimiento/crear:
 *   post:
 *     summary: Crear un nuevo mantenimiento
 *     tags: [Mantenimientos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - periodo
 *               - frecuencia
 *               - estado_nombre
 *               - id_maquina
 *             properties:
 *               periodo:
 *                 type: string
 *                 example: Mensual
 *               frecuencia:
 *                 type: string
 *                 example: Cada 30 días
 *               genera_incidencia:
 *                 type: boolean
 *                 example: true
 *               estado_nombre:
 *                 type: string
 *                 example: Pendiente
 *               id_maquina:
 *                 type: integer
 *                 example: 10
 *               id_jefe:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Mantenimiento creado correctamente
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               msg: Mantenimiento creado
 *               mantenimiento:
 *                 id_mantenimiento: 5
 *                 periodo: Mensual
 *                 frecuencia: Cada 30 días
 *                 genera_incidencia: true
 *                 estado_nombre: Pendiente
 *                 id_maquina: 10
 *                 id_jefe: 3
 *       400:
 *         description: Error de validación
 *       401:
 *         description: JWT inválido o no proporcionado
 */

/**
 * @swagger
 * /mantenimiento/actualizar/{id}:
 *   put:
 *     summary: Actualizar un mantenimiento existente
 *     tags: [Mantenimientos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del mantenimiento a actualizar
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
 *               - periodo
 *               - frecuencia
 *               - estado_nombre
 *               - id_maquina
 *             properties:
 *               periodo:
 *                 type: string
 *                 example: Semanal
 *               frecuencia:
 *                 type: string
 *                 example: Cada 7 días
 *               genera_incidencia:
 *                 type: boolean
 *                 example: false
 *               estado_nombre:
 *                 type: string
 *                 example: En progreso
 *               id_maquina:
 *                 type: integer
 *                 example: 10
 *               id_jefe:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Mantenimiento actualizado correctamente
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               msg: Mantenimiento actualizado
 *               mantenimiento:
 *                 id_mantenimiento: 5
 *                 periodo: Semanal
 *                 frecuencia: Cada 7 días
 *                 genera_incidencia: false
 *                 estado_nombre: En progreso
 *                 id_maquina: 10
 *                 id_jefe: 3
 *       400:
 *         description: Error de validación
 *       401:
 *         description: JWT inválido o no proporcionado
 */

/**
 * @swagger
 * /mantenimiento/{id}:
 *   get:
 *     summary: Obtener un mantenimiento por ID
 *     tags: [Mantenimientos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del mantenimiento
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Mantenimiento encontrado
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               mantenimiento:
 *                 id_mantenimiento: 5
 *                 periodo: Mensual
 *                 frecuencia: Cada 30 días
 *                 genera_incidencia: true
 *                 estado_nombre: Pendiente
 *                 id_maquina: 10
 *                 id_jefe: 3
 *       404:
 *         description: Mantenimiento no encontrado
 *       401:
 *         description: JWT inválido o no proporcionado
 */

/**
 * @swagger
 * /mantenimiento/todos:
 *   get:
 *     summary: Listar todos los mantenimientos
 *     tags: [Mantenimientos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Todos los mantenimientos
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               mantenimientos:
 *                 - id_mantenimiento: 5
 *                   periodo: Mensual
 *                   frecuencia: Cada 30 días
 *                   genera_incidencia: true
 *                   estado_nombre: Pendiente
 *                   id_maquina: 10
 *                   id_jefe: 3
 *                 - id_mantenimiento: 6
 *                   periodo: Semanal
 *                   frecuencia: Cada 7 días
 *                   genera_incidencia: false
 *                   estado_nombre: En progreso
 *                   id_maquina: 11
 *                   id_jefe: 2
 *       401:
 *         description: JWT inválido o no proporcionado
 */

/**
 * @swagger
 * /mantenimiento/porMaquina/{id}:
 *   get:
 *     summary: Listar mantenimientos de una máquina
 *     tags: [Mantenimientos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la máquina
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Mantenimientos encontrados
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               mantenimientos:
 *                 - id_mantenimiento: 5
 *                   periodo: Mensual
 *                   frecuencia: Cada 30 días
 *                   genera_incidencia: true
 *                   estado_nombre: Pendiente
 *                   id_maquina: 10
 *                   id_jefe: 3
 *       404:
 *         description: Máquina no encontrada o sin mantenimientos
 *       401:
 *         description: JWT inválido o no proporcionado
 */

/**
 * @swagger
 * /mantenimiento/{id}:
 *   delete:
 *     summary: Eliminar un mantenimiento
 *     tags: [Mantenimientos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del mantenimiento
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Mantenimiento eliminado
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               msg: Mantenimiento eliminado
 *       403:
 *         description: Rol no autorizado
 *       404:
 *         description: Mantenimiento no encontrado
 */

/**
 * @swagger
 * /mantenimiento/estados:
 *   get:
 *     summary: Listar todos los estados posibles de mantenimiento
 *     tags: [Mantenimientos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estados disponibles
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               estados: ["Pendiente","En progreso","Completado"]
 */

/**
 * @swagger
 * /mantenimiento/{id}/estado:
 *   put:
 *     summary: Cambiar el estado de un mantenimiento
 *     tags: [Mantenimientos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del mantenimiento
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
 *               - estado_nombre
 *             properties:
 *               estado_nombre:
 *                 type: string
 *                 example: Completado
 *     responses:
 *       200:
 *         description: Estado actualizado
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               msg: Estado actualizado
 *       400:
 *         description: Error de validación
 *       401:
 *         description: JWT inválido o no proporcionado
 */