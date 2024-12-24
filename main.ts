enum ActionKind {
    Walking,
    Idle,
    Jumping,
    IdleDown,
    WalkDown,
    WalkLeft,
    WalkRight,
    WalkUp,
    IdleUp,
    IdleLeft,
    IdleRight,
    SwordUpAttack,
    DeathAnim,
    DyingLOL
}
namespace SpriteKind {
    export const camera = SpriteKind.create()
    export const Dummy = SpriteKind.create()
    export const Sword = SpriteKind.create()
    export const Pots = SpriteKind.create()
    export const Bush = SpriteKind.create()
    export const userInterface = SpriteKind.create()
    export const NPC = SpriteKind.create()
    export const Interact = SpriteKind.create()
    export const Quest = SpriteKind.create()
    export const BatSleeping = SpriteKind.create()
    export const EnemyWaker = SpriteKind.create()
    export const EnemyHurt = SpriteKind.create()
    export const Tree = SpriteKind.create()
    export const Pickup = SpriteKind.create()
    export const NPC3 = SpriteKind.create()
    export const DungeonMusic = SpriteKind.create()
    export const BotSleeping = SpriteKind.create()
    export const Bullet = SpriteKind.create()
}
/**
 * Camera Funcs
 */
/**
 * UI Funcs
 */
/**
 * Enemy Funcs
 */
