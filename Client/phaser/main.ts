class Connect4 extends Phaser.Game {
    constructor(divID: string) {
        super(500, 710, Phaser.AUTO, divID, null, false);
        this.state.add("MenuState", new MenuState());
        this.state.start("MenuState", true, false);
        console.log("New Circle object created.");
    }
}

window.onload = () => {
    new Connect4("game");
};