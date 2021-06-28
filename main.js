import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

/** We need 3 object
 *      1)A very cool and detailed scene;
 *      2)A godly positioned camera;
 *      3)A fast and furious renderer;
 * **/

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);

// DRAW, here the magic happens
renderer.render(scene, camera);

// Objects:
const geometry = new THREE.BoxGeometry(2,2, 2, 4, 4, 4);
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// Adding light

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(-20, 10, 25);

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.position.set(25, 25, 25);

scene.add(pointLight, ambientLight);

// Recursive function
function animate(){
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();
