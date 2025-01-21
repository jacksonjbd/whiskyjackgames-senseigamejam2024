function playHitSound() {
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
