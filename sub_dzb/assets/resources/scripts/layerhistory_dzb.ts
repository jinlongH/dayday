// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import changeMachineController_dzb  from './changeMachineController_dzb';
const {ccclass, property} = cc._decorator;
@ccclass
export default class LayoutHistory extends cc.Component {


    @property(cc.Toggle)
    card_history: cc.Toggle = null;

    @property(cc.Toggle)
    bibei_history: cc.Toggle = null;

    @property(cc.Toggle)
    awad_history: cc.Toggle = null;

    @property(cc.Toggle)
    change_machine: cc.Toggle = null;

    @property(cc.Button)
    btn_left: cc.Button = null;

    @property(cc.Button)
    btn_right: cc.Button = null;

    @property(cc.PageView)
    pageview: cc.PageView = null;

    @property(cc.PageView)
    pageview_bibei: cc.PageView = null;

    @property(cc.Label)
    label_index: cc.Label = null;

    @property(cc.Label)
    label_bibeiindex: cc.Label = null;

    @property(cc.Prefab)
    page: cc.Prefab = null;

    @property(cc.Prefab)
    scoreView: cc.Prefab = null;

    @property(cc.Label)
    label_credit: cc.Label = null;

    @property(cc.Label)
    label_bet: cc.Label = null;

    @property(cc.Label)
    label_win: cc.Label = null;

    @property(cc.Layout)
    layout_cardhistory: cc.Label = null;

    @property(cc.Layout)
    layout_bibeihistory: cc.Label = null;

    @property(cc.Layout)
    layout_awad: cc.Label = null;

    @property(cc.Layout)
    layout_change: cc.Layout = null;

    @property(cc.AudioSource)
    bianqian_se: cc.AudioSource = null;

    @property(cc.AudioSource)
    audiobtneffect: cc.AudioSource = null;

    @property(cc.AudioSource)
    fanye_se: cc.AudioSource = null;

    public et: cc.EventTarget = null;
    private pageview_controller: cc.PageView = null;
    private textInfo: Array<any> = new Array<any>();
    onLoad() {
        if (!this.et) {
            this.et = cc['NetTarget'];
        }
        this.initUi();
        this.setIndexlable(this.pageview.getCurrentPageIndex()+1)
    }
    hidAllLayout() {
        this.layout_cardhistory.node.active = false;
        this.layout_bibeihistory.node.active = false;
        this.layout_awad.node.active = false;
        this.layout_change.node.active = false;
    }
    initpukejilu(pukejilu: any) {
        // console.log("pukejilu=========", pukejilu);
        this.textInfo.splice(0,this.textInfo.length)
        // console.log("pukejilu.length==========",pukejilu.length);
        for (var i = 0; i < pukejilu.length;i++) {
            var item = cc.instantiate(this.page);
            item.getComponent('historyPageController').initFirstHistory(pukejilu[i].pai1);
            item.getComponent('historyPageController').initTwoHistory(pukejilu[i].pai2);
            item.getComponent('historyPageController').initSelect(pukejilu[i].select);
            var data = { credit: pukejilu[i].credit, bet: pukejilu[i].bet, win: pukejilu[i].win }
            console.log( pukejilu[i].win )
            this.textInfo.push(data)
            this.pageview.addPage(item);
            //  console.log("pukejilu["+i+"]==========", this.pageview.content.childrenCount);
        }
        if(this.textInfo.length>0){
            this.setlabletext(this.textInfo[0]);
        }
    }
    setlabletext(info: any) {
        this.setlabel_credit(info.credit);
        this.setlabel_win(info.win);
        this.setlabel_bet(info.bet);
    }
    bibeijilu(bibeijilu: any) {
        // console.log("bibeijilu=======", bibeijilu);
        this.pageview_bibei.content.removeAllChildren();
        for (var i = 0; i < bibeijilu.length; i++) {
            //  console.log("bibeijilu=======", bibeijilu[i]);
            var item = cc.instantiate(this.scoreView);
            item.getComponent('historybibeiScrollViewController').initBibeiHistory(bibeijilu[i]);
            this.pageview_bibei.addPage(item);
        }
    }
    chujiangjilu(chujiangjilu: any) {
        this.layout_awad.getComponent('historyChujiangjiluController').setInfo(chujiangjilu);
    }

    start() {
        console.log("LayoutHistorystartstartstartstart");

        this.setIndexlable(this.pageview.getCurrentPageIndex() + 1)
    }
    initUi() {
        this.setbtncheckedBtn("card");
        this.pageview_controller = this.pageview;
        this.hidAllLayout()
        this.layout_cardhistory.node.active = true;
    }


