
// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const { ccclass, property } = cc._decorator;
import { GlobalUnit } from './GlobalUint';
@ccclass
export default class GonggaoController extends cc.Component {

    @property(cc.RichText)
    label_gonggao: cc.RichText = null;

    @property(cc.Sprite)
    laba: cc.Sprite = null;

    @property(cc.SpriteFrame)
    allfruitsprite: cc.SpriteFrame = null;

    @property(cc.Layout)
    mx97gonggao: cc.Layout = null;
    gonggaoBg = null;
    // if (info.t == 'mx99') {
    allnames2 = {
        all_9_7: { size: 0.5, image: "textures/title/nine", name: "9条七", bet: 200 },
        all_8_7: { size: 0.5, image: "textures/title/nine", name: "8条七", bet: 100 },
        all_7_7: { size: 0.5, image: "textures/title/nine", name: "7条七", bet: 80 },
        all_6_7: { size: 0.5, image: "textures/title/nine", name: "6条七", bet: 60 },
        all_5_7: { size: 0.5, image: "textures/title/nine", name: "5条七", bet: 40 },
        all_4_7: { size: 0.5, image: "textures/title/nine", name: "4条七", bet: 20 },
        all_3_7: { size: 0.5, image: "textures/title/nine", name: "3条七", bet: 5 },
        all_2_7: { size: 0.5, image: "textures/title/nine", name: "2条七", bet: 2 },
        allfruit: { size: 0.3, image: "textures/title/Game.all_fruits", name: "全盘水果", bet: 15 },
        allbluebar: { size: 0.3, image: "textures/title/bar_blue", name: "全盘蓝bar", bet: 100 },
        allredbar: { size: 0.3, image: "textures/title/bar_red", name: "全盘红bar", bet: 90 },
        allcherry: { size: 0.3, image: "textures/title/lichi", name: "全盘荔枝", bet: 80 },
        allyellowbar: { size: 0.3, image: "textures/title/bar_yellow", name: "全盘黄bar", bet: 60 },
        allwatermelon: { size: 0.3, image: "textures/title/watermelon", name: "全盘西瓜", bet: 60 },
        allbell: { size: 0.3, image: "textures/title/jingle_bell", name: "全盘铃", bet: 40 },
        allmango: { size: 0.3, image: "textures/title/grape", name: "全盘葡萄", bet: 40 },
        allorange: { size: 0.3, image: "textures/title/orange", name: "全盘橙子", bet: 40 },
        allanybar: { size: 0.6, image: "textures/title/any_bar", name: "全盘bar", bet: 40 },
    }
    // }else{
    allnames = {
        all_9_7: { size: 0.25, image: "textures/title/seven", name: "9条七", bet: 200 },
        all_8_7: { size: 0.25, image: "textures/title/seven", name: "8条七", bet: 100 },
        all_7_7: { size: 0.25, image: "textures/title/seven", name: "7条七", bet: 80 },
        all_6_7: { size: 0.25, image: "textures/title/seven", name: "6条七", bet: 60 },
        all_5_7: { size: 0.25, image: "textures/title/seven", name: "5条七", bet: 40 },
        all_4_7: { size: 0.25, image: "textures/title/seven", name: "4条七", bet: 20 },
        all_3_7: { size: 0.25, image: "textures/title/seven", name: "3条七", bet: 5 },
        all_2_7: { size: 0.25, image: "textures/title/seven", name: "2条七", bet: 2 },
        allfruit: { size: 0.3, image: "textures/title/Game.all_fruits", name: "全盘水果", bet: 15 },
        allbluebar: { size: 0.3, image: "textures/title/bar_blue", name: "全盘蓝bar", bet: 100 },
        allredbar: { size: 0.3, image: "textures/title/bar_red", name: "全盘红bar", bet: 90 },
        allcherry: { size: 0.3, image: "textures/title/lichi", name: "全盘荔枝", bet: 80 },
        allyellowbar: { size: 0.3, image: "textures/title/bar_yellow", name: "全盘黄bar", bet: 60 },
        allwatermelon: { size: 0.3, image: "textures/title/watermelon", name: "全盘西瓜", bet: 60 },
        allbell: { size: 0.3, image: "textures/title/jingle_bell", name: "全盘铃", bet: 40 },
        allmango: { size: 0.3, image: "textures/title/grape", name: "全盘葡萄", bet: 40 },
        allorange: { size: 0.3, image: "textures/title/orange", name: "全盘橙子", bet: 40 },
        allanybar: { size: 0.6, image: "textures/title/any_bar", name: "全盘bar", bet: 40 },
    }

