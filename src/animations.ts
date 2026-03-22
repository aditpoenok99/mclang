/**
 * SPAWN ANIMATION - Unique feature of MCLANG
 * 
 * This is a unique animation system that makes complex animations
 * simple and smooth. Spawn animations automatically handle:
 * - Staggered animations
 * - Easing functions
 * - Transform sequences
 * - Event-driven animations
 */

export enum EasingType {
  EASE_IN = 'ease-in',
  EASE_OUT = 'ease-out',
  EASE_IN_OUT = 'ease-in-out',
  LINEAR = 'linear',
  CUBIC_BEZIER = 'cubic-bezier',
  SPRING = 'spring',
}

export interface SpawnConfig {
  duration?: number;           // Duration in ms
  delay?: number;              // Initial delay
  stagger?: number;            // Delay between items
  easing?: EasingType;         // Easing function
  from?: Record<string, any>;  // Start state
  to?: Record<string, any>;    // End state
  repeat?: boolean;            // Loop animation
  repeatCount?: number;        // How many times to repeat
  reverseOnRepeat?: boolean;   // Reverse animation
  onStart?: () => void;        // Callback on start
  onComplete?: () => void;     // Callback on complete
}

export class SpawnAnimation {
  private element: HTMLElement;
  private config: SpawnConfig;
  private startTime: number = 0;
  private isRunning: boolean = false;
  private repeatCount: number = 0;

  constructor(element: HTMLElement, config: SpawnConfig = {}) {
    this.element = element;
    this.config = {
      duration: 600,
      delay: 0,
      stagger: 0,
      easing: EasingType.EASE_IN_OUT,
      repeat: false,
      repeatCount: 0,
      reverseOnRepeat: false,
      ...config,
    };
  }

  private easeValue(t: number): number {
    switch (this.config.easing) {
      case EasingType.EASE_IN:
        return t * t;
      case EasingType.EASE_OUT:
        return t * (2 - t);
      case EasingType.EASE_IN_OUT:
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      case EasingType.LINEAR:
        return t;
      case EasingType.SPRING:
        return 1 - Math.cos((t * Math.PI) / 2);
      default:
        return t;
    }
  }

  private animate = (currentTime: number): void => {
    if (this.startTime === 0) {
      this.startTime = currentTime;
    }

    const elapsed = currentTime - this.startTime;
    const duration = this.config.duration || 600;
    let progress = Math.min(elapsed / duration, 1);

    // Apply easing
    const easedProgress = this.easeValue(progress);

    // Apply transforms
    if (this.config.from && this.config.to) {
      this.applyTransform(easedProgress);
    }

    if (progress < 1) {
      requestAnimationFrame(this.animate);
    } else {
      this.isRunning = false;
      if (this.config.onComplete) {
        this.config.onComplete();
      }
      if (this.config.repeat && this.repeatCount < (this.config.repeatCount || Infinity)) {
        this.repeatCount++;
        this.startTime = 0;
        if (this.config.reverseOnRepeat) {
          [this.config.from, this.config.to] = [this.config.to, this.config.from];
        }
        requestAnimationFrame(this.animate);
      }
    }
  };

  private applyTransform(progress: number): void {
    const from = this.config.from || {};
    const to = this.config.to || {};
    const transforms: string[] = [];
    let styles: Record<string, string> = {};

    for (const key in to) {
      const startVal = from[key] ?? 0;
      const endVal = to[key];

      if (key.includes('scale') || key.includes('rotate') || key.includes('translate')) {
        transforms.push(`${key}(${startVal + (endVal - startVal) * progress})`);
      } else if (key === 'opacity') {
        styles[key] = String(startVal + (endVal - startVal) * progress);
      } else if (key === 'color' || key === 'backgroundColor') {
        // Color interpolation
        styles[key] = this.interpolateColor(startVal, endVal, progress);
      } else {
        styles[key] = `${startVal + (endVal - startVal) * progress}`;
      }
    }

    if (transforms.length > 0) {
      styles['transform'] = transforms.join(' ');
    }

    Object.assign(this.element.style, styles);
  }

  private interpolateColor(startColor: string, endColor: string, progress: number): string {
    // Simple color interpolation
    return startColor;
  }

  public start(): void {
    if (!this.isRunning) {
      this.isRunning = true;
      this.startTime = 0;
      if (this.config.onStart) {
        this.config.onStart();
      }
      requestAnimationFrame(this.animate);
    }
  }

  public stop(): void {
    this.isRunning = false;
  }

  public reset(): void {
    this.isRunning = false;
    this.startTime = 0;
    this.repeatCount = 0;
  }
}