    setlabel_credit(creadit: number) {
        this.label_credit.string = "" + Math.floor(creadit);
    }
    setlabel_bet(creadit: number) {
        this.label_bet.string = "" + creadit;
    }
    setlabel_win(creadit: number) {
        this.label_win.string = "" + creadit;
    }

    public setHistory(history: any) {
        var self = this;
        console.log("history=======", history);
        this.initUi();
        self.initpukejilu(history.pukejilu);
        self.bibeijilu(history.bibeijilu);
        self.chujiangjilu(history.chujiang);
        this.node.active = true;
    }
    setbtncheckedBtn(index: string) {
        this.setAllbtnuncheck()
        switch (index) {
            case "card":
                this.card_history.isChecked = true;
                break;
            case "bibei":
                this.bibei_history.isChecked = true;
                break;
            case "awad":
                this.awad_history.isChecked = true;
                break;
            case "change":
                this.change_machine.isChecked = true;
                break;

        }
    }
    setAllbtnuncheck() {
        this.card_history.isChecked = false;
        this.bibei_history.isChecked = false;
        this.awad_history.isChecked = false;
        this.change_machine.isChecked = false;
    }

    btn_card_history_Click(event, customEventData) {
        console.log("event===btn_card_history_Click======", event.isChecked);
        this.bianqian_se.play()
        this.setbtncheckedBtn(customEventData)
        this.hidAllLayout();
        this.pageview_controller = this.pageview;
        this.pageview.setCurrentPageIndex(this.pageview_bibei.getCurrentPageIndex());
        this.layout_cardhistory.node.active = true;
    }
    btn_bibti_history_Click(event, customEventData) {
        this.bianqian_se.play()
        this.setbtncheckedBtn(customEventData)
        this.hidAllLayout();
        this.layout_bibeihistory.node.active = true;
        this.pageview_bibei.setCurrentPageIndex(this.pageview.getCurrentPageIndex());
        this.pageview_controller = this.pageview_bibei;
    }
    btn_awad_history_Click(event, customEventData) {
        this.bianqian_se.play()
        this.setbtncheckedBtn(customEventData)
        this.hidAllLayout();
        this.layout_awad.node.active = true;
    }
    btn_change_machine_Click(event, customEventData) {
        this.bianqian_se.play()
        this.setbtncheckedBtn(customEventData)
        this.hidAllLayout();
        if (this.layout_change)
        {
            console.log('nick---------------layoutchange')
        }
        if (this.layout_change.getComponent("changeMachineController_dzb"))
        {
            console.log("nick----------------componet")
        }
        this.layout_change.getComponent('changeMachineController_dzb').gethallInfo();
        this.layout_change.node.active = true;
    }
    btn_back_Click(event, customEventData) {
        console.log("测试");
        this.audiobtneffect.play();
        this.node.active = false;
        this.setIndexlable(1)
        this.pageview.removeAllPages();
        this.pageview_bibei.removeAllPages();
    }
    setIndexlable(index: number) {
        this.label_index.string = "" + index
    }
    setbibeiIndexlable(index: number) {
        this.label_bibeiindex.string = "" + index
    }
    btn_left_Click(event, customEventData) {
        this.fanye_se.play()
         if(this.pageview_controller.getCurrentPageIndex()==0){
            this.et.emit('message','已经是第一页了！');
        }
        this.pageview_controller.setCurrentPageIndex(this.pageview_controller.getCurrentPageIndex() - 1);
        this.setbibeiIndexlable(this.pageview_controller.getCurrentPageIndex() + 1)
        this.setIndexlable(this.pageview_controller.getCurrentPageIndex() + 1)
    }
    btn_right_Click(event, customEventData) {
        this.fanye_se.play()
        var max = this.pageview_controller.getPages().length
        if(this.pageview_controller.getCurrentPageIndex()>=max){
            this.et.emit('message','已经是最后一页了！');
        }
        // this.et 
        this.pageview_controller.setCurrentPageIndex(this.pageview_controller.getCurrentPageIndex() + 1);
        this.setIndexlable(this.pageview_controller.getCurrentPageIndex() + 1)
        this.setbibeiIndexlable(this.pageview_controller.getCurrentPageIndex() + 1)
    }
    pageViewcallback(pageView, eventType, customEventData) {
        this.setlabletext(this.textInfo[pageView.getCurrentPageIndex()])
        this.setIndexlable(pageView.getCurrentPageIndex() + 1)
    }
    pageViewbibeicallback(pageView, eventType, customEventData) {
        this.setbibeiIndexlable(pageView.getCurrentPageIndex() + 1)
    }
    // update (dt) {}
}
