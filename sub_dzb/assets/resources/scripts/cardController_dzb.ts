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
export default class CardController extends cc.Component {

    @property(cc.Sprite)
    card: cc.Sprite = null;

    @property(cc.Sprite)
    card_bg: cc.Sprite = null;

    @property(cc.SpriteAtlas)
    card_atlas: cc.SpriteAtlas = null;


    @property(cc.AudioSource)
    open_1: cc.AudioSource = null;

    @property(cc.AudioSource)
    open_2: cc.AudioSource = null;

    @property(cc.AudioSource)
    open_3: cc.AudioSource = null;

    @property(cc.AudioSource)
    open_4: cc.AudioSource = null;

    @property(cc.AudioSource)
    open_5: cc.AudioSource = null;

    @property(cc.AudioSource)
    hold_se: cc.AudioSource = null;

    @property
    index: number = 0;

    public et: cc.EventTarget = null;

    public isopen: boolean = false;

    public hold: boolean = false;
    initmusic() {
        var self = this;
        if (this.open_1) {
            this.open_1.volume = GlobalUnit.effectVolume || 1;
            this.open_2.volume = GlobalUnit.effectVolume || 1;
            this.open_3.volume = GlobalUnit.effectVolume || 1;
            this.open_4.volume = GlobalUnit.effectVolume || 1;
            this.open_5.volume = GlobalUnit.effectVolume || 1;
            this.hold_se.volume = GlobalUnit.effectVolume || 1;
        }

    }
    onLoad() {
        this.initmusic();
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchScene, this);
        if (!this.et) {
            this.et = cc['NetTarget'];
        }
    }
    touchScene(event) {
        console.log("点击牌");
        if (this.hold_se) {
            this.hold_se.play();
        }
        this.et.emit("hold", this.index);
    }
    start() {
    }
    setCardDefault(gameOver: boolean) {

        if (this.hold && !gameOver) {
            return;
        }
        this.hold = false;
        this.isopen = false;
        this.card_bg.node.active = true;
    }
    private RandomNumBoth(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.round(Rand * Range); //四舍五入
        return num;
    }
    sethold(hold: boolean) {
        this.hold = hold;
    }
    gethold(hold: boolean) {
        return this.hold;
    }

    setWithOutAnimCard(card: number) {
        if (card > 0 && card < 100) {
            var frame = this.card_atlas.getSpriteFrame('guipai_' + card);
            this.card.getComponent(cc.Sprite).spriteFrame = frame
        } else {
            var color = parseInt("" + card / 100);
            var point = card % 100;
            var pframe = null;
            switch (color) {
                case 1://方片
                    pframe = this.card_atlas.getSpriteFrame('squarepiece' + point);
                    break;
                case 2://梅花
                    pframe = this.card_atlas.getSpriteFrame('plumblossom' + point);
                    break;
                case 3://红桃
                    pframe = this.card_atlas.getSpriteFrame('redheart' + point);
                    break;
                case 4://黑桃
                    pframe = this.card_atlas.getSpriteFrame('spades' + point);
                    break;
            }
            this.card.getComponent(cc.Sprite).spriteFrame = pframe
        }
        this.card_bg.node.active = false;
    }
    setCard(card: number) {
        if (card > 0 && card < 100) {
            var frame = this.card_atlas.getSpriteFrame('guipai_' + card);
            this.card.getComponent(cc.Sprite).spriteFrame = frame
        } else {
            var color = parseInt("" + card / 100);
            var point = card % 100;
            var pframe = null;
            var frameName = "";
            switch (color) {
                case 1://方片
                      frameName ='squarepiece' + point;
                    break;
                case 2://梅花
                     frameName ='plumblossom' + point;
                  
                    break;
                case 3://红桃
                    frameName ='redheart' + point;
                   
                    break;
                case 4://黑桃
                     frameName ='spades' + point;
                    break;
            }
            console.log("frameName frameName : ",frameName);
            pframe = this.card_atlas.getSpriteFrame(frameName);
            this.card.getComponent(cc.Sprite).spriteFrame = pframe
        }
    }
    playOpenBetCard(funCall: any) {
        if (this.isopen) {
            this.openOver();
            return;
        }
        this.isopen = true;
        var anim = this.node.getComponent(cc.Animation);
        anim.once('finished', function () {
            funCall();
        }, this);
        anim.play('card_game');
    }

    playOpenCard() {
        if (this.isopen) {
            this.openOver();
            return;
        }
        this['open_' + this.index].play();
        this.isopen = true;
        var anim = this.node.getComponent(cc.Animation);
        anim.once('finished', this.openOver, this);
        anim.play('card_game');
    }
    openOver() {
        var anim = this.node.getComponent(cc.Animation);
        if (!this.et) {
            this.et = cc['NetTarget'];
        }
        this.et.emit("openOver");
    }
    // update (dt) {
    // }
}
