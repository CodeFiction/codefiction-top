/**
 * Created by ugur on 2017-01-12.
 */
/**
 * Created by ugur on 2016-12-26.
 */
export namespace Chat {

    export interface Message {
        sender: string;
        message: string;
        room: string;
        date: Date;
    }

}