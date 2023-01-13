import { createWebSocketStream, WebSocketServer } from 'ws';
import { httpServer } from './src/http_server/index';
import { commandSwitch } from './src/utils/command_switch';

const wss = new WebSocketServer({ port: 8080 });

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

wss.on('connection', (ws) => {
  console.log('WebSocket connection opened');
  const webSocketStream = createWebSocketStream(ws, { decodeStrings: false, objectMode: true });
  webSocketStream.on('error', console.error);
  webSocketStream.on('data', async (data) => {
    const command = data.toString();
    const answer = await commandSwitch(command);

    if (answer != 'not') {
      webSocketStream.write(answer);
    }
  });
  webSocketStream.on('end', () => {
    console.log('client disconnected');
  });
});

process.on('SIGINT', () => {
  process.exit();
});
