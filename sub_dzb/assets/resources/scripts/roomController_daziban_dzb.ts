import { NetworkComponent } from "../util/NetworkComponent";
import { Http } from "../util/Http";
import { GlobalUnit } from './GlobalUint';
declare const require: any
const {ccclass, property} = cc._decorator;
@ccclass
export class RoomController_daziban extends NetworkComponent {

    @property(cc.Layout)
    label_gonggao: cc.Layout = null;

    @property(cc.Node)
    layerNotice: cc.Node = null;

    // @property(cc.Node)
    // layerBaoxian: cc.Node = null;

    @property(cc.Node)
    layerRank: cc.Node = null;

    @property(cc.Node)
    layerSetting: cc.Node = null;

    @property(cc.Sprite)
    text_channel_name: cc.Sprite = null;

    @property(cc.Sprite)
    avatar: cc.Sprite = null;

    @property(cc.Label)
    label_channel_score_0: cc.Label = null;
    @property(cc.Label)
    label_channel_zuan_0: cc.Label = null;
    @property(cc.Label)
    label_channel_score_1: cc.Label = null;
    @property(cc.Label)
    label_channel_zuan_1: cc.Label = null;

    @property(cc.Label)
    label_channel_score_2: cc.Label = null;
    @property(cc.Label)
    label_channel_zuan_2: cc.Label = null;

    @property(cc.Label)
    label_channel_score_3: cc.Label = null;
    @property(cc.Label)
    label_channel_zuan_3: cc.Label = null;

    @property(cc.Label)
    label_channel_score_4: cc.Label = null;

    @property(cc.Label)
    label_channel_zuan_4: cc.Label = null;

    @property(cc.ScrollView)
    scrollview_channel: cc.ScrollView = null;

    @property(cc.ScrollView)
    scrollview_machine: cc.ScrollView = null;

    @property(cc.Prefab)
    btn_machine: cc.Prefab = null;

    @property(cc.Layout)
    layout_message: cc.Layout = null;

    @property(cc.Layout)
    layout_touch: cc.Layout = null;

    @property(cc.Label)
    label_name: cc.Label = null;

    @property(cc.Label)
    label_coin: cc.Label = null;

    @property(cc.Label)
    label_zuanshi: cc.Label = null;

    @property(cc.Node)
    layerPersion: cc.Node = null;

    @property(cc.Layout)
    layout_changeName: cc.Layout = null;

    @property(cc.EditBox)
    nameEditBox: cc.EditBox = null;

    @property(cc.AudioSource)
    upf_se: cc.AudioSource = null;
    @property(cc.AudioSource)
    dwf_se: cc.AudioSource = null;


    private msgqueue: Array<any> = new Array<any>();
    private locked: boolean = false;

    private channelIndex = -1;

    @property(cc.AudioSource)
    audiotanchuangeffect: cc.AudioSource = null;

    @property(cc.AudioSource)
    btncloseeffect: cc.AudioSource = null;

    @property(cc.AudioSource)
    error_se: cc.AudioSource = null;

    private vipZuanshi: number = 0;
    private ROOMSTATE = {
        ROOM_CHANNEL: 0,
        ROOM_MACHINE: 1,
    }

    /////////网络提示///////////////
    @property(cc.Layout)
    layout_tip: cc.Layout = null;
    @property(cc.Layout)
    layout_loading: cc.Layout = null;
    private roominfo:any;
    highZuanshi: any;
    experienceZuanshi: any;
    primaryZuanshi: any;
    middleZuanshi: any;
    /////////网络提示///////////////

    /////////网络提示///////////////
    setLoadingEnable(enable: boolean) {
        if (enable) {
            this.startErrorTimer();
        } else {
            this.stopErrorTimer();
        }
        // this.layout_loading.node.active = enable;
    }
    setTipMessage(message: string, call: any) {
        this.setLoadingEnable(false);
        if (!this.layout_tip.node.active) {
            this.layout_tip.node.getComponent('tipController').setMessage(message);
            this.layout_tip.node.getComponent('tipController').setCallBack(call);
            this.layout_tip.node.active = true;
        }
    }
    startDelayTime() {
        this.scheduleOnce(this.delayTime, 3.0);
    }
    stopDelayTime() {
        this.unschedule(this.delayTime);
    }
    delayTime() {
        this.setLoadingEnable(true);
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
        self.returnHall()
    }
    /////////网络提示///////////////

