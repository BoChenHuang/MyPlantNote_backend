import mongoose from "mongoose";
import config from "../config/config";

const dbConnectUrl = config.db.connect;

export const Database = {
  connect: () => {
    mongoose
      .connect(dbConnectUrl)
      .then(() => console.log("Database is connected."))
      .catch((err) => console.log(err));
  },
};
