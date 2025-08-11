const canvas = document.getElementById("valentineCanvas");
const ctx = canvas.getContext("2d");
const audio = document.getElementById("backgroundMusic");
const startButton = document.getElementById("startButton");

// Set canvas size to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];
const images = [];
const backgroundColor = "#FF6F61"; // Set background color to pinkish-orange
const tempBackgroundColor = "#000000"; // Set temporary background color to black

// Array to store image objects
const imagePaths = [
    './vday23.jpg',
    './vday27.jpg',
    './vday40.jpg',
    './vday28.jpg',
    './vday26.JPG',
    './vday33.JPG',
    './vday41.JPG',
    './vday32.jpg',
    './vday31.jpg',
    './vday34.jpg',
    './vday3.jpg',
    './vday11.jpg',
    './vday52.jpg',
    './vday6.JPG',
    './vday4.JPG',
    './vday7.JPG',
    './vday14.JPG',
    './vday21.jpg',
    './vday42.JPG',
    './vday44.JPG',
    './vday13.jpg',
    './vday10.jpg',
    './vday8.JPG',
    './vday1.jpeg',
    './vday43.JPG',
    './vday16.jpg',
    './vday18.jpg',
    './vday51.jpg',
    './vday2.jpeg',
    './vday15.jpg',
    './vday19.jpg',
    './vday17.jpg',
    './vday12.jpg',
    './vday50.jpg'
];

//console.log('script loaded!');
//alert('script loaded!');

const imageObjects = [];

// Load images and push them into the array
let imagesLoaded = 0;
imagePaths.forEach(path => {
    const img = new Image();
    img.src = path;
    img.onload = () => {
        imagesLoaded++;
        const imgWidth = img.width * 0.1; // Scale down the image width
        const imgHeight = img.height * 0.1; // Scale down the image height
        imageObjects.push({
            img: img,
            width: imgWidth,
            height: imgHeight,
            x: Math.random() * (canvas.width - 1.5 * imgWidth) + 0.5 * imgWidth, // Ensure x position is within canvas width
            y: canvas.height * (1.5 / 3) + Math.random() * (canvas.height / 4 - imgHeight), // Bottom third of the screen
            speed: Math.random() * 0.8
        });
        console.log(`Image loaded: ${path}, width: ${img.width}, height: ${img.height}`);
    };
    img.onerror = () => {
        console.error(`Failed to load image: ${path}`);
    };
});

startButton.addEventListener("click", () => {
    canvas.style.display = "block"; // Show the canvas
    audio.play(); // Play the background music
    startButton.style.display = "none"; // Hide the start button

    // Change the background color briefly
    ctx.fillStyle = tempBackgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Comment out opening for testing
    draw_opening();

    // Pause before starting the animation and changing the background color back
    setTimeout(() => {
        lastTimestamp = performance.now();
        animate(); // Start the animation after a delay
    }, 6040); // 6040 milliseconds = 6.04 seconds
});

// Create random hearts
for (let i = 0; i < 50; i++) {
    hearts.push({
        x: Math.random() * canvas.width * 0.8 + 0.1 * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 30 + 10,
        speed: Math.random() * 0.5,
        color: `hsl(${Math.random() * 360}, 80%, 60%)`
    });
}

function draw_opening() {
    ctx.fillStyle = "white";
    ctx.font = "48px serif";
    ctx.fillText("Once Upon A Time", canvas.width * 0.1, canvas.height * 0.1);
}

let currentImageIndex = 0;
let imagesShown = 0;
const secondsPerImage = 2; // Adjust this value to control the duration each image is shown (in seconds)
const maxImagesBeforePause = 10; // Adjust this value as needed
const maxImagesBeforeEnd = 20; // Adjust this value as needed
let isPaused = false;
let lastTimestamp = 0;

function animate(timestamp) {
    if (isPaused) return;

    const elapsed = timestamp - lastTimestamp;
    if (elapsed < secondsPerImage * 1000) {
        requestAnimationFrame(animate);
        return;
    }

    lastTimestamp = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the current image
    const image = imageObjects[currentImageIndex];
    ctx.drawImage(image.img, image.x, image.y, image.width, image.height);
    image.y -= image.speed; // Move images upward
    if (image.y < -image.height) {
        image.y = canvas.height; // Reset position
        image.x = Math.random() * (canvas.width - image.width); // Reset x position to a new random value
    }

    // Draw hearts
    hearts.forEach((heart) => {
        ctx.fillStyle = heart.color;
        ctx.beginPath();
        ctx.arc(heart.x, heart.y, heart.size, 0, Math.PI * 2);
        ctx.fill();
        heart.y -= heart.speed;
        if (heart.y < -heart.size) {
            heart.y = canvas.height + heart.size;
            heart.x = Math.random() * canvas.width;
        }
    });

    currentImageIndex = (currentImageIndex + 1) % imageObjects.length;
    imagesShown++;
    console.log(`Image shown: ${imagesShown}, Current index: ${currentImageIndex}`);

    if (imagesShown === maxImagesBeforePause) {
        isPaused = true;
        console.log('Pausing for black screen with text');
        setTimeout(() => {
            showBlackScreenWithText();
        }, 1000); // Pause for 1 second before showing the black screen
    } else if (imagesShown >= maxImagesBeforeEnd) {
        isPaused = true;
        console.log('Pausing for second black screen with text');
        setTimeout(() => {
            showBlackScreenWithText2();
        }, 1000); // Pause for 1 second before showing the second black screen
    } else {
        requestAnimationFrame(animate);
    }
}

function showBlackScreenWithText() {
    ctx.fillStyle = tempBackgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "48px serif";
    ctx.fillText("Some text here", canvas.width / 2, canvas.height / 2);

    setTimeout(() => {
        isPaused = false;
        imagesShown = 0; // Reset imagesShown to continue the animation
        console.log('Resuming animation after black screen with text');
        lastTimestamp = performance.now();
        requestAnimationFrame(animate);
    }, 1000); // Adjust this value to control the duration of the black screen
}

function showBlackScreenWithText2() {
    ctx.fillStyle = tempBackgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "48px serif";
    ctx.fillText("Some other text here", canvas.width / 2, canvas.height / 2);

    setTimeout(() => {
        isPaused = false;
        imagesShown = 0; // Reset imagesShown to continue the animation
        console.log('Resuming animation after second black screen with text');
        lastTimestamp = performance.now();
        requestAnimationFrame(animate);
    }, 1000); // Adjust this value to control the duration of the black screen
}

console.log(`Total images to load: ${imagePaths.length}`);