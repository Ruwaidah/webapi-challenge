const express = require("express");

const server = express();
const projectsRouter = require("./Routers/projectRouter");
server.use(express.json());

//  custom middleware Logger
function logger(req, res, next) {
  console.log(`${req.method} to ${req.originalUrl}`);
  next();
}

// Home
server.get("/", (req, res) => {
  res.send(`<h1>Wellcome</h1>`);
});

server.use(logger);
server.use("/projects", projectsRouter);

module.exports = server;
