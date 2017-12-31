
window.onload = function() {
  loadMenu();
  typewrite();
  loadSliders();
  loadProjects();
  loadWorkExperience();
  setListeners();
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

	pageLink.forEach(function(el) {
		el.addEventListener("click", function() {
			toggleDropdown();
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
    this.period = 2000;
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
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { 
        delta /= 2; 
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
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
	console.log(workExperienceBlocks);
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