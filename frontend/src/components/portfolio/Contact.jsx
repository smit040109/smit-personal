import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Send, Mail, Phone, MapPin, Download, Check } from "lucide-react";
import { Section, Overline, Reveal } from "./primitives";
import { CONTACT_AVAILABILITY, PROFILE } from "../../data/content";
import { sendContactMessage } from "../../lib/api";

const initialForm = { name: "", email: "", company: "", subject: "", message: "" };

export const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in your name, email and message.");
      return;
    }
    setSubmitting(true);
    try {
      await sendContactMessage(form);
      toast.success("Message sent — I'll get back to you soon.");
      setForm(initialForm);
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(typeof detail === "string" ? detail : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    "w-full rounded-[12px] bg-[#FAFAFA] border border-[#E5E7EB] px-4 py-3 text-sm text-[#111827] placeholder:text-[#9CA3AF] outline-none transition-all focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]";

  return (
    <Section id="contact" className="py-24 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left */}
        <div className="lg:col-span-5">
          <Reveal>
            <Overline>Contact</Overline>
            <h2 className="mt-5 text-4xl md:text-5xl font-black tracking-tighter text-[#111827] leading-[1.05]">
              Let's build measurable business growth together.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#6B7280]">
                Available for
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {CONTACT_AVAILABILITY.map((a) => (
                  <span
                    key={a}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-3.5 py-1.5 text-sm font-medium text-[#374151]"
                  >
                    <Check size={13} className="text-[#16A34A]" /> {a}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 space-y-3">
              <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-3 text-[#374151] hover:text-[#2563EB] transition-colors" data-testid="contact-email">
                <Mail size={18} className="text-[#2563EB]" /> {PROFILE.email}
              </a>
              <a href={`tel:${PROFILE.phone}`} className="flex items-center gap-3 text-[#374151] hover:text-[#2563EB] transition-colors" data-testid="contact-phone">
                <Phone size={18} className="text-[#2563EB]" /> {PROFILE.phone}
              </a>
              <p className="flex items-center gap-3 text-[#374151]">
                <MapPin size={18} className="text-[#2563EB]" /> {PROFILE.location}
              </p>
            </div>
            <a
              href={PROFILE.resumeUrl}
              data-testid="contact-resume-btn"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#111827] border border-[#E5E7EB] transition-all hover:bg-gray-50"
            >
              <Download size={17} /> Download Resume
            </a>
          </Reveal>
        </div>

        {/* Right — form */}
        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <motion.form
              onSubmit={onSubmit}
              data-testid="contact-form"
              className="rounded-[16px] bg-white border border-[#E5E7EB] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">Name *</label>
                  <input name="name" value={form.name} onChange={onChange} placeholder="Your full name" className={inputCls} data-testid="contact-input-name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">Email *</label>
                  <input name="email" type="email" value={form.email} onChange={onChange} placeholder="you@company.com" className={inputCls} data-testid="contact-input-email" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">Company</label>
                  <input name="company" value={form.company} onChange={onChange} placeholder="Company name" className={inputCls} data-testid="contact-input-company" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">Subject</label>
                  <input name="subject" value={form.subject} onChange={onChange} placeholder="What's this about?" className={inputCls} data-testid="contact-input-subject" />
                </div>
              </div>
              <div className="mt-5">
                <label className="block text-sm font-medium text-[#374151] mb-2">Message *</label>
                <textarea name="message" value={form.message} onChange={onChange} rows={5} placeholder="Tell me a little about your goals..." className={`${inputCls} resize-none`} data-testid="contact-input-message" />
              </div>
              <button
                type="submit"
                disabled={submitting}
                data-testid="contact-submit-button"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending..." : "Send Message"}
                {!submitting && <Send size={17} />}
              </button>
            </motion.form>
          </Reveal>
        </div>
      </div>
    </Section>
  );
};
