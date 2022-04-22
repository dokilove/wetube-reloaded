import express from "express";
import { route } from "express/lib/application";

const PORT = 4000;

const app = express();

const routerLogger = (req, res, next) => {
  console.log("PATH", req.path);
  next();
};

const methodLogger = (req, res, next) => {
  console.log("METHOD", req.method);
  next();
};

const home = (req, res) => {
  console.log("I will respond");
  return res.send("<h1>Hello</h1>");
};

const login = (req, res) => {
  return res.send("<h2>login</h2>");
};

app.use(methodLogger, routerLogger);
app.get("/", home);
app.get("/login", login);

const handleListening = () =>
  console.log(`Server listening on http://localhost:${PORT}`);

app.listen(PORT, handleListening);
