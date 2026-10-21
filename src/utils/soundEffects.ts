/**
 * SoundEffects: Zero-Dependency Procedural Web Audio Synthesizer
 * 
 * Provides delicate, celestial crystal chimes and magical arpeggios:
 * - 100% zero external audio files (no 404s, instant response)
 * - Compliant with browser audio autoplay policies (initialized only on user interaction)
 * - Persisted user sound preference (default: off/muted)
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private listeners: Set<(muted: boolean) => void> = new Set();

  constructor() {
    // Check if user previously enabled sound
    const saved = localStorage.getItem('aswathy_sound_enabled');
    if (saved === 'true') {
      this.isMuted = false;
    }
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    localStorage.setItem('aswathy_sound_enabled', String(!this.isMuted));
    if (!this.isMuted) {
      this.initContext();
      // Play a gentle welcome chime note to confirm sound is active
      this.playChime(587.33, 0.4, 0.15); // D5
      setTimeout(() => this.playChime(880, 0.6, 0.18), 120); // A5
    }
    this.notify();
    return this.isMuted;
  }

  public subscribe(listener: (muted: boolean) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l(this.isMuted));
  }

  /**
   * Delicate crystal bell chime tone
   */
  public playChime(freq: number, duration: number = 0.5, volume: number = 0.12) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Subtle overtone shimmer
      const overtone = this.ctx.createOscillator();
      const overtoneGain = this.ctx.createGain();
      overtone.type = 'triangle';
      overtone.frequency.setValueAtTime(freq * 2.756, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(volume, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      overtoneGain.gain.setValueAtTime(0.0001, now);
      overtoneGain.gain.linearRampToValueAtTime(volume * 0.25, now + 0.01);
      overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.6);

      osc.connect(gain);
      overtone.connect(overtoneGain);
      gain.connect(this.ctx.destination);
      overtoneGain.connect(this.ctx.destination);

      osc.start(now);
      overtone.start(now);

      osc.stop(now + duration);
      overtone.stop(now + duration * 0.6);
    } catch {
      // Graceful silence on any platform constraint
    }
  }

  /**
   * Magical ascending celestial harp chord (Pentatonic Major)
   */
  public playMagicalChord() {
    if (this.isMuted) return;
    // F# Major / Celestial pentatonic: F#5, G#5, A#5, C#6, D#6, F#6
    const notes = [739.99, 830.61, 932.33, 1108.73, 1244.51, 1479.98];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime(freq, 0.8 + idx * 0.1, 0.09);
      }, idx * 75);
    });
  }

  /**
   * Candle blowout breath & whisper sound
   */
  public playCandleBlowout() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // White noise buffer for gentle puff
      const bufferSize = this.ctx.sampleRate * 0.45;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(700, now);
      filter.frequency.exponentialRampToValueAtTime(150, now + 0.4);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.45);

      // Follow with a sweet shimmering chime
      setTimeout(() => {
        this.playChime(1046.5, 0.9, 0.1); // C6
        setTimeout(() => this.playChime(1318.51, 1.2, 0.09), 120); // E6
      }, 350);
    } catch {
      // Fallback
    }
  }

  /**
   * Balloon release gentle swoosh & uplifting note
   */
  public playBalloonFloat() {
    if (this.isMuted) return;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime(freq, 0.7, 0.07);
      }, idx * 110);
    });
  }

  /**
   * Wax seal unwrap paper rustle & click
   */
  public playPaperUnfold() {
    if (this.isMuted) return;
    this.playChime(659.25, 0.35, 0.08); // E5
    setTimeout(() => this.playChime(987.77, 0.5, 0.09), 90); // B5
  }
}

export const soundEffects = new SoundEngine();
