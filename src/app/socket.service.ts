import { Datastructure } from '../../Datastructure/TopperStack';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

/**
 * Created by ugur on 2016-12-27.
 */
@Injectable()
export class SocketService {
  private socket;

  currentTopper: Datastructure.ITopper = {
    id: null,
    name: null,
    color: SocketService.generateHex(),
    room: null,
  };

  constructor() {
    //Connects the current host
    this.socket = io();
  }

  getCurrentTopper(): Datastructure.ITopper {
    return this.currentTopper;
  }

  getSocketConnection() {
    return this.socket;
  }

  static generateHex(): string {
    return (
      '#' +
      Math.random()
        .toString(16)
        .slice(2, 8)
        .toUpperCase()
    );
  }
}
