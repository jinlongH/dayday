const {ccclass, property} = cc._decorator;
import { Http } from '../util/Http';
import { NetworkUtil } from '../util/NetworkUtil'
import { GlobalUnit } from './GlobalUint';
import { Utils } from '../util/utils';
declare const require: any

@ccclass
export class layerBaoXianXiang extends NetworkUtil {
    @property(cc.Label)
    lb_score: cc.Label = null;
    @property(cc.Label)
    lb_zuanshi: cc.Label = null;
    @property(cc.AudioSource)
    btncloseeffect: cc.AudioSource = null;
    /////////网络提示///////////////
    @property(cc.Layout)
    layout_tip: cc.Layout = null;
    @property(cc.Layout)
    layout_loading: cc.Layout = null;
    /////////网络提示///////////////
    /////////网络提示///////////////
    @property(cc.Layout)
    layout_message: cc.Layout = null;

    @property(cc.Button)
    btn_ztc: cc.Button = null;

    @property(cc.Button)
    btn_ctz: cc.Button = null;

    @property(cc.AudioSource)
    error_se: cc.AudioSource = null;
      
    @property(cc.AudioSource)
    upf_se: cc.AudioSource = null;

    @property(cc.AudioSource)
    dwf_se: cc.AudioSource = null;

    public et: cc.EventTarget = null;

    @property
    type: string = '';
    onEnable() {
        this.initUI();
    }
    setLoadingEnable(enable: boolean) {
        if (enable) {
            this.startErrorTimer();
        } else {
            this.stopErrorTimer();
        }
    }
    setTipMessage(message: string, call: any) {
        this.setLoadingEnable(false);
        if (!this.layout_tip.node.active) {
            this.layout_tip.node.getComponent('tipController').setMessage(message);
            this.layout_tip.node.getComponent('tipController').setCallBack(call);
            this.layout_tip.node.active = true;
        }
    }
    startErrorTimer() {
        this.scheduleOnce(this.errorTimer, 3.0);
    }
    stopErrorTimer() {
        console.log("停止计时器");
        this.unschedule(this.errorTimer);
    }
    errorTimer() {
        console.log("超时");
        var self = this;
        this.setTipMessage("网络连接超时，请重新登录", function () {
            self.goloading();
        })
    }
    goloading() {
        // self.close();
        this.returnHall()
    }


    /////////网络提示///////////////
    onLoad() {
        if (!this.et) {
            this.et = cc['NetTarget'];
        }
        this.et.on("baoxianxiangupdate", this.initUI, this);
        var self = this;
        this.node.on(cc.Node.EventType.TOUCH_START, function () { }, this);
        this.initUI();
        this.initbutton();
    }
    onDestroy() {
        this.et.off("baoxianxiangupdate", this.initUI, this);
        this.node.off(cc.Node.EventType.TOUCH_START, function () { }, this);
    }
    initmusic() {
        this.btncloseeffect.volume = GlobalUnit.effectVolume;
        this.upf_se.volume = GlobalUnit.effectVolume;
        this.dwf_se.volume = GlobalUnit.effectVolume;
        
        
    }
    returnHall(){
        let subgameSearchPath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/')+'ALLGame/dzb/';
        cc.sys.localStorage.setItem("returnHall",1)
        require(subgameSearchPath + 'src/dating.js');
    }
    setScore(score: number) {
        this.lb_score.string = "" + score;
    }
    setZunShi(zuanshi: number) {
        this.lb_zuanshi.string = "" + zuanshi;
    }
    initUI() {
        console.log("GlobalUnit.coin===", GlobalUnit.coin);
        console.log("GlobalUnit.baoxianxiang_types===", GlobalUnit.baoxianxiang_types);
        console.log(GlobalUnit.cuurentGame);
        
        if((GlobalUnit.cuurentGame == "att" && GlobalUnit.baoxianxiang_types == "game") || GlobalUnit.baoxianxiang_types == "att_machine") {
            this.setScore(Math.floor(GlobalUnit.coin/GlobalUnit.gameper[GlobalUnit.hallKey]));
            this.setZunShi(GlobalUnit.zuanshi);
            console.log("jinqule");
            
        }else
        {
            this.setScore(GlobalUnit.coin);
            this.setZunShi(GlobalUnit.zuanshi);
        }  
    }
    start() {
        var self = this;
    }

