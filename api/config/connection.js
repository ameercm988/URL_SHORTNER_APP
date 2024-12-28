//put these lines in a seperate file
import { createPool } from "mysql2";
import config from "./config.js";

const connection = createPool(config);

export default connection;
