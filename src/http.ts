import express from "express";
import path from 'path';
import { router } from "./routes";
import { createServer } from "http";
import './database';
import { Server } from "socket.io";

const app = express();

app.use(express.json());

app.use(router);

app.use(express.static(path.join(__dirname, '..', 'public')));

app.set("views", path.join(__dirname, '..', 'public'));

app.engine("html", require('ejs').renderFile);

app.set("view engine", "html");

const http = createServer(app);
const io = new Server(http);

export { io, http };
