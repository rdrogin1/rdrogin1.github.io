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
    './vday23.jpg', //her
    './vday26.JPG',//me
    './vday40.jpg', //her
    './vday27.jpg',//me
    './vday28.jpg',//me, nex we have early picsearly pics
    './vday34.JPG',
    './vday41.jpg', //pike couch
    './vday31.JPG',//tongues selfie
    './vday32.JPG',//leg selfie
    './vday3.JPG',//cute formal
    './vday33.JPG', //hawaian shirt selfie
    './vday30.JPG',//cute library
    './vday6.JPG',
    './vday11.JPG', // last pic before love grew transition
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
                }, 6040); // 1040 milliseconds = 1.04 seconds, i like 6040 for the time
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
const framesPerImage = 56; // Change image every 60 frames (1 second at 60fps)
let imagesShown = 0;
const maxImagesBeforePause = 13;
const maxImagesBeforeEnd = 31;
let isPaused = false;

// Animation loop
function animate() {
    if (isPaused) return;

    ctx.fillStyle = backgroundColor; // Use the background color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with the background color

    hearts.forEach(heart => {
        drawHeart(heart.x, heart.y, heart.size, heart.color);
        heart.y -= heart.speed; // Move hearts upward
        if (heart.y < -heart.size) heart.y = canvas.height; // Reset position
    });

    // Draw two images at a time
    for (let i = 0; i < 2; i++) {
        const image = imageObjects[(currentImageIndex + i) % imageObjects.length];
        ctx.drawImage(image.img, image.x, image.y, image.width, image.height);
        image.y -= image.speed; // Move images upward
        if (image.y < -image.height) {
            image.y = canvas.height; // Reset position
            image.x = Math.random() * (canvas.width - image.width); // Reset x position to a new random value
        }
    };
    //imagesShown ++; 
    frameCounter++;
    if (frameCounter >= framesPerImage) {
        frameCounter = 0;
        currentImageIndex = (currentImageIndex + 1) % imageObjects.length;
        imagesShown++;
    };

    if (imagesShown === maxImagesBeforePause || imagesShown == maxImagesBeforePause+1 ) {
        isPaused = true;
        setTimeout(() => {
            showBlackScreenWithText();
        }, 1000); // Pause for 1 second before showing the black screen
    } else if (imagesShown >= maxImagesBeforeEnd) {
        isPaused = true;
        setTimeout(() => {
            showBlackScreenWithText2();
        }, 1000); // Pause for 1 second before showing the second black screen
    } else {
        requestAnimationFrame(animate);
    };
}

function showBlackScreenWithText() {
    isPaused = false;
    frameCounter = 0;
    ctx.fillStyle = tempBackgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "48px serif";
    ctx.fillText("And Love Grew...", canvas.width / 2 + 100, canvas.height / 2);
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
    ctx.fillText("Happy Valentines Day Mai", canvas.width / 3 , canvas.height / 3);

    setTimeout(()=> {
        ctx.fillText("Can't Wait For Many More", canvas.width / 3, canvas.height / 2.5);
    }, 4000);

    setTimeout(()=> {
        ctx.fillText("Love Reuben <3", canvas.width / 3 , canvas.height / 2 );
    }, 8000);
        
}
