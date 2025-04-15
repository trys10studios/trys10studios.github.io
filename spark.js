document.addEventListener("DOMContentLoaded", function () {
    const welcome = document.getElementById('welcome');
    const sparkContainer = document.getElementById('spark-container');

    let isAnimating = false; // Make sure animation is finished before starting another

    const sound = new Audio('./sounds/firework.wav'); // Load the sound effect

    welcome.addEventListener('mouseenter', () => {
        if (isAnimating) return;

        isAnimating = true;
        
        // Play sound on hover
        sound.play();

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
    });
});

let colorToggle = true; // This will toggle between true and false for red and white

// Function to generate alternating red and white colors
function getAlternatingColor() {
    colorToggle = !colorToggle; // Toggle the color
    return colorToggle ? 'red' : 'white'; // Return red if true, white if false
}
