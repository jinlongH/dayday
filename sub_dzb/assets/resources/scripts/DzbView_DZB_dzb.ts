declare const require: any
const {ccclass, property} = cc._decorator;


import { DzbModel } from './DzbModel_DZB';
import { DzbCtrl } from './DzbCtrl_DZB';
import { RoomController_daziban } from './roomController_daziban_dzb';
import { GlobalUnit } from './GlobalUint';
  
var audio_config = {
    //                         第二次翻牌后报牌音效                           是否循环        第二次音效                                      是否循环         第一次翻牌后音效   resources/sound/straight_first
    ['fivebars'] :            {typeAudio:"resources/sound/five_bars.mp3",typeloop:false,effectAudio:"resources/sound/five_bars_bg.mp3",effectloop:false,firstEffectAudio:"resources/sound/straight_bg.mp3"},
    ['royalflush'] :          {typeAudio:"resources/sound/royal_flush.mp3",typeloop:false,effectAudio:"resources/sound/royal_flush_bg.mp3",effectloop:false,firstEffectAudio:"resources/sound/straight_bg.mp3"},
    ['fiveofakind'] :         {typeAudio:"resources/sound/five_of_kind.mp3",typeloop:false,effectAudio:"resources/sound/five_of_kind_bg.mp3",effectloop:false,firstEffectAudio:"resources/sound/five_of_kind_first.mp3"},
    ['strflush'] :            {typeAudio:"resources/sound/straight_flush.mp3",typeloop:false,effectAudio:"resources/sound/straight_flush_bg.mp3",effectloop:false,firstEffectAudio:"resources/sound/straight_flush_first.mp3"},
    ['fourofakind_J_A'] :     {typeAudio:"resources/sound/four_of_kind.mp3",typeloop:false,effectAudio:"resources/sound/four_of_kind_bg.mp3",effectloop:false,firstEffectAudio:"resources/sound/fstraight_bg.mp3"},
    ['fourofakind_2_10']:     {typeAudio:"resources/sound/four_of_kind.mp3",typeloop:false,effectAudio:"resources/sound/four_of_kind_bg.mp3",effectloop:false,firstEffectAudio:"resources/sound/straight_bg.mp3"},
    ['fullhouse'] :           {typeAudio:"resources/sound/fh_rs.mp3",typeloop:false,effectAudio:"resources/sound/straight_bg.mp3",effectloop:false,firstEffectAudio:"resources/sound/straight_first.mp3"},
    ['flush']:                {typeAudio:"resources/sound/fl_rs.mp3",typeloop:false,effectAudio:"resources/sound/straight_bg.mp3",effectloop:false,firstEffectAudio:"resources/sound/straight_first.mp3"},
    ['straight'] :            {typeAudio:"resources/sound/straight.mp3",typeloop:false,effectAudio:"resources/sound/straight_bg.mp3",effectloop:false,firstEffectAudio:"resources/sound/straight_first.mp3"},
    ['threeofakind'] :        {typeAudio:"resources/sound/three_of_kind.mp3",typeloop:false,effectAudio:"resources/sound/straight_bg.mp3",effectloop:false,firstEffectAudio:"resources/sound/straight_first.mp3"},
    ['twopair'] :             {typeAudio:"resources/sound/two_pairs.mp3",typeloop:false,effectAudio:"resources/sound/under_three_of_kind_bg.mp3",effectloop:false,firstEffectAudio:"resources/sound/under_three_of_kind_first.mp3"},
    ['eightorbetter'] :       {typeAudio:"resources/sound/seven_better.mp3",typeloop:false,effectAudio:"resources/sound/under_three_of_kind_bg.mp3",effectloop:false,firstEffectAudio:"resources/sound/under_three_of_kind_first.mp3"},
};
var SpriteNames = {

    ['fivebars'] :'five bars',
    ['royalflush'] : 'royal fush',
    ['fiveofakind'] :'5 ofakind',
    ['fourofakind_J_A'] :'4 of a kind(j-a)',
    ['fourofakind_2_10'] :'4 of a kind(j-a)',
    ['strflush'] :'strflush',  
    // [0] :'five bars',
    // [1] : 'royal fush',
    // [2] :'5 ofakind',
    // [3] :'4 of a kind(j-a)',
    // [4] :'4 of a kind(j-a)',
    // [5] :'strflush',  
}
@ccclass 
export default class DzbView extends cc.Component {


  
    @property(cc.AudioSource)
    btncloseeffect: cc.AudioSource = null;
    @property(cc.Button)
    btn_add_bet: cc.Button = null;

    @property(cc.Label)
    label_default_score: cc.Label = null;//进场带入的分数

    @property(cc.Layout)
    label_gonggao: cc.Layout = null;

    @property(cc.Label)
    label_score: cc.Label = null;//玩家分数

    @property(cc.Label)
    label_level_top: cc.Label = null; // 过关彩金

    @property(cc.Label)
    label_burst: cc.Label = null; // 比倍爆机

    @property(cc.Label)
    label_burst_score: cc.Label = null; // 爆机彩金

    @property(cc.Label)
    label_time: cc.Label = null;//时间

    @property(cc.Label)
    label_scorebet: cc.Label = null;//玩家可下注分数

    @property(cc.Label)
    label_Bl_5rars: cc.Label = null; // FIVE BARS

    @property(cc.Label)
    label_Bl_royalflush: cc.Label = null; // ROYAL FLUSH

    @property(cc.Label)
    label_Bl_5ofakind: cc.Label = null; // 5 of a kind

    @property(cc.Label)
    label_Bl_strflush: cc.Label = null; // str flush

    @property(cc.Label)
    label_Bl_4ofakind: cc.Label = null; // 4 of a kind(j~a)

    @property(cc.Label)
    label_Bl_fullhouse: cc.Label = null; // full house

    @property(cc.Label)
    label_Bl_flush: cc.Label = null; // flush

    @property(cc.Label)
    label_Bl_straight: cc.Label = null; // straight

    @property(cc.Label)
    label_Bl_3ofkind: cc.Label = null; // 3 of a kind

    @property(cc.Label)
    label_Bl_2pair: cc.Label = null; // two pairs

    @property(cc.Label)
    label_Bl_7better: cc.Label = null; // 7 better

    @property(cc.Layout)
    layout_fivebars: cc.Layout = null;

    @property(cc.Layout)
    layout_royalflush: cc.Layout = null;

    @property(cc.Layout)
    layout_5ofkind: cc.Layout = null;

    @property(cc.Layout)
    layout_strflush: cc.Layout = null;

    @property(cc.Layout)
    layout_4ofkind: cc.Layout = null;

    @property(cc.Layout)
    layout_fullhouse: cc.Layout = null;

    @property(cc.Layout)
    layout_flush: cc.Layout = null;

    @property(cc.Layout)
    layout_straight: cc.Layout = null;

    @property(cc.Layout)
    layout_3ofkind: cc.Layout = null;

    @property(cc.Layout)
    layout_2pair: cc.Layout = null;

    @property(cc.Layout)
    layout_7better: cc.Layout = null;

    @property(cc.Layout)
    layout_play: cc.Layout = null;

    @property(cc.Layout)
    layout_game: cc.Layout = null;

    @property(cc.Layout)
    layout_bibei: cc.Layout = null;

    @property(cc.Layout)
    layout_btn: cc.Layout = null;

    @property(cc.Layout)
    layout_menu: cc.Layout = null;

    @property(cc.Layout)
    layout_bibeimenu: cc.Layout = null;

    @property(cc.Layout)
    layout_card: cc.Layout = null;

    @property(cc.Layout)
    layout_card_history: cc.Layout = null;

    @property(cc.Button)
    btn_menu: cc.Button = null;

    @property(cc.Sprite)
    text_caidahuocaixiao_bigPlate: cc.Sprite = null;

    @property(cc.Sprite)
    text_baoliuhuokaipai_plate: cc.Sprite = null;

    @property(cc.Sprite)
    text_defenhuobibei_plate: cc.Sprite = null;

    @property(cc.Sprite)
    yazhuhuokaishi_plate: cc.Sprite = null;

    @property(cc.Sprite)
    user_lose: cc.Sprite = null;

    @property(cc.Sprite)
    user_win: cc.Sprite = null;

    @property(cc.Sprite)
    insert_coin_plate: cc.Sprite = null;

    @property(cc.Sprite)
    user_win_1: cc.Sprite = null;

    @property(cc.Label)
    label_machine_number: cc.Label = null;

    @property(cc.Label)
    label_bet: cc.Label = null;

    @property(cc.Button)
    btn_start: cc.Button = null;

    @property(cc.Button)
    btn_auto: cc.Button = null;

    @property(cc.Button)
    btn_getScore: cc.Button = null;

    @property(cc.Layout)
    layout_hold: cc.Layout = null;

    @property(cc.Layout)
    layout_touch: cc.Layout = null;

    @property(cc.Layout)
    layout_bibeigamemenu: cc.Layout = null;

    @property(cc.Node)
    small_anim: cc.Node = null;

    @property(cc.Node)
    big_anim: cc.Node = null;

    @property(cc.Layout)
    layout_biganim: cc.Layout = null;

    @property(cc.Layout)
    layout_smallanim: cc.Layout = null;

    @property(cc.Node)
    layerHistory: cc.Node = null;

    @property(cc.Layout)
    poker_bibei: cc.Layout = null;

    @property(cc.Layout)
    layout_heart: cc.Layout = null;

    @property(cc.Button)
    btn_big: cc.Button = null;

    @property(cc.Button)
    btn_small: cc.Button = null;

    @property(cc.AudioSource)
    audiobtneffect: cc.AudioSource = null;

    @property(cc.AudioSource)
    fanye_se: cc.AudioSource = null;

    @property(cc.AudioSource)
    time_se: cc.AudioSource = null;

    @property(cc.AudioSource)
    time_suc_Se: cc.AudioSource = null;

    @property(cc.AudioSource)
    time_fail_se: cc.AudioSource = null;

    @property(cc.AudioSource)
    def_se: cc.AudioSource = null;

    @property(cc.AudioSource)
    error_se: cc.AudioSource = null;

    @property(cc.AudioSource)
    bianqian_se: cc.AudioSource = null;

    // @property(cc.Node)
    // layerBaoxian: cc.Node = null;

    @property(cc.Node)
    layerHoldMachine: cc.Node = null;

    @property(cc.Layout)
    layout_star: cc.Layout = null;

    @property(cc.Layout)
    layout_message: cc.Layout = null;

    @property(cc.Layout)
    layout_canplay: cc.Layout = null;

    @property(cc.Layout)
    layout_nocoin: cc.Layout = null;

    @property(cc.Layout)
    layout_nocoincard: cc.Layout = null;

    @property(cc.AudioClip)
    defclip: cc.AudioClip = null;

    @property(cc.AudioClip)
    defclip_new: cc.AudioClip = null;
    
    @property(cc.Layout)
    layout_goodluck: cc.Layout = null;

    @property(cc.AudioSource)
    upf_se: cc.AudioSource = null;
    @property(cc.AudioSource)
    dwf_se: cc.AudioSource = null;
    /////////网络提示///////////////
    @property(cc.Layout)
    layout_tip: cc.Layout = null;

    @property(cc.Layout)
    layout_loading: cc.Layout = null;

    @property(cc.Layout)
    layout_tip2: cc.Layout = null;

    @property(cc.Layout)
    layout_loading2: cc.Layout = null;

    @property(cc.Label)
    layout_loading2_label: cc.Label = null;

    @property(cc.Node)
    // node_award: cc.Node = null;

    @property(cc.Node)
    // node_award_anim: cc.Node = null;

    @property(cc.Sprite)
    big_fire: cc.Sprite = null;


    @property(cc.Label)
    bibei_type:cc.Label = null;




    @property(cc.Sprite)
    sp_card_high_type:cc.Sprite = null; 

    @property(cc.SpriteAtlas)
    sp_card_high_type_pist:cc.SpriteAtlas = null; 

    


