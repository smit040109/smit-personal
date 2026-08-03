import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section, Overline, Reveal } from "./primitives";
import { CASE_STUDIES } from "../../data/content";

export const CaseStudies = () => {
  return (
    <Section id="case-studies" className="py-24 md:py-32">
      <Reveal>
        <Overline>Case Studies</Overline>
        <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-[#111827] leading-tight max-w-2xl">
          Featured work across international and multi-location marketing.
        </h2>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {CASE_STUDIES.map((cs, i) => (
          <Reveal key={cs.no} delay={i * 0.08}>
            <motion.article
              whileHover="hover"
              data-testid={`case-study-${cs.no}`}
              className="group h-full flex flex-col overflow-hidden rounded-[16px] bg-white border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-shadow"
            >
              <div className="relative h-56 md:h-64 overflow-hidden">
                <motion.img
                  variants={{ hover: { scale: 1.06 } }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  src={cs.image}
                  alt={`${cs.client} — ${cs.category}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute top-5 left-5 text-xs font-bold tracking-[0.2em] text-white/90">
                  CASE {cs.no}
                </span>
              </div>

              <div className="p-8 md:p-10 flex flex-col flex-1">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB]">
                  {cs.category}
                </span>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#111827] flex items-center gap-2">
                  {cs.client}
                  <ArrowUpRight
                    size={20}
                    className="text-[#6B7280] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#2563EB]"
                  />
                </h3>
                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5">
                  {cs.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm text-[#374151]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB] shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};
