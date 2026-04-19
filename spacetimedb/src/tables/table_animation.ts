//-----------------------------------------------
// 
//-----------------------------------------------
import { schema, table, t, SenderError  } from 'spacetimedb/server';
import { KeyFrames } from '../types/types';
import { Quat, Vect3 } from '../types/types_transform3d';
//-----------------------------------------------
// 
//-----------------------------------------------
// One table for the animation clip (shared or per-entity)
export const AnimationClips = table({
  name: "animation_clips",
  public: true, // or private depending on use
}, {
  id: t.string().primaryKey(),                // primary key, auto-inc or manual
  name: t.string().optional(),                // e.g., "idle", "walk", "attack"
  duration: t.f32(),                          // total length in seconds (5.0 in your example)
  keyFrames: KeyFrames,                       // save data for easy animaiton loading
  // You can add loop: boolean, etc.
});
//-----------------------------------------------
// 
//-----------------------------------------------
export const EntityAnimations = table({
  name: "entity_animations",
  public: true,
}, {
  id:t.string().primaryKey(),
  entityId: t.string(),                         // foreign key to your entity/player/npc
  clip_id: t.string(),                          // references AnimationClip.id
  start_time: t.f64(),                          // server timestamp when animation started (ctx.timestamp)
  playback_speed: t.f32().default(1.0),         // 1.0 = normal, 2.0 = fast, etc.
  is_looping: t.bool().default(false),
  is_playing: t.bool().default(false),
});
//-----------------------------------------------
// 
//-----------------------------------------------
// for editor
export const AnimationKeys = table({ // this go to AnimationClips
  name: "animation_keys",
  public: true, // or private depending on use
}, {
  id: t.string().primaryKey(),       // primary key, auto-inc or manual
  clip_id:t.string(),                 // AnimationClips
  // name: t.string().optional(),    // e.g., "idle", "walk", "attack"
  // duration: t.f32(),              // total length in seconds (5.0 in your example)
  time: t.f32(),                     // index
  position : Vect3,
  quaternion: Quat,
  scale : Vect3,
  // You can add loop: boolean, etc.
});