    private roomState = this.ROOMSTATE.ROOM_CHANNEL;


    public setChannelScore_0(score: number, zunNum: number) {//体验
        this.label_channel_score_0.string = "" + score
        this.label_channel_zuan_0.string = "" + zunNum
    }
    public setChannelScore_1(score: number, zunNum: number) {//初级 
        this.label_channel_score_1.string = "" + score
        this.label_channel_zuan_1.string = "" + zunNum
    }
    public setChannelScore_2(score: number, zunNum: number) {//中级
        this.label_channel_score_2.string = "" + score
        this.label_channel_zuan_2.string = "" + zunNum
    }
    public setChannelScore_3(score: number, zunNum: number) {//高级
        this.label_channel_score_3.string = "" + score
        this.label_channel_zuan_3.string = "" + zunNum
    }
    public setChannelScore_4(score: number, zunNum: number) {//vip场
        this.label_channel_score_4.string = "" + score
        this.label_channel_zuan_4.string = "" + zunNum
    }
    setTouchEnable(enable: boolean) {
        this.layout_touch.node.active = !enable;
    }
    setUserInfo() {
        this.label_name.string = GlobalUnit.username;
        this.label_coin.string = "" + GlobalUnit.coin;
        this.label_zuanshi.string = "" + GlobalUnit.zuanshi;
    }
    initmusic() {
        this.audiotanchuangeffect.volume = GlobalUnit.effectVolume || 1;
        this.btncloseeffect.volume = GlobalUnit.effectVolume || 1;
        this.error_se.volume = GlobalUnit.effectVolume || 1;
        this.dwf_se.volume = GlobalUnit.effectVolume || 1;
        this.upf_se.volume = GlobalUnit.effectVolume || 1;

    }
    initUi() {

    }


    initGlobal(){
        var data =  JSON.parse(cc.sys.localStorage.getItem("GlobalData"))
       // GlobalUnit.name='Tracer',
        GlobalUnit.gatehost=data.gatehost,
        GlobalUnit.ip= data.ip, //服务器的ip
        GlobalUnit.port= data.port,//服务器的端口
        GlobalUnit.uid= data.uid,//用户登录的uid
        GlobalUnit.uid1= data.uid1,//用户登录的uid
        GlobalUnit.jwt= data.jwt,//用户登录的授权
        GlobalUnit.password= data.password, //用户登录的密码
        GlobalUnit.username= data.username,
        GlobalUnit.userlevel= data.userlevel,//军衔（未定）
        GlobalUnit.avatar= data.avatar,
        GlobalUnit.fangka= data.fangka,
        GlobalUnit.roomkey= data.roomkey,
        GlobalUnit.agent_uid= data.agent_uid,
        GlobalUnit.roomtype= data.roomtype,    
        GlobalUnit.jifen= data.jifen,
        GlobalUnit.sex= data.sex,
        GlobalUnit.agency= data.agency,
        GlobalUnit.gps= data.gps,
        GlobalUnit.tmpuid= data.tmpuid,
        //GlobalUnit.offlinejitai= data.offlinejitai,
        GlobalUnit.reviewdata= data.reviewdata,
        GlobalUnit.host=data.host,   
        GlobalUnit.zuanshi= data.zuanshi,
        GlobalUnit.coin=data.coin,
        GlobalUnit.testcoin=data.testcoin,
        GlobalUnit.isBackRoom=data.isBackRoom,
        GlobalUnit.channle=data.channle, 
        GlobalUnit.huifang= data.huifang,
        GlobalUnit.huifangmychairid= data.huifangmychairid,
        GlobalUnit.huifangroomkey= data.huifangroomkey,
        GlobalUnit.hallKey= data.hallKey,
        GlobalUnit.roomKey= data.roomKey,
        GlobalUnit.yaoqingId=data.yaoqingId,
        GlobalUnit.active=data.active,
        GlobalUnit.changenamecount=data.changenamecount,
        GlobalUnit.reLoginRoomType=data.reLoginRoomType,
        GlobalUnit.cuurentGame=data.cuurentGame,
        GlobalUnit.baoxianxiang_types=data.baoxianxiang_types,
        GlobalUnit.gameper = {1:"0.5",2:"0.5",3:"1",4:"2",5:"5",6:"10"},
        GlobalUnit.isOpenAct=data.isOpenAct,
        GlobalUnit.fishQuit= "",
        GlobalUnit.usercode=data.usercode,
        GlobalUnit.rank_exist=data.rank_exist,
        GlobalUnit.topdata= data.topdata,
        GlobalUnit.fristlogin=data.fristlogin,
        GlobalUnit.hores_top_list = data.hores_top_list, //赛马排名列表
        GlobalUnit.musicVolume=data.musicVolume
        GlobalUnit.gamebtnlist=data.gamebtnlist
        GlobalUnit.offlinejitai =  JSON.parse(cc.sys.localStorage.getItem("offlinejitai"))
    }

