const queries = {
	crearInforme: `
		INSERT INTO informes (texto, tipo, fecha, id_incidencia, id_tecnico)
		VALUES ($1, $2, CURRENT_DATE, $3, $4)
		RETURNING *;
	`,
	actualizarInformeById: `
		UPDATE informes
		SET texto = $1,
			tipo = $2,
			fecha = $3,
			id_incidencia = $4,
			id_tecnico = $5
		WHERE id_informe = $6
		RETURNING *;
	`,
	obtenerInformeById: `
		SELECT i.*, inc.descripcion AS incidencia_descripcion, u.nombre_completo AS tecnico_nombre
		FROM informes i
		INNER JOIN incidencias inc ON i.id_incidencia = inc.id_incidencia
		LEFT JOIN usuarios u ON i.id_tecnico = u.id_usuario
		WHERE i.id_informe = $1;
	`,
	obtenerInformesPorIncidencia: `
		SELECT i.*, u.nombre_completo AS tecnico_nombre
		FROM informes i
		LEFT JOIN usuarios u ON i.id_tecnico = u.id_usuario
		WHERE i.id_incidencia = $1
		ORDER BY i.fecha DESC;
	`,
	obtenerInformesPorTecnico: `
		SELECT i.*, inc.descripcion AS incidencia_descripcion
		FROM informes i
		INNER JOIN incidencias inc ON i.id_incidencia = inc.id_incidencia
		WHERE i.id_tecnico = $1
		ORDER BY i.fecha DESC;
	`,
	obtenerTodosInformes: `
		SELECT i.*, inc.descripcion AS incidencia_descripcion, u.nombre_completo AS tecnico_nombre
		FROM informes i
		INNER JOIN incidencias inc ON i.id_incidencia = inc.id_incidencia
		LEFT JOIN usuarios u ON i.id_tecnico = u.id_usuario
		ORDER BY i.fecha DESC;
	`,
	eliminarInformeById: `
		DELETE FROM informes
		WHERE id_informe = $1
		RETURNING *;
	`
};
module.exports = queries;
