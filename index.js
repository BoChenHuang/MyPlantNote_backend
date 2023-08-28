import app from "./src/config/express";
import config from "./src/config/config";
import { Database } from "./src/database/database";

Database.connect();

const port = config.port;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
