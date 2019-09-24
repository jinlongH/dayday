const {ccclass, property} = cc._decorator;

import { DzbModel } from './DzbModel_DZB';
import { RoomController_daziban } from './roomController_daziban_dzb';
import { GlobalUnit } from './GlobalUint';

@ccclass
export class DzbCtrl { //大字版主游戏业务逻辑对象
    
    private scheduler: cc.Scheduler;
    private static instance: any = null;

    private dzb_model :DzbModel = null;

    private et: cc.EventTarget = null;
    private locked: boolean = false;
    private locked_net :boolean = false;
    private msgqueue: Array<any> = new Array<any>();

    private setIntervalID1:number = null;
    private setIntervalID2:number = null;

    private locked_view_1:boolean = false;

    private animateNode:cc.Node = null;

    public constructor() {
        if (DzbCtrl.instance) {
            throw (new Error(" DzbCtrl.instance already exist"));
        }
        
        this.dzb_model = DzbModel.getInstance()

        this.et = cc['NetTarget'];
        this.et.on('netData', this.netData, this);
        this.et.on('netError', this.netError, this);
        this.et.on('netClose', this.netClose, this);
        this.et.on('netkick', this.kick, this);
        this.et.on("changeMachine", this.changeMachine, this);
        this.et.on("holdmachine", this.holdmachine, this);
        this.et.on('hold', this.hold, this);
        this.et.on("z2c", this.ztc, this);
        this.et.on("c2z", this.ctz, this);
        var scheduler = cc.director.getScheduler();
        this.scheduler = scheduler;
        // scheduler.schedule(this.network.bind(this), this, 0.01,999999, 0, false);
        // setInterval(this.network.bind(this), 100);
        DzbCtrl.instance = this;
        this.animateNode = new cc.Node();
        cc.director.getScene().addChild(this.animateNode);
        console.log("大字板控制器初始化");
        var GlobalUnit =  JSON.parse(cc.sys.localStorage.getItem("GlobalData"))
        GlobalUnit.cuurentGame = 'dzb';
    }

    public static getInstance() { //获得单例
        if (!DzbCtrl.instance) {
            return new DzbCtrl();
        }
        return DzbCtrl.instance;
    }

    public static cleanInstance() { //清理单例
        DzbCtrl.instance.et.off('netData', DzbCtrl.instance.netData, DzbCtrl.instance);
        DzbCtrl.instance.et.off('netError', DzbCtrl.instance.netError, DzbCtrl.instance);
        DzbCtrl.instance.et.off('netClose', DzbCtrl.instance.netClose, DzbCtrl.instance);
        DzbCtrl.instance.et.off('netkick', DzbCtrl.instance.kick, DzbCtrl.instance);
        DzbCtrl.instance.et.off("changeMachine", DzbCtrl.instance.changeMachine, DzbCtrl.instance);
        DzbCtrl.instance.et.off("holdmachine", DzbCtrl.instance.holdmachine, DzbCtrl.instance);
        DzbCtrl.instance.et.off('hold', DzbCtrl.instance.hold, DzbCtrl.instance);
        DzbCtrl.instance.et.off("z2c", DzbCtrl.instance.ztc, DzbCtrl.instance);
        DzbCtrl.instance.et.off("c2z", DzbCtrl.instance.ctz, DzbCtrl.instance);
        GlobalUnit.cuurentGame = '';
        DzbCtrl.instance = null;
    }

    changeMachine(event) {
        console.log("换机台======", event.detail);
        if(!event.detail){
            this.et.emit('tips_message', "机台被占用!");
            return ;
        }
        this.dzb_model.sendmc('room', 'quit', { zhuanji: 'zhuanji' });
        this.dzb_model.sendmc('room', 'join', { t: 'dzb', hallkey: GlobalUnit.hallKey, roomkey: event.detail });
    }

    holdmachine(event) {
        this.dzb_model.sendmc('room', 'quit', { index: event.detail });
    }

    private netError(event) { //网络链接错误
        this.dzb_model.State = DzbModel.GAMESTATE.GAME_NET_ERROR
    }

    private netClose(event) { //网络链接关闭
        this.dzb_model.State = DzbModel.GAMESTATE.GAME_NET_CLOSE
    }

