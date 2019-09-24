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
export default class holdmachine extends cc.Component {

    @property(cc.Toggle)
    toggle_2: cc.Toggle = null;
    @property(cc.Toggle)
    toggle_4: cc.Toggle = null;
    @property(cc.Toggle)
    toggle_6: cc.Toggle = null;
    @property(cc.Toggle)
    toggle_8: cc.Toggle = null;
    @property(cc.Toggle)
    toggle_10: cc.Toggle = null;
    @property(cc.Toggle)
    toggle_12: cc.Toggle = null;
    private holdTime = 0;
    public et: cc.EventTarget = null;
    onLoad() {
        this.setAllCheckFalse();
         if (!this.et) {
            this.et = cc['NetTarget'];
        }
        console.log("留机初始化 dzb ")
    }
    // LIFE-CYCLE CALLBACKS:
    setbtncheckedBtn(index: string) {
        this.setAllCheckFalse()
        switch (index) {
            case "2":
                this.toggle_2.isChecked = true;
                break;
            case "4":
                this.toggle_4.isChecked = true;
                break;
            case "6":
                this.toggle_6.isChecked = true;
                break;
            case "8":
                this.toggle_8.isChecked = true;
                break;
            case "10":
                this.toggle_10.isChecked = true;
                break;
            case "12":
                this.toggle_12.isChecked = true;
                break;

        }
    }
    btn_back_Click(event, customEventData) {
        this.node.active = false
    }

     btn_back_hold(event, customEventData) {
        console.log("this.holdTime =========", this.holdTime);
        if(this.holdTime==0){
            return;
        }
       this.et.emit("holdmachine", this.holdTime);
    }
    setAllCheckFalse() {
        this.toggle_2.isChecked = false;
        this.toggle_4.isChecked = false;
        this.toggle_6.isChecked = false;
        this.toggle_8.isChecked = false;
        this.toggle_10.isChecked = false;
        this.toggle_12.isChecked = false;
    }
    btn_toggle_Click(event, customEventData) {
        this.holdTime = customEventData;
        this.setbtncheckedBtn(customEventData);
    }
    start() {

    }

    // update (dt) {}
}
