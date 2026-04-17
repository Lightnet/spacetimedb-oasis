//-----------------------------------------------
// FOR SPACETIMEDB TYPES
//-----------------------------------------------
import { schema, table, t, SenderError  } from 'spacetimedb/server';
//-----------------------------------------------
// 
//-----------------------------------------------
export const status = t.enum('Status', ['Online', 'Offline','Idle','Busy']);

// 2D UV coordinate (u, v)
export const UV2D = t.object('UV2D', {
  u: t.f32(),   // or t.f64() if you need higher precision
  v: t.f32(),
});


// Default to white ({r:1, g:1, b:1})
// Vertex Color (RGB or RGBA)
export const ColorRGB = t.object('ColorRGB', {
  r: t.f32(),
  g: t.f32(),
  b: t.f32(),
});

export const ColorRGBA = t.object('ColorRGBA', {  // if you need alpha
  r: t.f32(),
  g: t.f32(),
  b: t.f32(),
  a: t.f32(),
});
