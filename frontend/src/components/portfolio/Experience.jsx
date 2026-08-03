import { motion } from "framer-motion";
import { MapPin, Check, Globe2 } from "lucide-react";
import { Section, Overline, Reveal } from "./primitives";
import { EXPERIENCE } from "../../data/content";

export const Experience = () => {
  return (
    <Section id="experience" className="py-24 md:py-32">
      <Reveal>
        <Overline>Experience</Overline>
        <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-[#111827] leading-tight max-w-2xl">
          Professional experience that pairs strategy with execution.
        </h2>
      </Reveal>

      <div className="mt-16 relative">
        {/* timeline line */}
        <div className="absolute left-[7px] md:left-1/2 top-2 bottom-2 w-px bg-[#E5E7EB] md:-translate-x-1/2" />

        <div className="space-y-16">
          {EXPERIENCE.map((exp, i) => (
            <div
              key={exp.no}
              className="relative md:grid md:grid-cols-2 md:gap-16"
              data-testid={`experience-${exp.no}`}
            >
              {/* dot */}
              <span className="absolute left-0 md:left-1/2 top-2 h-4 w-4 rounded-full bg-white border-2 border-[#2563EB] md:-translate-x-1/2 z-10" />

              {/* meta column */}
              <div className={`pl-8 md:pl-0 mb-4 md:mb-0 ${i % 2 === 0 ? "md:text-right md:pr-16" : "md:col-start-2 md:pl-16"}`}>
                <Reveal>
                  <span className="text-xs font-bold tracking-[0.2em] text-[#6B7280]">
                    {exp.duration}
                  </span>
                  {exp.current && (
                    <span className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-[#16A34A]/10 px-2.5 py-0.5 text-xs font-semibold text-[#16A34A] align-middle">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" /> Present
                    </span>
                  )}
                </Reveal>
              </div>

              {/* card column */}
              <div className={`pl-8 md:pl-0 ${i % 2 === 0 ? "md:col-start-2 md:pl-16" : "md:col-start-1 md:row-start-1 md:pr-16"}`}>
                <Reveal delay={0.05}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-[16px] bg-white border border-[#E5E7EB] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-shadow"
                  >
                    <h3 className="text-2xl font-bold tracking-tight text-[#111827]">
                      {exp.company}
                    </h3>
                    <p className="mt-1 text-base font-semibold text-[#2563EB]">{exp.position}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-[#6B7280]">
                      <MapPin size={14} /> {exp.location}
                    </p>
                    <p className="mt-4 text-sm md:text-base text-[#6B7280] leading-relaxed">
                      {exp.about}
                    </p>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                      {exp.responsibilities.map((r) => (
                        <div key={r} className="flex items-start gap-2">
                          <Check size={15} className="text-[#2563EB] mt-1 shrink-0" />
                          <span className="text-sm text-[#374151]">{r}</span>
                        </div>
                      ))}
                    </div>

                    {exp.markets.length > 0 && (
                      <div className="mt-6 pt-5 border-t border-[#E5E7EB]">
                        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#6B7280]">
                          <Globe2 size={14} className="text-[#2563EB]" /> International Markets
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {exp.markets.map((m) => (
                            <span
                              key={m}
                              className="rounded-full bg-[#EFF6FF] text-[#2563EB] text-xs font-semibold px-3 py-1"
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {exp.note && (
                      <p className="mt-5 text-sm italic text-[#6B7280] leading-relaxed">
                        {exp.note}
                      </p>
                    )}
                  </motion.div>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