    onLoad() {
        //初始化global
        this.initGlobal()
        this.initNetWork(GlobalUnit.host, GlobalUnit.port, GlobalUnit.uid, GlobalUnit.jwt);
        this.login();

        this.et = cc['NetTarget'];
        this.msgqueue = new Array<any>();
        this.setTouchEnable(false);
        this.getMachineInfo();
       
        this.initmusic();
        this.text_channel_name.node.active = false;
        // this.layout_changeName.node.active = false;
        
        this.et.on("changeName", this.setUserInfo, this);
        this.et.on('join', this.joinRoom, this);
        this.et.on('rejoin', this.rejoinRoom, this);
        this.et.on("message", this.showMessage, this);
        this.et.on("updateCoinAndZuanshiqufen", this.setUserInfo, this);
        this.et.on("updateCoinAndZuanshicunfen", this.setUserInfo, this);
  
        this.setScrollview_channel_Enable(false);
        this.setScrollview_machine_Enable(false);
        if (GlobalUnit.is_weihu) {
            this.setGonggao_weihu(GlobalUnit.weihu_data);
        }
        if (GlobalUnit.offlinejitai != null) {
        
            // this.setTipMessage("是否进入断线留机机台？", function () {
            //     console.log("点击确定");
            //     self.setLoadingEnable(true);
            //     var arr = GlobalUnit.offlinejitai.split("-");
            //     console.log("arr=============", arr);
            //     console.log("cole ------------GlobalUnit.reLoginRoomType",GlobalUnit.reLoginRoomType);

            //     GlobalUnit.hallKey = parseInt(arr[1]);

            //     if (GlobalUnit.reLoginRoomType == "mx99") {
            //         GlobalUnit.baoxianxiang_types="game";
            GlobalUnit.offlinejitai = null;
            cc.sys.localStorage.removeItem("offlinejitai");
            cc.director.loadScene('game_bigPlate_new');  
            //     } 
            // }, function () {
            //     self.deleteRoom();
            // })
        }

    }
 
    //cole 初始化房间信息
    initgetroominfo()
    {
        var self = this
        if (GlobalUnit.isBackRoom == false) {
            this.setScrollview_channel_Enable(true);
            this.setScrollview_machine_Enable(false);
            // this.getMachineInfo(); 
        } else {
            this.setScrollview_channel_Enable(false);
            this.setScrollview_machine_Enable(true);
            this.joinChannel("" +GlobalUnit.channle);
        }
    }

