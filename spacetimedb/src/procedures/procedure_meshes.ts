//-----------------------------------------------
//
//-----------------------------------------------
// https://spacetimedb.com/docs/functions/procedures
import { table, t } from 'spacetimedb/server';
import spacetimedb from "../module";
import { meshes } from '../tables/table_mesh';
//-----------------------------------------------
// 
//-----------------------------------------------

export const get_mesh_id = spacetimedb.procedure({ id: t.string() }, t.option(meshes.rowType), (ctx, { id }) => {
  // Call the reducer within a transaction
  return ctx.withTx(txCtx => {
    const mesh = txCtx.db.meshes.entityId.find(id);
    if(mesh){
      console.log(mesh);
      return mesh;
    }else{
      return undefined;
    }
  });
  
});


// export const get_mesh = spacetimedb.procedure({ id: t.string() }, t.unit(), (ctx, { id }) => {
//   // Call the reducer within a transaction
//   ctx.withTx(txCtx => {
//     const mesh = txCtx.db.meshes.entityId.find(id);
//     if(mesh){
//       console.log(mesh);
//     }
//   });
//   return {};
// });


