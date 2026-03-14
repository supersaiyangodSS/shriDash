import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Temple management api",
            version: "1.0.0",
            description: "API documentation for temple management system"
        },
        components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
        servers: [
            {
                url: "http://localhost:4001/api/",
            }
        ]
    },
    apis: ["./src/modules/**/*.ts"]
}

export const swaggerSpec = swaggerJSDoc(options);