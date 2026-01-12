--DELETES PARA CREAR LAS TABLAS
DROP TABLE IF EXISTS notificaciones;
DROP TABLE IF EXISTS chat_mensajes;
DROP TABLE IF EXISTS mantenimientos;
DROP TABLE IF EXISTS informes;
DROP TABLE IF EXISTS incidencias;
DROP TABLE IF EXISTS incidencia_archivos;
DROP TABLE IF EXISTS maquinas;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS estados_mantenimiento;
DROP TABLE IF EXISTS estados_maquina;
DROP TABLE IF EXISTS prioridades_incidencia;
DROP TABLE IF EXISTS estados_incidencia;
DROP TABLE IF EXISTS roles;

-- TABLAS PARA CREAR BASE DE DATOS

CREATE TABLE roles (
    id_rol SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE estados_incidencia (
    id_estado_incidencia SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE prioridades_incidencia (
    id_prioridad_incidencia SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    nivel INTEGER NOT NULL
);

CREATE TABLE estados_maquina (
    id_estado_maquina SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE estados_mantenimiento (
    id_estado_mantenimiento SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre_completo VARCHAR(150) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    contrasenia_hash VARCHAR(255) NOT NULL,
    fecha_ingreso DATE NOT NULL,

    activo BOOLEAN DEFAULT true,
    fecha_baja TIMESTAMP,

    id_rol INTEGER NOT NULL,

    CONSTRAINT fk_usuarios_roles
        FOREIGN KEY (id_rol)
        REFERENCES roles(id_rol)
);

CREATE TABLE maquinas (
    id_maquina SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    modelo VARCHAR(100),
    prioridad_cliente TEXT,
    id_estado_maquina INTEGER NOT NULL,
    id_usuario INTEGER,

    CONSTRAINT fk_maquinas_estado
        FOREIGN KEY (id_estado_maquina)
        REFERENCES estados_maquina(id_estado_maquina),

    CONSTRAINT fk_maquinas_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
        ON DELETE SET NULL
);

CREATE TABLE incidencias (
    id_incidencia SERIAL PRIMARY KEY,
    titulo VARCHAR(80) NOT NULL,
    descripcion TEXT NOT NULL,
    foto_url TEXT,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    id_maquina INTEGER NOT NULL,
    id_usuario_creador INTEGER NOT NULL,
    id_tecnico INTEGER,
    id_jefe INTEGER,

    id_estado_incidencia INTEGER NOT NULL DEFAULT 1,
    id_prioridad_incidencia INTEGER,

    CONSTRAINT fk_incidencias_maquina
        FOREIGN KEY (id_maquina)
        REFERENCES maquinas(id_maquina),

    CONSTRAINT fk_incidencias_creador
        FOREIGN KEY (id_usuario_creador)
        REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE,

    CONSTRAINT fk_incidencias_tecnico
        FOREIGN KEY (id_tecnico)
        REFERENCES usuarios(id_usuario)
        ON DELETE SET NULL,

    CONSTRAINT fk_incidencias_jefe
        FOREIGN KEY (id_jefe)
        REFERENCES usuarios(id_usuario)
        ON DELETE SET NULL,

    CONSTRAINT fk_incidencias_estado
        FOREIGN KEY (id_estado_incidencia)
        REFERENCES estados_incidencia(id_estado_incidencia),

    CONSTRAINT fk_incidencias_prioridad
        FOREIGN KEY (id_prioridad_incidencia)
        REFERENCES prioridades_incidencia(id_prioridad_incidencia)
);

CREATE TABLE incidencia_archivos (
    id_archivo SERIAL PRIMARY KEY,
    id_incidencia INTEGER NOT NULL,
    url TEXT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    nombre_original TEXT,
    tamano BIGINT,
    creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_archivos_incidencia
        FOREIGN KEY (id_incidencia)
        REFERENCES incidencias(id_incidencia)
        ON DELETE CASCADE
);

CREATE TABLE informes (
    id_informe SERIAL PRIMARY KEY,
    texto TEXT NOT NULL,
    tipo VARCHAR(50),
    fecha DATE NOT NULL,
    id_incidencia INTEGER NOT NULL,
    id_tecnico INTEGER,

    CONSTRAINT fk_informes_incidencia
        FOREIGN KEY (id_incidencia)
        REFERENCES incidencias(id_incidencia)
        ON DELETE CASCADE,

    CONSTRAINT fk_informes_tecnico
        FOREIGN KEY (id_tecnico)
        REFERENCES usuarios(id_usuario)
        ON DELETE SET NULL
);
CREATE TABLE mantenimientos (
    id_mantenimiento SERIAL PRIMARY KEY,
    periodo VARCHAR(50),
    frecuencia VARCHAR(50),
    genera_incidencia BOOLEAN DEFAULT false,
    id_estado INTEGER NOT NULL,

    id_maquina INTEGER NOT NULL,
    id_jefe INTEGER,

    CONSTRAINT fk_mantenimiento_estado
        FOREIGN KEY (id_estado)
        REFERENCES estados_mantenimiento(id_estado_mantenimiento),

    CONSTRAINT fk_mantenimientos_maquina
        FOREIGN KEY (id_maquina)
        REFERENCES maquinas(id_maquina)
        ON DELETE CASCADE,

    CONSTRAINT fk_mantenimientos_jefe
        FOREIGN KEY (id_jefe)
        REFERENCES usuarios(id_usuario)
        ON DELETE SET NULL
);
CREATE TABLE chat_mensajes (
    id_mensaje SERIAL PRIMARY KEY,
    contenido TEXT NOT NULL,
    enviado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_usuario INTEGER NOT NULL,

    CONSTRAINT fk_chat_mensajes_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE
);
CREATE TABLE notificaciones (
    id_notificacion SERIAL PRIMARY KEY,
    tipo VARCHAR(50),
    mensaje TEXT NOT NULL,
    leido BOOLEAN DEFAULT false,
    creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_usuario INTEGER NOT NULL,

    CONSTRAINT fk_notificaciones_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE
);
--INSERTS BASICOS:
-- Insert roles
INSERT INTO roles (nombre) VALUES ('Administrador');
INSERT INTO roles (nombre) VALUES ('Jefe');
INSERT INTO roles (nombre) VALUES ('Tecnico');
INSERT INTO roles (nombre) VALUES ('Cliente');

-- Insert estados_incidencia
INSERT INTO estados_incidencia (nombre) VALUES ('Enviada');
INSERT INTO estados_incidencia (nombre) VALUES ('Asignada/Abierta'); 
INSERT INTO estados_incidencia (nombre) VALUES ('En Pausa'); 
INSERT INTO estados_incidencia (nombre) VALUES ('En Proceso'); 
INSERT INTO estados_incidencia (nombre) VALUES ('Resuelta'); 
-- Insert prioridades_incidencia
INSERT INTO prioridades_incidencia (nombre, nivel) VALUES ('Alta',1);
INSERT INTO prioridades_incidencia (nombre, nivel) VALUES ('Media',2); 
INSERT INTO prioridades_incidencia (nombre, nivel) VALUES ('Baja',3); 
-- Insert estados_maquina
INSERT INTO estados_maquina (nombre) VALUES ('Funcionando');
INSERT INTO estados_maquina (nombre) VALUES ('Mantenimiento');
INSERT INTO estados_maquina (nombre) VALUES ('Averiado');
-- Insert estados_mantenimiento
INSERT INTO estados_mantenimiento (nombre) VALUES ('Programado');
INSERT INTO estados_mantenimiento (nombre) VALUES ('En proceso');
INSERT INTO estados_mantenimiento (nombre) VALUES ('Realizado');
INSERT INTO estados_mantenimiento (nombre) VALUES ('Aplazado');
