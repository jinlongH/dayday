const { ccclass, property } = cc._decorator;
import { Http } from '../util/Http';
import { GlobalUnit } from './GlobalUint';
import { Utils } from '../util/utils';

@ccclass
export class layerNotice extends cc.Component {

    @property(cc.Button)
    btn_phoenix: cc.Button = null;
    @property(cc.Button)
    btn_att: cc.Button = null;
    @property(cc.Button)
    btn_dbs: cc.Button = null;
    @property(cc.Button)
    btn_dzb: cc.Button = null;
    @property(cc.Button)
    btn_97: cc.Button = null;
    @property(cc.Button)
    btn_99: cc.Button = null;
    @property(cc.Button)
    btn_sm: cc.Button = null;
    @property(cc.Button)
    btn_nba: cc.Button = null;
    @property(cc.Button)
    btn_hw: cc.Button = null;
    @property(cc.Button)
    btn_price: cc.Button = null;
    @property(cc.Button)
    btn_cloud: cc.Button = null;

    @property(cc.ScrollView)
    list_rank_dzb: cc.ScrollView = null;
    @property(cc.ScrollView)
    list_rank_cloud: cc.ScrollView = null;

    @property(cc.Prefab)
    prefab_rankitem: cc.Prefab = null;
    @property(cc.Prefab)
    prefab_rankitem_mx97: cc.Prefab = null;
    @property(cc.Prefab)
    prefab_clouditem: cc.Prefab = null;

    @property(cc.AudioSource)
    btncloseeffect: cc.AudioSource = null;
    /////////网络提示///////////////
    @property(cc.Layout)
    layout_tip: cc.Layout = null;
    @property(cc.Layout)
    layout_loading: cc.Layout = null;
    /////////网络提示///////////////
    @property(cc.Layout)
    layout_message: cc.Layout = null;
    @property(cc.Layout)
    NewBtnLayout: cc.Layout = null;

    @property(cc.Node)
    layout_btnType_cloud: cc.Node = null;
    @property(cc.Node)
    layout_btnType_price: cc.Node = null;

    btnlists = {}
    myPool: any;
    /////////网络提示///////////////
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
    onEnable() {
        this.onDzbClicked();
    }
    onLoad() {
        var self = this;
        this.node.on(cc.Node.EventType.TOUCH_START, function () { }, this);
        this.btnlists = { "hfh": this.btn_phoenix, "dzb": this.btn_dzb, "sm": this.btn_sm, "mx97": this.btn_97, "mx99": this.btn_99, "hw": this.btn_hw, "dbs": this.btn_dbs, "NBA": this.btn_nba, "att": this.btn_att }
        this.myPool = new cc.NodePool('MyTemplateHandler');
        this.initbtn()
        this.initHistoryitem()
        this.queryCloudhistory()
        this.typeClick('', 1)
        this.rankExist(true);

    }

    rankExist(rank_exist:boolean){
       
        this.btn_cloud.node.active=rank_exist
    }
    start() {
        var self = this;
    }
    initbtn() {
        var gamelist = {}
        var gamenum = 0
        for (var key in GlobalUnit.gamebtnlist) {
            gamenum = gamenum + 1
        }
        if (gamenum > 4) {
            // this.NewBtnLayout.node.setContentSize(766+(gamenum-4)*192,70)
        }
        {
            if (GlobalUnit.gamebtnlist["hfh"] >= 0) {
                this.btn_phoenix.node.active = true;
            }
            if (GlobalUnit.gamebtnlist["dzb"] >= 0) {
                this.btn_dzb.node.active = true;
            }
            if (GlobalUnit.gamebtnlist["sm"] >= 0) {
                this.btn_sm.node.active = true
            }
            if (GlobalUnit.gamebtnlist["NBA"] >= 0) {
                this.btn_nba.node.active = true
            }
            if (GlobalUnit.gamebtnlist["mx97"] >= 0) {
                this.btn_97.node.active = true
            }
            if (GlobalUnit.gamebtnlist["mx99"] >= 0) {
                this.btn_99.node.active = true
            }
            if (GlobalUnit.gamebtnlist["att"] >= 0) {
                this.btn_att.node.active = true
            }
            if (GlobalUnit.gamebtnlist["dbs"] >= 0) {
                this.btn_dbs.node.active = true
            }
            if (GlobalUnit.gamebtnlist["hw"] >= 0) {
                this.btn_hw.node.active = true
            }

        }
    }
    update(dt) {

        var self = this
    }
    hidAllRank() {
        this.list_rank_dzb.node.active = false;
    }

