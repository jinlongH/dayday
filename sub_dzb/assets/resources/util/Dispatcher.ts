const {ccclass, property} = cc._decorator;
@ccclass
export class Dispatcher {
    private target: cc.EventTarget = null;
    private static instance: any = null;
    private constructor() {
        this.target = new cc.EventTarget();
    }
    public getEventTarget() {
        return this.target;
    }
    public static getInstance(): Dispatcher {
        if (Dispatcher.instance == null) {
            Dispatcher.instance = new Dispatcher();
        }

        return Dispatcher.instance
    }

    public static send2web(webview:cc.WebView,data, src) {
        var a = JSON.stringify(data)
        a=JSON.parse(a);
        a['src'] = src;
        webview.evaluateJS('Center.addMsg(' + JSON.stringify(a)+')');
    }

}
const {WebView} = cc;
interface Window {
    jsback(data);
}

window.jsback = function (data) {
    data['src'] = 'web';
    Dispatcher.getInstance().getEventTarget().emit("jsback", data);
}

interface WebView{
    send2web(data);
}
WebView.prototype.send2web = function(data) {
    data['src']='cocos'
    cc.log('Center.send2web('+JSON.stringify(data)+')');
    this.evaluateJS('Center.send2web('+JSON.stringify(data)+')');
}
