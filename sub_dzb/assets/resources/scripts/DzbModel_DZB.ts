import { Utils } from "../util/utils";
import { Http } from "../util/Http";
import { GlobalUnit } from './GlobalUint';
declare const require: any
const {ccclass, property} = cc._decorator;
// import { Http } from '../../framework/Http';
// import { Network } from '../../framework/NetWork';
// import { Dispatcher } from '../../framework/Dispatcher';
// import { self.GlobalUnit } from '../domain/GlobalUint';
// import { Utils } from '../domain/utils';

@ccclass
export class DzbModel{ //大字版主游戏数据对象

    null_net_data_count: number;
    is_re_connect: boolean;
    is_connect: boolean;
    // last_send_cmd: { c: string; m: string; data: any; };
    last_m: string;
    last_data: any;
    is_win: boolean = false;
    _scheduler: any;
    autoGame: boolean = false;
    baseBetSocre: any; //最低押注分数
    canBetSocre: any; //当前押注分数
    config: any;
    showscore: any;
    score: any;
    handcards: any; //手牌
    selectcards: any; //选择的牌
    curstyle: any; //当前牌型
    timeconfig: any; //赔的数值
    awardsInfo: any; //赔率配置
    history: any; //历史记录
    private static instance: any = null;
    private et: cc.EventTarget = null;
	
	private delayFunc:number = null;
	
	private errorTimerFunc:number = null;
	
	private trueCloseFunc:number = null;
	
	

    public static GAMESTATE = {
        GAME_NET_ERROR : 1, //网络链接错误
        GAME_NET_CLOSE: 2, //网络链接关闭
        GAME_NET_CICK: 3,  //被其他地方的连接替代
        GAME_INIT: 4,//机器初始化
        GAME_WAIT: 5,//待机
        GAME_ONE: 6,//第一次获得牌
        GAME_BIBEIHUODEFEN: 7,//选择得分或比倍状态
        GAME_BETGAME: 8,//比倍状态
    }

    public static LESS_STATE = {
        NULL: 0,
        LESS_ONE: 1,//第一次翻牌动画播放
        LESS_TWO: 2,//第二次翻牌动画播放
        LESS_BIBEIHUODEFEN: 3,//翻牌再弹出比倍按钮
        LESS_OPEN_BIBEI: 4,//打开比倍界面（选择大小）
        LESS_BIBEI_GO: 5,//播放比倍成功动画，再次显示比倍按钮
        LESS_BIBEI_END: 6,//播放比倍结束动画（成功或者失败），再次重置初始状态
        LESS_GETSCORE: 7,//得分状态
        LESS_HOLD: 8,//更新留牌
    }

    private less_state:number = DzbModel.LESS_STATE.NULL;
    private game_state:number = DzbModel.GAMESTATE.GAME_INIT;

    private flag:any = null;
    private actions:any = null;
    
    public get Flag():any {
        return this.flag;
    }

    public set Flag(flag:any) {
        this.flag = flag;
    }

    public get Actions():any {
        return this.actions;
    }

    public set Actions(actions:any) {
        this.actions = actions;
    }

    public get State():number {
        return this.game_state;
    }
    ////////////游戏主要状态（游戏服务器状态）
    public set State(value:number) {
        if (value < 1 || value > 8) {
            console.log("game_state value error")
            throw (new Error("game_state value error"));
        }
        if (this.game_state == value) {
            return
        }else {
            this.game_state = value;
            this.et.emit("update", this);
        }
    }
    //////////////游戏次要状态（界面显示状态）
    public get Less():number {
        return this.less_state;
    }

    public set Less(value:number) {
        if (value < 0 || value > 8) {
            console.log("Less value error")
            throw (new Error("Less value error"));
        }
        if (this.less_state == value) {
            return
        }else {
            this.less_state = value;
        }
    }

    public constructor() {
        if (DzbModel.instance) {
            throw (new Error(" DzbModel.instance already exist"));
        }

        this.et = cc['NetTarget'];
        this.et.on('net', this.netData, this);
        this.et.on('netstart', this.netStart, this);
        this.et.on('neterror', this.netError, this);
        this.et.on('netclose', this.netClose, this);
        this.et.on('kick', this.kick, this);
        this.et.on('login',this.netLogin,this);

        this._scheduler = cc.director.getScheduler();
        DzbModel.instance = this;
        console.log("大字板Model初始化");
    }

