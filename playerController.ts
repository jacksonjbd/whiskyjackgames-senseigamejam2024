

function playerInteract() {
    sprite_playerInteract = sprites.create(img`
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        `, SpriteKind.Interact)
    sprite_playerInteract.z = -100
    sprite_playerInteract.lifespan = 100
    sprite_playerInteract.setFlag(SpriteFlag.GhostThroughWalls, true)
    if (num_lastFacing == 1) {
        sprite_playerInteract.setPosition(sprite_player.x, sprite_player.y - 10)
    } else if (num_lastFacing == 2) {
        sprite_playerInteract.setPosition(sprite_player.x + 10, sprite_player.y)
    } else if (num_lastFacing == 3) {
        sprite_playerInteract.setPosition(sprite_player.x - 10, sprite_player.y)
    } else {
        sprite_playerInteract.setPosition(sprite_player.x, sprite_player.y + 10)
    }
}

function animatePlayer() {
    if (!(bool_isPlayerDead)) {
        if (!(bool_isPlayerFrozen)) {
            if (controller.down.isPressed()) {
                animation.setAction(sprite_player, ActionKind.WalkDown)
                num_lastFacing = 0
            } else if (controller.up.isPressed()) {
                animation.setAction(sprite_player, ActionKind.WalkUp)
                num_lastFacing = 1
            } else if (controller.right.isPressed()) {
                animation.setAction(sprite_player, ActionKind.WalkRight)
                num_lastFacing = 2
            } else if (controller.left.isPressed()) {
                animation.setAction(sprite_player, ActionKind.WalkLeft)
                num_lastFacing = 3
            } else if (num_lastFacing == 1) {
                animation.setAction(sprite_player, ActionKind.IdleUp)
            } else if (num_lastFacing == 2) {
                animation.setAction(sprite_player, ActionKind.IdleRight)
            } else if (num_lastFacing == 3) {
                animation.setAction(sprite_player, ActionKind.IdleLeft)
            } else {
                animation.setAction(sprite_player, ActionKind.IdleDown)
            }
        } else {
            if (num_lastFacing == 1) {
                if (Bool_isAttacking) {
                    sprite_sword.setPosition(sprite_player.x, sprite_player.y - 10)
                }
                animation.setAction(sprite_player, ActionKind.IdleUp)
            } else if (num_lastFacing == 2) {
                if (Bool_isAttacking) {
                    sprite_sword.setPosition(sprite_player.x + 10, sprite_player.y)
                }
                animation.setAction(sprite_player, ActionKind.IdleRight)
            } else if (num_lastFacing == 3) {
                if (Bool_isAttacking) {
                    sprite_sword.setPosition(sprite_player.x - 10, sprite_player.y)
                }
                animation.setAction(sprite_player, ActionKind.IdleLeft)
            } else {
                if (Bool_isAttacking) {
                    sprite_sword.setPosition(sprite_player.x, sprite_player.y + 10)
                }
                animation.setAction(sprite_player, ActionKind.IdleDown)
            }
        }
    }
}