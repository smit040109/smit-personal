import { motion } from "framer-motion";
import { Target, BarChart3, Search, Sparkles } from "lucide-react";
import { Section, Overline, Reveal } from "./primitives";
import { EXPERTISE_GROUPS } from "../../data/content";

const ICONS = { Target, BarChart3, Search, Sparkles };

export const Expertise = () => {
  return (
    <Section id="expertise" className="py-24 md:py-32">
      <Reveal>
        <Overline>Expertise</Overline>
        <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-[#111827] leading-tight max-w-2xl">
          A full-funnel skill set across performance, analytics and search.
        </h2>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
        {EXPERTISE_GROUPS.map((group, i) => {
          const Icon = ICONS[group.icon] || Target;
          return (
            <Reveal key={group.title} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                data-testid={`expertise-card-${i}`}
                className="h-full rounded-[16px] bg-white border border-[#E5E7EB] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <span className="h-12 w-12 rounded-2xl bg-[#EFF6FF] flex items-center justify-center text-[#2563EB]">
                    <Icon size={22} />
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#111827]">
                    {group.title}
                  </h3>
                </div>
                <div className="mt-7 flex flex-wrap gap-2.5">
                  {group.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-[#E5E7EB] bg-[#FAFAFA] px-3.5 py-1.5 text-sm font-medium text-[#374151] transition-colors hover:border-[#2563EB]/40 hover:text-[#2563EB]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
};
