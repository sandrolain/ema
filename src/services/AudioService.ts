
type BeforeAfterPlay = (letter: string) => Promise<any>;

export function wordToLetters (word: string) {
  const letters = word.split("");
  return letters;
}

export class AudioService {
  private audioContext!: AudioContext;
  private items: Map<string, AudioServiceItem> = new Map();

  init () {
    this.audioContext = new AudioContext();
  }

  private createAudioBuffer (context: AudioContext, buffer: ArrayBuffer): Promise<AudioBuffer> {
    return new Promise((resolve, reject) => {
      context.decodeAudioData(buffer, (audioBuffer) => resolve(audioBuffer), (err) => reject(err));
    });
  }

  private async loadAudio (context: AudioContext, url: string): Promise<AudioBuffer> {
    const response = await fetch(url);
    if(!response.ok) {
      throw new Error(`Cannot load audio file "${url}"`);
    }
    return this.createAudioBuffer(context, await response.arrayBuffer());
  }

  async initItemFromURL (url: string, name: string): Promise<AudioServiceItem> {
    const audioBuffer = await this.loadAudio(this.audioContext, url);
    const item = new AudioServiceItem(this.audioContext, audioBuffer);
    this.items.set(name, item);
    return item;
  }

  async initFromArrayBuffer (buffer: ArrayBuffer, name: string): Promise<AudioServiceItem> {
    const audioBuffer = await this.createAudioBuffer(this.audioContext, buffer);
    const item = new AudioServiceItem(this.audioContext, audioBuffer);
    this.items.set(name, item);
    return item;
  }

  getItem (name: string) {
    return this.items.get(name);
  }

  playItem(name: string, signal?: AbortSignal) {
    const item = this.getItem(name);
    return new Promise((resolve, reject) => {
      signal?.addEventListener("abort", reject);
      item?.play().then(resolve, reject);
    });
  }

  private abort!: AbortController | null;

  abortIfPlaying () {
    this.abort?.abort();
  }

  async playWord(word: string, before?: BeforeAfterPlay, after?: BeforeAfterPlay) {
    this.abortIfPlaying();
    const abort = new AbortController();
    const signal = abort.signal;
    this.abort = abort;
    await this.playItem(word, signal);
    await this.playChain(wordToLetters(word), before, after, signal);
    await this.playItem(word, signal);
    this.abort = null;
  }

  async playChain(names: string[], before?: BeforeAfterPlay, after?: BeforeAfterPlay, signal?: AbortSignal) {
    const checkAbort = () => {
      if (signal?.aborted) {
        throw new Error("aborted");
      }
      return true;
    }
    for (const name of names) {
      before && checkAbort() && await before(name);
      checkAbort() && await this.playItem(name, signal);
      after && checkAbort() && await after(name);
    }
  }

  async playLoop (sound: string, params?: PlayParams) {
    const item = this.getItem(sound);
    if (item) {
      while(true) {
        await item.play(params);
      }
    }
  }
}

export interface PlayParams {
  when?: number;
  offset?: number;
  duration?: number;
  volume?: number;
  ended?: (event: Event) => any;
}

const DEFAULT_PLAY_PARAMS: PlayParams = {
  when: 0,
  offset: 0,
  volume: 1
};

export class AudioServiceItem {
  private audioSource!: AudioBufferSourceNode;

  constructor (
    private audioContext: AudioContext,
    private audioBuffer: AudioBuffer
  ) {}

  private createAudioSource (volume: number): AudioBufferSourceNode {
    const gainNode = this.audioContext.createGain()
    gainNode.gain.value = volume;
    gainNode.connect(this.audioContext.destination)

    const source = this.audioContext.createBufferSource();
    source.buffer = this.audioBuffer;
    source.connect(gainNode)

    return source;
  }

  play (params: PlayParams = DEFAULT_PLAY_PARAMS): Promise<AudioServiceItem> {
    params = {...DEFAULT_PLAY_PARAMS, ...params};
    // this.stop();
    this.audioSource = this.createAudioSource(params.volume ?? 1);
    const res = new Promise<AudioServiceItem>((resolve) => {
      this.audioSource.addEventListener("ended", () => resolve(this));
    });
    this.audioSource.start(params.when, params.offset, params.duration);
    return res;
  }

  stop (): void {
    this.audioSource?.stop();
  }
}
