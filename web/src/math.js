export const vec3 = (x = 0, y = 0, z = 0) => {
  return { x: x, y: y, z: z };
};
export const vec3_add = (a,b) => {
  return vec3(a.x + b.x, a.y + b.y, a.z + b.z);
}
export const vec3_subtract = (a,b) => {
  return vec3(a.x - b.x, a.y - b.y, a.z - b.z);
}
export const vec3_cross = (a, b) => {
  return vec3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
};
export const vec3_scale_and_add = (currentVector, otherVector, scale) => {
  currentVector.x += otherVector.x * scale;
  currentVector.y += otherVector.y * scale;
  currentVector.z += otherVector.z * scale;
  return currentVector;
};
export const vec3_transform_mat4 = (a, m) => {
  let x = a.x,
    y = a.y,
    z = a.z;

  let w = m[0][3] * x + m[1][3] * y + m[2][3] * z + m[3][3];
  w = w || 1.0;

  return vec3(
    (m[0][0] * x + m[1][0] * y + m[2][0] * z + m[3][0]) / w,
    (m[0][1] * x + m[1][1] * y + m[2][1] * z + m[3][1]) / w,
    (m[0][2] * x + m[1][2] * y + m[2][2] * z + m[3][2]) / w
  );
};
export const vec3_normalize = (v) => {
  const length = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  return vec3(v.x / length, v.y / length, v.z / length)
};
export const vec3_dot = (a, b) => {
  return a.x * b.x + a.y * b.y + a.z * b.z;
};

export const vec3_lerp = (a, b, t) => {

  return vec3(  a.x + t * (b.x - a.x), 
                a.y + t * (b.y - a.y),
                a.z + t * (b.z - a.z) );
}
/////////
// Matrix4
/////////
export const mat4_ELIPSON = 1.4013e-45;


export const mat4_identity = () => {
  return [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];
}

export const mat4_zero = () => {
  return [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
}
export const mat4_from_rotation = (rad, axis) => {
  let x = axis.x,
    y = axis.y,
    z = axis.z;
  let len = Math.hypot(x, y, z);
  let s, c, t;
  if (len < mat4_ELIPSON) {
    return null;
  }
  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;

  // Perform rotation-specific matrix multiplication
  return [
    [x * x * t + c, y * x * t + z * s, z * x * t - y * s, 0],
    [x * y * t - z * s, y * y * t + c, z * y * t + x * s, 0],
    [x * z * t + y * s, y * z * t - x * s, z * z * t + c, 0],
    [0, 0, 0, 1],
  ];
};

// export const mat4_look_at = (eye, center, up) => {

//   let matrix = mat4_zero();

//   // Calculate forward, right, and up vectors
//   const forward = vec3_normalize(vec3_subtract(center, eye));
//   const right = vec3_normalize(vec3_cross(up, forward));
//   const upVector = vec3_cross(forward, right);

//   // Create the view matrix
//   matrix[0] = [right.x, upVector.x, -forward.x, 0.0];
//   matrix[1] = [right.y, upVector.y, -forward.y, 0.0];
//   matrix[2] = [right.z, upVector.z, -forward.z, 0.0];
//   matrix[3] = [
//     -vec3_dot(right, eye),
//     -vec3_dot(upVector, eye),
//     vec3_dot(forward, eye),
//     1.0
//   ];

//   return matrix;
// }
 export const mat4_look_at = (eye, center, up) => {
  const rotation = vec3();

  let matrix = mat4_zero();

  // Calculate forward, right, and up vectors
  const forward = vec3(center.x - eye.x, center.y - eye.y, center.z - eye.z);
  const mag = Math.sqrt(forward.x * forward.x + forward.y * forward.y + forward.z * forward.z);
  forward.x /= mag;
  forward.y /= mag;
  forward.z /= mag;

  const right = vec3(up.y * forward.z - up.z * forward.y, up.z * forward.x - up.x * forward.z, up.x * forward.y - up.y * forward.x);
  const magRight = Math.sqrt(right.x * right.x + right.y * right.y + right.z * right.z);
  right.x /= magRight;
  right.y /= magRight;
  right.z /= magRight;

  const up2 = vec3(forward.y * right.z - forward.z * right.y, forward.z * right.x - forward.x * right.z, forward.x * right.y - forward.y * right.x);

  // Create the view matrix
  matrix[0][0] = right.x;
  matrix[0][1] = up2.x;
  matrix[0][2] = -forward.x;
  matrix[0][3] = 0.0;

  matrix[1][0] = right.y;
  matrix[1][1] = up2.y;
  matrix[1][2] = -forward.y;
  matrix[1][3] = 0.0;

  matrix[2][0] = right.z;
  matrix[2][1] = up2.z;
  matrix[2][2] = -forward.z;
  matrix[2][3] = 0.0;

  matrix[3][0] = -(right.x * eye.x + right.y * eye.y + right.z * eye.z);
  matrix[3][1] = -(up2.x * eye.x + up2.y * eye.y + up2.z * eye.z);
  matrix[3][2] = (forward.x * eye.x + forward.y * eye.y + forward.z * eye.z);
  matrix[3][3] = 1.0;

  // Calculate rotation angles (in radians)
  // rotation.x = Math.atan2(-matrix[2][1], matrix[2][2]);  // Pitch
  // rotation.y = Math.atan2(matrix[2][0], Math.sqrt(matrix[2][1] * matrix[2][1] + matrix[2][2] * matrix[2][2]));  // Yaw
  // rotation.z = Math.atan2(-matrix[1][0], matrix[0][0]);  // Roll

  // rotation.x = radiansToAngle(rotation.x);
  // rotation.y = radiansToAngle(rotation.y);
  // rotation.z = radiansToAngle(rotation.z);

  return matrix;
}

export const angleToRadians = (angle) => {
  return (angle * Math.PI) / 180;
}
export const radiansToAngle = (rad) => {
  return (rad * 180) / Math.PI;
}

export const lerp = (a, b, t) => {
  return a + t * (b - a);
}