    public static getInstance() { //获得单例
        if (!DzbModel.instance) {
            return new DzbModel();
        }
        return DzbModel.instance;
    }

    public static cleanInstance() { //清理单例

        clearInterval(DzbModel.instance.delayFunc);
        clearInterval(DzbModel.instance.trueCloseFunc);
        clearInterval(DzbModel.instance.errorTimerFunc);

        DzbModel.instance.et.off('net', DzbModel.instance.netData, DzbModel.instance);
        DzbModel.instance.et.off('netstart', DzbModel.instance.netStart, DzbModel.instance);
        DzbModel.instance.et.off('neterror', DzbModel.instance.netError, DzbModel.instance);
        DzbModel.instance.et.off('netclose', DzbModel.instance.netClose, DzbModel.instance);
        DzbModel.instance.et.off('kick', DzbModel.instance.kick, DzbModel.instance);
        DzbModel.instance.et.off('login', DzbModel.instance.netLogin, DzbModel.instance);
        DzbModel.instance = null;
    }

    re_connect() {
        var self = this;
        if (this.is_connect) {
            return
        }
        cc['Network'].close();
        if (!cc['Network'].isConnected) {
            cc['Network'].connect(GlobalUnit.host);
        }
        this.is_re_connect = true;
    }
    netLogin(event) {
        var cmd = event.detail;
        // console.log("cmd======netDataDummy======",JSON.stringify(cmd));
        var self = this;
        if (self.last_m != undefined) {
            self.sendmc('room', 'rejoin', { uid : GlobalUnit.uid , 	state:self.State,last_flag:self.flag ,last_m:self.last_m });
        }else{
            var func = function () {
                console.log("点击确定");
                self.returnHall()
            }
            var param = {message:"网络连接失败，请重新登录!",call:func}
            this.et.emit("setTipMessage2",param);
        }
        // self.sendmc('room', 'rejoin', { uid : self.GlobalUnit.uid , state:self.State,last_flag:self.flag ,last_m:self.last_send_cmd.m });
     
        // this._scheduler.unschedule(this.trueCloseFunc,this);
        clearInterval(this.trueCloseFunc);

        var param2 = {visible : false,str:'重连服务器成功!'};
        this.et.emit("setReconnectLoadingView", param2);

        // this.layout_loading.node.active = false;
     

        this.is_connect = true;
        this.null_net_data_count += 1;

        // var param = {message:'重连服务器成功!',call:func}
        // this.et.emit("showMessage",param);


        // this.showMessage1('重连服务器成功!');
       
        // this.setLoadingEnable(false);

        // this.layout_tip.node.active = false;


        
    }
    returnHall(){
        let subgameSearchPath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/')+'ALLGame/dzb/';
        cc.sys.localStorage.setItem("returnHall",1)
        require(subgameSearchPath + 'src/dating.js');
    }
    true_close() {
        var self = this;
        // this._scheduler.unschedule(this.trueCloseFunc,this);
        this.is_re_connect = false
        clearInterval(this.trueCloseFunc);
        // var func = function () {
        //     console.log("点击确定");
        // }

        // var param = {message:"网络连接失败，请重新登录",call:func}
        // this.et.emit("setTipMessage2",param);


        // self.setTipMessage("网络连接超时，请重新登录", function () {
        //     self.goloading();
        // })
    }
    setLoadingEnable(enable: boolean) {
        if (enable) {
            this.startErrorTimer();
        } else {
            this.stopErrorTimer();
        }
        var param = {visible : enable,str:"信号不好，努力链接中..."};
        this.et.emit("setReconnectLoadingView", param);
        
        // this.layout_loading.node.active = enable;
        // this.loading_lable.string = "信号不好，努力链接中..."
    }
    public netError(event) { //网络链接错误

        var self = this;
        if (this.is_re_connect) {
            self.re_connect();
            return
        }
        var func = function () {
            console.log("点击确定");
            self.returnHall()
        }
        var param = {message:"网络连接失败，请重新登录",call:func}
        this.et.emit("setTipMessage2",param);

        // self.setTipMessage("网络连接失败，请重新登录", function () {
        //     console.log("点击确定");
        // })
        this.et.emit("netError", event.detail);
    }
    startErrorTimer() {
		
		// this.errorTimerFunc = this.errorTimer.bind(this);
        // this._scheduler.schedule(this.errorTimerFunc, this, 12, false);
        this.errorTimerFunc = setInterval(this.errorTimer.bind(this), 1000);
    }
    stopErrorTimer() {
        console.log("停止计时器");
        // this._scheduler.unschedule(this.errorTimerFunc,this);
        clearInterval(this.errorTimerFunc);

    }
    errorTimer() {
        // this._scheduler.unschedule(this.errorTimerFunc,this);
        clearInterval(this.errorTimerFunc);
        if (this.null_net_data_count > 5) {
            this.true_close();
            return
        }
        // console.log("超时");
        console.log("重连中.....");
        var self = this;
        var param = {visible : true,str:"信号已断开，重新链接中..."};
        this.et.emit("setReconnectLoadingView", param);
        // this.loading_lable.string = "信号已断开，重新链接中..."

		
		// this.trueCloseFunc =  this.true_close.bind(this);
        
        // this._scheduler.schedule(this.trueCloseFunc, this, 180, false);
        this.is_connect = false;
        self.re_connect();

        
        this.trueCloseFunc = setInterval(this.true_close.bind(this), 180000);
       
       
    }