    // duanwei = {
    //     engineer: { duanweiname: '士兵', sprFrame: 'person/textures/title/title_1', level: 0, num: 1 },
    //     platoon_leader: { duanweiname: '排长', sprFrame: 'person/textures/title/title_2', level: 200000, num: 2 },
    //     company_commander: { duanweiname: '连长', sprFrame: 'person/textures/title/title_3', level: 1000000, num: 3 },
    //     deputy_battalion_commander: { duanweiname: '副营长', sprFrame: 'person/textures/title/title_4', level: 5000000, num: 4 },
    //     battalion_commander: { duanweiname: '营长', sprFrame: 'person/textures/title/title_5', level: 10000000, num: 5 },
    //     deputy_regimental_commander: { duanweiname: '副团长', sprFrame: 'person/textures/title/title_6', level: 25000000, num: 6 },
    //     regimental_commander: { duanweiname: '团长', sprFrame: 'person/textures/title/title_7', level: 50000000, num: 7 },
    //     deputy_brigade_commander: { duanweiname: '副旅长', sprFrame: 'person/textures/title/title_8', level: 100000000, num: 8 },
    //     brigade_commander: { duanweiname: '旅长', sprFrame: 'person/textures/title/title_9', level: 250000000, num: 9 },
    //     division_commander: { duanweiname: '师长', sprFrame: 'person/textures/title/title_10', level: 500000000, num: 10 },
    //     corps_commander: { duanweiname: '军长', sprFrame: 'person/textures/title/title_11', level: 1250000000, num: 11 },
    //     military_commander: { duanweiname: '司令', sprFrame: 'person/textures/title/title_12', level: 2500000000, num: 12 }
    // }
    // }

    private isPlaying: boolean = false;
    private startPlay: boolean = false;

