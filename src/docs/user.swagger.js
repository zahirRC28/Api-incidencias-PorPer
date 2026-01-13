/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de usuarios (crear, actualizar, eliminar, obtener, roles)
 */

/**
 * @swagger
 * /user/crear:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
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
 *               - correo
 *               - contrasenia
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Juan Pérez
 *               correo:
 *                 type: string
 *                 example: juan@email.com
 *               contrasenia:
 *                 type: string
 *                 example: Password123!
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               msg: Usuario creado
 *               id_usuario: 12
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             example:
 *               ok: false
 *               errores:
 *                 - msg: El nombre no puede estar vacío
 *       403:
 *         description: Rol no autorizado
 */

/**
 * @swagger
 * /user/actualizar/{id}:
 *   put:
 *     summary: Actualizar un usuario existente
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Juan Pérez
 *               correo:
 *                 type: string
 *                 example: juan@email.com
 *               contrasenia:
 *                 type: string
 *                 example: Password123!
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               msg: Usuario actualizado
 *       400:
 *         description: Datos inválidos
 *       403:
 *         description: Rol no autorizado
 */

/**
 * @swagger
 * /user/eliminar/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *                 example: juan@email.com
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               msg: Usuario eliminado
 *       400:
 *         description: Datos inválidos
 *       403:
 *         description: Rol no autorizado
 */

/**
 * @swagger
 * /user/usuario/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               usuario:
 *                 id_usuario: 5
 *                 nombre: Juan Pérez
 *                 correo: juan@email.com
 *                 rol: Administrador
 *                 estado: activo
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @swagger
 * /user/todosUsuarios/{id}:
 *   get:
 *     summary: Obtener todos los usuarios (Admin)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Lista de todos los usuarios
 *       403:
 *         description: Rol no autorizado
 */

/**
 * @swagger
 * /user/cambiarEstado/{id}:
 *   put:
 *     summary: Cambiar estado de un usuario (activo/inactivo)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Estado actualizado correctamente
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               msg: Estado cambiado a inactivo
 *       403:
 *         description: Rol no autorizado
 */

/**
 * @swagger
 * /user/todosRoles:
 *   get:
 *     summary: Obtener todos los roles existentes
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de roles
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               roles: ["Administrador","Jefe","Tecnico","Cliente"]
 *       403:
 *         description: Rol no autorizado
 */

/**
 * @swagger
 * /user/porUserRol:
 *   post:
 *     summary: Obtener usuarios filtrando por rol
 *     tags: [Usuarios]
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
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Tecnico
 *     responses:
 *       200:
 *         description: Usuarios filtrados por rol
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               usuarios:
 *                 - id_usuario: 2
 *                   nombre: Ana López
 *                   correo: ana@email.com
 *                   rol: Tecnico
 *       403:
 *         description: Rol no autorizado
 */