function playHitSound () {
    music.play(music.createSoundEffect(
    WaveShape.Noise,
    randint(3000, 3300),
    642,
    255,
    0,
    150,
    SoundExpressionEffect.None,
    InterpolationCurve.Linear
    ), music.PlaybackMode.InBackground)
}
function playerInteract () {
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
function playCatNoise () {
    music.play(music.createSoundEffect(
    WaveShape.Triangle,
    894,
    randint(2500, 3000),
    85,
    0,
    100,
    SoundExpressionEffect.None,
    InterpolationCurve.Linear
    ), music.PlaybackMode.InBackground)
}
function damageDrone (_enemy: Sprite, _damage: number, _origin: Sprite) {
    sprites.setDataNumber(_enemy, "data_isBusy", 1)
    _enemy.setKind(SpriteKind.EnemyHurt)
    sprites.changeDataNumberBy(_enemy, "data_health", _damage)
    _enemy.follow(sprite_enemyWaker, 0)
    knockback(_enemy, _origin, 200, 100)
    if (sprites.readDataNumber(_enemy, "data_health") <= 0) {
        animation.runImageAnimation(
        _enemy,
        [img`
            . . . . . . d c d . . . . . . . 
            . . . . . . d d c d . . . . . . 
            . . . . . d c c d d . . . . . . 
            . d d . d d c b c c d . . d d . 
            d c c d c c d d d c c d d c d . 
            . d c c c d d b d d c c c d d . 
            . . d c d b b b b b d d d . . . 
            . . . d b b d d d b b d . . . . 
            . . . d b d 7 7 7 d b d . . . . 
            . . . d b 7 7 7 7 7 b d . . . . 
            . . . d b 7 7 7 7 7 b d . d . . 
            d . . d b 7 7 7 7 7 b d d c d . 
            c d . d b d 7 7 7 d b d . d . . 
            d c d d b b d d d b b d . . . . 
            . d . . d b b b b b d . . . . . 
            . . . . . d d d d d . . . . . . 
            `,img`
            . . . . . . c d c . . . . . . . 
            . . . . . . c c d c . . . . . . 
            . . . . . c d d c c . . . . . . 
            . c c . c c d b d d c . . c c . 
            c d d c d d c c c d d c c d c . 
            . c d d d c c b c c d d d c c . 
            . . c d c b b b b b c c c . . . 
            . . . c b b c c c b b c . . . . 
            . . . c b c 7 7 7 c b c . . . . 
            . . . c b 7 7 7 7 7 b c . . . . 
            . . . c b 7 7 7 7 7 b c . c . . 
            c . . c b 7 7 7 7 7 b c c d c . 
            d c . c b c 7 7 7 c b c . c . . 
            c d c c b b c c c b b c . . . . 
            . c . . c b b b b b c . . . . . 
            . . . . . c c c c c . . . . . . 
            `],
        200,
        false
        )
        playBatDie()
        timer.after(600, function () {
            createPickup(_enemy.x, _enemy.y, 100, 10)
            createSmokePosition(_enemy.x, _enemy.y)
            _enemy.lifespan = 1
        })
    } else if (sprites.readDataNumber(_enemy, "data_health") >= 1) {
        animation.runImageAnimation(
        _enemy,
        [img`
            . . . . . . . . d d . . . . . . 
            . . . . . . . d b c d . . . . . 
            . d d d d d . d c d . . . . . . 
            d c c c c b d b d d d d d . . . 
            . d c b d d d d b c c b b d . . 
            . . d d d b b b d d c c c d . . 
            . . . d b b b b b b d d d . . . 
            . . . d b b d d d b b d . . . . 
            . . . d b d 7 6 7 d b d . . . . 
            . . . d b 7 7 7 7 7 b d . . . . 
            . . . d b d d d d d b d . . . . 
            . . . d b b d d d b b d . . . . 
            . . . d b b b b b b b d . . . . 
            . . . d b b b b b b b d . . . . 
            . . . . d d d d d d d . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . c c . . . . . . 
            . . . . . . . c b d c . . . . . 
            . c c c c c . c d c . . . . . . 
            c d d d d b c b c c c c c . . . 
            . c d b c c c c b d d b b c . . 
            . . c c c b b b c c d d d c . . 
            . . . c b b b b b b c c c . . . 
            . . . c b b c c c b b c . . . . 
            . . . c b c 7 6 7 c b c . . . . 
            . . . c b 7 7 7 7 7 b c . . . . 
            . . . c b c c c c c b c . . . . 
            . . . c b b c c c b b c . . . . 
            . . . c b b b b b b b c . . . . 
            . . . c b b b b b b b c . . . . 
            . . . . c c c c c c c . . . . . 
            . . . . . . . . . . . . . . . . 
            `],
        200,
        false
        )
        playBatHurt()
        timer.after(600, function () {
            sprites.setDataNumber(_enemy, "data_isBusy", 0)
            _enemy.setKind(SpriteKind.Enemy)
            animation.runImageAnimation(
            _enemy,
            [img`
                . . . . c c c c c c . . . . . . 
                . . . c d d d d d c . c c . . . 
                . . c b b b d c d c c b b c . . 
                c c c c c c c b c b b d d d c . 
                c d d d d d b c c c d d d d c . 
                . c d d d d b c c c c c d c . . 
                . . c c d b b c c c c c c . . . 
                . . . c c c c c c c c c . . . . 
                . . . c b c c c c b b c . . . . 
                . . . c b b b b b b b c . . . . 
                . . . c b c b b b c b c . . . . 
                . . . c b 7 c c c 7 b c . . . . 
                . . . c b 7 6 6 6 7 b c . . . . 
                . . . c b c 7 7 7 c b c . . . . 
                . . . . c b c c c b c . . . . . 
                . . . . . c c c c c . . . . . . 
                `,img`
                . . . . c c c . c c c . . . . . 
                . . c c d d c . c b b c c . . . 
                . c d d d d d c c b d d d c . . 
                c b b b b b c b c c d d d d c . 
                c c c c c d d d b b c c c c c . 
                . . . c d d d d d b b c . . . . 
                . . c d d d d d d d b c . . . . 
                . . . c c c c c c c c c . . . . 
                . . . c b c c c c c b c . . . . 
                . . . c b b b b b b b c . . . . 
                . . . c b c b b b c b c . . . . 
                . . . c b 7 c c c 7 b c . . . . 
                . . . c b 7 6 6 6 7 b c . . . . 
                . . . c b c 7 7 7 c b c . . . . 
                . . . . c b c c c b c . . . . . 
                . . . . . c c c c c . . . . . . 
                `,img`
                . . . . c c c c c c c . . . . . 
                . . . c b b d d d d d c . . . . 
                c c c c c c b c d d c . . . . . 
                c d d d d d c b c c c c c c c . 
                c d d d d b c d d d b b b b c . 
                . c d d b b c c d d d d c c . . 
                . . c c b c c c c d d c c . . . 
                . . . c c c c c c c c c . . . . 
                . . . c b c c c c c b c . . . . 
                . . . c b b b b b b b c . . . . 
                . . . c b c b b b c b c . . . . 
                . . . c b 7 c c c 7 b c . . . . 
                . . . c b 7 6 6 6 7 b c . . . . 
                . . . c b c 7 7 7 c b c . . . . 
                . . . . c b c c c b c . . . . . 
                . . . . . c c c c c . . . . . . 
                `,img`
                . . . . c . . . c c c . . . . . 
                . . c c d c c c b d d c c . . . 
                . c d d d d c c b d d d d c . . 
                c d d d b b c b c c c d d d c . 
                c b b b c c d d b b c c c c c . 
                . c c c c c d d d d b b c . . . 
                . . . c c d d d d d d c c . . . 
                . . . c c c c c c c c c . . . . 
                . . . c b c c c c c b c . . . . 
                . . . c b b b b b b b c . . . . 
                . . . c b c b b b c b c . . . . 
                . . . c b 7 c c c 7 b c . . . . 
                . . . c b 7 6 6 6 7 b c . . . . 
                . . . c b c 7 7 7 c b c . . . . 
                . . . . c b c c c b c . . . . . 
                . . . . . c c c c c . . . . . . 
                `],
            50,
            true
            )
        })
    }
}
function animatePlayer () {
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.Pickup, function (sprite, otherSprite) {
    if (sprites.readDataString(otherSprite, "data_type") == "heart") {
        pickupHeart(otherSprite, sprite)
    } else if (sprites.readDataString(otherSprite, "data_type") == "money") {
        pickupMoney(otherSprite, sprite)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Empty4`, function (sprite, location) {
    bool_isMusicEnd = true
    num_playerSpeed = 40
})
function completeLevel () {
    array_levelComplete2D[(sprite_cameraControl.tilemapLocation().column - 5) / 10][(sprite_cameraControl.tilemapLocation().row - 4) / 8] = 1
}
/**
 * Pickup Funcs
 */
function createPickup (_x: number, _y: number, _drop: number, _heart: number) {
    if (Math.percentChance(_drop)) {
        if (Math.percentChance(_heart)) {
            sprite_pickup = sprites.create(assets.image`SmallHeart`, SpriteKind.Pickup)
            sprite_pickup.setBounceOnWall(true)
            sprites.setDataString(sprite_pickup, "data_type", "heart")
        } else {
            if (Math.percentChance(75)) {
                sprite_pickup = sprites.create(img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 7 c d c c . 
                    c d c 7 6 d d c d c c 
                    c d c 6 6 7 d 7 c d c 
                    c c d c 7 6 6 7 c d c 
                    . c c d c 6 7 7 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `, SpriteKind.Pickup)
                animation.runImageAnimation(
                sprite_pickup,
                [img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 7 c d c c . 
                    c d c 7 6 d d c d c c 
                    c d c 6 6 7 d 7 c d c 
                    c c d c 7 6 6 7 c d c 
                    . c c d c 6 7 7 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 7 c d c c . 
                    c d c 7 6 d d c d c c 
                    c d c 6 6 7 d 7 c d c 
                    c c d c 7 6 6 7 c d c 
                    . c c d c 6 7 7 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 7 c d c c . 
                    c d c 7 6 d d c d c c 
                    c d c 6 6 7 d 7 c d c 
                    c c d c 7 6 6 7 c d c 
                    . c c d c 6 7 7 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 7 c d c c . 
                    c d c 7 6 d d c d c c 
                    c d c 6 6 7 d 7 c d c 
                    c c d c 7 6 6 7 c d c 
                    . c c d c 6 7 7 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 7 c d c c . 
                    c d c 7 6 d d c d c c 
                    c d c 6 6 7 d 7 c d c 
                    c c d c 7 6 6 7 c d c 
                    . c c d c 6 7 7 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 7 c d c c . 
                    c d c 7 6 d d c d c c 
                    c d c 6 6 7 d 7 c d c 
                    c c d c 7 6 6 7 c d c 
                    . c c d c 6 7 7 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 7 c d c c . 
                    c d c 7 6 d d c d c c 
                    c d c 6 6 7 d 7 c d c 
                    c c d c 7 6 6 7 c d c 
                    . c c d c 6 7 7 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 7 c d c c . 
                    c d c 7 6 d d c d c c 
                    c d c 6 6 7 d 7 c d c 
                    c c d c 7 6 6 7 c d c 
                    . c c d c 6 7 7 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 7 c d c c . 
                    c d c 7 6 d d c d c c 
                    c d c 6 6 7 d 7 c d c 
                    c c d c 7 6 6 7 c d c 
                    . c c d c 6 7 7 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 7 c d c c . 
                    c d c 7 6 d d c d c c 
                    c d c 6 6 7 d 7 c d c 
                    c c d c 7 6 6 7 c d c 
                    . c c d c 6 7 7 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 7 c d c c . 
                    c d c 7 6 d d c d c c 
                    c d c 6 6 7 d 7 c d c 
                    c c d c 7 6 6 7 c d c 
                    . c c d c 6 7 7 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 7 c d c c . 
                    c d c 7 6 d d c d c c 
                    c d c 6 6 7 d 7 c d c 
                    c c d c 7 6 6 7 c d c 
                    . c c d c 6 7 7 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 7 c d c c . 
                    c d c 7 6 d d c d c c 
                    c d c 6 6 7 d 7 c d c 
                    c c d c 7 6 6 7 c d c 
                    . c c d c 6 7 7 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 7 c d c c . 
                    c d c 7 6 d d c d c c 
                    c d c 6 6 7 d 7 c d c 
                    c c d c 7 6 6 7 c d c 
                    . c c d c 6 7 7 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 7 c d c c . 
                    c d c 7 6 d d c d c c 
                    c d c 6 6 7 d 7 c d c 
                    c c d c 7 6 6 7 c d c 
                    . c c d c 6 7 7 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 7 c d c c . 
                    c d c 7 6 d d c d c c 
                    c d c 6 6 7 d 7 c d c 
                    c c d c 7 6 6 7 c d c 
                    . c c d c 6 7 7 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 7 c d c c . 
                    c d c 7 6 d d c d c c 
                    c d c 6 6 7 d 7 c d c 
                    c c d c 7 6 6 7 c d c 
                    . c c d c 6 7 7 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 7 c d c c . 
                    c d c 7 6 d d c d c c 
                    c d c 6 6 7 d 7 c d c 
                    c c d c 7 6 6 7 c d c 
                    . c c d c 6 7 7 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 7 c d c c . 
                    c d c 7 6 d d c d c c 
                    c d c 6 6 7 d 7 c d c 
                    c c d c 7 6 6 7 c d c 
                    . c c d c 6 7 7 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c b b b b b c c . . . 
                    c b c c c c b c c . . 
                    c b c b b b c b c c . 
                    c b c b b b b c b c c 
                    c b c b b b b b c b c 
                    c c b c b b b b c b c 
                    . c c b c b b b c b c 
                    . . c c b c c c c b c 
                    . . . c c b b b b b c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 7 c d c c . 
                    c d c 7 6 d d c d c c 
                    c d c 6 6 7 d 7 c d c 
                    c c d c 7 6 6 7 c d c 
                    . c c d c 6 7 7 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c b b b b b c c . . . 
                    c b c c c c b c c . . 
                    c b c b b b c b c c . 
                    c b c b b b b c b c c 
                    c b c b b b b b c b c 
                    c c b c b b b b c b c 
                    . c c b c b b b c b c 
                    . . c c b c c c c b c 
                    . . . c c b b b b b c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 7 c d c c . 
                    c d c 7 6 d d c d c c 
                    c d c 6 6 7 d 7 c d c 
                    c c d c 7 6 6 7 c d c 
                    . c c d c 6 7 7 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c b b b b b c c . . . 
                    c b c c c c b c c . . 
                    c b c b b b c b c c . 
                    c b c b b b b c b c c 
                    c b c b b b b b c b c 
                    c c b c b b b b c b c 
                    . c c b c b b b c b c 
                    . . c c b c c c c b c 
                    . . . c c b b b b b c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 7 c d c c . 
                    c d c 7 6 d d c d c c 
                    c d c 6 6 7 d 7 c d c 
                    c c d c 7 6 6 7 c d c 
                    . c c d c 6 7 7 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c b b b b b c c . . . 
                    c b c c c c b c c . . 
                    c b c b b b c b c c . 
                    c b c b b b b c b c c 
                    c b c b b b b b c b c 
                    c c b c b b b b c b c 
                    . c c b c b b b c b c 
                    . . c c b c c c c b c 
                    . . . c c b b b b b c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 7 c d c c . 
                    c d c 7 6 d d c d c c 
                    c d c 6 6 7 d 7 c d c 
                    c c d c 7 6 6 7 c d c 
                    . c c d c 6 7 7 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c b b b b b c c . . . 
                    c b c c c c b c c . . 
                    c b c b b b c b c c . 
                    c b c b b b b c b c c 
                    c b c b b b b b c b c 
                    c c b c b b b b c b c 
                    . c c b c b b b c b c 
                    . . c c b c c c c b c 
                    . . . c c b b b b b c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 7 c d c c . 
                    c d c 7 6 d d c d c c 
                    c d c 6 6 7 d 7 c d c 
                    c c d c 7 6 6 7 c d c 
                    . c c d c 6 7 7 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `],
                125,
                false
                )
                sprites.setDataNumber(sprite_pickup, "data_value", num_moneyValue1)
            } else if (Math.percentChance(_num_bigMoneyChance)) {
                sprite_pickup = sprites.create(img`
                    . c c c c c c c c c c c . 
                    c c d d d d d d d d d c c 
                    c d c c c c c c c c c d c 
                    c d c 7 d d d d d 7 c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 7 6 6 6 6 6 7 c d c 
                    c d c c c c c c c c c d c 
                    c c d d d d d d d d d c c 
                    . c c c c c c c c c c c . 
                    `, SpriteKind.Pickup)
                animation.runImageAnimation(
                sprite_pickup,
                [img`
                    . c c c c c c c c c c c . 
                    c c d d d d d d d d d c c 
                    c d c c c c c c c c c d c 
                    c d c 7 d d d d d 7 c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 7 6 6 6 6 6 7 c d c 
                    c d c c c c c c c c c d c 
                    c c d d d d d d d d d c c 
                    . c c c c c c c c c c c . 
                    `,img`
                    . c c c c c c c c c c c . 
                    c c d d d d d d d d d c c 
                    c d c c c c c c c c c d c 
                    c d c 7 d d d d d 7 c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 7 6 6 6 6 6 7 c d c 
                    c d c c c c c c c c c d c 
                    c c d d d d d d d d d c c 
                    . c c c c c c c c c c c . 
                    `,img`
                    . c c c c c c c c c c c . 
                    c c d d d d d d d d d c c 
                    c d c c c c c c c c c d c 
                    c d c 7 d d d d d 7 c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 7 6 6 6 6 6 7 c d c 
                    c d c c c c c c c c c d c 
                    c c d d d d d d d d d c c 
                    . c c c c c c c c c c c . 
                    `,img`
                    . c c c c c c c c c c c . 
                    c c d d d d d d d d d c c 
                    c d c c c c c c c c c d c 
                    c d c 7 d d d d d 7 c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 7 6 6 6 6 6 7 c d c 
                    c d c c c c c c c c c d c 
                    c c d d d d d d d d d c c 
                    . c c c c c c c c c c c . 
                    `,img`
                    . c c c c c c c c c c c . 
                    c c d d d d d d d d d c c 
                    c d c c c c c c c c c d c 
                    c d c 7 d d d d d 7 c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 7 6 6 6 6 6 7 c d c 
                    c d c c c c c c c c c d c 
                    c c d d d d d d d d d c c 
                    . c c c c c c c c c c c . 
                    `,img`
                    . c c c c c c c c c c c . 
                    c c d d d d d d d d d c c 
                    c d c c c c c c c c c d c 
                    c d c 7 d d d d d 7 c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 7 6 6 6 6 6 7 c d c 
                    c d c c c c c c c c c d c 
                    c c d d d d d d d d d c c 
                    . c c c c c c c c c c c . 
                    `,img`
                    . c c c c c c c c c c c . 
                    c c d d d d d d d d d c c 
                    c d c c c c c c c c c d c 
                    c d c 7 d d d d d 7 c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 7 6 6 6 6 6 7 c d c 
                    c d c c c c c c c c c d c 
                    c c d d d d d d d d d c c 
                    . c c c c c c c c c c c . 
                    `,img`
                    . c c c c c c c c c c c . 
                    c c d d d d d d d d d c c 
                    c d c c c c c c c c c d c 
                    c d c 7 d d d d d 7 c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 7 6 6 6 6 6 7 c d c 
                    c d c c c c c c c c c d c 
                    c c d d d d d d d d d c c 
                    . c c c c c c c c c c c . 
                    `,img`
                    . c c c c c c c c c c c . 
                    c c d d d d d d d d d c c 
                    c d c c c c c c c c c d c 
                    c d c 7 d d d d d 7 c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 7 6 6 6 6 6 7 c d c 
                    c d c c c c c c c c c d c 
                    c c d d d d d d d d d c c 
                    . c c c c c c c c c c c . 
                    `,img`
                    . c c c c c c c c c c c . 
                    c c d d d d d d d d d c c 
                    c d c c c c c c c c c d c 
                    c d c 7 d d d d d 7 c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 7 6 6 6 6 6 7 c d c 
                    c d c c c c c c c c c d c 
                    c c d d d d d d d d d c c 
                    . c c c c c c c c c c c . 
                    `,img`
                    . c c c c c c c c c c c . 
                    c c d d d d d d d d d c c 
                    c d c c c c c c c c c d c 
                    c d c 7 d d d d d 7 c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 7 6 6 6 6 6 7 c d c 
                    c d c c c c c c c c c d c 
                    c c d d d d d d d d d c c 
                    . c c c c c c c c c c c . 
                    `,img`
                    . c c c c c c c c c c c . 
                    c c d d d d d d d d d c c 
                    c d c c c c c c c c c d c 
                    c d c 7 d d d d d 7 c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 7 6 6 6 6 6 7 c d c 
                    c d c c c c c c c c c d c 
                    c c d d d d d d d d d c c 
                    . c c c c c c c c c c c . 
                    `,img`
                    . c c c c c c c c c c c . 
                    c c d d d d d d d d d c c 
                    c d c c c c c c c c c d c 
                    c d c 7 d d d d d 7 c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 7 6 6 6 6 6 7 c d c 
                    c d c c c c c c c c c d c 
                    c c d d d d d d d d d c c 
                    . c c c c c c c c c c c . 
                    `,img`
                    . c c c c c c c c c c c . 
                    c c d d d d d d d d d c c 
                    c d c c c c c c c c c d c 
                    c d c 7 d d d d d 7 c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 7 6 6 6 6 6 7 c d c 
                    c d c c c c c c c c c d c 
                    c c d d d d d d d d d c c 
                    . c c c c c c c c c c c . 
                    `,img`
                    . c c c c c c c c c c c . 
                    c c d d d d d d d d d c c 
                    c d c c c c c c c c c d c 
                    c d c 7 d d d d d 7 c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 7 6 6 6 6 6 7 c d c 
                    c d c c c c c c c c c d c 
                    c c d d d d d d d d d c c 
                    . c c c c c c c c c c c . 
                    `,img`
                    . c c c c c c c c c c c . 
                    c c d d d d d d d d d c c 
                    c d c c c c c c c c c d c 
                    c d c 7 d d d d d 7 c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 7 6 6 6 6 6 7 c d c 
                    c d c c c c c c c c c d c 
                    c c d d d d d d d d d c c 
                    . c c c c c c c c c c c . 
                    `,img`
                    . c c c c c c c c c c c . 
                    c c d d d d d d d d d c c 
                    c d c c c c c c c c c d c 
                    c d c 7 d d d d d 7 c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 7 6 6 6 6 6 7 c d c 
                    c d c c c c c c c c c d c 
                    c c d d d d d d d d d c c 
                    . c c c c c c c c c c c . 
                    `,img`
                    . c c c c c c c c c c c . 
                    c c d d d d d d d d d c c 
                    c d c c c c c c c c c d c 
                    c d c 7 d d d d d 7 c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 7 6 6 6 6 6 7 c d c 
                    c d c c c c c c c c c d c 
                    c c d d d d d d d d d c c 
                    . c c c c c c c c c c c . 
                    `,img`
                    . c c c c c c c c c c c . 
                    c c d d d d d d d d d c c 
                    c d c c c c c c c c c d c 
                    c d c 7 d d d d d 7 c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 7 6 6 6 6 6 7 c d c 
                    c d c c c c c c c c c d c 
                    c c d d d d d d d d d c c 
                    . c c c c c c c c c c c . 
                    `,img`
                    . c c c c c c c c c c c . 
                    c c d d d d d d d d d c c 
                    c d c c c c c c c c c d c 
                    c d c 7 d d d d d 7 c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 7 6 6 6 6 6 7 c d c 
                    c d c c c c c c c c c d c 
                    c c d d d d d d d d d c c 
                    . c c c c c c c c c c c . 
                    `,img`
                    . c c c c c c c c c c c . 
                    c c b b b b b b b b b c c 
                    c b c c c c c c c c c b c 
                    c b c b b b b b b b c b c 
                    c b c b b b b b b b c b c 
                    c b c b b b b b b b c b c 
                    c b c b b b b b b b c b c 
                    c b c b b b b b b b c b c 
                    c b c b b b b b b b c b c 
                    c b c b b b b b b b c b c 
                    c b c c c c c c c c c b c 
                    c c b b b b b b b b b c c 
                    . c c c c c c c c c c c . 
                    `,img`
                    . c c c c c c c c c c c . 
                    c c d d d d d d d d d c c 
                    c d c c c c c c c c c d c 
                    c d c 7 d d d d d 7 c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 7 6 6 6 6 6 7 c d c 
                    c d c c c c c c c c c d c 
                    c c d d d d d d d d d c c 
                    . c c c c c c c c c c c . 
                    `,img`
                    . c c c c c c c c c c c . 
                    c c b b b b b b b b b c c 
                    c b c c c c c c c c c b c 
                    c b c b b b b b b b c b c 
                    c b c b b b b b b b c b c 
                    c b c b b b b b b b c b c 
                    c b c b b b b b b b c b c 
                    c b c b b b b b b b c b c 
                    c b c b b b b b b b c b c 
                    c b c b b b b b b b c b c 
                    c b c c c c c c c c c b c 
                    c c b b b b b b b b b c c 
                    . c c c c c c c c c c c . 
                    `,img`
                    . c c c c c c c c c c c . 
                    c c d d d d d d d d d c c 
                    c d c c c c c c c c c d c 
                    c d c 7 d d d d d 7 c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 7 6 6 6 6 6 7 c d c 
                    c d c c c c c c c c c d c 
                    c c d d d d d d d d d c c 
                    . c c c c c c c c c c c . 
                    `,img`
                    . c c c c c c c c c c c . 
                    c c b b b b b b b b b c c 
                    c b c c c c c c c c c b c 
                    c b c b b b b b b b c b c 
                    c b c b b b b b b b c b c 
                    c b c b b b b b b b c b c 
                    c b c b b b b b b b c b c 
                    c b c b b b b b b b c b c 
                    c b c b b b b b b b c b c 
                    c b c b b b b b b b c b c 
                    c b c c c c c c c c c b c 
                    c c b b b b b b b b b c c 
                    . c c c c c c c c c c c . 
                    `,img`
                    . c c c c c c c c c c c . 
                    c c d d d d d d d d d c c 
                    c d c c c c c c c c c d c 
                    c d c 7 d d d d d 7 c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 7 6 6 6 6 6 7 c d c 
                    c d c c c c c c c c c d c 
                    c c d d d d d d d d d c c 
                    . c c c c c c c c c c c . 
                    `,img`
                    . c c c c c c c c c c c . 
                    c c b b b b b b b b b c c 
                    c b c c c c c c c c c b c 
                    c b c b b b b b b b c b c 
                    c b c b b b b b b b c b c 
                    c b c b b b b b b b c b c 
                    c b c b b b b b b b c b c 
                    c b c b b b b b b b c b c 
                    c b c b b b b b b b c b c 
                    c b c b b b b b b b c b c 
                    c b c c c c c c c c c b c 
                    c c b b b b b b b b b c c 
                    . c c c c c c c c c c c . 
                    `,img`
                    . c c c c c c c c c c c . 
                    c c d d d d d d d d d c c 
                    c d c c c c c c c c c d c 
                    c d c 7 d d d d d 7 c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 7 6 6 6 6 6 7 c d c 
                    c d c c c c c c c c c d c 
                    c c d d d d d d d d d c c 
                    . c c c c c c c c c c c . 
                    `,img`
                    . c c c c c c c c c c c . 
                    c c b b b b b b b b b c c 
                    c b c c c c c c c c c b c 
                    c b c b b b b b b b c b c 
                    c b c b b b b b b b c b c 
                    c b c b b b b b b b c b c 
                    c b c b b b b b b b c b c 
                    c b c b b b b b b b c b c 
                    c b c b b b b b b b c b c 
                    c b c b b b b b b b c b c 
                    c b c c c c c c c c c b c 
                    c c b b b b b b b b b c c 
                    . c c c c c c c c c c c . 
                    `,img`
                    . c c c c c c c c c c c . 
                    c c d d d d d d d d d c c 
                    c d c c c c c c c c c d c 
                    c d c 7 d d d d d 7 c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 6 7 7 7 7 7 d c d c 
                    c d c 7 6 6 6 6 6 7 c d c 
                    c d c c c c c c c c c d c 
                    c c d d d d d d d d d c c 
                    . c c c c c c c c c c c . 
                    `],
                125,
                false
                )
                sprites.setDataNumber(sprite_pickup, "data_value", num_moneyValue3)
                _num_bigMoneyChance = 1
            } else {
                sprite_pickup = sprites.create(img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 6 c d c c . 
                    c d c 6 c d d c d c c 
                    c d c c c 6 d 6 c d c 
                    c c d c 6 c c 6 c d c 
                    . c c d c c 6 6 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `, SpriteKind.Pickup)
                animation.runImageAnimation(
                sprite_pickup,
                [img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 6 c d c c . 
                    c d c 6 c d d c d c c 
                    c d c c c 6 d 6 c d c 
                    c c d c 6 c c 6 c d c 
                    . c c d c c 6 6 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 6 c d c c . 
                    c d c 6 c d d c d c c 
                    c d c c c 6 d 6 c d c 
                    c c d c 6 c c 6 c d c 
                    . c c d c c 6 6 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 6 c d c c . 
                    c d c 6 c d d c d c c 
                    c d c c c 6 d 6 c d c 
                    c c d c 6 c c 6 c d c 
                    . c c d c c 6 6 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 6 c d c c . 
                    c d c 6 c d d c d c c 
                    c d c c c 6 d 6 c d c 
                    c c d c 6 c c 6 c d c 
                    . c c d c c 6 6 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 6 c d c c . 
                    c d c 6 c d d c d c c 
                    c d c c c 6 d 6 c d c 
                    c c d c 6 c c 6 c d c 
                    . c c d c c 6 6 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 6 c d c c . 
                    c d c 6 c d d c d c c 
                    c d c c c 6 d 6 c d c 
                    c c d c 6 c c 6 c d c 
                    . c c d c c 6 6 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 6 c d c c . 
                    c d c 6 c d d c d c c 
                    c d c c c 6 d 6 c d c 
                    c c d c 6 c c 6 c d c 
                    . c c d c c 6 6 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 6 c d c c . 
                    c d c 6 c d d c d c c 
                    c d c c c 6 d 6 c d c 
                    c c d c 6 c c 6 c d c 
                    . c c d c c 6 6 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 6 c d c c . 
                    c d c 6 c d d c d c c 
                    c d c c c 6 d 6 c d c 
                    c c d c 6 c c 6 c d c 
                    . c c d c c 6 6 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 6 c d c c . 
                    c d c 6 c d d c d c c 
                    c d c c c 6 d 6 c d c 
                    c c d c 6 c c 6 c d c 
                    . c c d c c 6 6 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 6 c d c c . 
                    c d c 6 c d d c d c c 
                    c d c c c 6 d 6 c d c 
                    c c d c 6 c c 6 c d c 
                    . c c d c c 6 6 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 6 c d c c . 
                    c d c 6 c d d c d c c 
                    c d c c c 6 d 6 c d c 
                    c c d c 6 c c 6 c d c 
                    . c c d c c 6 6 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 6 c d c c . 
                    c d c 6 c d d c d c c 
                    c d c c c 6 d 6 c d c 
                    c c d c 6 c c 6 c d c 
                    . c c d c c 6 6 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 6 c d c c . 
                    c d c 6 c d d c d c c 
                    c d c c c 6 d 6 c d c 
                    c c d c 6 c c 6 c d c 
                    . c c d c c 6 6 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 6 c d c c . 
                    c d c 6 c d d c d c c 
                    c d c c c 6 d 6 c d c 
                    c c d c 6 c c 6 c d c 
                    . c c d c c 6 6 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 6 c d c c . 
                    c d c 6 c d d c d c c 
                    c d c c c 6 d 6 c d c 
                    c c d c 6 c c 6 c d c 
                    . c c d c c 6 6 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 6 c d c c . 
                    c d c 6 c d d c d c c 
                    c d c c c 6 d 6 c d c 
                    c c d c 6 c c 6 c d c 
                    . c c d c c 6 6 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 6 c d c c . 
                    c d c 6 c d d c d c c 
                    c d c c c 6 d 6 c d c 
                    c c d c 6 c c 6 c d c 
                    . c c d c c 6 6 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 6 c d c c . 
                    c d c 6 c d d c d c c 
                    c d c c c 6 d 6 c d c 
                    c c d c 6 c c 6 c d c 
                    . c c d c c 6 6 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 6 c d c c . 
                    c d c 6 c d d c d c c 
                    c d c c c 6 d 6 c d c 
                    c c d c 6 c c 6 c d c 
                    . c c d c c 6 6 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c b b b b b c c . . . 
                    c b c c c c b c c . . 
                    c b c b b b c b c c . 
                    c b c b b b b c b c c 
                    c b c b b b b b c b c 
                    c c b c b b b b c b c 
                    . c c b c b b b c b c 
                    . . c c b c c c c b c 
                    . . . c c b b b b b c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 6 c d c c . 
                    c d c 6 c d d c d c c 
                    c d c c c 6 d 6 c d c 
                    c c d c 6 c c 6 c d c 
                    . c c d c c 6 6 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c b b b b b c c . . . 
                    c b c c c c b c c . . 
                    c b c b b b c b c c . 
                    c b c b b b b c b c c 
                    c b c b b b b b c b c 
                    c c b c b b b b c b c 
                    . c c b c b b b c b c 
                    . . c c b c c c c b c 
                    . . . c c b b b b b c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 6 c d c c . 
                    c d c 6 c d d c d c c 
                    c d c c c 6 d 6 c d c 
                    c c d c 6 c c 6 c d c 
                    . c c d c c 6 6 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c b b b b b c c . . . 
                    c b c c c c b c c . . 
                    c b c b b b c b c c . 
                    c b c b b b b c b c c 
                    c b c b b b b b c b c 
                    c c b c b b b b c b c 
                    . c c b c b b b c b c 
                    . . c c b c c c c b c 
                    . . . c c b b b b b c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 6 c d c c . 
                    c d c 6 c d d c d c c 
                    c d c c c 6 d 6 c d c 
                    c c d c 6 c c 6 c d c 
                    . c c d c c 6 6 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c b b b b b c c . . . 
                    c b c c c c b c c . . 
                    c b c b b b c b c c . 
                    c b c b b b b c b c c 
                    c b c b b b b b c b c 
                    c c b c b b b b c b c 
                    . c c b c b b b c b c 
                    . . c c b c c c c b c 
                    . . . c c b b b b b c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 6 c d c c . 
                    c d c 6 c d d c d c c 
                    c d c c c 6 d 6 c d c 
                    c c d c 6 c c 6 c d c 
                    . c c d c c 6 6 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c b b b b b c c . . . 
                    c b c c c c b c c . . 
                    c b c b b b c b c c . 
                    c b c b b b b c b c c 
                    c b c b b b b b c b c 
                    c c b c b b b b c b c 
                    . c c b c b b b c b c 
                    . . c c b c c c c b c 
                    . . . c c b b b b b c 
                    . . . . c c c c c c c 
                    `,img`
                    c c c c c c c . . . . 
                    c d d d d d c c . . . 
                    c d c c c c d c c . . 
                    c d c d d 6 c d c c . 
                    c d c 6 c d d c d c c 
                    c d c c c 6 d 6 c d c 
                    c c d c 6 c c 6 c d c 
                    . c c d c c 6 6 c d c 
                    . . c c d c c c c d c 
                    . . . c c d d d d d c 
                    . . . . c c c c c c c 
                    `],
                125,
                false
                )
                sprites.setDataNumber(sprite_pickup, "data_value", num_moneyValue2)
                _num_bigMoneyChance += 5
            }
            sprite_pickup.lifespan = 3750
            sprites.setDataString(sprite_pickup, "data_type", "money")
        }
        sprite_pickup.setPosition(_x + randint(-3, 3), _y + randint(-3, 3))
    }
}
function updateHUD () {
    if (!(bool_isGameOver)) {
        text_timer.setText(convertToText(Math.round(game.runtime() / 1000)))
    }
    if (num_currentMoneyAdd > 0) {
        num_currentMoney += 1
        num_currentMoneyAdd += -1
        text_money.setText(convertToText(num_currentMoney))
    }
    if (!(_bool_isHealthAnimating)) {
        if (num_currentHealth == 1) {
            animation.runImageAnimation(
            sprite_hudHealth,
            [img`
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ...ccccc.ccccc..................................
                ..cc677ccc677cc.................................
                .cc67dd7c67dd7cc................................
                .c6777dd7777dd7c.....ccccccc.........ccccccc....
                .c67777d77777d7c....ccbbcbbcc.......ccbbcbbcc...
                .c6777777777777c....cbccbccbc.......cbccbccbc...
                .c6777777777777c....cbcccccbc.......cbcccccbc...
                .cc67777777777cc....ccbcccbcc.......ccbcccbcc...
                ..cc677777777cc......ccbcbcc.........ccbcbcc....
                ...cc6777777cc........ccbcc...........ccbcc.....
                ....cc67777cc..........ccc.............ccc......
                .....cc677cc....................................
                ......cc6cc.....................................
                .......ccc......................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                `],
            500,
            false
            )
        } else if (num_currentHealth == 2) {
            animation.runImageAnimation(
            sprite_hudHealth,
            [img`
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ...ccccc.ccccc.....ccccc.ccccc..................
                ..cc677ccc677cc...cc677ccc677cc.................
                .cc67dd7c67dd7cc.cc67dd7c67dd7cc................
                .c6777dd7777dd7c.c6777dd7777dd7c.....ccccccc....
                .c67777d77777d7c.c67777d77777d7c....ccbbcbbcc...
                .c6777777777777c.c6777777777777c....cbccbccbc...
                .c6777777777777c.c6777777777777c....cbcccccbc...
                .cc67777777777cc.cc67777777777cc....ccbcccbcc...
                ..cc677777777cc...cc677777777cc......ccbcbcc....
                ...cc6777777cc.....cc6777777cc........ccbcc.....
                ....cc67777cc.......cc67777cc..........ccc......
                .....cc677cc.........cc677cc....................
                ......cc6cc...........cc6cc.....................
                .......ccc.............ccc......................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                `],
            500,
            false
            )
        } else if (num_currentHealth == 3) {
            animation.runImageAnimation(
            sprite_hudHealth,
            [img`
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ...ccccc.ccccc.....ccccc.ccccc.....ccccc.ccccc..
                ..cc677ccc677cc...cc677ccc677cc...cc677ccc677cc.
                .cc67dd7c67dd7cc.cc67dd7c67dd7cc.cc67dd7c67dd7cc
                .c6777dd7777dd7c.c6777dd7777dd7c.c6777dd7777dd7c
                .c67777d77777d7c.c67777d77777d7c.c67777d77777d7c
                .c6777777777777c.c6777777777777c.c6777777777777c
                .c6777777777777c.c6777777777777c.c6777777777777c
                .cc67777777777cc.cc67777777777cc.cc67777777777cc
                ..cc677777777cc...cc677777777cc...cc677777777cc.
                ...cc6777777cc.....cc6777777cc.....cc6777777cc..
                ....cc67777cc.......cc67777cc.......cc67777cc...
                .....cc677cc.........cc677cc.........cc677cc....
                ......cc6cc...........cc6cc...........cc6cc.....
                .......ccc.............ccc.............ccc......
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                `],
            500,
            false
            )
        }
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    playerInteract()
})
function createBats () {
    for (let value of tiles.getTilesByType(assets.tile`myTile55`)) {
        if (isInView(value.x, value.y, sprite_cameraControl)) {
            sprite_bat = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . c c c . c c c . . . . . 
                . . . c c b c . c b c c c . . . 
                . . c b c c c c c c c b c c . . 
                . . c b c b c b c b c b c c . . 
                . c b c c b c b c b c c b c . . 
                c c b c b c b b b c b c b c c . 
                c b c c b c b b b c b c c b c . 
                c d c b c b b b b b c b c d c . 
                c c c b c c c c c c c b c c c . 
                . . c d c . . . . . c d c . . . 
                `, SpriteKind.Enemy)
            sprite_bat.z = 100
            tiles.placeOnTile(sprite_bat, value)
            sprites.setDataNumber(sprite_bat, "data_health", 2)
            sprites.setDataString(sprite_bat, "data_type", "bat")
            sprite_bat.setFlag(SpriteFlag.Ghost, true)
        }
    }
}
function checkEnemyRoomFinished () {
    if (_bool_isEnemyRoom && (sprites.allOfKind(SpriteKind.Enemy).length == 0 && sprites.allOfKind(SpriteKind.BatSleeping).length == 0 && sprites.allOfKind(SpriteKind.EnemyHurt).length == 0)) {
        _bool_isEnemyRoom = false
        completeLevel()
        openDoorsInView()
    }
}
function createSmokePosition (_x: number, _y: number) {
    _sprite_debris = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . b b b b b b . . . . . . 
        . . b b b d d d d b b b b b b . 
        . b b d d d d d d d d d d d b . 
        . b d d d d d d d d d d d d b b 
        b d d d d b d b d d d d d b d b 
        b d d d d d b d b d d d b d b b 
        b b d d d d d d d d b b d b b b 
        b b b b d b d b d b b d b b b b 
        . b b b b d b d b d b b b b b . 
        . . b b b b b b b b b b b b b . 
        . . . b b b b b b b b b b b . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Dummy)
    animation.runImageAnimation(
    _sprite_debris,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . b b b b b b . . . . . . 
        . . b b b d d d d b b b b b b . 
        . b b d d d d d d d d d d d b . 
        . b d d d d d d d d d d d d b b 
        b d d d d b d b d d d d d b d b 
        b d d d d d b d b d d d b d b b 
        b b d d d d d d d d b b d b b b 
        b b b b d b d b d b b d b b b b 
        . b b b b d b d b d b b b b b . 
        . . b b b b b b b b b b b b b . 
        . . . b b b b b b b b b b b . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . b b b . . . . . . 
        . . . . b . b b d b b . . b . . 
        . b . . . . b d b d b . . . . . 
        . . b b b b b b d b b b b b b . 
        . b b d d b b b b b b d d d b . 
        . b d d d d b . b b d d d d b b 
        b d d d d d b b b d d d d b d b 
        b d d b d b b b b d b d b d b b 
        b b b d b d b b b b d b d b d b 
        b b b b d b b . . b b d b b b b 
        . . b b b b . b . b b b b b b . 
        . . . . . . . . . . . b b b b . 
        . . b . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . b . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . b . . . . 
        b . . . b . . b b b . . b . . . 
        . . . b . b . b d b . . . . . . 
        . . . . . . . b b b b b b b b . 
        . b b b . . . . . b b d d d b b 
        . b d b b . . . b b d b d b b b 
        b d d d b b . . . b b d b d b b 
        b d b d d b . b . . b b b b b b 
        b b d b b b . b . . . b . b . . 
        . b b b . . . . b . . . b . . . 
        . . . . . . b . . . . . . . . . 
        . b . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . b . . . . . . . 
        . . . . . . b . . b . . . . . . 
        . . . . . . . . b . . . . . . . 
        . . . . . . . . . . . . b . . . 
        . b . b . . . . . b . . . b b . 
        . . b . . . . . . . . . b . . . 
        . b . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . b . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    150,
    false
    )
    _sprite_debris.lifespan = 750
    _sprite_debris.vy = -5
    _sprite_debris.setPosition(_x, _y)
    music.play(music.createSoundEffect(
    WaveShape.Noise,
    1,
    135,
    40,
    0,
    10,
    SoundExpressionEffect.None,
    InterpolationCurve.Linear
    ), music.PlaybackMode.InBackground)
    timer.after(10, function () {
        music.play(music.createSoundEffect(WaveShape.Noise, 135, 1, 40, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    })
}
scene.onOverlapTile(SpriteKind.Sword, assets.tile`BigPot`, function (sprite, location) {
    destroyBarrel(location.column, location.row)
})
function endGame (_column: number, _row: number) {
    controller.moveSprite(sprite_player, 0, 0)
    _sprite_lever = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Dummy)
    _num_finalTime = game.runtime() / 1000
    bool_isGameOver = true
    bool_isPlayerFrozen = true
    tiles.setTileAt(tiles.getTileLocation(_column, _row), assets.tile`Empty6`)
    animation.runImageAnimation(
    _sprite_lever,
    [img`
        6 6 6 6 7 7 c 7 7 c 7 7 6 6 6 6 
        6 7 7 7 7 c 7 d d 7 c 7 7 7 7 6 
        6 7 7 7 7 c 7 d d 7 c 7 7 7 7 6 
        6 6 7 7 7 c d 7 7 d c 7 7 7 6 6 
        c c c c c c c d d c c c c c c c 
        c c c c c c c c c c c c c c c c 
        c 7 7 c c c c c c c c c c 7 7 c 
        c 6 c 7 7 7 7 7 7 7 7 7 7 c 6 c 
        c 6 d 6 6 6 6 6 6 6 6 6 6 d 6 c 
        c 6 b b c c c c c c c c b b 6 c 
        c c 6 b c c c c c c c c b 6 c c 
        c c 6 c c c c c c c c c c 6 c c 
        c c 6 c c c c c c c c c c 6 c c 
        6 6 6 6 c c c c c c c c 6 6 6 6 
        c c c 6 6 6 6 6 6 6 6 6 6 c c c 
        c c c c c c c c c c c c c c c c 
        `,img`
        6 6 6 6 7 7 c 7 7 c 7 7 6 6 6 6 
        6 7 7 7 7 c 7 d d 7 c 7 7 7 7 6 
        6 7 7 7 7 c 7 d d 7 c 7 7 7 7 6 
        6 6 7 7 7 c d 7 7 d c 7 7 7 6 6 
        c c c c c c c d d c c c c c c c 
        c c c c c c c c c c c c c c c c 
        c 7 6 c c c c c c c c c c 6 7 c 
        c 6 c c c c c c c c c c c c 6 c 
        c 6 c 7 7 7 7 7 7 7 7 7 7 c 6 c 
        c 6 d 7 7 7 7 7 7 7 7 7 7 d 6 c 
        c c b 6 6 6 6 6 6 6 6 6 6 b c c 
        c c 6 c c c c c c c c c c 6 c c 
        c c 6 c c c c c c c c c c 6 c c 
        6 6 6 6 c c c c c c c c 6 6 6 6 
        c c c 6 6 6 6 6 6 6 6 6 6 c c c 
        c c c c c c c c c c c c c c c c 
        `,img`
        6 6 6 6 7 7 c 7 7 c 7 7 6 6 6 6 
        6 7 7 7 7 c 7 d d 7 c 7 7 7 7 6 
        6 7 7 7 7 c 7 d d 7 c 7 7 7 7 6 
        6 6 7 7 7 c d 7 7 d c 7 7 7 6 6 
        c c c c c c c d d c c c c c c c 
        c c c c c c c c c c c c c c c c 
        c 7 6 c c c c c c c c c c 6 7 c 
        c 6 c c c c c c c c c c c c 6 c 
        c 6 c 7 7 7 7 7 7 7 7 7 7 c 6 c 
        c 6 d 7 7 7 7 7 7 7 7 7 7 d 6 c 
        c c b 6 6 6 6 6 6 6 6 6 6 b c c 
        c c 6 c c c c c c c c c c 6 c c 
        c c 6 c c c c c c c c c c 6 c c 
        6 6 6 6 c c c c c c c c 6 6 6 6 
        c c c 6 6 6 6 6 6 6 6 6 6 c c c 
        c c c c c c c c c c c c c c c c 
        `,img`
        6 6 6 6 7 7 c 7 7 c 7 7 6 6 6 6 
        6 7 7 7 7 c 7 d d 7 c 7 7 7 7 6 
        6 7 7 7 7 c 7 d d 7 c 7 7 7 7 6 
        6 6 7 7 7 c d 7 7 d c 7 7 7 6 6 
        c c c c c c c d d c c c c c c c 
        c c c c c c c c c c c c c c c c 
        c 7 7 7 7 7 7 7 7 7 7 7 7 7 7 c 
        c 6 c c c c c c c c c c c c 6 c 
        c 6 c c c c c c c c c c c c 6 c 
        c 6 c d c c c c c c c c d c 6 c 
        c c d 7 7 7 7 7 7 7 7 7 7 d c c 
        c c b 6 6 6 6 6 6 6 6 6 6 b c c 
        c c 6 c c c c c c c c c c 6 c c 
        6 6 6 6 c c c c c c c c 6 6 6 6 
        c c c 6 6 6 6 6 6 6 6 6 6 c c c 
        c c c c c c c c c c c c c c c c 
        `,img`
        6 6 6 6 7 7 c 7 7 c 7 7 6 6 6 6 
        6 7 7 7 7 c 7 d d 7 c 7 7 7 7 6 
        6 7 7 7 7 c 7 d d 7 c 7 7 7 7 6 
        6 6 7 7 7 c d 7 7 d c 7 7 7 6 6 
        c c c c c c c d d c c c c c c c 
        c c c c c c c c c c c c c c c c 
        c 7 7 7 7 7 7 7 7 7 7 7 7 7 7 c 
        c 6 c c c c c c c c c c c c 6 c 
        c 6 c c c c c c c c c c c c 6 c 
        c 6 c d c c c c c c c c d c 6 c 
        c c d 7 7 7 7 7 7 7 7 7 7 d c c 
        c c b 6 6 6 6 6 6 6 6 6 6 b c c 
        c c 6 c c c c c c c c c c 6 c c 
        6 6 6 6 c c c c c c c c 6 6 6 6 
        c c c 6 6 6 6 6 6 6 6 6 6 c c c 
        c c c c c c c c c c c c c c c c 
        `,img`
        6 6 6 6 7 7 c 7 7 c 7 7 6 6 6 6 
        6 7 7 7 7 c 7 d d 7 c 7 7 7 7 6 
        6 7 7 7 7 c 7 d d 7 c 7 7 7 7 6 
        6 6 7 7 7 c d 7 7 d c 7 7 7 6 6 
        c c c c c c c d d c c c c c c c 
        c c c c c c c c c c c c c c c c 
        c 7 7 7 7 7 7 7 7 7 7 7 7 7 7 c 
        c 6 c c c c c c c c c c c c 6 c 
        c 6 c c c c c c c c c c c c 6 c 
        c 6 c d c c c c c c c c d c 6 c 
        c c d 7 7 7 7 7 7 7 7 7 7 d c c 
        c c b 6 6 6 6 6 6 6 6 6 6 b c c 
        c c 6 c c c c c c c c c c 6 c c 
        6 6 6 6 c c c c c c c c 6 6 6 6 
        c c c 6 6 6 6 6 6 6 6 6 6 c c c 
        c c c c c c c c c c c c c c c c 
        `,img`
        6 6 6 6 7 7 c 7 7 c 7 7 6 6 6 6 
        6 7 7 7 7 c 7 d d 7 c 7 7 7 7 6 
        6 7 7 7 7 c 7 d d 7 c 7 7 7 7 6 
        6 6 7 7 7 c d 7 7 d c 7 7 7 6 6 
        c c c c c c c d d c c c c c c c 
        c c c c c c c c c c c c c c c c 
        c 7 7 7 7 7 7 7 7 7 7 7 7 7 7 c 
        c 6 c c c c c c c c c c c c 6 c 
        c 6 c c c c c c c c c c c c 6 c 
        c 6 c d c c c c c c c c d c 6 c 
        c c 6 d c c c c c c c c d 6 c c 
        c c 6 b 7 7 7 7 7 7 7 7 b 6 c c 
        c c 6 c 6 6 6 6 6 6 6 6 c 6 c c 
        6 6 6 6 c c c c c c c c 6 6 6 6 
        c c c 6 6 6 6 6 6 6 6 6 6 c c c 
        c c c c c c c c c c c c c c c c 
        `,img`
        6 6 6 6 7 7 c 7 7 c 7 7 6 6 6 6 
        6 7 7 7 7 c 7 d d 7 c 7 7 7 7 6 
        6 7 7 7 7 c 7 d d 7 c 7 7 7 7 6 
        6 6 7 7 7 c d 7 7 d c 7 7 7 6 6 
        c c c c c c c d d c c c c c c c 
        c c c c c c c c c c c c c c c c 
        c 7 7 7 7 7 7 7 7 7 7 7 7 7 7 c 
        c 6 c c c c c c c c c c c c 6 c 
        c 6 c c c c c c c c c c c c 6 c 
        c 6 c d c c c c c c c c d c 6 c 
        c c 6 d c c c c c c c c d 6 c c 
        c c 6 b 7 7 7 7 7 7 7 7 b 6 c c 
        c c 6 c 6 6 6 6 6 6 6 6 c 6 c c 
        6 6 6 6 c c c c c c c c 6 6 6 6 
        c c c 6 6 6 6 6 6 6 6 6 6 c c c 
        c c c c c c c c c c c c c c c c 
        `,img`
        6 6 6 6 7 7 c 7 7 c 7 7 6 6 6 6 
        6 7 7 7 7 c 7 d d 7 c 7 7 7 7 6 
        6 7 7 7 7 c 7 d d 7 c 7 7 7 7 6 
        6 6 7 7 7 c d 7 7 d c 7 7 7 6 6 
        c c c c c c c d d c c c c c c c 
        c c c c c c c c c c c c c c c c 
        c 7 7 7 7 7 7 7 7 7 7 7 7 7 7 c 
        c 6 c c c c c c c c c c c c 6 c 
        c 6 c c c c c c c c c c c c 6 c 
        c 6 c d c c c c c c c c d c 6 c 
        c c 6 d c c c c c c c c d 6 c c 
        c c 6 b 7 7 7 7 7 7 7 7 b 6 c c 
        c c 6 c 6 6 6 6 6 6 6 6 c 6 c c 
        6 6 6 6 c c c c c c c c 6 6 6 6 
        c c c 6 6 6 6 6 6 6 6 6 6 c c c 
        c c c c c c c c c c c c c c c c 
        `,img`
        6 6 6 6 7 7 c 7 7 c 7 7 6 6 6 6 
        6 7 7 7 7 c 7 d d 7 c 7 7 7 7 6 
        6 7 7 7 7 c 7 d d 7 c 7 7 7 7 6 
        6 6 7 7 7 c d 7 7 d c 7 7 7 6 6 
        c c c c c c c d d c c c c c c c 
        c c c c c c c c c c c c c c c c 
        c 7 7 7 7 7 7 7 7 7 7 7 7 7 7 c 
        c 6 c c c c c c c c c c c c 6 c 
        c 6 c c c c c c c c c c c c 6 c 
        c 6 c d c c c c c c c c d c 6 c 
        c c 6 d c c c c c c c c d 6 c c 
        c c 6 b 7 7 7 7 7 7 7 7 b 6 c c 
        c c 6 c 6 6 6 6 6 6 6 6 c 6 c c 
        6 6 6 6 c c c c c c c c 6 6 6 6 
        c c c 6 6 6 6 6 6 6 6 6 6 c c c 
        c c c c c c c c c c c c c c c c 
        `,img`
        6 6 6 6 7 7 c 7 7 c 7 7 6 6 6 6 
        6 7 7 7 7 c 7 d d 7 c 7 7 7 7 6 
        6 7 7 7 7 c 7 d d 7 c 7 7 7 7 6 
        6 6 7 7 7 c d 7 7 d c 7 7 7 6 6 
        c c c c c c c d d c c c c c c c 
        c c c c c c c c c c c c c c c c 
        c 7 7 7 7 7 7 7 7 7 7 7 7 7 7 c 
        c 6 c c c c c c c c c c c c 6 c 
        c 6 c c c c c c c c c c c c 6 c 
        c 6 c d c c c c c c c c d c 6 c 
        c c 6 d c c c c c c c c d 6 c c 
        c c 6 b 7 7 7 7 7 7 7 7 b 6 c c 
        c c 6 c 6 6 6 6 6 6 6 6 c 6 c c 
        6 6 6 6 c c c c c c c c 6 6 6 6 
        c c c 6 6 6 6 6 6 6 6 6 6 c c c 
        c c c c c c c c c c c c c c c c 
        `,img`
        6 6 6 6 7 7 c 7 7 c 7 7 6 6 6 6 
        6 7 7 7 7 c 7 d d 7 c 7 7 7 7 6 
        6 7 7 7 7 c 7 d d 7 c 7 7 7 7 6 
        6 6 7 7 7 c d 7 7 d c 7 7 7 6 6 
        c c c c c c c d d c c c c c c c 
        c c c c c c c c c c c c c c c c 
        c 7 7 7 7 7 7 7 7 7 7 7 7 7 7 c 
        c 6 c c c c c c c c c c c c 6 c 
        c 6 c c c c c c c c c c c c 6 c 
        c 6 c d c c c c c c c c d c 6 c 
        c c 6 d c c c c c c c c d 6 c c 
        c c 6 b 7 7 7 7 7 7 7 7 b 6 c c 
        c c 6 c 6 6 6 6 6 6 6 6 c 6 c c 
        6 6 6 6 c c c c c c c c 6 6 6 6 
        c c c 6 6 6 6 6 6 6 6 6 6 c c c 
        c c c c c c c c c c c c c c c c 
        `,img`
        6 6 6 6 7 7 c 7 7 c 7 7 6 6 6 6 
        6 7 7 7 7 c 7 d d 7 c 7 7 7 7 6 
        6 7 7 7 7 c 7 d d 7 c 7 7 7 7 6 
        6 6 7 7 7 c d 7 7 d c 7 7 7 6 6 
        c c c c c c c d d c c c c c c c 
        c c c c c c c c c c c c c c c c 
        c 7 7 7 7 7 7 7 7 7 7 7 7 7 7 c 
        c 6 c c c c c c c c c c c c 6 c 
        c 6 c c c c c c c c c c c c 6 c 
        c 6 c d c c c c c c c c d c 6 c 
        c c 6 d c c c c c c c c d 6 c c 
        c c 6 b 7 7 7 7 7 7 7 7 b 6 c c 
        c c 6 c 6 6 6 6 6 6 6 6 c 6 c c 
        6 6 6 6 c c c c c c c c 6 6 6 6 
        c c c 6 6 6 6 6 6 6 6 6 6 c c c 
        c c c c c c c c c c c c c c c c 
        `,img`
        6 6 6 6 7 7 c 7 7 c 7 7 6 6 6 6 
        6 7 7 7 7 c 7 d d 7 c 7 7 7 7 6 
        6 7 7 7 7 c 7 d d 7 c 7 7 7 7 6 
        6 6 7 7 7 c d 7 7 d c 7 7 7 6 6 
        c c c c c c c d d c c c c c c c 
        c c c c c c c c c c c c c c c c 
        c 7 7 7 7 7 7 7 7 7 7 7 7 7 7 c 
        c 6 c c c c c c c c c c c c 6 c 
        c 6 c c c c c c c c c c c c 6 c 
        c 6 c d c c c c c c c c d c 6 c 
        c c 6 d c c c c c c c c d 6 c c 
        c c 6 b 7 7 7 7 7 7 7 7 b 6 c c 
        c c 6 c 6 6 6 6 6 6 6 6 c 6 c c 
        6 6 6 6 c c c c c c c c 6 6 6 6 
        c c c 6 6 6 6 6 6 6 6 6 6 c c c 
        c c c c c c c c c c c c c c c c 
        `,img`
        6 6 6 6 7 7 c 7 7 c 7 7 6 6 6 6 
        6 7 7 7 7 c 7 d d 7 c 7 7 7 7 6 
        6 7 7 7 7 c 7 d d 7 c 7 7 7 7 6 
        6 6 7 7 7 c d 7 7 d c 7 7 7 6 6 
        c c c c c c c d d c c c c c c c 
        c c c c c c c c c c c c c c c c 
        c 7 7 7 7 7 7 7 7 7 7 7 7 7 7 c 
        c 6 c c c c c c c c c c c c 6 c 
        c 6 c c c c c c c c c c c c 6 c 
        c 6 c d c c c c c c c c d c 6 c 
        c c 6 d c c c c c c c c d 6 c c 
        c c 6 b 7 7 7 7 7 7 7 7 b 6 c c 
        c c 6 c 6 6 6 6 6 6 6 6 c 6 c c 
        6 6 6 6 c c c c c c c c 6 6 6 6 
        c c c 6 6 6 6 6 6 6 6 6 6 c c c 
        c c c c c c c c c c c c c c c c 
        `,img`
        6 6 6 6 6 6 c 6 6 c 6 6 6 6 6 6 
        6 7 7 7 6 c 6 c c 6 c 6 7 7 7 6 
        6 7 7 7 6 c 6 c c 6 c 6 7 7 7 6 
        6 6 6 6 6 c b 6 6 b c 6 6 6 6 6 
        c c c c c c c b b c c c c c c c 
        c c c c c c c c c c c c c c c c 
        c 6 6 6 6 6 6 6 6 6 6 6 6 6 6 c 
        c 6 c c c c c c c c c c c c 6 c 
        c 6 c c c c c c c c c c c c 6 c 
        c 6 c b c c c c c c c c b c 6 c 
        c c 6 b c c c c c c c c b 6 c c 
        c c 6 b b c c c c c c b b 6 c c 
        c c 6 c b 6 6 6 6 6 6 b c 6 c c 
        6 6 6 6 c 6 6 6 6 6 6 c 6 6 6 6 
        c c c 6 c c c c c c c c 6 c c c 
        c c c c c c c c c c c c c c c c 
        `],
    500,
    false
    )
    tiles.placeOnTile(_sprite_lever, tiles.getTileLocation(_column, _row))
    music.play(music.createSoundEffect(
    WaveShape.Noise,
    4169,
    5000,
    80,
    0,
    50,
    SoundExpressionEffect.None,
    InterpolationCurve.Curve
    ), music.PlaybackMode.InBackground)
    music.play(music.createSoundEffect(
    WaveShape.Square,
    98,
    98,
    0,
    100,
    7500,
    SoundExpressionEffect.None,
    InterpolationCurve.Curve
    ), music.PlaybackMode.InBackground)
    timer.after(7500, function () {
        music.play(music.createSoundEffect(
        WaveShape.Noise,
        5000,
        5000,
        40,
        0,
        50,
        SoundExpressionEffect.None,
        InterpolationCurve.Curve
        ), music.PlaybackMode.InBackground)
        music.play(music.createSoundEffect(
        WaveShape.Noise,
        4169,
        5000,
        40,
        0,
        50,
        SoundExpressionEffect.None,
        InterpolationCurve.Curve
        ), music.PlaybackMode.InBackground)
        music.play(music.createSoundEffect(
        WaveShape.Noise,
        5000,
        2978,
        40,
        0,
        50,
        SoundExpressionEffect.None,
        InterpolationCurve.Curve
        ), music.PlaybackMode.InBackground)
        for (let index = 0; index <= 4; index++) {
            for (let index2 = 0; index2 <= 6; index2++) {
                tiles.setTileAt(tiles.getTileLocation(52 + index2, 50 + index), assets.tile`Empty`)
            }
        }
        timer.after(500, function () {
            bool_isPlayerFrozen = false
            controller.moveSprite(sprite_player, 75, 75)
            tiles.setTileAt(tiles.getTileLocation(48, 52), assets.tile`myTile142`)
        })
    })
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile135`, function (sprite, location) {
    flipSwitch(assets.tile`myTile136`, assets.tile`myTile101`, assets.tile`myTile102`, assets.tile`myTile103`, location.column, location.row)
})
function wakeUpRobots () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (sprites.readDataString(value, "data_type") == "drone") {
            wakeUpDrone(value)
        } else {
            wakeUpBat(value)
        }
    }
}
function applyPalette () {
    color.setColor(1, palette_white)
    color.setColor(2, palette_colourDark)
    color.setColor(3, palette_colourLight)
    color.setColor(4, palette_colourDark)
    color.setColor(5, palette_white)
    color.setColor(6, palette_colourDark)
    color.setColor(7, palette_colourLight)
    color.setColor(8, palette_colourDark)
    color.setColor(9, palette_colourLight)
    color.setColor(10, palette_colourLight)
    color.setColor(11, palette_gray)
    color.setColor(12, palette_black)
    color.setColor(13, palette_white)
    color.setColor(14, palette_gray)
    color.setColor(15, palette_black)
}
function createDrones () {
    for (let value of tiles.getTilesByType(assets.tile`myTile0`)) {
        if (isInView(value.x, value.y, sprite_cameraControl)) {
            sprite_bat = sprites.create(assets.image`BatSleeping`, SpriteKind.Enemy)
            sprite_bat.z = 100
            tiles.placeOnTile(sprite_bat, value)
            sprites.setDataNumber(sprite_bat, "data_health", 1)
            sprites.setDataString(sprite_bat, "data_type", "drone")
            sprite_bat.setFlag(SpriteFlag.Ghost, true)
        }
    }
}
function flipSwitch (_switchDown: Image, _blockUp: Image, _blockMid: Image, _blockDown: Image, _column: number, _row: number) {
    tiles.setTileAt(tiles.getTileLocation(_column, _row), _switchDown)
    music.play(music.createSoundEffect(WaveShape.Noise, 3300, 330, 255, 81, 50, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    timer.after(100, function () {
        controller.moveSprite(sprite_player, 0, 0)
        bool_isPlayerFrozen = true
        timer.after(500, function () {
            scene.cameraShake(2, 500)
            music.play(music.createSoundEffect(WaveShape.Noise, 464, 419, 112, 40, 900, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            music.play(music.createSoundEffect(WaveShape.Noise, 196, 196, 85, 85, 900, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            music.play(music.createSoundEffect(WaveShape.Sawtooth, 1712, 1757, 23, 0, 800, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            for (let value of tiles.getTilesByType(_blockUp)) {
                tiles.setTileAt(value, _blockMid)
            }
            timer.after(500, function () {
                music.play(music.createSoundEffect(WaveShape.Noise, 2559, 1356, 255, 81, 25, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
                music.play(music.createSoundEffect(WaveShape.Noise, 286, 63, 184, 0, 150, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
                music.play(music.createSoundEffect(WaveShape.Triangle, 152, 63, 255, 0, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
                for (let value of tiles.getTilesByType(_blockMid)) {
                    tiles.setTileAt(value, _blockDown)
                    tiles.setWallAt(value, false)
                }
                timer.after(500, function () {
                    controller.moveSprite(sprite_player, 75, 75)
                    bool_isPlayerFrozen = false
                })
            })
        })
    })
}
function cat3Dialog (_cat3: Sprite) {
    if (!(bool_isNPCTalking)) {
        bool_isNPCTalking = true
        animation.runImageAnimation(
        _cat3,
        [img`
            . . . . . . . . . . . . . . . . 
            . c c c . . . . c c c . . . . . 
            . c d d c . . c d d c . . . . . 
            . c b d d c c d d b c . . . . . 
            . c b b d d b d b b c . . . . . 
            . c d d d d d d d d c . . . . . 
            . c d d d d d d d d c . . . . . 
            . c d c c d d d c c c . . . . . 
            . c b d d d b d d b c . . . . . 
            . c c d d b b b d c c . . . . . 
            . . c c c c c c c c c c c . . . 
            . . . c d d d d d d b d d c . . 
            . . . c d d d d b d c c d c . . 
            . . . c d c c d c c d d b c . . 
            . . . c c . c c . c c c c . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . c c c . . . . c c c . . . . . 
            . c d d c . . c d d c . . . . . 
            . c b d d c c d d b c . . . . . 
            . c b b d d b d b b c . . . . . 
            . c d d d d d d d d c . . . . . 
            . c d d d d d d d d c . . . . . 
            . c d c c d d d c c c . . . . . 
            . c b d d d b d d b c . . . . . 
            . c c d d b b b d c c c c . . . 
            . . c c c b b b c c b d d c . . 
            . . . c b c c c b b c c d c . . 
            . . . c d c c d c c d d b c . . 
            . . . c c . c c . c c c c . . . 
            . . . . . . . . . . . . . . . . 
            `],
        350,
        true
        )
        playCatNoise()
        if (num_lastDialogNPC4 == 0) {
            _num_dialogLength = 2500
            _cat3.sayText("Took you long enough...", _num_dialogLength, true)
            num_lastDialogNPC4 = 1
        } else if (num_lastDialogNPC4 == 1) {
            _num_dialogLength = 3500
            _cat3.sayText("The humidity in here has been horrible for my fur...", _num_dialogLength, true)
            num_lastDialogNPC4 = 2
        } else {
            _num_dialogLength = 2500
            _cat3.sayText("Thanks, I guess...", _num_dialogLength, true)
            num_lastDialogNPC4 = 0
        }
        timer.after(_num_dialogLength, function () {
            bool_isNPCTalking = false
            animation.runImageAnimation(
            _cat3,
            [img`
                . . . . . . . . . . . . . . . . 
                . c c c . . . . c c c . . . . . 
                . c d d c . . c d d c . . . . . 
                . c b d d c c d d b c . . . . . 
                . c b b d d b d b b c . . . . . 
                . c d d d d d d d d c . . . . . 
                . c d d d d d d d d c . . . . . 
                . c d c c d d d c c c . . . . . 
                . c b d d d b d d d c . . . . . 
                . c c d d b b b d c c . . . . . 
                . . c c c c c c c c c c c . . . 
                . . . c d d d d d d b d d c . . 
                . . . c d d d d b d c c d c . . 
                . . . c d c c d c c d d b c . . 
                . . . c c . c c . c c c c . . . 
                . . . . . . . . . . . . . . . . 
                `],
            200,
            false
            )
        })
    }
}
/**
 * NPC Funcs
 */
function createNPCInView () {
    bool_isNPCTalking = false
    for (let value of tiles.getTilesByType(assets.tile`myTile49`)) {
        if (isInView(value.x, value.y, sprite_cameraControl)) {
            sprite_NPC = sprites.create(assets.image`TutorialGuyo`, SpriteKind.NPC)
            sprites.setDataString(sprite_NPC, "data_type", "wizard")
            sprite_NPC.z = 100
            tiles.placeOnTile(sprite_NPC, value)
            if (bool_hasQuest) {
                sprite_questIcon = sprites.create(img`
                    . . . . c c c c c c c c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c b d d d d b c . . . . 
                    . . . . c c d d d d c c . . . . 
                    . . . . . c d d d d c . . . . . 
                    . . . . . c b d d b c . . . . . 
                    . . . . . c c d d c c . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . c c c c . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, SpriteKind.Quest)
                animation.runImageAnimation(
                sprite_questIcon,
                [img`
                    . . . . . . . . . . . . . . . . 
                    . . . . c c c c c c c c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c b d d d d b c . . . . 
                    . . . . c c d d d d c c . . . . 
                    . . . . . c d d d d c . . . . . 
                    . . . . . c b d d b c . . . . . 
                    . . . . . c c d d c c . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . c c c c . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . c c c c c c c c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c b d d d d b c . . . . 
                    . . . . c c d d d d c c . . . . 
                    . . . . . c b d d b c . . . . . 
                    . . . . . c c d d c c . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . c c b b c c . . . . . 
                    . . . . . c d d d d c . . . . . 
                    . . . . . c b b b b c . . . . . 
                    . . . . . c c c c c c . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . c c c c c c c c c c . . . 
                    . . . c d d d d d d d d c . . . 
                    . . . c d d d d d d d d c . . . 
                    . . . c b d d d d d d b c . . . 
                    . . . c c d d d d d d c c . . . 
                    . . . . c b d d d d b c . . . . 
                    . . . . c c b d d b c c . . . . 
                    . . . . . c c b b c c . . . . . 
                    . . . . . c d d d d c . . . . . 
                    . . . . . c b b b b c . . . . . 
                    . . . . . c c c c c c . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . c c c c c c c c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c b d d d d b c . . . . 
                    . . . . c c d d d d c c . . . . 
                    . . . . . c d d d d c . . . . . 
                    . . . . . c b d d b c . . . . . 
                    . . . . . c c d d c c . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . c c c c . . . . . . 
                    `,img`
                    . . . . . c d d d d c . . . . . 
                    . . . . . c d d d d c . . . . . 
                    . . . . . c d d d d c . . . . . 
                    . . . . . c d d d d c . . . . . 
                    . . . . . c d d d d c . . . . . 
                    . . . . . c d d d d c . . . . . 
                    . . . . . c b d d b c . . . . . 
                    . . . . . c c d d c c . . . . . 
                    . . . . . . c d d c c . . . . . 
                    . . . . . . c d d c c . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . c c c c . . . . . . 
                    `,img`
                    . . . . c c c c c c c c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c b d d d d b c . . . . 
                    . . . . c c d d d d c c . . . . 
                    . . . . . c d d d d c . . . . . 
                    . . . . . c b d d b c . . . . . 
                    . . . . . c c d d c c . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . c c c c . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . c c c c c c c c c c . . . 
                    . . . c d d d d d d d d c . . . 
                    . . . c d d d d d d d d c . . . 
                    . . . c b d d d d d d b c . . . 
                    . . . c c d d d d d d c c . . . 
                    . . . . c b d d d d b c . . . . 
                    . . . . c c d d d d c c . . . . 
                    . . . . . c b d d b c . . . . . 
                    . . . . . c c b b c c . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . c c c c . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . c c c c c c c c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c b d d d d b c . . . . 
                    . . . . c c d d d d c c . . . . 
                    . . . . . c d d d d c . . . . . 
                    . . . . . c b d d b c . . . . . 
                    . . . . . c c d d c c . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . c c c c . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . c c c c c c c c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c b d d d d b c . . . . 
                    . . . . c c d d d d c c . . . . 
                    . . . . . c d d d d c . . . . . 
                    . . . . . c b d d b c . . . . . 
                    . . . . . c c d d c c . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . c c c c . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . c c c c c c c c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c b d d d d b c . . . . 
                    . . . . c c d d d d c c . . . . 
                    . . . . . c b d d b c . . . . . 
                    . . . . . c c d d c c . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . c c c c . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . c c c c c c c c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c b d d d d b c . . . . 
                    . . . . c c d d d d c c . . . . 
                    . . . . . c d d d d c . . . . . 
                    . . . . . c b d d b c . . . . . 
                    . . . . . c c d d c c . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . c c c c . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . c c c c c c c c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c b d d d d b c . . . . 
                    . . . . c c d d d d c c . . . . 
                    . . . . . c d d d d c . . . . . 
                    . . . . . c b d d b c . . . . . 
                    . . . . . c c d d c c . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . c c c c . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . c c c c c c c c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c b d d d d b c . . . . 
                    . . . . c c d d d d c c . . . . 
                    . . . . . c d d d d c . . . . . 
                    . . . . . c b d d b c . . . . . 
                    . . . . . c c d d c c . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . c c c c . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . c c c c c c c c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c b d d d d b c . . . . 
                    . . . . c c d d d d c c . . . . 
                    . . . . . c d d d d c . . . . . 
                    . . . . . c b d d b c . . . . . 
                    . . . . . c c d d c c . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . c c c c . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . c c c c c c c c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c b d d d d b c . . . . 
                    . . . . c c d d d d c c . . . . 
                    . . . . . c d d d d c . . . . . 
                    . . . . . c b d d b c . . . . . 
                    . . . . . c c d d c c . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . c c c c . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . c c c c c c c c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c b d d d d b c . . . . 
                    . . . . c c d d d d c c . . . . 
                    . . . . . c d d d d c . . . . . 
                    . . . . . c b d d b c . . . . . 
                    . . . . . c c d d c c . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . c c c c . . . . . . 
                    `],
                100,
                true
                )
                sprite_questIcon.z = 101
                tiles.placeOnTile(sprite_questIcon, value)
                sprite_questIcon.y += -16
            }
        }
    }
    if (num_winCondition == 0) {
        for (let value of tiles.getTilesByType(assets.tile`myTile60`)) {
            if (isInView(value.x, value.y, sprite_cameraControl)) {
                sprite_NPC = sprites.create(assets.image`CatNpclol`, SpriteKind.NPC)
                sprites.setDataString(sprite_NPC, "data_type", "cat1")
                sprite_NPC.z = 100
                tiles.placeOnTile(sprite_NPC, value)
            }
        }
    }
    if (num_winCondition == 1) {
        for (let value of tiles.getTilesByType(assets.tile`myTile85`)) {
            if (isInView(value.x, value.y, sprite_cameraControl)) {
                sprite_NPC = sprites.create(img`
                    . . . . . . . . . . . . . . . . 
                    . c c c . . . . c c c . . . . . 
                    . c d d c . . c d d c . . . . . 
                    . c b d d c c d d b c . . . . . 
                    . c b b d d b d b b c . . . . . 
                    . c d d d d d d d d c . . . . . 
                    . c d d c d c d d d c . . . . . 
                    . c c c d d d c c d c . . . . . 
                    . c b d d b d d d b c . . . c c 
                    . c c d b b b d d c c . . c d c 
                    . . c c c c c c c c c c c c d c 
                    . . . c d d d d d d b d d d c . 
                    . . . c d d d d b d d c c c . . 
                    . . . c d c c d c c d c . . . . 
                    . . . c c . c c . . c c . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, SpriteKind.NPC)
                sprites.setDataString(sprite_NPC, "data_type", "cat2")
                sprite_NPC.z = 100
                tiles.placeOnTile(sprite_NPC, value)
            }
        }
    }
    if (num_winCondition == 2) {
        for (let value of tiles.getTilesByType(assets.tile`myTile86`)) {
            if (isInView(value.x, value.y, sprite_cameraControl)) {
                sprite_NPC = sprites.create(img`
                    . . . . . . . . . . . . . . . . 
                    . c c c . . . . c c c . . . . . 
                    . c d d c . . c d d c . . . . . 
                    . c b d d c c d d b c . . . . . 
                    . c b b d d b d b b c . . . . . 
                    . c d d d d d d d d c . . . . . 
                    . c d d d d d d d d c . . . . . 
                    . c d c c d d d c c c . . . . . 
                    . c b d d d b d d d c . . . . . 
                    . c c d d b b b d c c . . . . . 
                    . . c c c c c c c c c c c . . . 
                    . . . c d d d d d d b d d c . . 
                    . . . c d d d d b d c c d c . . 
                    . . . c d c c d c c d d b c . . 
                    . . . c c . c c . c c c c . . . 
                    . . . . . . . . . . . . . . . . 
                    `, SpriteKind.NPC)
                sprites.setDataString(sprite_NPC, "data_type", "cat3")
                sprite_NPC.z = 100
                tiles.placeOnTile(sprite_NPC, value)
            }
        }
    }
    if (num_winCondition > 0) {
        for (let value of tiles.getTilesByType(assets.tile`myTile20`)) {
            if (isInView(value.x, value.y, sprite_cameraControl)) {
                sprite_NPC = sprites.create(assets.image`CatNpclol`, SpriteKind.NPC)
                sprites.setDataString(sprite_NPC, "data_type", "cat1")
                sprite_NPC.z = 100
                tiles.placeOnTile(sprite_NPC, value)
                tiles.setWallAt(value, true)
            }
        }
    }
    if (num_winCondition > 1) {
        for (let value of tiles.getTilesByType(assets.tile`myTile61`)) {
            if (isInView(value.x, value.y, sprite_cameraControl)) {
                sprite_NPC = sprites.create(img`
                    . . . . . . . . . . . . . . . . 
                    . c c c . . . . c c c . . . . . 
                    . c d d c . . c d d c . . . . . 
                    . c b d d c c d d b c . . . . . 
                    . c b b d d b d b b c . . . . . 
                    . c d d d d d d d d c . . . . . 
                    . c d d c d c d d d c . . . . . 
                    . c c c d d d c c d c . . . . . 
                    . c b d d b d d d b c . . . c c 
                    . c c d b b b d d c c . . c d c 
                    . . c c c c c c c c c c c c d c 
                    . . . c d d d d d d b d d d c . 
                    . . . c d d d d b d d c c c . . 
                    . . . c d c c d c c d c . . . . 
                    . . . c c . c c . . c c . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, SpriteKind.NPC)
                sprites.setDataString(sprite_NPC, "data_type", "cat2")
                sprite_NPC.z = 100
                tiles.placeOnTile(sprite_NPC, value)
                tiles.setWallAt(value, true)
            }
        }
    }
    if (num_winCondition > 2) {
        for (let value of tiles.getTilesByType(assets.tile`myTile69`)) {
            if (isInView(value.x, value.y, sprite_cameraControl)) {
                sprite_NPC = sprites.create(img`
                    . . . . . . . . . . . . . . . . 
                    . c c c . . . . c c c . . . . . 
                    . c d d c . . c d d c . . . . . 
                    . c b d d c c d d b c . . . . . 
                    . c b b d d b d b b c . . . . . 
                    . c d d d d d d d d c . . . . . 
                    . c d d d d d d d d c . . . . . 
                    . c d c c d d d c c c . . . . . 
                    . c b d d d b d d d c . . . . . 
                    . c c d d b b b d c c . . . . . 
                    . . c c c c c c c c c c c . . . 
                    . . . c d d d d d d b d d c . . 
                    . . . c d d d d b d c c d c . . 
                    . . . c d c c d c c d d b c . . 
                    . . . c c . c c . c c c c . . . 
                    . . . . . . . . . . . . . . . . 
                    `, SpriteKind.NPC)
                sprites.setDataString(sprite_NPC, "data_type", "cat3")
                sprite_NPC.z = 100
                tiles.placeOnTile(sprite_NPC, value)
                tiles.setWallAt(value, true)
            }
        }
    }
}
sprites.onOverlap(SpriteKind.camera, SpriteKind.camera, function (sprite, otherSprite) {
    cameraTransitionEnd()
})
function pickupHeart (_pickup: Sprite, _player: Sprite) {
    if (num_currentHealth < 3) {
        _pickup.setFlag(SpriteFlag.Ghost, true)
        _pickup.z = 300
        _pickup.lifespan = 200
        animation.runImageAnimation(
        _pickup,
        [img`
            . c c . c c . 
            c 7 7 c 7 7 c 
            c 7 7 7 7 7 c 
            c 6 7 7 7 6 c 
            . c 6 7 6 c . 
            . . c 6 c . . 
            . . . c . . . 
            `,img`
            . . . . . . . 
            . c c . c c . 
            c 7 7 c 7 7 c 
            c 7 7 7 7 7 c 
            c 6 7 7 7 6 c 
            . c 6 6 6 c . 
            . . c c c . . 
            `,img`
            . . . . . . . 
            . . . . . . . 
            c c c . c c c 
            c 7 7 c 7 7 c 
            c 6 7 7 7 6 c 
            c 6 6 6 6 6 c 
            . c c c c c . 
            `,img`
            . . . . . . . 
            . . . . . . . 
            c c c . c c c 
            c 7 7 c 7 7 c 
            c 7 7 7 7 7 c 
            c 6 6 7 6 6 c 
            c c c c c c c 
            `,img`
            . . . . . . . 
            . . . . . . . 
            c c c . c c c 
            c 7 7 c 7 7 c 
            c 6 7 7 7 6 c 
            c 6 6 6 6 6 c 
            . c c c c c . 
            `,img`
            . c c c c c . 
            . c 7 c 7 c . 
            . c 7 7 7 c . 
            . c 7 7 7 c . 
            . c 6 7 6 c . 
            . . c 6 c . . 
            . . c c c . . 
            `,img`
            . . . c . . . 
            . . c 7 c . . 
            . . c 7 c . . 
            . . c 6 c . . 
            . . . c . . . 
            . . . . . . . 
            . . . . . . . 
            `],
        30,
        false
        )
        music.play(music.createSoundEffect(WaveShape.Sine, 1222, 1, 121, 170, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
        if (num_currentHealth < 3) {
            num_currentHealth += 1
        }
        timer.after(100, function () {
            music.play(music.createSoundEffect(
            WaveShape.Sine,
            1,
            3226,
            121,
            170,
            100,
            SoundExpressionEffect.None,
            InterpolationCurve.Linear
            ), music.PlaybackMode.InBackground)
            _pickup.vy = -50
            timer.after(100, function () {
                music.play(music.createSoundEffect(
                WaveShape.Sine,
                3226,
                3226,
                170,
                0,
                100,
                SoundExpressionEffect.None,
                InterpolationCurve.Linear
                ), music.PlaybackMode.InBackground)
            })
        })
    } else {
        animation.runImageAnimation(
        _pickup,
        [img`
            . c c c c c . 
            . c 7 c 7 c . 
            . c 7 7 7 c . 
            . c 7 7 7 c . 
            . c 6 7 6 c . 
            . . c 6 c . . 
            . . . c . . . 
            `,img`
            . c c c c c . 
            . c 7 c 7 c . 
            . c 7 7 7 c . 
            . c 7 7 7 c . 
            . c 6 7 6 c . 
            . . c 6 c . . 
            . . . c . . . 
            `,img`
            . c c c c c . 
            . c 7 c 7 c . 
            . c 7 7 7 c . 
            . c 7 7 7 c . 
            . c 6 7 6 c . 
            . . c 6 c . . 
            . . . c . . . 
            `,img`
            . c c c c c . 
            . c 7 c 7 c . 
            . c 7 7 7 c . 
            . c 7 7 7 c . 
            . c 6 7 6 c . 
            . . c 6 c . . 
            . . . c . . . 
            `,img`
            . c c c c c . 
            . c 7 c 7 c . 
            . c 7 7 7 c . 
            . c 7 7 7 c . 
            . c 6 7 6 c . 
            . . c 6 c . . 
            . . . c . . . 
            `,img`
            . . . . . . . 
            . c c . c c . 
            c 7 7 c 7 7 c 
            c 7 7 7 7 7 c 
            c 6 7 7 7 6 c 
            . c 6 6 6 c . 
            . . c c c . . 
            `,img`
            . . . . . . . 
            . . . . . . . 
            c c c . c c c 
            c 7 7 c 7 7 c 
            c 6 7 7 7 6 c 
            c 6 6 6 6 6 c 
            . c c c c c . 
            `,img`
            . . . . . . . 
            . . . . . . . 
            c c c . c c c 
            c 7 7 c 7 7 c 
            c 6 7 7 7 6 c 
            c 6 6 6 6 6 c 
            . c c c c c . 
            `,img`
            . . . . . . . 
            . . . . . . . 
            c c c . c c c 
            c 7 7 c 7 7 c 
            c 6 7 7 7 6 c 
            c 6 6 6 6 6 c 
            . c c c c c . 
            `,img`
            . . . . . . . 
            . c c . c c . 
            c 7 7 c 7 7 c 
            c 7 7 7 7 7 c 
            c 6 7 7 7 6 c 
            . c 6 6 6 c . 
            . . c c c . . 
            `,img`
            . c c . c c . 
            c 7 7 c 7 7 c 
            c 7 7 7 7 7 c 
            c 6 7 7 7 6 c 
            . c 6 7 6 c . 
            . . c 6 c . . 
            . . . c . . . 
            `,img`
            . c c . c c . 
            c 7 7 c 7 7 c 
            c 7 7 7 7 7 c 
            c 6 7 7 7 6 c 
            . c 6 7 6 c . 
            . . c 6 c . . 
            . . . c . . . 
            `,img`
            . . . . . . . 
            . c c . c c . 
            c 7 7 c 7 7 c 
            c 7 7 7 7 7 c 
            c 6 7 7 7 6 c 
            . c 6 6 6 c . 
            . . c c c . . 
            `,img`
            . . . . . . . 
            . c c . c c . 
            c 7 7 c 7 7 c 
            c 7 7 7 7 7 c 
            c 6 7 7 7 6 c 
            . c 6 6 6 c . 
            . . c c c . . 
            `,img`
            . . . . . . . 
            . c c . c c . 
            c 7 7 c 7 7 c 
            c 7 7 7 7 7 c 
            c 6 7 7 7 6 c 
            . c 6 6 6 c . 
            . . c c c . . 
            `,img`
            . c c . c c . 
            c 7 7 c 7 7 c 
            c 7 7 7 7 7 c 
            c 6 7 7 7 6 c 
            . c 6 7 6 c . 
            . . c 6 c . . 
            . . . c . . . 
            `],
        50,
        false
        )
        music.play(music.createSoundEffect(WaveShape.Sine, 419, 1, 36, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
        knockback(_pickup, _player, 75, 200)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    playerAttack()
})
function droneAttack (_drone: Sprite) {
    sprites.setDataNumber(_drone, "data_lastAttackHealth", sprites.readDataNumber(_drone, "data_health"))
    animation.runImageAnimation(
    _drone,
    [img`
        . . . . c c c c c c . . . . . . 
        . . . c d d d d d c . c c . . . 
        . . c b b b d c d c c b b c . . 
        c c c c c c c b c b b d d d c . 
        c d d d d d b c c c d d d d c . 
        . c d d d d b c c c c c d c . . 
        . . c c d b b c c c c c c . . . 
        . . . c c c c c c c c c . . . . 
        . . . c b c c c c b b c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . c b c c c c c b c . . . . 
        . . . c b 7 6 6 6 7 b c . . . . 
        . . . c b 7 6 6 6 7 b c . . . . 
        . . . c b c 7 7 7 c b c . . . . 
        . . . . c b c c c b c . . . . . 
        . . . . . c c c c c . . . . . . 
        `,img`
        . . . . c c c c c c c . . . . . 
        . . . c b b d d d d d c . . . . 
        c c c c c c b c d d c . . . . . 
        c d d d d d c b c c c c c c c . 
        c d d d d b c d d d b b b b c . 
        . c d d b b c c d d d d c c . . 
        . . c c b c c c c d d c c . . . 
        . . . c c c c c c c c c . . . . 
        . . . c b c c c c c b c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . c b c c c c c b c . . . . 
        . . . c b 7 6 6 6 7 b c . . . . 
        . . . c b 7 6 6 6 7 b c . . . . 
        . . . c b c 7 7 7 c b c . . . . 
        . . . . c b c c c b c . . . . . 
        . . . . . c c c c c . . . . . . 
        `,img`
        . . . . c c c . c c c . . . . . 
        . . c c d d c . c b b c c . . . 
        . c d d d d d c c b d d d c . . 
        c b b b b b c b c c d d d d c . 
        c c c c c d d d b b c c c c c . 
        . . . c d d d d d b b c . . . . 
        . . c d d d d d d d b c . . . . 
        . . . c c c c c c c c c . . . . 
        . . . c b c c c c c b c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . c b c c c c c b c . . . . 
        . . . c b 7 6 6 6 7 b c . . . . 
        . . . c b 7 7 6 7 7 b c . . . . 
        . . . c b c 7 7 7 c b c . . . . 
        . . . . c b c c c b c . . . . . 
        . . . . . c c c c c . . . . . . 
        `,img`
        . . . . c c c c c c c . . . . . 
        . . . c b b d d d d d c . . . . 
        c c c c c c b c d d c . . . . . 
        c d d d d d c b c c c c c c c . 
        c d d d d b c d d d b b b b c . 
        . c d d b b c c d d d d c c . . 
        . . c c b c c c c d d c c . . . 
        . . . c c c c c c c c c . . . . 
        . . . c b c c c c c b c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . c b c c c c c b c . . . . 
        . . . c b 7 6 6 6 7 b c . . . . 
        . . . c b 7 7 6 7 7 b c . . . . 
        . . . c b c 7 7 7 c b c . . . . 
        . . . . c b c c c b c . . . . . 
        . . . . . c c c c c . . . . . . 
        `,img`
        . . . . c c c c c c . . . . . . 
        . . . c d d d d d c . c c . . . 
        . . c b b b d c d c c b b c . . 
        c c c c c c c b c b b d d d c . 
        c d d d d d b c c c d d d d c . 
        . c d d d d b c c c c c d c . . 
        . . c c d b b c c c c c c . . . 
        . . . c c c c c c c c c . . . . 
        . . . c b b c c c b b c . . . . 
        . . . c b c c c c c b c . . . . 
        . . . c b 7 7 6 7 7 b c . . . . 
        . . . c b 7 6 6 6 7 b c . . . . 
        . . . c b 7 7 6 7 7 b c . . . . 
        . . . c b c 7 7 7 c b c . . . . 
        . . . . c b c c c b c . . . . . 
        . . . . . c c c c c . . . . . . 
        `,img`
        . . . . c . . . c c c . . . . . 
        . . c c d c c c b d d c c . . . 
        . c d d d d c c b d d d d c . . 
        c d d d b b c b c c c d d d c . 
        c b b b c c d d b b c c c c c . 
        . c c c c c d d d d b b c . . . 
        . . . c c d d d d d d c c . . . 
        . . . c c c c c c c c c . . . . 
        . . . c b b c c c b b c . . . . 
        . . . c b c c c c c b c . . . . 
        . . . c b 7 7 6 7 7 b c . . . . 
        . . . c b 7 6 6 6 7 b c . . . . 
        . . . c b 7 7 6 7 7 b c . . . . 
        . . . c b c 7 7 7 c b c . . . . 
        . . . . c b c c c b c . . . . . 
        . . . . . c c c c c . . . . . . 
        `,img`
        . . . . c c c c c c . . . . . . 
        . . . c d d d d d c . c c . . . 
        . . c b b b d c d c c b b c . . 
        c c c c c c c b c b b d d d c . 
        c d d d d d b c c c d d d d c . 
        . c d d d d b c c c c c d c . . 
        . . c c d b b c c c c c c . . . 
        . . . c c c c c c c c c . . . . 
        . . . c b b c c c b b c . . . . 
        . . . c b c c c c c b c . . . . 
        . . . c b 7 7 6 7 7 b c . . . . 
        . . . c b 7 6 6 6 7 b c . . . . 
        . . . c b 7 7 6 7 7 b c . . . . 
        . . . c b c 7 7 7 c b c . . . . 
        . . . . c b c c c b c . . . . . 
        . . . . . c c c c c . . . . . . 
        `,img`
        . . . . c c c c c c c . . . . . 
        . . . c b b d d d d d c . . . . 
        c c c c c c b c d d c . . . . . 
        c d d d d d c b c c c c c c c . 
        c d d d d b c d d d b b b b c . 
        . c d d b b c c d d d d c c . . 
        . . c c b c c c c d d c c . . . 
        . . . c c c c c c c c c . . . . 
        . . . c b b c c c b b c . . . . 
        . . . c b c 7 7 7 c b c . . . . 
        . . . c b 7 7 7 7 7 b c . . . . 
        . . . c b 7 7 6 7 7 b c . . . . 
        . . . c b 7 7 7 7 7 b c . . . . 
        . . . c b c 7 7 7 c b c . . . . 
        . . . . c b c c c b c . . . . . 
        . . . . . c c c c c . . . . . . 
        `,img`
        . . . . c c c . c c c . . . . . 
        . . c c d d c . c b b c c . . . 
        . c d d d d d c c b d d d c . . 
        c b b b b b c b c c d d d d c . 
        c c c c c d d d b b c c c c c . 
        . . . c d d d d d b b c . . . . 
        . . c d d d d d d d b c . . . . 
        . . . c c c c c c c c c . . . . 
        . . . c b b c c c b b c . . . . 
        . . . c b c 7 7 7 c b c . . . . 
        . . . c b 7 7 7 7 7 b c . . . . 
        . . . c b 7 7 6 7 7 b c . . . . 
        . . . c b 7 7 7 7 7 b c . . . . 
        . . . c b c 7 7 7 c b c . . . . 
        . . . . c b c c c b c . . . . . 
        . . . . . c c c c c . . . . . . 
        `,img`
        . . . . c c c c c c c . . . . . 
        . . . c b b d d d d d c . . . . 
        c c c c c c b c d d c . . . . . 
        c d d d d d c b c c c c c c c . 
        c d d d d b c d d d b b b b c . 
        . c d d b b c c d d d d c c . . 
        . . c c b c c c c d d c c . . . 
        . . . c c c c c c c c c . . . . 
        . . . c b b c c c b b c . . . . 
        . . . c b c 7 7 7 c b c . . . . 
        . . . c b 7 7 7 7 7 b c . . . . 
        . . . c b 7 7 6 7 7 b c . . . . 
        . . . c b 7 7 7 7 7 b c . . . . 
        . . . c b c 7 7 7 c b c . . . . 
        . . . c b b c c c b b c . . . . 
        . . . . c c c c c c c . . . . . 
        `,img`
        . . . . c c c . c c c . . . . . 
        . . c c d d c . c b b c c . . . 
        . c d d d d d c c b d d d c . . 
        c b b b b b c b c c d d d d c . 
        c c c c c d d d b b c c c c c . 
        . . . c d d d d d b b c . . . . 
        . . c d d d d d d d b c . . . . 
        . . . c c c c c c c c c . . . . 
        . . . c b c 7 7 7 c b c . . . . 
        . . . c b 7 7 7 7 7 b c . . . . 
        . . . c b 7 7 6 7 7 b c . . . . 
        . . . c b 7 7 7 7 7 b c . . . . 
        . . . c b c 7 7 7 c b c . . . . 
        . . . c b b c c c b b c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . . c c c c c c c . . . . . 
        `,img`
        . . . . c c c c c c c . . . . . 
        . . . c b b d d d d d c . . . . 
        c c c c c c b c d d c . . . . . 
        c d d d d d c b c c c c c c c . 
        c d d d d b c d d d b b b b c . 
        . c d d b b c c d d d d c c . . 
        . . c c b c c c c d d c c . . . 
        . . . c c c c c c c c c . . . . 
        . . . c b c 7 7 7 c b c . . . . 
        . . . c b 7 7 7 7 7 b c . . . . 
        . . . c b 7 7 6 7 7 b c . . . . 
        . . . c b 7 7 7 7 7 b c . . . . 
        . . . c b c 7 7 7 c b c . . . . 
        . . . c b b c c c b b c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . . c c c c c c c . . . . . 
        `,img`
        . . . . c c c c c c . . . . . . 
        . . . c d d d d d c . c c . . . 
        . . c b b b d c d c c b b c . . 
        c c c c c c c b c b b d d d c . 
        c d d d d d b c c c d d d d c . 
        . c d d d d b c c c c c d c . . 
        . . c c d b b c c c c c c . . . 
        . . . c c c c c c c c c . . . . 
        . . . c b c 7 7 7 c b c . . . . 
        . . . c b 7 7 7 7 7 b c . . . . 
        . . . c b 7 7 6 7 7 b c . . . . 
        . . . c b 7 7 7 7 7 b c . . . . 
        . . . c b c 7 7 7 c b c . . . . 
        . . . c b b c c c b b c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . . c c c c c c c . . . . . 
        `,img`
        . . . . c c c c c c . . . . . . 
        . . . c d d d d d c . c c . . . 
        . . c b b b d c d c c b b c . . 
        c c c c c c c b c b b d d d c . 
        c d d d d d b c c c d d d d c . 
        . c d d d d b c c c c c d c . . 
        . . c c d b b c c c c c c . . . 
        . . . c c c c c c c c c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . c b c b b b c b c . . . . 
        . . . . c b c b c b c . . . . . 
        . . . . . c c c c c . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . c c c c c c . . . . . . 
        . . . c d d d d d c . c c . . . 
        . . c b b b d c d c c b b c . . 
        c c c c c c c b c b b d d d c . 
        c d d d d d b c c c d d d d c . 
        . c d d d d b c c c c c d c . . 
        . . c c d b b c c c c c c . . . 
        . . . c c c c c c c c c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . c b c b b b c b c . . . . 
        . . . . c b c b c b c . . . . . 
        . . . . . c c c c c . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . c c c c c c . . . . . . 
        . . . c d d d d d c . c c . . . 
        . . c b b b d c d c c b b c . . 
        c c c c c c c b c b b d d d c . 
        c d d d d d b c c c d d d d c . 
        . c d d d d b c c c c c d c . . 
        . . c c d b b c c c c c c . . . 
        . . . c c c c c c c c c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . c b c b b b c b c . . . . 
        . . . . c b c b c b c . . . . . 
        . . . . . c c c c c . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . c c c c c c . . . . . . 
        . . . c d d d d d c . c c . . . 
        . . c b b b d c d c c b b c . . 
        c c c c c c c b c b b d d d c . 
        c d d d d d b c c c d d d d c . 
        . c d d d d b c c c c c d c . . 
        . . c c d b b c c c c c c . . . 
        . . . c c c c c c c c c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . c b c b b b c b c . . . . 
        . . . . c b c b c b c . . . . . 
        . . . . . c c c c c . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . c c c c c c . . . . . . 
        . . . c d d d d d c . c c . . . 
        . . c b b b d c d c c b b c . . 
        c c c c c c c b c b b d d d c . 
        c d d d d d b c c c d d d d c . 
        . c d d d d b c c c c c d c . . 
        . . c c d b b c c c c c c . . . 
        . . . c c c c c c c c c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . c b c b b b c b c . . . . 
        . . . c b c c b c c b c . . . . 
        . . . . c b c c c b c . . . . . 
        . . . . . c c c c c . . . . . . 
        `,img`
        . . . . c c c c c c . . . . . . 
        . . . c d d d d d c . c c . . . 
        . . c b b b d c d c c b b c . . 
        c c c c c c c b c b b d d d c . 
        c d d d d d b c c c d d d d c . 
        . c d d d d b c c c c c d c . . 
        . . c c d b b c c c c c c . . . 
        . . . c c c c c c c c c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . c b c b b b c b c . . . . 
        . . . c b c c b c c b c . . . . 
        . . . . c b c c c b c . . . . . 
        . . . . . c c c c c . . . . . . 
        `,img`
        . . . . c c c . c c c . . . . . 
        . . c c d d c . c b b c c . . . 
        . c d d d d d c c b d d d c . . 
        c b b b b b c b c c d d d d c . 
        c c c c c d d d b b c c c c c . 
        . . . c d d d d d b b c . . . . 
        . . c d d d d d d d b c . . . . 
        . . . c c c c c c c c c . . . . 
        . . . c b c c c c c b c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . c b c b b b c b c . . . . 
        . . . c b c c c c c b c . . . . 
        . . . c b b c c c b b c . . . . 
        . . . . c b b b b b c . . . . . 
        . . . . . c c c c c . . . . . . 
        `],
    50,
    true
    )
    music.play(music.createSoundEffect(WaveShape.Square, 1, 3496, 0, 27, 600, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    timer.after(600, function () {
        if (sprites.readDataNumber(_drone, "data_health") == sprites.readDataNumber(_drone, "data_lastAttackHealth")) {
            createBullet(_drone, sprite_player)
            music.play(music.createSoundEffect(WaveShape.Square, 5000, 1, 81, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        }
        timer.after(400, function () {
            if (sprites.readDataNumber(_drone, "data_health") == sprites.readDataNumber(_drone, "data_lastAttackHealth")) {
                animation.runImageAnimation(
                _drone,
                [img`
                    . . . . c c c c c c . . . . . . 
                    . . . c d d d d d c . c c . . . 
                    . . c b b b d c d c c b b c . . 
                    c c c c c c c b c b b d d d c . 
                    c d d d d d b c c c d d d d c . 
                    . c d d d d b c c c c c d c . . 
                    . . c c d b b c c c c c c . . . 
                    . . . c c c c c c c c c . . . . 
                    . . . c b c c c c b b c . . . . 
                    . . . c b b b b b b b c . . . . 
                    . . . c b c b b b c b c . . . . 
                    . . . c b 7 c c c 7 b c . . . . 
                    . . . c b 7 6 6 6 7 b c . . . . 
                    . . . c b c 7 7 7 c b c . . . . 
                    . . . . c b c c c b c . . . . . 
                    . . . . . c c c c c . . . . . . 
                    `,img`
                    . . . . c c c . c c c . . . . . 
                    . . c c d d c . c b b c c . . . 
                    . c d d d d d c c b d d d c . . 
                    c b b b b b c b c c d d d d c . 
                    c c c c c d d d b b c c c c c . 
                    . . . c d d d d d b b c . . . . 
                    . . c d d d d d d d b c . . . . 
                    . . . c c c c c c c c c . . . . 
                    . . . c b c c c c c b c . . . . 
                    . . . c b b b b b b b c . . . . 
                    . . . c b c b b b c b c . . . . 
                    . . . c b 7 c c c 7 b c . . . . 
                    . . . c b 7 6 6 6 7 b c . . . . 
                    . . . c b c 7 7 7 c b c . . . . 
                    . . . . c b c c c b c . . . . . 
                    . . . . . c c c c c . . . . . . 
                    `,img`
                    . . . . c c c c c c c . . . . . 
                    . . . c b b d d d d d c . . . . 
                    c c c c c c b c d d c . . . . . 
                    c d d d d d c b c c c c c c c . 
                    c d d d d b c d d d b b b b c . 
                    . c d d b b c c d d d d c c . . 
                    . . c c b c c c c d d c c . . . 
                    . . . c c c c c c c c c . . . . 
                    . . . c b c c c c c b c . . . . 
                    . . . c b b b b b b b c . . . . 
                    . . . c b c b b b c b c . . . . 
                    . . . c b 7 c c c 7 b c . . . . 
                    . . . c b 7 6 6 6 7 b c . . . . 
                    . . . c b c 7 7 7 c b c . . . . 
                    . . . . c b c c c b c . . . . . 
                    . . . . . c c c c c . . . . . . 
                    `,img`
                    . . . . c . . . c c c . . . . . 
                    . . c c d c c c b d d c c . . . 
                    . c d d d d c c b d d d d c . . 
                    c d d d b b c b c c c d d d c . 
                    c b b b c c d d b b c c c c c . 
                    . c c c c c d d d d b b c . . . 
                    . . . c c d d d d d d c c . . . 
                    . . . c c c c c c c c c . . . . 
                    . . . c b c c c c c b c . . . . 
                    . . . c b b b b b b b c . . . . 
                    . . . c b c b b b c b c . . . . 
                    . . . c b 7 c c c 7 b c . . . . 
                    . . . c b 7 6 6 6 7 b c . . . . 
                    . . . c b c 7 7 7 c b c . . . . 
                    . . . . c b c c c b c . . . . . 
                    . . . . . c c c c c . . . . . . 
                    `],
                50,
                true
                )
            }
        })
    })
}
function playBatHurt () {
    music.play(music.createSoundEffect(
    WaveShape.Sawtooth,
    randint(4000, 5000),
    2000,
    103,
    0,
    300,
    SoundExpressionEffect.Warble,
    InterpolationCurve.Linear
    ), music.PlaybackMode.InBackground)
}
sprites.onOverlap(SpriteKind.Interact, SpriteKind.NPC, function (sprite, otherSprite) {
    if (sprites.readDataString(otherSprite, "data_type") == "wizard") {
        wizardDialog(otherSprite)
    } else if (sprites.readDataString(otherSprite, "data_type") == "cat1") {
        cat1Dialog(otherSprite)
    } else if (sprites.readDataString(otherSprite, "data_type") == "cat2") {
        cat2Dialog(otherSprite)
    } else if (sprites.readDataString(otherSprite, "data_type") == "cat3") {
        cat3Dialog(otherSprite)
    }
})
function hurtPlayer (_player: Sprite, _enemy: Sprite) {
    _player.setFlag(SpriteFlag.GhostThroughSprites, true)
    controller.moveSprite(_player, 0, 0)
    num_lastHit = game.runtime()
    bool_isStunned = true
    _bool_isHealthAnimating = true
    if (num_currentHealth == 3) {
        animation.runImageAnimation(
        sprite_hudHealth,
        [img`
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ...ccccc.ccccc.....ccccc.ccccc...ccccc...ccccc..
            ..cc677ccc677cc...cc677ccc677cc.cc677cc.cc677cc.
            .cc67dd7c67dd7cc.cc67dd7c67dd7ccc677d7ccc677d7cc
            .c6777dd7777dd7c.c6777dd7777dd7c67777ccc66777d7c
            .c67777d77777d7c.c67777d77777d7c6777cbb66777777c
            .c6777777777777c.c6777777777777c67777ccb6677777c
            .c6777777777777c.c6777777777777c677777ccc667777c
            .cc67777777777cc.cc67777777777ccc677777ccb6677cc
            ..cc677777777cc...cc677777777cc.cc677777bcc67cc.
            ...cc6777777cc.....cc6777777cc...cc6777bcc67cc..
            ....cc67777cc.......cc67777cc.....cc67ccc67cc...
            .....cc677cc.........cc677cc.......cc6ccc7cc....
            ......cc6cc...........cc6cc.........ccccccc.....
            .......ccc.............ccc...........ccccc......
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            `,img`
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ...ccccc.ccccc.....ccccc.ccccc...ccccc...ccccc..
            ..cc677ccc677cc...cc677ccc677cc.cc677cc.cc677cc.
            .cc67dd7c67dd7cc.cc67dd7c67dd7ccc677d7ccc677d7cc
            .c6777dd7777dd7c.c6777dd7777dd7c67777ccc66777d7c
            .c67777d77777d7c.c67777d77777d7c6777cbb66777777c
            .c6777777777777c.c6777777777777c67777ccb6677777c
            .c6777777777777c.c6777777777777c677777ccc667777c
            .cc67777777777cc.cc67777777777ccc677777ccb6677cc
            ..cc677777777cc...cc677777777cc.cc677777bcc67cc.
            ...cc6777777cc.....cc6777777cc...cc6777bcc67cc..
            ....cc67777cc.......cc67777cc.....cc67ccc67cc...
            .....cc677cc.........cc677cc.......cc6ccc7cc....
            ......cc6cc...........cc6cc.........ccccccc.....
            .......ccc.............ccc...........ccccc......
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            `,img`
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ...ccccc.ccccc.....ccccc.ccccc..................
            ..cc677ccc677cc...cc677ccc677cc..ccccc...ccccc..
            .cc67dd7c67dd7cc.cc67dd7c67dd7cccc677cc.cc677cc.
            .c6777dd7777dd7c.c6777dd7777dd7cc67777ccc67777cc
            .c67777d77777d7c.c67777d77777d7c67777bbc6677777c
            .c6777777777777c.c6777777777777c6777ccc66777777c
            .c6777777777777c.c6777777777777c67777ccc6677777c
            .cc67777777777cc.cc67777777777cc677777ccc667777c
            ..cc677777777cc...cc677777777cc.c677777cbc6677cc
            ...cc6777777cc.....cc6777777cc..cc677777ccc67cc.
            ....cc67777cc.......cc67777cc....cc6777ccc67cc..
            .....cc677cc.........cc677cc......cc67ccc67cc...
            ......cc6cc...........cc6cc........cc6ccc7cc....
            .......ccc.............ccc..........ccccccc.....
            .....................................ccccc......
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            `,img`
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ...ccccc.ccccc.....ccccc.ccccc..................
            ..cc677ccc677cc...cc677ccc677cc.................
            .cc67dd7c67dd7cc.cc67dd7c67dd7cc................
            .c6777dd7777dd7c.c6777dd7777dd7c.....ccccccc....
            .c67777d77777d7c.c67777d77777d7c.cccccbbcbbccc..
            .c6777777777777c.c6777777777777ccc..cbccbccbccc.
            .c6777777777777c.c6777777777777cc...cbcccccbc.cc
            .cc67777777777cc.cc67777777777cc....ccbcccbcc..c
            ..cc677777777cc...cc677777777ccc.....ccbcbcc...c
            ...cc6777777cc.....cc6777777cc.c......ccbcc....c
            ....cc67777cc.......cc67777cc..c......ccccc....c
            .....cc677cc.........cc677cc...cc......c.c....cc
            ......cc6cc...........cc6cc.....cc......c.c..cc.
            .......ccc.............ccc.......cc....c.c..cc..
            ..................................cc..c.c..cc...
            ...................................cc.c.c.cc....
            ....................................ccc.ccc.....
            .....................................cc.cc......
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            `,img`
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ...ccccc.ccccc.....ccccc.ccccc..................
            ..cc677ccc677cc...cc677ccc677cc.................
            .cc67dd7c67dd7cc.cc67dd7c67dd7cc................
            .c6777dd7777dd7c.c6777dd7777dd7c.....ccccccc....
            .c67777d77777d7c.c67777d77777d7c....ccbbcbbcc...
            .c6777777777777c.c6777777777777c....cbccbccbc...
            .c6777777777777c.c6777777777777c....cbcccccbc...
            .cc67777777777cc.cc67777777777cc....ccbcccbcc...
            ..cc677777777cc...cc677777777cc......ccbcbcc....
            ...cc6777777cc.....cc6777777cc........ccbcc.....
            ....cc67777cc.......cc67777cc..........ccc......
            .....cc677cc.........cc677cc....................
            ......cc6cc...........cc6cc.....................
            .......ccc.............ccc......................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            `],
        50,
        false
        )
    } else if (num_currentHealth == 2) {
        animation.runImageAnimation(
        sprite_hudHealth,
        [img`
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ...ccccc.ccccc....ccccc...ccccc.................
            ..cc677ccc677cc..cc677cc.cc677cc................
            .cc67dd7c67dd7cccc67777ccc67777cc...............
            .c6777dd7777dd7cc67777ccc6677777c....ccccccc....
            .c67777d77777d7cc6777cbb66777777c...ccbbcbbcc...
            .c6777777777777cc67777ccb6677777c...cbccbccbc...
            .c6777777777777cc677777ccc667777c...cbcccccbc...
            .cc67777777777cccc677777ccb6677cc...ccbcccbcc...
            ..cc677777777cc..cc677777bcc67cc.....ccbcbcc....
            ...cc6777777cc....cc6777bcc67cc.......ccbcc.....
            ....cc67777cc......cc67ccc67cc.........ccc......
            .....cc677cc........cc6ccc7cc...................
            ......cc6cc..........ccccccc....................
            .......ccc............ccccc.....................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            `,img`
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ...ccccc.ccccc....ccccc...ccccc.................
            ..cc677ccc677cc..cc677cc.cc677cc................
            .cc67dd7c67dd7cccc67777ccc67777cc...............
            .c6777dd7777dd7cc67777ccc6677777c....ccccccc....
            .c67777d77777d7cc6777cbb66777777c...ccbbcbbcc...
            .c6777777777777cc67777ccb6677777c...cbccbccbc...
            .c6777777777777cc677777ccc667777c...cbcccccbc...
            .cc67777777777cccc677777ccb6677cc...ccbcccbcc...
            ..cc677777777cc..cc677777bcc67cc.....ccbcbcc....
            ...cc6777777cc....cc6777bcc67cc.......ccbcc.....
            ....cc67777cc......cc67ccc67cc.........ccc......
            .....cc677cc........cc6ccc7cc...................
            ......cc6cc..........ccccccc....................
            .......ccc............ccccc.....................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            `,img`
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ...ccccc.ccccc..................................
            ..cc677ccc677cc...ccccc...ccccc.................
            .cc67dd7c67dd7cc.cc677cc.cc677cc................
            .c6777dd7777dd7ccc67777ccc67777cc....ccccccc....
            .c67777d77777d7cc67777bbc6677777c...ccbbcbbcc...
            .c6777777777777cc6777ccc66777777c...cbccbccbc...
            .c6777777777777cc67777ccc6677777c...cbcccccbc...
            .cc67777777777ccc677777ccc667777c...ccbcccbcc...
            ..cc677777777cc.cc677777cbc6677cc....ccbcbcc....
            ...cc6777777cc...cc67777bccc67cc......ccbcc.....
            ....cc67777cc.....cc6777ccc67cc........ccc......
            .....cc677cc.......cc67ccc67cc..................
            ......cc6cc.........cc6c.c7cc...................
            .......ccc...........ccc.ccc....................
            ......................cc.cc.....................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            `,img`
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ...ccccc.ccccc..................................
            ..cc677ccc677cc.................................
            .cc67dd7c67dd7cc................................
            .c6777dd7777dd7c.....ccccccc.........ccccccc....
            .c67777d77777d7c..ccccbbcbbcccc.....ccbbcbbcc...
            .c6777777777777c.cc.cbccbccbc.cc....cbccbccbc...
            .c6777777777777ccc..cbcccccbc..cc...cbcccccbc...
            .cc67777777777ccc...ccbcccbcc...c...ccbcccbcc...
            ..cc677777777cc.c....ccbcbcc....c....ccbcbcc....
            ...cc6777777cc..c.....ccbcc.....c.....ccbcc.....
            ....cc67777cc...c......ccc......c......ccc......
            .....cc677cc....cc......c.c....cc...............
            ......cc6cc......cc......c.c..cc................
            .......ccc........cc....c.c..cc.................
            ...................cc..c.c..cc..................
            ....................cc.c.c.cc...................
            .....................ccc.ccc....................
            ......................cc.cc.....................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            `,img`
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ...ccccc.ccccc..................................
            ..cc677ccc677cc.................................
            .cc67dd7c67dd7cc................................
            .c6777dd7777dd7c.....ccccccc.........ccccccc....
            .c67777d77777d7c....ccbbcbbcc.......ccbbcbbcc...
            .c6777777777777c....cbccbccbc.......cbccbccbc...
            .c6777777777777c....cbcccccbc.......cbcccccbc...
            .cc67777777777cc....ccbcccbcc.......ccbcccbcc...
            ..cc677777777cc......ccbcbcc.........ccbcbcc....
            ...cc6777777cc........ccbcc...........ccbcc.....
            ....cc67777cc..........ccc.............ccc......
            .....cc677cc....................................
            ......cc6cc.....................................
            .......ccc......................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            `],
        50,
        false
        )
    } else {
        bool_isMusic = false
        bool_isPlayerDead = true
        bool_isPlayerFrozen = true
        animation.setAction(_player, ActionKind.DeathAnim)
        music.stopAllSounds()
        animation.runImageAnimation(
        sprite_hudHealth,
        [img`
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ...cccc...cccc..................................
            ..cc677c.c677cc.................................
            .cc67dd7c67dd7cc................................
            .c6777dc6677dd7c.....ccccccc.........ccccccc....
            .c6777c667777d7c....ccbbcbbcc.......ccbbcbbcc...
            .c67777c6677777c....cbccbccbc.......cbccbccbc...
            .c677777c667777c....cbcccccbc.......cbcccccbc...
            .cc677777c6677cc....ccbcccbcc.......ccbcccbcc...
            ..cc677777c67cc......ccbcbcc.........ccbcbcc....
            ...cc6777c67cc........ccbcc...........ccbcc.....
            ....cc67c67cc..........ccc.............ccc......
            .....cc6c7cc....................................
            ......ccccc.....................................
            .......ccc......................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            `,img`
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ..ccccc.........................................
            .cc677cc........................................
            cc67dd7c..ccccc.................................
            c6777dcc.cc677cc................................
            c6777cc.cc67dd7cc....ccccccc.........ccccccc....
            c67777ccc6677dd7c...ccbbcbbcc.......ccbbcbbcc...
            c677777c667777d7c...cbccbccbc.......cbccbccbc...
            cc677777c6677777c...cbcccccbc.......cbcccccbc...
            .cc677777c667777c...ccbcccbcc.......ccbcccbcc...
            ..cc6777ccc6677cc....ccbcbcc.........ccbcbcc....
            ...cc67cc.cc67cc......ccbcc...........ccbcc.....
            ....cc6c.cc67cc........ccc.............ccc......
            .....ccc.c67cc..................................
            ......cc.c7cc...................................
            .........ccc....................................
            .........cc.....................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            `],
        100,
        false
        )
        music.play(music.createSoundEffect(WaveShape.Noise, 2200, 0, 251, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        controller.moveSprite(_player, 0, 0)
        timer.after(300, function () {
            bool_isPlayerFrozen = true
            controller.moveSprite(_player, 0, 0)
            bool_isPlayerFrozen = true
            music.play(music.createSoundEffect(WaveShape.Noise, 2200, 0, 202, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            timer.after(300, function () {
                bool_isPlayerFrozen = true
                controller.moveSprite(_player, 0, 0)
                music.play(music.createSoundEffect(WaveShape.Noise, 2200, 0, 149, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
                timer.after(300, function () {
                    bool_isPlayerFrozen = true
                    controller.moveSprite(_player, 0, 0)
                    music.play(music.createSoundEffect(WaveShape.Noise, 2200, 0, 105, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
                    timer.after(300, function () {
                        bool_isPlayerFrozen = true
                        controller.moveSprite(_player, 0, 0)
                        music.play(music.createSoundEffect(WaveShape.Noise, 2200, 0, 52, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
                        timer.after(500, function () {
                            bool_isPlayerFrozen = true
                            music.setVolume(100)
                            game.setGameOverEffect(false, effects.dissolve)
                            game.gameOver(false)
                        })
                    })
                })
            })
        })
    }
    _enemy.follow(_player, 0)
    knockback(_player, _enemy, 200, 100)
    sprites.setDataNumber(_enemy, "data_isBusy", 1)
    sprites.setDataNumber(_enemy, "data_lastAttackTime", game.runtime())
    timer.after(250, function () {
        if (num_currentHealth > 0) {
            num_currentHealth += -1
            _player.setFlag(SpriteFlag.GhostThroughSprites, false)
            _bool_isHealthAnimating = false
            sprites.setDataNumber(_enemy, "data_isBusy", 0)
            controller.moveSprite(_player, 75, 75)
            bool_isStunned = false
        }
    })
}
function cameraTransitionEnd () {
    sprite_cameraFollow.setFlag(SpriteFlag.GhostThroughSprites, true)
    sprite_cameraFollow.follow(sprite_cameraControl, 0)
    sprite_cameraFollow.setPosition(sprite_cameraControl.x, sprite_cameraControl.y)
    sprite_cameraFollow.follow(sprite_cameraControl, 200)
    bool_isTransition = false
    if (isLevelComplete()) {
        openDoorsInView()
    }
    wakeUpRobots()
    destroyTreesOutOfView()
    destroyDungeonMusicOutOfView()
    sprite_player.follow(sprite_cameraControl, 0)
    sprite_player.setVelocity(0, 0)
    controller.moveSprite(sprite_player, num_playerSpeed, num_playerSpeed)
    bool_isPlayerFrozen = false
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`Empty1`, function (sprite, location) {
    bool_isMusicEnd = false
    num_playerSpeed = 55
})
function isLevelComplete () {
    if (array_levelComplete2D[(sprite_cameraControl.tilemapLocation().column - 5) / 10][(sprite_cameraControl.tilemapLocation().row - 4) / 8] == 1) {
        return true
    } else {
        return false
    }
}
function destroyBush (_column: number, _row: number) {
    tiles.setWallAt(tiles.getTileLocation(_column, _row), false)
    if (Math.percentChance(50)) {
        if (Math.percentChance(50)) {
            tiles.setTileAt(tiles.getTileLocation(_column, _row), assets.tile`myTile41`)
        } else {
            tiles.setTileAt(tiles.getTileLocation(_column, _row), assets.tile`myTile37`)
        }
    } else {
        if (Math.percentChance(50)) {
            tiles.setTileAt(tiles.getTileLocation(_column, _row), assets.tile`myTile98`)
        } else {
            tiles.setTileAt(tiles.getTileLocation(_column, _row), assets.tile`myTile99`)
        }
    }
    createPickup(tiles.getTileLocation(_column, _row).x, tiles.getTileLocation(_column, _row).y, 50, 0)
    createLeavesTile(_column, _row)
    _num_bushPitch = randint(500, 550)
    music.play(music.createSoundEffect(
    WaveShape.Noise,
    4500,
    _num_bushPitch * 4,
    50,
    0,
    50,
    SoundExpressionEffect.Vibrato,
    InterpolationCurve.Logarithmic
    ), music.PlaybackMode.InBackground)
    music.play(music.createSoundEffect(
    WaveShape.Noise,
    _num_bushPitch * 4,
    _num_bushPitch * 2,
    20,
    0,
    200,
    SoundExpressionEffect.None,
    InterpolationCurve.Logarithmic
    ), music.PlaybackMode.InBackground)
}
/**
 * Bat Funcs
 */
function playBatNoise () {
    music.play(music.createSoundEffect(
    WaveShape.Triangle,
    randint(2000, 2400),
    4000,
    80,
    0,
    100,
    SoundExpressionEffect.None,
    InterpolationCurve.Curve
    ), music.PlaybackMode.InBackground)
}
function createCameraController () {
    bool_isDungeonMusic = false
    bool_isTransition = false
    sprite_cameraControl = sprites.create(img`
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        `, SpriteKind.camera)
    sprite_cameraControl.setFlag(SpriteFlag.GhostThroughTiles, true)
    sprite_cameraControl.setFlag(SpriteFlag.GhostThroughWalls, true)
    sprite_cameraControl.setPosition(88, 840)
    sprite_cameraControl.z = -100
    sprite_cameraFollow = sprites.create(img`
        5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 
        `, SpriteKind.camera)
    sprite_cameraFollow.setFlag(SpriteFlag.GhostThroughTiles, true)
    sprite_cameraFollow.setFlag(SpriteFlag.GhostThroughWalls, true)
    sprite_cameraFollow.setPosition(88, 840)
    sprite_cameraFollow.z = -100
    sprite_cameraFollow.follow(sprite_cameraControl, 400)
    scene.cameraFollowSprite(sprite_cameraFollow)
}
function damageBat (_enemy: Sprite, _damage: number, _origin: Sprite) {
    sprites.setDataNumber(_enemy, "data_isBusy", 1)
    _enemy.setKind(SpriteKind.EnemyHurt)
    sprites.changeDataNumberBy(_enemy, "data_health", _damage)
    _enemy.follow(sprite_enemyWaker, 0)
    knockback(_enemy, _origin, 200, 100)
    if (sprites.readDataNumber(_enemy, "data_health") <= 0) {
        animation.runImageAnimation(
        _enemy,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . c c c . . . . . c c c . . . 
            . . c c d . . . . . d c c . . . 
            . . c d b d . . . d b d c . . . 
            c c c d b d c c c d b d c c c . 
            c c d d b d d d d d b d d c c . 
            c d b d d b 7 7 7 b d d b d c . 
            c d b d d 7 7 7 7 7 d d b d c . 
            d d b d b d 7 7 7 d b d b d d . 
            d b b d b d 7 7 7 d b d b b d . 
            d b d d b d b b b d b d d b d . 
            d b d b b d b b b d b b d b d . 
            d c d b d d d d d d d b d c d . 
            d d d b d c c c c c d b d d d . 
            . . d c d c c c c c d c d . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . c c c . . . . . c c c . . . 
            . . c c c . . . . . c c c . . . 
            . . c c b c . . . c b c c . . . 
            c c c c b c c c c c b c c c c . 
            c c c c b c c c c c b c c c c . 
            c c b c c b 7 7 7 b c c b c c . 
            c c b c c 7 7 7 7 7 c c b c c . 
            c c b c b c 7 7 7 c b c b c c . 
            c b b c b c 7 7 7 c b c b b c . 
            c b c c b c b b b c b c c b c . 
            c b c b b c b b b c b b c b c . 
            c d c b c c c c c c c b c d c . 
            c c c b c c c c c c c b c c c . 
            . . c d c c c c c c c d c . . . 
            `],
        200,
        false
        )
        playBatDie()
        timer.after(600, function () {
            createPickup(_enemy.x, _enemy.y, 100, 10)
            createSmokePosition(_enemy.x, _enemy.y)
            _enemy.lifespan = 1
        })
    } else if (sprites.readDataNumber(_enemy, "data_health") >= 1) {
        animation.runImageAnimation(
        _enemy,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . c c c . . . . . c c c . . . 
            . . c c d . . . . . d c c . . . 
            . . c d b d . . . d b d c . . . 
            c c c d b d c c c d b d c c c . 
            c c d d b d 7 6 7 d b d d c c . 
            c d b d d 7 6 6 6 7 d d b d c . 
            c d b d d 7 7 6 7 7 d d b d c . 
            d d b d b d 7 7 7 d b d b d d . 
            d b b d b d 7 7 7 d b d b b d . 
            d b d d b d b b b d b d d b d . 
            d b d b b d b b b d b b d b d . 
            d c d b d d d d d d d b d c d . 
            d d d b d c c c c c d b d d d . 
            . . d c d c c c c c d c d . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . c c c . . . . . c c c . . . 
            . . c c c . . . . . c c c . . . 
            . . c c b c . . . c b c c . . . 
            c c c c b c c c c c b c c c c . 
            c c c c b c 7 6 7 c b c c c c . 
            c c b c c 7 6 6 6 7 c c b c c . 
            c c b c c 7 7 6 7 7 c c b c c . 
            c c b c b c 7 7 7 c b c b c c . 
            c b b c b c 7 7 7 c b c b b c . 
            c b c c b c b b b c b c c b c . 
            c b c b b c b b b c b b c b c . 
            c d c b c c c c c c c b c d c . 
            c c c b c c c c c c c b c c c . 
            . . c d c c c c c c c d c . . . 
            `],
        200,
        false
        )
        playBatHurt()
        timer.after(600, function () {
            sprites.setDataNumber(_enemy, "data_isBusy", 0)
            _enemy.setKind(SpriteKind.Enemy)
            animation.runImageAnimation(
            _enemy,
            [img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . c c c . . . . . c c c . . . 
                . . c c c . . . . . c b c . . . 
                . . c b c c . . . c c b c . . . 
                c c c b c c c c c c c b b c c . 
                c b c b c c 7 7 7 c c c b c c . 
                c b b c b 7 7 6 7 7 b c c b c . 
                c b c b b 7 7 7 7 7 c b b b c . 
                c b c c c b 7 7 7 c b b c b c . 
                c b c b b c b b b c c b c b c . 
                c d c b c c b b b c c b c b c . 
                c c c b c c c c c c c b c b c . 
                c c c b c c c c c c c b c d c . 
                c c c b c c c c c c c d c c c . 
                . . c d c c c c c c c c c . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . c c c . . . . . c c c . . . 
                . . c c c . . . . . c c c . . . 
                . . c b c c . . . c c b c . . . 
                c c c b c c c c c c c b c c c . 
                c c c b c c 7 7 7 c c b c c c . 
                c b c c b 7 7 6 7 7 b c c b c . 
                c b b c b 7 7 7 7 7 b c b b c . 
                c b c b c b 7 7 7 b c b c b c . 
                c b c b b c b b b c b b c b c . 
                c b c b c c b b b c c b c b c . 
                c b c b c c c c c c c b c b c . 
                c d c b c c c c c c c b c d c . 
                c c c b c c c c c c c b c c c . 
                . . c d c c c c c c c d c . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . c c c . . . . . c c c . . . 
                . . c b c . . . . . c c c . . . 
                . . c b c c . . . c c b c . . . 
                c c b b c c c c c c c b c c c . 
                c c b c c c 7 7 7 c c b c b c . 
                c b c c b 7 7 6 7 7 b c b b c . 
                c b b b c 7 7 7 7 7 b b c b c . 
                c b c b b c 7 7 7 b c c c b c . 
                c b c b c c b b b c b b c b c . 
                c b c b c c b b b c c b c d c . 
                c b c b c c c c c c c b c c c . 
                c d c b c c c c c c c b c c c . 
                c c c d c c c c c c c b c c c . 
                . . c c c c c c c c c d c . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . c c c . . . . . c c c . . . 
                . . c c c . . . . . c c c . . . 
                . . c b c c . . . c c b c . . . 
                c c c b c c c c c c c b c c c . 
                c c c b c c 7 7 7 c c b c c c . 
                c b c c b 7 7 6 7 7 b c c b c . 
                c b b c b 7 7 7 7 7 b c b b c . 
                c b c b c b 7 7 7 b c b c b c . 
                c b c b b c b b b c b b c b c . 
                c b c b c c b b b c c b c b c . 
                c b c b c c c c c c c b c b c . 
                c d c b c c c c c c c b c d c . 
                c c c b c c c c c c c b c c c . 
                . . c d c c c c c c c d c . . . 
                `],
            100,
            true
            )
        })
    }
}
function closeDoorsInView () {
    for (let value of tiles.getTilesByType(assets.tile`myTile16`)) {
        if (isInView(value.x, value.y, sprite_cameraControl)) {
            tiles.setTileAt(value, assets.tile`myTile71`)
            tiles.setWallAt(value, true)
            createSmokePosition(value.x, value.y)
        }
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile76`)) {
        if (isInView(value.x, value.y, sprite_cameraControl)) {
            tiles.setTileAt(value, assets.tile`myTile74`)
            tiles.setWallAt(value, true)
            createSmokePosition(value.x, value.y)
        }
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile77`)) {
        if (isInView(value.x, value.y, sprite_cameraControl)) {
            tiles.setTileAt(value, assets.tile`myTile75`)
            tiles.setWallAt(value, true)
            createSmokePosition(value.x, value.y)
        }
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile72`)) {
        if (isInView(value.x, value.y, sprite_cameraControl)) {
            tiles.setTileAt(value, assets.tile`myTile80`)
            tiles.setWallAt(value, true)
            createSmokePosition(value.x, value.y)
        }
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`Empty5`, function (sprite, location) {
    num_playerSpeed = 55
})
/**
 * Win Funcs
 */
scene.onOverlapTile(SpriteKind.Interact, assets.tile`Empty3`, function (sprite, location) {
    endGame(location.column, location.row)
})
function playSparkle () {
    music.play(music.createSoundEffect(
    WaveShape.Triangle,
    2600,
    2600,
    206,
    206,
    _num_sparkleDelay,
    SoundExpressionEffect.None,
    InterpolationCurve.Logarithmic
    ), music.PlaybackMode.InBackground)
    timer.after(_num_sparkleDelay, function () {
        music.play(music.createSoundEffect(
        WaveShape.Triangle,
        2069,
        2069,
        175,
        175,
        _num_sparkleDelay,
        SoundExpressionEffect.None,
        InterpolationCurve.Logarithmic
        ), music.PlaybackMode.InBackground)
        timer.after(_num_sparkleDelay, function () {
            music.play(music.createSoundEffect(
            WaveShape.Triangle,
            2470,
            2470,
            152,
            152,
            _num_sparkleDelay,
            SoundExpressionEffect.None,
            InterpolationCurve.Logarithmic
            ), music.PlaybackMode.InBackground)
            timer.after(_num_sparkleDelay, function () {
                music.play(music.createSoundEffect(
                WaveShape.Triangle,
                2069,
                2069,
                103,
                103,
                _num_sparkleDelay,
                SoundExpressionEffect.None,
                InterpolationCurve.Logarithmic
                ), music.PlaybackMode.InBackground)
                timer.after(_num_sparkleDelay, function () {
                    music.play(music.createSoundEffect(
                    WaveShape.Triangle,
                    2470,
                    2470,
                    85,
                    85,
                    _num_sparkleDelay,
                    SoundExpressionEffect.None,
                    InterpolationCurve.Logarithmic
                    ), music.PlaybackMode.InBackground)
                    timer.after(_num_sparkleDelay, function () {
                        music.play(music.createSoundEffect(
                        WaveShape.Triangle,
                        2069,
                        2069,
                        63,
                        63,
                        _num_sparkleDelay,
                        SoundExpressionEffect.None,
                        InterpolationCurve.Logarithmic
                        ), music.PlaybackMode.InBackground)
                        timer.after(_num_sparkleDelay, function () {
                            music.play(music.createSoundEffect(
                            WaveShape.Triangle,
                            2470,
                            2470,
                            40,
                            40,
                            _num_sparkleDelay,
                            SoundExpressionEffect.None,
                            InterpolationCurve.Logarithmic
                            ), music.PlaybackMode.InBackground)
                            timer.after(_num_sparkleDelay, function () {
                                music.play(music.createSoundEffect(
                                WaveShape.Triangle,
                                2069,
                                2069,
                                32,
                                32,
                                _num_sparkleDelay,
                                SoundExpressionEffect.None,
                                InterpolationCurve.Logarithmic
                                ), music.PlaybackMode.InBackground)
                                timer.after(_num_sparkleDelay, function () {
                                    music.play(music.createSoundEffect(
                                    WaveShape.Triangle,
                                    2470,
                                    2470,
                                    18,
                                    18,
                                    _num_sparkleDelay,
                                    SoundExpressionEffect.None,
                                    InterpolationCurve.Logarithmic
                                    ), music.PlaybackMode.InBackground)
                                    timer.after(_num_sparkleDelay, function () {
                                        music.play(music.createSoundEffect(
                                        WaveShape.Triangle,
                                        2069,
                                        2069,
                                        9,
                                        9,
                                        _num_sparkleDelay,
                                        SoundExpressionEffect.None,
                                        InterpolationCurve.Logarithmic
                                        ), music.PlaybackMode.InBackground)
                                        timer.after(_num_sparkleDelay, function () {
                                            music.play(music.createSoundEffect(
                                            WaveShape.Triangle,
                                            2470,
                                            2470,
                                            5,
                                            5,
                                            _num_sparkleDelay,
                                            SoundExpressionEffect.None,
                                            InterpolationCurve.Logarithmic
                                            ), music.PlaybackMode.InBackground)
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}
sprites.onOverlap(SpriteKind.EnemyWaker, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprites.readDataString(otherSprite, "data_type") == "bat") {
        if (game.runtime() - sprites.readDataNumber(otherSprite, "data_lastAttackTime") > 3000 && Math.percentChance(2)) {
            if (sprites.readDataNumber(otherSprite, "data_health") > 0) {
                batDashAttack(otherSprite)
                sprites.setDataNumber(otherSprite, "data_lastAttackTime", game.runtime())
            }
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Bullet, function (sprite, otherSprite) {
    if (num_lastHit < game.runtime() - 1000) {
        playHitSound()
        hurtPlayer(sprite, otherSprite)
    }
    sprites.destroy(otherSprite)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile140`, function (sprite, location) {
    flipSwitch(assets.tile`myTile141`, assets.tile`myTile137`, assets.tile`myTile138`, assets.tile`myTile139`, location.column, location.row)
})
function destroyTreesOutOfView () {
    for (let value of sprites.allOfKind(SpriteKind.Tree)) {
        if (!(isInView(value.x, value.y, sprite_cameraControl))) {
            sprites.destroy(value)
        }
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile90`, function (sprite, location) {
    flipSwitch(assets.tile`myTile91`, assets.tile`myTile87`, assets.tile`myTile88`, assets.tile`myTile89`, location.column, location.row)
    timer.after(1650, function () {
        num_winCondition = 3
        num_lastDialogNPC1 = 3
        bool_hasQuest = true
        completeLevel()
        tiles.setWallAt(sprite_NPC.tilemapLocation(), false)
        playCutsceneSaveNPC(sprite_NPC, -75, 0, 2500, "Follow me!")
        timer.after(100, function () {
            controller.moveSprite(sprite_player, 0, 0)
            timer.after(100, function () {
                controller.moveSprite(sprite_player, 0, 0)
                timer.after(100, function () {
                    controller.moveSprite(sprite_player, 0, 0)
                })
            })
        })
    })
})
function playWizardNoise () {
    music.play(music.createSoundEffect(
    WaveShape.Square,
    400,
    randint(500, 650),
    80,
    0,
    100,
    SoundExpressionEffect.None,
    InterpolationCurve.Linear
    ), music.PlaybackMode.UntilDone)
}
function wizardDialog (_wizard: Sprite) {
    if (!(bool_isNPCTalking)) {
        bool_isNPCTalking = true
        animation.runImageAnimation(
        _wizard,
        [img`
            . . . . . . . . c c c c c . . . 
            . . . . . . c c b b b b b c . . 
            . . . . c c b b b b b c b c . . 
            . . c c d d d d d d d d c c . . 
            . c c b b b b b b b b b b c c . 
            c b b b b b b b b b b b b b b c 
            c c c c c c c c c c c c c c c c 
            . . . c b b b b b b b b c . . . 
            . . . c b c c b b c c b c . . . 
            . . . c b d d d d d d b c . . . 
            . . . . c b d b b d b c . . . . 
            . . . c c c c c c c c c c . . . 
            . . . c d c b b b b c d c . . . 
            . . . c c c b b b b c c c . . . 
            . . . . . c c c c c c . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . c c c c . . . . 
            . . . . . . c c b b b b c . . . 
            . . . . . c b b b b c c b c . . 
            . . . . c b b b b b b c c . . . 
            . c c c d b b b b b b d c c c . 
            c b b b b d d d d d d b b b b c 
            c c c b b b b b b b b b b c c c 
            . . c c c c c c c c c c c c . . 
            . . . c b b b b b b b b c . . . 
            . . . c b c c b b c c b c . . . 
            . . . . c b d d d d b c . . . . 
            . . . c c c c c c c c c c . . . 
            . . . c d c b b b b c d c . . . 
            . . . c c c b b b b c c c . . . 
            . . . . . c c c c c c . . . . . 
            . . . . . . . . . . . . . . . . 
            `],
        350,
        true
        )
        playWizardNoise()
        if (num_lastDialogNPC1 == 0) {
            bool_hasQuest = false
            sprites.destroyAllSpritesOfKind(SpriteKind.Quest)
            _num_dialogLength = 3000
            _wizard.sayText("Please save my cats from this factory!", _num_dialogLength, true)
            num_lastDialogNPC1 = 1
        } else if (num_lastDialogNPC1 == 1) {
            _num_dialogLength = 2500
            _wizard.sayText("There's evil robots inside!", _num_dialogLength, true)
            num_lastDialogNPC1 = 2
        } else if (num_lastDialogNPC1 == 2) {
            _num_dialogLength = 2000
            _wizard.sayText("Hahaha! I'm old!", _num_dialogLength, true)
            num_lastDialogNPC1 = 0
        } else if (num_lastDialogNPC1 == 3) {
            bool_hasQuest = false
            sprites.destroyAllSpritesOfKind(SpriteKind.Quest)
            num_lastDialogNPC1 = 4
            bool_isPlayerFrozen = true
            controller.moveSprite(sprite_player, 0, 0)
            sprite_player.setVelocity(0, 0)
            _num_dialogLength = 2000
            _wizard.sayText("Thank you for saving them!!", _num_dialogLength, true)
            timer.after(_num_dialogLength, function () {
                bool_isNPCTalking = true
                animation.runImageAnimation(
                _wizard,
                [img`
                    . . . . . . . . c c c c c . . . 
                    . . . . . . c c b b b b b c . . 
                    . . . . c c b b b b b c b c . . 
                    . . c c d d d d d d d d c c . . 
                    . c c b b b b b b b b b b c c . 
                    c b b b b b b b b b b b b b b c 
                    c c c c c c c c c c c c c c c c 
                    . . . c b b b b b b b b c . . . 
                    . . . c b c c b b c c b c . . . 
                    . . . c b d d d d d d b c . . . 
                    . . . . c b d b b d b c . . . . 
                    . . . c c c c c c c c c c . . . 
                    . . . c d c b b b b c d c . . . 
                    . . . c c c b b b b c c c . . . 
                    . . . . . c c c c c c . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . c c c c . . . . 
                    . . . . . . c c b b b b c . . . 
                    . . . . . c b b b b c c b c . . 
                    . . . . c b b b b b b c c . . . 
                    . c c c d b b b b b b d c c c . 
                    c b b b b d d d d d d b b b b c 
                    c c c b b b b b b b b b b c c c 
                    . . c c c c c c c c c c c c . . 
                    . . . c b b b b b b b b c . . . 
                    . . . c b c c b b c c b c . . . 
                    . . . . c b d d d d b c . . . . 
                    . . . c c c c c c c c c c . . . 
                    . . . c d c b b b b c d c . . . 
                    . . . c c c b b b b c c c . . . 
                    . . . . . c c c c c c . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `],
                350,
                true
                )
                _num_dialogLength = 2500
                playWizardNoise()
                _wizard.sayText("It's safe to shut down the factory now!", _num_dialogLength, true)
                timer.after(_num_dialogLength, function () {
                    bool_isNPCTalking = true
                    animation.runImageAnimation(
                    _wizard,
                    [img`
                        . . . . . . . . c c c c c . . . 
                        . . . . . . c c b b b b b c . . 
                        . . . . c c b b b b b c b c . . 
                        . . c c d d d d d d d d c c . . 
                        . c c b b b b b b b b b b c c . 
                        c b b b b b b b b b b b b b b c 
                        c c c c c c c c c c c c c c c c 
                        . . . c b b b b b b b b c . . . 
                        . . . c b c c b b c c b c . . . 
                        . . . c b d d d d d d b c . . . 
                        . . . . c b d b b d b c . . . . 
                        . . . c c c c c c c c c c . . . 
                        . . . c d c b b b b c d c . . . 
                        . . . c c c b b b b c c c . . . 
                        . . . . . c c c c c c . . . . . 
                        . . . . . . . . . . . . . . . . 
                        `,img`
                        . . . . . . . . c c c c . . . . 
                        . . . . . . c c b b b b c . . . 
                        . . . . . c b b b b c c b c . . 
                        . . . . c b b b b b b c c . . . 
                        . c c c d b b b b b b d c c c . 
                        c b b b b d d d d d d b b b b c 
                        c c c b b b b b b b b b b c c c 
                        . . c c c c c c c c c c c c . . 
                        . . . c b b b b b b b b c . . . 
                        . . . c b c c b b c c b c . . . 
                        . . . . c b d d d d b c . . . . 
                        . . . c c c c c c c c c c . . . 
                        . . . c d c b b b b c d c . . . 
                        . . . c c c b b b b c c c . . . 
                        . . . . . c c c c c c . . . . . 
                        . . . . . . . . . . . . . . . . 
                        `],
                    350,
                    true
                    )
                    _num_dialogLength = 1000
                    playWizardNoise()
                    _wizard.sayText("In here!!", _num_dialogLength, true)
                    tiles.setTileAt(tiles.getTileLocation(29, 52), assets.tile`myTile77`)
                    tiles.setWallAt(tiles.getTileLocation(29, 52), false)
                    createSmokePosition(472, 840)
                    timer.after(_num_dialogLength, function () {
                        bool_isNPCTalking = true
                        sprite_questIcon = sprites.create(img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . c c . . . . . . . 
                            . . . . . . . c d c . . . . . . 
                            . . . c c c c c d d c . . . . . 
                            . . . c d d d d d d d c . . . . 
                            . . . c b b b b d d b c . . . . 
                            . . . c c c c c d b c . . . . . 
                            . . . . . . . c b c . . . . . . 
                            . . . . . . . c c . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            `, SpriteKind.Player)
                        animation.runImageAnimation(
                        sprite_questIcon,
                        [img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . c c . . . . . . . . . 
                            . . . . . c d c . . . . . . . . 
                            . c c c c c d d c . . . . . . . 
                            . c d d d d d d d c . . . . . . 
                            . c b b b b d d b c . . . . . . 
                            . c c c c c d b c . . . . . . . 
                            . . . . . c b c . . . . . . . . 
                            . . . . . c c . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . c c . . . . . . . . . . 
                            . . . . c d c . . . . . . . . . 
                            c c c c c d d c . . . . . . . . 
                            c d d d d d d d c . . . . . . . 
                            c b b b b d d b c . . . . . . . 
                            c c c c c d b c . . . . . . . . 
                            . . . . c b c . . . . . . . . . 
                            . . . . c c . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . c c . . . . . . . . . 
                            . . . . . c d c . . . . . . . . 
                            . c c c c c d d c . . . . . . . 
                            . c d d d d d d d c . . . . . . 
                            . c b b b b d d b c . . . . . . 
                            . c c c c c d b c . . . . . . . 
                            . . . . . c b c . . . . . . . . 
                            . . . . . c c . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . c c . . . . . . . 
                            . . . . . . . c d c . . . . . . 
                            . . . c c c c c d d c . . . . . 
                            . . . c d d d d d d d c . . . . 
                            . . . c b b b b d d b c . . . . 
                            . . . c c c c c d b c . . . . . 
                            . . . . . . . c b c . . . . . . 
                            . . . . . . . c c . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . c c . . . . . . 
                            . . . . . . . . c d c . . . . . 
                            . . . . c c c c c d d c . . . . 
                            . . . . c d d d d d d d c . . . 
                            . . . . c b b b b d d b c . . . 
                            . . . . c c c c c d b c . . . . 
                            . . . . . . . . c b c . . . . . 
                            . . . . . . . . c c . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . c c . . . . . . . 
                            . . . . . . . c d c . . . . . . 
                            . . . c c c c c d d c . . . . . 
                            . . . c d d d d d d d c . . . . 
                            . . . c b b b b d d b c . . . . 
                            . . . c c c c c d b c . . . . . 
                            . . . . . . . c b c . . . . . . 
                            . . . . . . . c c . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            `],
                        100,
                        true
                        )
                        tiles.placeOnTile(sprite_questIcon, tiles.getTileLocation(29, 52))
                        bool_isPlayerFrozen = false
                        controller.moveSprite(sprite_player, 75, 75)
                        bool_isNPCTalking = false
                        animation.runImageAnimation(
                        _wizard,
                        [img`
                            . . . . . . . . c c c c . . . . 
                            . . . . . . c c b b b b c . . . 
                            . . . . . c b b b b c c b c . . 
                            . . . . c b b b b b b c c . . . 
                            . c c c d b b b b b b d c c c . 
                            c b b b b d d d d d d b b b b c 
                            c c c b b b b b b b b b b c c c 
                            . . c c c c c c c c c c c c . . 
                            . . . c b b b b b b b b c . . . 
                            . . . c b c c b b c c b c . . . 
                            . . . . c b d d d d b c . . . . 
                            . . . c c c c c c c c c c . . . 
                            . . . c d c b b b b c d c . . . 
                            . . . c c c b b b b c c c . . . 
                            . . . . . c c c c c c . . . . . 
                            . . . . . . . . . . . . . . . . 
                            `],
                        200,
                        false
                        )
                    })
                })
            })
        } else {
            _num_dialogLength = 2000
            _wizard.sayText("Shut down the factory!", _num_dialogLength, true)
        }
        timer.after(_num_dialogLength, function () {
            bool_isNPCTalking = false
            animation.runImageAnimation(
            _wizard,
            [img`
                . . . . . . . . c c c c . . . . 
                . . . . . . c c b b b b c . . . 
                . . . . . c b b b b c c b c . . 
                . . . . c b b b b b b c c . . . 
                . c c c d b b b b b b d c c c . 
                c b b b b d d d d d d b b b b c 
                c c c b b b b b b b b b b c c c 
                . . c c c c c c c c c c c c . . 
                . . . c b b b b b b b b c . . . 
                . . . c b c c b b c c b c . . . 
                . . . . c b d d d d b c . . . . 
                . . . c c c c c c c c c c . . . 
                . . . c d c b b b b c d c . . . 
                . . . c c c b b b b c c c . . . 
                . . . . . c c c c c c . . . . . 
                . . . . . . . . . . . . . . . . 
                `],
            200,
            false
            )
        })
    }
}
function pickupMoney (_pickup: Sprite, _player: Sprite) {
    _pickup.setFlag(SpriteFlag.Ghost, true)
    _pickup.lifespan = 1300
    _pickup.z = 300
    num_currentMoneyAdd += sprites.readDataNumber(_pickup, "data_value")
    text_moneyAdd = textsprite.create(convertToText(sprites.readDataNumber(_pickup, "data_value")), 0, 13)
    text_moneyAdd.setIcon(img`
        . c c c . 
        c c d c c 
        c d d d c 
        c c d c c 
        . c c c . 
        `)
    text_moneyAdd.setOutline(1, 12)
    text_moneyAdd.setFlag(SpriteFlag.Ghost, true)
    text_moneyAdd.setFlag(SpriteFlag.RelativeToCamera, true)
    text_moneyAdd.setPosition(16, 30)
    if (sprites.readDataNumber(_pickup, "data_value") == num_moneyValue3) {
        text_moneyAdd.setIcon(img`
            . c c d c c . 
            c c d d d c c 
            d d d d d d d 
            c d d d d d c 
            c c d d d c c 
            c d d d d d c 
            c d d c d d c 
            `)
        text_moneyAdd.setVelocity(0, randint(5, 8))
        text_moneyAdd.lifespan = 2000
        text_moneyAdd.z = 510
        _pickup.y += -5
        music.play(music.createSoundEffect(WaveShape.Triangle, 2000, 2000, 46, 60, 50, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
        timer.after(50, function () {
            music.play(music.createSoundEffect(
            WaveShape.Triangle,
            2600,
            2600,
            206,
            0,
            50,
            SoundExpressionEffect.None,
            InterpolationCurve.Logarithmic
            ), music.PlaybackMode.InBackground)
            timer.after(50, function () {
                music.play(music.createSoundEffect(
                WaveShape.Triangle,
                3000,
                3000,
                206,
                0,
                300,
                SoundExpressionEffect.None,
                InterpolationCurve.Logarithmic
                ), music.PlaybackMode.InBackground)
                timer.after(300, function () {
                    _pickup.lifespan = 1300
                    _pickup.vy = -15
                    animation.runImageAnimation(
                    _pickup,
                    [img`
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . c c c . . . . . 
                        . . . c c c d c c c . . . 
                        . . . c d d d d d c . . . 
                        . . . c c d d d c c . . . 
                        . . . . c d c d c . . . . 
                        . . . . c c c c c . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        `,img`
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . c . . . . . . 
                        . . . . . c c c . . . . . 
                        . . . . . c d c . . . . . 
                        . . c c c b d b c c c . . 
                        . . c d d d d d d d c . . 
                        . . . c d d d d d c . . . 
                        . . . . c d d d c . . . . 
                        . . . c d d b d d c . . . 
                        . . . c d b c b d c . . . 
                        . . . c c c . c c c . . . 
                        . . . . . . . . . . . . . 
                        `,img`
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . c . . . . . . 
                        . . . . . c c c . . . . . 
                        . . . . . c d c . . . . . 
                        . . c c c b d b c c c . . 
                        . . c d d d d d d d c . . 
                        . . . c d d d d d c . . . 
                        . . . . c d d d c . . . . 
                        . . . c d d b d d c . . . 
                        . . . c d b c b d c . . . 
                        . . . c c c . c c c . . . 
                        . . . . . . . . . . . . . 
                        `,img`
                        . . . . . . . . . . . . . 
                        . . . . . . c . . . . . . 
                        . . . . . c c c . . . . . 
                        . . . . . c d c . . . . . 
                        . . c c c b d b c c c . . 
                        . . c d d d d d d d c . . 
                        . . . c d d d d d c . . . 
                        . . . . c d d d c . . . . 
                        . . . c d d b c d c . . . 
                        . . . c d b c b c c . . . 
                        . . . c c c . c c c . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        `,img`
                        . . . . . . . . . . . . . 
                        . . . . . . c . . . . . . 
                        . . . . . . c . . . . . . 
                        . . . . . c d c . . . . . 
                        . . c c c c d c c c c . . 
                        . . c d d d d d d d c . . 
                        . . . c c c d c c c . . . 
                        . . . . c d c c d c . . . 
                        . . . . c d c d d d . . . 
                        . . . c d c . c d c . . . 
                        . . . c c . . . c c . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        `,img`
                        . . . . . . . . . . . . . 
                        . . . . . . c . . . . . . 
                        . . . . . . c . . . . . . 
                        . . . c c c d c . . . . . 
                        . . c c d c d c c c c . . 
                        . . c d c d d d d d c . . 
                        . . . c c c d c c c . . . 
                        . . . . c d c c d c . . . 
                        . . . . c d c d d d . . . 
                        . . . c d c c c d c . . . 
                        . . . c c . . . c c . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        `,img`
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . c c c c c . . . . . 
                        . . c c d c d c . . . . . 
                        . . c d d d c c . . . . . 
                        . . c c d c d c c c c . . 
                        . . c d c d d d c d c . . 
                        . . c c c c d c d c c . . 
                        . . . . . c c d d d c . . 
                        . . . . . c d c d c c . . 
                        . . . . . c c c c c . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        `,img`
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . c c c . . . . . . . 
                        . . c c d c c c . . . . . 
                        . . c d d d c c . . . . . 
                        . . c c d c d c c c . . . 
                        . . . c c d d d d c . . . 
                        . . . c c c d c c c . . . 
                        . . . c d c d c d c . . . 
                        . . . c c c c c c c . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        `,img`
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . c c c . . . . . . . 
                        . . c c d c c c c c . . . 
                        . . c d d d c c d c . . . 
                        . . c c d c d c c c . . . 
                        . . . c c d d d d c . . . 
                        . . c c d c d c c c . . . 
                        . . c d d d c c . . . . . 
                        . . c c d c c c . . . . . 
                        . . . c c c . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        `,img`
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . c c c . c c c . . . 
                        . . c c d c c c d c c . . 
                        . . c d d d c d d d c . . 
                        . . c c d c d c d c c . . 
                        . . . c c d d d c c . . . 
                        . . c c d c d c c . . . . 
                        . . c d d d c c . . . . . 
                        . . c c d c c . . . . . . 
                        . . . c c c . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        `,img`
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . c c c . . . 
                        . . . c c c c c d c c . . 
                        . . . c d c c d d d c . . 
                        . . . c c c d c d c c . . 
                        . . . . c d d d c c . . . 
                        . . . . c c d c c . . . . 
                        . . . . . c c c . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        `,img`
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . c c c c c c c . . . 
                        . . . c d c c c d c . . . 
                        . . . c c c d c c c . . . 
                        . . . . c d d d c c . . . 
                        . . . . c c d c c . . . . 
                        . . . . . c c c . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        `,img`
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . c c c . . . 
                        . . . . . . . c d c . . . 
                        . . . . . c c c c c . . . 
                        . . . . . c d c . . . . . 
                        . . . . . c c c . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        `,img`
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . c c c . . . . . 
                        . . . . . c d c . . . . . 
                        . . . . . c c c . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        `,img`
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . 
                        `],
                    75,
                    false
                    )
                    playSparkle()
                })
            })
        })
    } else if (sprites.readDataNumber(_pickup, "data_value") == num_moneyValue2) {
        text_moneyAdd.setIcon(img`
            . . c c c . . 
            . . c d c . . 
            c c c d c c c 
            c d d d d d c 
            c c c d c c c 
            . . c d c . . 
            . . c c c . . 
            `)
        text_moneyAdd.setMaxFontHeight(5)
        text_moneyAdd.z = 505
        text_moneyAdd.setVelocity(0, randint(9, 11))
        text_moneyAdd.lifespan = 750
        music.play(music.createSoundEffect(
        WaveShape.Triangle,
        2060,
        2060,
        46,
        60,
        50,
        SoundExpressionEffect.None,
        InterpolationCurve.Logarithmic
        ), music.PlaybackMode.InBackground)
        _pickup.y += -5
        timer.after(50, function () {
            music.play(music.createSoundEffect(
            WaveShape.Triangle,
            2470,
            2470,
            206,
            0,
            50,
            SoundExpressionEffect.None,
            InterpolationCurve.Logarithmic
            ), music.PlaybackMode.InBackground)
            timer.after(50, function () {
                _pickup.lifespan = 400
                animation.runImageAnimation(
                _pickup,
                [img`
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    . . . . c c c . . . . 
                    . . . . c d c . . . . 
                    . . . . c c c . . . . 
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . 
                    . . . . c c c . . . . 
                    . . . . c d c . . . . 
                    . . . . c d c . . . . 
                    . c c c c d c c c c . 
                    . c d d d d d d d c . 
                    . c c c c d c c c c . 
                    . . . . c d c . . . . 
                    . . . . c d c . . . . 
                    . . . . c c c . . . . 
                    . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . 
                    . . . . c c c . . . . 
                    . . . . c d c . . . . 
                    . . . . c d c . . . . 
                    . c c c c d c c c c . 
                    . c d d d d d d d c . 
                    . c c c c d c c c c . 
                    . . . . c d c c d c . 
                    . . . . c d c c c c . 
                    . . . . c c c . . . . 
                    . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . 
                    . . . . c c c . . . . 
                    . . . . c d c . . . . 
                    . . . . c d c . . . . 
                    . c c c c d c c c c . 
                    . c d d d d d c c c . 
                    . c c c c d c c d c c 
                    . c d c c d c d d d c 
                    . c c c c d c c d c c 
                    . . . . c c c c c c . 
                    . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    . . . . c c c . . . . 
                    . . . . c d c . . . . 
                    . . c c c d c c c . . 
                    . c c c d d d c c c . 
                    c c d c c d c c d c c 
                    c d d d c d c d d d c 
                    c c d c c c c c d c c 
                    . c c c . . . c c c . 
                    . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    . . . . c c c . . . . 
                    . . . . c d c . . . . 
                    . . c c c d c c c . . 
                    . c c c d d d d c . . 
                    c c d c c d c c c c . 
                    c d d d c d c c d c . 
                    c c d c c c c c c c . 
                    . c c c . . . . . . . 
                    . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    . . . . c c c . . . . 
                    . . . c c d c c . . . 
                    . . . c d d d c . . . 
                    . c c c c d c c c c . 
                    . c d c c c c c d c . 
                    . c c c . . . c c c . 
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    . . . . c c c . . . . 
                    . . . c c d c c . . . 
                    . . . c d d d c . . . 
                    . c c c c d c c . . . 
                    . c d c c c c . . . . 
                    . c c c . . . . . . . 
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    . . . . c c c . . . . 
                    . . . . c d c . . . . 
                    . . . . c c c . . . . 
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    . . . . c c c . . . . 
                    . . . . c d c . . . . 
                    . . . . c c c . . . . 
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    . . . . . . . . . . . 
                    `],
                50,
                false
                )
                music.play(music.createSoundEffect(
                WaveShape.Triangle,
                2600,
                2600,
                206,
                0,
                200,
                SoundExpressionEffect.None,
                InterpolationCurve.Logarithmic
                ), music.PlaybackMode.InBackground)
            })
        })
    } else if (sprites.readDataNumber(_pickup, "data_value") == num_moneyValue1) {
        text_moneyAdd.setMaxFontHeight(5)
        text_moneyAdd.setVelocity(0, randint(15, 20))
        text_moneyAdd.lifespan = 500
        text_moneyAdd.z = 500
        music.play(music.createSoundEffect(
        WaveShape.Triangle,
        2000,
        2000,
        46,
        60,
        100,
        SoundExpressionEffect.None,
        InterpolationCurve.Logarithmic
        ), music.PlaybackMode.InBackground)
        _pickup.y += -5
        timer.after(100, function () {
            _pickup.lifespan = 400
            animation.runImageAnimation(
            _pickup,
            [img`
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                . . . . c c c . . . . 
                . . . . c d c . . . . 
                . . . . c c c . . . . 
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                . . . . c c c . . . . 
                . . . . c d c . . . . 
                . . c c c d c c c . . 
                . . c d d d d d c . . 
                . . c c c d c c c . . 
                . . . . c d c . . . . 
                . . . . c c c . . . . 
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                . . . . c c c . . . . 
                . . . . c d c . . . . 
                . . c c c d c c c . . 
                . . c d d d d d c . . 
                . . c c c d c c c . . 
                . . . . c d c . . . . 
                . . . . c c c . . . . 
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                . . . . c c c . . . . 
                . . . . c d c . . . . 
                . . c c c d c c c . . 
                . . c d d d d d c . . 
                . . c c c d c c c . . 
                . . . . c d c . . . . 
                . . . . c c c . . . . 
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                . . . . c c c . . . . 
                . . . c c d c c . . . 
                . . . c d d d c . . . 
                . . . c c d c c . . . 
                . . . . c c c . . . . 
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                . . . . c c c . . . . 
                . . . c c d c c . . . 
                . . . c d d d c . . . 
                . . . c c d c c . . . 
                . . . . c c c . . . . 
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                . . . . c c c . . . . 
                . . . . c d c . . . . 
                . . . . c c c . . . . 
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                . . . . c c c . . . . 
                . . . . c d c . . . . 
                . . . . c c c . . . . 
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                . . . . . . . . . . . 
                `],
            50,
            false
            )
            music.play(music.createSoundEffect(
            WaveShape.Triangle,
            2470,
            2470,
            206,
            0,
            200,
            SoundExpressionEffect.None,
            InterpolationCurve.Logarithmic
            ), music.PlaybackMode.InBackground)
        })
    }
}
function moveTo (_sprite: Sprite, _origin: Sprite, _speed: number) {
    _num_knockbackX = _origin.x - _sprite.x
    _num_knockbackY = _origin.y - _sprite.y
    if (_num_knockbackY == 0 && _num_knockbackX == 0) {
        _num_knockbackX = randint(-10, 10)
        _num_knockbackY = randint(-10, 10)
    }
    _num_knockbackZ = Math.sqrt(_num_knockbackX * _num_knockbackX + _num_knockbackY * _num_knockbackY)
    _sprite.vx = _speed * (_num_knockbackX / _num_knockbackZ)
    _sprite.vy = _speed * (_num_knockbackY / _num_knockbackZ)
}
function enemyRoomTransition () {
    _bool_isEnemyRoom = true
    controller.moveSprite(sprite_player, 0, 0)
    sprite_player.setVelocity(0, 0)
    sprite_player.follow(sprite_cameraControl, 50)
    timer.after(700, function () {
        closeDoorsInView()
        sprite_player.follow(sprite_cameraControl, 0)
        sprite_player.setVelocity(0, 0)
        controller.moveSprite(sprite_player, 75, 75)
        for (let value of sprites.allOfKind(SpriteKind.BatSleeping)) {
            value.setFlag(SpriteFlag.Ghost, false)
        }
        wakeUpRobots()
    })
}
function createDungeonMusicInView () {
    for (let value of tiles.getTilesByType(assets.tile`Empty2`)) {
        if (isInView(value.x, value.y, sprite_cameraControl)) {
            sprite_dungeonMusic = sprites.create(img`
                c c c c c c c c c c c c c c c c 
                c c c c c c c c c c c c c c c c 
                c c c c c c c c c c c c c c c c 
                c c c c c c c c c c c c c c c c 
                c c c c c c c c c c c c c c c c 
                c c c c c c c c c c c c c c c c 
                c c c c c c c c c c c c c c c c 
                c c c c c c c c c c c c c c c c 
                c c c c c c c c c c c c c c c c 
                c c c c c c c c c c c c c c c c 
                c c c c c c c c c c c c c c c c 
                c c c c c c c c c c c c c c c c 
                c c c c c c c c c c c c c c c c 
                c c c c c c c c c c c c c c c c 
                c c c c c c c c c c c c c c c c 
                c c c c c c c c c c c c c c c c 
                `, SpriteKind.DungeonMusic)
            tiles.placeOnTile(sprite_dungeonMusic, value)
        }
    }
}
function createHUD () {
    text_timer = textsprite.create("00", 0, 13)
    text_timer.setIcon(img`
        . c c c c c . 
        c c d c d c c 
        c d d c d d c 
        c d d c c d c 
        c d d d d d c 
        c c d d d c c 
        . c c c c c . 
        `)
    text_timer.setMaxFontHeight(5)
    text_timer.setOutline(1, 12)
    text_timer.setFlag(SpriteFlag.Ghost, true)
    text_timer.setFlag(SpriteFlag.RelativeToCamera, true)
    text_timer.setPosition(134, 6)
    text_timer.z = 500
    num_currentMoney = 0
    text_money = textsprite.create("0", 0, 13)
    text_money.setIcon(img`
        c c c c c . . 
        c 7 7 7 c c . 
        c 6 7 7 7 c c 
        c 7 6 7 7 7 c 
        c c 6 6 7 7 c 
        . c c 7 6 7 c 
        . . c c c c c 
        `)
    text_money.setOutline(1, 12)
    text_money.setFlag(SpriteFlag.Ghost, true)
    text_money.setFlag(SpriteFlag.RelativeToCamera, true)
    text_money.setPosition(10, 20)
    text_money.z = 500
    num_currentHealth = 3
    sprite_hudHealth = sprites.create(assets.image`Hearts2`, SpriteKind.userInterface)
    sprite_hudHealth.setFlag(SpriteFlag.Ghost, true)
    sprite_hudHealth.setFlag(SpriteFlag.RelativeToCamera, true)
    sprite_hudHealth.z = 500
    sprite_hudHealth.setPosition(24, 9)
}
function playCutsceneSaveNPC (_npc: Sprite, _vx: number, _vy: number, _length: number, _dialog: string) {
    controller.moveSprite(sprite_player, 0, 0)
    bool_isPlayerFrozen = true
    sprite_player.setVelocity(0, 0)
    _npc.sayText(_dialog, 550, true)
    playCatNoise()
    if (sprites.readDataString(_npc, "data_type") == "cat1") {
        animation.runImageAnimation(
        _npc,
        [img`
            . . . . . . . . . . . . . . . . 
            . c c c c . . c c c c . . . . . 
            . c d d c c c c d d c . . . . . 
            . c b d d c c d d b c . . . . . 
            . c b b d d b d b b c . . . . . 
            . c d d d d d d d d c . . . . . 
            . c d c d d d c d d c . . . . . 
            . c c d c d c d c d c . c c c . 
            . c d d d b d d d d c . c d c . 
            . c c d b b b d d c c . c d c . 
            . . c c c c c c c c c c c d c . 
            . . c c d d c d d d b b d b c . 
            . . c d b c d b d d d c c c c . 
            . . c c c c c c b c d c . . . . 
            . . . . . . . c c c c c . . . . 
            . . . . . . . . . . . . . . . . 
            `],
        350,
        true
        )
    } else if (sprites.readDataString(_npc, "data_type") == "cat2") {
        animation.runImageAnimation(
        _npc,
        [img`
            . . . . . . . . . . . . . . . . 
            . c c c c . . c c c c . . . . . 
            . c d d c c c c d d c . . . . . 
            . c b d d c c d d b c . . . . . 
            . c b b d d b d b b c . . . . . 
            . c d d d d d d d d c . . . . . 
            . c d c d d d c d d c . . . . . 
            . c c d c d c d c d c . c c c . 
            . c d d d b d d d d c . c d c . 
            . c c d b b b d d c c . c d c . 
            . . c c c c c c c c c c c d c . 
            . . c c d d c d d d b b d b c . 
            . . c d b c d b d d d c c c c . 
            . . c c c c c c b c d c . . . . 
            . . . . . . . c c c c c . . . . 
            . . . . . . . . . . . . . . . . 
            `],
        350,
        true
        )
    } else if (sprites.readDataString(_npc, "data_type") == "cat3") {
        animation.runImageAnimation(
        _npc,
        [img`
            . . . . . . . . . . . . . . . . 
            . c c c c . . c c c c . . . . . 
            . c d d c c c c d d c . . . . . 
            . c b d d c c d d b c . . . . . 
            . c b b d d b d b b c . . . . . 
            . c d d d d d d d d c . . . . . 
            . c d c d d d c d d c . . . . . 
            . c c d c d c d c d c . c c c . 
            . c d d d b d d d d c . c d c . 
            . c c d b b b d d c c . c d c . 
            . . c c c c c c c c c c c d c . 
            . . c c d d c d d d b b d b c . 
            . . c d b c d b d d d c c c c . 
            . . c c c c c c b c d c . . . . 
            . . . . . . . c c c c c . . . . 
            . . . . . . . . . . . . . . . . 
            `],
        350,
        true
        )
    }
    timer.after(500, function () {
        music.play(music.createSoundEffect(WaveShape.Triangle, 1, 1588, 17, 0, 100, SoundExpressionEffect.Vibrato, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
        createSmokePosition(_npc.x, _npc.y)
        _npc.sayText(_dialog)
        if (sprites.readDataString(_npc, "data_type") == "cat1") {
            animation.runImageAnimation(
            _npc,
            [img`
                . . . . . . . c c c . . . . . . 
                . . . . . . . c d c . . . . . . 
                . . . . . c c c d c c . . . . . 
                . . . c c c b b b b c c c . . . 
                . . . c d d c b b c d d c . . . 
                . . . c b d d c c d d b c . . . 
                . . . c b b d b d d b b c . . . 
                . . . c d d d d d d d d c . . . 
                . . . c d c d d d c d d c . . . 
                . . . c c d c d c d c d c . . . 
                . . . c d d d b d d d d c . . . 
                . . . c c d b b b d d c c . . . 
                . . . c c c c c c c c c . . . . 
                . . . c d c . . . c d c . . . . 
                . . . c c c . . . c c c . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . . c c c . . . . . . . 
                . . . . . . c d c c . . . . . . 
                . . . . . c c c d c c . . . . . 
                . . . . . c b b b b c . . . . . 
                . . . c c c b b b b c c c . . . 
                . . . c d d c b b c d d c . . . 
                . . . c b d d c c d d b c . . . 
                . . . c b b d b d d b b c . . . 
                . . . c d d d d d d d d c . . . 
                . . . c d c d d d c d d c . . . 
                . . . c c d c d c d c d c . . . 
                . . . c d d d b d d d d c . . . 
                . . . c c d b b b d d c c . . . 
                . . . . c c c c c c c c . . . . 
                . . . . c c c . . c c c . . . . 
                . . . . c d c . . c d c . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . c c c . . . . . . 
                . . . . . . . c d c . . . . . . 
                . . . . . c c c d c c . . . . . 
                . . . . . c b b b b c . . . . . 
                . . . c c c b b b b c c c . . . 
                . . . c d d c b b c d d c . . . 
                . . . c b d d c c d d b c . . . 
                . . . c b b d b d d b b c . . . 
                . . . c d d d d d d d d c . . . 
                . . . c d c d d d c d d c . . . 
                . . . c c d c d c d c d c . . . 
                . . . c d d d b d d d d c . . . 
                . . . c c d b b b d d c c . . . 
                . . . . c c b c c c b c . . . . 
                . . . . . c c c . c c c . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . c c c . . . . . 
                . . . . . . . c c d c . . . . . 
                . . . c c c c c d c c c c . . . 
                . . . c d d c b b c d d c . . . 
                . . . c b d d c c d d b c . . . 
                . . . c b b d b d d b b c . . . 
                . . . c d d d d d d d d c . . . 
                . . . c d c d d d c d d c . . . 
                . . . c c d c d c d c d c . . . 
                . . . c d d d b d d d d c . . . 
                . . . c c d b b b d d c c . . . 
                . . . . c c d c c c d c . . . . 
                . . . . . c c c . c c c . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `],
            100,
            true
            )
        } else if (sprites.readDataString(_npc, "data_type") == "cat2") {
            animation.runImageAnimation(
            _npc,
            [img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                c c c . . . . c c c . . . . . . 
                c d d c . . c d d c . . . . . . 
                c b d d c c d d b c . . . . . . 
                c b b d b d d b b c . . . . . c 
                c d d d d d d d d c . . . . c d 
                c d c d d d c d d c . . . . c d 
                c c d c d c d c d c . . . c d c 
                c d d d b d d d d c c c c c d c 
                c c d b b b d d c c b d d b c c 
                c c c c c c c c c b d d d d c c 
                c d c . c d c c c c c c c d c c 
                c c c . c c c . . . . . c c d c 
                . . . . . . . . . . . . . c c c 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                c c c . . . . c c c . . . . . . 
                c d d c . . c d d c . . . . . . 
                c b d d c c d d b c . . . . . c 
                c b b d b d d b b c . . . . c d 
                c d d d d d d d d c . . . c d c 
                c d c d d d c d d c . . . c d c 
                c c d c d c d c d c c c c c d c 
                c d d d b d d d d c b d d b c c 
                c c d b b b d d c c b d d d c . 
                c c c c c c c c c c c c d c c . 
                c c b c c c b c c c c d c c . . 
                c d c c c d c c . . c c c . . . 
                c c c . c c c . . . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                c c c . . . . c c c . . . . . . 
                c d d c . . c d d c . . . . . . 
                c b d d c c d d b c . . . . . c 
                c b b d b d d b b c . . . . c d 
                c d d d d d d d d c . . . . c d 
                c d c d d d c d d c . . . c d c 
                c c d c d c d c d c c c c d c . 
                c d d d b d d d d c b d b c . . 
                c c d b b b d d c c b d d c . . 
                . c c c c c c c c c c c d c . . 
                . . . c d c c c d c c d c c . . 
                . . . c c c . c c c c c c . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                c c c . . . . c c c . . . . . . 
                c d d c . . c d d c . . . . . . 
                c b d d c c d d b c . . . . . . 
                c b b d b d d b b c . . . . . . 
                c d d d d d d d d c . . . . . c 
                c d c d d d c d d c . . . . c d 
                c c d c d c d c d c . . . . c d 
                c d d d b d d d d c . . . c d c 
                c c d b b b d d c c c c c c d c 
                c c c c c c c c c b d d d b c . 
                c d c . c d c c c b d d d d c . 
                c c c . c c c . c c c c c d c c 
                . . . . . . . . . . . . c c d c 
                . . . . . . . . . . . . . c c c 
                `],
            100,
            true
            )
        } else if (sprites.readDataString(_npc, "data_type") == "cat3") {
            animation.runImageAnimation(
            _npc,
            [img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                c c c . . . . c c c . . . . . . 
                c d d c . . c d d c . . . . . . 
                c b d d c c d d b c . . . . . . 
                c b b d b d d b b c . . . . . c 
                c d d d d d d d d c . . . . c d 
                c d c d d d c d d c . . . . c d 
                c c d c d c d c d c . . . c d c 
                c d d d b d d d d c c c c c d c 
                c c d b b b d d c c d d d d c c 
                c c c c c c c c c d d d d d c c 
                c d c . c d c c c c c c c d c c 
                c c c . c c c . . . . . c c d c 
                . . . . . . . . . . . . . c c c 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                c c c . . . . c c c . . . . . . 
                c d d c . . c d d c . . . . . . 
                c b d d c c d d b c . . . . . c 
                c b b d b d d b b c . . . . c d 
                c d d d d d d d d c . . . c d c 
                c d c d d d c d d c . . . c d c 
                c c d c d c d c d c c c c c d c 
                c d d d b d d d d c d d d d c c 
                c c d b b b d d c c d d d d c . 
                c c c c c c c c c c c c d c c . 
                c c d c c c d c c c c d c c . . 
                c d c c c d c c . . c c c . . . 
                c c c . c c c . . . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                c c c . . . . c c c . . . . . . 
                c d d c . . c d d c . . . . . . 
                c b d d c c d d b c . . . . . c 
                c b b d b d d b b c . . . . c d 
                c d d d d d d d d c . . . . c d 
                c d c d d d c d d c . . . c d c 
                c c d c d c d c d c c c c d c . 
                c d d d b d d d d c d d d c . . 
                c c d b b b d d c c d d d c . . 
                . c c c c c c c c c c c d c . . 
                . . . c d c c c d c c d c c . . 
                . . . c c c . c c c c c c . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                c c c . . . . c c c . . . . . . 
                c d d c . . c d d c . . . . . . 
                c b d d c c d d b c . . . . . . 
                c b b d b d d b b c . . . . . . 
                c d d d d d d d d c . . . . . c 
                c d c d d d c d d c . . . . c d 
                c c d c d c d c d c . . . . c d 
                c d d d b d d d d c . . . c d c 
                c c d b b b d d c c c c c c d c 
                c c c c c c c c c d d d d d c . 
                c d c . c d c c c c d d d d c . 
                c c c . c c c . . c c c c d c c 
                . . . . . . . . . . . . c c d c 
                . . . . . . . . . . . . . c c c 
                `],
            100,
            true
            )
        }
        _npc.setVelocity(_vx, _vy)
        timer.after(_length, function () {
            sprites.destroy(_npc)
            openDoorsInView()
            controller.moveSprite(sprite_player, 75, 75)
            bool_isPlayerFrozen = false
            if (num_winCondition >= 3) {
                sprite_questIcon = sprites.create(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . c c . . . . . . . 
                    . . . . . . c d c . . . . . . . 
                    . . . . . c d d c c c c c . . . 
                    . . . . c d d d d d d d c . . . 
                    . . . . c b d d b b b b c . . . 
                    . . . . . c b d c c c c c . . . 
                    . . . . . . c b c . . . . . . . 
                    . . . . . . . c c . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, SpriteKind.Player)
                animation.runImageAnimation(
                sprite_questIcon,
                [img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . c c . . . . . 
                    . . . . . . . . c d c . . . . . 
                    . . . . . . . c d d c c c c c . 
                    . . . . . . c d d d d d d d c . 
                    . . . . . . c b d d b b b b c . 
                    . . . . . . . c b d c c c c c . 
                    . . . . . . . . c b c . . . . . 
                    . . . . . . . . . c c . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . c c . . . . 
                    . . . . . . . . . c d c . . . . 
                    . . . . . . . . c d d c c c c c 
                    . . . . . . . c d d d d d d d c 
                    . . . . . . . c b d d b b b b c 
                    . . . . . . . . c b d c c c c c 
                    . . . . . . . . . c b c . . . . 
                    . . . . . . . . . . c c . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . c c . . . . . 
                    . . . . . . . . c d c . . . . . 
                    . . . . . . . c d d c c c c c . 
                    . . . . . . c d d d d d d d c . 
                    . . . . . . c b d d b b b b c . 
                    . . . . . . . c b d c c c c c . 
                    . . . . . . . . c b c . . . . . 
                    . . . . . . . . . c c . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . c c . . . . . . . 
                    . . . . . . c d c . . . . . . . 
                    . . . . . c d d c c c c c . . . 
                    . . . . c d d d d d d d c . . . 
                    . . . . c b d d b b b b c . . . 
                    . . . . . c b d c c c c c . . . 
                    . . . . . . c b c . . . . . . . 
                    . . . . . . . c c . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . c c . . . . . . . . 
                    . . . . . c d c . . . . . . . . 
                    . . . . c d d c c c c c . . . . 
                    . . . c d d d d d d d c . . . . 
                    . . . c b d d b b b b c . . . . 
                    . . . . c b d c c c c c . . . . 
                    . . . . . c b c . . . . . . . . 
                    . . . . . . c c . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . c c . . . . . . . 
                    . . . . . . c d c . . . . . . . 
                    . . . . . c d d c c c c c . . . 
                    . . . . c d d d d d d d c . . . 
                    . . . . c b d d b b b b c . . . 
                    . . . . . c b d c c c c c . . . 
                    . . . . . . c b c . . . . . . . 
                    . . . . . . . c c . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `],
                100,
                true
                )
                tiles.placeOnTile(sprite_questIcon, tiles.getTileLocation(42, 36))
                sprite_questIcon = sprites.create(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . c c . . . . . . . 
                    . . . . . . c d c . . . . . . . 
                    . . . . . c d d c c c c c . . . 
                    . . . . c d d d d d d d c . . . 
                    . . . . c b d d b b b b c . . . 
                    . . . . . c b d c c c c c . . . 
                    . . . . . . c b c . . . . . . . 
                    . . . . . . . c c . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, SpriteKind.Player)
                animation.runImageAnimation(
                sprite_questIcon,
                [img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . c c . . . . . 
                    . . . . . . . . c d c . . . . . 
                    . . . . . . . c d d c c c c c . 
                    . . . . . . c d d d d d d d c . 
                    . . . . . . c b d d b b b b c . 
                    . . . . . . . c b d c c c c c . 
                    . . . . . . . . c b c . . . . . 
                    . . . . . . . . . c c . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . c c . . . . 
                    . . . . . . . . . c d c . . . . 
                    . . . . . . . . c d d c c c c c 
                    . . . . . . . c d d d d d d d c 
                    . . . . . . . c b d d b b b b c 
                    . . . . . . . . c b d c c c c c 
                    . . . . . . . . . c b c . . . . 
                    . . . . . . . . . . c c . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . c c . . . . . 
                    . . . . . . . . c d c . . . . . 
                    . . . . . . . c d d c c c c c . 
                    . . . . . . c d d d d d d d c . 
                    . . . . . . c b d d b b b b c . 
                    . . . . . . . c b d c c c c c . 
                    . . . . . . . . c b c . . . . . 
                    . . . . . . . . . c c . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . c c . . . . . . . 
                    . . . . . . c d c . . . . . . . 
                    . . . . . c d d c c c c c . . . 
                    . . . . c d d d d d d d c . . . 
                    . . . . c b d d b b b b c . . . 
                    . . . . . c b d c c c c c . . . 
                    . . . . . . c b c . . . . . . . 
                    . . . . . . . c c . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . c c . . . . . . . . 
                    . . . . . c d c . . . . . . . . 
                    . . . . c d d c c c c c . . . . 
                    . . . c d d d d d d d c . . . . 
                    . . . c b d d b b b b c . . . . 
                    . . . . c b d c c c c c . . . . 
                    . . . . . c b c . . . . . . . . 
                    . . . . . . c c . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . c c . . . . . . . 
                    . . . . . . c d c . . . . . . . 
                    . . . . . c d d c c c c c . . . 
                    . . . . c d d d d d d d c . . . 
                    . . . . c b d d b b b b c . . . 
                    . . . . . c b d c c c c c . . . 
                    . . . . . . c b c . . . . . . . 
                    . . . . . . . c c . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `],
                100,
                true
                )
                tiles.placeOnTile(sprite_questIcon, tiles.getTileLocation(32, 36))
                sprite_questIcon = sprites.create(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . c c . . . . . . . 
                    . . . . . . c d c . . . . . . . 
                    . . . . . c d d c c c c c . . . 
                    . . . . c d d d d d d d c . . . 
                    . . . . c b d d b b b b c . . . 
                    . . . . . c b d c c c c c . . . 
                    . . . . . . c b c . . . . . . . 
                    . . . . . . . c c . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, SpriteKind.Player)
                animation.runImageAnimation(
                sprite_questIcon,
                [img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . c c c c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . c c c d d c c c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c b d d d d b c . . . . 
                    . . . . . c b d d b c . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . . c c . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . c c c c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . c c c d d c c c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c b d d d d b c . . . . 
                    . . . . . c b d d b c . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . . c c . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . c c c c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . c c c d d c c c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c b d d d d b c . . . . 
                    . . . . . c b d d b c . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . . c c . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . c c c c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . c c c d d c c c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c b d d d d b c . . . . 
                    . . . . . c b d d b c . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . . c c . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . c c c c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . c c c d d c c c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c b d d d d b c . . . . 
                    . . . . . c b d d b c . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . . c c . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . c c c c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . c c c d d c c c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c b d d d d b c . . . . 
                    . . . . . c b d d b c . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . . c c . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `],
                100,
                true
                )
                tiles.placeOnTile(sprite_questIcon, tiles.getTileLocation(25, 38))
                sprite_questIcon = sprites.create(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . c c . . . . . . . 
                    . . . . . . c d c . . . . . . . 
                    . . . . . c d d c c c c c . . . 
                    . . . . c d d d d d d d c . . . 
                    . . . . c b d d b b b b c . . . 
                    . . . . . c b d c c c c c . . . 
                    . . . . . . c b c . . . . . . . 
                    . . . . . . . c c . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, SpriteKind.Player)
                animation.runImageAnimation(
                sprite_questIcon,
                [img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . c c c c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . c c c d d c c c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c b d d d d b c . . . . 
                    . . . . . c b d d b c . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . . c c . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . c c c c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . c c c d d c c c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c b d d d d b c . . . . 
                    . . . . . c b d d b c . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . . c c . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . c c c c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . c c c d d c c c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c b d d d d b c . . . . 
                    . . . . . c b d d b c . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . . c c . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . c c c c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . c c c d d c c c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c b d d d d b c . . . . 
                    . . . . . c b d d b c . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . . c c . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . c c c c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . c c c d d c c c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c b d d d d b c . . . . 
                    . . . . . c b d d b c . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . . c c . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . c c c c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . . . c d d c . . . . . . 
                    . . . . c c c d d c c c . . . . 
                    . . . . c d d d d d d c . . . . 
                    . . . . c b d d d d b c . . . . 
                    . . . . . c b d d b c . . . . . 
                    . . . . . . c b b c . . . . . . 
                    . . . . . . . c c . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `],
                100,
                true
                )
                tiles.placeOnTile(sprite_questIcon, tiles.getTileLocation(25, 46))
            }
        })
    })
}
function playBatDie () {
    music.play(music.createSoundEffect(
    WaveShape.Square,
    randint(3000, 3500),
    0,
    80,
    0,
    300,
    SoundExpressionEffect.Warble,
    InterpolationCurve.Linear
    ), music.PlaybackMode.InBackground)
}
function cat2Dialog (_cat2: Sprite) {
    if (!(bool_isNPCTalking)) {
        bool_isNPCTalking = true
        animation.runImageAnimation(
        _cat2,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . c c c c . . c c c c . . . . . 
            . c d d c c c c d d c . . . . . 
            . c b d d c c d d b c . . . . . 
            . c b b d d b d b b c . . . . . 
            . c d d d d d d d d c . c c . . 
            . c d d c d c d d d c c d c . . 
            . c c c d d d c c d c c d c . . 
            . c b d d b d d b d c c d c . . 
            . c c d b b b d b c c c d c . . 
            . . c c c c c c c c b d c . . . 
            . . . c b c d d b d d c . . . . 
            . . . c b c c c c c d c . . . . 
            . . . c c c . . . c c c . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . c c c c . . c c c c . . . . . 
            . c d d c c c c d d c . . . . . 
            . c b d d c c d d b c . . . . . 
            . c b b d d b d b b c . . . . . 
            . c d d d d d d d d c . c c . . 
            . c d d d c d c d d c c d c . . 
            . c d c c d d d c c c c d c . . 
            . c d b d d b d d b c c d c . . 
            . c c b d b b b d c c c d c . . 
            . . c c c b b b c c b d c . . . 
            . . c d d c c c b d d c . . . . 
            . . c c c c c b c c d c . . . . 
            . . . . . . c c c . c c . . . . 
            . . . . . . . . . . . . . . . . 
            `],
        350,
        true
        )
        playCatNoise()
        if (num_lastDialogNPC3 == 0) {
            _num_dialogLength = 2500
            _cat2.sayText("I was waiting for so long!!", _num_dialogLength, true)
            num_lastDialogNPC3 = 1
        } else if (num_lastDialogNPC3 == 1) {
            _num_dialogLength = 2000
            _cat2.sayText("It was so scary!...", _num_dialogLength, true)
            num_lastDialogNPC3 = 2
        } else {
            _num_dialogLength = 2500
            _cat2.sayText("Electronic sounds freak me out!!", _num_dialogLength, true)
            num_lastDialogNPC3 = 0
        }
        timer.after(_num_dialogLength, function () {
            bool_isNPCTalking = false
            animation.runImageAnimation(
            _cat2,
            [img`
                . . . . . . . . . . . . . . . . 
                . c c c . . . . c c c . . . . . 
                . c d d c . . c d d c . . . . . 
                . c b d d c c d d b c . . . . . 
                . c b b d d b d b b c . . . . . 
                . c d d d d d d d d c . . . . . 
                . c d d c d c d d d c . . . . . 
                . c c c d d d c c d c . . . . . 
                . c b d d b d d d b c . . . c c 
                . c c d b b b d d c c . . c d c 
                . . c c c c c c c c c c c c d c 
                . . . c d d d d d d b d d d c . 
                . . . c d d d d b d d c c c . . 
                . . . c d c c d c c d c . . . . 
                . . . c c . c c . . c c . . . . 
                . . . . . . . . . . . . . . . . 
                `],
            200,
            false
            )
        })
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile57`, function (sprite, location) {
    flipSwitch(assets.tile`myTile58`, assets.tile`myTile56`, assets.tile`myTile67`, assets.tile`myTile59`, location.column, location.row)
    timer.after(1650, function () {
        num_winCondition = 1
        completeLevel()
        tiles.setWallAt(sprite_NPC.tilemapLocation(), false)
        playCutsceneSaveNPC(sprite_NPC, 0, 75, 2500, "Yippee!!")
        timer.after(100, function () {
            controller.moveSprite(sprite_player, 0, 0)
            timer.after(100, function () {
                controller.moveSprite(sprite_player, 0, 0)
                timer.after(100, function () {
                    controller.moveSprite(sprite_player, 0, 0)
                })
            })
        })
    })
})
function createBullet (_origin: Sprite, _destination: Sprite) {
    sprite_bullet = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . d d . . . . . . . 
        . . . . . . d d d d . . . . . . 
        . . . . . . d d d d . . . . . . 
        . . . . . . . d d . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Bullet)
    sprite_bullet.setPosition(_origin.x, _origin.y + 2)
    sprite_bullet.lifespan = 2000
    sprite_bullet.z = 300
    sprite_bullet.setFlag(SpriteFlag.GhostThroughWalls, true)
    moveTo(sprite_bullet, _destination, 75)
}
function knockback (_sprite: Sprite, _origin: Sprite, _speed: number, _time: number) {
    _sprite.setFlag(SpriteFlag.GhostThroughSprites, true)
    _num_knockbackX = _sprite.x - _origin.x
    _num_knockbackY = _sprite.y - _origin.y
    if (_num_knockbackY == 0 && _num_knockbackX == 0) {
        _num_knockbackX = randint(-10, 10)
        _num_knockbackY = randint(-10, 10)
    }
    _num_knockbackZ = Math.sqrt(_num_knockbackX * _num_knockbackX + _num_knockbackY * _num_knockbackY)
    _sprite.vx = _speed * (_num_knockbackX / _num_knockbackZ)
    _sprite.vy = _speed * (_num_knockbackY / _num_knockbackZ)
    timer.after(_time, function () {
        _sprite.setVelocity(0, 0)
        _sprite.setFlag(SpriteFlag.GhostThroughSprites, false)
    })
}
function updateEnemies () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (!(isInView(value.x, value.y, sprite_cameraControl))) {
            sprites.destroy(value)
        }
        if (sprites.readDataString(value, "data_type") == "bat") {
            if (sprites.readDataNumber(value, "data_isBusy") == 0) {
                if (game.runtime() - sprites.readDataNumber(value, "data_lastDirectionChangeTime") > 1.5 && Math.percentChance(5)) {
                    sprites.setDataNumber(value, "data_lastDirectionChangeTime", game.runtime())
                    if (sprites.readDataNumber(value, "data_directionChange") == 0) {
                        sprites.setDataNumber(value, "data_directionChange", 1)
                    } else {
                        sprites.setDataNumber(value, "data_directionChange", 0)
                    }
                }
                if (sprites.readDataNumber(value, "data_directionChange") == 0) {
                    sprites.changeDataNumberBy(value, "data_directionAngle", 0.1)
                } else {
                    sprites.changeDataNumberBy(value, "data_directionAngle", -0.1)
                }
                value.setVelocity(Math.cos(sprites.readDataNumber(value, "data_directionAngle")) * 20, Math.sin(sprites.readDataNumber(value, "data_directionAngle")) * 20)
            }
        }
        if (sprites.readDataString(value, "data_type") == "drone") {
            if (sprites.readDataNumber(value, "data_isBusy") == 0) {
                if (game.runtime() - sprites.readDataNumber(value, "data_lastDirectionChangeTime") > 1.5 && Math.percentChance(5)) {
                    sprites.setDataNumber(value, "data_lastDirectionChangeTime", game.runtime())
                    if (sprites.readDataNumber(value, "data_directionChange") == 0) {
                        sprites.setDataNumber(value, "data_directionChange", 1)
                    } else {
                        sprites.setDataNumber(value, "data_directionChange", 0)
                    }
                }
                if (sprites.readDataNumber(value, "data_directionChange") == 0) {
                    sprites.changeDataNumberBy(value, "data_directionAngle", 0.1)
                } else {
                    sprites.changeDataNumberBy(value, "data_directionAngle", -0.1)
                }
                value.setVelocity(Math.cos(sprites.readDataNumber(value, "data_directionAngle")) * 13, Math.sin(sprites.readDataNumber(value, "data_directionAngle")) * 13)
            }
            if (game.runtime() - sprites.readDataNumber(value, "data_lastAttackTime") > 3000 && Math.percentChance(2)) {
                if (sprites.readDataNumber(value, "data_health") > 0) {
                    droneAttack(value)
                    sprites.setDataNumber(value, "data_lastAttackTime", game.runtime())
                }
            }
        }
    }
}
function playerAttack () {
    if (bool_isPlayerFrozen == false) {
        Bool_isAttacking = true
        bool_isPlayerFrozen = true
        if (num_lastFacing == 1) {
            sprite_sword.setPosition(sprite_player.x, sprite_player.y - 10)
            animation.runImageAnimation(
            sprite_sword,
            [img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . c c . . . . . . . . . . . . . 
                . c 1 c . . . . . . . . . . . . 
                c 1 1 c . . . . . . . . . . . . 
                c 1 c 1 c . . . . . . . . . . . 
                1 c c 1 c . . . . . . . . . . . 
                1 c . c 1 c c c . . . . . . . . 
                c . . c 1 b b c . . . . . . . . 
                . . c b b b c . . . . . . . . . 
                . . c c c b c . . . . . . . . . 
                . . . . . c c . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . c c 1 1 1 1 c . . . . . . 
                . . c 1 1 1 1 c 1 c . . . . . . 
                . c 1 1 1 c c c 1 c . . . . . . 
                . c 1 1 c . . c 1 c . . . . . . 
                c 1 1 c . . . c 1 c . . . . . . 
                c 1 c . . . . c 1 c . . . . . . 
                1 c . . . . c c 1 c c . . . . . 
                1 c . . . c b b b b b c . . . . 
                c . . . . . c c b c c . . . . . 
                . . . . . . . . c . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . c c 1 1 1 1 1 1 c c . . . 
                . . c 1 1 1 1 1 1 1 1 1 1 c . . 
                . c 1 1 c c c c c c 1 1 1 1 c . 
                c . c c . . . . . . c c 1 1 c . 
                1 c . . . . . . . . . . c c 1 c 
                c . . . . . . . . . . . . c 1 c 
                . . . . . . . . . . . . c 1 c . 
                . . . . . . . . . . . . c 1 c . 
                . . . . . . . . . c c c 1 c . . 
                . . . . . . . . . c b b 1 c . . 
                . . . . . . . . . . c b b b c . 
                . . . . . . . . . . c b c c c . 
                . . . . . . . . . . c c . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . c . c c c c c . . . . 
                . . . . c 1 c 1 1 1 1 1 c c . . 
                . . c . . c . c c c c 1 1 1 c . 
                . c 1 c . . . . . . . c c 1 1 c 
                . . c . . . . . . . . . . c 1 c 
                . . . . . . . . . . . . . c c 1 
                . . . . . . . . . . . . . . c 1 
                . . . . . . . . . . . . . c 1 c 
                . . . . . . . . . . . . . c 1 c 
                . . . . . . . . . . c c c 1 c . 
                . . . . . . . . . . c b b 1 c . 
                . . . . . . . . . . . c b b b c 
                . . . . . . . . . . . c b c c c 
                . . . . . . . . . . . c c . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . c . . . 
                . . . . . . . . . . . c 1 c c . 
                . . . . . . . . . . . . c 1 1 c 
                . . . . . . . . . . . . . c 1 1 
                . . . . . . . . . . . . . c 1 1 
                . . . . . . . . . . . . . . c 1 
                . . . . . . . . . . . . . . c 1 
                . . . . . . . . . . . . . c 1 c 
                . . . . . . . . . . . . . c 1 c 
                . . . . . . . . . . c c c 1 c . 
                . . . . . . . . . . c b b 1 c . 
                . . . . . . . . . . . c b b b c 
                . . . . . . . . . . . c b c c c 
                . . . . . . . . . . . c c . . . 
                . . . . . . . . . . . . . . . . 
                `],
            40,
            false
            )
        } else if (num_lastFacing == 2) {
            sprite_sword.setPosition(sprite_player.x + 10, sprite_player.y)
            animation.runImageAnimation(
            sprite_sword,
            [img`
                . . . . . . c 1 1 c c . . . . . 
                . . . . . . . c c 1 1 c c . . . 
                . . . . c c . . c c 1 1 c . . . 
                . . . . c b c c 1 1 c c . . . . 
                . . . . c b 1 1 c c . . . . . . 
                . . . c b b b c . . . . . . . . 
                . . . c c c b c . . . . . . . . 
                . . . . . . c c . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . c 1 1 c c . . . . 
                . . . . . . . . c c 1 1 c c . . 
                . . . . . . . . . . c 1 1 1 c . 
                . . . . . . . . . . . c 1 1 1 c 
                . . . . . . . . . . . . c 1 1 c 
                . . . . . . . . c . . . . c 1 1 
                . . . . . . . c b c . . . c 1 1 
                . . . . . . . c b c c c c c c 1 
                . . . . . . c b b 1 1 1 1 1 1 1 
                . . . . . . . c b c c c c c c c 
                . . . . . . . c b c . . . . . . 
                . . . . . . . . c . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . c 1 c . . . 
                . . . . . . . . . . . c . c . . 
                . . . . . . . . . . . . c 1 c . 
                . . . . . . . . . . . . c 1 1 c 
                . . . . . . . . . . . . . c 1 c 
                . . . . . . . . . . . . . c 1 1 
                . . . . . . . . . . . . . c 1 1 
                . . . . . . . . . . . . . c 1 1 
                . . . . . . . . . . . . . c 1 1 
                . . . . . . c c . . . . . c 1 1 
                . . . c c c b c . . . . c 1 1 1 
                . . . c b b b c . . . . c 1 1 c 
                . . . . c b 1 1 c c . c 1 1 1 c 
                . . . . c b c c 1 1 c c 1 1 c . 
                . . . . c c . . c c 1 1 c c . . 
                . . . . . . . . . . c c . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . c . . . 
                . . . . . . . . . . . c 1 c . . 
                . . . . . . . . . . . . c . . . 
                . . . . . . . . . . . . . . c . 
                . . . . . . . . . . . . . c 1 c 
                . . . . . . . . . . . . . . c . 
                . . . . . . . . . . . . . c 1 c 
                . . . . . . . . . . . . . c 1 c 
                . . . . . . . . . . . . . c 1 c 
                . . . . . c c . . . . . . c 1 c 
                . . c c c b c . . . . . c 1 1 c 
                . . c b b b c . . . . . c 1 c . 
                . . . c b 1 1 c c . c c 1 1 c . 
                . . . c b c c 1 1 c c 1 1 c . . 
                . . . c c . . c c 1 1 c c . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . c c . . . . . . . . . . 
                . c c c b c . . . . . . . c . . 
                . c b b b c . . . . . . c 1 c . 
                . . c b 1 1 c c . . c c 1 c . . 
                . . c b c c 1 1 c c 1 1 1 c . . 
                . . c c . . c c 1 1 1 1 c . . . 
                `],
            40,
            false
            )
        } else if (num_lastFacing == 3) {
            sprite_sword.setPosition(sprite_player.x - 10, sprite_player.y)
            animation.runImageAnimation(
            sprite_sword,
            [img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . c c . . . . . . 
                . . . . . . . . c b c c c . . . 
                . . . . . . . . c b b b c . . . 
                . . . . . . c c 1 1 b c . . . . 
                . . . . c c 1 1 c c b c . . . . 
                . . . c 1 1 c c . . c c . . . . 
                . . . c c 1 1 c c . . . . . . . 
                . . . . . c c 1 1 c . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . c . . . . . . . . 
                . . . . . . c b c . . . . . . . 
                c c c c c c c b c . . . . . . . 
                1 1 1 1 1 1 1 b b c . . . . . . 
                1 c c c c c c b c . . . . . . . 
                1 1 c . . . c b c . . . . . . . 
                1 1 c . . . . c . . . . . . . . 
                c 1 1 c . . . . . . . . . . . . 
                c 1 1 1 c . . . . . . . . . . . 
                . c 1 1 1 c . . . . . . . . . . 
                . . c c 1 1 c c . . . . . . . . 
                . . . . c c 1 1 c . . . . . . . 
                `,img`
                . . . . c c . . . . . . . . . . 
                . . c c 1 1 c c . . c c . . . . 
                . c 1 1 c c 1 1 c c b c . . . . 
                c 1 1 1 c . c c 1 1 b c . . . . 
                c 1 1 c . . . . c b b b c . . . 
                1 1 1 c . . . . c b c c c . . . 
                1 1 c . . . . . c c . . . . . . 
                1 1 c . . . . . . . . . . . . . 
                1 1 c . . . . . . . . . . . . . 
                1 1 c . . . . . . . . . . . . . 
                1 1 c . . . . . . . . . . . . . 
                c 1 c . . . . . . . . . . . . . 
                c 1 1 c . . . . . . . . . . . . 
                . c 1 c . . . . . . . . . . . . 
                . . c . c . . . . . . . . . . . 
                . . . c 1 c . . . . . . . . . . 
                `,img`
                . . . c c 1 1 c c . . c c . . . 
                . . c 1 1 c c 1 1 c c b c . . . 
                . c 1 1 c c . c c 1 1 b c . . . 
                . c 1 c . . . . . c b b b c . . 
                c 1 1 c . . . . . c b c c c . . 
                c 1 c . . . . . . c c . . . . . 
                c 1 c . . . . . . . . . . . . . 
                c 1 c . . . . . . . . . . . . . 
                c 1 c . . . . . . . . . . . . . 
                . c . . . . . . . . . . . . . . 
                c 1 c . . . . . . . . . . . . . 
                . c . . . . . . . . . . . . . . 
                . . . c . . . . . . . . . . . . 
                . . c 1 c . . . . . . . . . . . 
                . . . c . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . c 1 1 1 1 c c . . c c . . 
                . . c 1 1 1 c c 1 1 c c b c . . 
                . . c 1 c c . . c c 1 1 b c . . 
                . c 1 c . . . . . . c b b b c . 
                . . c . . . . . . . c b c c c . 
                . . . . . . . . . . c c . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `],
            40,
            false
            )
        } else {
            sprite_sword.setPosition(sprite_player.x, sprite_player.y + 10)
            animation.runImageAnimation(
            sprite_sword,
            [img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . c c . . . . . 
                . . . . . . . . . c b c c c . . 
                . . . . . . . . . c b b b c . . 
                . . . . . . . . c b b 1 c . . c 
                . . . . . . . . c c c 1 c . c 1 
                . . . . . . . . . . . c 1 c c 1 
                . . . . . . . . . . . c 1 c 1 c 
                . . . . . . . . . . . . c 1 1 c 
                . . . . . . . . . . . . c 1 c . 
                . . . . . . . . . . . . . c c . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . c . . . . . . . . 
                . . . . . c c b c c . . . . . c 
                . . . . c b b b b b c . . . c 1 
                . . . . . c c 1 c c . . . . c 1 
                . . . . . . c 1 c . . . . c 1 c 
                . . . . . . c 1 c . . . c 1 1 c 
                . . . . . . c 1 c . . c 1 1 c . 
                . . . . . . c 1 c c c 1 1 1 c . 
                . . . . . . c 1 c 1 1 1 1 c . . 
                . . . . . . c 1 1 1 1 c c . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . c c . . . . . . . . . . 
                . c c c b c . . . . . . . . . . 
                . c b b b c . . . . . . . . . . 
                . . c 1 b b c . . . . . . . . . 
                . . c 1 c c c . . . . . . . . . 
                . c 1 c . . . . . . . . . . . . 
                . c 1 c . . . . . . . . . . . . 
                c 1 c . . . . . . . . . . . . c 
                c 1 c c . . . . . . . . . . c 1 
                . c 1 1 c c . . . . . . c c . c 
                . c 1 1 1 1 c c c c c c 1 1 c . 
                . . c 1 1 1 1 1 1 1 1 1 1 c . . 
                . . . c c 1 1 1 1 1 1 c c . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . c c . . . . . . . . . . . 
                c c c b c . . . . . . . . . . . 
                c b b b c . . . . . . . . . . . 
                . c 1 b b c . . . . . . . . . . 
                . c 1 c c c . . . . . . . . . . 
                c 1 c . . . . . . . . . . . . . 
                c 1 c . . . . . . . . . . . . . 
                1 c . . . . . . . . . . . . . . 
                1 c c . . . . . . . . . . . . . 
                c 1 c . . . . . . . . . . c . . 
                c 1 1 c c . . . . . . . c 1 c . 
                . c 1 1 1 c c c c . c . . c . . 
                . . c c 1 1 1 1 1 c 1 c . . . . 
                . . . . c c c c c . c . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . c c . . . . . . . . . . . 
                c c c b c . . . . . . . . . . . 
                c b b b c . . . . . . . . . . . 
                . c 1 b b c . . . . . . . . . . 
                . c 1 c c c . . . . . . . . . . 
                c 1 c . . . . . . . . . . . . . 
                c 1 c . . . . . . . . . . . . . 
                1 c . . . . . . . . . . . . . . 
                1 c . . . . . . . . . . . . . . 
                1 1 c . . . . . . . . . . . . . 
                1 1 c . . . . . . . . . . . . . 
                c 1 1 c . . . . . . . . . . . . 
                . c c 1 c . . . . . . . . . . . 
                . . . c . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `],
            40,
            false
            )
        }
        controller.moveSprite(sprite_player, 0, 0)
        music.play(music.createSoundEffect(
        WaveShape.Noise,
        1188,
        5000,
        0,
        40,
        125,
        SoundExpressionEffect.None,
        InterpolationCurve.Curve
        ), music.PlaybackMode.InBackground)
        timer.after(300, function () {
            controller.moveSprite(sprite_player, 75, 75)
            sprite_sword.setPosition(-32, -32)
            bool_isPlayerFrozen = false
            Bool_isAttacking = false
        })
    }
}
function playBatAttack () {
    music.play(music.createSoundEffect(
    WaveShape.Sawtooth,
    randint(3500, 4000),
    5000,
    100,
    0,
    300,
    SoundExpressionEffect.Vibrato,
    InterpolationCurve.Logarithmic
    ), music.PlaybackMode.InBackground)
}
function wakeUpBat (_bat: Sprite) {
    _bat.setFlag(SpriteFlag.Ghost, false)
    playBatNoise()
    animation.runImageAnimation(
    _bat,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . c . . . . . c . . . . . 
        . . . c b c . . . c b c . . . . 
        . . . c b c . . . c b c . . . . 
        . . c b b c c c c c b b c . . . 
        . . c b c b 7 7 7 b c b c . . . 
        . c b c b 7 7 6 7 7 b c b c . . 
        . c b b c 7 7 7 7 7 c b b c . . 
        . c b c b c 7 7 7 c b c b c . . 
        c b c c b c b b b c b c c b c . 
        c b c b c b c b c b c b c b c . 
        c d c b c c c c c c c b c d c . 
        c c c b c c c c c c c b c c c . 
        . . c d c c c c c c c d c . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . c c c . . . . . c c c . . . 
        . . c b c . c c c . c b c . . . 
        . . c b c c 7 7 7 c c b c . . . 
        c c c b c 7 7 6 7 7 c b c c c . 
        c b c c b 7 7 6 7 7 b c c b c . 
        c b b c b 7 7 7 7 7 b c b b c . 
        c b c b c b 7 7 7 b c b c b c . 
        c b c b b c b b b c b b c b c . 
        c b c b c c b b b c c b c b c . 
        c b c b c c c c c c c b c b c . 
        c d c b c . . . . . c b c d c . 
        c c c b c . . . . . c b c c c . 
        . . c d c . . . . . c d c . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . c c c . . . . . c c c . . . 
        . . c b c . c c c . c b c . . . 
        . . c b c c 7 7 7 c c b c . . . 
        c c c b c 7 7 6 7 7 c b c c c . 
        c b c c b 7 7 6 7 7 b c c b c . 
        c b b c b 7 7 7 7 7 b c b b c . 
        c b c b c b 7 7 7 b c b c b c . 
        c b c b b c b b b c b b c b c . 
        c b c b c c b b b c c b c b c . 
        c b c b c c c c c c c b c b c . 
        c d c b c . . . . . c b c d c . 
        c c c b c . . . . . c b c c c . 
        . . c d c . . . . . c d c . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . c c c . . . . . c c c . . . 
        . . c b c . c c c . c b c . . . 
        . . c b c c 7 7 7 c c b c . . . 
        c c c b c 7 7 6 7 7 c b c c c . 
        c b c c b 7 7 6 7 7 b c c b c . 
        c b b c b 7 7 7 7 7 b c b b c . 
        c b c b c b 7 7 7 b c b c b c . 
        c b c b b c b b b c b b c b c . 
        c b c b c c b b b c c b c b c . 
        c b c b c c c c c c c b c b c . 
        c d c b c . . . . . c b c d c . 
        c c c b c . . . . . c b c c c . 
        . . c d c . . . . . c d c . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . c c c . . . . . c c c . . . 
        . . c b c . c c c . c b c . . . 
        . . c b c c 7 7 7 c c b c . . . 
        c c c b c 7 7 6 7 7 c b c c c . 
        c b c c b 7 7 6 7 7 b c c b c . 
        c b b c b 7 7 7 7 7 b c b b c . 
        c b c b c b 7 7 7 b c b c b c . 
        c b c b b c b b b c b b c b c . 
        c b c b c c b b b c c b c b c . 
        c b c b c c c c c c c b c b c . 
        c d c b c . . . . . c b c d c . 
        c c c b c . . . . . c b c c c . 
        . . c d c . . . . . c d c . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . c c c . . . . . c c c . . . 
        . . c b c . . . . . c b c . . . 
        . . c b c . . . . . c b c . . . 
        c c c b b c c c c c b b c c c . 
        c b c b c b 7 7 7 b c b c b c . 
        c b b c b 7 7 6 7 7 b c b b c . 
        c b c b c 7 7 7 7 7 c b c b c . 
        c b c b b c 7 7 7 c b b c b c . 
        c b c b b c b b b c b b c b c . 
        c b c b c b b b b b c b c b c . 
        c d c b c c c c c c c b c d c . 
        c c c b c . . . . . c b c c c . 
        . . c d c . . . . . c d c . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . c . . . . . c . . . . . 
        . . . c b c . . . c b c . . . . 
        . . . c b c . . . c b c . . . . 
        . . c c b c c c c c b c c . . . 
        . c b c c b 7 7 7 b c c b c . . 
        . c b c c 7 7 6 7 7 c c b c . . 
        c c b c b c 7 7 7 c b c b c c . 
        c b b c b c 7 7 7 c b c b b c . 
        c b c c b c b b b c b c c b c . 
        c b c b b c b b b c b b c b c . 
        c d c b c c c c c c c b c d c . 
        c c c b c . . . . . c b c c c . 
        . . c d c . . . . . c d c . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . c c c . . . . . c c c . . . 
        . . c b c . . . . . c b c . . . 
        . . c b c . . . . . c b c . . . 
        c c c b b c c c c c b b c c c . 
        c b c b c b 7 7 7 b c b c b c . 
        c b b c b 7 7 6 7 7 b c b b c . 
        c b c b c 7 7 7 7 7 c b c b c . 
        c b c b b c 7 7 7 c b b c b c . 
        c b c b b c b b b c b b c b c . 
        c b c b c b b b b b c b c b c . 
        c d c b c c c c c c c b c d c . 
        c c c b c . . . . . c b c c c . 
        . . c d c . . . . . c d c . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . c c c . . . . . c c c . . . 
        . . c b c . . . . . c b c . . . 
        . . c b c . c c c . c b c . . . 
        c c c b c c 7 7 7 c c b c c c . 
        c b c c b 7 7 6 7 7 b c c b c . 
        c b b c b 7 7 7 7 7 b c b b c . 
        c b c b c b 7 7 7 b c b c b c . 
        c b c b b c b b b c b b c b c . 
        c b c b c c b b b c c b c b c . 
        c b c b c c c c c c c b c b c . 
        c d c b c . . . . . c b c d c . 
        c c c b c . . . . . c b c c c . 
        . . c d c . . . . . c d c . . . 
        `],
    75,
    false
    )
    sprites.setDataNumber(_bat, "data_isBusy", 1)
    sprites.setDataNumber(_bat, "data_lastDirectionChangeTime", game.runtime())
    sprites.setDataNumber(_bat, "data_lastAttackTime", game.runtime())
    sprites.setDataNumber(_bat, "data_directionChange", randint(0, 1))
    sprites.setDataNumber(_bat, "data_directionAngle", randint(0, 10))
    timer.after(800, function () {
        if (sprites.readDataNumber(_bat, "data_health") == 2) {
            sprites.setDataNumber(_bat, "data_isBusy", 0)
            animation.runImageAnimation(
            _bat,
            [img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . c c c . . . . . c c c . . . 
                . . c c c . . . . . c b c . . . 
                . . c b c . . . . . c b c . . . 
                c c c b c . c c c . c b b c c . 
                c b c b c c 7 7 7 c c c b c c . 
                c b b c b 7 7 6 7 7 b c c b c . 
                c b c b b 7 7 7 7 7 c b b b c . 
                c b c c c b 7 7 7 c b b c b c . 
                c b c b b c b b b c c b c b c . 
                c d c b c c b b b c c b c b c . 
                c c c b c c c c c c c b c b c . 
                c c c b c c c c c c c b c d c . 
                c c c b c c c c c c c d c c c . 
                . . c d c c c c c c c c c . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . c c c . . . . . c c c . . . 
                . . c c c . . . . . c c c . . . 
                . . c b c . . . . . c b c . . . 
                c c c b c . c c c . c b c c c . 
                c c c b c c 7 7 7 c c b c c c . 
                c b c c b 7 7 6 7 7 b c c b c . 
                c b b c b 7 7 7 7 7 b c b b c . 
                c b c b c b 7 7 7 b c b c b c . 
                c b c b b c b b b c b b c b c . 
                c b c b c c b b b c c b c b c . 
                c b c b c c c c c c c b c b c . 
                c d c b c c c c c c c b c d c . 
                c c c b c c c c c c c b c c c . 
                . . c d c c c c c c c d c . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . c c c . . . . . c c c . . . 
                . . c b c . . . . . c c c . . . 
                . . c b c . . . . . c b c . . . 
                c c b b c . c c c . c b c c c . 
                c c b c c c 7 7 7 c c b c b c . 
                c b c c b 7 7 6 7 7 b c b b c . 
                c b b b c 7 7 7 7 7 b b c b c . 
                c b c b b c 7 7 7 b c c c b c . 
                c b c b c c b b b c b b c b c . 
                c b c b c c b b b c c b c d c . 
                c b c b c c c c c c c b c c c . 
                c d c b c c c c c c c b c c c . 
                c c c d c c c c c c c b c c c . 
                . . c c c c c c c c c d c . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . c c c . . . . . c c c . . . 
                . . c c c . . . . . c c c . . . 
                . . c b c . . . . . c b c . . . 
                c c c b c . c c c . c b c c c . 
                c c c b c c 7 7 7 c c b c c c . 
                c b c c b 7 7 6 7 7 b c c b c . 
                c b b c b 7 7 7 7 7 b c b b c . 
                c b c b c b 7 7 7 b c b c b c . 
                c b c b b c b b b c b b c b c . 
                c b c b c c b b b c c b c b c . 
                c b c b c c c c c c c b c b c . 
                c d c b c c c c c c c b c d c . 
                c c c b c c c c c c c b c c c . 
                . . c d c c c c c c c d c . . . 
                `],
            100,
            true
            )
        }
    })
}
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (bool_settingMusic) {
        bool_settingMusic = false
    } else {
        bool_settingMusic = true
    }
})
function createTreesInView () {
    for (let value of tiles.getTilesByType(assets.tile`myTile34`)) {
        if (isInView(value.x, value.y, sprite_cameraControl)) {
            sprite_tree = sprites.create(assets.image`Tree2`, SpriteKind.Tree)
            sprite_tree.z = 80
            tiles.placeOnTile(sprite_tree, value)
            sprite_tree.setFlag(SpriteFlag.Ghost, true)
        }
    }
}
function batDashAttack (_bat: Sprite) {
    sprites.setDataNumber(_bat, "data_isBusy", 1)
    sprites.setDataNumber(_bat, "data_lastAttackHealth", sprites.readDataNumber(_bat, "data_health"))
    _bat.setVelocity(0, 0)
    animation.runImageAnimation(
    _bat,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . c c c . . . . . c c c . . . 
        . . c c c . . . . . c c c . . . 
        . . c b c . c c c . c b c . . . 
        c c c b c c 7 6 7 c c b c c c . 
        c c c b c 7 6 6 6 7 c b c c c . 
        c b c c b 7 7 6 7 7 b c c b c . 
        c b b c b 7 7 7 7 7 b c b b c . 
        c b c b c b 7 7 7 b c b c b c . 
        c b c b b c b b b c b b c b c . 
        c b c b c c b b b c c b c b c . 
        c b c b c c c c c c c b c b c . 
        c d c b c c c c c c c b c d c . 
        c c c b c c c c c c c b c c c . 
        . . c d c c c c c c c d c . . . 
        `],
    100,
    false
    )
    playBatAttack()
    if (sprites.readDataNumber(_bat, "data_health") == sprites.readDataNumber(_bat, "data_lastAttackHealth")) {
        timer.after(600, function () {
            _bat.follow(sprite_player, 60)
            animation.runImageAnimation(
            _bat,
            [img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . c c c . . . . . c c c . . . 
                . . c c c . . . . . c b c . . . 
                . . c b c c . . . c c b c . . . 
                c c c b c c c c c c c b b c c . 
                c b c b c c 7 7 7 c c c b c c . 
                c b b c b 7 7 6 7 7 b c c b c . 
                c b c b b 7 7 7 7 7 c b b b c . 
                c b c c c b 7 7 7 c b b c b c . 
                c b c b b c b b b c c b c b c . 
                c d c b c c b b b c c b c b c . 
                c c c b c c c c c c c b c b c . 
                c c c b c c c c c c c b c d c . 
                c c c b c c c c c c c d c c c . 
                . . c d c c c c c c c c c . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . c c c . . . . . c c c . . . 
                . . c b c . . . . . c c c . . . 
                . . c b c c . . . c c b c . . . 
                c c b b c c c c c c c b c c c . 
                c c b c c c 7 6 7 c c b c b c . 
                c b c c b 7 6 6 6 7 b c b b c . 
                c b b b c 7 7 6 7 7 b b c b c . 
                c b c b b c 7 7 7 b c c c b c . 
                c b c b c c b b b c b b c b c . 
                c b c b c c b b b c c b c d c . 
                c b c b c c c c c c c b c c c . 
                c d c b c c c c c c c b c c c . 
                c c c d c c c c c c c b c c c . 
                . . c c c c c c c c c d c . . . 
                `],
            100,
            true
            )
            timer.after(2000, function () {
                if (sprites.readDataNumber(_bat, "data_health") == sprites.readDataNumber(_bat, "data_lastAttackHealth")) {
                    animation.runImageAnimation(
                    _bat,
                    [img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . c c c . . . . . c c c . . . 
                        . . c c c . . . . . c b c . . . 
                        . . c b c c . . . c c b c . . . 
                        c c c b c c c c c c c b b c c . 
                        c b c b c c 7 7 7 c c c b c c . 
                        c b b c b 7 7 6 7 7 b c c b c . 
                        c b c b b 7 7 7 7 7 c b b b c . 
                        c b c c c b 7 7 7 c b b c b c . 
                        c b c b b c b b b c c b c b c . 
                        c d c b c c b b b c c b c b c . 
                        c c c b c c c c c c c b c b c . 
                        c c c b c c c c c c c b c d c . 
                        c c c b c c c c c c c d c c c . 
                        . . c d c c c c c c c c c . . . 
                        `,img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . c c c . . . . . c c c . . . 
                        . . c c c . . . . . c c c . . . 
                        . . c b c c . . . c c b c . . . 
                        c c c b c c c c c c c b c c c . 
                        c c c b c c 7 7 7 c c b c c c . 
                        c b c c b 7 7 6 7 7 b c c b c . 
                        c b b c b 7 7 7 7 7 b c b b c . 
                        c b c b c b 7 7 7 b c b c b c . 
                        c b c b b c b b b c b b c b c . 
                        c b c b c c b b b c c b c b c . 
                        c b c b c c c c c c c b c b c . 
                        c d c b c c c c c c c b c d c . 
                        c c c b c c c c c c c b c c c . 
                        . . c d c c c c c c c d c . . . 
                        `,img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . c c c . . . . . c c c . . . 
                        . . c b c . . . . . c c c . . . 
                        . . c b c c . . . c c b c . . . 
                        c c b b c c c c c c c b c c c . 
                        c c b c c c 7 7 7 c c b c b c . 
                        c b c c b 7 7 6 7 7 b c b b c . 
                        c b b b c 7 7 7 7 7 b b c b c . 
                        c b c b b c 7 7 7 b c c c b c . 
                        c b c b c c b b b c b b c b c . 
                        c b c b c c b b b c c b c d c . 
                        c b c b c c c c c c c b c c c . 
                        c d c b c c c c c c c b c c c . 
                        c c c d c c c c c c c b c c c . 
                        . . c c c c c c c c c d c . . . 
                        `,img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . c c c . . . . . c c c . . . 
                        . . c c c . . . . . c c c . . . 
                        . . c b c c . . . c c b c . . . 
                        c c c b c c c c c c c b c c c . 
                        c c c b c c 7 7 7 c c b c c c . 
                        c b c c b 7 7 6 7 7 b c c b c . 
                        c b b c b 7 7 7 7 7 b c b b c . 
                        c b c b c b 7 7 7 b c b c b c . 
                        c b c b b c b b b c b b c b c . 
                        c b c b c c b b b c c b c b c . 
                        c b c b c c c c c c c b c b c . 
                        c d c b c c c c c c c b c d c . 
                        c c c b c c c c c c c b c c c . 
                        . . c d c c c c c c c d c . . . 
                        `],
                    100,
                    true
                    )
                    sprites.setDataNumber(_bat, "data_lastAttackTime", game.runtime())
                    _bat.follow(sprite_player, 0)
                    sprites.setDataNumber(_bat, "data_isBusy", 0)
                }
            })
        })
    }
}
function createLeavesTile (_column: number, _row: number) {
    _sprite_debris = sprites.create(img`
        ....................
        ....................
        ..cccc....c.........
        ..c777c..c7c..cccc..
        ..c7777cc677cc777c..
        ..c77777c6cc77777c..
        ..c676777c7777777c..
        ...c77677c7776776c..
        ...c67767c676766c...
        ...ccc66ccc666ccc...
        ..c66ccc666cccc66c..
        ..ccc6c77677c6cccc..
        ...c76c77677c666c...
        ..c776c77677c6676c..
        ..c76cc77777c6667c..
        ..cccc6c777ccccccc..
        ....c66cc7cc66c.....
        ....ccc..c..ccc.....
        ....................
        ....................
        `, SpriteKind.Dummy)
    animation.runImageAnimation(
    _sprite_debris,
    [img`
        .ccc................
        .c77c...............
        .c777c..........cccc
        .c777c........cc777c
        .c7777c.....cc77777c
        .c77677c...c7776777c
        .c77767c...c6767777c
        ..c6766c...c667777cc
        ..cc66c.cccc6666ccc.
        ....cc.c666ccccc....
        ......c77677c.......
        ......c77677c.......
        ......c77677c.......
        ......c77777c.......
        .......c777c........
        ........c7c.........
        .........c..........
        ....................
        ....................
        ....................
        `,img`
        ....................
        ....................
        .ccc................
        .c77c...............
        .c777c..........cccc
        .c777c........cc777c
        .c7677c.....cc77777c
        .c77677c...c7776677c
        .c67767c...c6766777c
        ..c6666ccccc667776cc
        ...c66cc666cc666ccc.
        ....ccc67666cccc....
        ......c77676c.......
        ......c77677c.......
        ......c77777c.......
        .......c777c........
        ........c7c.........
        .........c..........
        ....................
        ....................
        `,img`
        ....................
        ....................
        ....................
        ....................
        ....................
        cccc................
        c777c.........cccccc
        c7777c......cc77777c
        c77677c....c7776677c
        c677677c...c6766777c
        cc67666ccccc666666cc
        .c66666cc66cc666ccc.
        ..cc66cc6666ccccc...
        ...cccc67666c.......
        ......c77676c.......
        ......c77676c.......
        ......c7677c........
        ......c777c.........
        ......cccc..........
        ....................
        `,img`
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        cccc................
        c666c.........cccccc
        c6666c......cc66666c
        c66666c....c6666666c
        c666666c...c6666666c
        cc66666c.ccc666666cc
        .c66666cc666c666ccc.
        ..cc66cc66666cccc...
        ...cccc666666c......
        ......c666666c......
        .....c666666c.......
        .....c6666cc........
        .....ccccc..........
        ....................
        `,img`
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        cccc................
        c...c.........cccccc
        c....c......cc.....c
        c.....c....c.......c
        c......c...c.......c
        .c.....c.ccc......c.
        .c.....cc...c...cc..
        ..cc..cc.....ccc....
        ....ccc......c......
        ......c......c......
        .....c......c.......
        .....c....cc........
        .....ccccc..........
        `,img`
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        `],
    100,
    false
    )
    _sprite_debris.lifespan = 500
    tiles.placeOnTile(_sprite_debris, tiles.getTileLocation(_column, _row))
}
function openDoorsInView () {
    for (let value of tiles.getTilesByType(assets.tile`myTile71`)) {
        if (isInView(value.x, value.y, sprite_cameraControl)) {
            tiles.setTileAt(value, assets.tile`myTile16`)
            tiles.setWallAt(value, false)
            createSmokePosition(value.x, value.y)
        }
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile74`)) {
        if (isInView(value.x, value.y, sprite_cameraControl)) {
            tiles.setTileAt(value, assets.tile`myTile76`)
            tiles.setWallAt(value, false)
            createSmokePosition(value.x, value.y)
        }
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile75`)) {
        if (isInView(value.x, value.y, sprite_cameraControl)) {
            tiles.setTileAt(value, assets.tile`myTile77`)
            tiles.setWallAt(value, false)
            createSmokePosition(value.x, value.y)
        }
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile80`)) {
        if (isInView(value.x, value.y, sprite_cameraControl)) {
            tiles.setTileAt(value, assets.tile`myTile72`)
            tiles.setWallAt(value, false)
            createSmokePosition(value.x, value.y)
        }
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile142`, function (sprite, location) {
    controller.moveSprite(sprite_player, 0, 0)
    timer.after(3000, function () {
        music.setVolume(100)
        game.setGameOverMessage(true, "Time:" + convertToText((_num_finalTime - _num_finalTime % 60) / 60) + "m" + convertToText(Math.round(_num_finalTime % 60 * 100) / 100) + "s")
        game.setGameOverEffect(true, effects.confetti)
        game.setGameOverPlayable(true, music.melodyPlayable(music.powerUp), false)
        info.setScore(num_currentMoney)
        game.setGameOverScoringType(game.ScoringType.HighScore)
        game.gameOver(true)
    })
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile62`, function (sprite, location) {
    flipSwitch(assets.tile`myTile63`, assets.tile`myTile64`, assets.tile`myTile65`, assets.tile`myTile66`, location.column, location.row)
    timer.after(1650, function () {
        num_winCondition = 2
        completeLevel()
        tiles.setWallAt(sprite_NPC.tilemapLocation(), false)
        playCutsceneSaveNPC(sprite_NPC, -75, 0, 2500, "Yahoo!!")
        timer.after(100, function () {
            controller.moveSprite(sprite_player, 0, 0)
            timer.after(100, function () {
                controller.moveSprite(sprite_player, 0, 0)
                timer.after(100, function () {
                    controller.moveSprite(sprite_player, 0, 0)
                })
            })
        })
    })
})
function createLevelCompleteArray () {
    array_levelComplete2D = [
    [
    0,
    0,
    0,
    0,
    0,
    0,
    0
    ],
    [
    0,
    0,
    0,
    0,
    0,
    0,
    0
    ],
    [
    0,
    0,
    0,
    0,
    0,
    0,
    0
    ],
    [
    0,
    0,
    0,
    0,
    0,
    0,
    0
    ],
    [
    0,
    0,
    0,
    0,
    0,
    0,
    0
    ],
    [
    0,
    0,
    0,
    0,
    0,
    0,
    0
    ]
    ]
}
function wakeUpDrone (_drone: Sprite) {
    _drone.setKind(SpriteKind.Enemy)
    playBatNoise()
    animation.runImageAnimation(
    _drone,
    [img`
        . . . . c d c . . . . . . . . . 
        . . . c b d d c . c c c c c . . 
        . . c c c c c b c d d d b b c . 
        . c d d d d b c c c c d d c . . 
        . c d b b c c b b b c c c . . . 
        . . c c c b c c c b b c . . . . 
        . . . c b c 7 7 7 c b c . . . . 
        . . . c b 7 7 7 7 7 b c . . . . 
        . . . c b 7 7 6 7 7 b c . . . . 
        . . . c b 7 7 7 7 7 b c . . . . 
        . . . c b c 7 7 7 c b c . . . . 
        . . . c b b c c c b b c . . . . 
        . . . c b b b b b b b c . . . . 
        . . . . c c c c c c c . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    500,
    false
    )
    sprites.setDataNumber(_drone, "data_isBusy", 1)
    sprites.setDataNumber(_drone, "data_lastDirectionChangeTime", game.runtime())
    sprites.setDataNumber(_drone, "data_lastAttackTime", game.runtime())
    sprites.setDataNumber(_drone, "data_directionChange", randint(0, 1))
    sprites.setDataNumber(_drone, "data_directionAngle", randint(0, 10))
    _drone.setFlag(SpriteFlag.Ghost, false)
    timer.after(500, function () {
        if (sprites.readDataNumber(_drone, "data_health") == 1) {
            sprites.setDataNumber(_drone, "data_isBusy", 0)
            animation.runImageAnimation(
            _drone,
            [img`
                . . . . c c c c c c . . . . . . 
                . . . c d d d d d c . c c . . . 
                . . c b b b d c d c c b b c . . 
                c c c c c c c b c b b d d d c . 
                c d d d d d b c c c d d d d c . 
                . c d d d d b c c c c c d c . . 
                . . c c d b b c c c c c c . . . 
                . . . c c c c c c c c c . . . . 
                . . . c b c c c c b b c . . . . 
                . . . c b b b b b b b c . . . . 
                . . . c b c b b b c b c . . . . 
                . . . c b 7 c c c 7 b c . . . . 
                . . . c b 7 6 6 6 7 b c . . . . 
                . . . c b c 7 7 7 c b c . . . . 
                . . . . c b c c c b c . . . . . 
                . . . . . c c c c c . . . . . . 
                `,img`
                . . . . c c c . c c c . . . . . 
                . . c c d d c . c b b c c . . . 
                . c d d d d d c c b d d d c . . 
                c b b b b b c b c c d d d d c . 
                c c c c c d d d b b c c c c c . 
                . . . c d d d d d b b c . . . . 
                . . c d d d d d d d b c . . . . 
                . . . c c c c c c c c c . . . . 
                . . . c b c c c c c b c . . . . 
                . . . c b b b b b b b c . . . . 
                . . . c b c b b b c b c . . . . 
                . . . c b 7 c c c 7 b c . . . . 
                . . . c b 7 6 6 6 7 b c . . . . 
                . . . c b c 7 7 7 c b c . . . . 
                . . . . c b c c c b c . . . . . 
                . . . . . c c c c c . . . . . . 
                `,img`
                . . . . c c c c c c c . . . . . 
                . . . c b b d d d d d c . . . . 
                c c c c c c b c d d c . . . . . 
                c d d d d d c b c c c c c c c . 
                c d d d d b c d d d b b b b c . 
                . c d d b b c c d d d d c c . . 
                . . c c b c c c c d d c c . . . 
                . . . c c c c c c c c c . . . . 
                . . . c b c c c c c b c . . . . 
                . . . c b b b b b b b c . . . . 
                . . . c b c b b b c b c . . . . 
                . . . c b 7 c c c 7 b c . . . . 
                . . . c b 7 6 6 6 7 b c . . . . 
                . . . c b c 7 7 7 c b c . . . . 
                . . . . c b c c c b c . . . . . 
                . . . . . c c c c c . . . . . . 
                `,img`
                . . . . c . . . c c c . . . . . 
                . . c c d c c c b d d c c . . . 
                . c d d d d c c b d d d d c . . 
                c d d d b b c b c c c d d d c . 
                c b b b c c d d b b c c c c c . 
                . c c c c c d d d d b b c . . . 
                . . . c c d d d d d d c c . . . 
                . . . c c c c c c c c c . . . . 
                . . . c b c c c c c b c . . . . 
                . . . c b b b b b b b c . . . . 
                . . . c b c b b b c b c . . . . 
                . . . c b 7 c c c 7 b c . . . . 
                . . . c b 7 6 6 6 7 b c . . . . 
                . . . c b c 7 7 7 c b c . . . . 
                . . . . c b c c c b c . . . . . 
                . . . . . c c c c c . . . . . . 
                `],
            50,
            true
            )
        }
    })
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile95`, function (sprite, location) {
    flipSwitch(assets.tile`myTile96`, assets.tile`myTile92`, assets.tile`myTile93`, assets.tile`myTile94`, location.column, location.row)
})
function setPlayerAnimations (_type: number, _delay: number) {
    _array_animSprites = []
    if (_type == 1) {
        _array_animSprites = [
        img`
            . . . c c c c c c . . . 
            . . c b b b b b b c . . 
            . c b b b b b b b b c . 
            . c b b b b b b b b c . 
            . c c c c c c c c c c . 
            . c d d c d d c d d c . 
            . c b d c d d c d b c . 
            . . c b b b b b b c . . 
            . c c c c c c c c c c . 
            . c b c b b b b c b c . 
            . c c c b c c b c c c . 
            . . . c c . . c c . . . 
            `,
        img`
            . . . c c c c c c . . . 
            . . c b b b b b b c . . 
            . c b b b b b b b b c . 
            . c b b b b b b b b c . 
            . c c c c c c c c c c . 
            . c d d c d d c d d c . 
            . c b d c d d c d b c . 
            . . c b b b b b b c c . 
            . c b c c c c c c b c . 
            . c c c b b b b c c c . 
            . . . c b c c c c . . . 
            . . . c c . . . . . . . 
            `,
        img`
            . . . c c c c c c . . . 
            . . c b b b b b b c . . 
            . c b b b b b b b b c . 
            . c b b b b b b b b c . 
            . c c c c c c c c c c . 
            . c d d c d d c d d c . 
            . c b d c d d c d b c . 
            . c c b b b b b b c . . 
            . c b c c c c c c b c . 
            . c c c b b b b c c c . 
            . . . c c c c b c . . . 
            . . . . . . . c c . . . 
            `,
        img`
            . . . c c c c c c . . . 
            . . c b b b b b b c . . 
            . c b b b b b b b b c . 
            . c c b b b b b b c c . 
            . c b c c c b c c b c . 
            . c b b c b c b c b c . 
            . c b b c c b c c b c . 
            . . c b b b b b b c . . 
            . c c c c c c c c c c . 
            . c b c b b b b c b c . 
            . c c c b c c b c c c . 
            . . . c c . . c c . . . 
            `,
        img`
            . . . c c c c c c . . . 
            . . c b b b b b b c . . 
            . c b b b b b b b b c . 
            . c c b b b b b b c c . 
            . c b c c c b c c b c . 
            . c b b c b c b c b c . 
            . c b b c c b c c b c . 
            . c c b b b b b b c . . 
            . c b c c c c c c b c . 
            . c c c b b b b c c c . 
            . . . c c c c b c . . . 
            . . . . . . . c c . . . 
            `,
        img`
            . . . c c c c c c . . . 
            . . c b b b b b b c . . 
            . c b b b b b b b b c . 
            . c c b b b b b b c c . 
            . c b c c c b c c b c . 
            . c b b c b c b c b c . 
            . c b b c c b c c b c . 
            . . c b b b b b b c c . 
            . c b c c c c c c b c . 
            . c c c b b b b c c c . 
            . . . c b c c c c . . . 
            . . . c c . . . . . . . 
            `,
        img`
            . . . c c c c c c . . . 
            . . c b b b b b b c . . 
            . c b b b b b b b b c . 
            . c b b b b b b b c b c 
            . c c c c c c c c b c . 
            . c d c d d d b b b b c 
            . c d c d b b b b b c . 
            . . c b b b b b b c . . 
            . . . c c c c c c . . . 
            . . . . c b c c . . . . 
            . . . . c c b c . . . . 
            . . . . c b b c . . . . 
            `,
        img`
            . . . c c c c c c . . . 
            . . c b b b b b b c . . 
            . c b b b b b b b c c . 
            . c b b b b b b b c b c 
            . c c c c c c c c b c . 
            . c d c d d d b b b b c 
            . c d c d b b b b b c . 
            . . c b b b b b b c . . 
            . . . c c c c c c . . . 
            . . c b c b b c . . . . 
            . . c c c b b c . . . . 
            . . . c b c c b c . . . 
            `,
        img`
            . . . c c c c c c . . . 
            . . c b b b b b b c . . 
            . c b b b b b b b b c . 
            . c b b b b b b b c b c 
            . c c c c c c c c b c . 
            . c d c d d d b b b b c 
            . c d c d b b b b b c . 
            . . c b b b b b b c . . 
            . . . c c c c c c . . . 
            . . c b c b c b c . . . 
            . . c c c b c c c . . . 
            . . . c b c c b c . . . 
            `,
        img`
            . . . c c c c c c . . . 
            . . c b b b b b b c . . 
            . c b b b b b b b b c . 
            c b c b b b b b b b c . 
            . c b c c c c c c c c . 
            c b b b b d d d c d c . 
            . c b b b b b d c d c . 
            . . c b b b b b b c . . 
            . . . c c c c c c . . . 
            . . . . c c b c . . . . 
            . . . . c b c c . . . . 
            . . . . c b b c . . . . 
            `,
        img`
            . . . c c c c c c . . . 
            . . c b b b b b b c . . 
            . c b b b b b b b b c . 
            c b c b b b b b b b c . 
            . c b c c c c c c c c . 
            c b b b b d d d c d c . 
            . c b b b b b d c d c . 
            . . c b b b b b b c . . 
            . . . c c c c c c . . . 
            . . . c b c b c b c . . 
            . . . c c c b c c c . . 
            . . . c b c c b c . . . 
            `,
        img`
            . . . c c c c c c . . . 
            . . c b b b b b b c . . 
            . c b b b b b b b b c . 
            c b c b b b b b b b c . 
            . c b c c c c c c c c . 
            c b b b b d d d c d c . 
            . c b b b b b d c d c . 
            . . c b b b b b b c . . 
            . . . c c c c c c . . . 
            . . . . c b b c b c . . 
            . . . . c b b c c c . . 
            . . . c b c c b c . . . 
            `,
        img`
            . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . 
            . . . . . . . c c c c c . . 
            . . . c c . c d c d c b c . 
            . c c c b c b d d c d b b c 
            . c b c c c c d c d c b b c 
            . . c b b c c d d d d b b c 
            . . c b b c b d c d c b b c 
            . c b c c c b d d c d b b c 
            . c c c b c b d c d c b b c 
            . . . c c . c b d d d b c . 
            . . . . . . . c c c c c . . 
            . . . . . . . . . . . . . . 
            `
        ]
    } else if (_type == 2) {
        _array_animSprites = [
        img`
            . . . c c c c c c . . . 
            . . c d d d d d d c . . 
            . c 6 d d d d d d 6 c . 
            . c 6 6 6 6 6 6 6 6 c . 
            . c d 6 6 6 6 6 6 d c . 
            . c d d c d d c d d c . 
            . c b d c d d c d b c . 
            . . c b d d d d b c . . 
            . c c c c c c c c c c . 
            . c d c 7 7 7 7 c d c . 
            . c c c 6 c c 6 c c c . 
            . . . c c . . c c . . . 
            `,
        img`
            . . . c c c c c c . . . 
            . . c d d d d d d c . . 
            . c 6 d d d d d d 6 c . 
            . c 6 6 6 6 6 6 6 6 c . 
            . c d 6 6 6 6 6 6 d c . 
            . c d d c d d c d d c . 
            . c b d c d d c d b c . 
            . . c b d d d d b c c . 
            . c b c c c c c c d c . 
            . c c c 7 7 7 7 c c c . 
            . . . c 6 c c c c . . . 
            . . . c c . . . . . . . 
            `,
        img`
            . . . c c c c c c . . . 
            . . c d d d d d d c . . 
            . c 6 d d d d d d 6 c . 
            . c 6 6 6 6 6 6 6 6 c . 
            . c d 6 6 6 6 6 6 d c . 
            . c d d c d d c d d c . 
            . c b d c d d c d b c . 
            . c c b d d d d b c . . 
            . c d c c c c c c b c . 
            . c c c 7 7 7 7 c c c . 
            . . . c c c c 6 c . . . 
            . . . . . . . c c . . . 
            `,
        img`
            . . . c c c c c c . . . 
            . . c d d d d d d c . . 
            . c 6 d d d d d d 6 c . 
            . c 6 6 6 6 6 6 6 6 c . 
            . c d 6 6 6 6 6 6 d c . 
            . c b b b 6 6 c b b c . 
            . c b b 6 c 6 c b b c . 
            . . c b b b 6 c b c . . 
            . c c c c c c c c c c . 
            . c b c 7 7 7 7 c b c . 
            . c c c 6 c c 6 c c c . 
            . . . c c . . c c . . . 
            `,
        img`
            . . . c c c c c c . . . 
            . . c d d d d d d c . . 
            . c 6 d d d d d d 6 c . 
            . c 6 6 6 6 6 6 6 6 c . 
            . c d 6 6 6 6 6 6 d c . 
            . c b b 6 c 6 c b b c . 
            . c b b c b 6 c b b c . 
            . c c b b 6 c b b c . . 
            . c b c c c c c c b c . 
            . c c c 7 7 7 7 c c c . 
            . . . c c c c 6 c . . . 
            . . . . . . . c c . . . 
            `,
        img`
            . . . c c c c c c . . . 
            . . c d d d d d d c . . 
            . c 6 d d d d d d 6 c . 
            . c 6 6 6 6 6 6 6 6 c . 
            . c d 6 6 6 6 6 6 d c . 
            . c b b b 6 6 c b b c . 
            . c b b b 6 c 6 c b c . 
            . . c b b b b 6 c c c . 
            . c b c c c c c c b c . 
            . c c c 7 7 7 7 c c c . 
            . . . c 6 c c c c . . . 
            . . . c c . . . . . . . 
            `,
        img`
            . . . c c c c c c . . . 
            . . c d d d d d d c . . 
            . c d d d d d d d 6 c . 
            . c 6 6 6 6 6 6 6 6 c . 
            . c 6 6 6 6 6 6 6 c 6 c 
            . c d c d d d d d b 6 c 
            . c d c d d d d b b c c 
            . . c d b d b b b c . . 
            . . . c c c c c c . . . 
            . . . . c d c c . . . . 
            . . . . c c 7 c . . . . 
            . . . . c 6 6 c . . . . 
            `,
        img`
            . . . c c c c c c . . . 
            . . c d d d d d d c . . 
            . c d d d d d d d 6 c . 
            . c 6 6 6 6 6 6 6 6 6 c 
            . c 6 6 6 6 6 6 6 c 6 c 
            . c d c d d d d d b 6 6 
            . c d c d d d d b b c c 
            . . c d b d b b b c . . 
            . . . c c c c c c . . . 
            . . c d c 7 7 c . . . . 
            . . c c c 7 7 c . . . . 
            . . . c b c c 6 c . . . 
            `,
        img`
            . . . c c c c c c . . . 
            . . c d d d d d d c . . 
            . c d d d d d d d 6 c . 
            . c 6 6 6 6 6 6 6 6 6 c 
            . c 6 6 6 6 6 6 6 c 6 6 
            . c d c d d d d d b c 6 
            . c d c d d d d b b c c 
            . . c d b d b b b c . . 
            . . . c c c c c c . . . 
            . . c b c 7 c d c . . . 
            . . c c c 7 c c c . . . 
            . . . c 6 c c b c . . . 
            `,
        img`
            . . . c c c c c c . . . 
            . . c d d d d d d c . . 
            . c 6 d d d d d d d c . 
            . c 6 6 6 6 6 6 6 6 c . 
            c 6 c 6 6 6 6 6 6 6 c . 
            c 6 b d d d d d c d c . 
            c c b b d d d d c d c . 
            . . c b b b d b d c . . 
            . . . c c c c c c . . . 
            . . . . c c d c . . . . 
            . . . . c 7 c c . . . . 
            . . . . c 6 6 c . . . . 
            `,
        img`
            . . . c c c c c c . . . 
            . . c d d d d d d c . . 
            . c 6 d d d d d d d c . 
            c 6 6 6 6 6 6 6 6 6 c . 
            6 6 c 6 6 6 6 6 6 6 c . 
            6 c b d d d d d c d c . 
            c c b b d d d d c d c . 
            . . c b b b d b d c . . 
            . . . c c c c c c . . . 
            . . . . c 7 7 c d c . . 
            . . . . c 7 7 c c c . . 
            . . . c 6 c c b c . . . 
            `,
        img`
            . . . c c c c c c . . . 
            . . c d d d d d d c . . 
            . c 6 d d d d d d d c . 
            c 6 6 6 6 6 6 6 6 6 c . 
            c 6 c 6 6 6 6 6 6 6 c . 
            6 6 b d d d d d c d c . 
            c c b b d d d d c d c . 
            . . c b b b d b d c . . 
            . . . c c c c c c . . . 
            . . . . c 7 7 c d c . . 
            . . . . c 7 7 c c c . . 
            . . . c 6 c c b c . . . 
            `,
        img`
            . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . 
            . . . . . . . c c c c c . . 
            . . . c c . c d c d c 6 c . 
            . c c c d c d d d c d 6 d c 
            . c 6 c c c b d c d c 6 d c 
            . . c 7 7 c b d d d d 6 d c 
            . . c 7 7 c b d c d c 6 d c 
            . c 6 c c c d d d c d 6 d c 
            . c c c d c b d c d c 6 b c 
            . . . c c . c b b b b 6 c . 
            . . . . . . . c c c c c . . 
            . . . . . . . . . . . . . . 
            `
        ]
    }
    anim_idleDown = animation.createAnimation(ActionKind.IdleDown, _delay)
    anim_idleDown.addAnimationFrame(_array_animSprites[0])
    animation.attachAnimation(sprite_player, anim_idleDown)
    anim_walkDown = animation.createAnimation(ActionKind.WalkDown, _delay)
    anim_walkDown.addAnimationFrame(_array_animSprites[1])
    anim_walkDown.addAnimationFrame(_array_animSprites[0])
    anim_walkDown.addAnimationFrame(_array_animSprites[2])
    anim_walkDown.addAnimationFrame(_array_animSprites[0])
    animation.attachAnimation(sprite_player, anim_walkDown)
    anim_idleUp = animation.createAnimation(ActionKind.IdleUp, _delay)
    anim_idleUp.addAnimationFrame(_array_animSprites[3])
    animation.attachAnimation(sprite_player, anim_idleUp)
    anim_walkUp = animation.createAnimation(ActionKind.WalkUp, _delay)
    anim_walkUp.addAnimationFrame(_array_animSprites[4])
    anim_walkUp.addAnimationFrame(_array_animSprites[3])
    anim_walkUp.addAnimationFrame(_array_animSprites[5])
    anim_walkUp.addAnimationFrame(_array_animSprites[3])
    animation.attachAnimation(sprite_player, anim_walkUp)
    anim_idleLeft = animation.createAnimation(ActionKind.IdleLeft, _delay)
    anim_idleLeft.addAnimationFrame(_array_animSprites[6])
    animation.attachAnimation(sprite_player, anim_idleLeft)
    anim_walkLeft = animation.createAnimation(ActionKind.WalkLeft, _delay)
    anim_walkLeft.addAnimationFrame(_array_animSprites[7])
    anim_walkLeft.addAnimationFrame(_array_animSprites[6])
    anim_walkLeft.addAnimationFrame(_array_animSprites[8])
    anim_walkLeft.addAnimationFrame(_array_animSprites[6])
    animation.attachAnimation(sprite_player, anim_walkLeft)
    anim_idleRight = animation.createAnimation(ActionKind.IdleRight, _delay)
    anim_idleRight.addAnimationFrame(_array_animSprites[9])
    animation.attachAnimation(sprite_player, anim_idleRight)
    anim_walkRight = animation.createAnimation(ActionKind.WalkRight, _delay)
    anim_walkRight.addAnimationFrame(_array_animSprites[10])
    anim_walkRight.addAnimationFrame(_array_animSprites[9])
    anim_walkRight.addAnimationFrame(_array_animSprites[11])
    anim_walkRight.addAnimationFrame(_array_animSprites[9])
    animation.attachAnimation(sprite_player, anim_walkRight)
    anim_death = animation.createAnimation(ActionKind.DeathAnim, _delay)
    anim_death.addAnimationFrame(_array_animSprites[12])
    animation.attachAnimation(sprite_player, anim_death)
}
function cat1Dialog (_cat1: Sprite) {
    if (!(bool_isNPCTalking)) {
        bool_isNPCTalking = true
        animation.runImageAnimation(
        _cat1,
        [img`
            . . . . . . . . . . . . . . . . 
            . c c c . . . . c c c . . . . . 
            . c d d c . . c d d c . . . . . 
            . c b d d c c d d b c . . . . . 
            . c b b d d b d b b c . . . . . 
            . c d c d d d c d d c . . . . . 
            . c c d c d c d c d c . . . . . 
            . c d d d b d d d d c . . . c c 
            . c d d b b b d d d c . . c d c 
            . c c d d d d d d c c . c d c . 
            . . c c c c c c c c c c c d c . 
            . . . c d d c d d d b d d c . . 
            . . . c d c d b d d d c c . . . 
            . . . c d c c c c c d c . . . . 
            . . . c c . . . . . c c . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . c c c . . . . c c c . . . . . 
            . c d d c . . c d d c . . . . . 
            . c b d d c c d d b c . . . . . 
            . c b b d d b d b b c . . . . . 
            . c d d c d d d c d c . . . . . 
            . c d c d c d c d c c . . . . . 
            . c d d d d b d d d c . . . c c 
            . c d d d b b b d d c . . c d c 
            . c c d d b b b d c c . c d c . 
            . . c c c c c c c c c c c d c . 
            . . . c d d d d d d b d d c . . 
            . . c d b d d d b d d c c . . . 
            . . c c c c c d c c d c . . . . 
            . . . . . . c c . . c c . . . . 
            . . . . . . . . . . . . . . . . 
            `],
        350,
        true
        )
        playCatNoise()
        if (num_lastDialogNPC2 == 0) {
            _num_dialogLength = 2500
            _cat1.sayText("Thank you for saving me!!", _num_dialogLength, true)
            num_lastDialogNPC2 = 1
        } else if (num_lastDialogNPC2 == 1) {
            _num_dialogLength = 3000
            _cat1.sayText("My two brothers are also afraid of buttons...", _num_dialogLength, true)
            num_lastDialogNPC2 = 2
        } else {
            _num_dialogLength = 2500
            _cat1.sayText("I love the smell of the flowers here!", _num_dialogLength, true)
            num_lastDialogNPC2 = 0
        }
        timer.after(_num_dialogLength, function () {
            bool_isNPCTalking = false
            animation.runImageAnimation(
            _cat1,
            [img`
                . . . . . . . . . . . . . . . . 
                . c c c . . . . c c c . . . . . 
                . c d d c . . c d d c . . . . . 
                . c b d d c c d d b c . . . . . 
                . c b b d d b d b b c . . . . . 
                . c d d d d d d d d c . . . . . 
                . c d c d d d c d d c . . . . . 
                . c c d c d c d c d c c c . . . 
                . c d d d b d d d d c c d c . . 
                . c c d b b b d d c c . c d c . 
                . . c c c c c c c c c c c d c . 
                . . . c d d d d d d b d d c . . 
                . . . c d d d d b d d c c . . . 
                . . . c d c c d c c d c . . . . 
                . . . c c . c c . . c c . . . . 
                . . . . . . . . . . . . . . . . 
                `],
            200,
            false
            )
        })
    }
}
sprites.onOverlap(SpriteKind.Sword, SpriteKind.Enemy, function (sprite, otherSprite) {
    playHitSound()
    if (sprites.readDataString(otherSprite, "data_type") == "bat") {
        damageBat(otherSprite, -1, sprite_player)
    } else if (sprites.readDataString(otherSprite, "data_type") == "drone") {
        damageDrone(otherSprite, -1, sprite_player)
    }
})
function setPaletteGreen () {
    palette_white = color.parseColorString("#e5cdc4")
    palette_gray = color.parseColorString("#a4839f")
    palette_black = color.parseColorString("#5c406c")
    palette_colourLight = color.parseColorString("#78dc52")
    palette_colourDark = color.parseColorString("#249ca3")
}
/**
 * Player Funcs
 */
function createPlayerController (_speed: number) {
    sprite_sword = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Sword)
    sprite_sword.z = 100
    sprite_sword.setFlag(SpriteFlag.GhostThroughWalls, true)
    num_lastFacing = 0
    bool_isPlayerFrozen = false
    bool_isStunned = false
    num_lastHit = 0
    num_hitOffset = 4
    sprite_player = sprites.create(img`
        . . . c c c c c c . . . 
        . . c d d d d d d c . . 
        . c d d d d d d d d c . 
        . c d d d d d d d d c . 
        . c d d d d d d d d c . 
        . c d d c d d c d d c . 
        . c b d c d d c d b c . 
        . . c b d d d d b c . . 
        . c c c c c c c c c c . 
        . c d c d d d d c d c . 
        . c c c d c c d c c c . 
        . . . c c . . c c . . . 
        `, SpriteKind.Player)
    sprite_player.setPosition(45, 848)
    sprite_player.z = 10
    controller.moveSprite(sprite_player, _speed, _speed)
    sprite_enemyWaker = sprites.create(assets.image`Enemyawaker`, SpriteKind.EnemyWaker)
    sprite_enemyWaker.z = -100
    sprite_enemyWaker.sx = 6
    sprite_enemyWaker.sy = 6
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile68`, function (sprite, location) {
    bool_isMusic = false
    num_playerSpeed = 25
})
/**
 * Object Funcs
 */
function destroyBarrel (_column: number, _row: number) {
    tiles.setWallAt(tiles.getTileLocation(_column, _row), false)
    if (Math.percentChance(33)) {
        if (Math.percentChance(50)) {
            tiles.setTileAt(tiles.getTileLocation(_column, _row), assets.tile`PotBroken`)
        } else {
            tiles.setTileAt(tiles.getTileLocation(_column, _row), assets.tile`PotBroken0`)
        }
    } else if (Math.percentChance(50)) {
        if (Math.percentChance(50)) {
            tiles.setTileAt(tiles.getTileLocation(_column, _row), assets.tile`PotBroken2`)
        } else {
            tiles.setTileAt(tiles.getTileLocation(_column, _row), assets.tile`PotBroken4`)
        }
    } else {
        if (Math.percentChance(50)) {
            tiles.setTileAt(tiles.getTileLocation(_column, _row), assets.tile`PotBroken3`)
        } else {
            tiles.setTileAt(tiles.getTileLocation(_column, _row), assets.tile`PotBroken1`)
        }
    }
    createPickup(tiles.getTileLocation(_column, _row).x, tiles.getTileLocation(_column, _row).y, 75, 25)
    createSmokePosition(tiles.getTileLocation(_column, _row).x, tiles.getTileLocation(_column, _row).y)
    _num_barrelPitch = randint(75, 100)
    music.play(music.createSoundEffect(
    WaveShape.Noise,
    1958,
    _num_barrelPitch * 8,
    40,
    0,
    100,
    SoundExpressionEffect.Vibrato,
    InterpolationCurve.Logarithmic
    ), music.PlaybackMode.InBackground)
    music.play(music.createSoundEffect(
    WaveShape.Noise,
    _num_barrelPitch * 5,
    _num_barrelPitch * 4.5,
    40,
    0,
    200,
    SoundExpressionEffect.None,
    InterpolationCurve.Logarithmic
    ), music.PlaybackMode.InBackground)
    music.play(music.createSoundEffect(
    WaveShape.Triangle,
    _num_barrelPitch * 5,
    _num_barrelPitch * 5,
    50,
    0,
    100,
    SoundExpressionEffect.None,
    InterpolationCurve.Logarithmic
    ), music.PlaybackMode.InBackground)
    music.play(music.createSoundEffect(
    WaveShape.Triangle,
    _num_barrelPitch * 3,
    _num_barrelPitch * 3,
    45,
    0,
    175,
    SoundExpressionEffect.None,
    InterpolationCurve.Logarithmic
    ), music.PlaybackMode.InBackground)
    music.play(music.createSoundEffect(
    WaveShape.Triangle,
    _num_barrelPitch,
    _num_barrelPitch,
    40,
    0,
    350,
    SoundExpressionEffect.None,
    InterpolationCurve.Logarithmic
    ), music.PlaybackMode.InBackground)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile78`, function (sprite, location) {
    num_playerSpeed = 75
})
scene.onOverlapTile(SpriteKind.Sword, assets.tile`Empty3`, function (sprite, location) {
    endGame(location.column, location.row)
})
/**
 * Game Funcs
 */
function setPaletteRed () {
    palette_white = color.parseColorString("#e5cdc4")
    palette_gray = color.parseColorString("#98807B")
    palette_black = color.parseColorString("#4a3232")
    palette_colourLight = color.parseColorString("#ff667a")
    palette_colourDark = color.parseColorString("#A54C56")
}
function isInView (_x: number, _y: number, _camera: Sprite) {
    if (_x < _camera.x + 96 && _x > _camera.x - 96 && (_y < _camera.y + 76 && _y > _camera.y - 76)) {
        return true
    } else {
        return false
    }
}
/**
 * Level Funcs
 */
function updateTorches () {
    if (bool_torchChange) {
        bool_torchChange = false
        for (let value of tiles.getTilesByType(assets.tile`myTile19`)) {
            tiles.setTileAt(value, assets.tile`myTile100`)
        }
    } else {
        bool_torchChange = true
        for (let value of tiles.getTilesByType(assets.tile`myTile100`)) {
            tiles.setTileAt(value, assets.tile`myTile19`)
        }
    }
}
/**
 * Music Funcs
 */
function destroyDungeonMusicOutOfView () {
    for (let value of sprites.allOfKind(SpriteKind.DungeonMusic)) {
        if (isInView(value.x, value.x, sprite_cameraControl)) {
            sprites.destroy(value)
        }
    }
}
function updateCamera (_camera: Sprite, _player: Sprite) {
    if (!(bool_isGameOver)) {
        _camera.x = _player.x - 8 - (_player.x - 8) % 160 + 88
        _camera.y = _player.y - 8 - (_player.y - 8) % 128 + 72
    }
    if (!(bool_isTransition) && !(isInView(sprite_cameraFollow.x, sprite_cameraFollow.y, sprite_cameraControl))) {
        createTreesInView()
        createDungeonMusicInView()
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        sprites.destroyAllSpritesOfKind(SpriteKind.EnemyHurt)
        sprites.destroyAllSpritesOfKind(SpriteKind.BatSleeping)
        sprites.destroyAllSpritesOfKind(SpriteKind.Quest)
        sprites.destroyAllSpritesOfKind(SpriteKind.NPC)
        if (!(isLevelComplete())) {
            createDrones()
            createBats()
            createNPCInView()
        }
        sprite_cameraFollow.setFlag(SpriteFlag.GhostThroughSprites, false)
        bool_isTransition = true
        bool_isPlayerFrozen = true
        controller.moveSprite(sprite_player, 0, 0)
        sprite_player.setVelocity(0, 0)
        sprite_player.follow(sprite_cameraControl, 50)
        music.play(music.createSoundEffect(WaveShape.Noise, 1712, 5000, 0, 54, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        if (sprites.allOfKind(SpriteKind.Enemy).length != 0 || sprites.allOfKind(SpriteKind.BatSleeping).length != 0) {
            enemyRoomTransition()
        }
    }
}
scene.onOverlapTile(SpriteKind.Sword, assets.tile`myTile35`, function (sprite, location) {
    destroyBush(location.column, location.row)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (num_lastHit < game.runtime() - 1000) {
        playHitSound()
        knockback(otherSprite, sprite, 300, 50)
        hurtPlayer(sprite, otherSprite)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile70`, function (sprite, location) {
    bool_isMusic = true
    num_playerSpeed = 40
})
let bool_isEnemyMusic = false
let bool_isNPCMusic = false
let _num_barrelPitch = 0
let num_hitOffset = 0
let anim_death: animation.Animation = null
let anim_walkRight: animation.Animation = null
let anim_idleRight: animation.Animation = null
let anim_walkLeft: animation.Animation = null
let anim_idleLeft: animation.Animation = null
let anim_walkUp: animation.Animation = null
let anim_idleUp: animation.Animation = null
let anim_walkDown: animation.Animation = null
let anim_idleDown: animation.Animation = null
let _array_animSprites: Image[] = []
let sprite_tree: Sprite = null
let sprite_bullet: Sprite = null
let num_lastDialogNPC3 = 0
let sprite_dungeonMusic: Sprite = null
let _num_knockbackZ = 0
let _num_knockbackY = 0
let _num_knockbackX = 0
let text_moneyAdd: TextSprite = null
let bool_isDungeonMusic = false
let _num_bushPitch = 0
let bool_isTransition = false
let sprite_cameraFollow: Sprite = null
let bool_isStunned = false
let num_lastHit = 0
let sprite_questIcon: Sprite = null
let sprite_NPC: Sprite = null
let _num_dialogLength = 0
let num_lastDialogNPC4 = 0
let bool_isNPCTalking = false
let palette_black = 0
let palette_gray = 0
let palette_colourLight = 0
let palette_colourDark = 0
let palette_white = 0
let _num_finalTime = 0
let _sprite_lever: Sprite = null
let _sprite_debris: Sprite = null
let sprite_bat: Sprite = null
let sprite_hudHealth: Sprite = null
let num_currentHealth = 0
let _bool_isHealthAnimating = false
let text_money: TextSprite = null
let num_currentMoney = 0
let num_currentMoneyAdd = 0
let text_timer: TextSprite = null
let sprite_pickup: Sprite = null
let sprite_cameraControl: Sprite = null
let array_levelComplete2D: number[][] = []
let bool_isMusicEnd = false
let sprite_sword: Sprite = null
let Bool_isAttacking = false
let bool_isPlayerFrozen = false
let bool_isPlayerDead = false
let sprite_enemyWaker: Sprite = null
let sprite_player: Sprite = null
let num_lastFacing = 0
let sprite_playerInteract: Sprite = null
let num_playerSpeed = 0
let num_winCondition = 0
let bool_settingMusic = false
let bool_hasQuest = false
let bool_isMusic = false
let _bool_isEnemyRoom = false
let _num_bigMoneyChance = 0
let _num_sparkleDelay = 0
let num_moneyValue3 = 0
let num_moneyValue2 = 0
let num_moneyValue1 = 0
let bool_torchChange = false
let num_lastDialogNPC2 = 0
let num_lastDialogNPC1 = 0
let bool_isGameOver = false
music.setVolume(255)
tiles.setCurrentTilemap(tilemap`Dungeon`)
bool_isGameOver = false
let bool_mapOut = false
createPlayerController(75)
createHUD()
createCameraController()
createTreesInView()
num_lastDialogNPC1 = 0
num_lastDialogNPC2 = 0
bool_torchChange = true
num_moneyValue1 = 5
num_moneyValue2 = 20
num_moneyValue3 = 100
_num_sparkleDelay = 45
_num_bigMoneyChance = 20
_bool_isEnemyRoom = true
let PlayerDead = true
bool_isMusic = true
bool_hasQuest = true
let bool_isSettingUp = true
bool_settingMusic = true
num_winCondition = 0
num_playerSpeed = 75
createLevelCompleteArray()
game.onUpdate(function () {
    if (bool_isSettingUp) {
        bool_isSettingUp = false
        setPaletteGreen()
        if (controller.right.isPressed()) {
            setPlayerAnimations(1, 100)
            sprite_player.sayText("Ninja mode!", 2000, false)
        } else {
            setPlayerAnimations(2, 100)
        }
        if (controller.up.isPressed()) {
            sprite_player.sayText("Red mode!", 2000, false)
            setPaletteRed()
        }
        applyPalette()
    }
    checkEnemyRoomFinished()
    animatePlayer()
    updateHUD()
    updateCamera(sprite_cameraControl, sprite_player)
    sprite_enemyWaker.setPosition(sprite_player.x, sprite_player.y)
})
game.onUpdateInterval(2000, function () {
    if (bool_settingMusic) {
        if (bool_isMusic) {
            music.setVolume(10)
            if (bool_isMusicEnd) {
                music.play(music.createSong(hex`0078000408010109010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8001e000000010001060800090001061000110001061800190001061c001d000106`), music.PlaybackMode.InBackground)
            } else {
                if (bool_isNPCMusic) {
                    music.play(music.createSong(hex`0078000408010109010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c80048000000010001080400050001060600070001060800090001060c000d0001061000110001061200130001061400150001081600170001061800190001081a001b0001061e001f000106`), music.PlaybackMode.InBackground)
                } else {
                    music.play(music.createSong(hex`0078000408010109010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8003400000001000206080600070001060800090002060810001100020608160017000106180019000206081c001d0001081e001f000106`), music.PlaybackMode.InBackground)
                    if (bool_isDungeonMusic && num_winCondition < 3) {
                        music.setVolume(75)
                        music.play(music.createSong(hex`0078000408010109010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c80024000000010001020400050001021400150001021800190001021a001b0001021c001d000102`), music.PlaybackMode.InBackground)
                    }
                    if (bool_isEnemyMusic) {
                        music.setVolume(25)
                        music.play(music.createSong(hex`0078000408010109010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c800550000000100040205090b040005000109080009000302050b0c000d0001090e000f000109100011000302050b1200130001091400150001091800190005020508090b1a001b0001081c001d0002080b1e001f0002080b`), music.PlaybackMode.InBackground)
                    }
                }
            }
            music.setVolume(255)
        }
    }
})
game.onUpdateInterval(5, function () {
    updateEnemies()
})
game.onUpdateInterval(500, function () {
    updateTorches()
})
game.onUpdateInterval(100, function () {
    if (sprites.allOfKind(SpriteKind.DungeonMusic).length > 0) {
        bool_isDungeonMusic = true
    } else {
        bool_isDungeonMusic = false
    }
    if (sprites.allOfKind(SpriteKind.NPC).length > 0) {
        bool_isNPCMusic = true
    } else {
        bool_isNPCMusic = false
    }
    if (sprites.allOfKind(SpriteKind.Enemy).length > 0 || (sprites.allOfKind(SpriteKind.EnemyHurt).length > 0 || sprites.allOfKind(SpriteKind.BatSleeping).length > 0)) {
        bool_isEnemyMusic = true
    } else {
        bool_isEnemyMusic = false
    }
})
