setTimeout(function() {
  fadeOutPreloader(document.getElementById('preloader'), 69);
}, 1500);

document.addEventListener("DOMContentLoaded", function () {
  const pieces = document.querySelectorAll(".hub-container .piece");
  const hubContainer = document.querySelector(".hub-container");
  const mobileGallery = document.querySelector(".mobile-gallery");

  function positionPieces() {
    if (window.innerWidth > 768) {
      // Enable Circle Layout
      hubContainer.style.display = "flex";
      mobileGallery.style.display = "none";

      const radius = 280; // Maintain circle layout
      const centerX = window.innerWidth / 2;
      const centerY = 400;

      pieces.forEach((piece, index) => {
        const angle = (index / pieces.length) * (2 * Math.PI);
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        piece.style.position = "absolute";
        piece.style.left = `${x}px`;
        piece.style.top = `${y}px`;
        piece.style.width = "80px";
        piece.style.maxWidth = "80px";
      });
    } else {
      // Enable Mobile Layout
      hubContainer.style.display = "none";
      mobileGallery.style.display = "block";
    }
  }

  positionPieces(); // Run on load
  window.addEventListener("resize", positionPieces); // Run on resize
});


$(document).ready(function() {
  $(window).on('beforeunload', function() {
    window.scrollTo(0, 0);
  });

  let configFile = "/assets/js/particles-studio-museum.json"; // Default

  if (window.location.pathname.includes("studio-museum")) {
    configFile = "/assets/js/particles-studio-museum.json";
  } else if (window.location.pathname.includes("work")) {
    configFile = "/assets/particles.json";
  } else if (window.location.pathname.includes("inane")) {
    configFile = "/assets/js/blog-particles.json";
  }

  console.log("Path detected:", window.location.pathname);
  console.log("Using config file:", configFile);


  /* Load the correct particles configuration */
  particlesJS.load('landing', configFile, function() {
    console.log("Loaded particles config:", configFile);
  });

  // Typing Text
  var element = document.getElementById('txt-rotate');
  var toRotate = element.getAttribute('data-rotate');
  var period = element.getAttribute('data-period');
  setTimeout(function() {
    new TxtRotate(element, JSON.parse(toRotate), period);
  }, 1500);

  document.addEventListener('colorshift', function(e) {
  let piece = document.getElementByClass('piece');
  piece.style.opacity = -1 + 'px';
  piece.style.opacity = -1 + 'px';
  });

  // INJECT CSS
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
});

/* FUNCTIONS */
/* Preloader */

function fadeOutPreloader(element, duration) {
  opacity = 1;

  interval = setInterval(function() {
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

var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
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

  setTimeout(function() {
    that.tick();
  }, delta);
};

/* Word Cloud */

function randomizeOrder() {
  var parent = document.getElementById('skills');
  var divs = parent.getElementsByTagName('div');
  var frag = document.createDocumentFragment();

  // Randomize order of skills
  while (divs.length) {
    frag.appendChild(divs[Math.floor(Math.random() * divs.length)]);
  }
  parent.appendChild(frag);
}
