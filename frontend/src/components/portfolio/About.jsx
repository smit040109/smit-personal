import { motion } from "framer-motion";
import { Section, Overline, Reveal } from "./primitives";
import { ABOUT } from "../../data/content";

export const About = () => {
  return (
    <Section id="about" className="py-24 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <Reveal>
            <Overline>About</Overline>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-[#111827] leading-tight">
              A marketer who understands the machine behind the marketing.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 overflow-hidden rounded-[16px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <img
                src="https://images.unsplash.com/photo-1575318633968-0383e7d07ca0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBjbGVhbiUyMG9mZmljZSUyMGRlc2t8ZW58MHx8fHwxNzg1NzI5NzEzfDA&ixlib=rb-4.1.0&q=85"
                alt="Modern clean workspace"
                loading="lazy"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7 space-y-10 lg:pt-4">
          {ABOUT.chapters.map((c, i) => (
            <Reveal key={c.no} delay={i * 0.08}>
              <div className="flex gap-6 md:gap-8 border-b border-[#E5E7EB] pb-10 last:border-0">
                <span className="text-sm font-bold text-[#2563EB] tabular-nums pt-1 shrink-0">
                  {c.no}
                </span>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#111827]">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-base md:text-lg text-[#6B7280] leading-relaxed">
                    {c.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
};
