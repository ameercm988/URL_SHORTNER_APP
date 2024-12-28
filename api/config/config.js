import { config as _config } from "dotenv";

_config();

let DBCONFG = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

export default DBCONFG;