    @property(cc.AudioSource)
    audio_source_3ofakind:cc.AudioSource = null;
    @property(cc.AudioSource)
    audio_source_twopairs:cc.AudioSource = null;
    @property(cc.AudioSource)
    audio_source_4ofakind:cc.AudioSource = null;
    @property(cc.AudioSource)
    audio_source_5ofakind:cc.AudioSource = null;
    @property(cc.AudioSource)
    audio_source_7better:cc.AudioSource = null;
    @property(cc.AudioSource)
    audio_source_opencardOneSucc:cc.AudioSource = null;
    @property(cc.AudioSource)
    audio_source_royalflush:cc.AudioSource = null;
    @property(cc.AudioSource)
    audio_source_flush:cc.AudioSource = null;
    @property(cc.AudioSource)
    audio_source_straight:cc.AudioSource = null;
    @property(cc.AudioSource)
    audio_source_strflush:cc.AudioSource = null;
    @property(cc.AudioSource)
    audio_source_fullhouse:cc.AudioSource = null;
    @property(cc.AudioSource)
    audio_source_5bars:cc.AudioSource = null;
    @property(cc.AudioSource)
    audio_source_bigorsamll:cc.AudioSource = null;

   

    @property(cc.Button)
    btn_bibei: cc.Button = null;

    @property(cc.Button)
    btn_banbi: cc.Button = null;

    @property(cc.Button)
    btn_shuangbi: cc.Button = null;
    private open_card_time_out:number = 90*1;
    private open_card_time_out_count:number = 0;
    is_open_bibei_menu: boolean = false;
    isMenuPlayIng: boolean;


    isMenuShow: boolean;

    private et: cc.EventTarget = null;
    private dzb_ctrl :DzbCtrl = null;
    private dzb_model :DzbModel = null;


    private resultAnimationCount: number = 0;
    private playtAnimationCount: number = 0;
    private textAnimationCount: number = 0;
    private textNoCoinAnimationCount: number = 0;
    private layout_animation: cc.Node = null;
    private layout_animation_TipText: cc.Sprite = null;
    private showResultAction: boolean = false;
    private awards: string;
    private opencardCount: number = 0;

    private locked_view_1: boolean = false;
    // private locked_view:boolean = false;
    //private rarwad_layout: cc.Layout = null;

    private isFirstOpenCard: boolean = false;
    private flagResultNode: cc.Layout = null;
    private labelbl:cc.Node = null;

    private label_credit_score:string = '';
    private label_bet_score:string = '';


    private label_credit_score_count:number = -1;
    private label_bet_score_count:number = -1;




    private AWARD_SEL_ONE_ANIM:string = "award_sel_one_anim";
    private NODE_ANIM:string = "node_anim";
    private LAYOUT_5RARS:string  = "layout_5rars";

    private LAYOUT_ROYALFLUSH:string = "layout_royalflush";
    private LAYOUT_5OFAKIND:string = "layout_5ofakind";
    private LAYOUT_STRFLUSH:string = "layout_strflush";
    private LAYOUT_4OFAKINDAJ:string = "layout_4ofakindAJ";
    private LAYOUT_4OFAKIND210:string = "layout_4ofakind210";
    private LAYOUT_FULLHOUSE:string = "layout_fullhouse";
    private LAYOUT_FLUSH:string = "layout_flush";
    private LAYOUT_STRAIGHT:string = "layout_straight";
    private LAYOUT_3OFAKIND:string = "layout_3ofakind";
    private LAYOUT_2PAIRS:string = "layout_2pairs";
    private LAYOUT_7BETTER:string = "layout_7better";
    


    private hasDoAutoGame:boolean = false;

    private label_winscore:cc.Label = null;

    is_play_win_lose: boolean = false;

    public SpriteName = ['paiji_wuren_bigPlate', 'paiji_youren_bigPlate', 'paiji_xuanzhong_bigPlate', 'paiji_liuji_bigPlate'];

    
    onLoad() {
        var self = this;
        if (!this.et) {
            this.et = cc['NetTarget'];
        }
        //var GlobalUnit =  JSON.parse(cc.sys.localStorage.getItem("GlobalData"))
        this.et.on("update", this.update_view, this);
        this.et.on("gonggao",this.setGonggao,this);
        this.et.on("updateCoinAndZuanshiqufen", this.updateCoinAndZuanshiqufen, this);
        this.et.on("updateCoinAndZuanshicunfen", this.updateCoinAndZuanshicunfen, this);
        this.et.on("error_tips",this.error_tips,this);
        this.et.on("quit_game",this.quit,this);
        this.et.on("error_and_back",this.error_and_back,this);
        this.et.on("querydzbhistoryInfo",this.querydzbhistoryInfo,this);
        this.et.on("Loading_time_out",this.set_loading_time_out,this);
        this.et.on("init_view",this.initUI,this);
        this.et.on('openOver', this.openOver, this);
        this.et.on('show_less', this.show_less, this);
        this.et.on("room_bigorsmall", this.room_bigorsmall, this);
        this.et.on("show_bibeibaoji_score", this.show_bibeibaoji_score, this);

        this.et.on("setReconnectLoadingView",this.setReconnectLoadingView,this);
        this.et.on("setTipMessage2",this.setTipMessage2,this);
        this.et.on("showMessage",this.showMessage,this);
        
        this.et.on("rejoin",this.rejoin,this);

        this.et.on("tips_message",this.tips_message,this);
        
        
        //引用model 和 控制器
        this.dzb_ctrl = DzbCtrl.getInstance()
        this.dzb_model = DzbModel.getInstance()


        this.setTouchEnable(false);
        this.hitAllStart();
        if(GlobalUnit.offlinejitai){
            this.dzb_model.sendmc('room', 'rejoin', { uid : GlobalUnit.uid , state:-1,last_flag:"other" ,last_m:"other" });
            GlobalUnit.offlinejitai = null;
        }else{
            this.dzb_model.sendmc("room", "loadcontext", { gps_msg: GlobalUnit.gps || "未获得GPS啊" })
        }  
        // this.dzb_model.sendmc("room", "loadcontext", { gps_msg: GlobalUnit.gps || "未获得GPS啊" })
        console.log("大字版游戏视图对象加载完成。")
        
        this.initBtn();
    
    
        if (GlobalUnit.is_weihu) {
            self.setGonggao_data(GlobalUnit.weihu_data);
        }
        
    }

    start() {

        var self = this
        self.btn_add_bet.node.on(cc.Node.EventType.TOUCH_START, this.btn_addbet_touchstart, this);
        self.btn_add_bet.node.on(cc.Node.EventType.TOUCH_END, this.btn_addbet_touchend, this);
        self.btn_add_bet.node.on(cc.Node.EventType.TOUCH_CANCEL, this.btn_addbet_touchcancle, this);


    }
    
    // node_cover_blink(){
    //     this.node_cover.stopAllActions();
    //     var self = this;
    //     this.scheduleOnce(function () {
    //         var blink = cc.repeatForever(cc.sequence(cc.callFunc(function(){
        
    //             self.node_cover_child.node.active = true;
    //         }),cc.delayTime(1.5),cc.callFunc(function(){
               
    //             self.node_cover_child.node.active = false;
    //         }),cc.delayTime(1.5)));
    //         self.node_cover.runAction(blink);
    //     }.bind(this), 0.5);
    // }
    onDestroy() {
        DzbCtrl.cleanInstance();
        DzbModel.cleanInstance();
        this.dzb_ctrl = null;
        this.dzb_model = null;
        this.et.off("update", this.update_view, this);
        this.et.off("gonggao",this.setGonggao,this);
        this.et.off("updateCoinAndZuanshiqufen", this.updateCoinAndZuanshiqufen, this);
        this.et.off("updateCoinAndZuanshicunfen", this.updateCoinAndZuanshicunfen, this);
        this.et.off("error_tips",this.error_tips,this);
        this.et.off("quit_game",this.quit,this);
        this.et.off("error_and_back",this.error_and_back,this);
        this.et.off("querydzbhistoryInfo",this.querydzbhistoryInfo,this);
        this.et.off("Loading_time_out",this.set_loading_time_out,this);
        this.et.off("init_view",this.initUI,this);
        this.et.off('openOver', this.openOver, this);
        this.et.off('show_less', this.show_less, this);
        this.et.off('room_bigorsmall', this.room_bigorsmall, this);
        this.et.off("show_bibeibaoji_score", this.show_bibeibaoji_score, this);
        this.et.off("setReconnectLoadingView",this.setReconnectLoadingView,this);
        this.et.off("setTipMessage2",this.setTipMessage2,this);
        this.et.off("showMessage",this.showMessage,this);
        this.et.off("rejoin",this.rejoin,this);
        this.et.off("tips_message",this.tips_message,this);

    }

    returnHall(){
        let subgameSearchPath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/')+'ALLGame/dzb/';
        cc.sys.localStorage.setItem("returnHall",1)
        require(subgameSearchPath + 'src/dating.js');
    }

    public update_view(event) {
        console.log("tony ============= update_view ")
        var model:DzbModel = event.detail
        var self = this;
        if (model != this.dzb_model) return;
        var state = this.dzb_model.State;
        if (self.interrupt(state)) return;
        self.show(state);
        this.awardsSetting(this.dzb_model.timeconfig);

        this.setMachineNum(this.dzb_model.config.roomkey);
    }

    private interrupt(state:number):Boolean {
        var self = this;
        if (state == DzbModel.GAMESTATE.GAME_NET_ERROR) {
            self.setTipMessage("网络连接失败，请重新登录", function () {
                console.log("点击确定");
                self.returnHall()
            })
            return true;
        }else if (state == DzbModel.GAMESTATE.GAME_NET_CLOSE) {
            // self.setTipMessage("网络连接失败，请重新登录！", function () {
            //     console.log("点击确定");
            //     cc.director.loadScene("loading");
            // })
            return true;
        } else if (state == DzbModel.GAMESTATE.GAME_NET_CICK) {
            self.setTipMessage("您的账号在其他设备登录，请重新登录", function () {
                console.log("点击确定");
                self.returnHall()
            })
            return true;
        } else {
            return false;
        }
    }

    private setTipMessage(message: string, call: any) {
        this.setLoadingEnable(false);
        if (!this.layout_tip.node.active) {
            this.layout_tip.node.getComponent('tipController').setMessage(message);
            this.layout_tip.node.getComponent('tipController').setCallBack(call);
            this.layout_tip.node.active = true;
        }
    }
    private show_less(event) { //一次次要状态需要展示
        var self = this;
        var dzb_model = self.dzb_model;
        console.log("grayson ---------------------------- less_state ", self.dzb_model.Less);
        if (self.dzb_model.Less == DzbModel.LESS_STATE.LESS_TWO) {
            console.log("xiaowa LESS_TWO =======");
            this.opencardCount = 5;
            this.closeCard(false);
            this.layout_game.node.active = true;
            this.layout_canplay.node.active = true
            this.setlabel_default_score(dzb_model.showscore);
            this.setlabel_score(dzb_model.score);
            this.initCards(dzb_model.handcards, true);
            this.initTextHold(dzb_model.selectcards);
            this.setAwards(dzb_model.curstyle);
            this.awardsSetting(dzb_model.timeconfig);
           
        } else if (self.dzb_model.Less == DzbModel.LESS_STATE.LESS_GETSCORE) {
            this.getScore(dzb_model.score);
            this.layout_game.node.active = true;
            
        } else if (self.dzb_model.Less == DzbModel.LESS_STATE.LESS_HOLD) {
            this.initTextHold(dzb_model.selectcards);
        } else if (self.dzb_model.Less == DzbModel.LESS_STATE.LESS_BIBEIHUODEFEN) {
            this.isFirstOpenCard = false;
            this.dzb_ctrl.closeLocked();
        }
    }

