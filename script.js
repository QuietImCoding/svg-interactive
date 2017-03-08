var svg;
var rid;
var moving = false;

var linedot = function(e) {
    console.log(e.target);
    if (e.target == this) {
	drawCircle(e.offsetX, e.offsetY, e.offsetX%30);
    } else {
	e.target.setAttribute("fill", "hsl(" + rid % 360 + ", 90%, 60%)");
	e.target.setAttribute("clicked", "y");
    }
    if (e.target.getAttribute("clicked") == "y") {
	this.removeChild(e.target);
	drawCircle(e.offsetX+100, e.offsetY+100, e.offsetX%30);
    }
};

var drawCircle = function(x, y, r) {
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", r);
    circle.setAttribute("fill", "hsl(" + rid % 360 + ", 90%, 60%)");
    //circle.setAttribute("fill", color);
    svg.appendChild(circle);
    console.log("Circle at ( " + x + ", " + y + " )");
    return circle;
};

var draw = function() {
    rid = window.requestAnimationFrame(draw);
}

var clearAll = function() {
    while (svg.firstChild) {
	svg.removeChild(svg.firstChild);
    }
};

var resize = function() {
    svg.setAttribute("width", window.innerWidth);
    svg.setAttribute("height", window.innerHeight);
};

var setup = function() {
    svg = document.getElementById("svgj");
    svg.setAttribute("width", window.innerWidth);
    svg.setAttribute("height", window.innerHeight);
    window.onresize = resize;
    console.log(svg);
    svg.addEventListener("click", linedot, true);
    draw();
};

window.onload = setup;
