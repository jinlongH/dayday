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
export default class HistoryPageController extends cc.Component {

    @property(cc.Layout)
    poker_1_1: cc.Layout = null;
    @property(cc.Layout)
    poker_1_2: cc.Layout = null;
    @property(cc.Layout)
    poker_1_3: cc.Layout = null;
    @property(cc.Layout)
    poker_1_4: cc.Layout = null;
    @property(cc.Layout)
    poker_1_5: cc.Layout = null;
    @property(cc.Layout)
    poker_2_1: cc.Layout = null;
    @property(cc.Layout)
    poker_2_2: cc.Layout = null;
    @property(cc.Layout)
    poker_2_3: cc.Layout = null;
    @property(cc.Layout)
    poker_2_4: cc.Layout = null;
    @property(cc.Layout)
    poker_2_5: cc.Layout = null;
    start() {

    }
    initFirstHistory(history:any){
        for(var i =0;i<history.length;i++){
            this["poker_1_"+(i+1)].getComponent('historycardController').setCard(history[i])
        }
    }
    initTwoHistory(history:any){
        for(var i =0;i<history.length;i++){
            this["poker_2_"+(i+1)].getComponent('historycardController').setCard(history[i])
        }
    }
    initSelect(selsect:any){
        for(var i =0;i<selsect.length;i++){
            this["poker_1_"+selsect[i]].getComponent('historycardController').showHold();
        }
    }
    // update (dt) {}
}
