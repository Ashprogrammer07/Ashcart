const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({ target: 'http://localhost:8000' });

http.createServer((req, res) => {
  proxy.web(req, res);
}).listen(80, '0.0.0.0', () => {
  console.log('Proxy running on port 80, forwarding to 8000');
});
