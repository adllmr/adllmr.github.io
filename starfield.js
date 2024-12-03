const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 200; // Number of stars
const speed = 2;      // Speed of movement

// Create stars
for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * canvas.width
    });
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let star of stars) {
        const k = 128.0 / star.z;
        const px = star.x * k + canvas.width / 2;
        const py = star.y * k + canvas.height / 2;

        // Ensure stars only within the visible range
        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
            const size = (1 - star.z / canvas.width) * 2;
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(px, py, size, 0, 2 * Math.PI);
            ctx.fill();
        }

        // Move the star closer
        star.z -= speed;

        // Reset star to the back if it gets too close
        if (star.z <= 0) {
            star.z = canvas.width;
            star.x = Math.random() * canvas.width;
            star.y = Math.random() * canvas.height;
        }
    }

    requestAnimationFrame(drawStars);
}

drawStars();

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
