class MenuState extends Phaser.State {
    constructor() {
        super();
    }
    init() {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.align(true, false);
    }
    preload() {
    }
    create() {
        this.game.stage.setBackgroundColor("#11a2ff");
    }
    update() {
    }
}
