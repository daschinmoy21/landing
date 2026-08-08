import React, { useEffect, useRef } from 'react';

const RAINBOW =
  'https://soft-zoom-63098134.figma.site/_assets/v11/8d520a7515d06cbfc403d0125e3d05b1a7ccd29c.png';
const CLOUD =
  'https://soft-zoom-63098134.figma.site/_assets/v11/0d6dfd3f90b930f21726f2ed56a3320d79b7a797.png';

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, f: number) => a + (b - a) * f;

export const QuoteSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const rainbowRef = useRef<HTMLDivElement>(null);
  const cloudLRef = useRef<HTMLDivElement>(null);
  const cloudRRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    const rainbow = rainbowRef.current;
    const cl = cloudLRef.current;
    const cr = cloudRRef.current;
    if (!el || !rainbow || !cl || !cr) return;

    let raf = 0;
    let progress = 0;
    let target = 0;

    let rainbowY = 120;
    let cloudLX = -200;
    let cloudRX = 200;
    let cloudY = 0;
    let leftOpacity = 0;
    let rightOpacity = 0;

    const computeTarget = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = clamp((vh - rect.top) / (vh + rect.height), 0, 1);
      target = p;
    };

    const tick = () => {
      progress = lerp(progress, target, 0.08);

      const rY = lerp(120, -160, progress);
      rainbowY = lerp(rainbowY, rY, 0.06);
      rainbow.style.transform = `translate3d(0, ${rainbowY.toFixed(2)}px, 0)`;

      const inView = progress > 0.12 && progress < 0.92;
      const cxTarget = inView ? 0 : progress < 0.12 ? -200 : 200;
      const cyTarget = progress * -50;

      cloudLX = lerp(cloudLX, progress < 0.12 ? -200 : inView ? 0 : -200, 0.04);
      cloudRX = lerp(cloudRX, progress < 0.12 ? 200 : inView ? 0 : 200, 0.04);
      void cxTarget;
      cloudY = lerp(cloudY, cyTarget, 0.04);
      leftOpacity = lerp(leftOpacity, inView ? 1 : 0, 0.06);
      rightOpacity = lerp(rightOpacity, inView ? 1 : 0, 0.06);

      cl.style.transform = `translate3d(${cloudLX.toFixed(2)}px, ${cloudY.toFixed(2)}px, 0)`;
      cr.style.transform = `translate3d(${cloudRX.toFixed(2)}px, ${cloudY.toFixed(2)}px, 0) scaleX(-1)`;
      cl.style.opacity = `${clamp(leftOpacity, 0, 1).toFixed(3)}`;
      cr.style.opacity = `${clamp(rightOpacity, 0, 1).toFixed(3)}`;

      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => computeTarget();
    const onResize = () => computeTarget();

    computeTarget();
    raf = requestAnimationFrame(tick);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0F2E4E 0%, #1A5C84 30%, #3A8DB5 60%, #9CD3EC 100%)',
      }}
      aria-label="Russel quote"
    >
      {/* Rainbow — full width, top */}
      <div
        ref={rainbowRef}
        className="absolute inset-x-0 top-0 z-30 will-change-transform pointer-events-none select-none"
        style={{ transform: 'translate3d(0, 120px, 0)' }}
      >
        <img src={RAINBOW} alt="" className="w-full h-auto block" loading="lazy" />
      </div>

      {/* Left cloud */}
      <div
        ref={cloudLRef}
        className="hidden sm:block absolute left-0 bottom-[10%] z-10 will-change-transform pointer-events-none select-none"
        style={{
          width: 'min(650px, 52vw)',
          marginLeft: '-50%',
          transform: 'translate3d(-200px, 0, 0)',
          opacity: 0,
        }}
      >
        <img src={CLOUD} alt="" className="w-full h-auto block" loading="lazy" />
      </div>

      {/* Right cloud — flipped */}
      <div
        ref={cloudRRef}
        className="hidden sm:block absolute right-0 bottom-[15%] z-10 will-change-transform pointer-events-none select-none"
        style={{
          width: 'min(650px, 52vw)',
          marginRight: '-75%',
          transform: 'translate3d(200px, 0, 0) scaleX(-1)',
          opacity: 0,
        }}
      >
        <img src={CLOUD} alt="" className="w-full h-auto block" loading="lazy" />
      </div>

    </section>
  );
};

export default QuoteSection;
