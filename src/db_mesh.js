//-----------------------------------------------
// 
//-----------------------------------------------
import * as THREE from 'three';
import { DbConnection, tables } from './module_bindings';
import { 
  connState, 
  dbMeshes, 
  stateScene,
  dbMeshVertices,
  dbMeshIndices,
} from "./context";
//-----------------------------------------------
// 
//-----------------------------------------------
function create_sample_mesh(row){
  const entityId = row.entityId;
  if(!entityId) return;
   // 1. Collect vertices in correct order by index
  const vertexList = Array.from(dbMeshVertices.val.values())
    .filter(v => v.entityId === entityId)
    .sort((a, b) => a.index - b.index);

  // 2. Collect triangles in order
  const triangleList = Array.from(dbMeshIndices.val.values())
    .filter(t => t.entityId === entityId)
    .sort((a, b) => a.triangleIndex - b.triangleIndex);

  if (vertexList.length === 0) {
    console.warn(`No vertices found for mesh ${entityId}`);
    return null;
  }

  // 3. Build flat positions array
  const positions = new Float32Array(vertexList.length * 3);
  vertexList.forEach((v, i) => {
    const base = i * 3;
    positions[base]     = v.position.x;
    positions[base + 1] = v.position.y;
    positions[base + 2] = v.position.z;
  });

  // 4. Build indices array (flattened: i0, i1, i2, i0, i1, i2, ...)
  const indices = new Uint16Array(triangleList.length * 3); // Uint32Array if > 65k verts
  triangleList.forEach((tri, i) => {
    const base = i * 3;
    indices[base]     = tri.i0;
    indices[base + 1] = tri.i1;
    indices[base + 2] = tri.i2;
  });

  // 5. Create Three.js BufferGeometry
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));   // or just geometry.setIndex(indices)

  // Optional but recommended:
  geometry.computeVertexNormals();   // for proper lighting
  // geometry.computeBoundingSphere();
  // geometry.computeBoundingBox();

  // 6. Create material (customize as needed)
  const material = new THREE.MeshPhongMaterial({
    // color: 0x00aaff,
    color: 0x32a852,
    shininess: 30,
    side: THREE.DoubleSide,     // or THREE.FrontSide
    // wireframe: true,         // uncomment for debugging
  });

  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x32a852 });

  // 7. Create the final Mesh
  // const mesh = new THREE.Mesh(geometry, material);
  const mesh = new THREE.Mesh(geometry, lineMaterial);
  mesh.name = row.name || `Mesh_${entityId}`;
  mesh.userData.entityId = entityId;   // useful for tracking
  mesh.userData.row = row;   // useful for tracking
  const scene = stateScene.val;
  scene.add(mesh);
  // console.log(scene);;
  // Store it
  // if (!PARAMS.readyMeshes) PARAMS.readyMeshes = new Map();
  // PARAMS.readyMeshes.set(entityId, mesh);

  // console.log(`✅ Three.js Mesh created: ${mesh.name} | ${vertexList.length} vertices, ${triangleList.length} triangles`);
}

function addOrUpdateMesh(row){
  if (!row || !row.entityId) return;
  const currentMap = dbMeshes.val;        // get current
  const newMap = new Map(currentMap);     // create copy
  newMap.set(row.entityId, row);
  dbMeshes.val = newMap;                  // assign new Map → triggers update
}
function deleteMesh(id) {
  if (!id) return;
  // Create new Map without the item
  const newMap = new Map(dbMeshes.val);
  newMap.delete(id);
  // Update the state (this is what makes VanJS detect the change)
  dbMeshes.val = newMap;
}
function onInsert_Mesh(_ctx, row){
  // console.log("mesh:", row);
  addOrUpdateMesh(row)
  create_sample_mesh(row);
}
function onUpdate_Mesh(_ctx, oldRow, newRow){
  // console.log("transform3d:", newRow);
  addOrUpdateMesh(newRow)
}
function onDelete_Mesh(ctx, row){
  const scene = stateScene.val;
  for(const mesh of scene.children){
    if(mesh.userData?.row?.entityId == row.entityId){
      scene.remove(mesh);
    }
  }
  deleteMesh(row.entityId);
}
function setupDBMeshes(){
  const conn = connState.val;
  conn.subscriptionBuilder()
    .subscribe(tables.meshes)
  conn.db.meshes.onInsert(onInsert_Mesh)
  conn.db.meshes.onUpdate(onUpdate_Mesh)
  conn.db.meshes.onDelete(onDelete_Mesh)
}
//-----------------------------------------------
// 
//-----------------------------------------------