    private initStateGameWait (dzb_model:DzbModel) {
        this.btn_getScore.node.active = false;
        this.hideBibeiBaoji()
        this.setAwards('none');
        var self = this;
        var anim = this.layout_card.getComponent(cc.Animation);
        anim.play("big_plate_sendcard");

        if (GlobalUnit.coin >= dzb_model.canBetSocre) {
            this.layout_game.node.active = true;
            this.layout_canplay.node.active = true
            // this.layout_nocoin.node.active = false
            this.layout_nocoincard.node.active = false
        }else{
            this.textNoCoinAnimationCount = 0;
            this.layout_game.node.active = true;
            this.layout_goodluck.node.active = true;
            this.layout_nocoincard.node.active = false;
            // this.layout_nocoin.node.active = true
        }
        this.setTouchEnable(true);
        if (this.opencardCount == 0) {

        }
        this.setlabel_default_score(dzb_model.showscore);
        this.setlabel_score(dzb_model.score);
        this.set_bet_label();
        if (!dzb_model.autoGame) {
            this.setMenuBtnEnable(true);
            this.btn_start.node.active = true;
        }
    }
    private rejoin(event){
        var data = event.detail;
        console.log("rejoin rejoin  ",data);
        this.setTouchEnable(true);
        this.locked_view = false;
        this.dzb_model.State = DzbModel.GAMESTATE.GAME_NET_CICK;
        var callback = function(){
            cc.director.loadScene('loading');
        }
        var error = data.data.error || "机台已经销毁";
        this.layout_tip.node.getComponent('tipController').setMessage(error);
        this.layout_tip.node.getComponent('tipController').setCallBack(callback);
        this.layout_tip.node.active = true;
    }
    setMachineNum(number: number) {
        this.label_machine_number.string = "" + number;
    }

    private show(state:number) {
        console.log(' tony show state:',state);
        var self = this;
        var dzb_model = self.dzb_model;
        this.layout_game.node.active = false;
        this.layout_bibei.node.active = false;
        if (dzb_model.State == DzbModel.GAMESTATE.GAME_WAIT && dzb_model.Less!= DzbModel.LESS_STATE.LESS_GETSCORE) { //
            this.initStateGameWait(dzb_model);
            this.setAddBetBtnEnable(true);
        }
       
        if (dzb_model.State == DzbModel.GAMESTATE.GAME_ONE) {
            cc.audioEngine.stopAll();   
        }
        
        if (dzb_model.Flag == "gameBegin") {
            this.setLayoutCardEnable(true); // TODO Grayson 显示卡牌

            this.opencardCount = 5;
            this.closeCard(false);
            this.layout_game.node.active = true;
            this.layout_canplay.node.active = true
            this.setlabel_default_score(dzb_model.showscore);
            this.setlabel_score(dzb_model.score);
            this.initCards(dzb_model.handcards, true);
            this.initTextHold(dzb_model.selectcards);
            this.setAwards(dzb_model.curstyle);
            this.awardsSetting(dzb_model.timeconfig);
            this.setMenuBtnEnable(false);
            // this.node_award_anim.active = true;
            // this.setBigFireAnim(false);

            // this.setAwardResultAnimHide();


            if (!dzb_model.autoGame) {
                if (dzb_model.State == DzbModel.GAMESTATE.GAME_ONE) {
                    // this.setStartBtnEnable(true);
                    //console.log("gameBegin GAMESTATE.GAME_ONE");
                   
                } else if (dzb_model.State == DzbModel.GAMESTATE.GAME_BIBEIHUODEFEN) {
                    this.setStartBtnEnable(false);
                    this.btn_start.node.active = false;
                    this.btn_getScore.node.active = true;
                    // this.setgetScoreBtnEnable(true);
                    if (!this.is_open_bibei_menu) {
                        this.setbibeiMenuEnable(true);
                    }
                    //console.log("xiaowa ========= gameBegin GAMESTATE.GAME_BIBEIHUODEFEN");
                }else {
                    console.log(" 不可能跑这里 。。。。。。。。。");
                }
            }
        }
        if (dzb_model.Flag == "hold" && dzb_model.State == DzbModel.GAMESTATE.GAME_ONE) {
            this.setTipTextAnimationEnable(this.text_baoliuhuokaipai_plate, true);
            this.setlabel_default_score(dzb_model.showscore);
            this.setlabel_score(dzb_model.score);
            this.initCards(dzb_model.handcards, false);
            this.initTextHold(dzb_model.selectcards);
            this.setAwards(dzb_model.curstyle);
            this.awardsSetting(dzb_model.timeconfig);
        }
        if (dzb_model.Flag == "defenlose" && dzb_model.State ==DzbModel.GAMESTATE.GAME_WAIT) {
            if (this.is_open_bibei_menu) {
                this.setbibeiMenuEnable(false);
                
            }
            this.setAwards(dzb_model.curstyle);
            this.awardsSetting(dzb_model.timeconfig);
            // console.log("setLayoutCardEnable setLayoutCardEnable: defenlose ");
           

            this.scheduleOnce(function () {
                self.onGetScoreOver(false);
               
            }, 0.01)
        }
        if (dzb_model.Flag == "defenwin" && dzb_model.State ==DzbModel.GAMESTATE.GAME_WAIT) {
            if (this.is_open_bibei_menu) {
                this.setbibeiMenuEnable(false);
            }
            this.setTouchEnable(false);
            // this.getScore(dzb_model.score);
        }
        if (dzb_model.Flag == "bibeijieshu" && dzb_model.State == DzbModel.GAMESTATE.GAME_BIBEIHUODEFEN) {
            this.setlabel_default_score(dzb_model.showscore);
            this.setlabel_score(dzb_model.score);
            this.initTextHold(dzb_model.selectcards);
            this.setAwards(dzb_model.curstyle);
            this.awardsSetting(dzb_model.timeconfig);
            console.log("////////////////  bibeijieshu : ", this.dzb_model);
            this.layout_bibei.node.active = true;
        }
        if (dzb_model.Flag == "bibei" && dzb_model.State == DzbModel.GAMESTATE.GAME_BETGAME) {
            this.locked_view = false;
            console.log("jeff ======== bibei this.dzb_model.State:",this.dzb_model.State,"this.dzb_model.Less:",this.dzb_model.Less);
            if (dzb_model.autoGame) {
                console.log("自动开始");
                this.scheduleOnce(function () {
                    this.defen();
                }, 0.5)
            } else {
                this.setTipTextAnimationEnable(this.text_defenhuobibei_plate, true);
                this.btn_getScore.node.active = true;
                // this.setgetScoreBtnEnable(true);
                this.setbibeiMenuEnable(true);
            }
            this.setlabel_default_score(dzb_model.showscore);
            this.setlabel_score(dzb_model.score);
            this.setBibeiGameMenuBtnEnable(false);
            this.initHistoryCard(dzb_model.history);
            this.setMachineBetGameDefault();
            this.awardsSetting(dzb_model.timeconfig);
            this.setgetScoreBtnEnable(false);
            this.btn_getScore.node.active = true;
            this.setbigAndSmallBtnEnable(true);
            this.layout_bibei.node.active = true;
            this.showBibeiBaoji();
        }
        if (dzb_model.Flag == "bibeicontinue" && dzb_model.State == DzbModel.GAMESTATE.GAME_BIBEIHUODEFEN) {
            if (dzb_model.autoGame) {
                console.log("自动开始");
                this.scheduleOnce(function () {
                    this.defen();
                }, 0.5)
            } else {
                console.log("setTipTextAnimationEnable(this.text_defenhuobibei_plate, true)222 : ", this.dzb_model);
                this.setTipTextAnimationEnable(this.text_defenhuobibei_plate, true);
                this.btn_getScore.node.active = true;
                // this.setgetScoreBtnEnable(true);
                this.setbibeiMenuEnable(true);
            }
            this.awardsSetting(dzb_model.timeconfig);
            this.setlabel_default_score(dzb_model.showscore);
            this.setlabel_score(dzb_model.score);
            this.setBibeiGameMenuBtnEnable(true);
            this.setbigAndSmallBtnEnable(false);
            this.layout_bibei.node.active = true;
            this.setMachineBetGameDefault();
        }
    }
    tips_message(event){
        var message = event.detail;
        this.showMessage1(message);
    }
    setBibeiGameMenuBtnEnable(enable: boolean) {
        for (var i = 0; i < this.layout_bibeigamemenu.node.childrenCount; i++) {
            var node: cc.Node = this.layout_bibeigamemenu.node.children[i]
            var btn = node.getComponent(cc.Button);
            btn.interactable = enable;
            btn.enabled = enable;
        }
    }
    private quit() {
        cc.director.loadScene("bigplateroom");
        var self = this;
        GlobalUnit.baoxianxiang_types="hall"
        self.isMenuPlayIng = false
    }

    setGonggao(event) {
        var data = event.detail
        this.label_gonggao.getComponent('gonggaoController').setGonggao_cmd(data);
    }
    setGonggao_data(data) {
        this.label_gonggao.getComponent('gonggaoController').setGonggao(data);
    }


    setAwards(awards: string) {
        this.awards = awards;
    }

    private setlabel_default_score(score: number) {
        this.label_default_score.string = "" + score;
    }
    private setlabel_score(score: number) {
        //GlobalUnit.coin = score;
        this.label_score.string = "" + Math.floor(score);

        // if (!this.dzb_model.autoGame && GlobalUnit.hallKey != 1
        //     && this.dzb_model.canBetSocre < GlobalUnit.coin
        //     && this.dzb_model.State == DzbModel.GAMESTATE.GAME_WAIT) {
        //      this.setAddBetBtnEnable(true);   
        // }
    }

    updateCoinAndZuanshiqufen() {
        var self = this;
        this.setlabel_default_score(GlobalUnit.coin);
        this.setlabel_score(GlobalUnit.coin)
    }

    updateCoinAndZuanshicunfen() {
        var self = this;
        this.setlabel_score(GlobalUnit.coin)
    }

    error_tips(event) {
        console.log("error_tips===========", event.detail);
        var cmd = event.detail
        this.error_se.play();
        var error = cmd.data.error

        error = error?error:cmd.data.err;
        
        this.showMessage1(error);
        this.locked_view = false;
        this.dzb_ctrl.closeLocked();
        if(cmd.m == 'begin'){
            this.openBaoxianxiang();
        }
        // this.setMachineDefault();
    }

    show_bibeibaoji_score(event){
        var cmd = event.detail;
        this.locked_view = false;
       
        // this.label_level_top.string = "" + cmd.data.level_top; // 过关彩金
        // this.label_burst.string = "" + cmd.data.burst; // 比倍爆机
        // this.label_burst_score.string = "" + cmd.data.burst_score; // 爆机彩金
    }
 
    error_and_back(event) {
        var self = this;
        var cmd = event.detail
        this.setTipMessage(cmd.data.error, function () {
            GlobalUnit.isBackRoom = true;
            GlobalUnit.channle = GlobalUnit.hallKey
            cc.director.loadScene("bigplateroom");
            GlobalUnit.baoxianxiang_types="hall"
        });
    }

    showMessage(event) {
        var self = this;
        var message = event.detail;
        this.layout_message.getComponent('messageController_dzb').setMessage(message);
        if (GlobalUnit.is_weihu) {
            if (this.dzb_model.State == DzbModel.GAMESTATE.GAME_WAIT || this.dzb_model.State == DzbModel.GAMESTATE.GAME_INIT) {
                this.setMenuBtnEnable(true);
                // this.setMenuEnable(true);
                this.locked_view = false;
            }
        }
    }
    showMessage1(message: string) {
        this.layout_message.node.active = true;
        this.layout_message.getComponent('messageController_dzb').setMessage(message);
    }

    setMachineDefault() {
        this.closeCard(true);
        // this.sendCard();
        this.setTextHoldEnable(false);
        this.hidAllText();
    }

