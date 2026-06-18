import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import logo from '../assets/logo.jpeg';

/**
 * Premium startup-quality intro reveal animation.
 * Clips and animates the original, un-redesigned TAITS logo image using SVG clipPaths,
 * vertical motion blur filters, and light sweep gradient reflections.
 */
export default function IntroScreen({ onComplete }) {
  const containerRef = useRef(null);
  const logoWrapperRef = useRef(null);

  // Logo parts refs
  const starRef = useRef(null);
  const sphereRef = useRef(null);
  const leftWingsRef = useRef(null);
  const rightWingsRef = useRef(null);
  const centerCoreRef = useRef(null);
  const sweepRef = useRef(null);

  // Text letters refs
  const t1Ref = useRef(null);
  const aRef = useRef(null);
  const iRef = useRef(null);
  const t2Ref = useRef(null);
  const sRef = useRef(null);

  // Filters refs
  const starBlurRef = useRef(null);
  const sphereGlowRef = useRef(null);

  useEffect(() => {
    // Phase 1 - Preparation (White screen, logo hidden, star pre-set below screen)
    gsap.set(containerRef.current, { backgroundColor: '#ffffff', opacity: 1 });
    gsap.set(logoWrapperRef.current, { opacity: 1 });

    gsap.set(starRef.current, {
      y: 400,
      scale: 0.2,
      rotation: 180,
      opacity: 0,
      transformOrigin: '500px 200px', // Center of Star
    });

    gsap.set(sphereRef.current, {
      scale: 0,
      opacity: 0,
      transformOrigin: '500px 295px', // Center of Sphere
    });

    gsap.set(leftWingsRef.current, {
      x: -150,
      scale: 0.85,
      opacity: 0,
      filter: 'blur(10px)',
      transformOrigin: '300px 430px',
    });

    gsap.set(rightWingsRef.current, {
      x: 150,
      scale: 0.85,
      opacity: 0,
      filter: 'blur(10px)',
      transformOrigin: '700px 430px',
    });

    gsap.set(centerCoreRef.current, {
      y: 80,
      scale: 0.8,
      opacity: 0,
      transformOrigin: '500px 510px',
    });

    // Text letter spacing reset values
    gsap.set(t1Ref.current, { x: -60, opacity: 0, y: 15, transformOrigin: '205px 790px' });
    gsap.set(aRef.current, { x: -30, opacity: 0, y: 15, transformOrigin: '345px 790px' });
    gsap.set(iRef.current, { x: 0, opacity: 0, y: 15, transformOrigin: '480px 790px' });
    gsap.set(t2Ref.current, { x: 30, opacity: 0, y: 15, transformOrigin: '600px 790px' });
    gsap.set(sRef.current, { x: 60, opacity: 0, y: 15, transformOrigin: '760px 790px' });

    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out screen overlay to reveal site
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: onComplete,
        });
      },
    });

    // Phase 2 - Star Entry (rise, scale, spin, and vertical motion blur)
    tl.to(starRef.current, {
      y: 0,
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 1.1,
      ease: 'power4.out',
    });

    // Animate motion blur in sync with the entry slide
    tl.fromTo(
      starBlurRef.current,
      { attr: { stdDeviation: '0 12' } },
      { attr: { stdDeviation: '0 0' }, duration: 1.1, ease: 'power3.out' },
      '-=1.1'
    );

    // Phase 3 - Star Bounce & Sphere Materialization
    tl.to(
      starRef.current,
      {
        scale: 1.25,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      },
      '-=0.05'
    );

    tl.to(
      sphereRef.current,
      {
        scale: 1,
        opacity: 1,
        duration: 0.9,
        ease: 'elastic.out(1, 0.45)',
      },
      '-=0.15'
    );

    // Bloom pulse on sphere glow filter
    tl.fromTo(
      sphereGlowRef.current,
      { attr: { stdDeviation: '0' } },
      { attr: { stdDeviation: '8' }, duration: 0.4, yoyo: true, repeat: 1, ease: 'sine.inOut' },
      '-=0.9'
    );

    // Phase 4 - Original Wings Reveal (slide in, fade in, blur decrease)
    tl.to(
      [leftWingsRef.current, rightWingsRef.current],
      {
        x: 0,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.95,
        ease: 'power3.out',
      },
      '-=0.3'
    );

    // Phase 5 - Center Core Activation (rise, overshoot, reflection sweep)
    tl.to(
      centerCoreRef.current,
      {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.85,
        ease: 'back.out(1.6)',
      },
      '-=0.6'
    );

    // Diagonal light sweep pass across the core
    tl.fromTo(
      sweepRef.current,
      { x: -250 },
      { x: 250, duration: 1.3, ease: 'power2.inOut' },
      '-=0.5'
    );

    // Phase 6 - TAITS Text Reveal (letter spacing collapse & fade in)
    tl.to(
      [t1Ref.current, aRef.current, iRef.current, t2Ref.current, sRef.current],
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.05,
      },
      '-=0.8'
    );

    // Phase 7 - Final Logo Lockup (subtle breathing floating idle)
    tl.add(() => {
      gsap.to(logoWrapperRef.current, {
        y: -5,
        duration: 2.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
    });

    // Linger on the perfect final lockup state
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
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '500px',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 1000"
          width="100%"
          height="100%"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* Precision Jigsaw Clip Paths for original logo.jpeg */}
            <clipPath id="clip-star">
              <rect x="460" y="160" width="80" height="80" />
            </clipPath>
            <clipPath id="clip-sphere">
              <circle cx="500" cy="295" r="30" />
            </clipPath>
            <clipPath id="clip-left-wings">
              <polygon points="100,180 430,180 430,330 500,690 100,690" />
            </clipPath>
            <clipPath id="clip-right-wings">
              <polygon points="570,180 900,180 900,690 500,690 570,330" />
            </clipPath>
            <clipPath id="clip-center-core">
              <polygon points="430,330 570,330 500,690" />
            </clipPath>

            {/* Individual text letters clip paths for letter-spacing animation */}
            <clipPath id="clip-text-t1">
              <rect x="150" y="700" width="110" height="180" />
            </clipPath>
            <clipPath id="clip-text-a">
              <rect x="260" y="700" width="170" height="180" />
            </clipPath>
            <clipPath id="clip-text-i">
              <rect x="430" y="700" width="100" height="180" />
            </clipPath>
            <clipPath id="clip-text-t2">
              <rect x="530" y="700" width="140" height="180" />
            </clipPath>
            <clipPath id="clip-text-s">
              <rect x="670" y="700" width="180" height="180" />
            </clipPath>

            {/* Filters */}
            <filter id="starMotionBlur" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0 0" ref={starBlurRef} />
            </filter>

            <filter id="sphereGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0" ref={sphereGlowRef} result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Diagonal Linear sweep gradient */}
            <linearGradient id="lightSweepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="35%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.75" />
              <stop offset="65%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Left Wing Group */}
          <g ref={leftWingsRef}>
            <image href={logo} x="0" y="0" width="1000" height="1000" clipPath="url(#clip-left-wings)" />
          </g>

          {/* Right Wing Group */}
          <g ref={rightWingsRef}>
            <image href={logo} x="0" y="0" width="1000" height="1000" clipPath="url(#clip-right-wings)" />
          </g>

          {/* Center Core */}
          <g ref={centerCoreRef}>
            <image href={logo} x="0" y="0" width="1000" height="1000" clipPath="url(#clip-center-core)" />
            {/* Reflection light sweep layer */}
            <rect
              ref={sweepRef}
              x="430"
              y="330"
              width="140"
              height="360"
              fill="url(#lightSweepGrad)"
              clipPath="url(#clip-center-core)"
              style={{ mixBlendMode: 'overlay', pointerEvents: 'none' }}
            />
          </g>

          {/* Golden Sphere (Head) */}
          <g ref={sphereRef} filter="url(#sphereGlow)">
            <image href={logo} x="0" y="0" width="1000" height="1000" clipPath="url(#clip-sphere)" />
          </g>

          {/* Golden Star */}
          <g ref={starRef} filter="url(#starMotionBlur)">
            <image href={logo} x="0" y="0" width="1000" height="1000" clipPath="url(#clip-star)" />
          </g>

          {/* Text letters groups (collapsing spacing reveal) */}
          <g ref={t1Ref}>
            <image href={logo} x="0" y="0" width="1000" height="1000" clipPath="url(#clip-text-t1)" />
          </g>
          <g ref={aRef}>
            <image href={logo} x="0" y="0" width="1000" height="1000" clipPath="url(#clip-text-a)" />
          </g>
          <g ref={iRef}>
            <image href={logo} x="0" y="0" width="1000" height="1000" clipPath="url(#clip-text-i)" />
          </g>
          <g ref={t2Ref}>
            <image href={logo} x="0" y="0" width="1000" height="1000" clipPath="url(#clip-text-t2)" />
          </g>
          <g ref={sRef}>
            <image href={logo} x="0" y="0" width="1000" height="1000" clipPath="url(#clip-text-s)" />
          </g>
        </svg>
      </div>
    </div>
  );
}
