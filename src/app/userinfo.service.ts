import {Datastructure} from "../../Datastructure/TopperStack";
import {Injectable} from "@angular/core";
import * as io from 'socket.io-client';

const socket_io_address = 'localhost:3000';
/**
 * Created by ugur on 2016-12-27.
 */
@Injectable()
export class UserInfoService {

    private socket;

    currentTopper: Datastructure.ITopper = {id: null, name: null, color: UserInfoService.generateHex(), room: null};

    constructor() {
        this.socket = io(socket_io_address);
    }

    getCurrentTopper() : Datastructure.ITopper {
        return this.currentTopper
    }

    static generateHex() : string {
        return '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
    }

    getSocketConnection() {
        return this.socket;
    }
}
