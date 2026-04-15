//-----------------------------------------------
// 
//-----------------------------------------------
import { table, t, SenderError } from 'spacetimedb/server';
import spacetimedb from '../module';
//-----------------------------------------------
// 
//-----------------------------------------------
// Example: Create a simple triangle mesh
export const create_simple_mesh = spacetimedb.reducer(
  {
    id: t.string(),
    meshName: t.string().optional(),
  },
  (ctx, { id, meshName }) => {

    const _entity = ctx.db.entity.id.find(id)
    if(!_entity) return;
    if(_entity) {
      console.log("found");
      return;
    }

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

    ctx.db.meshVertices.insert({ id: v0_id, entityId:id, index: 0, position: { x: -1, y: -1, z: 0 } });
    ctx.db.meshVertices.insert({ id: v1_id, entityId:id, index: 1, position: { x:  1, y: -1, z: 0 } });
    ctx.db.meshVertices.insert({ id: v2_id, entityId:id, index: 2, position: { x:  0, y:  1, z: 0 } });

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




