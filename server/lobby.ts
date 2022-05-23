import { v4 as uuid } from 'uuid';

export class Lobby {
  private usersMap: Map<string, string>;

  constructor() {
    this.usersMap = new Map();
  }

  public findUser(uid: string): string | undefined {
    return this.usersMap.get(uid);
  }

  public addUser(name: string): string {
    const uid = uuid();
    this.usersMap.set(uid, name);
    return uid;
  }
}