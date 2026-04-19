// ====================== PURE MATH HELPERS ======================
function lerp(a:number, b:number, t:number) {
  return a * (1 - t) + b * t;
}

function lerpVector3(v1:any, v2:any, t:any) {
  return {
    x: lerp(v1.x, v2.x, t),
    y: lerp(v1.y, v2.y, t),
    z: lerp(v1.z, v2.z, t)
  };
}

function slerpQuaternion(q1:any, q2:any, t:any) {
  let dot = q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w;

  if (dot < 0) {
    q2 = { x: -q2.x, y: -q2.y, z: -q2.z, w: -q2.w };
    dot = -dot;
  }

  if (dot > 0.9995) {
    const result = {
      x: lerp(q1.x, q2.x, t),
      y: lerp(q1.y, q2.y, t),
      z: lerp(q1.z, q2.z, t),
      w: lerp(q1.w, q2.w, t)
    };
    const len = Math.sqrt(result.x**2 + result.y**2 + result.z**2 + result.w**2);
    return {
      x: result.x / len,
      y: result.y / len,
      z: result.z / len,
      w: result.w / len
    };
  }

  const theta = Math.acos(Math.min(Math.max(dot, -1), 1));
  const sinTheta = Math.sin(theta);
  const w1 = Math.sin((1 - t) * theta) / sinTheta;
  const w2 = Math.sin(t * theta) / sinTheta;

  return {
    x: w1 * q1.x + w2 * q2.x,
    y: w1 * q1.y + w2 * q2.y,
    z: w1 * q1.z + w2 * q2.z,
    w: w1 * q1.w + w2 * q2.w
  };
}

  // ====================== MAIN GET VALUE FUNCTION ======================
export function getValueAtTime(track:any, currentTime:any, duration:any) {
  currentTime = ((currentTime % duration) + duration) % duration;

  for (let i = 0; i < track.length - 1; i++) {
    const k1 = track[i];
    const k2 = track[i + 1];

    if (currentTime >= k1.time && currentTime <= k2.time) {
      const t = (currentTime - k1.time) / (k2.time - k1.time);

      // Better type detection
      if (k1.value.w !== undefined) {
        // This is a Quaternion (has w component)
        return slerpQuaternion(k1.value, k2.value, t);
      } 
      else {
        // This is Vector3 (position or scale)
        return lerpVector3(k1.value, k2.value, t);
      }
    }
  }

  return { ...track[track.length - 1].value };
}