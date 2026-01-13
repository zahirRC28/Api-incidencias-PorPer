/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticación y gestión de tokens JWT
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Autentica un usuario y devuelve un token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - correo
 *               - contrasenia
 *             properties:
 *               correo:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario
 *                 example: usuario@email.com
 *               contrasenia:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: Password123!
 *     responses:
 *       200:
 *         description: Login correcto
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *               usuario:
 *                 id_usuario: 4
 *                 nombre: Zahir Rivera
 *                 rol: Administrador
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             example:
 *               ok: false
 *               errores:
 *                 - msg: Tienes que escribir un correo
 *                   param: correo
 *                 - msg: Tienes que escribir una contraseña
 *                   param: contrasenia
 *       401:
 *         description: Credenciales incorrectas
 *         content:
 *           application/json:
 *             example:
 *               ok: false
 *               msg: Correo o contraseña incorrectos
 */

/**
 * @swagger
 * /auth/renovar:
 *   get:
 *     summary: Renovar token JWT
 *     description: Devuelve un nuevo token JWT válido
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token renovado correctamente
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Token inválido o no enviado
 *         content:
 *           application/json:
 *             example:
 *               ok: false
 *               msg: Token no válido
 */