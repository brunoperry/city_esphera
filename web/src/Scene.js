import WASM from "./WASM.js";
import Light3D from "./Light3D.js";
import Camera3D from "./Camera3D.js";
import { vec3 } from "./math.js";

export default class Scene {
  objects_3d = [];
  player;
  light;
  camera;
  name;
  timeElapsed = 0;
  startedAt;
  currentTime;
  constructor(name = "unnamed") {
    this.name = name;
    this.light = new Light3D();
    this.camera = new Camera3D();

    this.set_light(this.light);
    this.set_camera(this.camera);
  }

  add_obj3d(obj3d, applyLight = 1, isOutline = 0) {
    // obj3d.id = this.objects_3d.length;
    this.objects_3d.push(obj3d);

    WASM.set_object_buffer(obj3d, applyLight, isOutline);
  }

  set_as_mask(id) {
    WASM.set_as_mask_buffer(id);
  }
  set_camera(camera) {
    WASM.set_camera_buffer(camera);
  }
  set_light(light) {
    WASM.set_light_buffer(light);
  }

  update() {
    if (!this.startedAt) this.startedAt = Date.now();
    this.currentTime = Date.now() - this.startedAt;

    this.camera.update();
  }
}
