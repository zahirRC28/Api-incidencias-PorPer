const queries = {
    crearArchivoIncidencia: `
		INSERT INTO incidencia_archivos (id_incidencia, url, mime_type, nombre_original, tamano)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING *;
	`,
	obtenerArchivosPorIncidencia: `
		SELECT *
		FROM incidencia_archivos
		WHERE id_incidencia = $1
		ORDER BY creado DESC;
	`,
	eliminarArchivoById: `
		DELETE FROM incidencia_archivos
		WHERE id_archivo = $1
		RETURNING *;
	`
}
module.exports = queries;