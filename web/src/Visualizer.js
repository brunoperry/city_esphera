export default class Visualizer {
  #controller;
  #callback;
  #currentFreq;
  #currentTrack;

  totalFreqs = 0;

  constructor(audioController, callback) {
    this.#controller = audioController;
    this.#callback = callback;

    this.#controller.setListener((e) => {
      console.log(e);
    });

    const tracksContainer = document.querySelector("#tracks");
    let ctrack = 0;
    this.#controller.get_tracks().forEach((track, index) => {
      const btn = document.createElement("button");
      btn.innerText = `track ${track.name}`;
      btn.onclick = () => {
        this.#currentTrack = this.#controller.get_track(index);
        tracksContainer.children[ctrack].className = "";
        ctrack = index;
        tracksContainer.children[ctrack].className = "toggle";
        // this.#listener({
        //   action: UI.Actions.GET_AUDIO,
        //   index: 0,
        // });
      };
      if (index === ctrack) {
        btn.className = "toggle";
        this.#currentTrack = this.#controller.get_track(index);
      }
      tracksContainer.appendChild(btn);
    });

    this.totalFreqs = getComputedStyle(document.body).getPropertyValue("--num-freqs");

    const freqsContainer = document.querySelector("#freqs");
    for (let i = 0; i < this.totalFreqs; i++) {
      const freq = document.createElement("div");
      freq.className = "freq";
      freq.onclick = () => {
        this.#currentFreq = i;
        // console.log(this.#currentFreq);
        console.log(this.#controller.get_frequency(currentTrack, i));
      };
      freqsContainer.appendChild(freq);
    }
  }

  update() {
    // console.log(this.#currentTrack.getFreqData());

    for (let i = 0; i < this.#currentTrack.getFreqData().length; i++) {
      console.log(this.#currentTrack.get_frequency(i));
      i += this.totalFreqs;
    }
    console.log("-------");
    // this.#currentTrack.getFreqData.forEach((freqs) => {
    //   console.log(freqs);
    // });
  }

  playPause() {
    if (this.#controller.isPlaying) {
      this.#controller.pause();
    } else {
      this.#controller.play();
    }
  }
}
