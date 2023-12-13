import { Phrases } from "./Phrases.js";
import Resources from "./Resources.js";
import Scene from "./Scene.js";
import { lerp, vec3 } from "./math.js";

export default class TestScene extends Scene {
  #sky;
  #sun;
  #innercity;
  #outercity;
  #bubble;
  #bubleOutline;

  #audio;

  #val = 0;

  tick = 0;

  #phrase;

  #keyframes;
  #currentPart;
  #currentKey;

  #FXS;
  #currentFX = 0;
  constructor(data) {
    super("city");

    this.#keyframes = Resources.keyframes;
    this.#currentPart = 0;
    this.#currentKey = this.#keyframes[this.#currentPart];

    this.#FXS = [this.#FX01, this.#FX02, this.#FX03];
    this.#currentFX = this.#FX01;

    // this.#phrase = new Phrases("c c two zero two three dash s i m atill o", this);
    // const phrase = new Phrases("s i m a o");

    // this.#phrase.getLetters().forEach((letter, index) => {
    // this.add_obj3d(letter);
    // letter.rotation = vec3(90, 0, 0);
    // letter.position = vec3(4*index, 0, 0);
    // });

    this.#audio = data.audioController;

    // this.#sky = Resources.get_object("sky");
    // this.add_obj3d(this.#sky, 0);
    // this.#sun = Resources.get_object("sun");
    // this.add_obj3d(this.#sun, 0);
    // this.#innercity = Resources.get_object("innercity");
    // this.add_obj3d(this.#innercity,0);
    // this.#outercity = Resources.get_object("outercity");
    // this.add_obj3d(this.#outercity,0);

    // this.#sky.isActive = 0;
    // this.#outercity.isActive = 0;
    // this.#innercity.isActive = 0;
    // this.#sun.isActive = 0;

    this.#bubble = Resources.get_object("bubble");
    this.add_obj3d(this.#bubble, 0);
    this.#bubleOutline = Resources.get_object("outeroutline");
    this.add_obj3d(this.#bubleOutline);

    this.#bubleOutline.scale = vec3(1, 1, 1);
    this.#bubleOutline.scale = vec3(1 + 0.1, 1 + 0.1, 1 + 0.1);
    // this.#bubleOutline.rotate = vec3(-90, 0, 0);
    // this.add_obj3d(this.#bubble, 0);
    // this.#bubble

    // this.set_as_mask(0);

    // this.#sky.position = vec3(0,0,-0.2);

    // this.#innercity.position = vec3(0, 4, -1);
    // this.#outercity.position = vec3(0, 6, -1);
    // this.#sun.position = vec3(0, 4.5, 0);
    // this.#sun.rotation = vec3(0, 0, 20);

    this.light.position = vec3(0, 0, 5);
    this.camera.position = vec3(0, 0, -16);
  }

  update(delta) {
    // let rot = this.#outercity.rotation;
    // this.#outercity.rotation = vec3(rot.x, rot.y, rot.z +=0.1);

    // rot = this.#innercity.rotation;
    // this.#innercity.rotation = vec3(rot.x, rot.y, rot.z +=0.05);
    // this.#outline2.lookAt(this.camera);
    // this.#outline2.position = this.camera.position;

    // console.log(this.camera.position);

    // console.log(delta)

    this.tick++;

    const nextKey = this.#keyframes[this.#currentPart + 1];
    if (this.#currentKey <= this.currentTime && this.currentTime >= nextKey) {
      this.#currentPart++;
      this.#currentKey = this.#keyframes[this.#currentPart];
      this.#currentFX = this.#FXS[this.#currentPart];
    }

    // this.#currentFX();

    super.update();
  }

  #FX01(delta) {
    // this.camera.lookAt(this.#phrase.position);
    // this.#phrase.scale = vec3(1, this.#audio.get_frequency(0,0)/20,1);
    //
    this.#val += 0.001;
    const scl = this.#audio.get_frequency(0, 0) + this.#val;
    this.#bubble.scale = vec3(scl, scl, scl);
    this.#bubleOutline.scale = vec3(scl, scl, scl);
  }

  #FX02(delta) {
    const scl = lerp(1, 1 + this.#audio.get_frequency(0, 0), 1.2);
    this.#bubble.scale = vec3(scl, scl, scl);
    this.#bubleOutline.scale = vec3(scl + 0.5, scl + 0.5, scl);
    // console.log(scl);
  }

  #FX03(delta) {
    const scl = lerp(this.#bubble.scale.x, 1, 1.2);
    this.#bubble.scale = vec3(scl, scl, scl);
    this.#bubleOutline.scale = vec3(scl + 0.1, scl + 0.1, scl + 0.1);
    console.log(scl);
  }
}
