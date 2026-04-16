import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ViewportGizmo } from "three-viewport-gizmo";
import { stateScene } from './context';

let scene;
let camera;
let renderer;
let gizmo;
let orbitControls;
let marker;
let ph_holder;

export function createBox(color=0xffffff){
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const wireframe = new THREE.WireframeGeometry( geometry );
  const edges = new THREE.EdgesGeometry(geometry);
  // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  // const cube = new THREE.Mesh(geometry, material);
  // const cube = new THREE.Mesh(wireframe, material);
  const lineMaterial = new THREE.LineBasicMaterial({ color: color });
  // const cubeLine = new THREE.LineSegments(wireframe, lineMaterial);
  const cubeLine = new THREE.LineSegments(edges, lineMaterial);
  cubeLine.matrixAutoUpdate = false; // disable to use matrix
  const axesHelper = new THREE.AxesHelper( 1 ); // '5' is the line size
  cubeLine.add( axesHelper );
  // console.log(cubeLine);
  return cubeLine;
}

export function setup_three(){
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  camera.position.z = 5;
  gizmo = new ViewportGizmo(camera, renderer,{
    placement: 'bottom-left',
    // offset: { left: 10, bottom: 10 } // fine-tune distance from edges
  });
  orbitControls = new OrbitControls( camera, renderer.domElement );
  gizmo.attachControls(orbitControls);
  const size = 10;
  const divisions = 10;
  const gridHelper = new THREE.GridHelper( size, divisions );
  scene.add( gridHelper );

  const geometry = new THREE.OctahedronGeometry(0.4);
  const edges = new THREE.EdgesGeometry(geometry);
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
  marker = new THREE.LineSegments(edges, lineMaterial);
  scene.add(marker)

  window.addEventListener('resize',onResize);

  // Start the loop
  renderer.setAnimationLoop(animate);

  ph_holder = createBox(0xebe534)
  scene.add(ph_holder)
  stateScene.val = scene;
}

function onResize(){
  // 1. Update sizes based on the new window dimensions
  const width = window.innerWidth;
  const height = window.innerHeight;

  // 2. Update camera aspect ratio to prevent stretching
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  // 3. Update renderer size
  renderer.setSize(width, height);
  
  // 4. Update pixel ratio for high-DPI screens (optional but recommended)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  gizmo.update();
}

function animate() {
  if(orbitControls){
    orbitControls.update();
  }
  // update_select_marker();
  // const scene = stateScene.val;
  // renderer.render(scene, camera);
  renderer.render(scene, camera);
  gizmo.render();
  requestAnimationFrame(animate);
}

