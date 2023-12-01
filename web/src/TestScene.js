import Bubble from "./Bubble.js";
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

  #audio;

  #val = 0;

  tick = 0;

  #phrase;

  #keyframes;
  #currentPart;
  constructor(data) {
    super("city");

    this.#keyframes = Resources.keyframes;


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

    this.#bubble = new Bubble();
    console.log(this.#bubble)


    this.#bubble = Resources.get_object("bubble");
    console.log(this.#bubble)
        this.add_obj3d(this.#bubble, 0);
        this.#bubble.scale = vec3(0,0,0);

    // this.set_as_mask(4);

    // this.#sky.position = vec3(0,0,-0.2);

    // this.#innercity.position = vec3(0, 4, -1);
    // this.#outercity.position = vec3(0, 6, -1);
    // this.#sun.position = vec3(0, 4.5, 0);
    // this.#sun.rotation = vec3(0, 0, 20);

    this.light.position = vec3(0, 0, 5);
    this.camera.position = vec3(0,0, -16);
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

    // console.log(100 * Math.sin(delta));
    // this.camera.fov = 90;



    this.#partone(delta);

    // 

    super.update();
  }

  #partone(delta) {



    // this.camera.lookAt(this.#phrase.position);
    // this.#phrase.scale = vec3(1, this.#audio.get_frequency(0,0)/20,1);
    // 

    this.#val = this.#bubble.scale.x;
    const scl = ( lerp(0, 1, delta) +  this.#audio.get_frequency(0,0));
    if(scl < 1 ) this.#bubble.scale = vec3(scl, scl, scl);
  }
}
