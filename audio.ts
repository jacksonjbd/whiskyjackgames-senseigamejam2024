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

function playCatNoise() {
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