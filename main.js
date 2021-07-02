import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

/** We need 3 object
 *      1)A very cool and detailed scene;
 *      2)A godly positioned camera;
 *      3)A fast and furious renderer;
 * **/
// Scene and its options
const scene = new THREE.Scene();

// Camera and its options
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set( 0, 0, 10 );
camera.lookAt( 0, 0, 0 );

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);

// DRAW, here the magic happens
renderer.render(scene, camera);


// Objects:

const cube = new THREE.BoxGeometry(2,2, 2, 4, 4, 4);
const icosahedron = new THREE.IcosahedronGeometry(2.2,1);


// Function to make a passed geometry with set color and it's x position
function makeInstance(geometry, color, x, isWireframe) {

    const material = new THREE.MeshPhongMaterial({color, wireframe: isWireframe});

    const object = new THREE.Mesh(geometry, material);
    scene.add(object);

    object.position.x = x;

    return object;
}

const cubes = [
    makeInstance(cube, 0x44aa88,  0, false),
    makeInstance(cube, 0x8844aa, -4, false),
    makeInstance(cube, 0xaa8844,  4, false),
];
const icosahedrons = [
    makeInstance(icosahedron, 0x44aa88,  0, true),
    makeInstance(icosahedron, 0x8844aa, 4, true),
    makeInstance(icosahedron, 0xaa8844,  -4, true),
];

//Creating lines (not a mesh)
const lineMaterial = new THREE.LineDashedMaterial({color: 0xffffff });
const points = [];

//radius of a rotated square
let radius = 5;
let zPosition = 2;
points.push( new THREE.Vector3( - radius, 0, zPosition ) );
points.push( new THREE.Vector3( 0, radius, zPosition ) );
points.push( new THREE.Vector3( radius, 0, zPosition ) );
points.push( new THREE.Vector3( 0, - radius, zPosition ) );
points.push( new THREE.Vector3( - radius, 0, zPosition ) );


const lineGeometry = new THREE.BufferGeometry().setFromPoints( points );

const line = new THREE.Line( lineGeometry, lineMaterial );

scene.add( line );
renderer.render( scene, camera );


// Adding light

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(-20, 10, 25);

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.position.set(25, 25, 25);

scene.add(pointLight, ambientLight);

let pseudoTime = 2;
// Recursive function
function animate(time){
    requestAnimationFrame(animate);

    // manipulating with a time
    time *= 0.001;
    pseudoTime += 0.025;
    // PseudoTime is used for tangential movement of 3 cubes along the x axis and z axis. 9.7 is a point of full movement so we reactivate it from pseudoTime 2.
    if(pseudoTime > 9.7){
        pseudoTime = 2;
    }

    line.rotation.z = 2 * Math.sin( Math.pow(time, 2)/10);
    // 3 cubes: creation and manipulation
    cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * .1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
        cube.position.z = 5 * Math.sin(pseudoTime);
        // cube.position.x = -5 * Math.sin(time);
        cube.position.y = -5 * Math.tan(pseudoTime / 2) + pseudoTime - 6.5;

    });
    // 3 icosahedrons: creation and manipulation
    icosahedrons.forEach((icosahedron, ndx) => {
        const speed = 1 + ndx * .1;
        const rot = time * speed;
        icosahedron.rotation.x = rot;
        icosahedron.rotation.y = rot;
        icosahedron.position.z = 5 * Math.sin(pseudoTime);
        // icosahedron.position.x = -5 * Math.sin(time);
        icosahedron.position.y = -5 * Math.tan(pseudoTime / 2) + pseudoTime - 6.5;

    });
    renderer.render(scene, camera);
}
animate();