function addOrUpdateMeshVertices(row){
  if (!row || !row.id) return;
  const currentMap = dbMeshVertices.val;        // get current
  const newMap = new Map(currentMap);           // create copy
  newMap.set(row.id, row);
  dbMeshVertices.val = newMap;                  // assign new Map → triggers update
}
function deleteMeshVertices(id) {
  if (!id) return;
  // Create new Map without the item
  const newMap = new Map(dbMeshVertices.val);
  newMap.delete(id);
  // Update the state (this is what makes VanJS detect the change)
  dbMeshVertices.val = newMap;
}

function onInsert_MeshVertices(_ctx, row){
  // console.log("meshVertices:", row);
  addOrUpdateMeshVertices(row);
}
function onUpdate_MeshVertices(_ctx, oldRow, newRow){
  // console.log("transform3d:", newRow);
  addOrUpdateMeshVertices(newRow);
}
function onDelete_MeshVertices(ctx, row){
  const scene = stateScene.val;
  for(const mesh of scene.children){
    if(mesh.userData?.row?.id == row.id){
      scene.remove(mesh);
    }
  }
  deleteMeshVertices(row.id);
}
function setupDBMeshVertices(){
  const conn = connState.val;
  conn.subscriptionBuilder()
    .subscribe(tables.meshVertices)
  conn.db.meshVertices.onInsert(onInsert_MeshVertices)
  conn.db.meshVertices.onUpdate(onUpdate_MeshVertices)
  conn.db.meshVertices.onDelete(onDelete_MeshVertices)
}
//-----------------------------------------------
// 
//-----------------------------------------------
function addOrUpdateMeshIndices(row){
  if (!row || !row.id) return;
  const currentMap = dbMeshIndices.val;        // get current
  const newMap = new Map(currentMap);           // create copy
  newMap.set(row.id, row);
  dbMeshIndices.val = newMap;                  // assign new Map → triggers update
}
function deleteMeshIndices(id) {
  if (!id) return;
  // Create new Map without the item
  const newMap = new Map(dbMeshIndices.val);
  newMap.delete(id);
  // Update the state (this is what makes VanJS detect the change)
  dbMeshIndices.val = newMap;
}

function onInsert_MeshIndices(_ctx, row){
  // console.log("meshIndices:", row);
  addOrUpdateMeshIndices(row);
}
function onUpdate_MeshIndices(_ctx, oldRow, newRow){
  // console.log("transform3d:", newRow);
  addOrUpdateMeshIndices(newRow);
}
function onDelete_MeshIndices(ctx, row){
  const scene = stateScene.val;
  for(const mesh of scene.children){
    if(mesh.userData?.row?.id == row.id){
      scene.remove(mesh);
    }
  }
  deleteMeshIndices(row.id);
}
function setupDBMeshIndices(){
  const conn = connState.val;
  conn.subscriptionBuilder()
    .subscribe(tables.meshIndices)
  conn.db.meshIndices.onInsert(onInsert_MeshIndices)
  conn.db.meshIndices.onUpdate(onUpdate_MeshIndices)
  conn.db.meshIndices.onDelete(onDelete_MeshIndices)
}

export function setupMesh(){
  setupDBMeshIndices();
  setupDBMeshVertices();
  setupDBMeshes();
}