    update(dt) {
        var self = this
    }
    initbutton() {
        var self = this
        self.btn_ztc.node.on(cc.Node.EventType.TOUCH_START, this.btn_ztctouchstart, this);
        self.btn_ztc.node.on(cc.Node.EventType.TOUCH_END, this.btn_ztctouchend, this);
        self.btn_ztc.node.on(cc.Node.EventType.TOUCH_CANCEL, this.btn_ztctouchcancle, this);

        self.btn_ctz.node.on(cc.Node.EventType.TOUCH_START, this.btn_ctztouchstart, this);
        self.btn_ctz.node.on(cc.Node.EventType.TOUCH_END, this.btn_ctztouchend, this);
        self.btn_ctz.node.on(cc.Node.EventType.TOUCH_CANCEL, this.btn_ctztctouchcancle, this);

    }

    btn_ctztouchstart() {
        this.scheduleOnce(this.btn_hold_c2z, 0.5);
        this.c2z();
    }
    btn_ctztouchend() {
        this.btncloseeffect.play();
        this.unschedule(this.btn_hold_c2z);
        this.unschedule(this.c2z);

    }
    btn_ctztctouchcancle() {
        this.unschedule(this.btn_hold_c2z);
        this.unschedule(this.c2z);
    }
    btn_hold_c2z() {
        this.schedule(this.c2z, 0.1);
    }



    btn_hold_z2c() {
        this.schedule(this.z2c, 0.1);
    }
    btn_ztctouchstart(event: cc.Event.EventTouch) {
        console.log("btn_ztctouchstart");
        this.scheduleOnce(this.btn_hold_z2c, 0.5);
        this.z2c();
    }
    btn_ztctouchend(event: cc.Event.EventTouch) {
        console.log("btn_ztctouchend");
        this.btncloseeffect.play();
        this.unschedule(this.btn_hold_z2c);
        this.unschedule(this.z2c);

    }

    btn_ztctouchcancle(event: cc.Event.EventTouch) {
        console.log("btn_ztctouchend");
        this.unschedule(this.btn_hold_z2c);
        this.unschedule(this.z2c);
    }
    onSetClicked() {
        // this.btncloseeffect.play();
        // var self = this
        // console.log("onSetClicked");
        // this.c2z();
    }
    onGetClicked() {
        // this.btncloseeffect.play();
        // var self = this
        // console.log("onGetClicked");
        // this.z2c();
    }
    showMessage1(message: string) {
        console.log("showMessage1showMessage1showMessage1");
        this.layout_message.getComponent('messageController').setMessage(message);
    }

