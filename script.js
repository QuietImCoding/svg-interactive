var svg;
var rid;
var moving = false;

var linedot = function(e) {
    console.log(e.target);
    if (e.target == this) {
	drawCircle(e.offsetX, e.offsetY, Math.floor(Math.random()*35)+10);
    } else {
	e.target.setAttribute("fill", "hsl(" + rid % 360 + ", 90%, 60%)");
	e.target.setAttribute("clicked", "y");
	e.target.addEventListener("click", function(e) {
	    svg.removeChild(e.target);
	    drawCircle(Math.floor(Math.random() * parseInt(svg.getAttribute("width"))), Math.floor(Math.random() * parseInt(svg.getAttribute("height"))), Math.floor(Math.random()*35)+10);
	}, true);
    }
};

var drawCircle = function(x, y, r) {
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    if (x <= r ) { x += r; }
    if (x >= parseInt(svg.getAttribute("width"))-r) { x -= r; }
    if (y <= r ) { y += r; }
    if (y >= parseInt(svg.getAttribute("height"))-r) { y -= r; }
    circle.setAttribute("cy", y);
    circle.setAttribute("vx", getRandomPlusOrMinus());
    circle.setAttribute("vy", getRandomPlusOrMinus());
    circle.setAttribute("r", r);
    circle.setAttribute("fill", "hsl(" + rid % 360 + ", 90%, 60%)");
    //circle.setAttribute("fill", color);
    svg.appendChild(circle);
    console.log("Circle at ( " + x + ", " + y + " )");
    return circle;
};

var getRandomPlusOrMinus = function() {
    if (Math.random() > 0.5) {
	return 1;
    }
    return -1;
}
    
var draw = function() {
    if (moving) {
	for (i=0; i < svg.childNodes.length; i++) {
	    var thisone = svg.childNodes[i];
	    thisone.setAttribute("cx", parseInt(thisone.getAttribute("cx"))+parseInt(thisone.getAttribute("vx")));
	    thisone.setAttribute("cy", parseInt(thisone.getAttribute("cy"))+parseInt(thisone.getAttribute("vy")));
	    if (parseInt(thisone.getAttribute("cx")) + parseInt(thisone.getAttribute("r")) > parseInt(svg.getAttribute("width")) || parseInt(thisone.getAttribute("cx")) - parseInt(thisone.getAttribute("r")) < 0) {
		thisone.setAttribute("vx", - parseInt(thisone.getAttribute("vx")));
	    }
	    if (parseInt(thisone.getAttribute("cy")) + parseInt(thisone.getAttribute("r")) > parseInt(svg.getAttribute("height")) || parseInt(thisone.getAttribute("cy")) - parseInt(thisone.getAttribute("r")) < 0) {
		thisone.setAttribute("vy",- parseInt(thisone.getAttribute("vy")));
	    }
	}
    }
    rid = window.requestAnimationFrame(draw);
}

var move = function() {
    moving = !moving;
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
    svg.addEventListener("click", linedot);
    draw();
};

window.onload = setup;
