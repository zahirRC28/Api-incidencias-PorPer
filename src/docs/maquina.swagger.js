/**
 * @swagger
 * tags:
 *   name: Maquinas
 *   description: Gestión de máquinas (crear, actualizar, listar, eliminar, estados)
 */

/**
 * @swagger
 * /maquina/crear:
 *   post:
 *     summary: Crear una nueva máquina
 *     tags: [Maquinas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - modelo
 *               - id_usuario
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: CNC-01
 *               modelo:
 *                 type: string
 *                 example: MX500
 *               prioridad_cliente:
 *                 type: string
 *                 example: muy urgente
 *               id_usuario:
 *                 type: integer
 *                 example: 4
 *     responses:
 *       201:
 *         description: Máquina creada correctamente
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               msg: Máquina creada
 *               id_maquina: 10
 *       400:
 *         description: Datos inválidos
 *       403:
 *         description: Rol no autorizado
 */

/**
 * @swagger
 * /maquina/actualizar/{id}:
 *   put:
 *     summary: Actualizar una máquina existente
 *     tags: [Maquinas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 10
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: CNC-01
 *               modelo:
 *                 type: string
 *                 example: MX500
 *               estado_nombre:
 *                 type: string
 *                 example: activo
 *               prioridad_cliente:
 *                 type: string
 *                 example: alta
 *               id_usuario:
 *                 type: integer
 *                 example: 4
 *     responses:
 *       200:
 *         description: Máquina actualizada correctamente
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               msg: Máquina actualizada
 *       400:
 *         description: Datos inválidos
 *       403:
 *         description: Rol no autorizado
 */

/**
 * @swagger
 * /maquina/maquina/{id}:
 *   get:
 *     summary: Obtener una máquina por ID
 *     tags: [Maquinas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Máquina encontrada
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               maquina:
 *                 id_maquina: 10
 *                 nombre: CNC-01
 *                 modelo: MX500
 *                 prioridad_cliente: muy urgente
 *                 estado: activo
 *                 id_usuario: 4
 *       404:
 *         description: Máquina no encontrada
 */

/**
 * @swagger
 * /maquina/todas:
 *   get:
 *     summary: Listar todas las máquinas
 *     tags: [Maquinas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas las máquinas
 *       403:
 *         description: Rol no autorizado
 */

/**
 * @swagger
 * /maquina/porUsuario/{id}:
 *   get:
 *     summary: Listar máquinas por usuario
 *     tags: [Maquinas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 4
 *     responses:
 *       200:
 *         description: Máquinas filtradas por usuario
 *       403:
 *         description: Rol no autorizado
 */

/**
 * @swagger
 * /maquina/porEstado/{nombre}:
 *   get:
 *     summary: Listar máquinas por estado
 *     tags: [Maquinas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *           example: activo
 *     responses:
 *       200:
 *         description: Máquinas filtradas por estado
 *       403:
 *         description: Rol no autorizado
 */

/**
 * @swagger
 * /maquina/eliminar/{id}:
 *   delete:
 *     summary: Eliminar una máquina
 *     tags: [Maquinas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Máquina eliminada correctamente
 *       403:
 *         description: Rol no autorizado
 */

/**
 * @swagger
 * /maquina/estados:
 *   get:
 *     summary: Obtener todos los estados posibles de máquinas
 *     tags: [Maquinas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de estados de máquina
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               estados: ["activo", "inactivo", "mantenimiento"]
 *       403:
 *         description: Rol no autorizado
 */

/**
 * @swagger
 * /maquina/{id}/estado:
 *   put:
 *     summary: Cambiar estado de una máquina
 *     tags: [Maquinas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 10
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
 *                 example: inactivo
 *     responses:
 *       200:
 *         description: Estado de máquina actualizado correctamente
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               msg: Estado cambiado a inactivo
 *       403:
 *         description: Rol no autorizado
 */