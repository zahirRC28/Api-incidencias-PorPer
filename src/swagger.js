const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Incidencias',
    version: '1.0.0',
    description: 'Documentación de la API para gestión de incidencias, máquinas y usuarios',
  },
  servers: [
    {
      url: 'http://localhost:3000/api/v1',
      description: 'Servidor local',
    },
    {
      url: 'https://api-incidencias-porper.onrender.com/api/v1',
      description: 'Servidor producción',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [
    './src/docs/*.swagger.js'
  ],
};

module.exports = swaggerJSDoc(options);