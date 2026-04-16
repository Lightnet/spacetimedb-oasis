import { DbConnection, tables } from './module_bindings';
import { connState, dbEntities } from "./context";

function onInsert_Entity(_ctx, row){
  console.log(row);
  dbEntities.val.set(row.id,row)
}

function onDelete_Entity(_ctx, row){
  dbEntities.val.delete(row.id,row)
}

export function setupDBEntity(){
  console.log(connState.val)

  const conn = connState.val;
  // dbEntities

  conn.subscriptionBuilder()
      .subscribe(tables.entity);
    conn.db.entity.onInsert(onInsert_Entity);
    conn.db.entity.onDelete(onDelete_Entity);
}
