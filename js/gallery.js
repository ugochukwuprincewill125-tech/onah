/* Memories gallery with a simple lightbox (click, arrows, Esc) */
(function () {
  var items = SITE.memories, grid = document.getElementById("galleryGrid"), box = null, index = 0;

  items.forEach(function (m, i) {
    var fig = document.createElement("figure");
    fig.tabIndex = 0;
    fig.innerHTML = '<img src="' + m.src + '" alt="' + m.caption + '"><figcaption>' + m.caption + "</figcaption>";
    fig.addEventListener("click", function () { open(i); });
    fig.addEventListener("keydown", function (e) { if (e.key === "Enter") open(i); });
    grid.appendChild(fig);
  });

  function show() {
    box.querySelector("img").src = items[index].src;
    box.querySelector("p").textContent = items[index].caption;
  }
  function step(n) { index = (index + n + items.length) % items.length; show(); }
  function close() { if (box) { box.remove(); box = null; } }

  function open(i) {
    index = i;
    box = document.createElement("div");
    box.id = "lightbox";
    box.innerHTML = '<img alt=""><p></p><div class="row"><button data-a="prev">&larr; Prev</button><button data-a="close">Close</button><button data-a="next">Next &rarr;</button></div>';
    box.addEventListener("click", function (e) {
      var a = e.target.getAttribute("data-a");
      if (a === "prev") step(-1);
      else if (a === "next") step(1);
      else if (a === "close" || e.target === box) close();
    });
    document.body.appendChild(box);
    show();
  }

  document.addEventListener("keydown", function (e) {
    if (!box) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
})();
