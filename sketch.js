let x1, y1, x2, y2 = 0;
let vx, vy = 3;
let velocity = 3;
const canvasWidth = document.body.clientWidth;
const canvasHeight = document.body.clientHeight;
let [r, g, b] = [255, 204, 0];

let rotation = 0;
let rotationDetlaCap = 0.1;
let rotationDetla = 0;
let rotationDetlaDelta = 0.001;

let strokeWidth = 4;
let strokeWidthDelta = 0.05;

function RandomVector2(angle, angleMin) {
	var random = Math.random() * angle + angleMin;
	return [Math.cos(random), Math.sin(random)];
}

function vectorToAngle(x, y) {
	return Math.atan2(y,x);
}

function setup() {
	createCanvas(canvasWidth, canvasHeight);
	background(220)
	stroke(255, 204, 0);
	x1 = Math.random() * canvasWidth;
	y1 = Math.random() * canvasHeight;
}

function draw() {
	r += Math.round(Math.random() * 8) - 4;
	g += Math.round(Math.random() * 8) - 4;
	b += Math.round(Math.random() * 8) - 4;
	stroke(r, g, b);
	strokeWeight(strokeWidth);
	strokeWidth += strokeWidthDelta;
	if (strokeWidth > 30 || strokeWidth < 0.5) {
		strokeWidthDelta *= -1;
	}

	rotationDetla += rotationDetlaDelta;
	if (rotationDetla > rotationDetlaCap || rotationDetla < -rotationDetlaCap) {
		rotationDetlaCap = (Math.random() * 0.1) - 0.05
		rotationDetla = (Math.random() * rotationDetlaCap * 2) - rotationDetlaCap;
	}

	rotation += rotationDetla % Math.PI * 2;
	// [vx, vy] = RandomVector2(rotation, Math.PI / 10);
	// debugger
	// console.log(rotation)

	vx = Math.cos(rotation) * (velocity + (strokeWidth / 10)) 
	vy = Math.sin(rotation) * (velocity + (strokeWidth / 10)) 
	if (x1 + vx + (strokeWidth / 2) > canvasWidth || x1 + vx - (strokeWidth / 2) < 0) {
		rotation = vectorToAngle(-vx, vy)
		vx = Math.cos(rotation) * (velocity + (strokeWidth / 10)) 
		vy = Math.sin(rotation) * (velocity + (strokeWidth / 10)) 
	}
	if (y1 + vy + (strokeWidth / 2) > canvasHeight || y1 + vy - (strokeWidth / 2) < 0) {
		rotation = vectorToAngle(vx, -vy)
		vx = Math.cos(rotation) * (velocity * (strokeWidth / 10)) 
		vy = Math.sin(rotation) * (velocity * (strokeWidth / 10)) 
	}

	x2 = x1;
	y2 = y1;
	x1 += vx;
	y1 += vy;
	line(x2, y2, x1, y1);
}
