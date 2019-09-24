const {ccclass, property} = cc._decorator;
import { Dispatcher } from '../util/Dispatcher';
@ccclass
export class NetworkComponent extends cc.Component {
    public static host: string = null;
    public static uid: string = null;
    public static jwt: string = null;
    public static port: number = null;
    private initok: boolean = false;
    public et: cc.EventTarget = null;
    private sendloginok: boolean = false;
    private isrecon: boolean = false;

    properties: {
    }
    onLoad() {

    }
    onEnable() {
        console.log("加入消息");
        this.et = cc['NetTarget'];
        this.et.on('net', this.netDataDummy, this);
        this.et.on('netstart', this.netStartDummy, this);
        this.et.on('neterror', this.netErrorDummy, this);
        this.et.on('netclose', this.netCloseDummy, this);
        this.et.on('kick', this.kick, this);
        

        this.et.on('dummynet', this.netData, this);
        this.et.on('dummynetstart', this.netStart, this);
        this.et.on('dummynetclose', this.netClose, this);
        this.et.on('dummyneterror', this.netError, this);
        this.et.on('dummykick', this.dummykick, this);

        this.et.on('login', this.netLogin, this);
        Dispatcher.getInstance().getEventTarget().on("jsback", this.jsBack, this);
    }

    // onDisable() {
    //     console.log("NetworkComponent onDisable");
        
    //     this.et.off('net', this.netDataDummy, this);
    //     this.et.off('netstart', this.netStartDummy, this);
    //     this.et.off('neterror', this.netErrorDummy, this);
    //     this.et.off('netclose', this.netCloseDummy, this);
    //     this.et.off('kick', this.kick, this);
    //     this.et.off('dummynet', this.netData, this);
    //     this.et.off('dummynetstart', this.netStart, this);
    //     this.et.off('dummynetclose', this.netClose, this);
    //     this.et.off('dummyneterror', this.netError, this);
    //     this.et.off('dummykick', this.dummykick, this);

    //     this.et.off('login', this.netLogin, this);
    //     Dispatcher.getInstance().getEventTarget().off("jsback", this.jsBack, this);
        
    // }

    public connect() {
        if (NetworkComponent.host == null) {
            cc.error("网络组件没有初始化成功")
            return
        }
        cc['Network'].connect(NetworkComponent.host)
    }

    public close() {
        this.sendloginok = false;
        if (cc['Network'].isConnected) {
            console.log("关闭联网");
            if(cc['Network']){
                 cc['Network'].close()
            }
           
        }
    }

    public reconnect() {
        if (!cc['Network'].isConnected) {
            this.isrecon = true;
            cc['Network'].connect(NetworkComponent.host);
            cc.log("正在重连:" + NetworkComponent.host);
        }
    }

    public login() {
        console.log("isConnected=====",cc['Network'].isConnected);
        console.log("NetworkComponent.host=====",NetworkComponent.host);
        cc['Network'].close()
        if (!cc['Network'].isConnected) {
            cc['Network'].connect(NetworkComponent.host);
        }
    }

    public initNetWork(host, port, uid, jwt) {
        console.log("host====initNetWork=======",host);
        NetworkComponent.host = host;
        NetworkComponent.port = port;
        NetworkComponent.uid = uid;
        NetworkComponent.jwt = jwt;
    }


    public netData(event) {
        cc.log("parent netData");
    }

    public netStart(event) {
        cc.log("parent netStart");
    }

    public netError(event) {
        cc.log("parent netError");
    }

    public kick(event) {
        this.et.emit("dummykick", event.detail);
        cc.log("parent kick");
    }
    public dummykick(event) {
        cc.log("parent netError");
    }
    
    public netClose(event) {
        cc.log("parent netClose");
        if (!cc.sys.isNative) {
            window.alert("已经跟服务器断开连接");
            cc.director.loadScene("loading")
        } else {

        }

    }

    public netDataDummy(event) {
        var cmd = event.detail;
        // console.log("cmd======netDataDummy======",JSON.stringify(cmd));
        
        if (cmd['c'] == 'index' && cmd['m'] == 'login') {
            var cmd = event.detail;
            cmd['isrecon'] = this.isrecon;
            this.et.emit("login", cmd);
            this.isrecon = false;
        } else if (cmd['c'] == 'index' && cmd['m'] == 'weixinlogin') {
            var cmd = event.detail;
            cmd['isrecon'] = this.isrecon;
            this.et.emit("login", cmd);
            this.isrecon = false;
        }  
        else {
            this.et.emit("dummynet", event.detail);
        }
    }

    public netLogin(event) {
        cc.log("netLogin");

    }

    public netStartDummy(event) {
        if (!cc.sys.isNative) {
             this.send({ c: 'index', m: "login", data: { uid: NetworkComponent.uid, jwt: NetworkComponent.jwt } })
        }else{
            this.send({ c: 'index', m: "login", data: { uid: NetworkComponent.uid, jwt: NetworkComponent.jwt } })
        }
        this.et.emit("dummynetstart", event.detail)
    }

    public netErrorDummy(event) {
        cc.log("netErrorDummy");
        var cmd = event.detail
        cmd['isrecon'] = this.isrecon;
        this.isrecon = false;
        this.sendloginok = false;
        this.isrecon = false;
        this.et.emit("dummyneterror", cmd);
    }

    public netCloseDummy(event) {
        //cc.log("netCloseDummy", event);
        var cmd = event.detail
        cmd['isrecon'] = this.isrecon;
        this.isrecon = false;
        this.et.emit("dummynetclose", cmd);
    }

    public jsBack(event) {
        cc.log("jsBack");
    }

    public send(cmd: any) {
        cc['Network'].send(cmd);
    }

    public sendmc(c: string, m: string, data: any) {
        cc['Network'].sendmc(c, m, data);
    }
}