    setScaleBtn(btn: cc.Button) {
        let self = this
        for (var key in GlobalUnit.gamebtnlist) {
            // cc.log(11111111111111111111111111111111111111)
            // console.log("djb btn "+key)
            self.btnlists[key].node.scale = 1
            self.btnlists[key].interactable = true
        }
        // btn.node.width = 128
        btn.interactable = false
        btn.node.scale = 1.15;
    }

    typeClick(event, customEventData) {
        //1 大奖榜 0风云榜
        let self = this
        console.log("切换榜" + Number(customEventData))
        if (customEventData == 1) {
            self.btn_price.interactable = false
            self.btn_cloud.interactable = true
            self.layout_btnType_price.active = true
            self.layout_btnType_cloud.active = false
        } else {
            self.btn_cloud.interactable = false
            self.btn_price.interactable = true
            self.layout_btnType_cloud.active = true
            self.layout_btnType_price.active = false
        }

    }

    onDzbClicked() {
        this.hidAllRank()
        this.btncloseeffect.play();
        var self = this
        self.setScaleBtn(self.btn_dzb)
        this.list_rank_dzb.node.active = true
        this.querydajianghistory('dzb');
        this.list_rank_dzb.scrollToTop(0.5)
    }

    onnbaclicked() {
        this.hidAllRank()
        this.btncloseeffect.play();
        var self = this
        self.setScaleBtn(self.btn_nba)
        this.list_rank_dzb.node.active = true
        this.querydajianghistory('NBA');
        this.list_rank_dzb.scrollToTop(0.5)
    }

    ondbsclick() {
        this.hidAllRank()
        this.btncloseeffect.play();
        var self = this
        self.setScaleBtn(self.btn_dbs)
        this.list_rank_dzb.node.active = true
        this.querydajianghistory('dbs');
        this.list_rank_dzb.scrollToTop(0.5)
    }

    on97Clicked() {
        this.hidAllRank()
        this.btncloseeffect.play();
        var self = this
        self.setScaleBtn(self.btn_97)
        this.list_rank_dzb.node.active = true
        this.querydajianghistory('mx97');
        this.list_rank_dzb.scrollToTop(0.5)

    }
    on99Clicked() {
        this.hidAllRank()
        this.btncloseeffect.play();
        var self = this
        self.setScaleBtn(self.btn_99)
        this.list_rank_dzb.node.active = true
        this.querydajianghistory('mx99');
        this.list_rank_dzb.scrollToTop(0.5)

    }

    onPhoenixClicked() {
        this.hidAllRank()
        this.btncloseeffect.play();
        var self = this
        self.setScaleBtn(self.btn_phoenix)
        this.list_rank_dzb.node.active = true
        this.querydajianghistory('hfh');
        this.list_rank_dzb.scrollToTop(0.5)
    }

    onSmClicked() {

        this.hidAllRank()
        this.btncloseeffect.play();
        var self = this
        self.setScaleBtn(self.btn_sm)
        this.list_rank_dzb.node.active = true
        this.querydajianghistory('sm');
        this.list_rank_dzb.scrollToTop(0.5)
    }
    onfishClicked() {

        this.hidAllRank()
        this.btncloseeffect.play();
        var self = this
        self.setScaleBtn(self.btn_hw)
        this.list_rank_dzb.node.active = true
        this.querydajianghistory('hw');
        this.list_rank_dzb.scrollToTop(0.5)
    }
    onattclicked() {

        this.hidAllRank()
        this.btncloseeffect.play();
        var self = this
        self.setScaleBtn(self.btn_att)
        this.list_rank_dzb.node.active = true
        this.querydajianghistory('att');
        this.list_rank_dzb.scrollToTop(0.5)
    }

