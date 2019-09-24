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
export default class HstoryChujiangjiluController extends cc.Component {

    @property(cc.Label)
    label_fiveofakind: cc.Label = null;

    @property(cc.Label)
    label_royalflush: cc.Label = null;

    @property(cc.Label)
    label_strflush: cc.Label = null;

    @property(cc.Label)
    label_fourofakind: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    setInfo(history: any) {
        console.log("HstoryChujiangjiluController====",history);
        

        if (history.fiveofakind) {
            this.label_fiveofakind.string = "" + history.fiveofakind
        }

        if (history.royalflush) {
            this.label_royalflush.string = "" + history.royalflush
        }

        if (history.strflush) {
            this.label_strflush.string = "" + history.strflush
        }

        if (history.fourofakind) {
            this.label_fourofakind.string = "" + history.fourofakind
        }

    }
    start() {

    }
}
