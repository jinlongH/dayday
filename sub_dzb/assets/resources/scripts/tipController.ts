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

    @property(cc.RichText)
    label_message1: cc.RichText = null;

    @property(cc.Layout)
    layout_loading: cc.Layout = null;

    @property(cc.Button)
    enter: cc.Button = null;

    private callBack: any = null;

    private callBack1: any = null;

    onLoad() {
        this.node.active = false;
    }
    setMessage(message: string) {
        this.label_message.string = message;
        console.log("message==========", message);
        this.node.active = true;
        if (this.layout_loading) {
            this.layout_loading.node.active = false;
        }
    }
    setCallBack(call: any) {
        this.callBack = call
    }
    setBackCallBack(call: any) {
        this.callBack1 = call
    }
    
    start() {

    }
    hidEnterButton(){
       this.enter.node.active = false;
    }
    on_btn_back_click(event, customEventData) {
        this.node.active = false;
        if (this.callBack1) {
            this.callBack1();
        }
    }
    on_btn_enter_click(event, customEventData) {
        if (this.callBack) {
            this.callBack();
        }
        this.node.active = false;
    }
    setMessage1(message: string) {
        this.label_message1.string ="<color=#00ff00>        </c><color=#ffffff>"+message+"</color>";
        console.log("message==========", message);
        this.node.active = true;
        if (this.layout_loading) {
            this.layout_loading.node.active = false;
        }
    }
    
    // update (dt) {}
}
