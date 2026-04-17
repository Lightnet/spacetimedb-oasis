//-----------------------------------------------
// REDUCERS TEST
//-----------------------------------------------
import { table, t, SenderError } from 'spacetimedb/server';
import spacetimedb from '../module';
import { Quat, Vect3 } from '../types/types_transform3d';
//-----------------------------------------------
// 
//-----------------------------------------------
// export const test_foo = spacetimedb.reducer((ctx) => {
//   console.log("bar")
// });

// export const test_foo2 = spacetimedb.reducer({  }, (ctx, {  }) => {
//   console.log("bar")
// });

// export const test_auth = spacetimedb.reducer({  }, (ctx, {  }) => {
//   // console.log(ctx.senderAuth)
//   console.log(ctx.senderAuth.jwt)
// });

// Keyframe entry (time + value)
// const KeyframePosition = t.object('KeyframePosition', {
//   time: t.f32(),
//   value: Vect3,
// });

// const QuaternionKeyframe = t.object('QuaternionKeyframe', {
//   time: t.f32(),
//   value: Quat,
// });

// const ScaleKeyframe = t.object('ScaleKeyframe', {
//   time: t.f32(),
//   value: Vect3,
// });


