setTimeout(function () {
  fadeOutPreloader(document.getElementById('preloader'), 69);
}, 1500);

document.addEventListener("DOMContentLoaded", function () {
  const pieceLayout = document.querySelector("#piece-layout");

  if (pieceLayout) {
    console.log("Applying particles to #piece-layout...");

    particlesJS.load("piece-layout", "/assets/js/piece-particles.json", function () {
      console.log("Loaded particles for #piece-layout.");
    });

    pieceLayout.style.position = "relative";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const hubContainer = document.querySelector(".hub-container");
  const mobileGallery = document.querySelector(".mobile-gallery");

  if (!hubContainer && !mobileGallery) {
    console.log("Skipping positionPieces(): Not on a work page.");
    return;
  }

  const pieces = document.querySelectorAll(".hub-container .piece");

  function positionPieces() {
    if (!hubContainer || !mobileGallery) return;
    if (window.innerWidth > 768) {
      hubContainer.style.display = "flex";
      mobileGallery.style.display = "none";

      const centerX = window.innerWidth / 2 + 20; // Moves spiral right
      const centerY = window.innerHeight / 2 + 60; // Moves spiral lower

      let a = 0;  // ⬇️ Smaller start radius for an even tighter curl
      let b = 5;  // ⬇️ Slower outward expansion
      let segmentLength = 210; // Keeps pieces evenly spaced

      let theta = -18; // Start angle
      let lastX = centerX;
      let lastY = centerY;

      pieces.forEach((piece, index) => {
        let found = false;

        while (!found) {
          theta += 0.050;  // ⬆️ Faster initial rotation to make the curl **tighter**
          let r = a + b * theta; // Archimedean spiral equation

          // Gradually increase `b` to smooth the outward expansion
          if (theta > Math.PI) {
            b += 0.03;
          }

          let x = centerX + r * Math.cos(theta);
          let y = centerY + r * Math.sin(theta);

          let distance = Math.sqrt((x - lastX) ** 2 + (y - lastY) ** 2);
          if (distance >= segmentLength) {
            lastX = x;
            lastY = y;
            found = true;

            piece.style.position = "absolute";
            piece.style.left = `${x}px`;
            piece.style.top = `${y}px`;
            piece.style.width = "90px";
            piece.style.maxWidth = "90px";
            piece.style.transform = `translate(-50%, -50%)`;
          }
        }
      });
    } else {
      hubContainer.style.display = "none";
      mobileGallery.style.display = "block";
    }
  }

  positionPieces();
  window.addEventListener("resize", positionPieces);
});

// Fix missing jQuery issue
document.addEventListener("DOMContentLoaded", function () {
  window.scrollTo(0, 0);
});

let configFile = "/assets/js/particles-studio-museum.json"; // Default

if (window.location.pathname.includes("studio-museum")) {
  configFile = "/assets/js/particles-studio-museum.json";
} else if (window.location.pathname.includes("work")) {
  configFile = "/assets/js/particles-work.json";
} else if (window.location.pathname.includes("inane")) {
  configFile = "/assets/js/blog-particles.json";
} else if (window.location.pathname.includes("piece")) {
  configFile = "/assets/js/piece-particles.json";
}

console.log("Path detected:", window.location.pathname);
console.log("Using config file:", configFile);

// Load the correct particles configuration
particlesJS.load('landing', configFile, function () {
  console.log("Loaded particles config:", configFile);
});

// Fix Typing Text Issue
var element = document.getElementById('txt-rotate');
if (element) {
  var toRotate = element.getAttribute('data-rotate');
  var period = element.getAttribute('data-period');
  setTimeout(function () {
    new TxtRotate(element, JSON.parse(toRotate), period);
  }, 1500);
}

// Fix 'colorshift' event listener
document.addEventListener('colorshift', function (e) {
  let pieces = document.querySelectorAll('.piece'); // Select all elements with class "piece"

  pieces.forEach(piece => {
    piece.style.opacity = "-1px"; // Apply opacity change correctly
  });
});

// Inject CSS
var css = document.createElement('style');
css.type = 'text/css';
css.innerHTML = '#txt-rotate > .wrap { border-right: 0.08em solid #666 }';
document.body.appendChild(css);

// Initialize AOS
AOS.init({
  disable: 'mobile',
  offset: 200,
  duration: 600,
  easing: 'ease-in-sine',
  delay: 100,
  once: true
});

randomizeOrder();

/* FUNCTIONS */
/* Preloader */
function fadeOutPreloader(element, duration) {
  let opacity = 1;
  let interval = setInterval(function () {
    if (opacity <= 0) {
      element.style.zIndex = 0;
      element.style.opacity = 0;
      element.style.filter = 'alpha(opacity = 0)';

      // Allow horizontal scroll
      document.documentElement.style.overflowY = 'auto';

      // Remove preloader div
      document.getElementById('preloader').remove();

      clearInterval(interval);
    } else {
      opacity -= 0.1;
      element.style.opacity = opacity;
      element.style.filter = 'alpha(opacity = ' + opacity * 100 + ')';
    }
  }, duration);
}

/* Typing Text */
var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }
  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 5;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

/* Word Cloud */
function randomizeOrder() {
  var parent = document.getElementById('skills');
  if (!parent) return; // Ensure element exists before running

  var divs = parent.getElementsByTagName('div');
  var frag = document.createDocumentFragment();

  // Randomize order of skills
  while (divs.length) {
    frag.appendChild(divs[Math.floor(Math.random() * divs.length)]);
  }
  parent.appendChild(frag);
}