    z2call() {
        console.log("GlobalUnit.zuanshi===", GlobalUnit.zuanshi);
        if (GlobalUnit.zuanshi < 10) {
            this.unschedule(this.btn_hold_z2c);
            this.unschedule(this.z2c);
            this.showMessage1("钻石小于10")
            this.error_se.play();
        } else {
            var def: cc.AudioSource = new cc.AudioSource()
            def.volume = GlobalUnit.effectVolume;
            def.clip = this.upf_se.clip;
            def.play();
            this.btncloseeffect.play();
            var self = this;
            if (GlobalUnit.baoxianxiang_types== 'game' ) {
                console.log("游戏换分");
                this.et.emit('z2c',"z2call");
            }
            if (GlobalUnit.baoxianxiang_types == 'hall' || GlobalUnit.baoxianxiang_types== 'att_machine' ) {
                console.log("大厅换分");
                var url = Utils.getGateHost() + "/z2c?uid=" + GlobalUnit.uid + "&jwt=" + GlobalUnit.jwt + "&zuanshi=" + Math.floor(GlobalUnit.zuanshi/10)*10
                console.log("url================", url);
                self.setLoadingEnable(true); /////////网络提示///////////////
                Http.get(url, function (eventName: string, xhr: XMLHttpRequest) {
                    self.setLoadingEnable(false); /////////网络提示///////////////
                    if (eventName == 'COMPLETE') {
                        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                            var response = JSON.parse(xhr.responseText)
                            console.log("response==========", response);
                            if (response.ok == 'ok') {
                                GlobalUnit.zuanshi = response.zuanshi;
                                GlobalUnit.coin = response.coin;
                                this.initUI();
                                this.et.emit('updateCoinAndZuanshiqufen');
                            }
                        }
                    } else if (eventName == 'TIMEOUT') {
                        //TODO:添加提示连接网关超时
                        self.setTipMessage("网络连接超时，请重新登录", function () {
                            self.goloading();
                        })
                    } else if (eventName == 'ERROR') {
                        self.setTipMessage("网络连接失败，请重新登录", function () {
                            self.goloading();
                        })
                        cc.log("添加提示连接网关发生错误")
                    }
                }, this);
            }


        }

    }

    z2c() {
        console.log("GlobalUnit.zuanshi===", GlobalUnit.zuanshi);
        if (GlobalUnit.zuanshi < 10) {
            this.unschedule(this.btn_hold_z2c);
            this.unschedule(this.z2c);
            this.showMessage1("钻石小于10")
            this.error_se.play();
        } else {
            var def: cc.AudioSource = new cc.AudioSource()
            def.volume = GlobalUnit.effectVolume;
            def.clip = this.upf_se.clip;
            def.play();
            var self = this;
            if (GlobalUnit.baoxianxiang_types == 'game' ) {
                console.log("游戏换分");
                this.et.emit('z2c');
            }
            if (GlobalUnit.baoxianxiang_types == 'hall'|| GlobalUnit.baoxianxiang_types == 'att_machine') {
                console.log("大厅换分");
                var url = Utils.getGateHost() + "/z2c?uid=" + GlobalUnit.uid + "&jwt=" + GlobalUnit.jwt + "&zuanshi=" + 10
                console.log("url================", url);
                self.setLoadingEnable(true); /////////网络提示///////////////
                Http.get(url, function (eventName: string, xhr: XMLHttpRequest) {
                    self.setLoadingEnable(false); /////////网络提示///////////////
                    if (eventName == 'COMPLETE') {
                        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                            var response = JSON.parse(xhr.responseText)
                            console.log("response==========", response);
                            if (response.ok == 'ok') {
                                GlobalUnit.zuanshi = response.zuanshi;
                                GlobalUnit.coin = response.coin;
                                this.initUI();
                                this.et.emit('updateCoinAndZuanshiqufen');
                            }
                        }
                    } else if (eventName == 'TIMEOUT') {
                        //TODO:添加提示连接网关超时
                        self.setTipMessage("网络连接超时，请重新登录", function () {
                            self.goloading();
                        })
                    } else if (eventName == 'ERROR') {
                        self.setTipMessage("网络连接失败，请重新登录", function () {
                            self.goloading();
                        })
                        cc.log("添加提示连接网关发生错误")
                    }
                }, this);
            }


        }

    }

    c2z() {
        if (GlobalUnit.coin < 1000) {
            this.unschedule(this.btn_hold_c2z);
            this.unschedule(this.c2z);
            this.error_se.play();
            this.showMessage1("金币小于1000")
        } else {
            var def: cc.AudioSource = new cc.AudioSource()
            def.volume = GlobalUnit.effectVolume;
            def.clip = this.dwf_se.clip;
            def.play();
            var self = this;
            if (GlobalUnit.baoxianxiang_types == 'game') {
                console.log("游戏换钻");
                this.et.emit('c2z');
            }
            if (GlobalUnit.baoxianxiang_types == 'hall' || GlobalUnit.baoxianxiang_types == 'att_machine') {
                
                console.log("大厅换钻");
                var url = Utils.getGateHost() + "/c2z?uid=" + GlobalUnit.uid + "&jwt=" + GlobalUnit.jwt + "&coin=" + 1000
                console.log("url================", url);
                self.setLoadingEnable(true); /////////网络提示///////////////
                Http.get(url, function (eventName: string, xhr: XMLHttpRequest) {
                    self.setLoadingEnable(false); /////////网络提示///////////////
                    if (eventName == 'COMPLETE') {
                        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                            var response = JSON.parse(xhr.responseText)
                            console.log("response==========", response);
                            if (response.ok == 'ok') {
                                GlobalUnit.zuanshi = response.zuanshi;
                                GlobalUnit.coin = response.coin;
                                this.initUI();
                                this.et.emit('updateCoinAndZuanshicunfen');
                            }
                        }
                    } else if (eventName == 'TIMEOUT') {
                        self.setTipMessage("网络连接超时，请重新登录", function () {
                            self.goloading();
                        })
                        //TODO:添加提示连接网关超时
                    } else if (eventName == 'ERROR') {
                        cc.log("添加提示连接网关发生错误")
                        self.setTipMessage("网络连接失败，请重新登录", function () {
                            self.goloading();
                        })
                    }
                }, this);
            }
        }
    }

    c2zall() {
        if (GlobalUnit.coin < 1000 &&  GlobalUnit.cuurentGame) {
            this.unschedule(this.btn_hold_c2z);
            this.unschedule(this.c2z);
            this.error_se.play();
            this.showMessage1("金币小于1000")
        } else {
            var def: cc.AudioSource = new cc.AudioSource()
            def.volume = GlobalUnit.effectVolume;
            def.clip = this.dwf_se.clip;
            def.play();
            this.btncloseeffect.play();
            var self = this;
            if (GlobalUnit.baoxianxiang_types == 'game') {
                console.log("游戏换钻");
                this.et.emit('c2z',"c2zall");
            }
            if (GlobalUnit.baoxianxiang_types == 'hall' || GlobalUnit.baoxianxiang_types == 'att_machine') {
                console.log("大厅换钻");
                var url = Utils.getGateHost() + "/c2z?uid=" + GlobalUnit.uid + "&jwt=" + GlobalUnit.jwt + "&coin=" + Math.floor(GlobalUnit.coin/1000)*1000
                console.log("url================", url);
                self.setLoadingEnable(true); /////////网络提示///////////////
                Http.get(url, function (eventName: string, xhr: XMLHttpRequest) {
                    self.setLoadingEnable(false); /////////网络提示///////////////
                    if (eventName == 'COMPLETE') {
                        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                            var response = JSON.parse(xhr.responseText)
                            console.log("response==========", response);
                            if (response.ok == 'ok') {
                                GlobalUnit.zuanshi = response.zuanshi;
                                GlobalUnit.coin = response.coin;
                                this.initUI();
                                this.et.emit('updateCoinAndZuanshicunfen');
                            }
                        }
                    } else if (eventName == 'TIMEOUT') {
                        self.setTipMessage("网络连接超时，请重新登录", function () {
                            self.goloading();
                        })
                        //TODO:添加提示连接网关超时
                    } else if (eventName == 'ERROR') {
                        cc.log("添加提示连接网关发生错误")
                        self.setTipMessage("网络连接失败，请重新登录", function () {
                            self.goloading();
                        })
                    }
                }, this);
            }
        }
    }
    onCloseClicked() {
        console.log("nick ----------------------click")
        this.btncloseeffect.play();
        var self = this
        self.destroy();
        self.node.removeFromParent();
        //self.node.parent.active = false
    }
}
