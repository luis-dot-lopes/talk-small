import express from "express";
import path from 'path';
import { router } from "./routes";
import { createServer } from "http";
import './database';
import { Server } from "socket.io";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header({ "Access-Control-Allow-Origin": "http://localhost:3000",
   "Access-Control-Allow-Headers": "*" });
  next();
});

app.use(router);

app.use(express.static(path.join(__dirname, '..', 'public')));

app.set("views", path.join(__dirname, '..', 'public'));

app.engine("html", require('ejs').renderFile);

app.set("view engine", "html");

const http = createServer(app);
const io = new Server(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }
});

io.on("connection", socket => {
    console.log("User connected");
});

export { io, http };
