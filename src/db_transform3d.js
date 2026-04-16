//-----------------------------------------------
// 
//-----------------------------------------------
import { DbConnection, tables } from './module_bindings';
import { connState, dbTransform3Ds, stateScene } from "./context";

function onInsert_Transfrom3D(_ctx, row){
  console.log("transform3d:", row);
  dbTransform3Ds.val.set(row.entityId, row);
}

function onUpdate_Transfrom3D(_ctx, oldRow, newRow){
  // console.log("transform3d:", newRow);
  PARAMS.transform3d = PARAMS.transform3d.filter(r=>r.entityId != newRow.entityId);
  PARAMS.transform3d.push(newRow);
  update_model(newRow);
}

function onDelete_Transform3D(ctx, row){
  const scene = stateScene.val;
  for(const mesh of scene.children){
    if(mesh.userData?.row?.entityId == row.entityId){
      scene.remove(mesh);
    }
  }
  dbTransform3Ds.val.delete(row.entityId);
}

export function setupDBTransform3D(){
  const conn = connState.val;
  conn.subscriptionBuilder()
    .subscribe(tables.transform3d)
  conn.db.transform3d.onInsert(onInsert_Transfrom3D)
  conn.db.transform3d.onUpdate(onUpdate_Transfrom3D)
  conn.db.transform3d.onDelete(onDelete_Transform3D)
}