const queries = {
	crearMantenimiento: `
		INSERT INTO mantenimientos (periodo, frecuencia, genera_incidencia, id_estado, id_maquina, id_jefe)
		SELECT
		$1,
		$2,
		$3,
		em.id_estado_mantenimiento,
		$5,
		$6
		FROM estados_mantenimiento em
		WHERE em.nombre = $4
		RETURNING *;
	`,
	actualizarMantenimientoById: `
		UPDATE mantenimientos
		SET periodo = $1,
			frecuencia = $2,
			genera_incidencia = $3,
			id_estado = (SELECT id_estado_mantenimiento FROM estados_mantenimiento WHERE nombre = $4),
			id_maquina = $5,
			id_jefe = $6
		WHERE id_mantenimiento = $7
		RETURNING *;
	`,
	obtenerMantenimientoById: `
		SELECT m.*, em.nombre AS estado_nombre, maq.nombre AS maquina_nombre, u.nombre_completo AS jefe_nombre
		FROM mantenimientos m
		INNER JOIN estados_mantenimiento em ON m.id_estado = em.id_estado_mantenimiento
		INNER JOIN maquinas maq ON m.id_maquina = maq.id_maquina
		LEFT JOIN usuarios u ON m.id_jefe = u.id_usuario
		WHERE m.id_mantenimiento = $1;
	`,
	obtenerTodosMantenimientos: `
		SELECT m.*, em.nombre AS estado_nombre, maq.nombre AS maquina_nombre, u.nombre_completo AS jefe_nombre
		FROM mantenimientos m
		INNER JOIN estados_mantenimiento em ON m.id_estado = em.id_estado_mantenimiento
		INNER JOIN maquinas maq ON m.id_maquina = maq.id_maquina
		LEFT JOIN usuarios u ON m.id_jefe = u.id_usuario
		ORDER BY m.id_mantenimiento DESC;
	`,
	obtenerMantenimientosPorMaquina: `
		SELECT m.*, em.nombre AS estado_nombre
		FROM mantenimientos m
		INNER JOIN estados_mantenimiento em ON m.id_estado = em.id_estado_mantenimiento
		WHERE m.id_maquina = $1
		ORDER BY m.id_mantenimiento DESC;
	`,
	eliminarMantenimientoById: `
		DELETE FROM mantenimientos
		WHERE id_mantenimiento = $1
		RETURNING *;
	`,
	obtenerEstadosMantenimiento: `
		SELECT * FROM estados_mantenimiento ORDER BY id_estado_mantenimiento;
	`,
	cambiarEstadoMantenimiento: `
		UPDATE mantenimientos
		SET id_estado = (SELECT id_estado_mantenimiento FROM estados_mantenimiento WHERE nombre = $1)
		WHERE id_mantenimiento = $2
		RETURNING *;
	`
};
module.exports = queries;
