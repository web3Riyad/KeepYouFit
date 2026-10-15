import Image from "next/image";

const Bannar = () => {
  return (
    <section
      aria-labelledby="banner-title"
      className="grid min-h-[304px] grid-cols-1 items-center gap-6 rounded-[11px] border border-[#25272e] bg-[#15171c] px-6 py-8 text-[#fafafa] sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] sm:px-[38px] lg:gap-8"
    >
      <div className="w-full min-w-0">
        <p className="mb-4 text-[8px] font-extrabold tracking-[0.12em] text-[#d5ff00] uppercase">Workout Library</p>
        <h1
          id="banner-title"
          className="m-0 font-sans text-[clamp(28px,3.3vw,44px)] leading-[1.1] font-medium tracking-[-0.03em] uppercase"
        >
          <span className="block">Train with intent. Log</span>
          <span className="block">Every set.</span>
        </h1>
        <p className="mt-[14px] mb-[18px] max-w-[335px] text-[11px] leading-[1.55] text-[#999faa]">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
          into today&apos;s plan, and watch the week&apos;s work add up.
        </p>
        <button
          type="button"
          className="min-h-7 cursor-pointer rounded-sm border-0 bg-[#d5ff00] px-4 py-2 text-[8px] font-extrabold text-[#0c0d0f] uppercase transition-colors hover:bg-[#e2ff4d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5ff00]"
        >
          Browse Workouts
        </button>
      </div>
      <div className="flex w-full items-center justify-center">
        <Image
          src="/banner.png"
          alt="banner image"
          width={400}
          height={400}
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 42vw, (min-width: 400px) 320px, 85vw"
          preload
          className="h-auto w-full max-w-[320px] object-contain sm:max-w-[360px] lg:max-w-[400px]"
        />
      </div>
    </section>
  );
};

export default Bannar;
