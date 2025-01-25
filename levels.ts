
let sprite_tree: Sprite = null

function completeLevel() {
    array_levelComplete2D[(sprite_cameraControl.tilemapLocation().column - 5) / 10][(sprite_cameraControl.tilemapLocation().row - 4) / 8] = 1
}
