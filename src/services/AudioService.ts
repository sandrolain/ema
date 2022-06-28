
export class AudioService {
  private audioContext: AudioContext;
  private items: Map<string, AudioServiceItem> = new Map();

  constructor() {
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

  playItem(name: string) {
    return this.getItem(name)?.play();
  }

  async playChain(names: string[], before?: (letter: string) => Promise<any>, after?: (letter: string) => Promise<any>) {
    for (const name of names) {
      before && await before(name);
      await this.playItem(name);
      after && await after(name);
    }
  }
}

export interface PlayParams {
  when?: number;
  offset?: number;
  duration?: number
  ended?: (event: Event) => any;
}

const DEFAULT_PLAY_PARAMS: PlayParams = {
  when: 0,
  offset: 0
};

export class AudioServiceItem {
  private audioSource!: AudioBufferSourceNode;

  constructor (
    private audioContext: AudioContext,
    private audioBuffer: AudioBuffer
  ) {}

  private createAudioSource (): AudioBufferSourceNode {
    const source = this.audioContext.createBufferSource();
    source.buffer = this.audioBuffer;
    source.connect(this.audioContext.destination);
    return source;
  }

  play (params: PlayParams = DEFAULT_PLAY_PARAMS): Promise<AudioServiceItem> {
    params = {...DEFAULT_PLAY_PARAMS, ...params};
    // this.stop();
    this.audioSource = this.createAudioSource();
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
