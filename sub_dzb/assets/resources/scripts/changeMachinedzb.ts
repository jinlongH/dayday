import { Http } from "../util/Http";
import { GlobalUnit } from './GlobalUint';
declare const require: any
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    /////////网络提示///////////////
    @property(cc.Layout)
    layout_tip: cc.Layout = null;
    @property(cc.Layout)
    layout_loading: cc.Layout = null;
    /////////网络提示///////////////

    /////////网络提示///////////////

    @property(cc.Prefab)
    changeMachine_coin: cc.Prefab = null;

    @property(cc.ScrollView)
    scrollview_change: cc.ScrollView = null;

    public et: cc.EventTarget = null;

    public changeIndex:number = null;
    startDelayTime() {
        this.scheduleOnce(this.delayTime, 3.0);
    }
    stopDelayTime() {
        this.unschedule(this.delayTime);
    }
    delayTime() {
        this.setLoadingEnable(true);
    }
    setLoadingEnable(enable: boolean) {
        if (enable) {
            this.startErrorTimer();
        } else {
            this.stopErrorTimer();
        }
        this.layout_loading.node.active = enable;
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
        this.returnHall()
    }
    /////////网络提示///////////////

    //LIFE-CYCLE CALLBACKS:

    onLoad() {
        if (!this.et) {
            this.et = cc['NetTarget'];
        }
        this.et.on("setOtherToggleDefault", this.setOtherToggleDefault, this);
        this.et.on("updateMachine", this.gethallInfo, this);
    }
    setOtherToggleDefault(event){
        console.log("setOtherToggleDefault");
        this.changeIndex = event.detail
        for(var i =0;i<this.scrollview_change.content.childrenCount;i++){
            var togg = this.scrollview_change.content.children[i].getChildByName('layout_machine').getChildByName('btn_avater').getComponent(cc.Toggle);
            togg.isChecked = false;
        }
    }
    start() {

    }

    returnHall(){
        let subgameSearchPath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/')+'ALLGame/dzb/';
        cc.sys.localStorage.setItem("returnHall",1)
        require(subgameSearchPath + 'src/dating.js');
    }

    on_btn_change_click(event, customEventData) {//
        console.log("换机器");
         this.et.emit('changeMachine',this.changeIndex );
    }
    initMachine(machineInfo: any) {
        console.log("initMachine======", machineInfo);
        var self = this;
        this.scrollview_change.content.removeAllChildren();
        for (var i = 0; i < machineInfo.roomcount; i++){
             var item = cc.instantiate(this.changeMachine_coin);
             item.getComponent('changeMachineCoin_dzb').setIndex(i + 1);
             item.getComponent('changeMachineCoin_dzb').setState('none');
             item.name = "dzb-" + GlobalUnit.hallKey+ "-" + (i + 1)
             this.scrollview_change.content.addChild(item);
        }

        var keys = Object.keys(machineInfo.roominfo);
        for (var key in machineInfo.roominfo) {
            var node = this.scrollview_change.content.getChildByName(key)
            node.getComponent('changeMachineCoin_dzb').setState(machineInfo.roominfo[key].t);
        }
    }
    gethallInfo() {
        var self = this;
        var url = GlobalUnit.gatehost + "/hallinfo?t=dzb&hallkey=" + GlobalUnit.hallKey
        console.log("url================", url);
        self.setLoadingEnable(true);
        Http.get(url, function (eventName: string, xhr: XMLHttpRequest) {
            self.setLoadingEnable(false);
            if (eventName == 'COMPLETE') {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var response = JSON.parse(xhr.responseText)
                    var data = { roominfo: response.data.roominfo, roomcount: response.data.roomcount }
                    console.log("gethallInfo==========", data);
                    self.initMachine(data);
                }
            } else if (eventName == 'TIMEOUT') {
                //TODO:添加提示连接网关超时
                self.setTipMessage("网络连接超时，请重新登录", function () {
                    self.goloading();
                })
            } else if (eventName == 'ERROR') {
                self.setTipMessage("网络连接错误，请重新登录", function () {
                    self.goloading();
                })
                cc.log("添加提示连接网关发生错误")
            }
        }, this);
    }
    gethallInfo_star99() {
        var self = this;
        var url = GlobalUnit.gatehost + "/hallinfo?t=mx99&hallkey=" + GlobalUnit.hallKey
        console.log("url========gethallInfo_star========", url);
        self.setLoadingEnable(true);
        Http.get(url, function (eventName: string, xhr: XMLHttpRequest) {
            self.setLoadingEnable(false);
            if (eventName == 'COMPLETE') {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var response = JSON.parse(xhr.responseText)
                    var data = { roominfo: response.data.roominfo, roomcount: response.data.roomcount }
                    console.log("gethallInfo====gethallInfo_star======", data);
                    self.initMachine_star99(data);
                    // self.initMachine(data);
                }
            } else if (eventName == 'TIMEOUT') {
                //TODO:添加提示连接网关超时
                self.setTipMessage("网络连接超时，请重新登录", function () {
                    self.goloading();
                })
            } else if (eventName == 'ERROR') {
                self.setTipMessage("网络连接错误，请重新登录", function () {
                    self.goloading();
                })
                cc.log("添加提示连接网关发生错误")
            }
        }, this);
    }
    initMachine_star99(machineInfo: any) {
        var self = this;
        console.log("initMachine===initMachine_star===", machineInfo);
        this.scrollview_change.content.removeAllChildren();
        for (var i = 0; i < machineInfo.roomcount; i++){
             var item = cc.instantiate(this.changeMachine_coin);
             item.getComponent('changeMachineCoin_dzb').setIndex(i + 1);
             item.getComponent('changeMachineCoin_dzb').setState('none');
             item.name = "mx99-" + GlobalUnit.hallKey+ "-" + (i + 1)
             this.scrollview_change.content.addChild(item);
        }

        var keys = Object.keys(machineInfo.roominfo);
        for (var key in machineInfo.roominfo) {
            var node = this.scrollview_change.content.getChildByName(key)
            node.getComponent('changeMachineCoin_dzb').setState(machineInfo.roominfo[key].t);
        }
    }
    gethallInfo_star() {
        var self = this;
        var url = GlobalUnit.gatehost + "/hallinfo?t=mx97&hallkey=" + GlobalUnit.hallKey
        console.log("url========gethallInfo_star========", url);
        self.setLoadingEnable(true);
        Http.get(url, function (eventName: string, xhr: XMLHttpRequest) {
            self.setLoadingEnable(false);
            if (eventName == 'COMPLETE') {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var response = JSON.parse(xhr.responseText)
                    var data = { roominfo: response.data.roominfo, roomcount: response.data.roomcount }
                    console.log("gethallInfo====gethallInfo_star======", data);
                    self.initMachine_star(data);
                    // self.initMachine(data);
                }
            } else if (eventName == 'TIMEOUT') {
                //TODO:添加提示连接网关超时
                self.setTipMessage("网络连接超时，请重新登录", function () {
                    self.goloading();
                })
            } else if (eventName == 'ERROR') {
                self.setTipMessage("网络连接错误，请重新登录", function () {
                    self.goloading();
                })
                cc.log("添加提示连接网关发生错误")
            }
        }, this);
    }
    initMachine_star(machineInfo: any) {
        var self = this;
        console.log("initMachine===initMachine_star===", machineInfo);
        this.scrollview_change.content.removeAllChildren();
        for (var i = 0; i < machineInfo.roomcount; i++){
             var item = cc.instantiate(this.changeMachine_coin);
             item.getComponent('changeMachineCoin_dzb').setIndex(i + 1);
             item.getComponent('changeMachineCoin_dzb').setState('none');
             item.name = "mx97-" + GlobalUnit.hallKey+ "-" + (i + 1)
             this.scrollview_change.content.addChild(item);
        }

        var keys = Object.keys(machineInfo.roominfo);
        for (var key in machineInfo.roominfo) {
            var node = this.scrollview_change.content.getChildByName(key)
            node.getComponent('changeMachineCoin_dzb').setState(machineInfo.roominfo[key].t);
        }
    }

    gethallInfo_NBA() {
        var self = this;
        var url = GlobalUnit.gatehost + "/hallinfo?t=NBA&hallkey=" + GlobalUnit.hallKey
        console.log("url========gethallInfo_NBA========", url);
        self.setLoadingEnable(true);
        Http.get(url, function (eventName: string, xhr: XMLHttpRequest) {
            self.setLoadingEnable(false);
            if (eventName == 'COMPLETE') {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var response = JSON.parse(xhr.responseText)
                    var data = { roominfo: response.data.roominfo, roomcount: response.data.roomcount }
                    console.log("gethallInfo====gethallInfo_NBA======", data);
                    self.initMachine_NBA(data);
                    // self.initMachine(data);
                }
            } else if (eventName == 'TIMEOUT') {
                //TODO:添加提示连接网关超时
                self.setTipMessage("网络连接超时，请重新登录", function () {
                    self.goloading();
                })
            } else if (eventName == 'ERROR') {
                self.setTipMessage("网络连接错误，请重新登录", function () {
                    self.goloading();
                })
                cc.log("添加提示连接网关发生错误")
            }
        }, this);
    }

    initMachine_NBA(machineInfo: any) {
        var self = this;
        console.log("initMachine===initMachine_NBA===", machineInfo);
        this.scrollview_change.content.removeAllChildren();
        for (var i = 0; i < machineInfo.roomcount; i++){
             var item = cc.instantiate(this.changeMachine_coin);
             item.getComponent('changeMachineCoin_dzb').setIndex(i + 1);
             item.getComponent('changeMachineCoin_dzb').setState('none');
             item.name = "NBA-" + GlobalUnit.hallKey+ "-" + (i + 1)
             this.scrollview_change.content.addChild(item);
        }

        var keys = Object.keys(machineInfo.roominfo);
        for (var key in machineInfo.roominfo) {
            var node = this.scrollview_change.content.getChildByName(key)
            console.log("node == "+node+"  t  "+machineInfo.roominfo[key].t)
            node.getComponent('changeMachineCoin_dzb').setState(machineInfo.roominfo[key].t);
        }
    }
}
