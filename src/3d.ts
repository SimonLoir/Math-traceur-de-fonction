import { $ } from './extjs';
import * as THREE from 'three';

let r = new THREE.WebGLRenderer({
    canvas: document.querySelector('canvas'),
    antialias: true
});

r.setClearColor(0x7f7f7f);
r.setPixelRatio(window.devicePixelRatio);
r.setSize(window.innerWidth, window.innerHeight);

let cam = new THREE.PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    1,
    3000
);

let scene = new THREE.Scene();

let light = new THREE.AmbientLight(0xffffff, 0.5);

let light1 = new THREE.PointLight(0xffffff, 0.5);

scene.add(light);
scene.add(light1);

let xline = new THREE.CubeGeometry(1000, 1, 1);
let yline = new THREE.CubeGeometry(1, 1, 1000);
let one_one_one = new THREE.SphereGeometry(500);

let mat = new THREE.MeshLambertMaterial({ color: 0xf3ffe2 });

let ooo = new THREE.Mesh(one_one_one, mat);
let xAxis = new THREE.Mesh(xline, mat);
let yAxis = new THREE.Mesh(xline, mat);

xAxis.position.set(0, 0, -1000);
yAxis.position.set(0, 0, -1000);
ooo.position.set(0, 0, -1000);
yAxis.rotation.z = Math.PI / 2;
scene.add(xAxis);
scene.add(yAxis);

function render() {
    //cam.rotation.z += 0.01;
    cam.position.z += -0.1;
    r.render(scene, cam);
    requestAnimationFrame(render);
}

requestAnimationFrame(render);
