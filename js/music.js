/* Music: plays assets/audio/song.mp3 if it exists, otherwise a built-in
   "Happy Birthday" melody made with the Web Audio API (no file needed). */
(function () {
  var audio = null, ctx = null, master = null, timer = null;
  var usingFile = false, playing = false, volume = 0.6;

  // [frequency in Hz, length in beats]
  var tune = [
    [392, .75], [392, .25], [440, 1], [392, 1], [523, 1], [494, 2],
    [392, .75], [392, .25], [440, 1], [392, 1], [587, 1], [523, 2],
    [392, .75], [392, .25], [784, 1], [659, 1], [523, 1], [494, 1], [440, 2],
    [698, .75], [698, .25], [659, 1], [523, 1], [587, 1], [523, 2]
  ];

  function playTune() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      master = ctx.createGain();
      master.connect(ctx.destination);
    }
    master.gain.value = volume;
    ctx.resume();
    var t = ctx.currentTime + 0.1, beat = 0.55;
    tune.forEach(function (n) {
      var osc = ctx.createOscillator(), g = ctx.createGain(), len = n[1] * beat;
      osc.type = "triangle";
      osc.frequency.value = n[0];
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.5, t + 0.04);
      g.gain.exponentialRampToValueAtTime(0.001, t + len * 0.95);
      osc.connect(g); g.connect(master);
      osc.start(t); osc.stop(t + len);
      t += len;
    });
    // play again after a short pause
    timer = setTimeout(function () { if (playing && !usingFile) playTune(); }, (t - ctx.currentTime + 1.5) * 1000);
  }

  function setUI(on) {
    playing = on;
    document.body.classList.toggle("playing", on);
    var b = document.getElementById("playBtn");
    if (b) b.innerHTML = on ? "&#10074;&#10074; Pause" : "&#9654; Play";
  }

  function fallback() {
    usingFile = false;
    var note = document.getElementById("musicNote");
    if (note) note.textContent = "Playing the built-in melody. Add your own song at " + SITE.audioFile + " to replace it.";
    playTune();
  }

  function play() {
    setUI(true);
    if (usingFile) { audio.play().catch(fallback); return; }
    if (!audio && SITE.audioFile) {
      audio = new Audio(SITE.audioFile);
      audio.loop = true;
      audio.volume = volume;
      usingFile = true;
      audio.play().catch(fallback);
      return;
    }
    playTune();
  }

  function pause() {
    setUI(false);
    clearTimeout(timer);
    if (usingFile && audio) audio.pause();
    if (ctx) ctx.suspend();
  }

  function setVolume(v) {
    volume = v;
    if (audio) audio.volume = v;
    if (master) master.gain.value = v;
  }

  window.Music = { play: play, pause: pause, toggle: function () { playing ? pause() : play(); }, setVolume: setVolume, isPlaying: function () { return playing; } };
})();
