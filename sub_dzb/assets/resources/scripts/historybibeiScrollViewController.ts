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

    // LIFE-CYCLE CALLBACKS:
    @property(cc.Label)
    label_none: cc.Label = null;
    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    @property(cc.Prefab)
    item: cc.Prefab = null;

    onLoad() { }

    public initBibeiHistory(history: any) {
        if (history.length == 0 || history.length == undefined) {
            this.label_none.node.active = true;
        } else {
            this.label_none.node.active = false;
        }
        for (var i = 0; i < history.length; i++) {
            var item = cc.instantiate(this.item);
            item.getComponent('historyBibeiItemController').setInfo(history[i])
            this.scrollView.content.addChild(item);
        }
    }

    start() {

    }

    // update (dt) {}
}
