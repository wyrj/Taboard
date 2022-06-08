import type { Socket } from 'socket.io';

export abstract class Room {
  private roomId: string;
  private usersMap: Map<string, string>;

  constructor(roomId: string) {
    this.roomId = roomId;
    this.usersMap = new Map();
  }

  public getRoomId(): string {
    return this.roomId;
  }

  public addUser(socket: Socket, uid: string, name: string): void {
    this.usersMap.set(uid, name);
    socket.join(this.roomId);
    socket.to(this.roomId).emit('addUser', [[uid, name]]);
    socket.emit('users', Array.from(this.usersMap));
    this.handleSocket(socket);
  }

  protected abstract handleSocket(socket: Socket): void;
}