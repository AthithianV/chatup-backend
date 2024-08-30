import swaggerJSDoc from "swagger-jsdoc"


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "ChatUp",
            version: "1.0.0",
            description: "API for a Chatting Application",
        },
        servers:{
            url: "http://localhost:3000",
        }
    },
    apis: ["./src/features/**/*.ts"],
}

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;