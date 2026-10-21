/* Main: background stars, landing text, confetti/fireworks, gift, letter, finale */
(function () {
  var $ = function (id) { return document.getElementById(id); };

  // ---------- Text from content.js ----------
  $("heroKicker").textContent = SITE.kicker;
  $("heroName").textContent = SITE.name;
  $("heroTagline").textContent = SITE.tagline;
  $("songName").textContent = SITE.songTitle;
  $("giftMessage").textContent = SITE.giftMessage;
  $("finaleMsg").textContent = SITE.finaleMessage;
  $("footer").textContent = "Made with love by " + SITE.from;
  document.title = "Happy Birthday, " + SITE.name + "!";

  // Animated title, one letter at a time
  "Happy Birthday".split("").forEach(function (ch, i) {
    var s = document.createElement("span");
    s.textContent = ch === " " ? "\u00A0" : ch;
    s.style.animationDelay = (0.4 + i * 0.08) + "s";
    $("heroTitle").appendChild(s);
  });

  // Background stars
  for (var i = 0; i < 90; i++) {
    var st = document.createElement("div"), size = 1 + Math.random() * 2.5;
    st.className = "star";
    st.style.cssText = "left:" + Math.random() * 100 + "%;top:" + Math.random() * 100 + "%;width:" + size + "px;height:" + size + "px;animation-delay:" + Math.random() * 3 + "s";
    $("stars").appendChild(st);
  }

  // Fade sections in when scrolled into view
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add("visible"); });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  // ---------- Confetti + fireworks (one canvas) ----------
  var fx = $("fx"), g = fx.getContext("2d"), bits = [], running = false;
  var colors = ["#ffd34d", "#ff4fa3", "#38e1ff", "#7c3aed", "#34d399", "#fff"];
  function resize() { fx.width = window.innerWidth; fx.height = window.innerHeight; }
  window.addEventListener("resize", resize); resize();

  function add(x, y, n, speed, gravity, size) {
    for (var k = 0; k < n; k++) {
      var a = Math.random() * Math.PI * 2, v = Math.random() * speed;
      bits.push({ x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - speed / 3, g: gravity, s: size + Math.random() * 3, life: 1, col: colors[k % colors.length] });
    }
    if (!running) { running = true; requestAnimationFrame(tick); }
  }
  function tick() {
    g.clearRect(0, 0, fx.width, fx.height);
    bits = bits.filter(function (p) { return p.life > 0 && p.y < fx.height + 20; });
    bits.forEach(function (p) {
      p.x += p.vx; p.y += p.vy; p.vy += p.g; p.life -= 0.008;
      g.globalAlpha = Math.max(p.life, 0);
      g.fillStyle = p.col;
      g.fillRect(p.x, p.y, p.s, p.s);
    });
    g.globalAlpha = 1;
    if (bits.length) requestAnimationFrame(tick); else running = false;
  }
  window.Party = {
    confetti: function (x, y, n) { add(x, y, n || 80, 12, 0.25, 5); },
    firework: function (x, y) { add(x, y, 70, 7, 0.05, 3); }
  };

  // ---------- Landing ----------
  $("enterBtn").addEventListener("click", function () {
    Party.confetti(window.innerWidth / 2, window.innerHeight / 2, 100);
    if (!Music.isPlaying()) Music.play();
    $("memories").scrollIntoView();
  });

  // ---------- Music controls ----------
  $("playBtn").addEventListener("click", Music.toggle);
  $("navMusic").addEventListener("click", Music.toggle);
  $("volume").addEventListener("input", function (e) { Music.setVolume(parseFloat(e.target.value)); });

  // ---------- Gift ----------
  $("giftBox").addEventListener("click", function () {
    this.classList.add("open");
    $("giftMessage").classList.remove("hidden");
    var r = this.getBoundingClientRect();
    Party.confetti(r.left + r.width / 2, r.top, 120);
  });

  // ---------- Letter ----------
  $("envelope").addEventListener("click", function () {
    this.classList.add("open");
    var paper = $("paper");
    if (!paper.childNodes.length) {
      SITE.letter.forEach(function (line, i) {
        var p = document.createElement("p");
        p.textContent = line;
        p.style.animationDelay = (0.5 + i * 0.9) + "s";
        paper.appendChild(p);
      });
    }
    paper.classList.remove("hidden");
    setTimeout(function () { paper.scrollIntoView({ block: "center" }); }, 300);
  });

  // ---------- Finale ----------
  var cake = document.querySelector(".cake"), btn = $("candleBtn"), state = 0, show = null;
  btn.addEventListener("click", function () {
    if (state === 0) {
      cake.classList.add("lit");
      btn.textContent = "Make a wish, then blow them out!";
      state = 1;
    } else if (state === 1) {
      cake.classList.remove("lit");
      $("finaleMsg").classList.remove("hidden");
      btn.textContent = "Celebrate again \uD83C\uDF89";
      state = 2;
      launch();
    } else launch();
  });
  function launch() {
    Party.confetti(window.innerWidth / 2, window.innerHeight / 3, 200);
    clearInterval(show);
    var n = 0;
    show = setInterval(function () {
      Party.firework(window.innerWidth * (0.15 + Math.random() * 0.7), window.innerHeight * (0.15 + Math.random() * 0.4));
      if (++n > 12) clearInterval(show);
    }, 450);
  }
})();
