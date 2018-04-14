/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ({

/***/ 19:
/***/ (function(module, exports) {

/*import { $ } from './extjs';
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

requestAnimationFrame(render);*/


/***/ })

/******/ });