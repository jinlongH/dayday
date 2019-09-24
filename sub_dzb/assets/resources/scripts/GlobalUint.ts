const {ccclass, property} = cc._decorator;

@ccclass
export class GlobalUnit{
    public static ip: string; //服务器的ip
    public static port: number;//服务器的端口
    public static uid: string;//用户登录的uid
    public static uid1: string;//用户登录的uid
    public static jwt: string;//用户登录的授权
    public static password: string; //用户登录的密码
    public static username: string;
    public static userlevel: string='';//军衔（未定）
    public static avatar: string;
    public static fangka: number;
    public static roomkey: string;
    public static agent_uid: number;
    public static roomtype:string;    
    public static jifen: string;
    public static sex: string;
    public static agency: any;
    public static gps: any;
    public static tmpuid: string;
    public static offlinejitai: string = null;
    public static reviewdata: any;
    public static host:string;   
    public static zuanshi: number = 0;
    public static coin:number = 0;
    public static testcoin:number = 0;
    public static isBackRoom:boolean = false;  
    public static channle:number;  
    public static huifang: boolean = false;
    public static huifangmychairid: any;
    public static huifangroomkey: any;
    public static hallKey: number = 0;
    public static roomKey:number = 0;
    public static yaoqingId:number = 0;
    public static active:number = 0;
    public static changenamecount:number = 0;
    public static reLoginRoomType:string = "";
    public static cuurentGame:string = "";
    public static baoxianxiang_types:string = "hall";
    public static gameper = {1:"0.5",2:"0.5",3:"1",4:"2",5:"5",6:"10"}
    public static isOpenAct:boolean = false;
    public static fishQuit: string = ""
    public static usercode:string = null;
    public static rank_exist:boolean = false;
    public static topdata: any
    public static fristlogin:boolean = false
    static hores_top_list = []; //赛马排名列表
    
    
    // 是否是客户端关闭的套接字
    public static closeByClient: boolean = false;

    //桌子上摆拍的距离
    public static POKER_SPACE: number = 30;
    public static POKER_SPACEDDZ: number = 47.5;
    //桌子上的牌的缩放大小
    public static POKER_SCALE: number = 0.8;
    //是否播放音乐
    public static PLAY_SOUND: boolean = true;
    //扎金花筹码的位置
    public static CHIP_WIDTH: number = 200;
    public static CHIP_HEIGHT: number = 200;
    //是否跟到底
    public static JINHUAGENDAODI: boolean = false;
    //是否开启断线重连
    public static RECONNECT: boolean = true;
    public static WEIXINOK: boolean = true;
    //茶馆的ID
    public static HALLKEY: string = "";
    //代理ID
    public static DAILIUID: string = null;
    //胡牌显示边明牌，在房间里显示的是暗牌
    public static BIAN_HU: boolean = false;
    //服务器是否要开始维护 xiaowa
    public static is_weihu: boolean = false;
    public static weihu_data: any;

    public static is_commit_location = false;
    public static in_total_line: string = "";
    public static gamebtnlist = {}
    public static sm_key: any;

    public static effectVolume:number = 1;
    public static musicVolume:number = 1;
    static hostindex: number;
    static gatehost: string;
    public static playerinfo: Array<any> = new Array<any>()
    public static playerhall:number = -1
    //static gamelistsort = {}
    public static isKicked: boolean

    //静态方法
    public static setmusicVolume(volume :number)
    {
        GlobalUnit.musicVolume = volume;
        cc.sys.localStorage.setItem("musicVolume",volume);
    }
    public static seteffectVolume(volume :number)
    {
        GlobalUnit.effectVolume = volume;
        cc.sys.localStorage.setItem("effectVolume",volume);
    }
    public static getmusicVolume()
    {
        var volume = cc.sys.localStorage.getItem("musicVolume");
        GlobalUnit.musicVolume = volume == null ? 1 : Number(volume);
    }
    public static geteffectVolume()
    { 
        var volume =cc.sys.localStorage.getItem("effectVolume");
        GlobalUnit.effectVolume = volume == null ? 1 : Number(volume);
    }
}
