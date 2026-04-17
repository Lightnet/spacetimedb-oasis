//-----------------------------------------------
// REDUCERS MESH
//-----------------------------------------------
import { t, SenderError } from 'spacetimedb/server';
import spacetimedb from '../module';
import { Vect3 } from '../types/types_transform3d';
//-----------------------------------------------
// Example: Create a simple triangle mesh
//-----------------------------------------------
export const create_simple_mesh = spacetimedb.reducer(
  {
    id: t.string(),
    meshName: t.string().optional(),
  },
  (ctx, { id, meshName }) => {

    const _entity = ctx.db.entity.id.find(id)
    if(!_entity) return;
    // if(_entity) {
    //   console.log("found");
    //   return;
    // }

    const _mesh = ctx.db.meshes.entityId.find(id)

    if(_mesh) {
      console.log("found _mesh");
      return;
    }


    // 1. Create the mesh
    ctx.db.meshes.insert({
      entityId:id,
      name: meshName ?? 'Simple Triangle',
    });

    // 2. Insert vertices (with sequential index)
    const v0_id = "vertex_" + id + "_0";
    const v1_id = "vertex_" + id + "_1";
    const v2_id = "vertex_" + id + "_2";

    ctx.db.meshVertices.insert({
      id: v0_id, entityId: id, index: 0, position: { x: -1, y: -1, z: 0 },
      uv: undefined,
      normal: undefined,
      color: undefined
    });
    ctx.db.meshVertices.insert({
      id: v1_id, entityId: id, index: 1, position: { x: 1, y: -1, z: 0 },
      uv: undefined,
      normal: undefined,
      color: undefined
    });
    ctx.db.meshVertices.insert({
      id: v2_id, entityId: id, index: 2, position: { x: 0, y: 1, z: 0 },
      uv: undefined,
      normal: undefined,
      color: undefined
    });

    // 3. Insert one triangle using vertex indices
    ctx.db.meshIndices.insert({
      id: "tri_" + id + "_0",
      entityId:id,
      triangleIndex: 0,
      i0: 0,   // points to vertex index 0
      i1: 1,   // points to vertex index 1
      i2: 2,   // points to vertex index 2
    });
  }
);

/*
// Example: a square made of two triangles
create_mesh({
  id: "my_custom_mesh_001",
  meshName: "My Square",
  vertices: [
    { x: -1, y: -1, z: 0 },   // 0
    { x:  1, y: -1, z: 0 },   // 1
    { x:  1, y:  1, z: 0 },   // 2
    { x: -1, y:  1, z: 0 },   // 3
  ],
  indices: [
    0, 1, 2,    // first triangle
    0, 2, 3     // second triangle
  ]
});
*/
//------------------------------------------------
// CREATE MESH WITH VERTICES AND INDICES
//------------------------------------------------
export const create_mesh = spacetimedb.reducer({
    id: t.string(),                    // Unique entity ID for this mesh
    meshName: t.string().optional(),   // Optional custom name
    vertices: t.array(Vect3),
    indices: t.array(t.u32()),      // Flat array of vertex indices (triples)
  },
  (ctx, { id, meshName, vertices, indices }) => {

    // 1. Check if entity exists
    const _entity = ctx.db.entity.id.find(id);
    if (!_entity) {
      console.log(`Entity with id ${id} not found`);
      return;
    }

    // 2. Check if mesh already exists
    const existingMesh = ctx.db.meshes.entityId.find(id);
    if (existingMesh) {
      console.log(`Mesh for entity ${id} already exists`);
      return;
    }

    // 3. Insert the mesh
    ctx.db.meshes.insert({
      entityId: id,
      name: meshName ?? `Mesh_${id}`,
    });

    // 4. Insert vertices with sequential indices
    vertices.forEach((vertex, index) => {
      const vertexId = `vertex_${id}_${index}`;

      ctx.db.meshVertices.insert({
        id: vertexId,
        entityId: id,
        index: index, // sequential index (0, 1, 2, ...)
        position: {
          x: vertex.x,
          y: vertex.y,
          z: vertex.z,
        },
        uv: undefined,
        normal: undefined,
        color: undefined
      });
    });

    // 5. Insert triangle indices (in groups of 3)
    for (let i = 0; i < indices.length; i += 3) {
      if (i + 2 >= indices.length) break; // safety check

      const triangleId = `tri_${id}_${i / 3}`;

      ctx.db.meshIndices.insert({
        id: triangleId,
        entityId: id,
        triangleIndex: i / 3,            // 0, 1, 2, ...
        i0: indices[i],
        i1: indices[i + 1],
        i2: indices[i + 2],
      });
    }

    console.log(`Created mesh "${meshName ?? 'Mesh_' + id}" with ${vertices.length} vertices and ${indices.length / 3} triangles`);
  }
);
//------------------------------------------------
// DELETE MESH
//------------------------------------------------
export const delete_mesh = spacetimedb.reducer({
    id: t.string()                    // Unique entity ID for this mesh
  },
  (ctx, { id }) => {
    ctx.db.meshes.entityId.delete(id);
    ctx.db.meshIndices.entityId.delete(id);
    ctx.db.meshVertices.entityId.delete(id);
    ctx.db.meshTriangles.entityId.delete(id);
});

// debug clean up mesh data.
export const delete_all_meshes = spacetimedb.reducer((ctx)=>{
  for(const mesh of ctx.db.meshes.iter()){
    ctx.db.meshes.entityId.delete(mesh.entityId)
  }

  for(const meshv of ctx.db.meshVertices.iter()){
    ctx.db.meshVertices.id.delete(meshv.id)
  }

  for(const meshi of ctx.db.meshIndices.iter()){
    ctx.db.meshIndices.id.delete(meshi.id)
  }
});