const canvas = document.getElementById('flashlight-canvas');
const ctx = canvas.getContext('2d');

let pointer = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
};

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  draw();
}

function updatePointerPosition(e) {
  if (e.touches && e.touches.length > 0) {
    pointer.x = e.touches[0].clientX;
    pointer.y = e.touches[0].clientY;
  } else {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
  }
  draw();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Darkened background overlay (0.97 opacity for a deeper dark environment)
  ctx.fillStyle = 'rgba(8, 6, 5, 0.97)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Slightly tighter flashlight beam radius (0.26 instead of 0.35)
  const radius = Math.min(canvas.width, canvas.height) * 0.26;

  // Dimmed radial gradient for a subtler glow
  const gradient = ctx.createRadialGradient(
    pointer.x, pointer.y, 5,
    pointer.x, pointer.y, radius
  );

  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');    // Slightly softer center
  gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.55)'); // Dimmer mid-glow
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');           // Smooth fade into darkness

  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(pointer.x, pointer.y, radius, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.globalCompositeOperation = 'source-over';
}

// Event Listeners for Desktop + Mobile Touch
window.addEventListener('resize', resizeCanvas);
window.addEventListener('mousemove', updatePointerPosition);
window.addEventListener('touchmove', updatePointerPosition, { passive: true });
window.addEventListener('touchstart', updatePointerPosition, { passive: true });

// Initial setup
resizeCanvas();