    private awardsSetting(awardsInfo: any) {
        if (awardsInfo == null) {
            return;
        }
        // this.label_Bl_5rars.string = "" + awardsInfo.fivebars
        this.label_Bl_7better.string = "" + awardsInfo.eightorbetter
        this.label_Bl_2pair.string = "" + awardsInfo.twopair
        this.label_Bl_3ofkind.string = "" + awardsInfo.threeofakind
        // this.label_Bl_4ofakindAJ.string = "" + awardsInfo.fourofakind_J_A
        // this.label_Bl_4ofakind210.string = "" + awardsInfo.fourofakind_2_10
        this.label_Bl_4ofakind.string = ""+ awardsInfo.fourofakind
        this.label_Bl_5ofakind.string = "" + awardsInfo.fiveofakind
        this.label_Bl_flush.string = "" + awardsInfo.flush
        this.label_Bl_fullhouse.string = "" + awardsInfo.fullhouse
        this.label_Bl_royalflush.string = "" + awardsInfo.royalflush
        this.label_Bl_strflush.string = "" + awardsInfo.strflush
        this.label_Bl_straight.string = "" + awardsInfo.straight

        var curstyle = this.dzb_model.curstyle
        console.log("curstyle curstyle:  ",curstyle);
        switch(curstyle){
            case awardsInfo.eightorbetter:
               this.label_winscore = this.label_Bl_7better;
               console.log("curstyle curstyle eightorbetter:  ",curstyle);
               break;
            case awardsInfo.twopair:
               this.label_winscore = this.label_Bl_2pair;
               console.log("curstyle curstyle twopair:  ",curstyle);
               break;
            case awardsInfo.threeofakind:
               this.label_winscore = this.label_Bl_3ofkind;
               console.log("curstyle curstyle threeofakind:  ",curstyle);
               break;   
            case awardsInfo.fourofakind:
               this.label_winscore = this.label_Bl_4ofakind;
               console.log("curstyle curstyle fourofakind:  ",curstyle);
               break;
            case awardsInfo.fiveofakind:
               this.label_winscore = this.label_Bl_5ofakind;
               console.log("curstyle curstyle fiveofakind:  ",curstyle);
               break;   
            case awardsInfo.flush:
               this.label_winscore = this.label_Bl_flush;
               console.log("curstyle curstyle flush:  ",curstyle);
               break;
            case awardsInfo.fullhouse:
               this.label_winscore = this.label_Bl_fullhouse;
               console.log("curstyle curstyle fullhouse:  ",curstyle);
               break;
            case awardsInfo.royalflush:
               this.label_winscore = this.label_Bl_royalflush;
               console.log("curstyle curstyle royalflush:  ",curstyle);
               break;
            case awardsInfo.strflush:
               this.label_winscore = this.label_Bl_strflush;
               console.log("curstyle curstyle strflush:  ",curstyle);
               break;
            case awardsInfo.straight:
               this.label_winscore = this.label_Bl_straight;
               console.log("curstyle curstyle straight:  ",curstyle);
               break;
        }
        // this.label_winscore.string = "" + (awardsInfo[curstyle] || 0);
    }

    private hidAlButton() {
        this.btn_start.node.active = false;
        this.btn_getScore.node.active = false;
    }

    private sendCard() {
        console.log("/////////// layout_card 1");
        this.hidAllCard();
        this.setTextHoldEnable(false);
        var self = this;
        this.setLayoutCardEnable(true);
        for (var i = 0; i < this.layout_card.node.childrenCount; i++) {
            var node = this.layout_card.node.children[i];
            var time = i / 30;
            var de = cc.delayTime(time)
            var call = cc.callFunc(function (target, data) {
                self.layout_card.node.children[data].active = true;
            }, this, i);
            var seq = cc.sequence(de, call);
            this.node.runAction(seq);
        }
        
    }

    setHistoryLayerEnable(enable: boolean) {
        this.layerHistory.active = enable;
    }
    setTouchEnable(enable: boolean) {
        this.layout_touch.node.active = !enable;
    }
    private setBiBeiMenuEnable(enable: boolean) {
        this.layout_bibeimenu.node.active = enable;
    }
    private hidAllText() {
        console.log("setTipTextAnimationEnable(this.text_defenhuobibei_plate hidAllText hidAllText hidAllText");
        this.text_caidahuocaixiao_bigPlate.node.active = false;
        this.text_baoliuhuokaipai_plate.node.active = false;
        this.text_defenhuobibei_plate.node.active = false;
        this.yazhuhuokaishi_plate.node.active = false;
    }

    private hidAllCard() {
        console.log("/////////// layout_card 2");
        for (var i = 0; i < this.layout_card.node.childrenCount; i++) {
            var node = this.layout_card.node.children[i];
            //node.active = false;
        }
    }

    private setLayoutCardEnable(enable: boolean) {
        this.layout_card.node.active = enable;
    }

    private setTextHoldEnable(enable: boolean) {
        this.layout_hold.node.active = enable;
    }

    private defen() {
        this.setgetScoreBtnEnable(false);
        this.hidAllText();
        this.dzb_model.sendmc('room', 'defen', {});
        if(this.flagResultNode ){
            this.awardBlink(this.flagResultNode,false);
        } 
    }
    ////////////--------------所有点击事件-----------------------

    on_btn_big_click(event, customEventData) {//big
        var self = this;
        // this.setBigFireAnim(false);
        if (this.locked_view) {
            return
        }
        this.locked_view = true
        console.log("on_btn_big_click");
        // this.scheduleOnce(function () {
        //     self.hideBibeiBaoji(); // TODO Grayson 显示奖项
        // }, 2.5)
        event.target.getComponent(cc.Button).enabled = false;
        this.setBigBtnAnimEnable(true);
        this.setbibeiGameAnimationEnable(false);

        var anim = this.big_anim.getComponent(cc.Animation)
        
        anim.play('big_fire_default');
        

        this.dzb_model.sendmc("room", "bigorsmall", { bigorsmall: 'big' })
    }
    on_btn_small_click(event, customEventData) {//small
        var self = this;
        // this.setBigFireAnim(false);
        if (this.locked_view) {
            return
        }
        this.locked_view = true
        // this.scheduleOnce(function () {
        //     self.hideBibeiBaoji(); // TODO Grayson 显示奖项
        // }, 2.5)
        event.target.getComponent(cc.Button).enabled = false;
        this.seSmallBtnAnimEnable(true);
        this.setbibeiGameAnimationEnable(false);

        var anim1 = this.small_anim.getComponent(cc.Animation)
        anim1.play('small_fire_default');

        this.dzb_model.sendmc("room", "bigorsmall", { bigorsmall: 'small' })
    }

    // GAME_NET_ERROR : 1, //网络链接错误
    // GAME_NET_CLOSE: 2, //网络链接关闭
    // GAME_NET_CICK: 3,  //被其他地方的连接替代
    // GAME_INIT: 4,//机器初始化
    // GAME_WAIT: 5,//待机
    // GAME_ONE: 6,//第一次获得牌
    // GAME_BIBEIHUODEFEN: 7,//选择得分或比倍状态
    // GAME_BETGAME: 8,//比倍状态

    on_btn_auto_click(event, customEventData) {//停止自动
        console.log('gamestate===on_btn_auto_click======');

        this.setAutoBtnEnable(false);

        switch(this.dzb_model.State){
            case DzbModel.GAMESTATE.GAME_WAIT:
                 this.setStartBtnEnable(true);   
                 this.setAddBetBtnEnable(true);
                 this.setMenuBtnEnable(true);
                 this.setgetScoreBtnEnable(false);
                 this.btn_getScore.node.active = false;
                 break;
           case DzbModel.GAMESTATE.GAME_ONE:
                this.setStartBtnEnable(true);
                this.setAddBetBtnEnable(false);
                this.setMenuBtnEnable(false);
                this.setgetScoreBtnEnable(false);
                this.btn_getScore.node.active = false;
                break;
           case DzbModel.GAMESTATE.GAME_BIBEIHUODEFEN:
                this.setStartBtnEnable(false);
                this.setAddBetBtnEnable(false);
                this.setMenuBtnEnable(false);
                this.setgetScoreBtnEnable(true);
           case DzbModel.GAMESTATE.GAME_BIBEIHUODEFEN:
                this.setStartBtnEnable(false);
                this.setAddBetBtnEnable(false);
                this.setMenuBtnEnable(false);  
                this.setgetScoreBtnEnable(true);   
        }
        // this.hidAlButton();
        // // this.btn_auto.node.active = false;
        // this.btn_start.node.active = true;
        // this.setStartBtnEnable(true);
        // // this.initBtn();
        
        this.dzb_ctrl.stopGame();
        this.hasDoAutoGame = false;
    }

    on_btn_start_click(event, customEventData) {//开始游戏
        // console.log("this.gameState==========", this.gameState);
        // this.autoGame = true;

        
    }

    // TODO Grayson 界面锁
    on_btn_getScore_click(event, customEventData) {//得分
        // this.setBigFireAnim(false);
        cc.audioEngine.stopAll();
        if (this.locked_view) {
            return
        }
        this.locked_view = true
        console.log("on_btn_getScore_click");
        this.audiobtneffect.play();
        this.defen();
        this.setBibeiBGMusic(false); 
    }
    on_btn_qufen_click(event, customEventData) {//取分
        var self = this;
        if (this.dzb_model.State != DzbModel.GAMESTATE.GAME_WAIT && this.dzb_model.State != DzbModel.GAMESTATE.GAME_INIT ) {
            return
        }
        if (this.locked_view) {
            return
        }
        console.log("on_btn_qufen_click");
        if (GlobalUnit.hallKey == 1) {//体验场
            this.error_se.play();
            this.showMessage1('体验场不开放取分!');
        } else {
            if(this.audiobtneffect)
            {
                console.log("nick-----------------audiobtneffect")
            }
            console.log('nick------------',this.audiobtneffect.volume)
            this.audiobtneffect.play();
            this.openBaoxianxiang();
           // this.layerBaoxian.active = true;
        }
    }
    on_btn_hold_click(event, customEventData) {//留机
        var self = this;
        if (this.dzb_model.State != DzbModel.GAMESTATE.GAME_WAIT && this.dzb_model.State != DzbModel.GAMESTATE.GAME_INIT ) {
            return
        }
        if (this.locked_view) {
            return
        }
        console.log("GlobalUnit.hallKey====", GlobalUnit.hallKey);

        if (GlobalUnit.hallKey == 1) {//体验场
            this.error_se.play();
            this.showMessage1('体验场不开放留机!');
        } else {
            console.log("on_btn_chaxun_click");
            this.audiobtneffect.play();
            this.layerHoldMachine.active = true;
           
        }

    }
    on_btn_chaxun_click(event, customEventData) {//查询
        if (this.dzb_model.State != DzbModel.GAMESTATE.GAME_WAIT && this.dzb_model.State != DzbModel.GAMESTATE.GAME_INIT ) {
            return
        }
        if (this.locked_view) {
            return
        }
        console.log("on_btn_chaxun_click");
        this.setTouchEnable(false);
        this.audiobtneffect.play();
        this.dzb_model.querydzbhistoryInfo();
    }
    on_btn_back_click(event, customEventData) {//返回
        if (this.dzb_model.State != DzbModel.GAMESTATE.GAME_WAIT && this.dzb_model.State != DzbModel.GAMESTATE.GAME_INIT ) {
            console.log("nick-------------------------lanjie")
            return
        }
        if (this.locked_view) {
            console.log("nick-------------------------lanjie2")
            return
        }
        console.log("on_btn_back_click");
        this.setTouchEnable(false);
        this.audiobtneffect.play();
        this.dzb_model.sendmc('room', 'quit', {});
    }

    showBibeiType(type){
        // var bibei_string = '';
        // switch(type){
        //     case 'bibei':
        //          bibei_string = '比倍';
        //          break;
            
        //     case 'banbibei':
        //          bibei_string = '半比倍';
        //          break;

        //     case 'shuangbibei':
        //          bibei_string = '双比倍';
        //          break;

        //     default:
        // }
        // this.bibei_type.string = bibei_string;
    }
    // TODO Grayson 界面锁
    on_btn_banbi_click(event, customEventData) {//半比
        // this.setBigFireAnim(false);
        if (this.locked_view || this.is_play_win_lose) {
            return
        }
        this.locked_view = true
        console.log("on_btn_banbi_click");

        // TODO Grayson
        this.showBibeiBaoji();

        this.time_se.play();
        // this.audiobtneffect.play();
        this.setGamebibeiWinOrLoseEnable(false, false)
        this.dzb_model.sendmc('room', 'bibei', { bibei: 'banbibei' });
       
        this.showBibeiType('banbibei');

    }
    // TODO Grayson 界面锁
    on_btn_bibei_click(event, customEventData) {//比倍
        // this.setBigFireAnim(false);
        if (this.locked_view || this.is_play_win_lose) {
            return
        }
        this.locked_view = true
        console.log("on_btn_bibei_click");

        this.showBibeiBaoji();

        this.time_se.play();
        // this.audiobtneffect.play();
        this.setGamebibeiWinOrLoseEnable(false, false)
        this.dzb_model.sendmc('room', 'bibei', { bibei: 'bibei' });

        this.showBibeiType('bibei');
    }
    // TODO Grayson 界面锁
    on_btn_shuangbi_click(event, customEventData) {//双比
        // this.setBigFireAnim(false);
        if (this.locked_view || this.is_play_win_lose ) {
            return
        }
        this.locked_view = true
        console.log("on_btn_shuangbi_click");

        this.showBibeiBaoji();

        this.time_se.play();
        // this.audiobtneffect.play();
        this.setGamebibeiWinOrLoseEnable(false, false)
        this.dzb_model.sendmc('room', 'bibei', { bibei: 'shuangbibei' });

        this.showBibeiType('shuangbibei');
    }

