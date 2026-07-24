const express = require("express");
const cors = require("cors");
const http = require("http");
const routes = require("./routes");
require("dotenv/config");

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "empresaId"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

app.use(express.json());
app.use(routes);

const server = http.createServer(app);

const port = process.env.PORT || 3333;

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}...`);
});