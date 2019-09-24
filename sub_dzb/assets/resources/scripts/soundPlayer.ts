// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
import { GlobalUnit } from './GlobalUint';
const {ccclass, property} = cc._decorator;
@ccclass
export default class SoundPlayer extends cc.Component {

    @property(cc.AudioSource)
    audioSource: cc.AudioSource = null;
    onLoad () {
         console.log("SoundPlayer onLoad=========",this.audioSource.loop);
    }

    start() {

          this.audioSource.volume =3;
          this.play();
    }
    onDestroy(){
        // console.log("SoundPlayer onDestroy====",this.audioSource);
        this.audioSource.stop();
    }
    stop() {
          console.log("SoundPlayer stop====",this.audioSource);
        this.audioSource.stop();
    }
    play() {
        this.audioSource.loop = true;
        this.audioSource.play();
    }
    pause() {
          console.log("SoundPlayer pause====",this.audioSource);
        this.audioSource.pause();
    }
    // update (dt) {},
}

