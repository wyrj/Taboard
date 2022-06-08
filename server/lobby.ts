import type { Server } from 'socket.io';
import { v4 as uuid } from 'uuid';
import type { Room } from './room/room';
import { PokerRoom } from './room/poker';

export class Lobby {
  private socketServer: Server;
  private usersMap: Map<string, string>;
  private roomMap: Map<string, Room>;

  constructor(server: Server) {
    this.socketServer = server;
    this.usersMap = new Map();
    this.roomMap = new Map();

    this.registerSocketServer();
  }

  private registerSocketServer(): void {
    this.socketServer.use((socket, next) => {
      const roomId = socket.handshake.query.roomId;
      if (!roomId || Array.isArray(roomId) || !this.roomMap.has(roomId)) {
        next(new Error('No Room'));
      } else {
        next();
      }
    });

    this.socketServer.on('connection', socket => {
      const roomId = <string>socket.handshake.query.roomId;
      socket.emit('hello', (uid: string) => {
        const name = this.usersMap.get(uid);
        const room = this.roomMap.get(roomId);
        if (!name || !room) {
          socket.disconnect();
        } else {
          room.addUser(socket, uid, name);
        }
      });
    });
  }

  public findUser(uid: string): string | undefined {
    return this.usersMap.get(uid);
  }

  public addUser(name: string): string {
    const uid = uuid();
    this.usersMap.set(uid, name);
    return uid;
  }

  public createPokerRoom(): string {
    let roomId = uuid();
    while (this.roomMap.has(roomId)) {
      roomId = uuid();
    }
    this.roomMap.set(roomId, new PokerRoom(roomId));
    return roomId;
  }

  public getRoom(roomId: string): Room | undefined {
    return this.roomMap.get(roomId);
  }
}