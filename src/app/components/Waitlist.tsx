"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, Loader2, Mail } from "lucide-react";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    setState("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setState("success");
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Try again.");
    }
  }

  return (
    <section id="waitlist" className="relative py-32 overflow-hidden">
      {/* bg */}
      <div className="absolute inset-0 bg-[#0D0D12]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D12] via-[#0f0f1a] to-[#0D0D12]" />

      {/* Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-violet-600/12 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[300px] h-[300px] bg-blue-600/8 rounded-full blur-[80px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/25 bg-violet-500/8 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-[12px] font-medium text-violet-300">Private beta opening soon</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-[40px] sm:text-[56px] font-black text-white leading-[1.0] tracking-tight mb-4"
        >
          Shop with an{" "}
          <span className="gradient-text">unfair advantage.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[16px] text-white/35 leading-relaxed mb-10 max-w-xl mx-auto"
        >
          Join the VEYA beta and help shape the future of AI-powered shopping. Early members get
          priority access and influence the product roadmap.
        </motion.p>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <AnimatePresence mode="wait">
            {state === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex flex-col items-center gap-4 px-10 py-8 rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.07]"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 flex items-center justify-center">
                  <CheckCircle size={28} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-[20px] font-bold text-white">You&apos;re on the waitlist!</p>
                  <p className="text-[13px] text-white/40 mt-1.5">
                    We&apos;ll notify you at{" "}
                    <span className="text-white/70 font-medium">{email}</span>
                    {" "}when the beta opens.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <div className="relative flex-1">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrorMsg(""); setState("idle"); }}
                    placeholder="your@email.com"
                    disabled={state === "loading"}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#16161f] border border-white/[0.1] focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 text-[14px] text-white placeholder-white/20 transition-all disabled:opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="group relative px-6 py-3.5 rounded-xl text-[14px] font-semibold text-white overflow-hidden flex-shrink-0 flex items-center gap-2 justify-center disabled:opacity-70 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-500 blur-md opacity-0 group-hover:opacity-50 transition-opacity" />
                  <span className="relative flex items-center gap-2">
                    {state === "loading" ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        Joining...
                      </>
                    ) : (
                      <>
                        Join Beta
                        <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Error */}
          <AnimatePresence>
            {errorMsg && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 text-[13px] text-red-400"
              >
                {errorMsg}
              </motion.p>
            )}
          </AnimatePresence>

          <p className="mt-4 text-[12px] text-white/25">No spam. Unsubscribe anytime. Your email is safe.</p>
        </motion.div>

        {/* Social chips */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex items-center justify-center gap-4 flex-wrap"
        >
          {["Scam protection", "Price intelligence", "Review AI", "Multi-market"].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full border border-white/[0.07] bg-white/[0.02] text-[12px] text-white/30"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
