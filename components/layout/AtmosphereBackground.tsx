export function AtmosphereBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[linear-gradient(180deg,#f8feff_0%,#d9f8ff_24%,#8ee9ff_62%,#e8fff8_100%)]"
    >
      <div className="absolute inset-0 brutalist-grid opacity-[0.16]" />
      <div className="absolute -left-28 top-[-8rem] h-96 w-96 rounded-full bg-white/70 blur-3xl motion-safe:animate-aero-float" />
      <div className="absolute right-[-7rem] top-20 h-[28rem] w-[28rem] rounded-full bg-aero-lime/24 blur-3xl motion-safe:animate-aero-float [animation-delay:-4s]" />
      <div className="absolute bottom-[-12rem] left-1/4 h-[34rem] w-[34rem] rounded-full bg-aero-blue/24 blur-3xl motion-safe:animate-aero-float [animation-delay:-8s]" />
      <div className="absolute bottom-20 right-1/4 h-56 w-56 rounded-full bg-white/42 blur-2xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.62),transparent_34rem)]" />
      <div className="y2k-bloom absolute inset-0 opacity-0 transition-opacity duration-300 [background:radial-gradient(circle_at_18%_24%,rgba(255,61,240,0.16),transparent_18rem),radial-gradient(circle_at_78%_18%,rgba(198,255,0,0.16),transparent_20rem)]" />
    </div>
  );
}
