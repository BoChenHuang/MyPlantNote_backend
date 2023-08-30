const swaggerAutogen = require("swagger-autogen")();

const doc = {
    tags: [
        {
            name: "Plant",
            description: "植物管理"
        },
        {
            name: "User",
            description: "使用者功能"
        },
        {
            name: "Type",
            description: "植物類型設定"
        },
        {
            name: "Note",
            description: "筆記管理"
        },
        {
            name: "Article",
            description: "文章管理"
        },
        {
            name: "Picture",
            description: "照片管理"
        }
    ]
}

const outputFile = './swagger_output.json';
const endpointFiles = ['./src/config/express.js'];

swaggerAutogen(outputFile, endpointFiles, doc);