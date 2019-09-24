
// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import { GlobalUnit } from './GlobalUint';
const {ccclass, property} = cc._decorator;

@ccclass
export default class Card extends cc.Component {

    @property(cc.Sprite)
    card: cc.Sprite = null;

    @property(cc.Sprite)
    card_bg: cc.Sprite = null;

    @property(cc.Sprite)
    hold: cc.Sprite = null;

    @property(cc.SpriteAtlas)
    card_atlas: cc.SpriteAtlas = null;

    
    onLoad() {
    }

    start() {
        
    }
    setCardDefault(gameOver: boolean) {
        this.card_bg.node.active = true;
    }
    private RandomNumBoth(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.round(Rand * Range); //四舍五入
        return num;
    }
    setWithOutAnimCard(card: number) {
        if (card > 0 && card < 100) {
           var frame = this.card_atlas.getSpriteFrame('guipai_' + card);
           this.card.getComponent(cc.Sprite).spriteFrame = frame  
        } else {
            var color = parseInt("" + card / 100);
            var point = card % 100;
            var pframe = null;
            switch (color) {
                case 1://方片
                    pframe = this.card_atlas.getSpriteFrame('squarepiece' + point);
                    break;
                case 2://梅花
                    pframe = this.card_atlas.getSpriteFrame('plumblossom' + point);
                    break;
                case 3://红桃
                    pframe = this.card_atlas.getSpriteFrame('redheart' + point);
                    break;
                case 4://黑桃
                    pframe = this.card_atlas.getSpriteFrame('spades' + point);
                    break;
            }
            this.card.getComponent(cc.Sprite).spriteFrame = pframe
        }
        this.card_bg.node.active = false;
    }
    showHold(){
        this.hold.node.active = true;
    }
    setCard(card: number) {
        var self = this;
        this.hold.node.active = false;
        if (card > 0 && card < 100) {
            console.log("self.GlobalUnit.cuurentGame:",GlobalUnit.cuurentGame);
            console.log("card_atlas",this.card_atlas);
            
            if(GlobalUnit.cuurentGame == 'hfh'){
                var frame = this.card_atlas.getSpriteFrame('firebird');
                this.card.getComponent(cc.Sprite).spriteFrame = frame
             }else if(GlobalUnit.cuurentGame == 'dbs'){    
                var frame = this.card_atlas.getSpriteFrame('kingbase of color');
                this.card.getComponent(cc.Sprite).spriteFrame = frame
                var self = this; 
                cc.loader.loadRes("game/shark/prefabs/poker_king_shark.prefab", function(errorMessage,loadedResource){
                    //检查资源加载
                    if( errorMessage ) { cc.log( '载入预制资源失败, 原因:' + errorMessage ); return; }
                    if( !( loadedResource instanceof cc.Prefab ) ) { cc.log( '你载入的不是预制资源!' ); return; } 
                    //开始实例化预制资源
                    var king_node = cc.instantiate(loadedResource);
                    king_node.tag = 1024;
                    //将预制资源添加到父节点
                    self.card.getComponent(cc.Sprite).node.addChild(king_node);
                });
             }
             else{
                var frame = this.card_atlas.getSpriteFrame('guipai_' + card);
                this.card.getComponent(cc.Sprite).spriteFrame = frame
             }
            
        } else {
            
            var color = parseInt("" + card / 100);
            var point = card % 100;
            var pframe = null;
            switch (color) {
                case 1://方片
                    pframe = this.card_atlas.getSpriteFrame('squarepiece' + point);
                    break;
                case 2://梅花
                    pframe = this.card_atlas.getSpriteFrame('plumblossom' + point);
                    break;
                case 3://红桃
                    pframe = this.card_atlas.getSpriteFrame('redheart' + point);
                    break;
                case 4://黑桃
                    pframe = this.card_atlas.getSpriteFrame('spades' + point);
                    break;
            }
            this.card.getComponent(cc.Sprite).spriteFrame = pframe
        }
    }
    playOpenBetCard(funCall: any) {

        var anim = this.node.getComponent(cc.Animation);
        anim.on('finished', function () {
            funCall();
        }, this);
        anim.play('card_game');
    }

    playOpenCard() {
        var anim = this.node.getComponent(cc.Animation);
        anim.on('finished', this.openOver, this);
        anim.play('card_game');
    }
    openOver() {
        var anim = this.node.getComponent(cc.Animation);
        anim.off('finished', this.openOver, this);
    }
}
