import GamePlay from "../../scenes/GamePlay";
import Bonus from "./Bonus";

export default class BonusCoin extends Bonus {


  constructor(params: genericConfig) {
    super(params);
    this.setName("coin")
    this.create();
  }
  create() {

    let _animationConfig = {
      key: "bonus-coin-anim",
      frames: this._config.scene.anims.generateFrameNumbers(this._config.key, {
        frames: [0, 1, 2, 3, 4, 5, 6, 7],
      }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    };

    this._config.scene.anims.create(_animationConfig);
    this.play("bonus-coin-anim");

    this.setScale(0.5);


  }

  getBonus() {
    super.getBonus();
  }
  update(time: number, delta: number) { }
}
