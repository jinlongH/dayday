const {ccclass, property} = cc._decorator;
import { Http } from '../util//Http';
import { Utils } from '../util/utils';

@ccclass
export class layerNotice extends cc.Component {
    @property(cc.Button)
    btn_sys: cc.Button = null;
    @property(cc.Button)
    btn_game: cc.Button = null;
    @property(cc.Button)
    btn_kefu: cc.Button = null;
    @property(cc.RichText)
    notice_text: cc.RichText = null;
    @property(cc.Label)
    notice_title: cc.Label = null;

    @property(cc.Label)
    kefu_qq: cc.Label = null;

    @property(cc.Label)
    kefu_weixin: cc.Label = null;

    @property(cc.Label)
    kefu_emial: cc.Label = null;
    @property(cc.AudioSource)
    btncloseeffect: cc.AudioSource = null;

    @property(cc.ScrollView)
    scrollView_xitonggonggao: cc.ScrollView = null;
    @property(cc.ScrollView)
    scrollview_youxigonggao: cc.ScrollView = null;
    @property(cc.Layout)
    layout_lianxikefu: cc.Layout = null;

    /////////网络提示///////////////
    @property(cc.Layout)
    layout_tip: cc.Layout = null;
    @property(cc.Layout)
    layout_loading: cc.Layout = null;
    /////////网络提示///////////////
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
    onEnable(){
        // this.getxitonggonggao();
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
    onLoad() {
        var self = this;
        this.node.on(cc.Node.EventType.TOUCH_START, function () { }, this);
        self.onSysClicked()
    }
    // getgamegonggao
    start() {
        var self = this;
    }

    update(dt) {
        var self = this
    }
    hidallScrollView() {
        this.scrollView_xitonggonggao.node.active = false;
        this.scrollview_youxigonggao.node.active = false;
        this.layout_lianxikefu.node.active = false;

    }
    onSysClicked() {
        this.btncloseeffect.play();
        this.hidallScrollView()
        this.getxitonggonggao();
        var self = this
        self.btn_sys.interactable = false
        self.btn_game.interactable = true
        self.btn_kefu.interactable = true
    }

    onGameClicked() {
        this.hidallScrollView()
        this.btncloseeffect.play();
        var self = this
        this.getgamegonggao()
     
        self.btn_sys.interactable = true
        self.btn_game.interactable = false
        self.btn_kefu.interactable = true

    }

    onKefuClicked() {
        this.btncloseeffect.play();
        this.hidallScrollView()
        var self = this
        this.getkefu()
       
        self.btn_sys.interactable = true
        self.btn_game.interactable = true
        self.btn_kefu.interactable = false

    }

    onCloseClicked() {

        this.btncloseeffect.play();
        var self = this
        self.node.active = false
    }
    private getxitonggonggao() {
        var self = this;
        var url = Utils.getGateHost() + "/getxitongtongzhi";
        console.log("url================", url);
        self.setLoadingEnable(true); /////////网络提示///////////////
        Http.get(url, function (eventName: string, xhr: XMLHttpRequest) {
            if (eventName == 'COMPLETE') {
                self.setLoadingEnable(false); /////////网络提示///////////////
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var response = JSON.parse(xhr.responseText)
                    console.log("getxitonggonggao======", response);
                    if(JSON.stringify(response.data) == "{}"){
                        return;
                    }
                    self.notice_text.string = "<color=#00ff00>        </c><color=#ffffff>"+response.data[0].content+"</color>"
                    self.notice_title.string = response.data[0].title;
                    this.scrollView_xitonggonggao.node.active = true;
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

    private getgamegonggao() {
        var self = this;
        var url = Utils.getGateHost() + "/getgamegonggao";
        console.log("url================", url);
        self.setLoadingEnable(true); /////////网络提示///////////////
        Http.get(url, function (eventName: string, xhr: XMLHttpRequest) {
            if (eventName == 'COMPLETE') {
                self.setLoadingEnable(false); /////////网络提示///////////////
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var response = JSON.parse(xhr.responseText)
                    console.log("getgamegonggao======", response);
                       this.scrollview_youxigonggao.node.active = true;
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
    hidkefu(){
         this.kefu_qq.node.active = false;
         this.kefu_emial.node.active = false;
         this.kefu_weixin.node.active = false;
    }
    private getkefu() {
        var self = this;
        var url = Utils.getGateHost() + "/getkefu";
        this.hidkefu();
        console.log("url================", url);
        self.setLoadingEnable(true); /////////网络提示///////////////
        Http.get(url, function (eventName: string, xhr: XMLHttpRequest) {
            if (eventName == 'COMPLETE') {
                self.setLoadingEnable(false); /////////网络提示///////////////
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var response = JSON.parse(xhr.responseText)
                    console.log("getkefu======", response);
                    if(JSON.stringify(response.data) == "{}"){
                        return;
                    }
                    if(response.data[0].qq!=""&&response.data[0].qq!=undefined){
                        self.kefu_qq.string = "客服QQ："+response.data[0].qq
                        self.kefu_qq.node.active = true;
                    }

                    if(response.data[0].weixin!=""&&response.data[0].weixin!=undefined){
                        self.kefu_weixin.string = "客服微信："+response.data[0].weixin
                         self.kefu_weixin.node.active = true;
                    }
                     if(response.data[0].youxiang!=""&&response.data[0].youxiang!=undefined){
                            self.kefu_emial.string = "客服邮箱："+response.data[0].youxiang
                             self.kefu_emial.node.active = true;
                    }
                 
                
                    

                     this.layout_lianxikefu.node.active = true;
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
}
