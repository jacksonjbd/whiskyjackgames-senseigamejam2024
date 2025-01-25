
// -------------------------------- //
// -------- CREATE PICKUPS -------- //
// -------------------------------- //

function createPickup(_x: number, _y: number, _drop: number, _heart: number) {
    // (_drop)% chance to create a pickup
    if (Math.percentChance(_drop)) {
        // (_heart)% chance to be a heart
        if (Math.percentChance(_heart)) {
            sprite_pickup = sprites.create(assets.image`SmallHeart`, SpriteKind.Pickup)
            sprite_pickup.setBounceOnWall(true)
            sprites.setDataString(sprite_pickup, "data_type", "heart")
        } else {
            if (Math.percentChance(75)) {
                sprite_pickup = sprites.create(assets.image`GreenGem`, SpriteKind.Pickup)
                animation.runImageAnimation(
                    sprite_pickup,
                    [assets.image`GreenGem`,
                    assets.image`GreenGem`,
                    assets.image`GreenGem`,
                    assets.image`GreenGem`,
                    assets.image`GreenGem`,
                    assets.image`GreenGem`,
                    assets.image`GreenGem`,
                    assets.image`GreenGem`,
                    assets.image`GreenGem`,
                    assets.image`GreenGem`,
                    assets.image`GreenGem`,
                    assets.image`GreenGem`,
                    assets.image`GreenGem`,
                    assets.image`GreenGem`,
                    assets.image`GreenGem`,
                    assets.image`GreenGem`,
                    assets.image`GreenGem`,
                    assets.image`GreenGem`,
                    assets.image`GreenGem`,
                    assets.image`GreenGem`,
                    assets.image`GreenGemFlash`,
                    assets.image`GreenGem`,
                    assets.image`GreenGemFlash`,
                    assets.image`GreenGem`,
                    assets.image`GreenGemFlash`,
                    assets.image`GreenGem`,
                    assets.image`GreenGemFlash`,
                    assets.image`GreenGem`,
                    assets.image`GreenGemFlash`,
                    assets.image`GreenGem`],
                    125,
                    false
                )
                sprites.setDataNumber(sprite_pickup, "data_value", num_moneyValue1)
            } else if (Math.percentChance(_num_bigMoneyChance)) {
                sprite_pickup = sprites.create(assets.image`SquareGem`, SpriteKind.Pickup)
                animation.runImageAnimation(
                    sprite_pickup,
                    [assets.image`SquareGem`,
                    assets.image`SquareGem`,
                    assets.image`SquareGem`,
                    assets.image`SquareGem`,
                    assets.image`SquareGem`,
                    assets.image`SquareGem`,
                    assets.image`SquareGem`,
                    assets.image`SquareGem`,
                    assets.image`SquareGem`,
                    assets.image`SquareGem`,
                    assets.image`SquareGem`,
                    assets.image`SquareGem`,
                    assets.image`SquareGem`,
                    assets.image`SquareGem`,
                    assets.image`SquareGem`,
                    assets.image`SquareGem`,
                    assets.image`SquareGem`,
                    assets.image`SquareGem`,
                    assets.image`SquareGem`,
                    assets.image`SquareGem`,
                    assets.image`SquareGemFlash`,
                    assets.image`SquareGem`,
                    assets.image`SquareGemFlash`,
                    assets.image`SquareGem`,
                    assets.image`SquareGemFlash`,
                    assets.image`SquareGem`,
                    assets.image`SquareGemFlash`,
                    assets.image`SquareGem`,
                    assets.image`SquareGemFlash`,
                    assets.image`SquareGem`],
                    125,
                    false
                )
                sprites.setDataNumber(sprite_pickup, "data_value", num_moneyValue3)
                _num_bigMoneyChance = 1
            } else {
                sprite_pickup = sprites.create(assets.image`BlueGem`, SpriteKind.Pickup)
                animation.runImageAnimation(
                    sprite_pickup,
                    [assets.image`BlueGem`,
                    assets.image`BlueGem`,
                    assets.image`BlueGem`,
                    assets.image`BlueGem`,
                    assets.image`BlueGem`,
                    assets.image`BlueGem`,
                    assets.image`BlueGem`,
                    assets.image`BlueGem`,
                    assets.image`BlueGem`,
                    assets.image`BlueGem`,
                    assets.image`BlueGem`,
                    assets.image`BlueGem`,
                    assets.image`BlueGem`,
                    assets.image`BlueGem`,
                    assets.image`BlueGem`,
                    assets.image`BlueGem`,
                    assets.image`BlueGem`,
                    assets.image`BlueGem`,
                    assets.image`BlueGem`,
                    assets.image`BlueGem`,
                    assets.image`GreenGemFlash`,
                    assets.image`BlueGem`,
                    assets.image`GreenGemFlash`,
                    assets.image`BlueGem`,
                    assets.image`GreenGemFlash`,
                    assets.image`BlueGem`,
                    assets.image`GreenGemFlash`,
                    assets.image`BlueGem`,
                    assets.image`GreenGemFlash`,
                    assets.image`BlueGem`],
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





// -------------------------------- //
// ------- COLLECT PICKUPS -------- //
// -------------------------------- //

function pickupHeart(_pickup: Sprite, _player: Sprite) {
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
            `, img`
            . . . . . . . 
            . c c . c c . 
            c 7 7 c 7 7 c 
            c 7 7 7 7 7 c 
            c 6 7 7 7 6 c 
            . c 6 6 6 c . 
            . . c c c . . 
            `, img`
            . . . . . . . 
            . . . . . . . 
            c c c . c c c 
            c 7 7 c 7 7 c 
            c 6 7 7 7 6 c 
            c 6 6 6 6 6 c 
            . c c c c c . 
            `, img`
            . . . . . . . 
            . . . . . . . 
            c c c . c c c 
            c 7 7 c 7 7 c 
            c 7 7 7 7 7 c 
            c 6 6 7 6 6 c 
            c c c c c c c 
            `, img`
            . . . . . . . 
            . . . . . . . 
            c c c . c c c 
            c 7 7 c 7 7 c 
            c 6 7 7 7 6 c 
            c 6 6 6 6 6 c 
            . c c c c c . 
            `, img`
            . c c c c c . 
            . c 7 c 7 c . 
            . c 7 7 7 c . 
            . c 7 7 7 c . 
            . c 6 7 6 c . 
            . . c 6 c . . 
            . . c c c . . 
            `, img`
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
            `, img`
            . c c c c c . 
            . c 7 c 7 c . 
            . c 7 7 7 c . 
            . c 7 7 7 c . 
            . c 6 7 6 c . 
            . . c 6 c . . 
            . . . c . . . 
            `, img`
            . c c c c c . 
            . c 7 c 7 c . 
            . c 7 7 7 c . 
            . c 7 7 7 c . 
            . c 6 7 6 c . 
            . . c 6 c . . 
            . . . c . . . 
            `, img`
            . c c c c c . 
            . c 7 c 7 c . 
            . c 7 7 7 c . 
            . c 7 7 7 c . 
            . c 6 7 6 c . 
            . . c 6 c . . 
            . . . c . . . 
            `, img`
            . c c c c c . 
            . c 7 c 7 c . 
            . c 7 7 7 c . 
            . c 7 7 7 c . 
            . c 6 7 6 c . 
            . . c 6 c . . 
            . . . c . . . 
            `, img`
            . . . . . . . 
            . c c . c c . 
            c 7 7 c 7 7 c 
            c 7 7 7 7 7 c 
            c 6 7 7 7 6 c 
            . c 6 6 6 c . 
            . . c c c . . 
            `, img`
            . . . . . . . 
            . . . . . . . 
            c c c . c c c 
            c 7 7 c 7 7 c 
            c 6 7 7 7 6 c 
            c 6 6 6 6 6 c 
            . c c c c c . 
            `, img`
            . . . . . . . 
            . . . . . . . 
            c c c . c c c 
            c 7 7 c 7 7 c 
            c 6 7 7 7 6 c 
            c 6 6 6 6 6 c 
            . c c c c c . 
            `, img`
            . . . . . . . 
            . . . . . . . 
            c c c . c c c 
            c 7 7 c 7 7 c 
            c 6 7 7 7 6 c 
            c 6 6 6 6 6 c 
            . c c c c c . 
            `, img`
            . . . . . . . 
            . c c . c c . 
            c 7 7 c 7 7 c 
            c 7 7 7 7 7 c 
            c 6 7 7 7 6 c 
            . c 6 6 6 c . 
            . . c c c . . 
            `, img`
            . c c . c c . 
            c 7 7 c 7 7 c 
            c 7 7 7 7 7 c 
            c 6 7 7 7 6 c 
            . c 6 7 6 c . 
            . . c 6 c . . 
            . . . c . . . 
            `, img`
            . c c . c c . 
            c 7 7 c 7 7 c 
            c 7 7 7 7 7 c 
            c 6 7 7 7 6 c 
            . c 6 7 6 c . 
            . . c 6 c . . 
            . . . c . . . 
            `, img`
            . . . . . . . 
            . c c . c c . 
            c 7 7 c 7 7 c 
            c 7 7 7 7 7 c 
            c 6 7 7 7 6 c 
            . c 6 6 6 c . 
            . . c c c . . 
            `, img`
            . . . . . . . 
            . c c . c c . 
            c 7 7 c 7 7 c 
            c 7 7 7 7 7 c 
            c 6 7 7 7 6 c 
            . c 6 6 6 c . 
            . . c c c . . 
            `, img`
            . . . . . . . 
            . c c . c c . 
            c 7 7 c 7 7 c 
            c 7 7 7 7 7 c 
            c 6 7 7 7 6 c 
            . c 6 6 6 c . 
            . . c c c . . 
            `, img`
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

function pickupMoney(_pickup: Sprite, _player: Sprite) {
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
                        `, img`
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
                        `, img`
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
                        `, img`
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
                        `, img`
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
                        `, img`
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
                        `, img`
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
                        `, img`
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
                        `, img`
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
                        `, img`
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
                        `, img`
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
                        `, img`
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
                        `, img`
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
                        `, img`
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
                        `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                `, img`
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
                `, img`
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
                `, img`
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
                `, img`
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
                `, img`
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
                `, img`
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
                `, img`
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
                `, img`
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