import express from "express";
import { readFile } from "fs/promises";
import cors from "cors";
import body_parser from "body-parser";
const { json, urlencoded } = body_parser;
const packageJson = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url))
);

import authRoutes from "./server/routes/authRoutes.js";

const app = express();
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(json({ limit: "50mb" }));
app.use(
  urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
const port = process.env.PORT || 5500;

app.use("/api/v1/auth", authRoutes);

// when a random route is inputed
app.get("*", (req, res) =>
  res.status(200).send({
    message: `Welcome to URL_SHORTNER up and running on version : ${packageJson.version}`,
  })
);

const server = app.listen(port, () => {
  console.log(
    `Server is running on PORT ${port} and version: ${packageJson.version}`
  );
});

server.timeout = 240000;

export default app;
