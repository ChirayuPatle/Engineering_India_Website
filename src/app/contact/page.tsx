"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser } from "@/hooks/use-user";
import { siteConfig } from "@/lib/constants";
import { CheckCircle, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { FloatingCloud } from "@/components/landing/FloatingCloud";

export default function ContactPage() {
  const { data: user } = useCurrentUser();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormState((prevState) => ({
        ...prevState,
        name: user.name ?? "",
        email: user.email ?? "",
      }));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.message || "Failed to submit feedback.");
        return;
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormState({ name: "", email: "", message: "" });
      }, 3000);
    } catch (err: any) {
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative w-full overflow-x-hidden bg-[#0F1B40]">
      {/* Hero Section */}
      <section className="relative z-10 flex min-h-[50vh] flex-col items-center justify-center bg-gradient-to-b from-[#6183B1] via-[#9A8EB8] to-[#0F1B40] px-4 pb-20 pt-40 text-center text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto max-w-4xl"
        >
          <h1 className="font-fraunces mb-6 text-4xl font-bold md:text-7xl">
            Get in <span className="text-[#D4EBFF]">Touch</span>
          </h1>
          <p className="mx-auto max-w-xl font-sans text-white/70">
            Have questions about {siteConfig.name}? We'd love to hear from you.
          </p>
        </motion.div>
        <FloatingCloud
          top="20%"
          left="5%"
          speed={0.5}
          cloudNum={1}
          opacity="opacity-30"
        />
        <FloatingCloud
          top="40%"
          left="80%"
          speed={0.8}
          cloudNum={2}
          opacity="opacity-20"
          scale={0.8}
        />
      </section>

      {/* Contact Content */}
      <section className="relative z-20 -mt-10 px-4 py-24 sm:px-6 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <h2 className="font-fraunces text-3xl font-semibold text-white">
                  Contact Information
                </h2>
                <p className="max-w-md font-sans text-white/50">
                  Reach out to us through any of these channels. We're here to
                  help and collaborate.
                </p>
              </div>

              <div className="space-y-8">
                <div className="group flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-all group-hover:border-[#D4EBFF]/30 group-hover:bg-[#D4EBFF]/10">
                    <MapPin className="h-6 w-6 text-[#D4EBFF]" />
                  </div>
                  <div>
                    <h4 className="font-fraunces mb-1 text-lg text-white">
                      Location
                    </h4>
                    <p className="font-sans text-sm text-white/50">
                      Yeshwantrao Chavan College Of Engineering,
                      <br /> Wanadongri, Nagpur
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-all group-hover:border-[#D4EBFF]/30 group-hover:bg-[#D4EBFF]/10">
                    <Mail className="h-6 w-6 text-[#D4EBFF]" />
                  </div>
                  <div>
                    <h4 className="font-fraunces mb-1 text-lg text-white">
                      Email
                    </h4>
                    <p className="font-sans text-sm text-white/50">
                      engineeringindia047@gmail.com
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-all group-hover:border-[#D4EBFF]/30 group-hover:bg-[#D4EBFF]/10">
                    <Phone className="h-6 w-6 text-[#D4EBFF]" />
                  </div>
                  <div>
                    <h4 className="font-fraunces mb-1 text-lg text-white">
                      Phone
                    </h4>
                    <p className="font-sans text-sm text-white/50">
                      (+91) 96236 12124
                      <br />
                      (+91) 7066562938
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="rounded-[40px] border border-white/10 bg-white/5 p-8 backdrop-blur-md md:p-12"
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="mb-6 h-20 w-20 text-green-400" />
                  <h3 className="font-fraunces mb-2 text-2xl text-white">
                    Message Sent!
                  </h3>
                  <p className="font-sans text-white/50">
                    Thank you for reaching out. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <div className="rounded-2xl border border-red-400/30 bg-red-400/20 p-4 text-sm text-red-200">
                      {errorMessage}
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="ml-1 text-[10px] font-bold uppercase tracking-widest text-white/40">
                      Full Name
                    </label>
                    <Input
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      required
                      placeholder="Your name"
                      className="h-12 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:ring-[#6183B1]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 text-[10px] font-bold uppercase tracking-widest text-white/40">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      required
                      placeholder="your@email.com"
                      className="h-12 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:ring-[#6183B1]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 text-[10px] font-bold uppercase tracking-widest text-white/40">
                      Your Message
                    </label>
                    <Textarea
                      rows={5}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      required
                      placeholder="How can we help?"
                      className="min-h-[150px] rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:ring-[#6183B1]"
                    />
                  </div>

                  <Button
                    variant="premium"
                    type="submit"
                    className="h-14 w-full rounded-xl"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <span className="text-base text-[#1D317D]">
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
