import Object3D from "./Object3D.js";
import Resources from "./Resources.js";

export default class Bubble extends Object3D {

    constructor() {
        super(Resources.get_object("bubble").data);

    }
}