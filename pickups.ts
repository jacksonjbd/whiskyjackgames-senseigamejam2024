sprites.onOverlap(SpriteKind.Player, SpriteKind.Pickup, function (sprite, otherSprite) {
    if (sprites.readDataString(otherSprite, "data_type") == "heart") {
        pickupHeart(otherSprite, sprite)
    } else if (sprites.readDataString(otherSprite, "data_type") == "money") {
        pickupMoney(otherSprite, sprite)
    }
})

function createPickup(_x: number, _y: number, _drop: number, _heart: number) {
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
                    [assets.image`GreenGem`, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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
                    `, img`
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