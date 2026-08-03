import { Section, Overline, Reveal } from "./primitives";
import { MARKETING_STACK } from "../../data/content";

export const MarketingStack = () => {
  const doubled = [...MARKETING_STACK, ...MARKETING_STACK];
  return (
    <section id="stack" className="py-24 md:py-32 scroll-mt-24 border-y border-[#E5E7EB] bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <Overline>Marketing Stack</Overline>
          <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-[#111827] leading-tight max-w-2xl">
            The tools I use to plan, execute, measure and optimise.
          </h2>
        </Reveal>
      </div>

      {/* Slow editorial marquee */}
      <div className="mt-14 relative overflow-hidden marquee-pause">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
        <div className="flex w-max animate-marquee">
          {doubled.map((tool, i) => (
            <div
              key={`${tool}-${i}`}
              className="mx-3 flex items-center gap-3 rounded-full border border-[#E5E7EB] bg-[#FAFAFA] px-6 py-3 whitespace-nowrap"
            >
              <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
              <span className="text-base font-semibold tracking-tight text-[#111827]">
                {tool}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-10">
        <Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3" data-testid="stack-grid">
            {MARKETING_STACK.map((tool) => (
              <div
                key={tool}
                className="rounded-[16px] border border-[#E5E7EB] bg-[#FAFAFA] px-5 py-4 text-sm font-semibold text-[#374151] transition-colors hover:border-[#2563EB]/40 hover:text-[#2563EB] hover:bg-[#EFF6FF]"
              >
                {tool}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
