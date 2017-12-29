/*
    References:
    CodePen: https://codepen.io/hi-im-si/pen/DHoup?q=typewriter&limit=all&type=type-pens
*/

window.addEventListener('scroll', function(){

    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) 
        currentPosition = self.pageYOffset;

    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop) 
        currentPosition = document.documentElement.scrollTop;

    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) 
        currentPosition = document.body.scrollTop; 
    
    var targetPosition = document.querySelector("#skills").offsetTop;
    
    if (currentPosition) {
        console.log(currentPosition);
    }
    if (targetPosition) console.log(targetPosition);
})

function loadSliders(){
    var allSkills = document.querySelectorAll(".slider");
    var competency, parentWidth, fill;
    allSkills.forEach(function(skill){
        competency = skill.getAttribute("data-progress-percent") / 100;
        parentWidth = skill.parentNode.clientWidth;
        fill = competency * parentWidth;
        skill.setAttribute("style","width:"+fill+"px");
    })
}

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new Typewriter(elements[i], JSON.parse(toRotate), period);
        }
    }
};

var Typewriter = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

Typewriter.prototype.tick = function() {

    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) 
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    else 
        this.txt = fullTxt.substring(0, this.txt.length + 1);

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { 
        delta /= 2; 
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

function elmYPosition(eID) {
    var elm = document.getElementById(eID);
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    } 
    return y-60; // 60px offset to account for header
}

function smoothScroll(eID) {
    var startY = currentYPosition();
    var stopY = elmYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;

    if (distance < 100) {
        scrollTo(0, stopY); 
        return;
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