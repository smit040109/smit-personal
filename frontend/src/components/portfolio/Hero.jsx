import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { HERO, PROFILE } from "../../data/content";
import { scrollToSection } from "../../hooks/useLenis";

const lineVariants = {
  hidden: { y: "110%" },
  show: (i) => ({
    y: "0%",
    transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yPortrait = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      data-testid="hero-section"
    >
      {/* Subtle premium gradient */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#FAFAFA] via-[#F3F4F6] to-[#EFF6FF]" />
      {/* Parallax geometric background image */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHdoaXRlJTIwZ2VvbWV0cmljfGVufDB8fHx8MTc4NTcyOTcxNHww&ixlib=rb-4.1.0&q=85"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-[0.10] mix-blend-multiply"
        />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-28 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
      >
        {/* Left — copy */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white/70 backdrop-blur px-4 py-1.5 mb-8"
          >
            <span className="h-2 w-2 rounded-full bg-[#16A34A] animate-pulse" />
            <span className="text-xs font-medium text-[#6B7280]">
              Available for new opportunities
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-black tracking-tighter text-[#111827] leading-[1.04]">
            {HERO.headlineLines.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  custom={i}
                  variants={lineVariants}
                  initial="hidden"
                  animate="show"
                  className="block"
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 flex flex-wrap gap-x-3 gap-y-2 max-w-2xl"
            data-testid="hero-disciplines"
          >
            {HERO.disciplines.map((d, i) => (
              <span key={d} className="text-sm md:text-base font-medium text-[#6B7280]">
                {d}
                {i < HERO.disciplines.length - 1 && (
                  <span className="ml-3 text-[#2563EB]">/</span>
                )}
              </span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-8 max-w-xl text-base md:text-lg text-[#6B7280] leading-relaxed"
          >
            {HERO.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={() => scrollToSection("experience")}
              data-testid="hero-view-experience-btn"
              className="group inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25"
            >
              View Experience
              <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              data-testid="hero-contact-btn"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#111827] border border-[#E5E7EB] transition-all hover:bg-gray-50 hover:border-[#d1d5db]"
            >
              Contact Me
            </button>
            <a
              href={PROFILE.resumeUrl}
              download="Smit-Patel-Resume.pdf"
              data-testid="hero-resume-btn"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-[#2563EB] border border-transparent hover:border-[#2563EB]/30 hover:bg-[#EFF6FF] transition-all"
            >
              <Download size={17} />
              Download Resume
            </a>
          </motion.div>
        </div>

        {/* Right — portrait */}
        <div className="lg:col-span-5 order-first lg:order-last">
          <motion.div
            style={{ y: yPortrait }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto max-w-sm lg:max-w-none"
          >
            {/* spotlight glow */}
            <div className="absolute -inset-6 rounded-[32px] bg-gradient-to-b from-[#2563EB]/10 via-transparent to-[#16A34A]/5 blur-2xl" />
            {/* framed portrait */}
            <div className="relative rounded-[24px] overflow-hidden border border-[#E5E7EB] bg-gradient-to-b from-white to-[#EFF6FF] shadow-[0_30px_60px_rgb(37,99,235,0.12)]">
              <img
                src={PROFILE.photo}
                alt="Smit Patel — Digital Marketing & Growth Specialist"
                className="w-full h-[380px] md:h-[460px] lg:h-[520px] object-cover object-top"
              />
              {/* name plate */}
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/80 backdrop-blur-md border border-white/60 px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold tracking-tight text-[#111827]">{PROFILE.name}</p>
                  <p className="text-xs text-[#6B7280]">{PROFILE.location}</p>
                </div>
                <span className="text-xs font-semibold text-[#2563EB]">Open to work</span>
              </div>
            </div>
            {/* floating accent card */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-5 top-8 hidden md:block rounded-2xl bg-white border border-[#E5E7EB] shadow-lg px-4 py-3"
            >
              <p className="text-xs text-[#6B7280]">Focus</p>
              <p className="text-sm font-bold text-[#111827]">Performance & SEO</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