    private msgqueue: Array<any> = new Array<any>();
    public setGonggao_cmd(cmd: any) {//此处根据服务器数据来解析保存公告 
        console.log("cole---gonggaoController----setGonggao_cmd---cmd  ", cmd);
        if (cmd.data.name == "dajiang") {

            var arrChannelName = ['体验场', '初级场', '中级场', '高级场', '贵宾场'];
            var award = { fivebars: '五鬼', fiveofakind: '五梅', royalflush: "同花大顺", strflush: "同花小顺", fourofakind: "四梅", fourofakind_J_A: '大四梅', fourofakind_2_10: '小四梅',fourofakind_J_A_2: '正宗大四梅X2倍',fourofakind_J_A_4: '正宗大四梅X4倍', fourofakind_J_A_: '正宗大四梅',fish_bossDorgan:"狂暴火龙",fish_bossLantern:"暗夜炬兽",fish_bossHead:"深海八爪鱼",fish_goldShark:"霸王鲸",fish_hairyCrabs:"霸王蟹",fish_toad_greenBoom:"局部炸弹",fish_toad_boom:"超级炸弹",fish_toad_toad:"金蟾",fish_toad_loong:"金龙"}
            console.log("cmd.data.content.hallkey=====", cmd.data.content.hallkey);
            var awardDes = award[cmd.data.content.style];
            var gameType = cmd.data.content.t;
            console.log("self.GlobalUnit.gamebtnlist[gameType]-------", GlobalUnit.gamebtnlist[gameType]);
            ////测试零时去掉
            if (!GlobalUnit.gamebtnlist[gameType] || GlobalUnit.gamebtnlist[gameType] < 1) {
                return
            }
            //  取消体验场大奖榜公告 ---cole
            if (cmd.data.content.hallkey == 1) {
                return
            }
            var gameName = "";
            if (gameType == "dzb") {
                if (GlobalUnit.gamebtnlist['dzb'] < 1) {
                    return;
                }
                gameName = "大字板";
            }
            if (gameType == "dbs") {
                if (GlobalUnit.gamebtnlist['dbs'] < 1) {
                    return;
                }
                gameName = "大白鲨";
            } if (gameType == "NBA") {
                if (GlobalUnit.gamebtnlist['NBA'] < 1) {
                    return;
                }
                gameName = "NBA";
                if (cmd.data.content.chun_4k_bei) {
                    var count = cmd.data.content.exp_count;
                    awardDes = awardDes + "X" + cmd.data.content.chun_4k_bei + "倍";
                }
            } else if (gameType == "hfh") {
                if (GlobalUnit.gamebtnlist['hfh'] < 1) {
                    return;
                }
                gameName = "火凤凰";
                if (cmd.data.content.style == 'fourofakind_2_10' && cmd.data.content.count) {
                    var count = cmd.data.content.count;
                    // var Chinesenumber = ['一','二','三','四','五','六','七','八','九','十','十一','十二','十三','十四','十五','十六','十七','十八'];
                    awardDes = "第" + count + "个连庄" + awardDes;
                } else if (cmd.data.content.style == 'fourofakind_J_A_' && cmd.data.content.exp_count) {
                    var count = cmd.data.content.exp_count;
                    awardDes = awardDes + "X" + count + "倍";
                }
            }
            else if (gameType == "sm") {
                if (GlobalUnit.gamebtnlist['sm'] < 1) {
                    return;
                }
                gameName = "黄金赛马"
                arrChannelName = ['体验场', '跑马场', '全民场', '高级场', '贵宾场'];
                awardDes = "";
            }
            else if (gameType == 'mx97') {
                if (GlobalUnit.gamebtnlist['mx97'] < 1) {
                    return;
                }
                console.log("cole ------minxxing97");
                var context = cmd.data
                console.log("cole ------- minxig97", data);

                gameName = "明星97"
                arrChannelName = ['体验场', '初级场', '中级场', '高级场', '贵宾场'];
                // awardDes = this.allnames[cmd.data.content.style].name;
                awardDes = "";
                console.log("cole ------------111--------cmd.data.allnames", cmd.data.allnames);
            }
            else if (gameType == 'mx99') {
                if (GlobalUnit.gamebtnlist['mx99'] < 1) {
                    return;
                }
                console.log("cole ------minxxing99");
                var context = cmd.data
                console.log("cole ------- minxig99", data);

                gameName = "明星99"
                arrChannelName = ['体验场', '初级场', '中级场', '高级场', '贵宾场'];
                awardDes = "";
                console.log("cole ------------111--------cmd.data.allnames", cmd.data.allnames);
            } else if (gameType == 'hw') {
                console.log("cole---gonggaoController----setGonggao_cmd---cmd 11")
                gameName = "海王"
            }else if (gameType == 'jc') {
                console.log("cole---gonggaoController----setGonggao_cmd---cmd 11")
                gameName = "金蟾捕鱼"
            }


            var sys1 = 0;
            var sys2 = 0;
            if (cmd.data.content.system_1_value) {
                sys1 = cmd.data.content.system_1_value
            }
            if (cmd.data.content.system_2_value) {
                sys2 = cmd.data.content.system_2_value
            }
            var data = { userName: cmd.data.content.name, gameName: gameName, channelName: arrChannelName[cmd.data.content.hallkey - 1], machineNum: cmd.data.content.roomkey, awardName: awardDes, score: cmd.data.content.score, bet_index: cmd.data.content.bet_index, t: cmd.data.content.t, style: cmd.data.content.style, sysscore: sys1 + sys2 }
            var userName = cmd.data.content.name;
            if (userName == GlobalUnit.username && gameType == "sm") {
                var self = this
                this.scheduleOnce(function () {
                    this.setGonggao(data);
                }, 31)
            }
            else {
                this.setGonggao(data);
            }

        } else if (cmd.data.name == "-weihu") {
            var arrChannelName = ['体验场', '初级场', '中级场', '高级场', '贵宾场'];
            var award = { fivebars: '五鬼', fiveofakind: '五梅', royalflush: "同花大顺", strflush: "同花小顺", fourofakind: "四梅", fourofakind_J_A: '大四梅', fourofakind_2_10: '小四梅', fourofakind_J_A_2: '正宗大四梅X2倍', fourofakind_J_A_4: '正宗大四梅X4倍', fourofakind_J_A_: '正宗大四梅', fish_bossDorgan: "狂暴火龙", fish_bossLantern: "暗夜炬兽", fish_bossHead: "深海八爪鱼", fish_goldShark: "霸王鲸", fish_hairyCrabs: "霸王蟹" };
            console.log("cmd.data.content.hallkey=====", cmd.data.content.hallkey);
            var weihudata = { userName: cmd.data.content.name, gameName: "大字板", channelName: arrChannelName[cmd.data.content.hallkey - 1], machineNum: cmd.data.content.roomkey, awardName: award[cmd.data.content.style], score: cmd.data.content.score, t: cmd.data.content.t }
            GlobalUnit.is_weihu = true;
            GlobalUnit.weihu_data = weihudata;
            this.setGonggao_weihu(weihudata);
        }
        else if (cmd.data.name == "systemnotice") {
            console.log("cmd.data", cmd.data);
            this.setGonggao_system(cmd.data)
        } else if (cmd.data.name == "topplayernotice") {
            
            var self = this
            var filName = "prefabs/gonggao_loginBg";
            // cc.loader.loadRes(filName, function (err, prefab) {
            //     if (err) {
            //         cc.log('载入预制资源失败, 原因:' + err);
            //         return;
            //     }
            //     if(self.gonggaoBg==null ){
            //     var gonggaoBg = cc.instantiate(prefab);

            //     gonggaoBg.setPosition(cc.v2(0, 0));


            //     self.mx97gonggao.node.parent.addChild(gonggaoBg);
            //     gonggaoBg.setSiblingIndex(1);
            //     gonggaoBg.active = false
            //     self.gonggaoBg = gonggaoBg
            // }
            //     if (GlobalUnit.rank_exist) {
            //         // var rank = { 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六', 7: '七', 8: '八', 9: '九', 10: '十' }
    
            //         // var logingonggaodata = { name: cmd.data.name, userName: cmd.data.playername, level: self.duanwei[cmd.data.playerrank].sprFrame, top: rank[cmd.data.grade] }
                    
            //         // self.schedule(function(){self.setGonggao_login(logingonggaodata)},0.5,2,0.5)
                    
                
            //     }
            // })
            
        }
    }

