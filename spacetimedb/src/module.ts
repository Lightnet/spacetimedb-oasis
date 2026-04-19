//-----------------------------------------------
// MODULE
//-----------------------------------------------
import { ScheduleAt } from 'spacetimedb';
import { schema, table, t, SenderError  } from 'spacetimedb/server';
import { sessions } from './tables/table_session';
import { users, userAuth } from './tables/table_user';
import { entity} from './tables/table_entity';
import { transform3d } from './tables/table_transform3d';
import { transform2d } from './tables/table_transform2d';
import { meshes, meshIndices, meshTriangles, meshVertices } from './tables/table_mesh';
import { damageEvent } from './tables/table_event';
import { messageEvent } from './tables/table_message';
import { AnimationClips, AnimationKeys, EntityAnimations } from './tables/table_animation';
import { getValueAtTime } from './helpers/helper_animation';
import { computeLocalMatrix3D } from './helpers/helper_transform3d';

// import { update_all_transform3ds } from './reducers/reducer_transform3d'; // conflict
// import { 
  // update_all_transform3ds 
// } from './reducers/reducer_transform3d';
//-----------------------------------------------
// TABLE
//-----------------------------------------------
export const transform3DAnimationTick = table(
  { 
    name: 'transformthirdd_animation_tick', //transform3d_animation_tick <- 3 number error.
    scheduled: (): any => update_transform3d_animation 
  },
  {
    scheduled_id: t.u64().primaryKey().autoInc(),
    scheduled_at: t.scheduleAt(),
    transform3d_animation_id: t.string().unique(),
    last_tick_timestamp:t.timestamp(),
    dt:t.f32(),
  }
);

//-----------------------------------------------
// SCEHEMA
//-----------------------------------------------
const spacetimedb = schema({
  transform3DAnimationTick,
  sessions,
  users,
  userAuth,
  entity,
  transform3d,
  transform2d,
  // MESH
  meshes,
  meshTriangles,
  meshVertices,
  meshIndices,
  // ANIMATION
  AnimationClips,
  EntityAnimations,
  AnimationKeys,
  
  // EVENT
  damageEvent,
  messageEvent,
});

export const update_transform3d_animation = spacetimedb.reducer({ arg: transform3DAnimationTick.rowType }, (ctx, { arg }) => {
  // Invoked automatically by the scheduler
  // arg.message, arg.scheduled_at, arg.scheduled_id

  const now = ctx.timestamp;                    // current wall time
  let dt = 0;                       // we'll compute this
  if (arg.last_tick_timestamp) {        // not first tick
    const elapsed_ms = now.since(arg.last_tick_timestamp).millis;
    // console.log("elapsed_ms: ", elapsed_ms);
    dt = elapsed_ms / 1000.0;       // in seconds
  } else {
    dt = 0.033;                     // fallback
  }


  console.log("play Animation...");
  const animation = ctx.db.EntityAnimations.id.find(arg.transform3d_animation_id);
  if(!animation) return;
  const t3d = ctx.db.transform3d.entityId.find(animation.entityId);
  if(!t3d) return;
  const animationClip = ctx.db.AnimationClips.id.find(animation.clip_id);
  if(!animationClip) return;
  // console.log(animationClip.keyFrames);
  const duration = 5;
  const speed = 1;
  let keyframes = animationClip.keyFrames;
  animation.start_time += dt * speed;
  const pos = getValueAtTime(keyframes.position, animation.start_time, duration);
  console.log(pos);

  ctx.db.EntityAnimations.id.update(animation);

  t3d.position.x = pos.x;
  t3d.position.y = pos.y;
  t3d.position.z = pos.z;
  t3d.isDirty = true;
  t3d.localMatrix = computeLocalMatrix3D(t3d);
  t3d.worldMatrix = computeLocalMatrix3D(t3d);
  // markSubtreeDirty(ctx, t3d.entityId);   // ← link transforms to update
  ctx.db.transform3d.entityId.update(t3d);

  // update_all_transform3ds(ctx,{});

  ctx.db.transform3DAnimationTick.scheduled_id.update({
    ...arg,
    last_tick_timestamp: now,
    dt:dt,
  });

});

//-----------------------------------------------
// INIT
//-----------------------------------------------
export const init = spacetimedb.init(_ctx => {
  console.log("====::: INIT SPACETIMEDB OASIS :::====");
});
//-----------------------------------------------
// ON CLIENT CONNECT
//-----------------------------------------------
export const onConnect = spacetimedb.clientConnected(ctx => {
  // ctx.connectionId is guaranteed to be defined
  const connId = ctx.connectionId!;
  // console.log(ctx.newUuidV7().toString())
  // ctx.timestamp;
  // Initialize client session
  ctx.db.sessions.insert({
    connection_id: connId,
    identity: ctx.sender,
    connected_at: ctx.timestamp,
    userId: undefined
  });
  
  // const user = ctx.db.user.identity.find(ctx.sender);
  // if (user) {
  //   ctx.db.user.id.update({ ...user, online: true });
  // } else {
  //   // ctx.db.user.insert({
  //   //   identity: ctx.sender,
  //   //   name: ctx.newUuidV7().toString(),
  //   //   online: true,
  //   //   id: ctx.newUuidV7().toString()
  //   // });
  // }

});
//-----------------------------------------------
// ON CLIENT DISCONNECT
//-----------------------------------------------
export const onDisconnect = spacetimedb.clientDisconnected(ctx => {
  const connId = ctx.connectionId!;
  const session = ctx.db.sessions.connection_id.find(connId);
  if(session){
    if(session.userId){
      const _user = ctx.db.users.id.find(session.userId)
      if(_user){

        const _userAuth = ctx.db.userAuth.userId.find(session.userId);
        if(_userAuth){
          //remove identity token in case someone use same token
          _userAuth.identity = undefined;
          _user.online = false;
          _user.identity = undefined;
        }
      }
    }
  }
  // ctx.connectionId is guaranteed to be defined
  // Clean up client session
  ctx.db.sessions.connection_id.delete(connId);
});
//-----------------------------------------------
// 
//-----------------------------------------------
export default spacetimedb;
//-----------------------------------------------
// 
//-----------------------------------------------