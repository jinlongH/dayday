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
export default class NewClass extends cc.Component {


    @property(cc.Layout)
    layout_loading: cc.Layout = null;
    @property(cc.Layout)
    layout_tip: cc.Layout = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // if (GlobalUnit.isOpenAct) {
        //     this.hideBtn();
        // }
    }
    hideBtn(){
        this.node.active = false;
    }
    // start () {

    // }
    setLoadingEnable(enable: boolean) {
        if (enable) {
            this.startErrorTimer();
        } else {
            this.stopErrorTimer();
        }
        this.layout_loading.node.active = enable;
    }
    startErrorTimer() {
        this.scheduleOnce(this.errorTimer,8.0);
    }
    stopErrorTimer() {
        console.log("停止计时器");
        this.unschedule(this.errorTimer);
    }
    errorTimer() {
        console.log("超时");
        console.log("eric:超时");
        
        var self = this;
        // this.setTipMessage("网络连接超时，请重新登录", function () {
        //     self.goloading();
        // })
    }
    setTipMessage(message: string, call: any) {
        this.setLoadingEnable(false);
        if (!this.layout_tip.node.active) {
            this.layout_tip.node.getComponent('tipController').setMessage(message);
            this.layout_tip.node.getComponent('tipController').setCallBack(call);
            this.layout_tip.node.active = true;
        }
    }
    openInformation()
    {
        this.setLoadingEnable(true)
        var self=this
        var filName = "person/prefabs/layerInformation";
        cc.loader.loadRes(filName,function (err, prefab) {
        if( err ) { cc.log( '载入预制资源失败, 原因:' + err ); return; }
        var layerbaoxian =cc.instantiate(prefab);
        layerbaoxian.setPosition( cc.v2(cc.winSize.width/2,cc.winSize.height/2));
        cc.director.getScene().addChild(layerbaoxian);
        self.setLoadingEnable(false)
        })
    }
    openDajiangRank()
    {
        this.setLoadingEnable(true)
        var self=this
        var filName = "prefabs/layerRank_new";
        cc.loader.loadRes(filName,function (err, prefab) {
        if( err ) { cc.log( '载入预制资源失败, 原因:' + err ); return; }
        var layerbaoxian =cc.instantiate(prefab);
        layerbaoxian.setPosition( cc.v2(cc.winSize.width/2,cc.winSize.height/2));
        cc.director.getScene().addChild(layerbaoxian);
        self.setLoadingEnable(false)
        })
    }

    // update (dt) {}
}