    setmx97gonggaoinfo(gonggaoData: any) {
        console.log("cole ---------gonggaoData", gonggaoData);
        var text1 = "号机开出";
        this.mx97gonggao.node.active = true;
        this.isPlaying = true;
        var nametext = this.mx97gonggao.node.getChildByName("nametext").getComponent(cc.RichText)
        var stylestr = this.mx97gonggao.node.getChildByName("stylestr").getComponent(cc.Label)
        var image = this.mx97gonggao.node.getChildByName("allimge").getComponent(cc.Sprite)
        var scoretext = this.mx97gonggao.node.getChildByName("scoretext").getComponent(cc.RichText)
        nametext.string = "<color=#ffffff>恭喜玩家 </c><color=#00ff00>"
            + gonggaoData.userName
            + "</c>"
            + "<color=#ffffff> 在 "
            + gonggaoData.gameName + " "
            + gonggaoData.channelName + " "
            + gonggaoData.machineNum + " "
            + text1
        console.log("nametext.string", nametext.string);
        var type = gonggaoData.style

        if (gonggaoData.t == "mx97") {
            var alltype = this.allnames[gonggaoData.style]
        } else {
            var alltype = this.allnames2[gonggaoData.style]
        }

        var num = ""
        var isseven = type.indexOf("_")
        if (isseven) {
            var strs = type.split("_")
            if (strs && strs.length == 3) {
                num = strs[1]
            }
        }
        stylestr.string = "A" + num;
        var filepath = alltype.image
        if (type == "allfruit") {
            image.spriteFrame = this.allfruitsprite;
            image.node.color = cc.color(0, 255, 0, 255);
            image.node.scale = alltype.size
            image.node.setPosition(cc.v2(100, 0))
            stylestr.node.active = false
        }
        else {
            cc.loader.loadRes(filepath, cc.SpriteFrame, function (err, spriteFrame) {
                image.spriteFrame = spriteFrame;
                image.node.scale = alltype.size
            });
        }
        if (gonggaoData.sysscore > 0) {
            scoretext.string = "<color=#ffffff>获得"
                + " </c>"
                + "<color=#ffff00>"
                + gonggaoData.score
                + "</c>"
                + "分,系统额外奖励"
                + " </c>"
                + "<color=#ffff00>"
                + gonggaoData.sysscore
                + "</c>"
                + "分!"
        } else {
            scoretext.string = "<color=#ffffff>获得"
                + " </c>"
                + "<color=#ffff00>"
                + gonggaoData.score
                + "</c>"
                + "分!"
        }
        stylestr.node.x = nametext.node.x + nametext.node.getContentSize().width + 10
        image.node.x = stylestr.node.x + stylestr.node.getContentSize().width + 10
        scoretext.node.x = image.node.x + 100
        this.mx97gonggao.node.width = scoretext.node.x + scoretext.node.getContentSize().width
        this.scheduleOnce(this.mx97gonggaoani.bind(this), 1);
    }