    private getuserInfo() {
        var self = this;
        var url = GlobalUnit.gatehost+ "/userinfo?uid=" + GlobalUnit.uid;
        console.log("url================", url);
        self.setLoadingEnable(true); /////////网络提示///////////////
        Http.get(url, function (eventName: string, xhr: XMLHttpRequest) {
            if (eventName == 'COMPLETE') {
                self.setLoadingEnable(false); /////////网络提示///////////////
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var response = JSON.parse(xhr.responseText)
                    console.log("responseinfo======", response);
                    GlobalUnit.zuanshi = Number(response.data.zuanshi);
                    GlobalUnit.coin = Number(response.data.coin);
                    GlobalUnit.testcoin = Number(response.data.testcoin);
                    this.initgetroominfo()
                    self.setUserInfo();
                    self.setAvatar();
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
    public netLogin(event) {
        this.setLoadingEnable(false);/////////网络提示///////////////
        var self = this
        console.log("event.detail.data=========", JSON.stringify(event.detail.data));
        console.log("event.detail.data=========", event.detail.data);

        var info = event.detail.data;
        GlobalUnit.uid = info.uid;
        GlobalUnit.jwt = info.jwt;
        GlobalUnit.uid1 = info.uid1;
        GlobalUnit.username = info.name;
        GlobalUnit.ip = info.ip;
        GlobalUnit.sex = info.sex;
        GlobalUnit.avatar = info.avatar;
        GlobalUnit.yaoqingId = info.yaoqingma
        GlobalUnit.offlinejitai = info.offlinejitai
        GlobalUnit.reLoginRoomType = info.roomtype;
        GlobalUnit.in_total_line = info.in_total_line;
        GlobalUnit.isOpenAct = info.lglist ? info.lglist : false;
        GlobalUnit.usercode = info.safecode ? info.safecode : "";
        GlobalUnit.rank_exist = info.rank_exist||false;
        GlobalUnit.userlevel = info.rank||"";
        GlobalUnit.fristlogin = true
        console.log("res", info);

        console.log("game_list", info.game_list);

        GlobalUnit.sm_key = info.sm_key


        GlobalUnit.active = info.active
        GlobalUnit.reLoginRoomType = info.roomtype;
        if (parseInt(GlobalUnit.avatar) > 3) {
            GlobalUnit.sex = "1";
        } else {
            GlobalUnit.sex = "0";
        }
    }

    private rejoinRoom(event) {
        console.log("rejoinRoom =======event.detail====", event.detail);
        this.setTouchEnable(false);
        this.sendmc('room', 'rejoin', { uid: GlobalUnit.uid });
    }
    private joinRoom(event) {
        console.log("event.detail====", event.detail);
        this.setTouchEnable(false);
        this.sendmc('room', 'join', { t: 'dzb', hallkey: this.channelIndex, roomkey: event.detail });
    }
    gethallInfo(roomIndex: number) {
        var self = this;
        var url =  GlobalUnit.gatehost + "/hallinfo?t=dzb&hallkey=" + roomIndex
        this.channelIndex = roomIndex;
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
    getMachineInfo() {
        var self = this;
        var url =  GlobalUnit.gatehost+ "/hallrefresh?t=dzb&hallkey=1"
        console.log("url================", url);
        self.setLoadingEnable(true);
        Http.get(url, function (eventName: string, xhr: XMLHttpRequest) {
            self.setTouchEnable(true);
            self.setLoadingEnable(false);
            if (eventName == 'COMPLETE') {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var response = JSON.parse(xhr.responseText)
                    console.log("getMachineInfo======", response);
                    self.setMachineInfo(response.data.roominfo)
                    this.getuserInfo();
                }
            } else if (eventName == 'TIMEOUT') {
                //TODO:添加提示连接网关超时
                self.setTipMessage("网络连接超时，请重新登录", function () {
                    self.goloading();
                })
            } else if (eventName == 'ERROR') {
                cc.log("添加提示连接网关发生错误")
                self.setTipMessage("网络连接错误，请重新登录", function () {
                    self.goloading();
                })
            }
        }, this);
    }
    setMachineInfo(info: any) {
        console.log("info============", info.length);
        for (var i = 0; i < info.length; i++) {
            switch (info[i]._id) {
                case 'dzb-1':
                    this.label_channel_score_0.string = info[i].coin;
                    this.label_channel_zuan_0.string = info[i].zuanshi ? info[i].zuanshi +"z"  : "b"
                    this.experienceZuanshi = info[i].zuanshi == undefined ? 0 : info[i].zuanshi
                 
                    break;
                case 'dzb-2':
                    this.label_channel_score_1.string = info[i].coin;
                    this.label_channel_zuan_1.string = info[i].zuanshi ? info[i].zuanshi +"z"  : "b"
                    this.primaryZuanshi = info[i].zuanshi == undefined ? 0 : info[i].zuanshi
                   
                    break;
                case 'dzb-3':
                    this.label_channel_score_2.string = info[i].coin;
                    this.label_channel_zuan_2.string = info[i].zuanshi ? info[i].zuanshi +"z"  : "b"
                    this.middleZuanshi = info[i].zuanshi == undefined ? 0 : info[i].zuanshi
                   
                    break;
                case 'dzb-4':
                    this.label_channel_score_3.string = info[i].coin;
                    this.label_channel_zuan_3.string = info[i].zuanshi ? info[i].zuanshi +"z" : "b"
                    this.highZuanshi = info[i].zuanshi == undefined ? 0 : info[i].zuanshi
                    break;
                case 'dzb-5':
                    this.label_channel_score_4.string = info[i].coin;
                    this.label_channel_zuan_4.string = info[i].zuanshi ? info[i].zuanshi +"z"  : "b"
                    this.vipZuanshi = info[i].zuanshi == undefined ? 0 : info[i].zuanshi
                    break;
            }
        }
    }
    setGonggao(data: any) {
        this.label_gonggao.getComponent('gonggaoController').setGonggao_cmd(data);
    }
    setGonggao_weihu(data: any) {
        this.label_gonggao.getComponent('gonggaoController').setGonggao_weihu(data);
    }
    on_tcp_notice_post(cmd: any) {
        var self = this;
        this.setGonggao(cmd)
        self.locked = false;
    }
    start() {

    }
    initMachine(machineInfo: any) {
        console.log("initMachine======", machineInfo);
        this.scrollview_machine.content.removeAllChildren();
        for (var i = 0; i < machineInfo.roomcount; i++) {
            var item = cc.instantiate(this.btn_machine);
            var state = item.getComponent('btn_machineController_dzb').BTNSTATE.BTN_DEFAULT
            item.getComponent('btn_machineController_dzb').setMachineState(state);
            item.getComponent('btn_machineController_dzb').setMachineNumber(i + 1);
            item.name = "dzb-" + this.channelIndex + "-" + (i + 1)
            this.scrollview_machine.content.addChild(item);
        }

        var keys = Object.keys(machineInfo.roominfo);
        for (var key in machineInfo.roominfo) {
            console.log(" machineInfo.roominfo===1==", key);
            var node = this.scrollview_machine.content.getChildByName(key)
            var mstate = 0
            if (machineInfo.roominfo[key].t == 'playing') {
                mstate = item.getComponent('btn_machineController_dzb').BTNSTATE.BTN_PLAYING
                node.getComponent('btn_machineController_dzb').setMachineState(mstate);
            }
            if (machineInfo.roominfo[key].t == 'baoliujitai') {
                mstate = item.getComponent('btn_machineController_dzb').BTNSTATE.BTN_HOLD
                node.getComponent('btn_machineController_dzb').setMachineState(mstate, machineInfo.roominfo[key].data.timestamp, machineInfo.roominfo[key].data.uid);
            }
            if (machineInfo.roominfo[key].t == "offline") {
                mstate = item.getComponent('btn_machineController_dzb').BTNSTATE.BTN_HOLD_LOST
                node.getComponent('btn_machineController_dzb').setMachineState(mstate, machineInfo.roominfo[key].data.timestamp, machineInfo.roominfo[key].data.uid);
            }
            console.log("machineInfo.roominfo[key].data.name===", machineInfo.roominfo[key].data.name);
            console.log("machineInfo.roominfo[key].data.avatar===", machineInfo.roominfo[key].data.avatar);
            node.getComponent('btn_machineController_dzb').setPlayingInfo(machineInfo.roominfo[key].data.name,machineInfo.roominfo[key].data.level);
            node.getComponent('btn_machineController_dzb').setSexO(machineInfo.roominfo[key].data.avatar);
        }
        this.setScrollview_channel_Enable(false);
        this.setScrollview_machine_Enable(true);
    }
    setChannelName(channelIndex: number) {
        var self = this;
        var filName = "textures/room/text_channel_" + channelIndex;
        cc.loader.loadRes(filName, cc.SpriteFrame, function (err, spriteFrame) {
            self.text_channel_name.spriteFrame = spriteFrame;
            self.text_channel_name.node.active = true;
        });
    }
    showMessage(event) {
        var message = event.detail;
        this.layout_message.getComponent('messageController_dzb').setMessage(message);
    }
    showMessage1(message: string) {
        this.layout_message.getComponent('messageController_dzb').setMessage(message);
    }
    update(dt) {
        var self = this;
        if (!self.locked && self.msgqueue.length > 0) {
            var cmd = self.msgqueue.shift();
            self.locked = true;
            console.log("cmd==========", cmd);
            var fname = "on_" + cmd.src + "_" + cmd.c + "_" + cmd.m
            console.log("fname==========", fname);
            try {
                var f: Function = this[fname]
                if (f) {
                    f.call(this, cmd)
                } else {
                    self.locked = false;
                }
            } catch (error) {
                self.locked = false;
            }
        }
    }
    btn_back_click(event, customEventData) {
        var self = this
        this.audiotanchuangeffect.play();
        console.log("this.roomState=====btn_back_click=====", this.roomState);
        switch (this.roomState) {
            case this.ROOMSTATE.ROOM_CHANNEL:
                this.scheduleOnce(function () {
                    self.returnHall()
                }, 0.1);
                break;
            case this.ROOMSTATE.ROOM_MACHINE:
                //保存数据
               
                this.setScrollview_channel_Enable(true);
                this.setScrollview_machine_Enable(false);
                this.sendmcWithOutBack('hall', 'hallquit', { hallkey: this.channelIndex, t: 'dzb' });
                this.roomState = this.ROOMSTATE.ROOM_CHANNEL;
                this.channelIndex = -1;
                break;
        }
    }
    btn_rank_click(event, customEventData) {
        var self = this;
        this.audiotanchuangeffect.play();
        cc.loader.loadRes("prefabs/layerRank", function (err, prefab) {
            var newNode = cc.instantiate(prefab);
            self.node.addChild(newNode);
        });
    }
    btn_noice_click(event, customEventData) {
        this.audiotanchuangeffect.play();
        this.layerNotice.active = true;
    }
    btn_baoxianxiang_click(event, customEventData) {
        this.audiotanchuangeffect.play();
        this.openBaoxianxiang();
       // this.layerBaoxian.active = true;
    }
    btn_setting_click(event, customEventData) {
        this.audiotanchuangeffect.play();
        this.layerSetting.active = true;
    }
    private setScrollview_channel_Enable(enable: boolean) {
        this.scrollview_channel.node.active = enable;
        if (!enable) {
            this.scrollview_channel.stopAutoScroll();
            this.scrollview_channel.scrollToLeft(0, true);
        }
    }
    private setScrollview_machine_Enable(enable: boolean) {
        this.scrollview_machine.node.active = enable;
        if (!enable) {
            this.scrollview_machine.content.removeAllChildren();
            this.scrollview_machine.stopAutoScroll();
            this.scrollview_machine.scrollToLeft(0, true);
            this.text_channel_name.node.active = false;
        }
    }
    joinChannel(channel: string) {
        this.roomState = this.ROOMSTATE.ROOM_MACHINE;
        console.log("channel====joinChannel====", channel);
        this.sendmcWithOutBack('hall', 'hallenter', { hallkey: channel, t: 'dzb' });
        switch (channel) {
            case "1":
                if ( (GlobalUnit.zuanshi*100) + GlobalUnit.coin >= this.experienceZuanshi*100 ) {
                    console.log("体验场");
                    this.setChannelName(0);
                    this.channelIndex = 1;
                    this.gethallInfo(1);
                } else {
                    this.roomState = this.ROOMSTATE.ROOM_CHANNEL;
                    this.showMessage1('钻石不足');
                    if (GlobalUnit.isBackRoom == true) {
                        this.setScrollview_channel_Enable(true);
                        this.setScrollview_machine_Enable(false);
                    }
                }
                break;
            case "2":
                if ( (GlobalUnit.zuanshi*100) + GlobalUnit.coin >= this.primaryZuanshi *100 ) {
                    console.log("初级场");
                    this.setChannelName(1);
                    this.channelIndex = 2;
                    this.gethallInfo(2);
                } else {
                    this.roomState = this.ROOMSTATE.ROOM_CHANNEL;
                    this.showMessage1('钻石不足');
                    if (GlobalUnit.isBackRoom == true) {
                        this.setScrollview_channel_Enable(true);
                        this.setScrollview_machine_Enable(false);
                    }
                }
                break;
            case "3":
                if ( (GlobalUnit.zuanshi*100) + GlobalUnit.coin >= this.middleZuanshi*100 ) {
                    console.log("中级场");
                    this.setChannelName(2);
                    this.channelIndex = 3;
                    this.gethallInfo(3);
                } else {
                    this.roomState = this.ROOMSTATE.ROOM_CHANNEL;
                    this.showMessage1('钻石不足');
                    if (GlobalUnit.isBackRoom == true) {
                        this.setScrollview_channel_Enable(true);
                        this.setScrollview_machine_Enable(false);
                    }
                }
                break;
            case "4":
                if ( (GlobalUnit.zuanshi*100) + GlobalUnit.coin >= this.highZuanshi*100 ) {
                    console.log("高级场");
                    this.setChannelName(3);
                    this.channelIndex = 4;
                    this.gethallInfo(4);
                } else {
                    this.roomState = this.ROOMSTATE.ROOM_CHANNEL;
                    this.showMessage1('钻石不足');
                    if (GlobalUnit.isBackRoom == true) {
                        this.setScrollview_channel_Enable(true);
                        this.setScrollview_machine_Enable(false);
                    }
                }
                break;
            case "5":
                if ( (GlobalUnit.zuanshi*100) + GlobalUnit.coin >= this.vipZuanshi * 100) {
                    console.log("vip级场");
                    this.setChannelName(4);
                    this.gethallInfo(5);
                } else {
                    this.roomState = this.ROOMSTATE.ROOM_CHANNEL;
                    this.showMessage1('钻石不足');
                    if (GlobalUnit.isBackRoom == true) {
                        this.setScrollview_channel_Enable(true);
                        this.setScrollview_machine_Enable(false);
                    }
                }
                break;
        }
    }
    btn_channel_click(event, customEventData) {
        event.target.stopAllActions();
        this.audiotanchuangeffect.play();
        this.joinChannel(customEventData);
    }

    returnHall(){
        let subgameSearchPath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/')+'ALLGame/dzb/';
        cc.sys.localStorage.setItem("returnHall",1)
        require(subgameSearchPath + 'src/dating.js');
    }

    netError(event) {
        var self = this
        console.log("网络错误房间内");

        self.setTipMessage("网络连接失败，请重新登录", function () {
            console.log("点击确定");
            self.returnHall()
        })
    }
    public sendmc(c: string, m: string, data: any) {
        this.startDelayTime();
        cc['Network'].sendmc(c, m, data);
    }
    public sendmcWithOutBack(c: string, m: string, data: any) {
        cc['Network'].sendmc(c, m, data);
    }
    netData(event) {
        console.log("RoomController_daziban netData");
        this.stopDelayTime();
        this.setLoadingEnable(false);
        this.msgqueue.push(event.detail);
    }

    netStart(event) {
        console.log("RoomController_daziban event");
    }

    netClose(event) {
        console.log("RoomController_daziban netClose");
        var self = this
        self.setTipMessage("网络连接错误，请重新登录", function () {
            self.returnHall()
        })
    }
    public dummykick(event) {
        var self = this;
        this.setTipMessage("您的账号在其他设备登录，请重新登录", function () {
            console.log("点击确定");
            self.returnHall()
        })
    }
    private RandomNumBoth(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.round(Rand * Range); //四舍五入
        return num;
    }
    public setAvatar() {
        var self = this;
        if(parseInt(GlobalUnit.avatar)>3){
            GlobalUnit.sex = "1";
        }else{
            GlobalUnit.sex = "0";
        }
        var filName = "textures/to" + GlobalUnit.avatar;
        cc.loader.loadRes(filName, cc.SpriteFrame, function (err, spriteFrame) {
            self.avatar.spriteFrame = spriteFrame;
        });
    }

    on_tcp_hall_update(cmd: any) {
        if (this.channelIndex == -1) {
            this.locked = false;
            return
        }
        this.gethallInfo(this.channelIndex);
        this.locked = false;
    }
    on_tcp_room_rejoin(cmd: any) {
        //console.log("xiaowa________ join  room  ")
        if (cmd.data.error) {
            this.showMessage1(cmd.data.error);
        } else {
            cc.director.loadScene("game_bigPlate_new");
            GlobalUnit.baoxianxiang_types="game"
        }
    }
    on_tcp_room_join(cmd: any) {
        //console.log("xiaowa________ join  room  ")
        if (cmd.data.error) {
            this.showMessage1(cmd.data.error);
        } else {
            cc.director.loadScene("game_bigPlate_new");
            GlobalUnit.baoxianxiang_types="game"
        }
    }
    on_btn_playerInfo_click(event, customEventData) {
        this.layerPersion.active = true;
    }

    private changeName(name: string) {
        var self = this;
        var url =  GlobalUnit.gatehost+ "/changename?uid=" + GlobalUnit.uid + "&name=" + name;
        console.log("url================", url);
        self.setLoadingEnable(true); /////////网络提示///////////////
        Http.get(url, function (eventName: string, xhr: XMLHttpRequest) {
            if (eventName == 'COMPLETE') {
                self.setLoadingEnable(false); /////////网络提示///////////////
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var response = JSON.parse(xhr.responseText)
                    console.log("responseinfo======", response);
                    GlobalUnit.username = response.data.name;
                    this.layout_changeName.node.active = false;
                    self.et.emit('changeName')
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
    checkName(str) {
        var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
        return reg.test(str);
    }
    checkNamelength(str) {
        var bytesCount:number = 0;
        for (var i = 0; i < str.length; i++) {
            var c = str.charAt(i);
            if (/^[\u0000-\u00ff]$/.test(c)) //匹配双字节
            {
                bytesCount += 1;
            }
            else {
                bytesCount += 2;
            }
        }
        return bytesCount;
    }

    on_btn_changeName_click(event, customEventData) {//修改昵称
        if (this.nameEditBox.string) {
            if (this.checkNamelength(this.nameEditBox.string) <= 12) {
                if (this.checkName(this.nameEditBox.string)) {
                    this.changeName(this.nameEditBox.string);
                } else {
                    this.showMessage1('输入的玩家昵称非法请重新输入（昵称只能是汉字、字母或数字）');
                }
            } else {
                this.showMessage1('昵称长度为4～12个字符');
            }

        } else {
            this.showMessage1('输入的玩家昵称非法请重新输入（昵称只能是汉字、字母或数字）');
        }
    }

    on_tcp_room_resetzuanshi(cmd: any) {
        var self = this;
        console.log("重置钻石==============", cmd);
        if (cmd.data.ok == 'ok') {
            GlobalUnit.zuanshi = cmd.data.zuanshi;
            self.setUserInfo();
            self.et.emit("baoxianxiangupdate");
        }
        this.locked = false;
    }

    onEditClicked(event, customEventData) {
        var self = this
        this.layout_changeName.node.active = true;
    }
    onTextChanged(text, editbox, customEventData) {


    } 

    openBaoxianxiang()
    {
        var filName = "prefabs/layerBaoxian.prefab";
        cc.loader.loadRes(filName,function (err, prefab) {
        if( err ) { cc.log( '载入预制资源失败, 原因:' + err ); return; }
        var layerbaoxian =cc.instantiate(prefab);
        layerbaoxian.setPosition( new cc.Vec2(568,320));
        cc.director.getScene().addChild(layerbaoxian);
        })
    }
}
