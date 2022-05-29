import { v4 as uuid } from 'uuid';
import type { Room } from './room/room';
import { PokerRoom } from './room/poker';

export class Lobby {
  private usersMap: Map<string, string>;
  private roomMap: Map<string, Room>;

  constructor() {
    this.usersMap = new Map();
    this.roomMap = new Map();
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