const queries = {
	crearIncidencia: `
		INSERT INTO incidencias (
			titulo,
			descripcion,
			foto_url,
			id_maquina,
			id_usuario_creador
		)
		VALUES($1, $2, $3, $4, $5)
		RETURNING *;
	`,
	obtenerIncidenciaById: `
		SELECT i.*,
		e.nombre AS estado_nombre,
		p.nombre AS prioridad_nombre,
		m.nombre AS maquina_nombre,

		u_creador.nombre_completo AS creador_nombre,
		u_tecnico.nombre_completo AS tecnico_nombre,
		u_jefe.nombre_completo AS jefe_nombre,

		COALESCE(
			json_agg(a.*) FILTER (WHERE a.id_archivo IS NOT NULL),
			'[]'
		) AS archivos

	FROM incidencias i
	INNER JOIN estados_incidencia e 
		ON i.id_estado_incidencia = e.id_estado_incidencia
	LEFT JOIN prioridades_incidencia p 
		ON i.id_prioridad_incidencia = p.id_prioridad_incidencia
	INNER JOIN maquinas m 
		ON i.id_maquina = m.id_maquina
	INNER JOIN usuarios u_creador 
		ON i.id_usuario_creador = u_creador.id_usuario
	LEFT JOIN usuarios u_tecnico 
		ON i.id_tecnico = u_tecnico.id_usuario
	LEFT JOIN usuarios u_jefe 
		ON i.id_jefe = u_jefe.id_usuario
	LEFT JOIN incidencia_archivos a 
		ON i.id_incidencia = a.id_incidencia
	WHERE i.id_incidencia = $1
	GROUP BY 
		i.id_incidencia,
		e.nombre,
		p.nombre,
		m.nombre,
		u_creador.nombre_completo,
		u_tecnico.nombre_completo,
		u_jefe.nombre_completo
	ORDER BY i.fecha_creacion DESC;
	`,
	//obtienes incidencias del usuario crear
	obtenerIncidenciasPorCreador: `
	SELECT i.*,
		e.nombre AS estado_nombre,
		p.nombre AS prioridad_nombre,
		m.nombre AS maquina_nombre,

		u_creador.nombre_completo AS creador_nombre,
		u_tecnico.nombre_completo AS tecnico_nombre,
		u_jefe.nombre_completo AS jefe_nombre,

		COALESCE(
			json_agg(a.*) FILTER (WHERE a.id_archivo IS NOT NULL),
			'[]'
		) AS archivos

	FROM incidencias i
	INNER JOIN estados_incidencia e 
		ON i.id_estado_incidencia = e.id_estado_incidencia
	LEFT JOIN prioridades_incidencia p 
		ON i.id_prioridad_incidencia = p.id_prioridad_incidencia
	INNER JOIN maquinas m 
		ON i.id_maquina = m.id_maquina
	INNER JOIN usuarios u_creador 
		ON i.id_usuario_creador = u_creador.id_usuario
	LEFT JOIN usuarios u_tecnico 
		ON i.id_tecnico = u_tecnico.id_usuario
	LEFT JOIN usuarios u_jefe 
		ON i.id_jefe = u_jefe.id_usuario
	LEFT JOIN incidencia_archivos a 
		ON i.id_incidencia = a.id_incidencia
	WHERE i.id_usuario_creador = $1
	GROUP BY 
		i.id_incidencia,
		e.nombre,
		p.nombre,
		m.nombre,
		u_creador.nombre_completo,
		u_tecnico.nombre_completo,
		u_jefe.nombre_completo
	ORDER BY i.fecha_creacion DESC;
	`,
	//cambiar por que falta ordernar por prioridad-----------------------------------------------
	//incidencias para el jefe y el admin
	obtenerTodasIncidencias: `
	SELECT i.*,
		e.nombre AS estado_nombre,
		p.nombre AS prioridad_nombre,
		m.nombre AS maquina_nombre,

		u_creador.nombre_completo AS creador_nombre,
		u_tecnico.nombre_completo AS tecnico_nombre,
		u_jefe.nombre_completo AS jefe_nombre,

		COALESCE(
			json_agg(a.*) FILTER (WHERE a.id_archivo IS NOT NULL),
			'[]'
		) AS archivos

	FROM incidencias i
	INNER JOIN estados_incidencia e 
		ON i.id_estado_incidencia = e.id_estado_incidencia
	LEFT JOIN prioridades_incidencia p 
		ON i.id_prioridad_incidencia = p.id_prioridad_incidencia
	INNER JOIN maquinas m 
		ON i.id_maquina = m.id_maquina
	INNER JOIN usuarios u_creador 
		ON i.id_usuario_creador = u_creador.id_usuario
	LEFT JOIN usuarios u_tecnico 
		ON i.id_tecnico = u_tecnico.id_usuario
	LEFT JOIN usuarios u_jefe 
		ON i.id_jefe = u_jefe.id_usuario
	LEFT JOIN incidencia_archivos a 
		ON i.id_incidencia = a.id_incidencia
	GROUP BY 
		i.id_incidencia,
		e.nombre,
		p.nombre,
		m.nombre,
		u_creador.nombre_completo,
		u_tecnico.nombre_completo,
		u_jefe.nombre_completo
	ORDER BY i.fecha_creacion DESC;
	`,
	//Actualizas luego las querys de los demas
	obtenerTodasIncidenciasOrdenPrioridad: `
		SELECT i.*, e.nombre AS estado_nombre, p.nombre AS prioridad_nombre, m.nombre AS maquina_nombre, u.nombre_completo AS creador_nombre, p.nivel AS prioridad_nivel
		FROM incidencias i
		INNER JOIN estados_incidencia e ON i.id_estado_incidencia = e.id_estado_incidencia
		INNER JOIN prioridades_incidencia p ON i.id_prioridad_incidencia = p.id_prioridad_incidencia
		INNER JOIN maquinas m ON i.id_maquina = m.id_maquina
		INNER JOIN usuarios u ON i.id_usuario_creador = u.id_usuario
		ORDER BY p.nivel ASC, i.fecha_creacion DESC;
	`,
	obtenerIncidenciasPorEstadoNombre: `
		SELECT i.*, e.nombre AS estado_nombre, p.nombre AS prioridad_nombre, m.nombre AS maquina_nombre
		FROM incidencias i
		INNER JOIN estados_incidencia e ON i.id_estado_incidencia = e.id_estado_incidencia
		INNER JOIN prioridades_incidencia p ON i.id_prioridad_incidencia = p.id_prioridad_incidencia
		INNER JOIN maquinas m ON i.id_maquina = m.id_maquina
		WHERE e.nombre = $1
		ORDER BY p.nivel ASC, i.fecha_creacion DESC;
	`,
	obtenerIncidenciasPorPrioridadNombre: `
		SELECT i.*, e.nombre AS estado_nombre, p.nombre AS prioridad_nombre, m.nombre AS maquina_nombre
		FROM incidencias i
		INNER JOIN estados_incidencia e ON i.id_estado_incidencia = e.id_estado_incidencia
		INNER JOIN prioridades_incidencia p ON i.id_prioridad_incidencia = p.id_prioridad_incidencia
		INNER JOIN maquinas m ON i.id_maquina = m.id_maquina
		WHERE p.nombre = $1
		ORDER BY i.fecha_creacion DESC;
	`,
	actualizarIncidenciaById: `
		UPDATE incidencias
		SET titulo = $1,
			descripcion = $2,
			foto_url = $3,
			id_maquina = $4,
			id_tecnico = $5,
			id_jefe = $6,
			id_estado_incidencia = (SELECT id_estado_incidencia FROM estados_incidencia WHERE nombre = $7),
			id_prioridad_incidencia = (SELECT id_prioridad_incidencia FROM prioridades_incidencia WHERE nombre = $8)
		WHERE id_incidencia = $9
		RETURNING *;
	`,
	actualizarFotoPrincipal: `
		UPDATE incidencias
		SET foto_url = $1
		WHERE id_incidencia = $2
		RETURNING *;
	`,
	eliminarIncidenciaById: `
		DELETE FROM incidencias
		WHERE id_incidencia = $1
		RETURNING *;
	`,
	cambiarEstadoIncidencia: `
		UPDATE incidencias
		SET id_estado_incidencia = (SELECT id_estado_incidencia FROM estados_incidencia WHERE nombre = $1)
		WHERE id_incidencia = $2
		RETURNING *;
	`,
	cambiarPrioridadIncidencia: `
		UPDATE incidencias
		SET id_prioridad_incidencia = (SELECT id_prioridad_incidencia FROM prioridades_incidencia WHERE nombre = $1)
		WHERE id_incidencia = $2
		RETURNING *;
	`,
	asignarTecnicoIncidencia: `
		UPDATE incidencias
		SET id_tecnico = $1
		WHERE id_incidencia = $2
		RETURNING *;
	`,
	asignarJefeIncidencia: `
		UPDATE incidencias
		SET id_jefe = $1
		WHERE id_incidencia = $2
		RETURNING *;
	`,
	obtenerTodosEstadosIncidencia:`
		SELECT *
		FROM estados_incidencia
		ORDER BY id_estado_incidencia;
	`,
	obtenerTodasPrioridadesIncidencia:`
		SELECT *
		FROM prioridades_incidencia
		ORDER BY id_prioridad_incidencia;
	`,
	incidenciasTecnico: `
		SELECT i.*, e.nombre AS estado_nombre, p.nombre AS prioridad_nombre, m.nombre AS maquina_nombre, u.nombre_completo AS creador_nombre
		FROM incidencias i
		INNER JOIN estados_incidencia e ON i.id_estado_incidencia = e.id_estado_incidencia
		INNER JOIN prioridades_incidencia p ON i.id_prioridad_incidencia = p.id_prioridad_incidencia
		INNER JOIN maquinas m ON i.id_maquina = m.id_maquina
		INNER JOIN usuarios u ON i.id_usuario_creador = u.id_usuario
		WHERE i.id_tecnico = $1
		ORDER BY i.fecha_creacion DESC;
		
	`,
	incidenciasJefe: `
		SELECT i.*, e.nombre AS estado_nombre, p.nombre AS prioridad_nombre, m.nombre AS maquina_nombre, u.nombre_completo AS creador_nombre
		FROM incidencias i
		INNER JOIN estados_incidencia e ON i.id_estado_incidencia = e.id_estado_incidencia
		INNER JOIN prioridades_incidencia p ON i.id_prioridad_incidencia = p.id_prioridad_incidencia
		INNER JOIN maquinas m ON i.id_maquina = m.id_maquina
		INNER JOIN usuarios u ON i.id_usuario_creador = u.id_usuario
		WHERE i.id_jefe = $1
		ORDER BY i.fecha_creacion DESC;
	`
};
module.exports = queries