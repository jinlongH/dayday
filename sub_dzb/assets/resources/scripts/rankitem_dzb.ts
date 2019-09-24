const {ccclass, property} = cc._decorator;


@ccclass
export class rankitem_dzb extends cc.Component {
    @property(cc.Label)
    rankIndex: cc.Label = null;
    @property(cc.Sprite)
    avatar: cc.Sprite = null;
    @property(cc.Label)
    nickname: cc.Label = null;
    @property(cc.Label)
    jitai: cc.Label = null;
    @property(cc.Label)
    award: cc.Label = null;
    @property(cc.Label)
    score: cc.Label = null;
    
    @property(cc.Label)
    level: cc.Label = null;
    

    onLoad() {
        var self = this;
        
    }

    start() {
        var self = this;
    }

    // update(dt) {
    //     var self = this
    // }

    init() {

    }

    setInfo(info:any,index:number){
        this.rankIndex.string = ""+(index+1)
        // console.log("rankitem_dzb======",info);
        var arrChannelName = ['体验场', '初级场', '中级场', '高级场', '贵宾场'];
        var award = { fivebars: '五鬼', fiveofakind: '五梅', royalflush: "同花大顺", strflush: "同花小顺", fourofakind: "四梅", fourofakind_J_A: '大四梅', fourofakind_2_10: '小四梅',fourofakind_J_A_2: '正宗大四梅X2倍',fourofakind_J_A_4: '正宗大四梅X4倍', fourofakind_J_A_: '正宗大四梅',fish_bossDorgan:"狂暴火龙",fish_bossLantern:"暗夜炬兽",fish_bossHead:"深海八爪鱼",fish_goldShark:"霸王鲸",fish_hairyCrabs:"霸王蟹"};
        var award_hfh = { fivebars: '五鬼', fiveofakind: '五梅', royalflush: "同花大顺", strflush: "同花小顺", fourofakind: "四梅", fourofakind_J_A: '大四梅', fourofakind_2_10: '小四梅',fourofakind_J_A_2: '正宗大四梅X2倍',fourofakind_J_A_4: '正宗大四梅X4倍', fourofakind_J_A_: '正宗大四梅',fish_bossDorgan:"狂暴火龙",fish_bossLantern:"暗夜炬兽",fish_bossHead:"深海八爪鱼",fish_goldShark:"霸王鲸",fish_hairyCrabs:"霸王蟹"};
       
        this.nickname.string = info.name;
        if(info.t == 'hfh' || info.t == 'dbs'){
            this.award.string = award_hfh[info.style];
            if(info.style == 'fourofakind_J_A_'){
                this.award.string = award_hfh[info.style]+info.exp_count+'倍';
                
            }else if(info.style == 'fourofakind_2_10'&&info.count>=2){
                this.award.string = award_hfh[info.style]+info.count+'连庄';
                this.award.string =award_hfh[info.style]+info.count+"连庄";
            }
        }
        else if(info.t == 'sm'){
            arrChannelName = ['体验场', '跑马场', '全民场', '高级场', '贵宾场'];
            this.award.string = info.style + "倍"
        }
        else if(info.t == 'mx97'){
            var allnames = {
                all_9_7:        {name:"9条七",bet:200},
                all_8_7:        {name:"8条七",bet:100},
                all_7_7:        {name:"7条七",bet:80},
                all_6_7:        {name:"6条七",bet:60},
                all_5_7:        {name:"5条七",bet:40},
                all_4_7:        {name:"4条七",bet:20},
                all_3_7:        {name:"3条七",bet:5},
                all_2_7:        {name:"2条七",bet:2},
                allfruit:       {name:"全盘水果",bet:15},
                allbluebar:     {name:"全盘蓝bar",bet:100},
                allredbar:      {name:"全盘红bar",bet:90},
                allcherry:      {name:"全盘荔枝",bet:80},
                allyellowbar:   {name:"全盘黄bar",bet:60},
                allwatermelon:  {name:"全盘西瓜",bet:60},
                allbell:        {name:"全盘铃",bet:40},
                allmango:       {name:"全盘葡萄",bet:40},
                allorange:      {name:"全盘橙子",bet:40},
                allanybar:      {name:"全盘bar",bet:40},
            }
            var alltype = allnames[info.style]
            var mingxingbei = info.mingxingbei 
            var bei = alltype.bet 
            if (mingxingbei >0 )
            {
                bei = bei *mingxingbei
            }
            this.award.string = alltype.name +" "+bei+"倍";
        }else if(info.t == 'NBA'){
            if(info.chun_4k_bei){
                this.award.string =  "纯4K x "+info.chun_4k_bei+"倍"
            }else{
                this.award.string = award[info.style]
            }
            
        }
        else{
            this.award.string = award[info.style];
           
        }
       
        this.jitai.string = arrChannelName[info.hallkey-1]+info.roomkey+"号机";

        var bet_level_str:string = "";
        switch (info.bet_index) {
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
        this.score.string = info.score;
        this.level.string = bet_level_str;

        var self = this;
        var filName = "textures/hall/popres/to" + info.avatar;
        cc.loader.loadRes(filName, cc.SpriteFrame, function (err, spriteFrame) {
            self.avatar.spriteFrame = spriteFrame;
        });
    }
}
