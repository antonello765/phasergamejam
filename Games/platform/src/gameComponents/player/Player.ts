import GamePlay from "../../scenes/GamePlay";
import Missile from "../missile/Missile";
import IPlayer from "./IPlayer";

export default class Player extends Phaser.GameObjects.Sprite implements IPlayer {
  protected _config: genericConfig;
  protected _scene: GamePlay;
  private _body: Phaser.Physics.Arcade.Body;

  private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private _spacebar: Phaser.Input.Keyboard.Key;
  private _direction: string;

  constructor(params: genericConfig) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this._scene = <GamePlay>params.scene;
    this._config.scene.physics.world.enable(this);
    this._body = <Phaser.Physics.Arcade.Body>this.body;
    this._scene.add.existing(this);

    this._body.setDragX(1000)
      .setCollideWorldBounds(true, 0.5)
      .setImmovable(true)
      .setGravity(0, 1200)
      .setMaxVelocity(250, 550);


    this._cursors = this._scene.input.keyboard.createCursorKeys();
    this._spacebar = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


    let _animation = {
      key: "idle",
      frames: this.anims.generateFrameNumbers(this._config.key, {
        frames: [0, 1, 2, 3]
      }),
      frameRate: 10,
      yoyo: false,
      repeat: 0
    };

    this.anims.create(_animation);

    _animation = {
      key: "move",
      frames: this.anims.generateFrameNumbers(this._config.key, {
        frames: [4, 5, 6, 7]
      }),
      frameRate: 10,
      yoyo: false,
      repeat: 0
    };

    this.anims.create(_animation);
    this.setDepth(11);
  }

  getBody(): Phaser.Physics.Arcade.Body { return this._body }

  update(time: number, delta: number) {

    //se preme la barra spaziatrice
    if (Phaser.Input.Keyboard.JustDown(this._spacebar)) {

      //crea una nova istanza di missile
      new Missile({ scene: this._scene, x: this.x, y: this.y, key: "missile", direction: this._direction })

    }


    if (this._cursors.up.isDown && this._body.blocked.down) {
      this.anims.play('idle', true);
      this._body.setVelocityY(-550);

    }


    //se il il cursore sinistro è premuto
    if (this._cursors.left.isDown) {
      this.setFlipX(false);
      this.anims.play('move', true);
      this._body.setAccelerationX(-250);
      this._direction = "left";

    }

    //se il il cursore destro è premuto
    else if (this._cursors.right.isDown) {
      this.setFlipX(true);
      this.anims.play('move', true);
      this._body.setAccelerationX(250);
      this._direction = "right";
    }


    else {
      this._body.setAcceleration(0, 0);
      this.anims.play('idle', true);
      this._direction = "none";

    }


  }

}
