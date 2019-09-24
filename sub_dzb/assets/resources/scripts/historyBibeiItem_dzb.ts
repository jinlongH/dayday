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

    @property(cc.Label)
    label_bet_win: cc.Label = null;

    @property(cc.Label)
    label_point_win: cc.Label = null;

    @property(cc.Label)
    label_bet_lose: cc.Label = null;

    @property(cc.Label)
    label_point_lose: cc.Label = null;

    @property(cc.Sprite)
    spr_shuangbibei: cc.Sprite = null;

    @property(cc.Sprite)
    spr_banbibei: cc.Sprite = null;

    @property(cc.Sprite)
    spr_bibei: cc.Sprite = null;

    @property(cc.Sprite)
    spr_big: cc.Sprite = null;

    @property(cc.Sprite)
    spr_small: cc.Sprite = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }
    public setInfo(history: any) {
        console.log("history=====setInfo====", history);
        this.hidAll();
        if (history.caidaxiao == "small") {
            this.spr_small.node.active = true;
        } else if (history.caidaxiao == "big") {
            this.spr_big.node.active = true;
        }

        if (history.win) {//赢
            this.setlabel_bet_win(history.bibeiyazhu)
            this.setlabel_point_win(this.getPoint(history.kaipai))
        } else {
            this.setlabel_bet_lose(history.bibeiyazhu)
            this.setlabel_point_lose(this.getPoint(history.kaipai))
        }
        if (history.bibei) {
            var name = "spr_" + history.bibei
            console.log("name====", name);
            this[name].node.active = true;
        }
    }
    getPoint(card: number) {
        if (card > 0 && card < 100) {
            return 0;
        } else {
            var point = card % 100;
            return point;
        }
    }
    setlabel_bet_win(score: number) {
        this.label_bet_win.node.active = true;
        this.label_bet_win.string = "" + score;
    }
    setlabel_bet_lose(score: number) {
        this.label_bet_lose.node.active = true;
        this.label_bet_lose.string = "" + score;
    }

    setlabel_point_win(score: number) {
        this.label_point_win.node.active = true;
        this.label_point_win.string = "" + score;
    }
    setlabel_point_lose(score: number) {
        this.label_point_lose.node.active = true;
        this.label_point_lose.string = "" + score;
    }

    hidAll() {
        this.spr_banbibei.node.active = false;
        this.spr_bibei.node.active = false;
        this.spr_big.node.active = false;
        this.spr_small.node.active = false;
        this.spr_shuangbibei.node.active = false;
        this.label_bet_win.node.active = false;
        this.label_point_win.node.active = false;
        this.label_bet_lose.node.active = false;
        this.label_point_lose.node.active = false;
    }

    // update (dt) {}
}
