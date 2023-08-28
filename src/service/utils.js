import jwt from "jsonwebtoken";
import config from "../config/config";

export const verifyToken = async (token) => {
  if (!token) return {};
  return new Promise((resolve, reject) =>
    jwt.verify(token, config.secret, (err, decoded) =>
      err ? reject(err) : resolve(decoded)
    )
  );
};
