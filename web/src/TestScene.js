import Resources from "./Resources.js";
import Scene from "./Scene.js";
import { vec3 } from "./math.js";

export default class TestScene extends Scene {
  #sky;
  #hightlight;
  #sun;
  #city;
  #outline;
  constructor() {
    super("surfer");

    this.#sky = Resources.get_object("sky");
    this.add_obj3d(this.#sky, 0);
    this.#city = Resources.get_object("city");
    this.add_obj3d(this.#city);
    this.#hightlight = Resources.get_object("highlight");
    this.add_obj3d(this.#hightlight, 0);
    this.#outline = Resources.get_object("outline");
    this.add_obj3d(this.#outline, 0, 1);

    this.set_as_mask(0);

    this.light.position = vec3(0, 0, 5);
    this.camera.position = vec3(0, 0, -25);
  }

  update(delta) {
    // const yRot = Math.sin((this.light.position.z / 100)) ;
    // this.#sun.position = vec3(0, 0, yRot * 10);

    // this.#obj.rotate(delta);
    super.update(delta);
  }
}
