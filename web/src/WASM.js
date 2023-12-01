export default class WASM {
  static #c_module = null;

  constructor() {}

  static async initialize() {
    const { instance } = await WebAssembly.instantiateStreaming(
      fetch("./src/gizmo.wasm"),
      {
        js: {
          console_log: WASM.wasm_log,
          info_log: WASM.wasm_info,
          float_log: WASM.float_log,
          int_log: WASM.int_log,
          vec3_log: WASM.vec3_log,
          vec4_log: WASM.vec4_log,
          mat4_log: WASM.mat4_log,
        },
      }
    );
    WASM.#c_module = instance.exports;
  }

  static wasm_log(a, b) {
    console.log("WASM", `line:${a}, val:${b}`);
  }
  static wasm_info(num_tris, num_vertices) {
    document.dispatchEvent(
      new CustomEvent("wasm_info", {
        detail: { verts: num_vertices, tris: num_tris },
      })
    );
  }
  static float_log(value) {
    console.log("float", value);
  }
  static int_log(value) {
    console.log("int", value);
  }
  static vec3_log(x, y, z) {
    console.log("vec3", `x:${x}, y:${y}, z:${z}`);
  }
  static vec4_log(x, y, z, w) {
    console.log("vec4", `x:${x}, y:${y}, z:${z}, w:${w}`);
  }
  static mat4_log(a0, a1, a2, a3, b0, b1, b2, b3, c0, c1, c2, c3, d0, d1, d2, d3) {

    console.table([
      [a0,a1,a2,a3],
      [b0,b1,b2,b3],
      [c0,c1,c2,c3],
      [d0,d1,d2,d3]]);
  }

  static update() {
    WASM.#c_module.update();
  }

  static set_color_buffer(width, height) {
    return WASM.#c_module.set_color_buffer(width, height);
  }
  static set_texture_buffer(width, height, id) {
    return WASM.#c_module.set_texture_buffer(width, height, id);
  }
  static set_render_mode_buffer() {
    return WASM.#c_module.set_render_mode_buffer();
  }
  static set_camera_buffer(camera) {
    const cam_buffer = WASM.#c_module.set_camera_buffer();
    const buffers = new Int32Array(WASM.mem, cam_buffer, 9);
    camera.initialize(buffers);
    WASM.#c_module.cam_done();
  }
  static set_light_buffer(light) {
    const light_buffer = WASM.#c_module.set_light_buffer();
    const buffers = new Int32Array(WASM.mem, light_buffer, 1);
    light.initialize(buffers);
    WASM.#c_module.light_done();
  }
  static set_object_buffer(obj3D, applyLight, isOutline) {
    const obj_buffer = WASM.#c_module.set_object_buffer(
      obj3D.vertices.length,
      obj3D.uvs.length,
      obj3D.normals.length,
      obj3D.texture.id,
      applyLight,
      isOutline
    );
    const buffers = new Int32Array(WASM.mem, obj_buffer, 10);
    obj3D.initialize(buffers);
    WASM.#c_module.obj_done();
  }
  static set_as_mask_buffer(id) {
    
    WASM.#c_module.set_as_mask_id(id);
  }

  static apply_filter(filter) {
    switch (filter) {
      case "barrel":
        WASM.#c_module.apply_filter(0);
        break;
      case "fisheye":
        WASM.#c_module.apply_filter(1);
        break;
    }
  }

  static get mem() {
    return WASM.#c_module.memory.buffer;
  }
  static get mem_size() {
    return WASM.#c_module.memory.buffer.byteLength;
  }
}