    setlogingonggaoinfo(gonggaoData: any) {
        console.log("cole ---------gonggaoData", gonggaoData)
            

        this.mx97gonggao.node.active = true;
        this.isPlaying = true;
        var nametext = this.mx97gonggao.node.getChildByName("nametext").getComponent(cc.RichText)
        this.mx97gonggao.node.getChildByName("stylestr").active = false
        var image = this.mx97gonggao.node.getChildByName("allimge").getComponent(cc.Sprite)
        var scoretext = this.mx97gonggao.node.getChildByName("scoretext").getComponent(cc.RichText)
        nametext.string = "<color=#ffffff>热烈欢迎称霸风云榜<color=#FFD600>第" + gonggaoData.top + "名</c>的</c>"


        var filepath = gonggaoData.level
        cc.loader.loadRes(filepath, cc.SpriteFrame, function (err, spriteFrame) {
            image.spriteFrame = spriteFrame;
            image.node.setScale(0.5, 0.5)
        });

        scoretext.string = "<color=#ff0000>" + gonggaoData.userName + "</c><color=#ffffff>上线</c>"


        image.node.x = nametext.node.x + nametext.node.getContentSize().width + 10

        scoretext.node.x = image.node.x + 65
    
        this.mx97gonggao.node.width = scoretext.node.x + scoretext.node.getContentSize().width
        this.gonggaoBg.active = true
       
        this.scheduleOnce(this.mx97gonggaoani.bind(this), 1);
    }


    mx97gonggaoani() {
        var self = this
        this.node.opacity = 255;
        var movegonggao = function () {
            self.mx97gonggao.node.x--;
            var endX = -self.node.getContentSize().width / 2 - self.mx97gonggao.node.getContentSize().width;
            if (self.mx97gonggao.node.x <= endX) {
                self.unschedule(movegonggao)
                self.setGongGaoEnable(false);
                this.mx97gonggao.node.getChildByName("stylestr").active = true
                self.gonggaoBg.active = false
                self.mx97gonggao.node.x = self.mx97gonggao.node.parent.position.x + self.mx97gonggao.node.parent.getContentSize().width / 2
            }
        }
        this.schedule(movegonggao, 0.01)
    }

    public setGonggao(gonggaoData: any) {
        var self = this;
        if (GlobalUnit.is_weihu) {
            if (this.isPlaying == false) {//如果公告没有在播放
                this.label_gonggao.string = "<color=#ffffff>通知：</c><color=#ff0000>"
                    + gonggaoData.userName
                    + "</c>"
                this.setGongGaoEnable(true);

            }
            else {
                this.msgqueue.unshift(gonggaoData)
            }
            return
        } else if (gonggaoData.name == 'systemnotice') {
            if (this.isPlaying == false) {
                this.label_gonggao.string = "<color=#ffffff>通知：</c><color=#ff0000>"
                    + gonggaoData.content
                    + "</c>"
                this.setGongGaoEnable(true);
            }
            else {
                this.msgqueue.unshift(gonggaoData)
            }
            return
        } else if (gonggaoData.name == 'topplayernotice') {
            if (this.isPlaying == false) {
                this.setlogingonggaoinfo(gonggaoData)
            }
            else {
                this.msgqueue.unshift(gonggaoData)
            }
            return
        }

        if (this.isPlaying == false) {//如果公告没有在播放
            var text1 = "号机开出";
            if (gonggaoData.t == "sm") {
                text1 = "号机"
            }
            if (gonggaoData.t == "hw") {
                text1 = "号机捕获"
            }
            if(gonggaoData.t == "jc"){
                text1 = "号机捕获"
                
                switch(gonggaoData.channelName){
                    case "初级场":
                        gonggaoData.score = ""+Number(gonggaoData.score)*100
                    break;
                    case "中级场":
                        gonggaoData.score = ""+Number(gonggaoData.score)*10
                    break;
                    case "高级场":
                        gonggaoData.score = ""+Number(gonggaoData.score)*5
                    break;
                }
            }

            if (gonggaoData.t == "mx99" || gonggaoData.t == "mx97") {
                console.log("cole --------gonggaoData.t ", gonggaoData.t);
                this.setmx97gonggaoinfo(gonggaoData)
                return
            }
            var bet_level_str: string = "";
            switch (gonggaoData.bet_index) {
                case 1:
                    bet_level_str = "（高倍）";
                    break;
                case 2:
                    bet_level_str = "（中倍）";
                    break;
                case 3:
                    bet_level_str = "（低倍）";
                    break;
                default:
                    break;
            }
            console.log("gonggaoData.bet_index", gonggaoData.bet_index);

            this.label_gonggao.string = "<color=#ffffff>恭喜玩家 </c><color=#00ff00>"
                + gonggaoData.userName
                + "</c>"
                + "<color=#ffffff> 在 "
                + gonggaoData.gameName + " "
                + gonggaoData.channelName + " "
                + gonggaoData.machineNum + " "
                + text1
                + "</c>"
                + "<color=#00ff00> "
                + gonggaoData.awardName
                + " </c>"
                + "<color=#ffffff>获得"
                + " </c>"
                + "<color=#ffff00>"
                + gonggaoData.score
                + "</c>"
                + "分"
                + bet_level_str
                + "! "
            this.setGongGaoEnable(true);
        }
        else {
            this.msgqueue.unshift(gonggaoData);
        }
    }

