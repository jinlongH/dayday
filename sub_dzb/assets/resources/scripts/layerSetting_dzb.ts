const {ccclass, property} = cc._decorator;
import { NetworkComponent } from '../util/NetworkComponent';
import { GlobalUnit } from './GlobalUint';


@ccclass
export class layerSetting extends NetworkComponent {
    @property(cc.AudioSource)
    btncloseeffect: cc.AudioSource = null;
    @property(cc.Layout)
    layout_slider_yinyue: cc.Layout = null;
    @property(cc.Layout)
    layout_slider_yinxiao: cc.Layout = null;
    private sliderw: number = 0;
    @property(cc.AudioSource)
    bgAudio: cc.AudioSource = null;
    @property(cc.AudioSource)
    effectAudio: cc.AudioSource = null;
    @property(cc.AudioSource)
    effectAudio1: cc.AudioSource = null;
    @property(cc.Slider)
    slidermusic: cc.Slider = null;
    @property(cc.Slider)
    slidereffect: cc.Slider = null;
    
    private musicVolume = 0

    onLoad() {
        var self = this;
        this.node.on(cc.Node.EventType.TOUCH_START, function () { }, this);
        this.sliderw = this.layout_slider_yinxiao.node.getContentSize().width;
        this.onSliderMusicClicked(this.slidermusic);

        this.onSliderEffectClicked(this.slidereffect);
        this.slidermusic.progress =GlobalUnit.musicVolume || 1;
        this.slidereffect.progress = GlobalUnit.effectVolume || 1;
    }

    start() {
        var self = this;
    }

    update(dt) {
        var self = this
    }
    seteffectVolume(volume:number,audio:cc.AudioSource){
        if(audio){
            audio.volume = volume;
        }
    }
    onSliderEffectClicked(slider: cc.Slider) {
        var w = this.sliderw * slider.progress
        this.seteffectVolume(slider.progress,this.effectAudio)
        this.seteffectVolume(slider.progress,this.effectAudio1)
        var h = this.layout_slider_yinxiao.node.getContentSize().height;
        this.layout_slider_yinxiao.node.setContentSize(cc.size(w, h));
    }

    onSliderMusicClicked(slider: cc.Slider) {
        var self = this
        var w = this.sliderw * slider.progress
        this.bgAudio.volume = slider.progress
        var h = this.layout_slider_yinyue.node.getContentSize().height;
        this.layout_slider_yinyue.node.setContentSize(cc.size(w, h));
    }

    onCloseClicked() {
        this.btncloseeffect.play();
        var self = this
        self.node.active = false
        GlobalUnit.setmusicVolume(this.bgAudio.volume);
        GlobalUnit.seteffectVolume(this.effectAudio.volume);
    }
}
