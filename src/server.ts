import express from "express";
import path from 'path';
import { router } from "./routes";
import './database';

const app = express();

const port = 3000;

app.use(express.json());

app.use(router);

app.use(express.static(path.join(__dirname, '..', 'public')));

app.set("views", path.join(__dirname, '..', 'public'));

app.engine("html", require('ejs').renderFile);

app.set("view engine", "html");

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
