declare var require: any

import * as React from 'react';
var ReactDOM = require('react-dom');
import ServerListener from './ServerListener';


import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
const material = new THREE.MeshBasicMaterial({ color: 0xDDDDDD });
const justBlue = new THREE.MeshBasicMaterial({ color: 0x5555FF });
var rocket;
const renderer = new THREE.WebGLRenderer();

function init() {
    camera.position.z = 175;
    camera.position.y = 50;
    camera.rotation.x = -0.5;
    onWindowResize();
    document.body.appendChild(renderer.domElement);



    const cubeGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(152.5, 1.2, 274);
    const tabbleBlock: THREE.Mesh = new THREE.Mesh(cubeGeometry, justBlue);
    scene.add(tabbleBlock);

    loader.load('ClientSide/Host/models/rocket/scene.gltf', function (gltf) {

        rocket = gltf.scene;
        rocket.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = material;
            }
        });
        rocket.position.z = 130;
        rocket.position.y = 25;
        //rocket.position.x = 35;
        rocket.rotation.y = 1.5;
        rocket.scale.set(1.5, 1.5, 1.5);
        scene.add(rocket);
        console.log(rocket);


    }, undefined, function (error) {

        console.error(error);

    });

}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function physic(){

}

function animate() {
    requestAnimationFrame(animate);
    physic();
    renderer.render(scene, camera);
}

export function Host(props) {
    ServerListener.ws.onmessage = (message) => {
        let q;
        try { q = JSON.parse(message.data); } catch (e) { console.log(message.data) }
        switch (q.type) {
            case 'rotation':
                rocket.rotation.x = q.data.x * Math.PI / 180;
                rocket.rotation.y = q.data.y * Math.PI / 180 + 1.5;
                rocket.rotation.z = q.data.z * Math.PI / 180;
                break;
            case 'position':
                rocket.position.x += q.data.x /100;
                rocket.position.y += q.data.y /100;
                rocket.position.z += q.data.z /100;
                break;
            default:
                console.error("Левый кипишь...");
                break;
        }
    }
    init();
    animate();
    window.addEventListener('resize', (e) => onWindowResize);
    return (
        <div>
            <h1>Host</h1>
        </div>
    );
}