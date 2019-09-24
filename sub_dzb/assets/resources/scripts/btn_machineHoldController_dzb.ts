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
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label_time: cc.Label = null;

    @property(cc.Label)
    label_name: cc.Label = null;

    @property(cc.Node)
    title: cc.Node = null;
    
    elapsed: number = -1;
    // LIFE-CYCLE CALLBACKS:

    duanwei = {
        engineer: { duanweiname: '士兵', sprFrame: 'person/textures/title/title_1', level: 0, num: 1 },
        platoon_leader: { duanweiname: '排长', sprFrame: 'person/textures/title/title_2', level: 200000, num: 2 },
        company_commander: { duanweiname: '连长', sprFrame: 'person/textures/title/title_3', level: 1000000, num: 3 },
        deputy_battalion_commander: { duanweiname: '副营长', sprFrame: 'person/textures/title/title_4', level: 5000000, num: 4 },
        battalion_commander: { duanweiname: '营长', sprFrame: 'person/textures/title/title_5', level: 10000000, num: 5 },
        deputy_regimental_commander: { duanweiname: '副团长', sprFrame: 'person/textures/title/title_6', level: 25000000, num: 6 },
        regimental_commander: { duanweiname: '团长', sprFrame: 'person/textures/title/title_7', level: 50000000, num: 7 },
        deputy_brigade_commander: { duanweiname: '副旅长', sprFrame: 'person/textures/title/title_8', level: 100000000, num: 8 },
        brigade_commander: { duanweiname: '旅长', sprFrame: 'person/textures/title/title_9', level: 250000000, num: 9 },
        division_commander: { duanweiname: '师长', sprFrame: 'person/textures/title/title_10', level: 500000000, num: 10 },
        corps_commander: { duanweiname: '军长', sprFrame: 'person/textures/title/title_11', level: 1250000000, num: 11 },
        military_commander: { duanweiname: '司令', sprFrame: 'person/textures/title/title_12', level: 2500000000, num: 12 },
        '': { duanweiname: '司令', sprFrame: 'person/textures/title/title_12', level: 2500000000, num: 12 }
    }

    private et: cc.EventTarget = null;
    setTime(time: number) {
        if (!this.et) {
            this.et = cc['NetTarget'];
        }
        this.elapsed = time;
        if (this.elapsed > 0) {
            this.node.active = true;
            this.updateTime();
        }
    }
    setHoldPlayerName(name: string, level: string) {
        this.label_name.string = name;
        var self = this
        var filName = this.duanwei[level].sprFrame;
        cc.loader.loadRes(filName, cc.SpriteFrame, function (err, res) {
            if (err) {
                console.log(err);
            }

            cc.log(self.title)
            self.title.getComponent(cc.Sprite).spriteFrame = res
        })
        console.log("设置玩家信息  "+name)
    }
    sec_to_time(s) {
        var t;
        if (s > -1) {
            var hour = Math.floor(s / 3600);
            var min = Math.floor(s / 60) % 60;
            var sec = s % 60;
            if (hour < 10) {
                t = '0' + hour + ":";
            } else {
                t = hour + ":";
            }
            if (min < 10) { t += "0"; }
            t += min;
            // if(sec < 10){t += "0";}
            // t += sec.toFixed(0);
        }
        console.log("t=======", t);
        return t;
    }
    time_to_sec(time) {
        var s = '';
        var hour = time.split(':')[0];
        var min = time.split(':')[1];
        var sec = time.split(':')[2];

        s = "" + Number(hour * 3600) + Number(min * 60) + Number(sec);

        return s;
    };
    updateTime() {
        var self = this;
        if (self.elapsed > 0) {
            var timestamp = (new Date()).valueOf();
            timestamp = Math.floor(timestamp / 1000);
            if (self.elapsed <= timestamp) {
                this.et.emit('timeOut');
                self.elapsed = -1;
            } else {
                self.label_time.string = "" + this.sec_to_time((self.elapsed - timestamp))
            }
        }
    }
     onLoad () {
        var self = this;
        this.rankExist(GlobalUnit.rank_exist);
     }
    rankExist(rank_exist:boolean){
       
        //this.title.active=rank_exist
    }
    start() {
        var self = this;
        this.schedule(function () {
            // 这里的 this 指向 component
            // console.log("self.elapsed===========", self.elapsed);
            self.updateTime();
        }, 1);
    }

    // update (dt) {}
}
