import GamePlay from "../../scenes/GamePlay";
import IBonus from "./IBonus";

export default class Bonus extends Phaser.GameObjects.Sprite implements IBonus {
  protected _config: genericConfig;
  protected _scene: GamePlay;
  protected _body: Phaser.Physics.Arcade.Body;
  protected _isActive: boolean = false;

  constructor(params: genericConfig) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this._scene = <GamePlay>params.scene;
    this._config.scene.physics.world.enable(this);
    this._body = <Phaser.Physics.Arcade.Body>this.body;
    this._scene.addBonus(this);
    this._scene.add.existing(this);

  }
  create() { }
  update(time: number, delta: number) { }
  getBody(): Phaser.Physics.Arcade.Body { return this._body; }
  isActive() {
    return this._isActive;
  }
  getBonus() {
    this._scene.removeBonus(this);

  }
}