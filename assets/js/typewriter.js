window.onload = function() {
    typewrite();
};

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









