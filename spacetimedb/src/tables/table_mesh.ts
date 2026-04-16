//-----------------------------------------------
// TABLE MESH
//-----------------------------------------------
import { table, t } from 'spacetimedb/server';
import { Vect3 } from '../types/types_transform3d';
//-----------------------------------------------
// PH ENTITY REFS
//-----------------------------------------------
// export const entity = table(
//   { 
//     name: 'entity', 
//     public: true,
//   },
//   {
//     id: t.string().primaryKey(),
//   }
// );
//-----------------------------------------------
// MESHES
//-----------------------------------------------
export const meshes = table(
  { 
    name: 'meshes', 
    public: true,
  },
  {
    entityId: t.string().primaryKey(), // uuid base string
    name: t.string().optional()
  }
);
//-----------------------------------------------
// MESH TRIANGLES
//-----------------------------------------------
export const meshTriangles = table(
  { 
    name: 'mesh_triangles', 
    public: true,
  },
  {
    id:t.string().primaryKey(), // uuid base string
    entityId: t.string().index('btree'), // uuid base string for mesh id
    v0:Vect3,
    v1:Vect3,
    v2:Vect3,
  }
);
//-----------------------------------------------
// MESH VERTICES
//-----------------------------------------------
export const meshVertices = table(
  { 
    name: 'mesh_vertices', 
    public: true,
  },
  {
    id: t.string().primaryKey(),              // unique vertex id (uuid)
    entityId: t.string().index('btree'),      // links to meshes.entityId
    index: t.u32().index('btree'),            // sequential index in the vertex list (0, 1, 2...)
    position: Vect3,
  }
);
//-----------------------------------------------
// MESH INDICES
//-----------------------------------------------
export const meshIndices = table(
  { 
    name: 'mesh_indices', 
    public: true,
  },
  {
    id: t.string().primaryKey(),              // unique index entry id
    entityId: t.string().index('btree'),
    triangleIndex: t.u32().index('btree'),    // 0, 1, 2... for each triangle
    i0: t.u32(),                              // vertex index
    i1: t.u32(),
    i2: t.u32(),
  }
);