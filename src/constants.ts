const dotenv = require("dotenv");
dotenv.config();

export const __prod__ = process.env.NODE_ENV === "production";

export const __db_user__ = process.env.DB_USER;
export const __db_pwd__ = process.env.DB_PWD;
