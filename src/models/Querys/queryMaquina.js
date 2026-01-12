const queries = {
	crearMaquina: `
		INSERT INTO maquinas (nombre, modelo, prioridad_cliente, id_estado_maquina, id_usuario)
		SELECT
		$1,
		$2,
		$3,
		e.id_estado_maquina,
		$5
		FROM estados_maquina e
		WHERE e.nombre = $4
		RETURNING *;
	`,
	actualizarMaquinaById: `
		UPDATE maquinas
		SET nombre = $1,
			modelo = $2,
			prioridad_cliente = $3,
			id_estado_maquina = (SELECT id_estado_maquina FROM estados_maquina WHERE nombre = $4),
			id_usuario = $5
		WHERE id_maquina = $6
		RETURNING *;
	`,
	obtenerMaquinaById: `
		SELECT m.*, e.nombre AS estado_nombre, u.nombre_completo AS usuario_nombre
		FROM maquinas m
		INNER JOIN estados_maquina e ON m.id_estado_maquina = e.id_estado_maquina
		LEFT JOIN usuarios u ON m.id_usuario = u.id_usuario
		WHERE m.id_maquina = $1;
	`,
    //esto es para el admin
	obtenerTodasMaquinas: `
		SELECT m.*, e.nombre AS estado_nombre, u.nombre_completo AS usuario_nombre
		FROM maquinas m
		INNER JOIN estados_maquina e ON m.id_estado_maquina = e.id_estado_maquina
		LEFT JOIN usuarios u ON m.id_usuario = u.id_usuario
		ORDER BY m.id_maquina DESC;
	`,
    //por el usuario que creo
	obtenerMaquinasPorUsuario: `
		SELECT m.*, e.nombre AS estado_nombre
		FROM maquinas m
		INNER JOIN estados_maquina e ON m.id_estado_maquina = e.id_estado_maquina
		WHERE m.id_usuario = $1
		ORDER BY m.id_maquina DESC;
	`,
	obtenerMaquinasPorEstadoNombre: `
		SELECT m.*, e.nombre AS estado_nombre, u.nombre_completo AS usuario_nombre
		FROM maquinas m
		INNER JOIN estados_maquina e ON m.id_estado_maquina = e.id_estado_maquina
		LEFT JOIN usuarios u ON m.id_usuario = u.id_usuario
		WHERE e.nombre = $1
		ORDER BY m.id_maquina DESC;
	`,
    
	eliminarMaquinaById: `
		DELETE FROM maquinas
		WHERE id_maquina = $1
		RETURNING *;
	`,
    //todo los estado
	obtenerEstadosMaquina: `
		SELECT * 
        FROM estados_maquina 
        ORDER BY id_estado_maquina;
	`,
	cambiarEstadoMaquina:`
		UPDATE maquinas
		SET id_estado_maquina = (SELECT id_estado_maquina FROM estados_maquina WHERE nombre = $1)
		WHERE id_maquina = $2
		RETURNING *;
	`
};
module.exports = queries;