    private kick(event) { //其他客户端登陆
        this.dzb_model.State = DzbModel.GAMESTATE.GAME_NET_CICK
    }

    public network() {
        //console.log('xiaowa network===========',this.locked)
        var self = this;
        if (!self.locked && !self.locked_net && self.msgqueue.length > 0) {
            self.locked_net = true;
            var cmd = self.msgqueue.shift();
            console.log("cmd=============",cmd);
            var fname = "on_" + cmd.src + "_" + cmd.c + "_" + cmd.m
            console.log("fname==========", fname);
            try {
                var f: Function = this[fname]
                if (f) {
                    f.call(this, cmd)
                } else {
                    self.locked_net = false;
                    console.log("----------------cmd is not run.")
                }
            } catch (error) {
                self.locked_net = false;
                console.log('cmd run error .',error)
            }
            self.locked_net = false;
        }
    }
    private netData(event) { //收到通讯数据
        var data = event.detail
        this.msgqueue.push(event.detail);
        // console.log("netData :", data);
    }
    //---------------------------具体消息处理-----------------------------

    on_tcp_notice_post(cmd: any) {
        console.log("on_tcp_notice_post on_tcp_notice_post ",cmd);
        this.et.emit("gonggao", cmd);
    }

    on_tcp_room_z2c(cmd: any) {
        var self = this;
        console.log("取分==============", cmd);
        if (cmd.data.ok == 'ok') {
            GlobalUnit.zuanshi = cmd.data.zuanshi;
            GlobalUnit.coin = cmd.data.coin;
            this.et.emit("baoxianxiangupdate");
            this.et.emit("updateCoinAndZuanshiqufen");
        }
    }
    on_tcp_room_rejoin(cmd: any) {
        var self = this;
        console.log("on_tcp_room_bibei=======", cmd);
        if (cmd.data.error) {
            this.et.emit("rejoin",cmd);
        }
    }
    on_tcp_room_c2z(cmd: any) {
        var self = this;
        console.log("存分==============", cmd);
        if (cmd.data.ok == 'ok') {
            GlobalUnit.zuanshi = cmd.data.zuanshi;
            GlobalUnit.coin = cmd.data.coin;
            this.et.emit("baoxianxiangupdate");
            this.et.emit("updateCoinAndZuanshicunfen");
        }
    }

    on_tcp_room_resetzuanshi(cmd: any) {
        var self = this;
        console.log("重置钻石==============", cmd);
        if (cmd.data.ok == 'ok') {
            GlobalUnit.zuanshi = cmd.data.zuanshi;
            this.et.emit("baoxianxiangupdate");
            this.et.emit("updateCoinAndZuanshicunfen");
        }
    }

