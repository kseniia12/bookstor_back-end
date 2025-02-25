import * as express from "express";
import "./src/types/requestOverride";
import { appDataSource } from "./src/db/dataSource";
import allRouter from "./src/routes/allRoutes";
import config from "./src/config/config";
import corsMiddlewareWrapper from "./src/middlewares/corsMiddleware";
import { errorHandler } from "./src/utils/errorHandler";
import * as path from "path";

const app = express();

const initializeDatabase = async () => {
  try {
    await appDataSource.initialize();
    console.log("Connected to db");
  } catch (error) {
    console.log(error);
  }
};

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use(corsMiddlewareWrapper);

app.use(express.urlencoded({ extended: true }));

app.use(allRouter);

app.use(errorHandler);

initializeDatabase();

app.listen(config.server.port, function () {
  console.log("Сервер подключен");
});
