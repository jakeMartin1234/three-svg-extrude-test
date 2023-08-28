import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { svgToExtrudedGeometry } from 'three-svg-extrude';

// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lights in
const light1 = new THREE.PointLight('#FFFFFF', 100)
light1.position.set(-1, 10, 3);
scene.add(light1);

const light2 = new THREE.PointLight('#FFFFFF', 100)
light2.position.set(5, 10, 3);
scene.add(light2);

// Adding a floor below the particle geometry
const floorGeometry = new THREE.PlaneGeometry(1000, 1000);
const floorMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
floorMesh.rotation.x = -Math.PI / 2;
floorMesh.position.y = -7;
scene.add(floorMesh);

// Orbit controls for camera manipulation
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();


// Function to load and extrude the SVG
async function loadAndExtrudeSVG() {
    try {
        const bananaScale = 0.01;
        const geometry = await svgToExtrudedGeometry('bananaSVG.svg', 1, bananaScale); // Assuming svgToThree returns a promise

        const material = new THREE.MeshPhongMaterial({ color: 'yellow' });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.z += Math.PI / 2
        mesh.position.y -= 6;
        mesh.position.x += 3

        scene.add(mesh);

        // Adjust the camera position and render the scene
        camera.position.z = 10;
        animate();
    } catch (error) {
        console.error("Error extruding SVG:", error);
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Start the process
loadAndExtrudeSVG();

// Handle window resize
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    renderer.setSize(newWidth, newHeight);
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
});

