//-----------------------------------------------
// Animation
//-----------------------------------------------
import { DbConnection, tables } from './module_bindings';
import { connState, dbAnimationClips, dbEntityAnimations } from "./context";
//-----------------------------------------------
// Animation Clips
//-----------------------------------------------
function addOrUpdateAnimationClips(ent) {
  if (!ent || !ent.id) return;
  const currentMap = dbAnimationClips.val;        // get current
  const newMap = new Map(currentMap);           // create copy
  newMap.set(ent.id, ent);
  dbAnimationClips.val = newMap;                  // assign new Map → triggers update
}
function deleteAnimationClips(id) {
  if (!id) return;
  // Create new Map without the item
  const newMap = new Map(dbAnimationClips.val);
  newMap.delete(id);
  // Update the state (this is what makes VanJS detect the change)
  dbAnimationClips.val = newMap;
}
function onInsert_AnimationClips(_ctx, row){
  console.log(row);
  addOrUpdateAnimationClips(row);
}
function onDelete_AnimationClips(_ctx, row){
  deleteAnimationClips(row.id)
}
function setupDBAnimationClips(){
  const conn = connState.val;
  conn.subscriptionBuilder()
      .subscribe(tables.AnimationClips);
    conn.db.AnimationClips.onInsert(onInsert_AnimationClips);
    conn.db.AnimationClips.onDelete(onDelete_AnimationClips);
}
//-----------------------------------------------
// Entity Animations
//-----------------------------------------------
function addOrUpdateEntityAnimations(ent) {
  if (!ent || !ent.id) return;
  const currentMap = dbEntityAnimations.val;        // get current
  const newMap = new Map(currentMap);           // create copy
  newMap.set(ent.id, ent);
  dbEntityAnimations.val = newMap;                  // assign new Map → triggers update
}
function deleteEntityAnimations(id) {
  if (!id) return;
  // Create new Map without the item
  const newMap = new Map(dbEntityAnimations.val);
  newMap.delete(id);
  // Update the state (this is what makes VanJS detect the change)
  dbEntityAnimations.val = newMap;
}
function onInsert_EntityAnimations(_ctx, row){
  console.log("Entity Animation: ",row);
  addOrUpdateEntityAnimations(row);
}
function onDelete_EntityAnimations(_ctx, row){
  deleteEntityAnimations(row.id)
}
function setupDBEntityAnimations(){
  const conn = connState.val;
  conn.subscriptionBuilder()
      .subscribe(tables.EntityAnimations);
    conn.db.EntityAnimations.onInsert(onInsert_EntityAnimations);
    conn.db.EntityAnimations.onDelete(onDelete_EntityAnimations);
}
//-----------------------------------------------
// SETUP ANIMATION
//-----------------------------------------------
export function setupDBAnimations(){
  setupDBAnimationClips();
  setupDBEntityAnimations();
}