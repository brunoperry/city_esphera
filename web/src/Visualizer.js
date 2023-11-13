export default class Visualizer {
  #controller;
  #callback;
  #currentFreq;
  #freqsContainer;
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

    this.totalFreqs = parseInt(getComputedStyle(document.body).getPropertyValue("--num-freqs"))

    this.#freqsContainer = document.querySelector("#freqs");
    for (let i = 0; i < this.totalFreqs; i++) {
      const freq = document.createElement("div");
      freq.className = "freq";
      freq.onclick = () => {
        this.#currentFreq = i;
        // console.log(this.#currentFreq);
        console.log(this.#controller.get_frequency(currentTrack, i));
      };
      this.#freqsContainer.appendChild(freq);
    }
  }

  update() {
    let count = 0;
    for (let i = 0; i < 1024; i++) {

      i += this.totalFreqs;
      const frq = this.#freqsContainer.children[count];
      if(frq) {
        frq.style.transform = `scaleY(${this.#currentTrack.get_frequency(i)*5})`;
      }

      count++;
    }
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
