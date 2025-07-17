const https = require('https');
const httpProxy = require('http-proxy');
const fs = require('fs');

// SSL Certificates
const options = {
  key: fs.readFileSync('./privkey.pem'),
  cert: fs.readFileSync('./fullchain.pem')
};

// Create a proxy server targeting port 8000
const proxy = httpProxy.createProxyServer({ target: 'http://localhost:8000' });

// Create HTTPS server that forwards traffic
https.createServer(options, (req, res) => {
  proxy.web(req, res);
}).listen(443, '0.0.0.0', () => {
  console.log('HTTPS Proxy running on port 443, forwarding to port 8000');
});
