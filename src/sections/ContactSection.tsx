import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Mail, Link as LinkIcon } from "lucide-react";
import { ParallaxCard } from "../components/ui/ParallaxCard";
import { contactData } from "../data/portfolioData";
import { SectionIntro } from "../components/layout/SectionIntro";
import { SectionShell } from "../components/layout/SectionShell";
import { fadeUp, viewportOnce } from "../utils/motion";

type ContactValues = {
  name: string;
  email: string;
  company: string;
  message: string;
};

type ContactErrors = Partial<Record<keyof ContactValues, string>>;

const initialValues: ContactValues = {
  name: "",
  email: "",
  company: "",
  message: "",
};

export function ContactSection() {
  const [values, setValues] = useState<ContactValues>(initialValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const links = useMemo(
    () => [
      { label: contactData.email, href: `mailto:${contactData.email}`, icon: Mail },
      { label: "LinkedIn Profile", href: contactData.linkedin, icon: Linkedin },
      { label: "Portfolio Website", href: contactData.portfolio, icon: LinkIcon },
    ],
    [],
  );

  const validate = (input: ContactValues) => {
    const nextErrors: ContactErrors = {};

    if (!input.name.trim()) nextErrors.name = "Please enter your name.";
    if (!input.email.trim()) {
      nextErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!input.message.trim()) {
      nextErrors.message = "Please share a short message.";
    } else if (input.message.trim().length < 20) {
      nextErrors.message = "Please add a little more detail so the message is useful.";
    }

    return nextErrors;
  };

  const handleChange =
    (field: keyof ContactValues) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((current) => ({ ...current, [field]: event.target.value }));
      setErrors((current) => ({ ...current, [field]: undefined }));
      setSubmitted(false);
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitted(true);
    setValues(initialValues);
  };

  return (
    <SectionShell id="contact">
      <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr]">
        <div>
          <SectionIntro
            eyebrow="Contact"
            title="For digital banking, product, and business transformation conversations."
            description="Direct contact details are now connected to the live email, LinkedIn profile, and portfolio website from the current CV profile."
          />
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-10 space-y-4"
          >
            {links.map((link) => {
              const Icon = link.icon;

              return (
                <ParallaxCard key={link.label} intensity={12}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    className="flex items-center gap-4 rounded-[1.6rem] border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-ivory transition-colors hover:border-gold/35 hover:text-gold"
                  >
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-gold/20 bg-gold/10 text-gold">
                      <Icon size={18} />
                    </span>
                    <span>{link.label}</span>
                  </a>
                </ParallaxCard>
              );
            })}
          </motion.div>
        </div>

        <ParallaxCard intensity={26}>
          <motion.form
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 shadow-luxe"
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                label="Name"
                value={values.name}
                onChange={handleChange("name")}
                error={errors.name}
                placeholder="Your name"
              />
              <FormField
                label="Email"
                value={values.email}
                onChange={handleChange("email")}
                error={errors.email}
                placeholder="your@email.com"
                type="email"
              />
            </div>
            <div className="mt-5">
              <FormField
                label="Company / Team"
                value={values.company}
                onChange={handleChange("company")}
                error={errors.company}
                placeholder="Organization or team"
              />
            </div>
            <div className="mt-5">
              <FormField
                label="Message"
                value={values.message}
                onChange={handleChange("message")}
                error={errors.message}
                placeholder="Share the opportunity, collaboration idea, or context."
                textarea
              />
            </div>
            <button
              type="submit"
              className="mt-8 inline-flex rounded-full border border-gold bg-gold px-6 py-3 text-sm uppercase tracking-[0.25em] text-obsidian transition-transform hover:-translate-y-0.5"
            >
              Send Inquiry
            </button>
            <p className="mt-4 text-sm leading-7 text-smoke">
              {submitted
                ? "Thanks. This demo form has passed validation and is ready to connect to your preferred email or backend service."
                : "Form validation is active. You can later connect this to Formspree, EmailJS, Resend, or a custom backend."}
            </p>
          </motion.form>
        </ParallaxCard>
      </div>
    </SectionShell>
  );
}

type FormFieldProps = {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  placeholder: string;
  type?: string;
  textarea?: boolean;
};

function FormField({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  textarea = false,
}: FormFieldProps) {
  const sharedProps = {
    value,
    onChange,
    placeholder,
    className:
      "w-full rounded-[1.3rem] border border-white/10 bg-black/35 px-4 py-3 text-base text-ivory outline-none transition-colors placeholder:text-smoke focus:border-gold/45",
  };

  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-smoke">{label}</span>
      {textarea ? (
        <textarea {...sharedProps} rows={6} />
      ) : (
        <input {...sharedProps} type={type} />
      )}
      {error ? <span className="mt-2 block text-sm text-[#d6a17a]">{error}</span> : null}
    </label>
  );
}
