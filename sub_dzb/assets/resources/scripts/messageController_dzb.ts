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
    label_message: cc.Label = null;

    @property(cc.Layout)
    layout_message: cc.Label = null;
    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START,this.touchScene,this);

    }
    touchScene(event){
        
    }
    start () {


    }
    public setMessage(message:string){
        var self = this;
        this.node.active = true;
        this.label_message.string = message;
        var de = cc.delayTime(0.8);
        var fadeOut = cc.fadeOut(0.5);
        var call =cc.callFunc(function(){
            self.node.active = false;
            self.layout_message.node.opacity = 255;
        });
        var seq = cc.sequence(de,fadeOut,call);
        this.layout_message.node.runAction(seq);

    }
    public setMessageOnTime(message:string,timer:number){
        var self = this;
        this.node.active = true;
        this.label_message.string = message;
        var de = cc.delayTime(timer);
        var fadeOut = cc.fadeOut(0.5);
        var call =cc.callFunc(function(){
            self.node.active = false;
            self.layout_message.node.opacity = 255;
        });
        var seq = cc.sequence(de,fadeOut,call);
        this.layout_message.node.runAction(seq);

    }

    // update (dt) {}
}
