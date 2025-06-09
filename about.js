
    // Theme toggle
    function toggleTheme() {
      document.body.classList.toggle('dark');
    }

    // Bubble animation
    const canvas = document.getElementById('bubble-canvas');
    const ctx = canvas.getContext('2d');

    let width, height;
    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    class Bubble {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 100;
        this.radius = 10 + Math.random() * 20;
        this.speed = 0.5 + Math.random() * 1.5;
        this.opacity = 0.1 + Math.random() * 0.3;
        this.direction = Math.random() * 2 * Math.PI;
        this.xSpeed = Math.cos(this.direction) * 0.3;
      }

      update() {
        this.y -= this.speed;
        this.x += this.xSpeed;
        if (this.y + this.radius < 0) this.reset();
        if (this.x - this.radius > width) this.x = -this.radius;
        if (this.x + this.radius < 0) this.x = width + this.radius;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(19, 20, 21, ${this.opacity})`;
        ctx.fill();
      }
    }

    const bubbles = [];
    const bubbleCount = 40;
    for(let i=0; i<bubbleCount; i++){
      bubbles.push(new Bubble());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      bubbles.forEach(bubble => {
        bubble.update();
        bubble.draw();
      });
      requestAnimationFrame(animate);
    }
    animate();
