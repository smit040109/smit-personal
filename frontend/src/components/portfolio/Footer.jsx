import { Linkedin, Twitter, Instagram, ArrowUp } from "lucide-react";
import { PROFILE, NAV_LINKS } from "../../data/content";
import { scrollToSection } from "../../hooks/useLenis";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[#E5E7EB] bg-[#FAFAFA]" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <button onClick={() => scrollToSection("home")} className="flex items-center gap-2">
              <span className="h-9 w-9 rounded-full bg-[#111827] text-white flex items-center justify-center text-sm font-bold">
                SP
              </span>
              <span className="text-base font-semibold tracking-tight text-[#111827]">
                {PROFILE.name}
              </span>
            </button>
            <p className="mt-3 text-sm text-[#6B7280] max-w-xs">{PROFILE.title}</p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToSection(l.id)}
                className="text-sm text-[#6B7280] hover:text-[#111827] transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href={PROFILE.socials.linkedin} aria-label="LinkedIn" className="h-10 w-10 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center text-[#6B7280] hover:text-[#2563EB] hover:border-[#2563EB]/40 transition-colors" data-testid="footer-linkedin">
              <Linkedin size={18} />
            </a>
            <a href={PROFILE.socials.twitter} aria-label="Twitter" className="h-10 w-10 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center text-[#6B7280] hover:text-[#2563EB] hover:border-[#2563EB]/40 transition-colors" data-testid="footer-twitter">
              <Twitter size={18} />
            </a>
            <a href={PROFILE.socials.instagram} aria-label="Instagram" className="h-10 w-10 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center text-[#6B7280] hover:text-[#2563EB] hover:border-[#2563EB]/40 transition-colors" data-testid="footer-instagram">
              <Instagram size={18} />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#6B7280]">
            &copy; {year} {PROFILE.name}. All rights reserved.
          </p>
          <button
            onClick={() => scrollToSection("home")}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#6B7280] hover:text-[#111827] transition-colors"
            data-testid="footer-back-to-top"
          >
            Back to top <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
};