    btn_menu_click(event, customEventData) {
        // this.btn_menu.enabled = false;
        this.setMenuEnable(true);
    }

    startbtn_touchstart(event: cc.Event.EventTouch) {
        var self = this;
        if (this.isMenuPlayIng) {
            this.showMessage1("菜单正在打开");
            return
        }
       if (this.locked_view && this.btn_start.enabled){
           return
       }
        if (event.target.getComponent(cc.Button).interactable
        && event.target.getComponent(cc.Button).enabled) {
            console.log("========= jeff startbtn_touchstart")
            this.audiobtneffect.play();
            if (GlobalUnit.hallKey == 1) {//体验场
    
            } else {
                if (event.target.getComponent(cc.Button).interactable
                    && event.target.getComponent(cc.Button).enabled) {
                    if (GlobalUnit.coin >= this.dzb_model.canBetSocre) {
                        this.scheduleOnce(this.btn_start_hold, 1.0);
                    }
                }
            }
        }
    }

    startbtn_touchend(event: cc.Event.EventTouch) {
        if (this.isMenuPlayIng) {
            this.showMessage1("菜单正在打开");
            return
        }
        if (this.locked_view && this.btn_start.enabled){
            return
        }
        if (event.target.getComponent(cc.Button).interactable
            && event.target.getComponent(cc.Button).enabled) {
            console.log("startbtn_touchend=========");
            this.unschedule(this.btn_start_hold);
            if(!this.hasDoAutoGame){
                if(this.moneyEnoughtJuged()){
                    if (!this.dzb_model.autoGame){
                        this.locked_view = true;
                        if (this.isMenuShow) {
                            this.setMenuEnable(false);

                            this.setMenuBtnEnable(false);
                        }
                        this.dzb_ctrl.startGame();
                        this.setStartBtnEnable(false);
                        this.setAddBetBtnEnable(false);
                    }
                }
            }
        }
    }

    startbtn_touchcancle(event: cc.Event.EventTouch) {
        if (this.isMenuPlayIng) {
            this.showMessage1("菜单正在打开");
            return
        }
        if (this.locked_view && this.btn_start.enabled){
            return
        }
        if (event.target.getComponent(cc.Button).interactable
            && event.target.getComponent(cc.Button).enabled) {
            this.unschedule(this.btn_start_hold);
            console.log("停止自动计时游戏 取消");
        }
    }
    
    
    moneyEnoughtJuged(){
        var self = this;
        if (GlobalUnit.coin < this.dzb_model.canBetSocre && this.dzb_model.State == DzbModel.GAMESTATE.GAME_WAIT) {
            if (GlobalUnit.zuanshi > 0) {
                this.audiobtneffect.play();
                if (GlobalUnit.hallKey != 1 ) {//体验场 且 在等待状态
                    this.openBaoxianxiang();
                }
            } else {
                this.error_se.play();
                this.showMessage1('金币不足请充值!');
            }
            this.btn_start.node.active = true;
            this.setStartBtnEnable(true);
            this.setAutoBtnEnable(false);
            this.setgetScoreBtnEnable(false);
            this.btn_getScore.node.active = false;
            this.setAddBetBtnEnable(true);
            this.locked_view = false;
            console.log("jeff ======== moneyEnoughtJuged this.dzb_model.State:",this.dzb_model.State,"this.dzb_model.Less:",this.dzb_model.Less);
            
            return false;
        }
        return true;
    }

    //////-------------------------------------------
    btn_start_hold() {
        console.log("开始自动");
        // this.offBtnStart();

        if(this.moneyEnoughtJuged()){
            this.btn_start.node.active = false;
            this.setStartBtnEnable(false);
            this.setAutoBtnEnable(true);
            this.setgetScoreBtnEnable(false);
            this.btn_getScore.node.active = false;
            this.setAddBetBtnEnable(false);
            this.dzb_ctrl.autoGame();

        }
        this.setMenuEnable(false);
        this.hasDoAutoGame = true;
    }

    private initBtn() {
        console.log("添加触摸");
        var self = this;
        self.btn_start.node.on(cc.Node.EventType.TOUCH_START, this.startbtn_touchstart, this);
        self.btn_start.node.on(cc.Node.EventType.TOUCH_END, this.startbtn_touchend, this);
        self.btn_start.node.on(cc.Node.EventType.TOUCH_CANCEL, this.startbtn_touchcancle, this);
    }

    private offBtnStart() {
        console.log("移除触摸");
        this.unschedule(this.btn_start_hold);
        this.btn_start.node.off(cc.Node.EventType.TOUCH_START, this.startbtn_touchstart)
        this.btn_start.node.off(cc.Node.EventType.TOUCH_END, this.startbtn_touchend)
        this.btn_start.node.off(cc.Node.EventType.TOUCH_CANCEL, this.startbtn_touchcancle)
    }

    private setgetScoreBtnEnable(enable: boolean) {
        this.btn_getScore.enabled = enable;
        this.btn_getScore.interactable = enable;
        
    }

    private setAutoBtnEnable(enable: boolean) {
        this.btn_auto.enabled = enable;
        this.btn_auto.interactable = enable;
        this.btn_auto.node.active = enable;
    }

    private setStartBtnEnable(enable: boolean) {
        this.btn_start.enabled = enable;
        this.btn_start.interactable = enable;
        if(enable){
            this.locked_view = false;
            this.btn_start.node.active = enable;
        }
        
        // if (enable) {
        //     this.initBtn()
        // } else {
        //     this.offBtnStart();
        // }
    }
    private setAddBetBtnEnable(enable:boolean){
        var self = this;
        if(enable&& GlobalUnit.hallKey == 1) {
            return
        }
        this.btn_add_bet.enabled = enable;
        this.btn_add_bet.interactable = enable;

    }
    private setMenuBtnEnable(enable: boolean) {
        this.btn_menu.enabled = enable;
        this.btn_menu.interactable = enable;
    }

    closeCard(gameOver: boolean) {
        var self = this;
        for (var i = 0; i < this.layout_card.node.childrenCount; i++) {
            var node = this.layout_card.node.children[i];
            var card = node.getComponent('cardController_dzb');
            card.setCardDefault(gameOver);

        }
    }

    setBigBtnAnimEnable(enable: boolean) {
        var self = this;
        this.layout_biganim.node.active = enable;
        if (enable) {
            var anim = this.layout_biganim.node.getComponent(cc.Animation);
            var cli = anim.getClips()
            console.log("菜单 1 动画"+cli.length+"  "+enable)
            console.log("donghua 1")
            for(var i=0;i<cli.length;i++){
                console.log("菜单 1 动画 "+cli[i].name)
            }
            anim.on('finished', function () {
                console.log("菜单 1 动画 finish")
                self.layout_biganim.node.active = false;
            }, this);
            anim.play();
        } else {

        }
    }

    seSmallBtnAnimEnable(enable: boolean) {
        var self = this;
        this.layout_smallanim.node.active = enable;
        if (enable) {
            var anim = this.layout_smallanim.node.getComponent(cc.Animation);
            anim.on('finished', function () {
                self.layout_smallanim.node.active = false;
            }, this);
            anim.play();
        } else {

        }
    }

    private querydzbhistoryInfo(event) {
        var response = event.detail
        var self = this;
        self.layerHistory.getComponent('history_dzb').setHistory(response)
        self.setTouchEnable(true);
    }


    private setResultAnimationEnable(node: cc.Node = null, enable: boolean) {
        console.log("-================ ddddddddd ");
        this.showResultAction = enable;
        if (enable) {
            if (node) {
                if (this.layout_animation != null) {
                    this.layout_animation.active = true;
                    this.layout_animation = null;
                }
                this.layout_animation = node;
            }
        } else {
            if (this.layout_animation) {
                this.layout_animation.active = true;
                this.layout_animation = null;
            }
        }
    }

    // TODO Grayson 赢得分数
    private setLabelWinScore(lblAnim: cc.Label){
        // this.label_winscore.string = lblAnim.string;
    }

    // TODO Grayson 显示比倍爆机 隐藏奖项Awards
    private showBibeiBaoji(){

        this.nodeAwardsEnabel(false); // 隐藏奖项Awards
        this.nodeAwardsAnimEnabel(false);
        // this.setResultAnimationEnable(this.rarwad_layout.node, false);
        // this.rarwad_layout.node.active = false;
    }

    // TODO Grayson 隐藏比倍爆机 显示奖项
    private hideBibeiBaoji() {

        this.nodeAwardsEnabel(true);
    }


    // TODO Grayson 隐藏奖项Awards
    private nodeAwardsEnabel(enabel: boolean){
        // this.node_award.active = enabel;
    }

    private nodeAwardsAnimEnabel(enabel:boolean) {
        console.log("gr =================== nodeAwardAnimEnabel ", enabel);
        // this.node_award_anim.active = enabel;
    }


    private setTipTextAnimationEnable(node: cc.Sprite = null, enable: boolean) {
        // console.log("setTipTextAnimationEnable======", enable);
        if (enable) {
            if (node) {
                if (this.layout_animation_TipText != null) {
                    this.layout_animation_TipText.node.active = false;
                    this.layout_animation_TipText = null;
                }
                this.layout_animation_TipText = node;
            }
        } else {
            this.layout_animation_TipText.node.active = false;
            this.layout_animation_TipText = null;
        }
    }

    private showNoCoinAnimation() {
        if (this.textNoCoinAnimationCount % 50 == 0) {
            this.insert_coin_plate.node.active = false
        }
        if (this.textNoCoinAnimationCount % 80 == 0) {
            this.insert_coin_plate.node.active = true
        }
        if (this.textNoCoinAnimationCount % 120 == 0) {
            this.layout_goodluck.node.active = false;
            this.layout_nocoincard.node.active = true;
        }
        if (this.textNoCoinAnimationCount % 240 == 0) {
            this.layout_goodluck.node.active = true;
            this.layout_nocoincard.node.active = false;
        }
    }

    private showTipTextAnimation() {
        if (!this.layout_animation_TipText) {
            return
        }
        if (this.textAnimationCount % 60 == 0) {
            console.log("Grayson showTipTextAnimation 60 ");
            this.layout_animation_TipText.node.active = true
        }
        if (this.textAnimationCount % 120 == 0) {
            console.log("Grayson showTipTextAnimation 120 ");
            this.layout_animation_TipText.node.active = false
        }
    }
    private showPlayAnimation() {
        if (this.playtAnimationCount % 60 == 0) {
            this.layout_play.node.active = true 
        }
        if (this.playtAnimationCount % 120 == 0) {
            this.layout_play.node.active = false 
        }
    }
    private showResultAnimation() {
        if (this.resultAnimationCount % 10 == 0) {
            this.layout_animation.active = true
        }
        if (this.resultAnimationCount % 50 == 0) {
            this.layout_animation.active = false
        }
    }
    private hidResultAnimation() {
        if (this.layout_animation) {
            this.layout_animation.active = false
            this.layout_animation.active = false;
            this.layout_animation = null;
        }
    }

    setMenuEnable(enable: boolean) { //左侧菜单 打开或者关闭
        console.log("xiaowa setMenuEnable  ===========")
        var anim = this.layout_menu.getComponent(cc.Animation); 
        var cli = anim.getClips()
        console.log("菜单 动画"+cli.length+"  "+enable)
        console.log("donghua ")
        for(var i=0;i<cli.length;i++){
            console.log("菜单  动画 "+cli[i].name)
        }
        if (enable) {
            anim.on('finished', this.menuShowOver, this);
            anim.play('openmenu');
            this.isMenuPlayIng = true;
        } else {
            anim.on('finished', this.menuCloseOver, this);
            anim.play('closemenu');
            this.isMenuPlayIng = true;
        }
    }

    
    menuShowOver() { //左侧菜单打开
        // console.log("menuShowOver");
        console.log("菜单  动画 menuShowOver")
        var anim = this.layout_menu.getComponent(cc.Animation);
        anim.off('finished', this.menuShowOver, this);
        this.isMenuPlayIng = false;
        this.isMenuShow = true;
    }

