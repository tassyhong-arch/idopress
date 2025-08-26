const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8080;
const htmlFile = path.join(__dirname, 'deployment', 'simple-index.html');

const server = http.createServer((req, res) => {
    // CORS 헤더 추가
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // HTML 파일 서빙
    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile(htmlFile, 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Error loading page');
                console.error('Error reading file:', err);
                return;
            }
            
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(data);
        });
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Page not found');
    }
});

server.listen(port, '0.0.0.0', () => {
    console.log(`Simple HTML server running at http://0.0.0.0:${port}/`);
    console.log(`Serving file: ${htmlFile}`);
});