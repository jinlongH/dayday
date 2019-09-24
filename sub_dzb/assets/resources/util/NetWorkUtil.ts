const {ccclass, property} = cc._decorator;
import { Dispatcher } from '../framework/Dispatcher';
@ccclass
export class NetworkUtil extends cc.Component {
    properties: {
    }
    onLoad() {

    }
    onEnable() {

    }

    onDisable() {

    }

    public send(cmd: any) {
        if (cc['Network'].isConnected) {
            cc['Network'].send(cmd);
        }
    }

    public sendmc(c: string, m: string, data: any) {
        
        if (cc['Network'].isConnected) {
            cc['Network'].sendmc(c, m, data);
        }
    }
}