    menuCloseOver() { //左侧菜单隐藏
        // console.log("menuCloseOver");
        console.log("菜单  动画 menuCloseOver")
        var anim = this.layout_menu.getComponent(cc.Animation);
        anim.off('finished', this.menuCloseOver, this);
        // this.btn_menu.enabled = true;
        // this.setMenuBtnEnable(false);
        this.btn_menu.enabled = true;
        this.isMenuPlayIng = false;
        this.isMenuShow = false;
    }

    setbibeiGameAnimationEnable(enable: boolean) {
        if (enable) {
            this.big_anim.active = true;
            this.small_anim.active = true;
            var anim = this.big_anim.getComponent(cc.Animation)
            var anim1 = this.small_anim.getComponent(cc.Animation)
            anim.play("big");
            anim.on('finished', this.bigover, this);
            anim1.on('finished', this.smallover, this);
        } else {
            var anim = this.big_anim.getComponent(cc.Animation)
            var anim1 = this.small_anim.getComponent(cc.Animation)
            anim.off('finished', this.bigover, this)
            anim1.off('finished', this.smallover, this)
            anim.stop("big");
            anim1.stop("small");
            anim.targetOff(anim);
            anim.targetOff(anim1);
            anim.play('bigdefault');
            anim1.play('smalldefault');
        }
    }
    bigover() {
        var anim1 = this.small_anim.getComponent(cc.Animation)
        anim1.play("small");
    }
    smallover() {
        var anim = this.big_anim.getComponent(cc.Animation)
        anim.play("big");
    }

    setbigAndSmallBtnEnable(enable: boolean) {
        this.btn_big.enabled = enable;
        this.btn_small.enabled = enable;
    }
    setMachineBetGameDefault() {
        this.setBigBtnAnimEnable(false);
        this.seSmallBtnAnimEnable(false);
        this.setbibeiGameAnimationEnable(true);
        this.setTipTextAnimationEnable(null, false);
        this.setGamebibeiWinOrLoseEnable(false, false)
        this.setHeartEnable(false);
        this.poker_bibei.node.getComponent('cardController_dzb').setCardDefault(true)
        this.text_caidahuocaixiao_bigPlate.node.active = true;
    }
    hidAllHistoryCard() {
        for (var i = 0; i < this.layout_card_history.node.childrenCount; i++) {
            var node = this.layout_card_history.node.children[i];
            node.getComponent('cardController_dzb').setCardDefault(true);
        }
    }
    initHistoryCard(cardInfo: any) {
        this.hidAllHistoryCard();
        for (var i = 0; i < cardInfo.length; i++) {
            var node = this.layout_card_history.node.children[i];
            node.getComponent('cardController_dzb').setWithOutAnimCard(cardInfo[i]);
        }
    }

    hidallHeart() {
        for (var i = 0; i < this.layout_heart.node.childrenCount; i++) {
            this.layout_heart.node.children[i].active = false;
        }
    }
    setHeartEnable(enable: boolean, winCount: number = 0) {
        this.layout_heart.node.active = enable;
        this.hidallHeart();
        for (var i = 0; i < winCount; i++) {
            this.layout_heart.node.children[i].active = true;
        }
        if (enable) {
            var anim = this.layout_heart.node.getChildByName('heart_' + winCount).getComponent(cc.Animation);
            anim.play('loseOrwin');


        }
    }

    room_bigorsmall(event) { // iswin: boolean, winCount: number
        console.log("//////////////////////////// room_bigorsmall ", event);
        var self = this;
        var data = event.detail.data;
        var isWin = data.win;
        var winCount = data.liansheng;


        this.initHistoryCard(data.bibeihistory); 
        this.text_caidahuocaixiao_bigPlate.node.active = false;
        this.poker_bibei.node.getComponent('cardController_dzb').setWithOutAnimCard(data.card);
        this.poker_bibei.node.getComponent('cardController_dzb').playOpenBetCard(function () {
            self.showBiBeiWinOrLoseAnim(data.win, data.liansheng)
        });
        // this.setGamebibeiWinOrLoseEnable(isWin, true, function () {
        //     console.log("showBiBeiWinOrLoseAnim====输赢=========", isWin);
        //     // self.locked = false;
            // self.dzb_ctrl.closeLocked(); // 关闭锁
        // }, winCount);
    }

    showBiBeiWinOrLoseAnim(iswin: boolean, winCount: number) {
        var self = this;
        this.setGamebibeiWinOrLoseEnable(iswin, true, function () {
            console.log("showBiBeiWinOrLoseAnim====输赢=========", iswin);
            //self.locked = false;
            self.scheduleOnce(function () {
                self.dzb_ctrl.closeLocked(); // 关闭锁
                self.locked_view = false;
                self.is_play_win_lose = false;
                if(iswin){
                  self.setgetScoreBtnEnable(true);
                  self.btn_getScore.node.active = true;  
                  self.setBibeiMenuState(true); 

                }else{
                    self.setStartBtnEnable(true);
                }
                
            }, 1.0);
        }, winCount);
    }

    setGamebibeiWinOrLoseEnable(isWin: boolean, enable: boolean, callback: any = null, winCount: number = 0) {//显示比倍输赢
        console.log("setGamebibeiWinOrLoseEnable");

        this.user_lose.node.active = false
        this.user_win.node.active = false
        this.user_win_1.node.active = false
        this.setBibeiBGMusic(false);
        if(this.flagResultNode){
             this.awardBlink(this.flagResultNode,!enable);
        }
        if (enable) {
            var anim
            if (isWin) {
                console.log("赢");
                this.time_suc_Se.play();
                console.log("setGamebibeiWinOrLoseEnable 成功音效")
                this.user_win.node.active = true
                anim = this.user_win.getComponent(cc.Animation);
                this.setHeartEnable(true, winCount);
            } else {
                console.log("输");
                this.time_fail_se.play();
                this.user_lose.node.active = true
                anim = this.user_lose.getComponent(cc.Animation);
            }
            if (callback != null) {
                anim.once('finished', function () {
                    callback();
                }, this);
            }
            anim.play('loseOrwin');
           this.is_play_win_lose = true;
        } else {
            this.user_lose.node.active = enable
            this.user_win.node.active = enable
            this.user_win_1.node.active = enable
        }
    }
    
    /////////网络提示///////////////
    set_loading_time_out(event) {
        this.setLoadingEnable(event.detail)
    }

    setLoadingEnable(enable: boolean) {
        if (enable) {
            this.startErrorTimer();
        } else {
            this.stopErrorTimer();
        }
        this.layout_loading.node.active = enable;
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
        this.setTouchEnable(true);
        this.setTipMessage("网络连接超时，请重新登录", function () {
            self.goloading();
        })
    }
    goloading() {
        // self.close();
        this.returnHall()
    }

    ///////////--------------------更新步骤状态（闪动文字）--------------------

    private setgTime() {
        this.label_time.string = this.mtoLocaleString();//获取当前时间
    }

    pad(num, n) {
        var y = '00000000000000000000000000000' + num; //爱几个0就几个，自己够用就行
        return y.substr(y.length - n);
    }

    mtoLocaleString = function () {
        var date = new Date();
        return date.getHours() + ":" + this.pad(date.getMinutes(), 2);
    }

    update(dt) {
        var self = this;
        this.dzb_ctrl.network();
        this.setgTime();
        if(this.dzb_model.config && this.dzb_model.config.roomkey){
            this.setMachineNum(this.dzb_model.config.roomkey);
        }
        
        if(this.dzb_model.State != DzbModel.GAMESTATE.GAME_ONE){
            if(this.label_credit_score != this.label_score.string){
               
                this.label_credit_score = this.label_score.string
      
            }else{
                if (this.label_credit_score_count < 0) {
    
                }else {
                    this.label_credit_score_count -= 1;
                    if (this.label_credit_score_count < 0) {
                    
                    }
                }
            }
            if(this.label_bet_score != this.label_scorebet.string){
              
                this.label_bet_score = this.label_scorebet.string

       
            }else{
                if(this.label_bet_score_count>=0){
                    this.label_bet_score_count -= 1;
                    if (this.label_bet_score_count < 0) {
                       
                    }
                }
            }
            
        }
        
        
        if (!this.dzb_model || !this.dzb_model.State){
            return
        }
        if (this.showResultAction) {
            this.resultAnimationCount++;
            this.showResultAnimation();
        } else {
            this.hidResultAnimation();
            this.resultAnimationCount = 0;
        }
        if (this.dzb_model.State == DzbModel.GAMESTATE.GAME_WAIT && GlobalUnit.coin < this.dzb_model.canBetSocre) {//没有钱
            this.textNoCoinAnimationCount++;
            this.showNoCoinAnimation();
        }
        if (this.dzb_model.State == DzbModel.GAMESTATE.GAME_WAIT
            || this.dzb_model.State == DzbModel.GAMESTATE.GAME_INIT) {//如果是待机或者初始化状态显示play100动效
            this.playtAnimationCount++;
            // this.showPlayAnimation();
        } else if (this.dzb_model.State == DzbModel.GAMESTATE.GAME_ONE ||
            this.dzb_model.State == DzbModel.GAMESTATE.GAME_BIBEIHUODEFEN) {//选择留牌和 选择得分或比倍 状态显示文字提示闪动动效
            this.textAnimationCount++;
            this.showTipTextAnimation();
        } else {
            //console.log("this.dzb_model.State :",this.dzb_model.State)
            // this.layout_play.node.active = false // TODO 去掉“加注”
        }
        //更新加注按钮状态
        // if (this.dzb_model.autoGame ||
        //     (this.dzb_model.State != DzbModel.GAMESTATE.GAME_WAIT)) {
        //     if (GlobalUnit.hallKey != 1 && this.btn_add_bet.enabled ) {
        //         this.setAddBetBtnEnable(false);
        //     }
        // }

        if (this.opencardCount > 0) {
            this.open_card_time_out_count++;
            if (this.open_card_time_out_count > this.open_card_time_out) {
                this.open_card_time_out_count = 0;
                this.opencardCount = 1;
                this.openOver();
                console.log("jeff ============ openOver ")
            }
        }else{
            this.open_card_time_out_count = 0;
        }
    }

    ///---------------------------

