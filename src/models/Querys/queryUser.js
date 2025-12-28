const queries = {
    crearUsuario:`
        INSERT INTO usuarios (nombre_completo, correo, contrasenia_hash, fecha_ingreso, id_rol)
        SELECT
        $1,
        $2,
        $3,
        CURRENT_DATE,
        r.id_rol
        FROM roles r
        WHERE r.nombre = $4
        RETURNING *;
    `,
    actualizarUsuarioById:`
        UPDATE usuarios
        SET nombre_completo = $1, correo = $2, contrasenia_hash = $3, id_rol = (SELECT id_rol FROM roles WHERE nombre = $4)
        WHERE id_usuario = $5
        RETURNING *;
    `,
    todoLosUserMenosYo:`
        SELECT u.id_usuario, u.nombre_completo, u.correo, r.nombre AS rol_nombre
        FROM usuarios u
        INNER JOIN roles r ON u.id_rol = r.id_rol
        WHERE u.id_usuario <> $1;
    `,
     eliminarUserById_chat: `
        DELETE FROM chat_mensajes WHERE id_usuario = $1;
    `,
    eliminarUserById_notificaciones: `
        DELETE FROM notificaciones WHERE id_usuario = $1;
    `,
    eliminarUserById_informes: `
        DELETE FROM informes WHERE id_tecnico = $1;
    `,
    eliminarUserById_incidencias: `
        DELETE FROM incidencias 
        WHERE id_usuario_creador = $1 
           OR id_tecnico = $1 
           OR id_jefe = $1;
    `,
    eliminarUserByEmail:`
        DELETE 
        FROM usuarios
        WHERE correo = $1
        RETURNING *;
    `,
    obetenerRoles:`
        SELECT *
        FROM roles
    `,
    queRol:`
        SELECT *
        FROM roles
        WHERE nombre = $1;
    `,
    queRolID:`
        SELECT *
        FROM roles
        WHERE id_rol = $1;
    `,
    buscarUser:`
        SELECT *
        FROM usuarios
        WHERE id_usuario = $1
    `,
    correoExiste:`
        SELECT * 
        FROM usuarios 
        WHERE correo = $1
    `
};

module.exports = queries;