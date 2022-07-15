import http from 'http';
import fs from 'fs';

const server: http.Server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  console.log(req.url);
  switch (req.url) {
    case "/index.html":
      res.writeHead(200, { 'content-type': 'text/html' });
      fs.createReadStream("./index.html").pipe(res);
      break;
    case "/main.js":
      res.writeHead(200, { 'content-type': 'application/javascript' });
      fs.createReadStream("./dist/client/main.js").pipe(res);
      break;
    default:
      res.writeHead(400);
      res.end();
  }
})

const files: string[] = fs.readdirSync('./');
files.forEach(file => console.log(file))

console.log('starting from ' + __dirname);
console.log('server listening on port 3000...');
server.listen(3000);
