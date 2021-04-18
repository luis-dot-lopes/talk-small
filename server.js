const express = require('express');
const path = require('path');
const app = express();

const port = 3000;

app.use(express.static(path.join(__dirname, '.')));

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    fs.readFile('./index.html', null, (error, data) => {
        if(error) {
            res.writeHead(404);
            res.write("Error! Index.html was not found");
        } else {
            res.write(data);
        }
        res.end();
    })
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
