// index.js

const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 8080;

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;

    if (filePath === './') {
        filePath = './index.html';
    }

    // Determine the file to serve based on the URL path
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // If file doesn't exist, serve the 404 page
                fs.readFile('./404.html', (err, data) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(data);
                });
            } else {
                // For other errors, send a generic error response
                res.writeHead(500);
                res.end('Server Error');
            }
        } else {
            // Serve the requested file
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
