import GamePlay from "../../scenes/GamePlay";
import Bonus from "./Bonus";

export default class BonusHeart extends Bonus {


  constructor(params: genericConfig) {
    super(params);
    this.setName("heart")
    this.create();
  }
  create() {

    let _animationConfig = {
      key: "bonus-heart-anim",
      frames: this._config.scene.anims.generateFrameNumbers(this._config.key, {
        frames: [0, 1],
      }),
      frameRate: 4,
      yoyo: false,
      repeat: -1,
    };

    this._config.scene.anims.create(_animationConfig);
    this.play("bonus-heart-anim")

  }

  getBonus() {

    super.getBonus();


  }
  update(time: number, delta: number) { }
}
