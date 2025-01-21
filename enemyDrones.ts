function damageDrone(_enemy: Sprite, _damage: number, _origin: Sprite) {
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
            `, img`
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
            `, img`
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
                `, img`
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
                `, img`
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
                `, img`
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