    public netClose(event) { //网络链接关闭

        var self = this;
        var evt = event.detail;
        if (this.State != DzbModel.GAMESTATE.GAME_NET_CICK) {
            this.startDelayTime();
        }
        console.log('xiaowa ====== netClose evt[closeByClient]:',evt['closeByClient'])
        if(evt['closeByClient'] || this.is_connect || this.is_re_connect) { // 
            return
        }
        // var func = function () {
        //     console.log("点击确定");
 
        // }
        // var param = {message:"网络连接失败，请重新登录！",call:func}
        // this.et.emit("setTipMessage2",param);
        
        // self.setTipMessage("网络连接失败，请重新登录！", function () {
        //     console.log("点击确定");
   
        // })

        this.et.emit("netClose", event.detail);
    }

    public netStart(event) { //网络链接启动
        console.log("连接启动....在这里出现，不可能")
        var self = this;
       if (!cc.sys.isNative) {
            this.send({ c: 'index', m: "login", data: { uid: GlobalUnit.uid, jwt: GlobalUnit.jwt } })
       }else{
            this.send({ c: 'index', m: "login", data: { uid: GlobalUnit.uid, jwt: GlobalUnit.jwt } })
       }
        
    }

    public netData(event) { //收到通讯数据
		console.log("DzbModel netData netData netData netData");
        var cmd = event.detail;
        var c = cmd.c;
        var m = cmd.m;
        
        if (m == "loadcontext" || m == "rejoin" || m == "bigorsmall" || m == "begin" || m == "defen" || m == "bibei" || m == "hold" || m == "userupdate") {
           this.stopDelayTime();
            this.setLoadingEnable(false);
        }else if(m == 'z2c' || m == 'c2z'|| m == 'quit') {
            // this.stopQuitDelay();
        }
        if(cmd['c'] == 'game' && cmd['m'] == 'error')
        {
            this.stopDelayTime();
            console.log("'账号异常,请联系客服!'");
            this.setLoadingEnable(false);
        }


        if (cmd['c'] == 'index' && cmd['m'] == 'login') {
            var cmd = event.detail;
            this.et.emit("login", cmd);
        }else {
            // console.log("Model收到数据:",event.detail)
             this.et.emit("netData", event.detail); //收到消息，让Ctrl去处理业务，Ctrl根据业务 调整数据，数据改变，Model 通知视图改变
        }
    }

