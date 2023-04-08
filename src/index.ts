import { defaultCube, renderer, scene, camera } from './utils/base';

// Code goes here

/** Example render function */
function oscillateDefaultCube() {
  const date = new Date().getTime() / 1000;
  const strength = 5;
  const osci = strength * Math.sin(date * 2);
  defaultCube.position.x = osci;
  defaultCube.rotateX(osci * 0.01);
  defaultCube.rotateY(osci * 0.005);
  defaultCube.rotateZ(osci * 0.001);
}

function render() {
  oscillateDefaultCube(); // delete me if I'm Blender's default cube
  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

animate();