    onCloseClicked() {
        this.btncloseeffect.play();
        var self = this
        self.node.active = false
    }


    /* 
    *大奖榜实现
    */
    initHistoryitem() {
        for (var i = 0; i < 50; i++) {
            var item = cc.instantiate(this.prefab_rankitem);
            var item2 = cc.instantiate(this.prefab_rankitem_mx97);
            item2.height = 54
            item2.getComponent('rankitem_mx97').node.height = 54
            item.height = 54
            item.getComponent('rankitem_dzb').node.height = 54
            item.active = false
            item2.active = false
            this.list_rank_dzb.content.addChild(item2);
            this.list_rank_dzb.content.addChild(item);
        }
    }
    initDzbHistory(info: any, name: string) {
        var itemlist = this.list_rank_dzb.content.children
        for (var i = 0; i < itemlist.length; i++) {
            itemlist[i].active = false
        }
        var index = 0
        for (var i = 0; i < 100; i++) {
            var item = itemlist[i]
            // console.log("index-----",index,"i----",i);

            if (index < info.length) {
                if (name == "mx97" || name == "mx99") {
                    if (item.getComponent('rankitem_dzb')) {
                        // item.getComponent('rankitem_dzb').node.active = false
                        item.active = false
                    }
                    else if (item.getComponent('rankitem_mx97')) {
                        item.getComponent('rankitem_mx97').setInfo(info[index], index)
                        item.active = true
                        index = index + 1;
                    }
                }
                else {
                    if (item.getComponent('rankitem_dzb')) {
                        item.getComponent('rankitem_dzb').setInfo(info[index], index)
                        item.active = true
                        index = index + 1;
                    }
                    else if (item.getComponent('rankitem_mx97')) {
                        // item.getComponent('rankitem_mx97').node.active = false
                        item.active = false
                    }


                }
            }

        }
    }
    private querydajianghistory(gameName: string) {
        var name = gameName ? gameName : 'dzb';
        ////测试零时去掉
        if (!GlobalUnit.gamebtnlist[name] || GlobalUnit.gamebtnlist[name] < 1) {
            var itemlist = this.list_rank_dzb.content.children
            for (var i = 0; i < itemlist.length; i++) {
                itemlist[i].active = false
            }
            return
        }
        var self = this;
        var url = Utils.getGateHost() + "/querydajianghistory?t=" + name;
        console.log("url================", url);
        self.setLoadingEnable(true); /////////网络提示///////////////
        Http.get(url, function (eventName: string, xhr: XMLHttpRequest) {
            if (eventName == 'COMPLETE') {
                self.setLoadingEnable(false); /////////网络提示///////////////
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var response = JSON.parse(xhr.responseText)
                    console.log("querydajianghistory======", response);
                    self.initDzbHistory(response.data, name)
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

    /* 
    *风云榜实现
    */
    private queryCloudhistory() {

        var self = this;
        var url = Utils.getGateHost() + "/gettoprankresponse";
        console.log("url================", url);
        self.setLoadingEnable(true); /////////网络提示///////////////
        Http.get(url, function (eventName: string, xhr: XMLHttpRequest) {
            if (eventName == 'COMPLETE') {
                self.setLoadingEnable(false); /////////网络提示///////////////
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var response = JSON.parse(xhr.responseText)
                    console.log("gettoprankresponse======", response);
                    self.initCloudHistoryitem(response.data)
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

    initCloudHistoryitem(data:any) {
        for(var j = 0,len = data.length; j < len; j++){
            var item = cc.instantiate(this.prefab_clouditem);
            if(j<3){
 
                item.getChildByName("rank_top3").active=true
                item.getChildByName("rank_index").active=false

            }else{

                item.getChildByName("rank_top3").active=false
                item.getChildByName("rank_index").active= true
            }
            item.getComponent("rankitem_cloud").setInfo(data[j],j)
            this.list_rank_cloud.content.addChild(item);
        }
    }
}