    on_tcp_game_error(cmd:any)
    {
        console.log("账号异常=============", cmd);
        var  self  = this 
        var func = function () {
            console.log("点击确定");
            self.dzb_model.sendmc('room', 'quit', {});
        }
        var param = {message:cmd.data.error,call:func}
        this.et.emit("setTipMessage2",param);
    }
     // TODO Grayson 界面锁
    on_tcp_room_userupdate(cmd: any) {
        var self = this;
        console.log("cmd.data.flag============", cmd.data.flag);

        
        var actions = cmd.data.actions;
        var flag = cmd.data.flag;
        GlobalUnit.coin = cmd.data.score;
        self.dzb_model.Flag = flag;
        self.dzb_model.Actions = actions;
        self.dzb_model.showscore = cmd.data.showscore
        self.dzb_model.score = cmd.data.score
        self.dzb_model.handcards = cmd.data.handcards
        self.dzb_model.selectcards = cmd.data.selectcards
        self.dzb_model.curstyle = cmd.data.curstyle
        self.dzb_model.history = cmd.data.history
        self.locked = false;
        // flag 基本表示了什么函数处理的消息
        if (flag) {
            if (flag == 'gameBegin') { //两次开牌函数处理 都返回这个参数（两次开牌都是这个gameBegin函数）
                //console.log(" xiaowa  ============= gameBegin");
                self.dzb_model.is_win = false;
                if (!actions.begin) {
                    self.dzb_model.Less = DzbModel.LESS_STATE.LESS_TWO;
                    //console.log(" xiaowa  ============= LESS_TWO");
                }else {
                    self.dzb_model.Less = DzbModel.LESS_STATE.LESS_ONE;
                    //console.log(" xiaowa  ============= LESS_ONE");
                }
                
                self.dzb_model.timeconfig = cmd.data.timeconfig
                self.locked = true;
            }else if (flag == 'hold') { //玩家选择留牌的时候 返回这个参数（就是点击牌面，来留牌，服务端返回这个参数还有数据）
                self.dzb_model.Less = DzbModel.LESS_STATE.LESS_HOLD
                self.dzb_model.timeconfig = cmd.data.timeconfig
            }else if (flag == 'defenwin') { //游戏一轮结束，defen函数处理返回的值，这个表示赢了
                self.dzb_model.Less = DzbModel.LESS_STATE.LESS_GETSCORE
                //self.locked = true;
            }else if (flag == 'defenlose') { //游戏一轮结束，defen函数处理返回的值，这个表示输了
                self.dzb_model.Less = DzbModel.LESS_STATE.NULL
                self.dzb_model.timeconfig = cmd.data.timeconfig
            }else if (flag == 'bibeijieshu') { //比倍结束返回这个值 ，cmd_client_room_bigorsmall 消息处理的（就是每次点击大或者小，服务器处理的函数，然后返回的这个值）
                self.dzb_model.Less = DzbModel.LESS_STATE.LESS_BIBEI_END
                self.dzb_model.timeconfig = cmd.data.timeconfig
                self.locked = true;
                this.et.emit("show_bibeibaoji_score", cmd);
            }else if (flag == 'bibei') { //玩家点击（比倍、半比、双比）cmd_client_room_bibei消息处理返回的这个参数
                self.dzb_model.Less = DzbModel.LESS_STATE.LESS_OPEN_BIBEI
                self.dzb_model.timeconfig = cmd.data.timeconfig
                this.et.emit("show_bibeibaoji_score", cmd);
                //self.locked_view = false;
            }else if (flag == 'bibeicontinue') { //比倍一轮结束胜利,等待继续操作,返回这个值 ，cmd_client_room_bigorsmall 消息处理的（就是每次点击大或者小，服务器处理的函数，然后返回的这个值）
                self.dzb_model.Less = DzbModel.LESS_STATE.LESS_BIBEI_GO
                self.dzb_model.timeconfig = cmd.data.timeconfig
                self.locked = true;
                this.et.emit("show_bibeibaoji_score", cmd);
            }else {
                throw new Error("on_tcp_room_userupdate!============ flag is not exist");
            }
            console.log("self.dzb_model.Less============", self.dzb_model.Less);
        }
        
        /*
            actions.begin   是否是开牌之前的阶段，第二次开牌结束就没有这个属性了。一轮结束后，这个属性再次被初始化（就是又被赋值了）
            actions.play    未开始就有这个属性，一旦开始游戏这个属性就没有了，一轮结束时这个值又被初始化了（就是又被赋值了）
            actions.baoliuhuokaipai 第一次开牌结束时，被赋值，第二次开牌开始时被置nil
            actions.defenhuobibei   第二次开牌赢了的时候有此属性,玩家得分后被置nil （直接得分，或者比倍1-6次后得分 后被清空）
            actions.caidahuocaixiao 应该是收到玩家比倍消息（点击半比，比倍，双比这些）后有此属性，猜了大小后这个属性又被置空，继续点比倍又有此属性（cmd_client_room_bibei消息 处理添加的此属性）
            
            -------------
            actions.defenhuobibei  ---------表示时正在比倍，caidahuocaixiao 为nil时就表示现在应该选（比倍、半比、双比）的按钮，caidahuocaixiao有值时 就是选择big 或者 small的时候
            actions.caidahuocaixiao --------表示选择 big 或者 small 的状态（一旦点击 big 或者 small ,服务器收到 cmd_client_room_bigorsmall 这个属性又被置空）
        */

        if (actions.play) { //未开始，待机状态，可以点击开始按钮
            self.dzb_model.State = DzbModel.GAMESTATE.GAME_WAIT
            this.locked_view = false; // 界面锁
        }else if (actions.begin && actions.baoliuhuokaipai) { //第一次开牌结束，等待第二次开牌
            self.dzb_model.State = DzbModel.GAMESTATE.GAME_ONE
        }else if (actions.defenhuobibei && !actions.caidahuocaixiao) { //第二次开牌结束，选择得分或比倍状态，如果输了不会有此属性，输了会置play,begin属性
            if (self.dzb_model.Less == DzbModel.LESS_STATE.LESS_TWO) {
                self.dzb_model.Less = DzbModel.LESS_STATE.LESS_BIBEIHUODEFEN //牌翻过来再弹出比倍选择界面
            }
            self.dzb_model.State = DzbModel.GAMESTATE.GAME_BIBEIHUODEFEN
            self.dzb_model.is_win = true;
        }else if (actions.defenhuobibei && actions.caidahuocaixiao) { //点击比倍后的状态，现在选择big small
            self.dzb_model.State = DzbModel.GAMESTATE.GAME_BETGAME
        }

        if (self.dzb_model.Less == DzbModel.LESS_STATE.LESS_TWO) {
            this.et.emit("show_less");
        } else if (self.dzb_model.Less == DzbModel.LESS_STATE.LESS_GETSCORE) {
            this.et.emit("show_less");
        }else if (self.dzb_model.Less == DzbModel.LESS_STATE.LESS_HOLD) {
            this.et.emit("show_less");
        } else if (self.dzb_model.Less == DzbModel.LESS_STATE.LESS_BIBEIHUODEFEN) {
            this.et.emit("show_less");
        }

        
    }

