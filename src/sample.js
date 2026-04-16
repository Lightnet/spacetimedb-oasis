//-----------------------------------------------
// index
//-----------------------------------------------
import { connState, networkStatus, stateScene, userIdentity } from './context';
import { DbConnection, tables } from './module_bindings';
// import * as moduleBindings  from './module_bindings';
// import { Pane } from 'https://cdn.jsdelivr.net/npm/tweakpane@4.0.5/dist/tweakpane.min.js';
import { Pane } from 'tweakpane';
import van from "vanjs-core";
import { Modal, MessageBoard } from "vanjs-ui";
// import { windowRegister } from './window_register';
// import { windowLogin } from './window_login';

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ViewportGizmo } from "three-viewport-gizmo";
import { setupDBEntity } from './db_entity';
import { setup_Pane } from './pane_tool';
import { createBox } from './three_scene';
import { setupDBTransform3D } from './db_transform3d';
import { setupMesh } from './db_mesh';

const { div, input, textarea, button, span, img, label, p, table, tr, td, tbody } = van.tags;

const HOST = 'ws://localhost:3000';
const DB_NAME = 'spacetimedb-oasis';
const TOKEN_KEY = `${HOST}/${DB_NAME}/auth_token`;

let scene;
let camera;
let renderer;
let gizmo;
let orbitControls;
let marker;
let ph_holder;

function setup_three(){
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




//-----------------------------------------------
//
//-----------------------------------------------
const conn = DbConnection.builder()
  .withUri(HOST)
  .withDatabaseName(DB_NAME)
  .withToken(localStorage.getItem(TOKEN_KEY) || undefined)
  .onConnect((conn, identity, token) => {
    localStorage.setItem(TOKEN_KEY, token);
    console.log('connnect');
    networkStatus.val = 'Connected';
    connState.val = conn;
    // console.log("identity: ", identity);
    console.log("identity: ", identity.toHexString());
    // console.log("conn: ", conn);
    userIdentity.val = identity;
    setup_three();
    initDB();
  })
  .onDisconnect(() => {
    console.log('Disconnected from SpacetimeDB');
    networkStatus.val = 'Disconnected';
  })
  .onConnectError((_ctx, error) => {
    console.error('Connection error:', error);
    networkStatus.val = 'Connection error';
    // statusEl.textContent = 'Error: ' + error.message;
    // statusEl.style.color = 'red';
  })
  .build();

function initDB(){
  setup_Pane();
  // setUpDBUser();
  setupDBEntity();
  setupDBTransform3D();
  // setupDBTransform2D();
  setupMesh();
}



















