import express from "express";
import apiRouter from "../routes/api/api.route";
import bodyParser from "body-parser";
import cors from 'cors';
import morgan from "morgan";
import swaggerUiExpress from "swagger-ui-express";
import swaggerFile from "../../swagger_output.json";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", apiRouter);

app.use('/api-doc', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerFile));


export default app;