import Resources from "./Resources.js";
import Scene from "./Scene.js";
import { vec3 } from "./math.js";

export default class TestScene extends Scene {
  #sky;
  #hightlight;
  #obj;
  #sun;
  // #obj2;
  // #obj3;
  // #obj4;
  // #obj5;

  // #antenna01;
  // #billboard01;
  // #billboard02;
  #skyline;
  #plane;
  constructor() {
    super("surfer");

    this.#sky = Resources.get_object("sky");
    // this.#sun = Resources.get_object("sun");
    // this.#hightlight = Resources.get_object("highlight");
    this.#skyline = Resources.get_object("silhouete1");

    // this.#antenna01 = Resources.get_object("antenna01");
    // this.#plane = Resources.get_object("plane");

    // this.add_obj3d(this.#obj);
    // this.add_obj3d(this.#obj2);
    // this.add_obj3d(this.#obj3);
    // this.add_obj3d(this.#obj4);
    // this.add_obj3d(this.#obj5);
    // this.add_obj3d(this.#antenna01);
    // this.add_obj3d(this.#billboard01);
    // this.add_obj3d(this.#billboard02);
    this.add_obj3d(this.#sky, 0);
    this.add_obj3d(this.#skyline);

    // console.log("sky", this.#sky.id);
    // this.add_obj3d(this.#sun, 0);

    this.set_as_mask(0)
    // this.add_obj3d(this.#plane);
    // this.add_obj3d(this.#hightlight, 0);


    // this.#sun.scale = vec3(2,2,2);

    // this.#sun.position = vec3(0,0,-5);

    this.light.position = vec3(0, 0, 5);

    // this.#sky.position = vec3(0, 4, 0);
    // this.#skyline.position = vec3(0, 4, 0);

    // this.#obj2.position = vec3(0, 2, 0);
    // this.#obj2.rotation = vec3(0, 90, 0);

    // this.#obj3.position = vec3(0, 1, 0);
    // this.#obj3.rotation = vec3(0, 0, 0);

    // this.#obj4.position = vec3(0, 3, 0);
    // this.#obj4.rotation = vec3(0, 90, 0);

    // this.#obj5.position = vec3(0, 4, 0);
    // this.#obj5.rotation = vec3(0, 180, 0);

    // this.#antenna01.position = vec3(-0.3, 4.5, 0);

    // this.#billboard01.position = vec3(0.5, 4.5, 0);
    // this.#billboard01.rotation = vec3(0, 90, 0);

    // this.#billboard02.position = vec3(0.5, 2, 0.45);

    this.camera.position = vec3(0, 0, -35);
  }

  update(delta) {
    // const yRot = Math.sin((this.light.position.z / 100)) ;
    // this.#sun.position = vec3(0, 0, yRot * 10);

    // this.#obj.rotate(delta);
    super.update(delta);
  }
}
