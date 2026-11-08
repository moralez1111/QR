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

  // Fill canvas with dark shadow background
  ctx.fillStyle = 'rgba(15, 12, 10, 0.93)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Dynamic light radius base on screen width
  const radius = Math.min(canvas.width, canvas.height) * 0.35;

  // Create smooth radial gradient spotlight
  const gradient = ctx.createRadialGradient(
    pointer.x, pointer.y, 10,
    pointer.x, pointer.y, radius
  );

  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');     // Bright center
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)'); // Soft mid-light
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');           // Fade out to darkness

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
