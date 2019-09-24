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

    @property(cc.Layout)
    poker_1: cc.Layout = null;
    @property(cc.Layout)
    poker_2: cc.Layout = null;
    @property(cc.Layout)
    poker_3: cc.Layout = null;
    @property(cc.Layout)
    poker_4: cc.Layout = null;
    @property(cc.Layout)
    poker_5: cc.Layout = null;

    private animcount = 0;
    // onLoad () {}

    private playNode: cc.Layout = null
    setAllCardDefault() {
        for (var i = 0; i < 5; i++) {
            this['poker_' + (i + 1)].node.getChildByName('card_bg').active = true;
        }
    }
    start() {


    }
    playAction(node: cc.Layout) {
        var anim = node.getComponent(cc.Animation);
        anim.play('card');
    }

    update(dt) {
       
        if (this.animcount == 0) {
            this.playAction(this.poker_1);
        }
        this.animcount++;
        if (this.animcount == 15) {
            this.playAction(this.poker_2);
        }

        if (this.animcount == 30) {
            this.playAction(this.poker_3);
        }
        if (this.animcount == 45) {
            this.playAction(this.poker_4);
        }
        if (this.animcount == 60) {
            this.playAction(this.poker_5);
        }
        if (this.animcount == 75) {
            this.setAllCardDefault();

        }
        if (this.animcount == 90) {
            this.animcount = 0;

        }



    }
}
