import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Premium Startup-quality Logo Reveal Intro Screen.
 * Uses GSAP timeline sequences to drive a 9-phase cinematic SVG logo reveal.
 */
export default function IntroScreen({ onComplete }) {
  const containerRef = useRef(null);
  const starRef = useRef(null);
  const leftWingsRef = useRef(null);
  const rightWingsRef = useRef(null);
  const blueCoreRef = useRef(null);
  const purpleCoreRef = useRef(null);
  const sphereRef = useRef(null);
  const textRef = useRef(null);
  const taglineRef = useRef(null);
  const logoWrapperRef = useRef(null);
  const glowFilterRef = useRef(null);

  useEffect(() => {
    // Phase 1 - Reset states (Pure white screen, hidden logo elements, star below screen)
    gsap.set(containerRef.current, { backgroundColor: '#ffffff', opacity: 1 });
    gsap.set(logoWrapperRef.current, { opacity: 1 });

    gsap.set(starRef.current, {
      y: 500,
      scale: 0.2,
      rotation: 180,
      opacity: 0,
      transformOrigin: '50% 50%',
    });

    gsap.set([leftWingsRef.current, rightWingsRef.current], {
      scale: 0.5,
      opacity: 0,
      filter: 'blur(15px)',
      transformOrigin: '50% 50%',
    });

    gsap.set([blueCoreRef.current, purpleCoreRef.current], {
      y: 50,
      scale: 0,
      opacity: 0,
      transformOrigin: '50% 50%',
    });

    gsap.set(sphereRef.current, {
      scale: 0,
      opacity: 0,
      transformOrigin: '50% 50%',
    });

    gsap.set(textRef.current, {
      y: 30,
      opacity: 0,
      letterSpacing: '1.2em',
    });

    gsap.set(taglineRef.current, {
      opacity: 0,
    });

    const tl = gsap.timeline({
      onComplete: () => {
        // Transition container background to match theme and fade out screen
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: onComplete,
        });
      },
    });

    // Phase 2 - Star Entry (rises, scales, rotates to center position)
    tl.to(starRef.current, {
      y: 0,
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 1.2,
      ease: 'power4.out',
    });

    // Phase 3 - Star Bounce & Glow Pulse
    tl.to(starRef.current, {
      scale: 1.35,
      duration: 0.2,
      ease: 'power2.out',
    })
    .to(starRef.current, {
      scale: 1.0,
      duration: 0.4,
      ease: 'bounce.out',
    });

    // Glow pulse side effect
    tl.to(glowFilterRef.current, {
      attr: { stdDeviation: 10 },
      duration: 0.25,
      yoyo: true,
      repeat: 1,
    }, '-=0.4');

    // Phase 4 - Wing Reveal (Scale expansion, opacity fade, blur reduction)
    tl.to([leftWingsRef.current, rightWingsRef.current], {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.1,
    }, '-=0.2');

    // Phase 5 - Core Assembly (Cores rise from center with a slight overshoot)
    tl.to(blueCoreRef.current, {
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: 'back.out(1.7)',
    }, '-=0.6')
    .to(purpleCoreRef.current, {
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: 'back.out(1.7)',
    }, '-=0.5');

    // Phase 6 - Golden Sphere (Elastic scale entrance with glow)
    tl.to(sphereRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1.0,
      ease: 'elastic.out(1, 0.45)',
    }, '-=0.4');

    // Phase 7 - Logo Activation (Energy pulse and filter glow pass)
    tl.to(glowFilterRef.current, {
      attr: { stdDeviation: 8 },
      duration: 0.35,
      yoyo: true,
      repeat: 1,
    }, '-=0.2');

    // Phase 8 - TAITS Text Reveal (Fade in, letter-spacing collapse, upward movement)
    tl.to(textRef.current, {
      y: 0,
      opacity: 1,
      letterSpacing: '0.2em',
      duration: 1.2,
      ease: 'power4.out',
    }, '-=0.3')
    .to(taglineRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.6');

    // Phase 9 - Idle State (Infinite subtle breathing y-float & glow)
    tl.add(() => {
      gsap.to(logoWrapperRef.current, {
        y: -6,
        duration: 2.0,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
      gsap.to(glowFilterRef.current, {
        attr: { stdDeviation: 4 },
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
    });

    // Pause briefly to let the fully assembled logo linger in idle state
    tl.to({}, { duration: 1.2 });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div id="intro-screen" ref={containerRef}>
      <div
        className="intro-logo-wrapper"
        ref={logoWrapperRef}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="blueCoreGrad" x1="100" y1="70" x2="100" y2="130" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2D7BFF" />
              <stop offset="100%" stopColor="#061A5B" />
            </linearGradient>
            <linearGradient id="purpleCoreGrad" x1="100" y1="80" x2="100" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8B3DFF" />
              <stop offset="100%" stopColor="#6E2EFF" />
            </linearGradient>
            <linearGradient id="goldGrad" x1="100" y1="45" x2="100" y2="65" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F9DF95" />
              <stop offset="100%" stopColor="#D9B26F" />
            </linearGradient>
            <linearGradient id="starGrad" x1="100" y1="10" x2="100" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#F9DF95" />
              <stop offset="100%" stopColor="#D9B26F" />
            </linearGradient>

            {/* Glowing filter */}
            <filter id="introGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur" ref={glowFilterRef} />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Left Wing Group */}
          <g ref={leftWingsRef}>
            {/* Wing Feather 3 */}
            <path
              d="M85 110 C55 100 30 70 25 40 C40 55 65 70 85 75 Z"
              fill="#061A5B"
              opacity="0.5"
            />
            {/* Wing Feather 2 */}
            <path
              d="M90 120 C65 115 40 90 35 60 C48 73 70 85 90 90 Z"
              fill="#1557FF"
              opacity="0.8"
            />
            {/* Wing Feather 1 */}
            <path
              d="M95 130 C75 130 55 105 50 80 C60 90 80 100 95 105 Z"
              fill="#2D7BFF"
            />
          </g>

          {/* Right Wing Group */}
          <g ref={rightWingsRef}>
            {/* Wing Feather 3 */}
            <path
              d="M115 110 C145 100 170 70 175 40 C160 55 135 70 115 75 Z"
              fill="#061A5B"
              opacity="0.5"
            />
            {/* Wing Feather 2 */}
            <path
              d="M110 120 C135 115 160 90 165 60 C152 73 130 85 110 90 Z"
              fill="#1557FF"
              opacity="0.8"
            />
            {/* Wing Feather 1 */}
            <path
              d="M105 130 C125 130 145 105 150 80 C140 90 120 100 105 105 Z"
              fill="#2D7BFF"
            />
          </g>

          {/* Center Blue Core */}
          <path
            ref={blueCoreRef}
            d="M100 130 C85 130 85 95 100 70 C115 95 115 130 100 130 Z"
            fill="url(#blueCoreGrad)"
          />

          {/* Center Purple Core */}
          <path
            ref={purpleCoreRef}
            d="M100 120 C90 120 90 95 100 80 C110 95 110 120 100 120 Z"
            fill="url(#purpleCoreGrad)"
          />

          {/* Golden Sphere */}
          <circle
            ref={sphereRef}
            cx="100"
            cy="55"
            r="10"
            fill="url(#goldGrad)"
            filter="url(#introGlowFilter)"
          />

          {/* Golden Star */}
          <path
            ref={starRef}
            d="M100 10 L103 22 L115 25 L103 28 L100 40 L97 28 L85 25 L97 22 Z"
            fill="url(#starGrad)"
            filter="url(#introGlowFilter)"
          />
        </svg>

        <div
          ref={textRef}
          className="intro-brand"
          style={{
            marginTop: '2rem',
            fontFamily: "var(--font-display), 'Outfit', sans-serif",
            fontSize: '3.2rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            textAlign: 'center',
            display: 'block',
          }}
        >
          TAITS Tech
        </div>

        <div
          ref={taglineRef}
          className="intro-tagline"
          style={{
            fontFamily: "var(--font-body), 'Inter', sans-serif",
            fontSize: '0.95rem',
            color: 'var(--luxury-gold)',
            letterSpacing: '0.4em',
            marginTop: '0.8rem',
            textTransform: 'uppercase',
            textAlign: 'center',
            display: 'block',
          }}
        >
          Innovate. Integrate. Elevate.
        </div>
      </div>
    </div>
  );
}
