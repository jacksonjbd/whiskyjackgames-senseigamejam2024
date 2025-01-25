function updateHUD() {
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
                [assets.image`Health1`],
                500,
                false
            )
        } else if (num_currentHealth == 2) {
            animation.runImageAnimation(
                sprite_hudHealth,
                [assets.image`Health2`],
                500,
                false
            )
        } else if (num_currentHealth == 3) {
            animation.runImageAnimation(
                sprite_hudHealth,
                [assets.image`Health3`],
                500,
                false
            )
        }
    }
}
let text_moneyAdd: TextSprite = null