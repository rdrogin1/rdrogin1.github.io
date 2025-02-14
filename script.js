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
            x: Math.random() * (canvas.width - 1.5* imgWidth) +.5*imgWidth, // Ensure x position is within canvas width
            y: canvas.height * (1.5 / 3) + Math.random() * (canvas.height / 4 - imgHeight), // Bottom third of the screen
            speed: Math.random() * .8
        });
        console.log(`Image loaded: ${path}, width: ${img.width}, height: ${img.height}`);
    };
    img.onerror = () => {
        console.log(imagesLoaded);
        console.log('Failed load!');
        alert(`Failed to load image: ${path}`);
        alert(imagesLoaded);
    };
            //console.log('Button clicked!');
            //alert('Button clicked!');
            // All images are loaded, enable the start button
            startButton.addEventListener("click", () => {
                //console.log('Button clicked!');
                //alert('Button clicked!');
                // Add your additional functionality here
                canvas.style.display = 'block'; 
                startButton.style.display = "none"; // Hide the button
                canvas.style.display = "block"; // Show the canvas
                audio.play(); // Play the background music

                // Change the background color briefly
                ctx.fillStyle = tempBackgroundColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                //comment out opening for testing
                draw_opening() 

                // Pause before starting the animation and changing the background color back
                setTimeout(() => {
                    animate(); // Start the animation after a delay
                }, 6200); // 1040 milliseconds = 1.04 seconds, i like 6040 for the time
            });
        
   
});

// Create random hearts
for (let i = 0; i < 50; i++) {
    hearts.push({
        x: Math.random() * canvas.width * 0.8 + 0.1 * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 30 + 10,
        speed: Math.random() * 0.5 + 1,
        color: `hsl(${Math.random() * 360}, 80%, 60%)`
    });
}


function draw_opening() {
    ctx.fillStyle = "white";
    //ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.font = "48px serif";
    ctx.fillText("Once Upon A Time", canvas.width*.1, canvas.height *.1);

    setTimeout(()=> {
        ctx.fillText("At UC Berkeley", canvas.width * .3, canvas.height * .8);
    }, 2500);

    setTimeout(()=> {
        ctx.fillText("Reuben met Maité", canvas.width*.5, canvas.height*.5);
    }, 5000);


}

// function draw_interlude() {
//     ctx.fillStyle = "black";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     ctx.fillStyle = "white";
//     //ctx.fillRect(0,0,canvas.width, canvas.height);
//     ctx.font = "48px serif";

//     setTimeout(()=> { 
//         ctx.fillText("And Love Grew...", 300, 500);
//     }, 2000);

//     ctx.fillStyle = backgroundColor;
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
// }

// Function to draw a heart
function drawHeart(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x + size / 2, y - size, x + size, y + size / 3, x, y + size);
    ctx.bezierCurveTo(x - size, y + size / 3, x - size / 2, y - size, x, y);
    ctx.fill();
}

let currentImageIndex = 0;
let frameCounter = 0;
let imagesShown = 0;
let framesPerImage = 200; // Change image every 60 frames (1 second at 60fps)
const maxImagesBeforePause = 16;
const maxImagesBeforeEnd = 31;
let isPaused = false;

let animationRunning = false;

function animate() {
    if (isPaused || animationRunning) return;
    animationRunning = true;  // Prevent multiple animation loops

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    hearts.forEach(heart => {
        drawHeart(heart.x, heart.y, heart.size, heart.color);
        heart.y -= heart.speed;
        if (heart.y < -heart.size) heart.y = canvas.height;
    });

    for (let i = 0; i < 2; i++) {
        const image = imageObjects[(currentImageIndex + i) % imageObjects.length];
        ctx.drawImage(image.img, image.x, image.y, image.width, image.height);
        image.y -= image.speed;
        if (image.y < -image.height) {
            image.y = canvas.height;
            image.x = Math.random() * (canvas.width - image.width);
        }
    }

    frameCounter++;
    if (frameCounter >= framesPerImage) {
        frameCounter = 0;
        currentImageIndex = (currentImageIndex + 1) % imageObjects.length;
        imagesShown++;
    }

    if (imagesShown === maxImagesBeforePause || imagesShown === maxImagesBeforePause + 1) {
        isPaused = true;
        showBlackScreenWithText();
        // setTimeout(() => {
        //     showBlackScreenWithText();
        // }, 1000);
    } else if (imagesShown >= maxImagesBeforeEnd) {
        isPaused = true;
        setTimeout(() => {
            showBlackScreenWithText2();
        }, 1000);
    } else {
        requestAnimationFrame(() => {
            animationRunning = false;
            animate();
        });
    }
}

function showBlackScreenWithText() {
    isPaused = false;
    animationRunning = false;
    framesPerImage = 250
    frameCounter = 0;
    ctx.fillStyle = tempBackgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "48px serif";
    ctx.fillText("And Love Grew...", canvas.width / 3 , canvas.height / 2);
    setTimeout(() => {
        imagesShown = maxImagesBeforePause+2;
         // Reset the counter
         requestAnimationFrame(animate);
    }, 3000); // Show the black screen with text for 3 seconds
}


function showBlackScreenWithText2() {
    ctx.fillStyle = "#FF6F61";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.font = "48px cursive";
    ctx.fillText("Happy Valentines Day Mai", canvas.width / 4 , canvas.height / 3);

    setTimeout(()=> {
        ctx.fillText("Can't Wait For Many More", canvas.width / 4, canvas.height / 2.5);
    }, 4000);

    setTimeout(()=> {
        ctx.fillText("Love Reuben <3", canvas.width / 4 , canvas.height / 2 );
    }, 8000);
        
}
