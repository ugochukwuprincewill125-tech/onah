/* Wishes constellation: tap each star to reveal a wish and join the lines */
(function () {
  var canvas = document.getElementById("sky"), c = canvas.getContext("2d");
  var text = document.getElementById("wishText"), wishes = SITE.wishes;
  var stars = [], lit = 0, w = 0, h = 420;

  function layout() {
    var dpr = window.devicePixelRatio || 1;
    w = canvas.clientWidth;
    canvas.width = w * dpr; canvas.height = h * dpr;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    var old = stars.map(function (s) { return s.on; });
    stars = wishes.map(function (wish, i) {
      var n = wishes.length;
      return { x: w * (i + 1) / (n + 1), y: h * (0.5 + 0.28 * Math.sin(i * 1.7)), wish: wish, on: old[i] || false };
    });
  }

  function draw(time) {
    c.clearRect(0, 0, w, h);
    c.strokeStyle = "rgba(255,211,77,0.8)"; c.lineWidth = 2;
    c.beginPath();
    var started = false;
    stars.forEach(function (s) {
      if (!s.on) return;
      if (!started) { c.moveTo(s.x, s.y); started = true; } else c.lineTo(s.x, s.y);
    });
    c.stroke();
    stars.forEach(function (s, i) {
      var pulse = 1 + 0.25 * Math.sin(time / 300 + i);
      c.beginPath();
      c.arc(s.x, s.y, (s.on ? 10 : 8) * pulse, 0, Math.PI * 2);
      c.fillStyle = s.on ? "#ffd34d" : "#38e1ff";
      c.shadowColor = s.on ? "#ff4fa3" : "#38e1ff";
      c.shadowBlur = 18;
      c.fill();
    });
    c.shadowBlur = 0;
    requestAnimationFrame(draw);
  }

  canvas.addEventListener("click", function (e) {
    var r = canvas.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    stars.forEach(function (s) {
      if (Math.hypot(s.x - x, s.y - y) < 26) {
        if (!s.on) { s.on = true; lit++; }
        text.textContent = s.wish;
        if (lit === stars.length) {
          text.textContent = s.wish + "  \u2728 Your constellation is complete!";
          if (window.Party) window.Party.confetti(window.innerWidth / 2, window.innerHeight / 2, 120);
        }
      }
    });
  });

  window.addEventListener("resize", layout);
  layout();
  requestAnimationFrame(draw);
})();
