class Connect4 extends Phaser.Game {
    constructor(divID) {
        super(500, 710, Phaser.AUTO, divID, null, false);
        this.state.add("MenuState", new MenuState());
        this.state.start("MenuState", true, false);
        console.log("New Game object created.");
    }
}
window.onload = () => {
    new Connect4("game");
};
