window.addEventListener('DOMContentLoaded', () => {
  // Theme toggle
  window.toggleTheme = function () {
    document.body.classList.toggle('dark');
  };

  const canvas = document.getElementById('bubbles');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Bubble {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + 20 + Math.random() * 100;
      this.radius = 8 + Math.random() * 15;
      this.speed = 0.5 + Math.random() * 1;
      this.angle = Math.random() * Math.PI * 2;
      this.angleSpeed = 0.01 + Math.random() * 0.02;
      this.alpha = 0.2 + Math.random() * 0.3;
    }

    update() {
      this.y -= this.speed;
      this.angle += this.angleSpeed;
      this.x += Math.sin(this.angle) * 0.5;

      if (this.y + this.radius < 0) {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 20 + Math.random() * 100;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
      ctx.fill();
    }
  }

  const bubblesArray = [];
  for (let i = 0; i < 50; i++) {
    bubblesArray.push(new Bubble());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bubblesArray.forEach((bubble) => {
      bubble.update();
      bubble.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
});
