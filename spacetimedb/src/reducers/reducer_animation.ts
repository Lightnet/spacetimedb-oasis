//-----------------------------------------------
// REDUCERS TEST
//-----------------------------------------------
import { table, t, SenderError } from 'spacetimedb/server';
import spacetimedb from '../module';
import { Quat, Vect3 } from '../types/types_transform3d';

const KeyFrames = t.object('KeyFrames', {
   position: t.array(t.object('KeyframePosition', {time: t.f32(),value: Vect3})),
   quaternion:  t.array(t.object('QuaternionKeyframe', {time: t.f32(),value: Quat})),
   scale: t.array(t.object('ScaleKeyframe', {time: t.f32(),value: Vect3})),

  // position: t.option(t.array(KeyframePosition)),   // optional array
  // quaternion: t.option(t.array(QuaternionKeyframe)),
  // scale: t.option(t.array(ScaleKeyframe)),
});

export const set_key_frames = spacetimedb.reducer({keys:KeyFrames}, (ctx, { keys }) => {
  console.log(keys);
  console.log("bar");
});

