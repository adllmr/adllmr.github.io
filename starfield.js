const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 10000; // Number of stars
const speed = canvas.width / 5000;      // Speed of movement

// Create stars uniformly distributed in a 3D space
function initializeStars() {
    stars.length = 0;
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width * 10 - canvas.width * 5, // Spread stars across the full screen
            y: Math.random() * canvas.height * 10 - canvas.height * 5,
            z: Math.random() * canvas.width // Depth value for perspective
        });
    }
}

initializeStars();

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let star of stars) {
        // Perspective projection
        const k = 128.0 / star.z; // Projection scale factor
        const px = star.x * k + canvas.width / 2;
        const py = star.y * k + canvas.height / 2;

        // Draw stars only if they are within the visible canvas
        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
            const size = (1 - star.z / canvas.width) * 2; // Size based on depth
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(px, py, size, 0, 2 * Math.PI);
            ctx.fill();
        }

        // Move the star closer to simulate motion
        star.z -= speed;

        // Reset stars when they "pass" the viewer
        if (star.z <= 0) {
            star.z = canvas.width;
            star.x = Math.random() * canvas.width * 10 - canvas.width * 5;
            star.y = Math.random() * canvas.height * 10 - canvas.height * 5;
        }
    }

    requestAnimationFrame(drawStars);
}

drawStars();

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initializeStars();
});