    on_tcp_room_bibei(cmd: any) {
        var self = this;
        console.log("on_tcp_room_bibei=======", cmd);
        if (cmd.data.err) {
            this.et.emit("error_tips",cmd);
        }
    }

    on_tcp_room_begin(cmd: any) {
        var self = this;
        console.log("on_tcp_room_bibei=======", cmd);
        if (cmd.data.error) {
            this.et.emit("error_tips",cmd);
        }
    }

    on_tcp_room_loadcontext(cmd: any) {
        var self = this;

        if (self.dzb_model.is_re_connect) {
            self.dzb_model.null_net_data_count = 0;
            self.locked = false;
            var is_recv = cmd.is_recv;
            if (!is_recv) {
                // var c = self.dzb_model.last_send_cmd.c;
                // var m = self.dzb_model.last_send_cmd.m
                // var data = self.dzb_model.last_send_cmd.data
                self.dzb_model.sendmc('room',self.dzb_model.last_m,self.dzb_model.last_data);
                console.log(" is_recv :false ",self.dzb_model.last_m,self.dzb_model.last_data);
            }else{
                self.dzb_model.startDelayTime();
                console.log(" is_recv :true  ; waiting server data")
            }
            return
        }


        var config = cmd.data.config
        var info = cmd.data.players[0]
        cmd.data.score = info.score
        cmd.data.showscore = info.showscore
        GlobalUnit.coin = info.score;
        self.dzb_model.config = config
        self.dzb_model.timeconfig = config.timeconfig
        self.dzb_model.awardsInfo = config.timeconfig
        GlobalUnit.hallKey = config.hallkey;
        GlobalUnit.roomKey = config.roomkey;

        this.dzb_model.canBetSocre = config.coin;
        this.dzb_model.baseBetSocre = config.coin; //基本押注值
        this.et.emit("init_view");
        this.on_tcp_room_userupdate(cmd)
    }

    on_tcp_room_quit(cmd: any) {
        console.log("on_tcp_room_quit===========", cmd);
        var self = this;
        if (cmd.data.error) {
            console.log("退出错误");
            this.et.emit("error_tips",cmd);
        } else if (cmd.data.zhuanji) {
        } else {
            console.log("退出成功");
            GlobalUnit.isBackRoom = true;
            GlobalUnit.channle = cmd.data.config.hallkey;
            this.et.emit("quit_game");
        }
    }

