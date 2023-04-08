import { BoxGeometry, Mesh, MeshLambertMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import setupThreePointLighting from './setupThreePointLighting.js'; 

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const scene = new Scene;
scene.background = null;
const camera = new PerspectiveCamera(66, canvas.clientWidth / canvas.clientHeight, 0.1, 500);
camera.position.z = 7;
camera.position.y = 0;

const renderer = new WebGLRenderer({ canvas: canvas });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const isDirectional = false;
const [keyLight, fillLight, backLight] = setupThreePointLighting({ scene, cameraFar: 50, intensity: 7, isDirectional, });
scene.add(keyLight, fillLight, backLight);

const defaultCube = new Mesh(
  new BoxGeometry(3, 3, 3),
  new MeshLambertMaterial({ color: 0x00f090 })
);

scene.add(defaultCube);

function render() {
  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

export { scene, camera, renderer, defaultCube, render, animate };
