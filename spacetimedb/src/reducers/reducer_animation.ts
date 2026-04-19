//-----------------------------------------------
// REDUCERS TEST
//-----------------------------------------------
import { ScheduleAt } from 'spacetimedb';
import { table, t, SenderError } from 'spacetimedb/server';
import spacetimedb from '../module';
import { KeyFrames } from '../types/types';
import { entity } from '../tables/table_entity';
// import { Quat, Vect3 } from '../types/types_transform3d';

// const KeyFrames = t.object('KeyFrames0', {
//    position: t.array(t.object('KeyframePosition0', {time: t.f32(),value: Vect3})),
//    quaternion:  t.array(t.object('QuaternionKeyframe0', {time: t.f32(),value: Quat})),
//    scale: t.array(t.object('ScaleKeyframe0', {time: t.f32(),value: Vect3})),
// // refs
// //   // position: t.option(t.array(KeyframePosition)),   // optional array
// //   // quaternion: t.option(t.array(QuaternionKeyframe)),
// //   // scale: t.option(t.array(ScaleKeyframe)),
// });

export const create_transform3d_animation = spacetimedb.reducer({
  id:t.string(),//animation clip id
  entityId:t.string(),
  time:t.f32(),
  speed:t.f32(),
  isLoop:t.bool(),
  isPlaying:t.bool()
}, (ctx, { id, entityId, time, speed, isLoop, isPlaying }) => {
  console.log("checking transform3d animation");
  const t3 = ctx.db.transform3d.entityId.find(entityId)
  if(!t3) return;

  const animationClip = ctx.db.AnimationClips.id.find(id);
  if(!animationClip) return;

  const newId = ctx.newUuidV7().toString()
  console.log("create transform3d animation");
  ctx.db.EntityAnimations.insert({
    id: newId,
    entityId: entityId,
    clip_id: id,
    start_time: time,
    playback_speed: speed,
    is_looping: isLoop,
    is_playing: isPlaying
  })
});

export const delete_transform3d_animation = spacetimedb.reducer({
id:t.string(),//animation clip id
},(ctx, {id})=>{
  console.log("delete entity animation:", id );
  ctx.db.EntityAnimations.id.delete(id);
})

export const set_key_frames = spacetimedb.reducer({id:t.string(), keys:KeyFrames}, (ctx, { id, keys }) => {
  console.log(keys);
  console.log("insert test");
  ctx.db.AnimationClips.insert({
    name: undefined,
    id: ctx.newUuidV7().toString(),
    keyFrames: keys,
    duration: 0
  })
  // ctx.db.AnimationKeys.insert({
  //   id: ctx.newUuidV7().toString(),
  //   position: undefined,
  //   quaternion: undefined,
  //   scale: undefined,
  //   time: 0,
  //   clip_id: ''
  // })
});

export const play_animation = spacetimedb.reducer({
  id:t.string()
}, (ctx, { id }) => {
  // EntityAnimations
  const t3Animation = ctx.db.EntityAnimations.id.find(id);
  if(!t3Animation) return;
  const updateAnimation = ctx.db.transform3DAnimationTick.transform3d_animation_id.find(id);
  if(updateAnimation){
    ctx.db.transform3DAnimationTick.transform3d_animation_id.delete(id);
  }
  if(t3Animation){
    // Schedule to run every 1 seconds (1,000,000 microseconds)
    ctx.db.transform3DAnimationTick.insert({
      scheduled_id: 0n,
      scheduled_at: ScheduleAt.interval(1000000n),
      transform3d_animation_id: id,
      last_tick_timestamp: ctx.timestamp,
      dt: 0
    })
  }
});

export const stop_animation = spacetimedb.reducer({id:t.string()}, (ctx, { id }) => {
  const t3Animation = ctx.db.EntityAnimations.id.find(id);
  if(!t3Animation) return;
  // EntityAnimations
  const updateAnimation = ctx.db.transform3DAnimationTick.transform3d_animation_id.find(id);
  if(updateAnimation){
    ctx.db.transform3DAnimationTick.transform3d_animation_id.delete(id);
  }
});

export const set_animation_transform3d = spacetimedb.reducer({
  id:t.string(), 
  entityId:t.string()
}, (ctx, { id, entityId }) => {
  const transform3DAnimation = ctx.db.EntityAnimations.id.find(id);
  if(transform3DAnimation){
    transform3DAnimation.entityId = entityId;
    ctx.db.EntityAnimations.id.update(transform3DAnimation);
  }
});
//-----------------------------------------------
export const set_keyframe_pos = spacetimedb.reducer({
  id:t.string(), 
}, (ctx, { id }) => {

});

export const set_keyframe_rot = spacetimedb.reducer({
  id:t.string(), 
}, (ctx, { id }) => {

});


export const set_keyframe_scale = spacetimedb.reducer({
  id:t.string(), 
}, (ctx, { id }) => {

});