    public setGonggao_weihu(gonggaoData: any) {//此处根据服务器数据来解析保存公告 
        if (this.isPlaying == false) {//如果公告没有在播放
            this.label_gonggao.string = "<color=#ffffff>通知：</c><color=#ff0000>"
                + gonggaoData.userName
                + "</c>"
            this.setGongGaoEnable(true);
        }
        this.msgqueue = new Array<any>();
        for (var i = 0; i < 100; i++) {
            this.msgqueue.push(gonggaoData);
        }
    }
    public setGonggao_system(gonggaoData: any) {//此处根据服务器数据来解析保存公告 
        if (this.isPlaying == false) {//如果公告没有在播放
            this.label_gonggao.string = "<color=#ffffff>通知：</c><color=#ff0000>"
                + gonggaoData.content
                + "</c>"
            this.setGongGaoEnable(true);
        } else {
            this.msgqueue.push(gonggaoData);
        }
    }

    public setGonggao_login(gonggaoData: any) {//此处根据服务器数据来解析保存公告 
        if (this.isPlaying == false) {//如果公告没有在播放

            this.setlogingonggaoinfo(gonggaoData)
        } else {
            this.msgqueue.push(gonggaoData);
        }
    }

    public setGongGaoEnable(enable: boolean) {
        console.log("enable============", enable);
        // var anim = this.node.getComponent(cc.Animation);
        if (enable) {
            // var animlaba = this.laba.getComponent(cc.Animation);
            // animlaba.play('laba');
            // anim.on('finished', this.gongGaoShowOver, this);
            // anim.play('gonggaoFadeIn');
            this.scheduleOnce(this.gongGaoShowOver.bind(this), 1);
            this.isPlaying = true;
        } else {
            // anim.on('finished', this.gongGaoCloseOver, this);
            // anim.play('gonggaoFadeOut');
            this.scheduleOnce(this.gongGaoCloseOver.bind(this), 1);
        }
    }
    gongGaoShowOver() {
        // var anim = this.node.getComponent(cc.Animation);
        // anim.off('finished', this.gongGaoShowOver, this);
        this.node.opacity = 255;
        this.label_gonggao.node.x = this.node.getContentSize().width / 2;
        this.startPlay = true;
    }
    gongGaoCloseOver() {
        // var anim = this.node.getComponent(cc.Animation);
        // anim.off('finished', this.gongGaoCloseOver, this);
        // var animlaba = this.laba.getComponent(cc.Animation);
        this.node.opacity = 0;
        this.isPlaying = false;
        // animlaba.stop();
        if (this.msgqueue.length > 0) {
            var data = this.msgqueue.shift();
            this.setGonggao(data);
        }
    }
    onLoad() {
        this.msgqueue = new Array<any>();
    }

    start() {

    }

    update(dt) {
        if (this.startPlay) {
            this.label_gonggao.node.x--;
            // this.mx97gonggao.node.x -- 
            var endX = -this.node.getContentSize().width / 2 - this.label_gonggao.node.getContentSize().width;
            // console.log("endX==========", endX);
            if (this.label_gonggao.node.x <= endX) {
                this.startPlay = false;
                this.setGongGaoEnable(false);
            }
        }

    }
}
