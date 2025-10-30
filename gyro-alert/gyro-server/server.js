// server.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

console.log('🚀 Listening on ws://localhost:8080');

wss.on('connection', (ws, req) => {
  console.log('📱 Phone connected from', req.socket.remoteAddress);

  ws.on('message', (msg) => {
    console.log('📨 From phone:', msg.toString());
    if (msg.toString() === 'ALERT') {
      console.log('⚠️ Threshold exceeded!');
    }
  });
});
