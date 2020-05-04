/**
 * Enables sounds to overlap each other
 */
export class SimultaneousAudio {
  audioArr!: HTMLAudioElement[];
  index = 0;

  constructor(audioString: string) {
    this.audioArr =
      typeof window === "undefined"
        ? []
        : Array(3)
            .fill(0)
            .map(() => new Audio(audioString));
  }

  play() {
    this.audioArr[this.index].play();
    this.index = (this.index + 1) % this.audioArr.length;
  }
}
