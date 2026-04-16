//-----------------------------------------------
// 
//-----------------------------------------------
import { DbConnection, tables } from './module_bindings';
import { connState, dbTransform3Ds, stateScene } from "./context";

function onInsert_Transfrom2D(_ctx, row){
  console.log("transform3d:", row);
  dbTransform3Ds.val.set(row.entityId, row);
}

function onUpdate_Transfrom2D(_ctx, oldRow, newRow){
  // console.log("transform3d:", newRow);
  dbTransform3Ds.val.set(newRow.entityId, newRow);
  update_model(newRow);
}

function onDelete_Transform2D(ctx, row){
  const scene = stateScene.val;
  for(const mesh of scene.children){
    if(mesh.userData?.row?.entityId == row.entityId){
      scene.remove(mesh);
    }
  }
  dbTransform3Ds.val.delete(row.entityId);
}

export function setupDBTransform2D(){
  const conn = connState.val;
  conn.subscriptionBuilder()
    .subscribe(tables.transform2d)
  conn.db.transform2d.onInsert(onInsert_Transfrom2D)
  conn.db.transform2d.onUpdate(onUpdate_Transfrom2D)
  conn.db.transform2d.onDelete(onDelete_Transform2D)
}