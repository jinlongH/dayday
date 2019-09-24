import { Http } from "../util/Http";
import { GlobalUnit } from './GlobalUint';

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
@ccclass
export default class LayerAvater extends cc.Component {

    @property(cc.Sprite)
    avaterFrame: cc.Sprite = null;

    @property(cc.Node)
    p1: cc.Node = null;

    @property(cc.Node)
    p2: cc.Node = null;

    @property(cc.Node)
    p3: cc.Node = null;

    @property(cc.Node)
    p4: cc.Node = null;

    @property(cc.Node)
    p5: cc.Node = null;

    @property(cc.Node)
    p6: cc.Node = null;

    @property(cc.AudioSource)
    btncloseeffect: cc.AudioSource = null;
    private avaterIndex:string = ""
    /////////网络提示///////////////
    @property(cc.Layout)
    layout_tip: cc.Layout = null;
    @property(cc.Layout)
    layout_loading: cc.Layout = null;
    @property(cc.Layout)
    layout_message: cc.Layout = null;
    /////////网络提示///////////////
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
        // self.close();
        cc.director.loadScene("loading");
    }
    /////////网络提示///////////////
    start() {
        this.avaterFrame.node.active = false;
    }

    btn_avater_click(event, customEventData) {

        this.avaterIndex = customEventData
        this.avaterFrame.node.setPosition(this['p' + customEventData].getPosition())
        this.avaterFrame.node.active = true;

    }
    btn_back_click(event, customEventData) {
        this.btncloseeffect.play()
        this.node.active = false;
        this.setAvater();
    }

 private setAvater() {
       
        var self = this;
        var url = GlobalUnit.gatehost + "/changeavatar?uid=" + GlobalUnit.uid+"&avatar="+this.avaterIndex;
        console.log("url================", url);
        self.setLoadingEnable(true); /////////网络提示///////////////
        Http.get(url, function (eventName: string, xhr: XMLHttpRequest) {
            if (eventName == 'COMPLETE') {
                self.setLoadingEnable(false); /////////网络提示///////////////
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var response = JSON.parse(xhr.responseText)
                    console.log("responseinfo======", response);
                    GlobalUnit.avatar = response.data.avatar
                    self.node.parent.getComponent('layerPersion').setAvatar();
                }
            } else if (eventName == 'TIMEOUT') {
                //TODO:添加提示连接网关超时
                self.setTipMessage("网络连接超时，请重新登录", function () {
                    self.goloading();
                })
                cc.log("添加提示连接网关超时 getuserInfo")
            } else if (eventName == 'ERROR') {
                cc.log("添加提示连接网关发生错误 getuserInfo")
                self.setTipMessage("网络连接失败，请重新登录", function () {
                    console.log("点击确定");
                    self.goloading();
                })
                //TODO:添加提示连接网关发生错误
            }
        }, this);
    }
    // update (dt) {}
}
