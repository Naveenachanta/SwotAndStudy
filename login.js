function createEmojiTexture(emoji) {
    const canvas = document.createElement('canvas'); // Create a canvas
    canvas.width = 64; // Set canvas dimensions
    canvas.height = 64;
    const context = canvas.getContext('2d'); // Get canvas context

    context.font = '48px Arial'; // Font size for the emoji
    context.textAlign = 'center'; // Align text to center
    context.textBaseline = 'middle'; // Align text to middle

    // Draw the emoji in the center of the canvas
    context.fillText(emoji, canvas.width / 2, canvas.height / 2);

    return new THREE.CanvasTexture(canvas); // Create a texture from the canvas
}
function createEmojiObject(emoji) {
    const geometry = new THREE.PlaneGeometry(1, 1); // Flat object (like a card)
    const texture = createEmojiTexture(emoji); // Create texture from emoji
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true }); // Apply texture
    const obj = new THREE.Mesh(geometry, material); // Create mesh with geometry and texture

    return obj; // Return the emoji object
}
document.addEventListener('DOMContentLoaded', function() {
    const scene = new THREE.Scene(); // Create the scene
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // Create the camera
    const renderer = new THREE.WebGLRenderer(); // Create the WebGL renderer
    renderer.setSize(window.innerWidth, window.innerHeight); // Set renderer size
    document.getElementById('three-container').appendChild(renderer.domElement); // Attach renderer to container

    const emojis = ['😃', '💻', '🏋️‍♂️', '🧘‍♀️']; // List of emojis (human, computer, gym, yoga)
    const objects = []; // Store all emoji objects
    const gravity = -0.02; // Slow gravity for falling effect
    const floor = -10; // Point where objects disappear

    // Function to create a new emoji object
    function createEmoji() {
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]; // Randomly select an emoji
        const obj = createEmojiObject(randomEmoji); // Create object with emoji texture

        obj.position.y = 10; // Start at the top
        obj.position.x = (Math.random() - 0.5) * 10; // Random x-position
        obj.velocity = { x: 0, y: -0.05 }; // Downward velocity

        scene.add(obj); // Add to the scene
        objects.push(obj); // Store the object
    }

    // Create initial emojis
    for (let i = 0; i < 10; i++) {
        createEmoji(); // Create initial set of emojis
    }

    // Animation loop to animate emojis
    function animate() {
        requestAnimationFrame(animate); // Continuous animation loop

        objects.forEach((obj, index) => {
            obj.position.y += obj.velocity.y; // Apply downward movement
            obj.velocity.y += gravity; // Apply gravity

            if (obj.position.y < floor) { // Check if object reaches the floor
                scene.remove(obj); // Remove from the scene
                objects.splice(index, 1); // Remove from the array
                createEmoji(); // Create a new emoji to replace it
            }
        });

        renderer.render(scene, camera); // Render the scene
    }

    animate(); // Start the animation loop
});
