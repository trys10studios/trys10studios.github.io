document.addEventListener("DOMContentLoaded", function () {
    const nameID = document.getElementById('name');
    const sparkContainer = document.getElementById('spark-container');

    let isAnimating = false; // Make sure animation is finished before starting another

    const sound = new Audio('./sounds/firework.wav'); // Load the sound effect

    nameID.addEventListener('mouseenter', () => {
        if (isAnimating) return;

        isAnimating = true;
        
        // Play sound on hover
        sound.play();
        sound.volume = 0.5; // Sets volume to 50%

        const rect = nameID.getBoundingClientRect();
        const originX = rect.left + rect.width / 2;
        const originY = rect.top + rect.height / 2 + window.scrollY;

        let sparksRemaining = 200;

        for (let i = 0; i < sparksRemaining; i++) {
            const spark = document.createElement('div');
            spark.className = 'spark';
            sparkContainer.appendChild(spark);

            let x = originX;
            let y = originY;
            let vx = (Math.random() - 0.5) * 20;
            let vy = -(Math.random() * 10 + 2);
            const gravity = 0.2;
            let opacity = 1;

            function animate() {
                x += vx;
                vy += gravity;
                y += vy;
                opacity -= 0.005;

                spark.style.left = `${x}px`;
                spark.style.top = `${y}px`;
                spark.style.opacity = opacity;

                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    spark.remove();
                    sparksRemaining--;

                    // Check if all sparks have finished animating
                    if (sparksRemaining === 0) {
                        
                        isAnimating = false;                      
                    }
                }
            }
            spark.style.left = `${x}px`;
            spark.style.top = `${y}px`;
            requestAnimationFrame(animate);
        }
    });
});
