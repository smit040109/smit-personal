import { motion } from "framer-motion";

// Reusable scroll-triggered reveal: fade up + subtle scale.
export const Reveal = ({ children, delay = 0, y = 24, className = "", once = true }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y, scale: 0.98 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once, margin: "-80px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// Section wrapper with consistent container + id anchor.
export const Section = ({ id, className = "", children }) => (
  <section id={id} className={`scroll-mt-24 ${className}`}>
    <div className="max-w-7xl mx-auto px-6 md:px-12">{children}</div>
  </section>
);

export const Overline = ({ children, className = "" }) => (
  <span
    className={`text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] ${className}`}
    data-testid="section-overline"
  >
    {children}
  </span>
);
