import Resources from "./Resources.js";
import { vec3, vec3_add } from "./math.js";

export class Phrases {

    #letters = [];

    #pos = vec3();
    #rot = vec3();
    #scl = vec3();
    constructor(phrase, scene) {

        const letters = phrase.split(' ');
        let centerOffset = (letters.length * 4) / 2;
        letters.forEach((obj, index) => {
            const letter = Resources.get_object(obj);
            this.#letters.push(letter);
            scene.add_obj3d(letter, 0);
            letter.rotation = vec3(90, 0, 0);
            letter.scale = vec3( 1, 1, 1);
            letter.position = vec3((index * 4 - centerOffset) + 1.5, 0, 0);
        });
    }

    getLetters() {
        return this.#letters;
    }

    set position(vec) {
        this.#pos = vec;
        this.#letters.forEach((letter, index) => {
            letter.position = vec3_add(letter.position, vec);
        });
    }
    get position() {
        return this.#pos;
    }

    set rotation(vec) {
        this.#rot = vec;
        this.#letters.forEach((letter, index) => {
            letter.rotation = vec3_add(letter.rotation, vec);
        });
    }
    get rotation() {
        return this.#rot;
    }

    set scale(vec) {
        this.#scl = vec;
        this.#letters.forEach((letter, index) => {
            // letter.scale = vec3_add(letter.scale, vec);
            letter.scale = vec;
        });
    }
    get scale() {
        return this.#scl;
    }
}