import { motion } from "framer-motion";
import { MapPin, Check, Globe2, Briefcase } from "lucide-react";
import { Section, Overline, Reveal } from "./primitives";
import { EXPERIENCE } from "../../data/content";

export const Experience = () => {
  return (
    <Section id="experience" className="py-24 md:py-32">
      <Reveal>
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <Overline>Experience</Overline>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-[#111827] leading-tight max-w-2xl">
              Where strategy meets execution.
            </h2>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-[#6B7280]">
            <Briefcase size={15} className="text-[#2563EB]" /> {EXPERIENCE.length} roles
          </span>
        </div>
      </Reveal>

      <div className="mt-14 space-y-8">
        {EXPERIENCE.map((exp, i) => (
          <Reveal key={exp.no} delay={i * 0.06}>
            <motion.article
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
              data-testid={`experience-${exp.no}`}
              className="group relative overflow-hidden rounded-[24px] bg-white border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_24px_50px_rgb(0,0,0,0.08)] transition-shadow"
            >
              {/* accent rail */}
              <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#2563EB] opacity-80" />

              <div className="p-8 md:p-12">
                {/* Header row */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex items-start gap-5 md:gap-7">
                    <span className="text-[3.5rem] md:text-[5rem] leading-none font-black tracking-tighter text-transparent [-webkit-text-stroke:1.5px_#E5E7EB] select-none">
                      {exp.no}
                    </span>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[#111827]">
                        {exp.company}
                      </h3>
                      <p className="mt-1.5 text-base md:text-lg font-semibold text-[#2563EB]">
                        {exp.position}
                      </p>
                      <p className="mt-1.5 flex items-center gap-1.5 text-sm text-[#6B7280]">
                        <MapPin size={14} /> {exp.location}
                      </p>
                    </div>
                  </div>

                  <div className="md:text-right shrink-0 md:pl-6">
                    <span className="inline-block rounded-full bg-[#FAFAFA] border border-[#E5E7EB] px-4 py-1.5 text-xs font-bold tracking-[0.12em] text-[#374151]">
                      {exp.duration}
                    </span>
                    {exp.current && (
                      <div className="mt-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#16A34A]/10 px-3 py-1 text-xs font-semibold text-[#16A34A]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A] animate-pulse" /> Currently here
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Body */}
                <div className="mt-9 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                  {/* left: about + markets */}
                  <div className="lg:col-span-4">
                    <p className="text-base text-[#6B7280] leading-relaxed">{exp.about}</p>

                    {exp.markets.length > 0 && (
                      <div className="mt-7">
                        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#6B7280]">
                          <Globe2 size={14} className="text-[#2563EB]" /> International Markets
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {exp.markets.map((m) => (
                            <span
                              key={m}
                              className="rounded-full bg-[#EFF6FF] text-[#2563EB] text-xs font-semibold px-3 py-1.5"
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {exp.note && (
                      <p className="mt-6 border-l-2 border-[#E5E7EB] pl-4 text-sm italic text-[#6B7280] leading-relaxed">
                        {exp.note}
                      </p>
                    )}
                  </div>

                  {/* right: responsibilities */}
                  <div className="lg:col-span-8 lg:border-l lg:border-[#E5E7EB] lg:pl-12">
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#6B7280] mb-4">
                      Key Responsibilities
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                      {exp.responsibilities.map((r) => (
                        <div key={r} className="flex items-start gap-2.5 group/item">
                          <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-[#EFF6FF] flex items-center justify-center">
                            <Check size={12} className="text-[#2563EB]" />
                          </span>
                          <span className="text-sm text-[#374151] leading-snug">{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};
