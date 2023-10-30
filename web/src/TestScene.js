import Resources from "./Resources.js";
import Scene from "./Scene.js";
import { vec3 } from "./math.js";

export default class TestScene extends Scene {
  #sky;
  #obj;
  #obj2;
  #obj3;
  #obj4;
  #obj5;

  #antenna01;
  #billboard01;
  #billboard02;
  constructor() {
    super("surfer");

    this.#sky = Resources.get_object("sky");
    this.#obj = Resources.get_object("city01");
    this.#obj2 = Resources.get_object("city01");
    this.#obj3 = Resources.get_object("city02");
    this.#obj4 = Resources.get_object("city02");
    this.#obj5 = Resources.get_object("city01");
    this.#billboard01 = Resources.get_object("billboard01");
    this.#billboard02 = Resources.get_object("billboard02");

    this.#antenna01 = Resources.get_object("antenna01");

    this.add_obj3d(this.#sky, 0);
    this.add_obj3d(this.#obj);
    this.add_obj3d(this.#obj2);
    this.add_obj3d(this.#obj3);
    this.add_obj3d(this.#obj4);
    this.add_obj3d(this.#obj5);
    this.add_obj3d(this.#antenna01);
    this.add_obj3d(this.#billboard01);
    this.add_obj3d(this.#billboard02);

    this.#sky.position = vec3(0, 4, 0);

    this.#obj2.position = vec3(0, 2, 0);
    this.#obj2.rotation = vec3(0, 90, 0);

    this.#obj3.position = vec3(0, 1, 0);
    this.#obj3.rotation = vec3(0, 0, 0);

    this.#obj4.position = vec3(0, 3, 0);
    this.#obj4.rotation = vec3(0, 90, 0);

    this.#obj5.position = vec3(0, 4, 0);
    this.#obj5.rotation = vec3(0, 180, 0);

    this.#antenna01.position = vec3(-0.3, 4.5, 0);

    this.#billboard01.position = vec3(0.5, 4.5, 0);
    this.#billboard01.rotation = vec3(0, 90, 0);

    this.#billboard02.position = vec3(0.5, 2, 0.45);

    this.camera.position = vec3(0, -2, -5);
  }

  update(delta) {
    const yRot = (this.#obj.rotation.y += delta + 1);
    this.#sky.rotation = vec3(0, yRot, 0);

    // this.#obj.rotate(delta);
    super.update(delta);
  }
}
