import GamePlay from "../../scenes/GamePlay";
import Missile from "../missile/Missile";
import IPlayer from "./IPlayer";

export default class Player extends Phaser.GameObjects.Sprite implements IPlayer {

  //dichiariamo le variabili 
  private _config: genericConfig;
  private _scene: GamePlay;
  private _body: Phaser.Physics.Arcade.Body;
  private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private _spacebar: Phaser.Input.Keyboard.Key;
  private _direction: string;

  constructor(params: genericConfig) {
    //passiamo i parametri di inizializzazione alla classe SPRITE
    super(params.scene, params.x, params.y, params.key);
    //assegnamo i parametri di configurazione alla variabile
    this._config = params;
    //assegnamo il riferrimento alla scena padre
    this._scene = <GamePlay>params.scene;
    //abilitiamo questo gameobject alla fisica
    this._scene.physics.world.enable(this);
    //settiamo la variabile in modo da poter accedere a tutte le propery del body
    this._body = <Phaser.Physics.Arcade.Body>this.body;
    //aggiungiamo questo gameobject alla scena
    this._scene.add.existing(this);

    this._body
      .setCollideWorldBounds(true, 0.5) //collide con i bounds del world
      .setImmovable(true) //non rispnde agli effetti della fisica se collide con altro game object
      .setGravity(0, 1200) //setta la gravità 
      .setMaxVelocity(250, 550); //setta una velocità max per la X e la Y


    //creiamo un istanza di cursor keys
    this._cursors = this._scene.input.keyboard.createCursorKeys();
    //inizializziamo la SPACE KEY 
    this._spacebar = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    //creiamo l'animazione di pausa
    let _animation = {
      key: "idle",
      frames: this.anims.generateFrameNumbers(this._config.key, {
        frames: [0, 1, 2, 3]
      }),
      frameRate: 10,
      yoyo: false,
      repeat: 0
    };
    //la inizializziamo
    this.anims.create(_animation);

    //creiamo l'animazione di movimento
    _animation = {
      key: "move",
      frames: this.anims.generateFrameNumbers(this._config.key, {
        frames: [4, 5, 6, 7]
      }),
      frameRate: 10,
      yoyo: false,
      repeat: 0
    };
    //la inizializziamo
    this.anims.create(_animation);
    //settiamo la z a 11
    this.setDepth(11);
  }

  //questo metodo serve nel collider per avere accesso alle proprità del body per fare dei controlli 
  getBody(): Phaser.Physics.Arcade.Body { return this._body }

  update(time: number, delta: number) {

    //se preme la barra spaziatrice
    if (Phaser.Input.Keyboard.JustDown(this._spacebar)) {
      //crea una nova istanza di missile nella direzione del player
      new Missile({ scene: this._scene, x: this.x, y: this.y, key: "missile", direction: this._direction })

    }


    //se il tasto cursore up è premuto ed il player è a contatto con il pavimento
    if (this._cursors.up.isDown && this._body.blocked.down) {
      //effettua il play dell'animazione
      this.anims.play('idle', true);
      //setta la velocità y in modo da far saltare il player
      this._body.setVelocityY(-550);

    }


    //se il il cursore sinistro è premuto
    if (this._cursors.left.isDown) {
      //gira il PLAYER nella posizione iniziale, quella definina nello spritesheet
      this.setFlipX(false);
      //effettual il play dell'animazione
      this.anims.play('move', true);
      //setta la velocità x in modo da far muovere il player
      this._body.setVelocityX(-250);
      //setta la direction verso sinistra
      this._direction = "left";

    }

    //se il il cursore destro è premuto
    else if (this._cursors.right.isDown) {
      //gira il PLAYER in direzione opposta da quella definina nello spritesheet
      this.setFlipX(true);
      //effettual il play dell'animazione
      this.anims.play('move', true);
      //setta la velocità x in modo da far muovere il player
      this._body.setVelocityX(250);
      //setta la direction verso destra
      this._direction = "right";
    }

    //se non sono premuti i pulsanti
    else {
      //setta la velocità x a 0 in modo da far fermare il PLAYER
      this._body.setVelocityX(0);
      //effettual il play dell'animazione
      this.anims.play('idle', true);
      //setta la direction a NONE
      this._direction = "none";

    }


  }

}
