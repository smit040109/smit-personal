import { motion } from "framer-motion";
import { TrendingUp, Globe, Cpu, GraduationCap } from "lucide-react";
import { Section, Overline, Reveal } from "./primitives";
import { WHY_HIRE_ME } from "../../data/content";

const ICONS = { TrendingUp, Globe, Cpu, GraduationCap };

export const WhyHireMe = () => {
  return (
    <Section id="why" className="py-24 md:py-32">
      <Reveal>
        <Overline>Why Hire Me</Overline>
        <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-[#111827] leading-tight max-w-2xl">
          What I bring to a growing marketing team.
        </h2>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
        {WHY_HIRE_ME.map((card, i) => {
          const Icon = ICONS[card.icon] || TrendingUp;
          return (
            <Reveal key={card.title} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                data-testid={`why-card-${i}`}
                className="h-full rounded-[16px] bg-white border border-[#E5E7EB] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-shadow"
              >
                <span className="h-12 w-12 rounded-2xl bg-[#111827] flex items-center justify-center text-white">
                  <Icon size={22} />
                </span>
                <h3 className="mt-6 text-xl md:text-2xl font-semibold tracking-tight text-[#111827]">
                  {card.title}
                </h3>
                <p className="mt-3 text-base md:text-lg text-[#6B7280] leading-relaxed">
                  {card.text}
                </p>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
};
