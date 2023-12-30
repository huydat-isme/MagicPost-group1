// server.js

const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();

proxy.on('proxyReq', function(proxyReq, req) {
  proxyReq.setHeader('Host', 'localhost:3000');
});

proxy.on('error', function(err) {
  console.log(err);
});

require('http').createServer(function (req, res) { 
  proxy.web(req, res, {
    target: 'http://localhost:3000'
  });
}).listen(80);