import type { Socket } from 'socket.io';
import { Room } from './room';

export class PokerRoom extends Room {
  protected handleSocket(socket: Socket): void {
    throw new Error('Method not implemented.');
  }
}