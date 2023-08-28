import * as THREE from 'three';
import { ParticleGeometry } from 'three-particle-geometry';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
const controls = new OrbitControls(camera, renderer.domElement);

const light1 = new THREE.PointLight(0xFFFFFF, 100, 1000);
const light2 = new THREE.PointLight(0xFFFFFF, 100, 1000);
light1.position.set(0, 4, 5);
light2.position.set(5, 4, 0);
scene.add(light1);
scene.add(light2);

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const sphereGeometry = new THREE.SphereGeometry(0.5);

const particleMaterial1 = new THREE.MeshPhongMaterial({
    color: "orange",
});
const particleMaterial2 = new THREE.MeshPhongMaterial({
    color: "yellow",
});
const particleGeometry1 = new THREE.SphereGeometry(0.005);
const particleGeometry2 = new THREE.BoxGeometry(0.005, 0.005, 0.005);

const particles1 = new ParticleGeometry(boxGeometry, particleGeometry1, particleMaterial1, { numParticles: 20000 });
console.log(particles1)
scene.add(particles1);

const particles2 = new ParticleGeometry(sphereGeometry, particleGeometry2, particleMaterial2, { numParticles: 20000 });
particles2.position.x = 1.5;
scene.add(particles2);

// Adding a floor below the particle geometry
const floorGeometry = new THREE.PlaneGeometry(100, 100);
const floorMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
floorMesh.rotation.x = -Math.PI / 2;
floorMesh.position.y = -1;
scene.add(floorMesh);

camera.position.z = 2;
scene.add(camera);
controls.update();

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    const newAspectRatio = window.innerWidth / window.innerHeight;
    camera.aspect = newAspectRatio;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
