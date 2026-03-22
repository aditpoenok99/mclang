/**
 * SPAWN - Unique decorator for MCLANG animations
 * Makes complex animations simple with clean syntax
 */

import { SpawnAnimation, SpawnConfig, EasingType } from './animations';

/**
 * Spawn decorator for animations
 * 
 * Usage:
 * @spawn({
 *   duration: 600,
 *   easing: 'ease-out',
 *   stagger: 100
 * })
 * element MyComponent { ... }
 */
export function spawn(config: SpawnConfig) {
  return function (target: any) {
    target.spawnConfig = config;
    return target;
  };
}

/**
 * Create staggered animations for arrays of elements
 */
export function spawnStagger(
  elements: HTMLElement[],
  config: SpawnConfig
): SpawnAnimation[] {
  return elements.map((element, index) => {
    const animationConfig = {
      ...config,
      delay: (config.delay || 0) + (index * (config.stagger || 0)),
    };
    return new SpawnAnimation(element, animationConfig);
  });
}

/**
 * Preset animations
 */
export const SpawnPresets = {
  // Fade in animations
  fadeIn: (duration = 600): SpawnConfig => ({
    duration,
    easing: EasingType.EASE_OUT,
    from: { opacity: 0 },
    to: { opacity: 1 },
  }),

  // Slide in animations
  slideInLeft: (duration = 600): SpawnConfig => ({
    duration,
    easing: EasingType.EASE_OUT,
    from: { translateX: -50, opacity: 0 },
    to: { translateX: 0, opacity: 1 },
  }),

  slideInRight: (duration = 600): SpawnConfig => ({
    duration,
    easing: EasingType.EASE_OUT,
    from: { translateX: 50, opacity: 0 },
    to: { translateX: 0, opacity: 1 },
  }),

  slideInUp: (duration = 600): SpawnConfig => ({
    duration,
    easing: EasingType.EASE_OUT,
    from: { translateY: 50, opacity: 0 },
    to: { translateY: 0, opacity: 1 },
  }),

  slideInDown: (duration = 600): SpawnConfig => ({
    duration,
    easing: EasingType.EASE_OUT,
    from: { translateY: -50, opacity: 0 },
    to: { translateY: 0, opacity: 1 },
  }),

  // Scale animations
  scaleIn: (duration = 600): SpawnConfig => ({
    duration,
    easing: EasingType.EASE_OUT,
    from: { scale: 0.8, opacity: 0 },
    to: { scale: 1, opacity: 1 },
  }),

  // Bounce animation
  bounceIn: (duration = 800): SpawnConfig => ({
    duration,
    easing: EasingType.SPRING,
    from: { scale: 0 },
    to: { scale: 1 },
  }),

  // Rotate animation
  rotateIn: (duration = 600): SpawnConfig => ({
    duration,
    easing: EasingType.EASE_OUT,
    from: { rotate: -180, opacity: 0 },
    to: { rotate: 0, opacity: 1 },
  }),
};
