
window.onload = function() {
  loadMenu();
  typewrite();
  loadSliders();
  loadProjects();
  loadWorkExperience();
  setListeners();
  watchForHover();
};

/* ----------------------------------------------------------------- MENU */

var hamburgerBtn, hamburgerLines, 
	dropdownMenu, menuItems, pageLink;
function loadMenu() {
	hamburgerBtn   = document.querySelector("#hamburger");
	hamburgerLines = document.querySelectorAll("#hamburger span");
	dropdownMenu   = document.querySelector(".main-menu");
	menuItems      = document.querySelectorAll(".main-menu .menu-item");
	pageLink       = document.querySelectorAll(".main-menu a");	

	hamburgerBtn.addEventListener("click", function() {
		toggleDropdown();
	});

  var url
	pageLink.forEach(function(el) {
		el.addEventListener("click", function(event) {
			toggleDropdown();
			smoothScroll(el.getAttribute("href"), event);
		});
	});
}

function toggleDropdown() {
	hamburgerLines.forEach(function(el) {
		el.classList.toggle("active");
	});
	menuItems.forEach(function(el) {
		el.classList.toggle("show");
	});
	dropdownMenu.classList.toggle("show");
}

/* -------------------------------------------------- TYPEWRITE ANIMATION */

function typewrite() {
  var typeElements = document.getElementsByClassName('typewrite');
  for (var i=0; i<typeElements.length; i++) {
    var words = typeElements[i].getAttribute('data-words');
    if (words) {
      new Typewriter(typeElements[i], JSON.parse(words));
    }
  }
}

var Typewriter = function(el, words) {
  this.words = words;
  this.el = el;
  this.loopNum = 0;
  this.period = 1250;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

Typewriter.prototype.tick = function() {

  if (this.el.classList.contains("blink")) {
    this.el.classList.toggle("blink");
  }

  var i = this.loopNum % this.words.length;
  var fullTxt = this.words[i];

  if (this.isDeleting) 
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  else 
    this.txt = fullTxt.substring(0, this.txt.length + 1);

  this.el.innerHTML = this.txt;

  var that = this;
  var delta = 125 - Math.random()*50; // Typing

  if (this.isDeleting) { 
    delta = 90; // Deleting
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    if (i === this.words.length-1) delta = 5000;
    else delta = this.period;
    this.isDeleting = true;
    this.el.classList.toggle("blink");

  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 1000;
    this.el.classList.toggle("blink");
  }

  setTimeout(function() { 
    that.tick(); 
  }, delta);
};

/* ----------------------------------------------------- SLIDER ANIMATION */

var skillGroups;
function loadSliders(){
	skillGroups = document.querySelectorAll(".skills");
}

function resetSliders() {
	sliders.forEach(function(slider) {
		slider.style.width = "0px";
	});
}

/* ------------------------------------------------------------- PROJECTS */
var projects;
function loadProjects() {
	projects = document.querySelectorAll("#projects .project");
}

/* ----------------------------------------------------------------- WORK */
var workExperienceBlocks;
function loadWorkExperience(){
	workExperienceBlocks = document.querySelectorAll(".timeline .work-experience-block");
}
 
/* -------------------------------------------------------- SMOOTH SCROLL */
function currentYPosition() {
  // Firefox, Chrome, Opera, Safari
  if (self.pageYOffset) return self.pageYOffset;
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop)
      return document.documentElement.scrollTop;
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
}

function elmYPosition(el) {
  var elm = document.querySelector(el);
  var y = elm.offsetTop;
  var node = elm;
  while (node.offsetParent && node.offsetParent != document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  } 
  return y-61; // 60px offset to account for header
}

function smoothScroll(el,event) {
  var startY = currentYPosition();
  var stopY = elmYPosition(el);
  var distance = stopY > startY ? stopY - startY : startY - stopY;

  if (distance === 0) {
      event.preventDefault()
  }
  
  var speed = Math.round(distance / 100);
  if (speed >= 20) speed = 20;
  var step = Math.round(distance / 25);
  var leapY = stopY > startY ? startY + step : startY - step;
  var timer = 0;

  if (stopY > startY) {
    for ( var i=startY; i<stopY; i+=step ) {
      setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
      leapY += step; if (leapY > stopY) leapY = stopY; timer++;
    } 
    return;
  }
  for ( var i=startY; i>stopY; i-=step ) {
    setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
    leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
  }
}

/* ---------------------------------------------------------------- HOVER */
function watchForHover() {
  var hasHoverClass = false;
  var container = document.body;
  var lastTouchTime = 0;

  function enableHover() {
    // filter emulated events coming from touch events
    if (new Date() - lastTouchTime < 500) return;
    if (hasHoverClass) return;
    container.className += ' hasHover';
    hasHoverClass = true;
  }

  function disableHover() {
    if (!hasHoverClass) return;
    container.className = container.className.replace(' hasHover', '');
    hasHoverClass = false;
  }

  function updateLastTouchTime() {
    lastTouchTime = new Date();
  }

  document.addEventListener('touchstart', updateLastTouchTime, true);
  document.addEventListener('touchstart', disableHover, true);
  document.addEventListener('mousemove', enableHover, true);

  enableHover();
}

/* ------------------------------------------------------------ UTILITIES */
function inViewport(el) {
	var rect = el.getBoundingClientRect();
	return (
		rect.top >= 0 && 
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}

function setListeners() {
	window.addEventListener("scroll", checkViewport);
	window.addEventListener("load", checkViewport);
	//window.addEventListener("resize", checkViewport);
}

function checkViewport() {
	var competency, sliders, groupName, query;
	if (skillGroups) {
		skillGroups.forEach(function(el){
			if (inViewport(el)) {
				groupName = el.classList[1];
				query = "."+groupName+" .slider";
				sliders = document.querySelectorAll(query);
	    	sliders.forEach(function(skill) {
		      competency = skill.getAttribute("data-progress-percent");
		      skill.style.width = competency + "%"
	    	})
			}
		});		
	}

	projects.forEach(function(project){
		if (inViewport(project)) {
			project.classList.add("show");
		}
	});

	workExperienceBlocks.forEach(function(el){
		if (inViewport(el)) {
			el.classList.add("in-view")
		}
	});
}