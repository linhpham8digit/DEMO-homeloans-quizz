/* Photo slideshows (the landing hero, the quiz photo): one photograph at a time, each
   dissolving into the next (a soft blur and fade), with a slow push-in while it is on
   screen. The time per photograph is data-interval on the box (6 s if not set). Pauses
   while the tab is hidden. Under reduced motion only the first photograph shows. */
(function () {
  "use strict";
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  ["heroSlides", "quizSlides"].forEach(function (id) {
    var box = document.getElementById(id);
    if (!box) return;
    var slides = box.querySelectorAll("img");
    if (slides.length < 2) return;
    var every = parseInt(box.getAttribute("data-interval"), 10) || 6000;
    var active = 0;
    var timer = null;

    function show(i) {
      Array.prototype.forEach.call(slides, function (el, n) { el.classList.toggle("is-active", n === i); });
      active = i;
    }
    function start() {
      clearInterval(timer);
      timer = setInterval(function () { show((active + 1) % slides.length); }, every);
    }
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) clearInterval(timer); else start();
    });

    // the first photograph also comes in out of the blur on load
    slides[0].classList.remove("is-active");
    setTimeout(function () { show(0); }, 40);
    start();
  });
})();
