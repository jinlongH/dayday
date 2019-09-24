
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
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label_index: cc.Label = null;

    @property(cc.Sprite)
    spr_avater: cc.Sprite = null;

    @property(cc.Toggle)
    toggle: cc.Sprite = null;

    @property(cc.Layout)
    layout_avater: cc.Layout = null;

    @property(cc.Layout)
    layout_lock: cc.Layout = null;

    @property(cc.Layout)
    layout_machine: cc.Layout = null;

    public et: cc.EventTarget = null;
    // LIFE-CYCLE CALLBACKS:
    private index: number = 0;
    @property(cc.AudioSource)
    jitai_se_1s: cc.AudioSource = null;

    private state: string = "";
    onLoad() {
        if (!this.et) {
            this.et = cc['NetTarget'];
        }
        this.initMusic();
    }
    setAvater(index: number) {
        var self = this;
        var filName = "textures/hall/popres/to" + index;
        cc.loader.loadRes(filName, cc.SpriteFrame, function (err, spriteFrame) {
            self.spr_avater.spriteFrame = spriteFrame;
        });
    }
    initMusic() {
        var self = this;
        this.jitai_se_1s.volume =GlobalUnit.effectVolume;
    }
    start() {

    }
    setIndex(index: number) {
        this.index = index
        this.label_index.string = "" + index

    }
    btn_machine_Click(event, customEventData) {
        this.jitai_se_1s.play();
        this.et.emit('setOtherToggleDefault', this.index);
        event.isChecked = true;
    }

    setState(state: string) {
        console.log("state==========", state);
        this.layout_lock.node.active = false;
        this.layout_avater.node.active = false;
        this.layout_machine.node.active = false;
        if (state == 'playing') {
            this.layout_avater.node.active = true;
        } else if (state == 'baoliujitai') {
            this.layout_lock.node.active = true;
        } else if (state == "offline") {
            this.layout_lock.node.active = true;
        } else if (state == "none") {
            console.log("显示可转机");
            this.layout_machine.node.active = true;
        }
        this.state = state;
    }
    // update (dt) {}
}
