// Selecting elements
const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const eraser = document.getElementById('eraser');
const clearCanvas = document.getElementById('clearCanvas');

// Setting canvas dimensions to fill the window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - document.querySelector('.toolbar').offsetHeight;
}

window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

// Initial settings
let drawing = false;
let currentColor = colorPicker.value;
let currentBrushSize = brushSize.value;
let isErasing = false;

// Update brush color
colorPicker.addEventListener('change', (e) => {
    currentColor = e.target.value;
    isErasing = false;
    eraser.classList.remove('active');
});

// Update brush size
brushSize.addEventListener('change', (e) => {
    currentBrushSize = e.target.value;
});

// Toggle eraser
eraser.addEventListener('click', () => {
    isErasing = !isErasing;
    if (isErasing) {
        eraser.classList.add('active');
    } else {
        eraser.classList.remove('active');
    }
});

// Clear the canvas
clearCanvas.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Drawing functions
function startPosition(e) {
    drawing = true;
    draw(e);
}

function endPosition() {
    drawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!drawing) return;

    ctx.lineWidth = currentBrushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = isErasing ? '#FFFFFF' : currentColor;

    ctx.lineTo(e.clientX, e.clientY - document.querySelector('.toolbar').offsetHeight);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY - document.querySelector('.toolbar').offsetHeight);
}

// Event listeners for mouse
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

// Optional: Support touch devices
canvas.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    startPosition(touch);
});

canvas.addEventListener('touchend', endPosition);
canvas.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Prevent scrolling when drawing
    const touch = e.touches[0];
    draw(touch);
});
