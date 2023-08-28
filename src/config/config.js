import dotenv from "dotenv";
import Joi from "joi";

dotenv.config();

const dbUrl = process.env.MONGODB_URL;
const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const db = process.env.MONGODB_DATABASE;
const dbConnect = dbUrl
  .replace("<username>", dbUser)
  .replace("<password>", dbPassword)
  .replace("<database>", db);

const configSchema = {
  appName: Joi.string().default("MyPlantNote"),
  port: Joi.number().default(5000),
  secret: Joi.string().default("my_secret"),
  db: Joi.object().keys({
    url: Joi.string(),
    username: Joi.string(),
    password: Joi.string(),
    database: Joi.string(),
    connect: Joi.string(),
  }),
};

const config = {
  appName: process.env.APP_NAME ? process.env.APP_NAME : "MyPlantNote",
  port: process.env.PORT ? process.env.PORT : 5000,
  secret: process.env.MY_SECRET ? process.env.MY_SECRET : "my_secret",
  db: {
    url: dbUrl,
    username: dbUser,
    password: dbPassword,
    connect: dbConnect,
    database: db,
  },
};

const { err, value } = Joi.valid(config, configSchema);
if (err) {
  throw new Error(`Config validation error: ${err.message}`);
}

export default config;
