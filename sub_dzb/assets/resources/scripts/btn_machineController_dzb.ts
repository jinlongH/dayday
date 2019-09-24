// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import { GlobalUnit } from './GlobalUint';
const {ccclass, property} = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label_machineindex: cc.Label = null;

    @property(cc.SpriteAtlas)
    machine_atlas: cc.SpriteAtlas = null;

    @property(cc.Button)
    btn_machine: cc.Button = null;

    @property(cc.Sprite)
    mylight: cc.Sprite = null;

    @property(cc.Sprite)
    spr_lost: cc.Sprite = null;

    @property(cc.Sprite)
    spr_player0: cc.Sprite = null;

    @property(cc.Sprite)
    spr_player1: cc.Sprite = null;

    @property(cc.Layout)
    layout_playing: cc.Layout = null;

    @property(cc.Layout)
    layout_hold: cc.Layout = null;

    @property(cc.AudioSource)
    machineeffect: cc.AudioSource = null;

    @property(cc.AudioSource)
    eor_se: cc.AudioSource = null;

    @property(cc.AudioSource)
    joineffect: cc.AudioSource = null;

    private et: cc.EventTarget = null;

    private machineIndex = 0;

    private machineOwner: string = null;

    private sex:string="";

    public BTNSTATE = {
        BTN_DEFAULT: 0,//默认
        BTN_PLAYING: 1,//有人
        BTN_PITCHON: 2,//选中
        BTN_HOLD: 3,//留机
        BTN_HOLD_LOST: 4,//断线留机
    }
    public SpriteName = ['paiji_wuren_bigPlate', 'paiji_youren_bigPlate', 'paiji_xuanzhong_bigPlate', 'paiji_liuji_bigPlate'];
    private btnstate = this.BTNSTATE.BTN_DEFAULT;
    initmusic() {
        var self = this;
        this.joineffect.volume = GlobalUnit.effectVolume || 1;
        this.machineeffect.volume = GlobalUnit.effectVolume || 1;
    }
    public setSex() {
        var self = this;
        self.spr_player0.node.active = false;
        self.spr_player1.node.active = false;

        if (GlobalUnit.sex == "1") {//女
            self.spr_player1.node.active = true;
        } else {
            self.spr_player0.node.active = true;
        }
    }
     public setSexO(sex) {
         if(sex==undefined){
             return;
         }
        var self = this;
        self.spr_player0.node.active = false;
        self.spr_player1.node.active = false;
        var filName = "";
        if(parseInt(sex)>3){
             this.sex = "1";
        }else{
             this.sex = "0";
        }
        if (this.sex  == "1") {//女
            self.spr_player1.node.active = true;
        } else {
            self.spr_player0.node.active = true;
        }
    }
    onLoad() {
        if (!this.et) {
            this.et = cc['NetTarget'];
        }
        this.initmusic();
    }
    public setMachineNumber(num: number) {
        this.label_machineindex.string = "" + num;
        this.machineIndex = num;
    }
    setBtnSprite(state: number) {
        var frame = this.machine_atlas.getSpriteFrame(this.SpriteName[state]);
        this.btn_machine.getComponent("cc.Sprite").spriteFrame = frame
    }
    public setPlayingInfo(playerName: any,playerLevel: string) {
        this.layout_playing.getComponent('btn_machinePlayingController_dzb').setPlayingInfo(playerName,playerLevel);
        this.layout_hold.getComponent('btn_machineHoldController_dzb').setHoldPlayerName(playerName,playerLevel);
    }
    public setMachineState(state: number, time: number = -1, uid: string = null) {
        if (!this.et) {
            this.et = cc['NetTarget'];
        }
        this.btnstate = state;
        this.mylight.node.active = false;
        this.layout_playing.node.active = false;
        this.layout_hold.node.active = false;
        this.spr_lost.node.active = false;
        switch (this.btnstate) {
            case this.BTNSTATE.BTN_DEFAULT: //默认
                console.log("默认");
                this.setBtnSprite(this.BTNSTATE.BTN_DEFAULT);
                break;
            case this.BTNSTATE.BTN_PLAYING: //有人
                console.log("有人1");
                this.setBtnSprite(this.BTNSTATE.BTN_PLAYING);
                console.log("有人2");
                this.layout_playing.node.active = true;
                break;
            case this.BTNSTATE.BTN_PITCHON: //选中
                console.log("选中");
                this.setBtnSprite(this.BTNSTATE.BTN_PITCHON);
                this.mylight.node.active = true;
                break;
            case this.BTNSTATE.BTN_HOLD: //留机
                console.log("留机");
                console.log("uid=========1========", uid);
                this.layout_hold.node.active = true;
                this.layout_hold.getComponent('btn_machineHoldController_dzb').setTime(time);
                this.setBtnSprite(this.BTNSTATE.BTN_HOLD);
                this.et.on('timeOut', this.setDefault, this);
                this.machineOwner = uid
                break;
            case this.BTNSTATE.BTN_HOLD_LOST: //留机
                console.log("留机");
                console.log("uid========2=========", uid);
                this.layout_hold.node.active = true;
                this.layout_hold.getComponent('btn_machineHoldController_dzb').setTime(time);
                this.spr_lost.node.active = true;
                this.setBtnSprite(this.BTNSTATE.BTN_HOLD);
                this.et.on('timeOut', this.setDefault, this);
                this.machineOwner = uid
                break;
        }
    }
    start() {

    }
    setDefault() {
        console.log("setDefaultsetDefaultsetDefaultsetDefaultsetDefaultsetDefaultsetDefaultsetDefault");
        this.et.off('setDefault', this.setDefault, this);
        this.et.off('timeOut', this.setDefault, this);
        this.setMachineState(this.BTNSTATE.BTN_DEFAULT);
    }
    closeLight() {
        switch (this.btnstate) {
            case this.BTNSTATE.BTN_DEFAULT: //默认
                console.log("没人");
                break;
            case this.BTNSTATE.BTN_PLAYING: //有人
                console.log("有人");
                break;
            case this.BTNSTATE.BTN_PITCHON: //选中
                console.log("进入游戏");
                this.setDefault();
                break;
            case this.BTNSTATE.BTN_HOLD: //留机
            case this.BTNSTATE.BTN_HOLD_LOST: //留机
                break;
        }
        this.mylight.node.active = false;
        this.et.off('closeLight', this.closeLight, this);
    }
    btn_machine_click(event, customEventData) {
        var self = this;
        this.mylight.node.active = true;
        //__T: xiaowa 非法进入测试代码
        // this.et.emit("join", this.machineIndex);
        // return

        switch (this.btnstate) {
            case this.BTNSTATE.BTN_DEFAULT: //默认
                this.machineeffect.play();
                this.setMachineState(this.BTNSTATE.BTN_PITCHON);
                this.et.emit("closeLight");
                this.et.on('closeLight', this.closeLight, this);
                console.log("没人");
                break;
            case this.BTNSTATE.BTN_PLAYING: //有人
                console.log("有人");
                this.eor_se.play();
                this.et.emit("message", "该机台有玩家");
                this.et.emit("closeLight");
                this.et.on('closeLight', this.closeLight, this);
                break;
            case this.BTNSTATE.BTN_PITCHON: //选中
                console.log("进入游戏");
                this.joineffect.play();
                this.setSex();
                this.setMachineState(this.BTNSTATE.BTN_PLAYING);
                this.setPlayingInfo(GlobalUnit.username,GlobalUnit.userlevel);
                this.et.emit("join", this.machineIndex);
                break;
            case this.BTNSTATE.BTN_HOLD: //留机
                console.log("this.machineOwner========", this.machineOwner);
                console.log("self.GlobalUnit.uid========", GlobalUnit.uid);
                if (GlobalUnit.uid == this.machineOwner) {
                    this.setSex();
                    this.joineffect.play();
                    console.log("playing pllay1")
                    this.setMachineState(this.BTNSTATE.BTN_PLAYING);
                    console.log("playing pllay2")
                    this.setPlayingInfo(GlobalUnit.username,GlobalUnit.userlevel);
                    this.et.emit("join", this.machineIndex);
                } else {
                    this.eor_se.play();
                    this.et.emit("closeLight");
                    this.et.on('closeLight', this.closeLight, this);
                    this.et.emit("message", "该机台已锁定");
                    console.log("留机");
                }

                break;
            case this.BTNSTATE.BTN_HOLD_LOST: //留机
                console.log("this.machineOwner========", this.machineOwner);
                console.log("self.GlobalUnit.uid========", GlobalUnit.uid);
                if (GlobalUnit.uid == this.machineOwner) {
                    this.setSex();
                    this.joineffect.play();
                    this.setMachineState(this.BTNSTATE.BTN_PLAYING);
                    this.setPlayingInfo(GlobalUnit.username,GlobalUnit.userlevel);
                    this.et.emit("join", this.machineIndex);
                    // this.et.emit("rejoin", this.machineIndex);
                } else {
                    this.eor_se.play();
                    this.et.emit("closeLight");
                    this.et.on('closeLight', this.closeLight, this);
                    this.et.emit("message", "该机台已锁定");
                    console.log("留机");
                }

                break;
        }

    }

    // update (dt) {}
}