    updateScore(Lable: cc.Label, toNum: number, endScore: number,award:string) {
        var self = this;
        var numadd: number = parseInt(Lable.string);
        var numscore: number = parseInt(this.label_score.string)
        var count = 0;

        // var tick_total = 6200

        // if (Lable == this.label_Bl_5ofakind || Lable == this.label_Bl_royalflush || Lable == this.label_Bl_strflush ||
        //     Lable == this.label_Bl_4ofakindAJ || Lable == this.label_Bl_4ofakind210 ) {
        //         tick_total = 37500
        //     }

        var dec = 30;
        // if (numadd >= 1000) {
        //     dec = 300
        // }
        switch (award) {
            case 'fivebars':
            case 'royalflush':
            case 'fiveofakind':
                if (GlobalUnit.hallKey == 1){
                    dec = 200;
                }else if (GlobalUnit.hallKey == 2){
                    dec = 400;
                }else if (GlobalUnit.hallKey == 3){
                    dec = 600;
                }else if (GlobalUnit.hallKey == 4){
                    dec = 800;
                }else if (GlobalUnit.hallKey == 5){
                    dec = 2000;
                }else if (GlobalUnit.hallKey == 6){
                    dec = 3000;
                }  
                
                break;
            case 'strflush':
                if (GlobalUnit.hallKey == 1){
                    dec = 200;
                }else if (GlobalUnit.hallKey == 2){
                    dec = 400;
                }else if (GlobalUnit.hallKey == 3){
                    dec = 600;
                }else if (GlobalUnit.hallKey == 4){
                    dec = 800;
                }else if (GlobalUnit.hallKey == 5){
                    dec = 2000;
                }else if (GlobalUnit.hallKey == 6){
                    dec = 3000;
                }   

                break;


            case 'fourofakind':
        
                if (GlobalUnit.hallKey == 1){
                    dec = 500;
                }else if (GlobalUnit.hallKey == 2){
                    dec = 1000;
                }else if (GlobalUnit.hallKey == 3){
                    dec = 2000;
                }else if (GlobalUnit.hallKey == 4){
                    dec = 3000;
                }else if (GlobalUnit.hallKey == 5){
                    dec = 2000;
                }else if (GlobalUnit.hallKey == 6){
                    dec = 4000;
                }   

                break;
            case 'fullhouse':
            case 'flush':
            case 'straight':
            case 'threeofakind':
            case 'twopair':
                if (GlobalUnit.hallKey == 1){
                    dec = 10;
                }else if (GlobalUnit.hallKey == 2){
                    dec = 30;
                }else if (GlobalUnit.hallKey == 3){
                    dec = 100;
                }else if (GlobalUnit.hallKey == 4){
                    dec = 400;
                }else if (GlobalUnit.hallKey == 5){
                    dec = 600;
                }else if (GlobalUnit.hallKey == 6){
                    dec = 800; 
                } 
                break;
            case 'eightorbetter':
                if (GlobalUnit.hallKey == 1){
                    dec = 8;

                }else if (GlobalUnit.hallKey == 2){
                    dec = 10;
                }else if (GlobalUnit.hallKey == 3){
                    dec = 100;
                }else if (GlobalUnit.hallKey == 4){
                    dec = 400;
                }else if (GlobalUnit.hallKey == 5){
                    dec = 600;
                }else if (GlobalUnit.hallKey == 6){
                    dec = 800; 
                }  

                break;
        }
       
        if(this.flagResultNode ){
            this.awardBlink(this.flagResultNode,false);
        }
        var fun = function () {
            var def: cc.AudioSource = new cc.AudioSource()
            def.volume = GlobalUnit.effectVolume;
            def.clip = self.defclip;
            def.play();
            numadd -= dec;
            numscore += dec;
            count++;
            Lable.string = "" + numadd
            self.label_score.string = "" +Math.floor(numscore);
            if (numadd <= toNum ) {
                Lable.string = "" + toNum;
                self.label_score.string = "" + Math.floor(endScore);
                self.onGetScoreOver(true);

                //停止 播放音效
                def.stop();
                if(!self.dzb_model.autoGame){
                    self.setStartBtnEnable(true);
                    self.setAddBetBtnEnable(true);
                }
                
                self.unschedule(fun);
            }
        }
         self.schedule(fun, 0.08);
        
    }

    onGetScoreOver(playSound: boolean) {
        console.log("得分结束");
        this.locked_view=false;
        console.log("jeff ======== onGetScoreOver this.dzb_model.State:",this.dzb_model.State,"this.dzb_model.Less:",this.dzb_model.Less);
        this.dzb_ctrl.closeLocked(); // 关闭锁
        this.setResultAnimationEnable(null, false);
        this.setTouchEnable(true);
        this.awardsSetting(this.dzb_model.awardsInfo);
        if (playSound) {
            //this.time_suc_Se.play();
         
        }
        if (!this.dzb_model.autoGame) {
            //打开按钮
            // this.setAddBetBtnEnable(true);
        }
        // if (this.dzb_model.is_win == true) {
          
            this.dzb_ctrl.get_score_end();
        // }
        this.setMachineDefault();
        // this.setLayoutCardEnable(false);
     
        this.initStateGameWait(this.dzb_model); // Grayson 得分动画完成之后 初始化界面
    }

    touchScene(event) {
        if (cc.rectContainsPoint(this.layout_menu.node.getBoundingBoxToWorld(), event.getLocation())) {
            return;
        }
        if (!this.isMenuPlayIng && this.isMenuShow) {
            this.setMenuEnable(false);
        }
    }

    initMusic() {
        var self = this;
        console.log("volume====音量=======", GlobalUnit.effectVolume);
        this.audiobtneffect.volume = GlobalUnit.effectVolume;
        this.time_se.volume = GlobalUnit.effectVolume;
        this.time_suc_Se.volume = GlobalUnit.effectVolume;
        this.time_fail_se.volume = GlobalUnit.effectVolume;
        this.def_se.volume = GlobalUnit.effectVolume;
        this.bianqian_se.volume = GlobalUnit.effectVolume;
        this.fanye_se.volume = GlobalUnit.effectVolume;
        this.error_se.volume = GlobalUnit.effectVolume;
        this.dwf_se.volume = GlobalUnit.effectVolume;
        this.upf_se.volume = GlobalUnit.effectVolume;
        this.btncloseeffect.volume = GlobalUnit.effectVolume;

        this.audio_source_3ofakind.volume = GlobalUnit.effectVolume;
        this.audio_source_twopairs.volume = GlobalUnit.effectVolume;
        this.audio_source_4ofakind.volume = GlobalUnit.effectVolume;
        this.audio_source_5ofakind.volume = GlobalUnit.effectVolume;
        this.audio_source_7better.volume = GlobalUnit.effectVolume;
        this.audio_source_opencardOneSucc.volume = GlobalUnit.effectVolume;
        this.audio_source_royalflush.volume = GlobalUnit.effectVolume;
        this.audio_source_flush.volume = GlobalUnit.effectVolume;
        this.audio_source_straight.volume = GlobalUnit.effectVolume;
        this.audio_source_strflush.volume = GlobalUnit.effectVolume;
        this.audio_source_fullhouse.volume = GlobalUnit.effectVolume;
        this.audio_source_5bars.volume = GlobalUnit.effectVolume;
        this.audio_source_bigorsamll.volume = GlobalUnit.effectVolume;
    }

    initUI() {
        var self = this;
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchScene, this);
        this.setBiBeiMenuEnable(false);
        this.setgetScoreBtnEnable(false);
        this.btn_getScore.node.active = false;
        this.setAutoBtnEnable(false);
        this.hidAllText();
        // this.sendCard();
        // this.setLayoutCardEnable(false); // TODO Grayson 隐藏卡牌
        console.log("xiaowa initUI  ===========")
        this.setMenuEnable(true);
        this.setHistoryLayerEnable(false);
        //this.initMusic();

        console.log("GlobalUnit.hallKey============", GlobalUnit.hallKey);
        if (GlobalUnit.hallKey == 1) {//体验场
            this.btn_start.node.getChildByName('Label_auto').active = false;
            this.btn_add_bet.node.active = false;
        }
        this.btn_auto.node.active = false;
        //this.layerBaoxian.active = false;
        this.layerHoldMachine.active = false;
        this.layout_message.node.active = false;
        this.showStart()
        this.schedule(function () {
            self.showStart();
        }, 2.0)
        // this.initBtn();
    }

    private RandomNumBoth(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.round(Rand * Range); //四舍五入
        return num;
    }

    hitAllStart() {
        for (var i = 0; i < this.layout_star.node.childrenCount; i++) {
            this.layout_star.node.children[i].active = false;
        }
    }

    showStart() {
        var self = this;
        for (var i = 0; i < 4; i++) {
            var index = this.RandomNumBoth(0, this.layout_star.node.childrenCount - 1);
            var node = self.layout_star.node.children[index]
            node.active = true;
            var anim = node.getComponent(cc.Animation);
            anim.play();
        }
    }

    /////////游戏中加注/////////////
    btn_addbet_touchstart() {
        if (!this.btn_add_bet.enabled) {
            return
        }
        this.scheduleOnce(this.btn_hold_addbet, 0.5);
        this.addbet();
    }
    btn_addbet_touchend() {
        // if (!this.btn_add_bet.enabled) {
        //     return
        // }
        this.btncloseeffect.play();
        this.unschedule(this.btn_hold_addbet);
        this.unschedule(this.addbet);
    }
    btn_addbet_touchcancle() {
        // if (!this.btn_add_bet.enabled) {
        //     return
        // }
        this.unschedule(this.btn_hold_addbet);
        this.unschedule(this.addbet);
    }
    btn_hold_addbet() {
        this.schedule(this.addbet, 0.1);
    }
    addbet() { //加注处理
        var self = this;
        console.log(" addbet ============", GlobalUnit.coin);
        var add_number = this.get_add_bet_cell()
        if (GlobalUnit.coin < this.dzb_model.canBetSocre + add_number) {
            this.unschedule(this.btn_hold_addbet);
            this.unschedule(this.addbet);
            this.showMessage1("金币不足，不能加注")
            this.error_se.play();
        } else {
            var def: cc.AudioSource = new cc.AudioSource()
            def.volume = GlobalUnit.effectVolume;
            def.clip = this.upf_se.clip;
            def.play();
            var self = this;
            var current_bet = this.dzb_model.canBetSocre + add_number;
            if (current_bet > this.get_add_bet_total()) {
                this.dzb_ctrl.set_bet_socre(this.dzb_model.baseBetSocre);
            }else{
                this.dzb_ctrl.set_bet_socre(current_bet);
            }
            this.set_bet_label();
        }
    }
    get_add_bet_cell() {
        var self = this;
        if (GlobalUnit.hallKey == 1) {
            return 10;
        }else if (GlobalUnit.hallKey == 2) {
            return 10;
        }else if (GlobalUnit.hallKey == 3) {
            return 50;
        }else if (GlobalUnit.hallKey == 4) {
            return 100;
        }else if (GlobalUnit.hallKey == 5) {
            return 100;
        }else {
            return 1;
        }
    }
    get_add_bet_total() {
        var self = this;
        if (GlobalUnit.hallKey == 1) {
            return 490;
        }else if (GlobalUnit.hallKey == 2) {
            return 490;
        }else if (GlobalUnit.hallKey == 3) {
            return 950;
        }else if (GlobalUnit.hallKey == 4) {
            return 2400;
        }else if (GlobalUnit.hallKey == 5) {
            return 3500;
        }else {
            return 1000000;
        }
    }

    set_bet_label() {
        this.setMachineBetScore(this.dzb_model.canBetSocre);
        this.setlabel_scorebet(this.dzb_model.canBetSocre);
    }

    private setMachineBetScore(number: number) {
        this.label_bet.string = "" + number;
    }

    private setlabel_scorebet(score: number) {
        this.label_scorebet.string = "" + score;
    }

    ////////------------------翻牌-------------------------

    private openCard() {
        var self = this;
        var count = 0
        console.log("jeff ======== openCard this.dzb_model.State:",this.dzb_model.State,"this.dzb_model.Less:",this.dzb_model.Less);
        for (var i = 0; i < this.layout_card.node.childrenCount; i++) {
            var node = this.layout_card.node.children[i];
            var time = (count * 0.2);
            if (node.getComponent('cardController_dzb').gethold()) {
                console.log("不用延迟");
                time = 0;
            } else {
                count++;
            }
            var de = cc.delayTime(time)
            var call = cc.callFunc(function (target, data) {
                self.layout_card.node.children[data].getComponent('cardController_dzb').playOpenCard();
                console.log(" ================= playOpenCard ===============");
            }, this, i);
            var seq = cc.sequence(de, call);
            this.node.runAction(seq);
        }
    }

    private initCards(cardInfo: any, needOpen: boolean) {


        for (var i = 0; i < this.layout_card.node.childrenCount; i++) {
            var node = this.layout_card.node.children[i];
            node.getComponent('cardController_dzb').setCard(cardInfo[i]);
        }
        if (needOpen == true) {
            this.openCard();
        }
    }

    private initTextHold(select: any) {

        for (var i = 0; i < this.layout_hold.node.childrenCount; i++) {
            var node = this.layout_hold.node.children[i];
            node.active = false;
        }
        for (var i = 0; i < this.layout_card.node.childrenCount; i++) {
            var node = this.layout_card.node.children[i];
            node.getComponent('cardController_dzb').sethold(false);
        }
        for (var i = 0; i < select.length; i++) {
            this.layout_hold.node.getChildByName('hold_' + select[i]).active = true;
            this.layout_card.node.getChildByName('poker_' + select[i]).getComponent('cardController_dzb').sethold(true);
        }
    }

    getScore(endScore: number) {
        var lblAnim: cc.Label = null;
        var nodeAnim: cc.Node = null;
        console.log("...... cccccc ", this.awards);
        switch (this.awards) {
            case 'fiveofakind':
                lblAnim = this.label_Bl_5ofakind;
                nodeAnim = this.layout_5ofkind.node.getChildByName('layout');
                break;
            case 'royalflush':
                lblAnim = this.label_Bl_royalflush;
                nodeAnim = this.layout_royalflush.node.getChildByName('layout');
                break;
            case 'strflush':
                lblAnim = this.label_Bl_strflush;
                nodeAnim = this.layout_strflush.node.getChildByName('layout');
                break;
            // case 'fourofakind':
            //     lblAnim = this.label_Bl_4ofakind;
            //     nodeAnim = this.layout_4ofkind.node.getChildByName('layout');
            //     break;
            case 'fullhouse': 
                lblAnim = this.label_Bl_fullhouse;
                nodeAnim = this.layout_fullhouse.node.getChildByName('layout');
                break;

            case 'flush':
                lblAnim = this.label_Bl_flush;
                nodeAnim = this.layout_flush.node.getChildByName('layout');
                break;
            case 'straight':
                lblAnim = this.label_Bl_straight;
                nodeAnim = this.layout_straight.node.getChildByName('layout');
                break;
            case 'threeofakind':
                lblAnim = this.label_Bl_3ofkind;
                nodeAnim = this.layout_3ofkind.node.getChildByName('layout');
                break;
            case 'twopair':
                lblAnim = this.label_Bl_2pair;
                nodeAnim = this.layout_2pair.node.getChildByName('layout');
                break;
            case 'eightorbetter':
                lblAnim = this.label_Bl_7better;
                nodeAnim = this.layout_7better.node.getChildByName('layout');
                break;

            case 'fourofakind':
                lblAnim = this.label_Bl_4ofakind;
                nodeAnim = this.layout_4ofkind.node.getChildByName('layout');
                break;
            case 'none':
                this.onGetScoreOver(false);
            
                break;
        }
        if (lblAnim != null) {
            console.log("......====== ddddddd ", lblAnim);
            this.setResultAnimationEnable(null, false);
            this.setResultAnimationEnable(nodeAnim, true);
            // TODO Grayson 赢得分数
            // this.scheduleOnce(function(){
                this.label_winscore = lblAnim;
                console.log("updateScore ================== updateScore");
                 this.updateScore(this.label_winscore, 0, endScore,this.awards);
            // }, 1000);
            
        }
    }
    setBibeiMenuState(enabled:boolean){
        this.btn_bibei.enabled = enabled;
        this.btn_bibei.interactable = enabled

        this.btn_banbi.enabled = enabled
        this.btn_banbi.interactable = enabled
        
        this.btn_shuangbi.enabled = enabled;
        this.btn_shuangbi.interactable = enabled
    }
    setbibeiMenuEnable(enable: boolean) {
        this.layout_bibeimenu.node.active = true;
        var anim = this.layout_menu.getComponent(cc.Animation);
        var anim1 = this.layout_bibeimenu.getComponent(cc.Animation);
        if (enable) {
            anim.play('hidmenubtn');
            anim1.play('openbibeimenu');
            this.is_open_bibei_menu = true
        } else {
            anim.play('showmenubtn');
            anim1.play('closebibeimenu');
            this.is_open_bibei_menu = false
        }
    }