    public kick(event) { //其他客户端登陆
        console.log("Model收到其他客户端登陆信息:",event.detail)
        this.et.emit("netkick", event.detail);
    }

    public get_room_info() {
        var self = this;
        this.sendmc("room", "loadcontext", { gps_msg: GlobalUnit.gps || "未获得GPS啊" });
    }

    public send(cmd: any) {
        // this.startDelayTime();
        cc['Network'].send(cmd);
    }
    isWeiHu(c: string, m: string, data: any){
        var self = this;
        if (GlobalUnit.is_weihu) {
            if(this.game_state == DzbModel.GAMESTATE.GAME_WAIT && m == "begin"){

                this.et.emit("showMessage","服务器即将维护，不能继续游戏了！");
                return true;
            }
        }
        return false;
    }
    public sendmc(c: string, m: string, data: any) {
        if(this.isWeiHu(c, m, data)){
            return;
        }
        if (m == 'start' || m == "loadcontext" || m == "rejoin" || m == "bigorsmall" || m == "begin" || m == "defen" || m == "bibei" || m == "hold") {
            console.log(" sendmc sendmc startDelayTime");
     		this.startDelayTime();
			
            if (m == 'start' || m == "bigorsmall" || m == "begin" || m == "defen" || m == "bibei" || m == "hold") {
                // var last_send_cmd = {c: c,m: m,data: data};
                // this.last_send_cmd = last_send_cmd;
                this.last_m = m;
                this.last_data = data;
            }
        }else if(m == 'z2c' || m == 'c2z'|| m == 'quit') {
            console.log("sendmc :2222");
            // this.startQuitDelay();
        }
        cc['Network'].sendmc(c, m, data);
    }
    public querydzbhistoryInfo() {
        var self = this;
        // http://localhost:19000/querydzbhistory?t=dzb&hallkey=1&roomkey=1
        var url = GlobalUnit.gatehost+ "/querydzbhistory?t=dzb&hallkey=" + GlobalUnit.hallKey + "&roomkey=" + GlobalUnit.roomKey
        console.log("url================", url);
        Http.get(url, function (eventName: string, xhr: XMLHttpRequest) {
            if (eventName == 'COMPLETE') {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var response = JSON.parse(xhr.responseText)
                    this.et.emit("querydzbhistoryInfo", response);
                }
            } else if (eventName == 'TIMEOUT') {
                //TODO:添加提示连接网关超时
                cc.log("添加提示连接网关发生错误")
            } else if (eventName == 'ERROR') {
                //TODO:添加提示连接网关发生错误
                cc.log("添加提示连接网关发生错误")
            }
        }, this);

    }

    delayTimeConnect() {
        if (!cc['Network'].isConnected && this.State != DzbModel.GAMESTATE.GAME_NET_CICK) {
            console.log("startDelayTime startDelayTime startDelayTime 3333" );
            // this._scheduler.unschedule(this.delayFunc,this);
            clearInterval(this.delayFunc);
            var param = {visible : true,str:"信号已断开，重新链接中..."};
            this.et.emit("setReconnectLoadingView", param);
            
            this.setLoadingEnable(true);
        }
		console.log("startDelayTime startDelayTime startDelayTime 4444" );
        // this.et.emit("Loading_time_out", true);
    }
    startDelayTime() {
		console.log("startDelayTime startDelayTime startDelayTime 111" );
        // this.delayFunc = this.delayTimeConnect.bind(this);
        if(this.delayFunc){
            clearInterval(this.delayFunc);
        }
        this.delayFunc = setInterval(this.delayTimeConnect.bind(this), 3500);
		// this._scheduler.schedule(this.delayFunc, this, 3.5, false);
		console.log("startDelayTime startDelayTime startDelayTime 222" );
    }
    stopDelayTime() {
		console.log("startDelayTime startDelayTime startDelayTime 55555" );
		clearInterval(this.delayFunc);
        // this._scheduler.unschedule(this.delayFunc,this);
        var param = {visible : false,str:""};
        this.et.emit("setReconnectLoadingView", param);
		console.log("startDelayTime startDelayTime startDelayTime 66666" );
        // this.et.emit("Loading_time_out", false);
    }
}