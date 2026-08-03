import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { Section, Overline, Reveal } from "./primitives";
import { EDUCATION } from "../../data/content";

export const Education = () => {
  return (
    <Section id="education" className="py-24 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-4">
          <Reveal>
            <Overline>Education</Overline>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-[#111827] leading-tight">
              The technical foundation.
            </h2>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <Reveal delay={0.1}>
            <div
              className="rounded-[16px] bg-white border border-[#E5E7EB] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
              data-testid="education-card"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <span className="h-14 w-14 rounded-2xl bg-[#EFF6FF] flex items-center justify-center text-[#2563EB] shrink-0">
                  <GraduationCap size={26} />
                </span>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-[#111827]">
                    {EDUCATION.institution}
                  </h3>
                  <p className="mt-1 text-base font-semibold text-[#2563EB]">
                    {EDUCATION.degree}
                  </p>
                </div>
              </div>
              <p className="mt-6 text-base md:text-lg text-[#6B7280] leading-relaxed">
                {EDUCATION.note}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
};
