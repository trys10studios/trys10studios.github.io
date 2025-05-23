document.addEventListener("DOMContentLoaded", function () {
    const welcome = document.getElementById('welcome');
    const sparkContainer = document.getElementById('spark-container');
    const elements = document.querySelectorAll('.card'); // Selects all elements with card class
    const name = document.getElementById('name'); // My name at top of page
    const links = document.querySelectorAll('.link'); // Links to external sites
    const h3elements = document.querySelectorAll('h2'); // Selects all <h2> elements

    let isAnimating = false; // Make sure animation is finished before starting another

    const fireworkSound = new Audio('./sounds/firework.wav'); // Load the firework sound effect
    const nameSound = new Audio('./sounds/hoverSound.wav'); // Sound for hovering over my name
    const h3Sound1 = new Audio('./sounds/onEnter.wav');
    const h3Sound2 = new Audio('./sounds/onExit.wav');

    let isNamePlaying = false; // Is name sound playing
    let h3Sound1IsPlaying = false;
    let h3Sound2IsPlaying = false;

    h3elements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if(h3Sound1IsPlaying) {return;}
            h3Sound1IsPlaying = true;
            h3Sound1.currentTime = 0; // Reset audio to beginning of clip
            h3Sound1.volume = 0.2
            h3Sound1.play();
            // Reset the isPlaying flag after the sound finishes
            setTimeout(() => {
                h3Sound1IsPlaying = false;
            }, 500); // Adjust this duration based on sound length
        });

        element.addEventListener('mouseleave', () => {
            if(h3Sound2IsPlaying) {return;}
            h3Sound2IsPlaying = true;
            h3Sound2.currentTime = 0; // Reset audio to beginning of clip
            h3Sound2.volume = 0.1
            h3Sound2.play();
            // Reset the isPlaying flag after the sound finishes
            setTimeout(() => {
                h3Sound2IsPlaying = false;
            }, 500); // Adjust this duration based on sound length
        });
    });

    // Find all h3 elements and loop through them to set audio
    links.forEach(link => {
        const linkSound = new Audio('./sounds/selectSound.wav');
        let isLinkPlaying = false;
        link.addEventListener('mouseenter', () => {
            if(isLinkPlaying) {return;}
            isLinkPlaying = true;
            linkSound.volume = 0.1;
            linkSound.currentTime = 0; // Reset audio to beginning of clip
            linkSound.play();

        // Reset the isPlaying flag after the sound finishes
        setTimeout(() => {
            isLinkPlaying = false;
        }, 300); // Adjust this duration based on sound length
    });
});
    name.addEventListener('mouseenter', () => {
        if(isNamePlaying) {return;}
        isNamePlaying = true;
        nameSound.currentTime = 0; // Reset audio to beginning of clip
        nameSound.play();

        // Reset the isPlaying flag after the sound finishes
        setTimeout(() => {
            isNamePlaying = false;
        }, 300); // Adjust this duration based on sound length
    });

    // Find all h3 elements and loop through them to set audio
    elements.forEach(element => {
        const soundHover = new Audio('./sounds/hoverSound.wav');
        let isHoverSoundPlaying = false;

        element.addEventListener('mouseenter', () => {
            if(isHoverSoundPlaying) {return;}
            isHoverSoundPlaying = true;
            soundHover.currentTime = 0; // Reset audio to beginning of clip
            soundHover.play();

          // Reset the isPlaying flag after the sound finishes
          setTimeout(() => {
            isHoverSoundPlaying = false;
        }, 300); // Adjust this duration based on sound length
    });
});

    welcome.addEventListener('mouseenter', () => {
        if (isAnimating) return;
        isAnimating = true;

        fireworkSound.currentTime = 0; // Reset audio to beginning of clip

        // Delay the explosion effect
        setTimeout(() => {
        // Play sound on hover
        fireworkSound.play();
        
        const welcomeRect = welcome.getBoundingClientRect();
        const containerRect = sparkContainer.getBoundingClientRect();
        
        // Get position of #welcome center relative to sparkContainer
        const originX = welcomeRect.left + welcomeRect.width / 2 - containerRect.left;
        const originY = welcomeRect.top + welcomeRect.height / 2 - containerRect.top;

        let sparksRemaining = 100;

        for (let i = 0; i < sparksRemaining; i++) {
            // Create the spark wrapper and spark element
            const sparkWrapper = document.createElement('div');
            sparkWrapper.className = 'spark-wrapper';
            
            const spark = document.createElement('div');
            spark.className = 'spark';
            sparkWrapper.appendChild(spark); // Add the spark to the wrapper
            sparkContainer.appendChild(sparkWrapper); // Add wrapper to the container

            let x = originX;
            let y = originY;
            let vx = (Math.random() - 0.5) * 20;
            let vy = -(Math.random() * 10 + 2);
            const gravity = 0.2;
            let opacity = 1;

            // Set initial position and rotation of the wrapper
            sparkWrapper.style.left = `${x}px`;
            sparkWrapper.style.top = `${y}px`;

            // Set initial position for the spark
            spark.style.left = `${x}px`;
            spark.style.top = `${y}px`;

            let sparkRotation = (Math.random() * 5); 
            let widthHeight = 5;

            // Animation loop
            function animate() {
                x += vx;
                vy += gravity;
                y += vy;
                opacity -= 0.005;

                spark.style.width = `${widthHeight}px`;
                spark.style.height = `${widthHeight}px`;
                widthHeight -= .05;

                spark.style.background = getAlternatingColor();                

                // Update position and rotation of the wrapper
                sparkWrapper.style.left = `${x}px`;
                sparkWrapper.style.top = `${y}px`;
                sparkWrapper.style.transform = `rotate(${sparkRotation}deg)`; // Apply rotation to wrapper

                // Update position and opacity of the spark
                spark.style.left = `${x}px`;
                spark.style.top = `${y}px`;
                spark.style.opacity = opacity;

                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    spark.remove(); // Remove spark when it fades out
                    sparkWrapper.remove(); // Remove the wrapper when the spark is done

                    sparksRemaining--; // Decrease remaining sparks

                    // Check if all sparks have finished animating
                    if (sparksRemaining === 0) {
                        isAnimating = false;
                    }
                }
            }          
            // Start the animation            
            requestAnimationFrame(animate);
        }
    }, 500); // Delay before explosion
});
});

let colorToggle = true; // This will toggle between true and false for red and white

// Function to generate alternating red and white colors
function getAlternatingColor() {
    colorToggle = !colorToggle; // Toggle the color
    return colorToggle ? 'red' : 'white'; // Return red if true, white if false
}
