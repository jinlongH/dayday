const {ccclass, property} = cc._decorator;
import { Http } from '../../framework/Http';
import { Network } from '../../framework/NetWork';
import { NetworkComponent } from '../../framework/NetworkComponent';
import { Dispatcher } from '../../framework/Dispatcher';
import { GlobalUnit } from '../../scripts/domain/GlobalUint';
import { Utils } from '../../scripts/domain/utils';

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
    @property(cc.SpriteFrame)

    allfruitsprite: cc.SpriteFrame = null;
    @property(cc.Sprite)
    awardtexture: cc.Sprite = null;
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
        var award = { fiveofakind: '五梅', royalflush: "同花大顺", strflush: "同花小顺", fourofakind: "四梅" };
    
        this.nickname.string = info.name;
        if(info.t == 'mx97' || info.t == 'mx99'){
            if (info.t == 'mx99') {
                var allnames = {
                    all_9_7:        {size:0.25,image:"rank/textures/nine",name:"9条七",bet:200},
                    all_8_7:        {size:0.25,image:"rank/textures/nine",name:"8条七",bet:100},
                    all_7_7:        {size:0.25,image:"rank/textures/nine",name:"7条七",bet:80},
                    all_6_7:        {size:0.25,image:"rank/textures/nine",name:"6条七",bet:60},
                    all_5_7:        {size:0.25,image:"rank/textures/nine",name:"5条七",bet:40},
                    all_4_7:        {size:0.25,image:"rank/textures/nine",name:"4条七",bet:20},
                    all_3_7:        {size:0.25,image:"rank/textures/nine",name:"3条七",bet:5},
                    all_2_7:        {size:0.25,image:"rank/textures/nine",name:"2条七",bet:2},
                    allfruit:       {size:0.3,image:"rank/textures/all_fruits",name:"全盘水果",bet:15},
                    allbluebar:     {size:0.3,image:"rank/textures/title/bar_blue",name:"全盘蓝bar",bet:100},
                    allredbar:      {size:0.3,image:"rank/textures/title/bar_red",name:"全盘红bar",bet:90},
                    allcherry:      {size:0.3,image:"rank/textures/title/lichi",name:"全盘荔枝",bet:80},
                    allyellowbar:   {size:0.3,image:"rank/textures/title/bar_yellow",name:"全盘黄bar",bet:60},
                    allwatermelon:  {size:0.3,image:"rank/textures/title/watermelon",name:"全盘西瓜",bet:60},
                    allbell:        {size:0.3,image:"rank/textures/title/jingle_bell",name:"全盘铃",bet:40},
                    allmango:       {size:0.3,image:"rank/textures/title/grape",name:"全盘葡萄",bet:40},
                    allorange:      {size:0.3,image:"rank/textures/title/orange",name:"全盘橙子",bet:40},
                    allanybar:      {size:0.3,image:"rank/textures/title/any_bar",name:"全盘bar",bet:40},
                }
            }else{
                var allnames = {
                    all_9_7:        {size:0.25,image:"rank/textures/title/seven",name:"9条七",bet:200},
                    all_8_7:        {size:0.25,image:"rank/textures/title/seven",name:"8条七",bet:100},
                    all_7_7:        {size:0.25,image:"rank/textures/title/seven",name:"7条七",bet:80},
                    all_6_7:        {size:0.25,image:"rank/textures/title/seven",name:"6条七",bet:60},
                    all_5_7:        {size:0.25,image:"rank/textures/title/seven",name:"5条七",bet:40},
                    all_4_7:        {size:0.25,image:"rank/textures/title/seven",name:"4条七",bet:20},
                    all_3_7:        {size:0.25,image:"rank/textures/title/seven",name:"3条七",bet:5},
                    all_2_7:        {size:0.25,image:"rank/textures/title/seven",name:"2条七",bet:2},
                    allfruit:       {size:0.3,image:"rank/textures/all_fruits",name:"全盘水果",bet:15},
                    allbluebar:     {size:0.3,image:"rank/textures/title/bar_blue",name:"全盘蓝bar",bet:100},
                    allredbar:      {size:0.3,image:"rank/textures/title/bar_red",name:"全盘红bar",bet:90},
                    allcherry:      {size:0.3,image:"rank/textures/title/lichi",name:"全盘荔枝",bet:80},
                    allyellowbar:   {size:0.3,image:"rank/textures/title/bar_yellow",name:"全盘黄bar",bet:60},
                    allwatermelon:  {size:0.3,image:"rank/textures/title/watermelon",name:"全盘西瓜",bet:60},
                    allbell:        {size:0.3,image:"rank/textures/title/jingle_bell",name:"全盘铃",bet:40},
                    allmango:       {size:0.3,image:"rank/textures/title/grape",name:"全盘葡萄",bet:40},
                    allorange:      {size:0.3,image:"rank/textures/title/orange",name:"全盘橙子",bet:40},
                    allanybar:      {size:0.3,image:"rank/textures/title/any_bar",name:"全盘bar",bet:40},
                }
            }
            var alltype = allnames[info.style]
            var mingxingbei = info.mingxingbei 
            var bei = alltype.bet 
            if (mingxingbei >0 )
            {
                bei = bei *mingxingbei
            }
            var type = info.style
            var num = ""
            var isseven = type.indexOf("_")
            //console.log("cole---------------isseven",isseven);
            if (isseven)
            {
                var strs = type.split("_")
             //   console.log("cole---------------strs",strs);
                if (strs && strs.length == 3)
                {
                    num = strs[1]
                }
            }
            else
            {
                
            }//console.log("cole---------------num",num);
            
            this.award.string = "A"+num;
            var self = this;
            var filepath = alltype.image
          //  console.log("cole---------------filepath",filepath);
            if (type == "allfruit")
            {
                self.awardtexture.spriteFrame = this.allfruitsprite;
                self.awardtexture.node.color = cc.color(0,255,0,255);
                self.awardtexture.node.scale = alltype.size
                self.awardtexture.node.setPosition(cc.v2(100,0))
                self.award.node.active = false
            }
            else
            {
                cc.loader.loadRes(filepath, cc.SpriteFrame, function (err, spriteFrame) {
                    self.awardtexture.spriteFrame = spriteFrame;
                    self.awardtexture.node.scale = alltype.size

                });
            }
            
        }
        else{
            this.award.string = award[info.style];
           
        }
        
        this.jitai.string = arrChannelName[info.hallkey-1]+info.roomkey+"号机";
        this.score.string = info.score;
        var self = this;
        var ewaiscore = 0;
        if(info.system_1_value)
        {
            ewaiscore+=info.system_1_value;
        }
        if(info.system_2_value)
        {
            ewaiscore+=info.system_2_value;
        }
        this.node.getChildByName("ewaijl").getComponent(cc.Label).string = ""
        if(ewaiscore>0)
        {
            this.node.getChildByName("ewaijl").getComponent(cc.Label).string = "额外奖励:"+ewaiscore;
        } 
        var filName = "textures/hall/popres/to" + info.avatar;
        cc.loader.loadRes(filName, cc.SpriteFrame, function (err, spriteFrame) {
            self.avatar.spriteFrame = spriteFrame;
        });
    }
}