/**
 * @param
 * type 牌型字符串标示
 * @description
 * 第一次翻牌结束，播音效
 * 第二次翻牌结束，fullhouse以上牌型（不包含fullhouse）先播音效再报牌，没有音效直接报牌 ,fullhouse以下牌型（包含fullhouse）音效牌型一起播放
 * 
 */
    playAwardAudio(type){ 
        return;
        if(type == 'none'|| type == undefined)return;

        var self = this;
        if (this.dzb_model.Less == DzbModel.LESS_STATE.LESS_ONE) { 
            var firstEffectAudio = audio_config[type].firstEffectAudio;
            this.playAudio(firstEffectAudio,false,null);
        }else if (this.dzb_model.Less == DzbModel.LESS_STATE.LESS_BIBEIHUODEFEN) {
            //效果音效
            var effectAudio = audio_config[type].effectAudio;
            var effectloop = audio_config[type].effectloop;

            //牌型音效
            var typeloop = audio_config[type].typeloop;
            var typeAudio = audio_config[type].typeAudio;
            self.btn_getScore.node.active = true;  
            
            if(type == 'threeofakind' || type == 'twopair' || type == 'eightorbetter' || type == 'straight'||type == 'fullhouse'||type == 'flush'){
                this.playAudio(effectAudio,effectloop,null);
                self.setgetScoreBtnEnable(true);
                self.playAudio(typeAudio,typeloop,null);
            }else{
               
                var audioTime = 0;
                var callback = null;
                if(typeAudio!=""){
                    callback = function(){
                        //报牌
                       var typeid = self.playAudio(typeAudio,typeloop,function(){
                            self.playAudio("resources/sound/xiu_se.mp3",effectloop,function(){
                                // self.setgetScoreBtnEnable(true);
                                // self.btn_getScore.node.active = true;  
                                // self.setBibeiMenuState(true);
                            });
                        });
                        // if(cc.audioEngine.getState(typeid) == cc.audioEngine.AudioState.ERROR){
                        //     self.setgetScoreBtnEnable(true);
                        //     self.btn_getScore.node.active = true;  
                        //     self.setBibeiMenuState(true);   

                        // }
                    }
                }
                
                //播效果音效
                var effectid = this.playAudio(effectAudio,effectloop,callback);
                if(cc.audioEngine.getState(effectid) == cc.audioEngine.AudioState.ERROR){
                    self.setgetScoreBtnEnable(true);
                    self.btn_getScore.node.active = true;  
                    self.setBibeiMenuState(true);       
                }
            }    
        }
    }

    playAudio(name:string,loop:boolean,callback:Function)     
    {
        var self = this;
         //获取音量设置
        var volume = GlobalUnit.effectVolume;
        var audioID = cc.audioEngine.play(cc.url.raw(name), loop, volume);
        cc.audioEngine.setFinishCallback(audioID, function () {
            if(callback){
                callback();
            }
        });
        return audioID;
       
    }
    stopAudio(audioid:number){
        cc.audioEngine.stop(audioid);
    }

    //--------------------翻牌回调----------------------

    private showAwards() {

        if (this.dzb_model.State == DzbModel.GAMESTATE.GAME_ONE) {
            this.isFirstOpenCard = true;
        }else{
            this.isFirstOpenCard = false;
        }

        var lblAnim: cc.Layout = null;
        if(this.flagResultNode ){
            this.awardBlink(this.flagResultNode,false);
        }
        this.playAwardAudio(this.awards);
        
        switch (this.awards) {

            case 'fiveofakind':
                lblAnim = this.layout_5ofkind;
                break;
            case 'royalflush':
                lblAnim = this.layout_royalflush;  
                break;
            case 'strflush':  
                lblAnim = this.layout_strflush;
                break;
            case 'fullhouse':
                lblAnim = this.layout_fullhouse;  
                break;
            case 'flush':
                lblAnim = this.layout_flush;
                break;
            case 'straight':
                 lblAnim = this.layout_straight; 
                break;
            case 'threeofakind':
                lblAnim = this.layout_3ofkind;
                break;
            case 'twopair':   
                lblAnim = this.layout_2pair;    
                break;
            case 'eightorbetter':
                lblAnim = this.layout_7better;
                break;
            case 'fourofakind':    
                lblAnim = this.layout_4ofkind;    
                break;
        }
        if(lblAnim){
            this.flagResultNode = lblAnim;
            this.awardBlink(lblAnim,true);
        }
       
    }
    awardBlink(award:cc.Layout,animate:boolean){

        var animation = award.node.getComponent(cc.Animation);
        if(animate){
            animation.play('blink');
        }else{
            animation.stop('blink');
            award.node.children[0].opacity=255;
        }
        
    }
    setBigFireAnim(active:boolean){
         this.big_fire.node.active = active
         var animation = this.big_fire.getComponent(cc.Animation);
         if(active){
            animation.play('big_fire_burn');
         }else{
            animation.stop('big_fire_burn');
         }
         
    }
    setAwardResultAnim(nodeName:string, enabel:boolean, label:cc.Label){
        // var node = this.node_award_anim.getChildByName(nodeName);
        // node.active = true;
        // var animNode = node.getChildByName(this.NODE_ANIM);
        // this.labelbl = node.getChildByName("layout").getChildByName(label.node.name);
        // this.labelbl.getComponent(cc.Label).string = label.string;
        // this.setResultAnimationEnable(node.getChildByName("layout"), true);
        // var anim = animNode.getComponent(cc.Animation);
        // if (enabel) {
        //     anim.play("award_sel_two");
        // }


    }

    // TODO Grayson 界面锁
    openOver() {
        console.log("======openOver this.opencardCount = ",this.opencardCount);
        this.opencardCount--;
        if (this.opencardCount == 0) {
            this.setTextHoldEnable(true);
            this.showAwards();
            if (this.dzb_model.State == DzbModel.GAMESTATE.GAME_BIBEIHUODEFEN && !this.dzb_model.autoGame){
                // this.setgetScoreBtnEnable(true);
            }
            this.scheduleOnce(function(){
                this.dzb_ctrl.closeLocked(); // 关闭锁
                this.locked_view = false;
                console.log("jeff ======== openOver this.dzb_model.State:",this.dzb_model.State,"this.dzb_model.Less:",this.dzb_model.Less);
                // if (this.dzb_model.State == DzbModel.GAMESTATE.GAME_WAIT || this.dzb_model.State == DzbModel.GAMESTATE.GAME_ONE) {
                //     this.dzb_ctrl.closeLocked(); // 关闭锁
                //     this.locked_view = false;
                // }

                if (this.dzb_model.State == DzbModel.GAMESTATE.GAME_ONE) {
                    this.dzb_ctrl.get_one_card()
                    if (!this.dzb_model.autoGame) {
                        this.setStartBtnEnable(true);
                     if (this.dzb_model.Less == DzbModel.LESS_STATE.LESS_TWO) {
                            this.setAddBetBtnEnable(true);  
                            this.time_fail_se.play();
                            this.hidAllText();
                            
                       }
                    }
                }else if (this.dzb_model.State == DzbModel.GAMESTATE.GAME_BIBEIHUODEFEN) {
                     this.time_suc_Se.play();
                     this.setgetScoreBtnEnable(true);
                     this.btn_getScore.node.active = true;  
                    if (this.dzb_model.autoGame) {
                        this.defen();
                    }else{
                        if (!this.is_open_bibei_menu) {
                            this.setbibeiMenuEnable(true);
                            
                            this.setBibeiMenuState(true);
                        }
                    }
                }else if (this.dzb_model.State == DzbModel.GAMESTATE.GAME_WAIT) {
                    this.setMachineDefault();
                    if (!this.dzb_model.autoGame) {
                        this.setStartBtnEnable(true);
                    }
                }else if (this.dzb_model.Less == DzbModel.LESS_STATE.LESS_TWO) {
                   
                }

            }, 0.2);
            
            // this.scheduleOnce(function () {
               
            // }, 0.02)
        }
    }

    setBibeiBGMusic (enabel: boolean) {
        // var soundPlayerObjcet = this.layout_bibei.getComponent("soundPlayer");
        // if (enabel) {
        //     soundPlayerObjcet.play();
        // } else {
        //     soundPlayerObjcet.stop();
        // }
    }

    private set locked_view(lock:boolean) {
        this.locked_view_1 = lock;
        this.dzb_ctrl.locked_view = lock;
    }

    private get locked_view():boolean {
        return this.locked_view_1;
    }
    setReconnectLoadingView(param){
        this.layout_loading.node.active = param.detail.visible;
        this.layout_loading2_label.string = param.detail.str;
    }
    setTipMessage2(param) {
        // this.layout_loading2.node.active =false;
        
        console.log("setTipMessage2 setTipMessage2 ",param.detail);
        if (!this.layout_tip.node.active) {
            this.layout_tip.node.getComponent('tipController').setMessage(param.detail.message);
            this.layout_tip.node.getComponent('tipController').setCallBack(param.detail.call);
            this.layout_tip.node.active = true;
        }
    }

    openBaoxianxiang()
    {
        var filName = "prefabs/dzb/layerBaoxian.prefab";
        cc.loader.loadRes(filName,function (err, prefab) {
        if( err ) { cc.log( '载入预制资源失败, 原因:' + err ); return; }
        var layerbaoxian =cc.instantiate(prefab);
        //layerbaoxian.setPosition( new cc.Vec2(568,320));
        cc.director.getScene().getChildByName('Canvas').addChild(layerbaoxian);
        })
    }
    
}