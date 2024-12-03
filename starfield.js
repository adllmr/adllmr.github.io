const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 200; // Number of stars
const speed = 1;      // Speed of movement

// Create stars
function initializeStars() {
    stars.length = 0;
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: (Math.random() - 0.5) * canvas.width, // Spread across -width/2 to +width/2
            y: (Math.random() - 0.5) * canvas.height, // Spread across -height/2 to +height/2
            z: Math.random() * canvas.width // Depth value for perspective
        });
    }
}

initializeStars();

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let star of stars) {
        const k = 128.0 / star.z; // Perspective scaling factor
        const px = star.x * k + canvas.width / 2;
        const py = star.y * k + canvas.height / 2;

        // Ensure stars are visible within the canvas
        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
            const size = (1 - star.z / canvas.width) * 2;
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(px, py, size, 0, 2 * Math.PI);
            ctx.fill();
        }

        // Move the star closer
        star.z -= speed;

        // Reset star to the back if it moves past the viewer
        if (star.z <= 0) {
            star.z = canvas.width;
            star.x = (Math.random() - 0.5) * canvas.width;
            star.y = (Math.random() - 0.5) * canvas.height;
        }
    }

    requestAnimationFrame(drawStars);
}

drawStars();

// Adjust canvas size and reinitialize stars on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initializeStars();
});