    on_tcp_room_bigorsmall(cmd: any) {
        var self = this;
        this.et.emit("room_bigorsmall", cmd);
        console.log("on_tcp_room_bigorsmall======玩家一轮比倍结束点击直接得分=====", cmd);
    }

    on_tcp_hall_update(cmd: any) {
        var self = this
        this.et.emit("updateMachine");
    }
f
    on_tcp_room_join(cmd: any) {
        var self = this
        if (cmd.data.error) {
            this.et.emit("error_and_back",cmd);
        } else {
            self.dzb_model.sendmc("room", "loadcontext", {})
        }
    }

    // TODO Grayson 界面锁
    hold(event) {
        if(this.locked_view_1) return;
        var self = this;
        if (self.dzb_model.State == DzbModel.GAMESTATE.GAME_ONE) {
            self.dzb_model.sendmc('room', 'hold', { index: event.detail });
        }
    }

    ztc(event) {
        console.log("游戏内换分");
        if(event.detail == "z2call")
        {
            this.dzb_model.sendmc("room", "z2c", { zuanshi: Math.floor(GlobalUnit.zuanshi/10)*10})
            return ;
        }
        this.dzb_model.sendmc("room", "z2c", { zuanshi: 10 })
    }
    ctz(event) {
        console.log("游戏内换钻");
        if(event.detail == "c2zall")
        {
            this.dzb_model.sendmc("room", "c2z", { coin: Math.floor(GlobalUnit.coin/1000)*1000 })
            return ;
        }
        this.dzb_model.sendmc("room", "c2z", { coin: 1000 })
    }
    ///////------------------------视图调用---------------
    // TODO Grayson 界面锁
    public startGame() {
        console.log("grayson ================  tick ");
        if (this.dzb_model.State == DzbModel.GAMESTATE.GAME_WAIT
        || this.dzb_model.State == DzbModel.GAMESTATE.GAME_INIT
        || this.dzb_model.State == DzbModel.GAMESTATE.GAME_ONE) {
            console.log("grayson ================  startGame ");
            this.dzb_model.sendmc('room', 'begin', {bet:this.dzb_model.canBetSocre});
            // if (this.setIntervalID1) { 
            //     // clearInterval(this.setIntervalID1);
            //     this.setIntervalID1 = null;
            //     this.scheduler.unschedule(this.startGame.bind(this),this);
            // }
            // if (this.setIntervalID2) { 
            //     // clearInterval(this.setIntervalID2);
            //     this.setIntervalID2 = null;
            //     this.scheduler.unschedule(this.startGame.bind(this),this);
            // }

        }
    }

    public autoGame() {
       
        var self = this;
        this.dzb_model.autoGame = true;
        console.log("control control   autoGame autoGame  autoGame  ",this.dzb_model.autoGame);

        this.animateNode.stopAllActions();
        var seq = cc.sequence(cc.delayTime(0.2),cc.callFunc(function(){
            self.dzb_model.sendmc('room', 'begin', {bet:self.dzb_model.canBetSocre});   
            console.log("control control   autoGame autoGame  autoGame 22222  ",self.dzb_model.autoGame);
            self.setIntervalID1=null;
            self.setIntervalID2=null;
        }))
        this.animateNode.runAction(seq);
    }

    public get_score_end() { //得分结束，或者未得分结束，视图调用
        console.log("control control   get_score_end get_score_end  get_score_end  ",this.dzb_model.autoGame);
       
        if(!this.dzb_model.autoGame || this.setIntervalID1 || this.setIntervalID2){
            return;
        }
        this.autoGame();

         this.setIntervalID1 = 1;

    }

    public get_one_card() { //第一次翻牌动画结束
        console.log("control control   get_one_card get_one_card  get_one_card  ",this.dzb_model.autoGame);
        if(!this.dzb_model.autoGame || this.setIntervalID1 || this.setIntervalID2){

            return;
        }
        this.autoGame();
        this.setIntervalID2 = 2;

    }

    public set_bet_socre(score:number) {
        this.dzb_model.canBetSocre = score;
    }

    public stopGame() {
        this.dzb_model.autoGame = false;
    }

    public closeLocked() {
        this.locked = false;
    }
    public set locked_view(lock:boolean){
        this.locked_view_1 = lock;
    }
}