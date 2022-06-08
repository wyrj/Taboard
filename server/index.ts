import { createServer } from 'http';
import next from 'next';
import { Server } from 'socket.io';
import { Lobby } from './lobby';
import type { TaboardRequest } from '../api/request';

async function main() {

  const nextApp = next({
    dev: process.env.NODE_ENV !== 'production',
  });
  const handle = nextApp.getRequestHandler();

  await nextApp.prepare();
  const server = createServer((req, res) => {
    (req as TaboardRequest)._lobby = lobby;
    handle(req, res);
  });
  const socketServer = new Server(server);
  const lobby = new Lobby(socketServer);
  server.listen(3000);
}

main();
