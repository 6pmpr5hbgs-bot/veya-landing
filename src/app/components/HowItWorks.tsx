"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, AlertTriangle, BarChart3 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Analyze Reviews",
    description:
      "Reads thousands of comments, ratings, and review timelines. Surfaces what buyers actually experienced — not just the star average.",
    color: "violet",
    detail: "74% positive · 2,400+ reviews parsed",
  },
  {
    number: "02",
    icon: AlertTriangle,
    title: "Detect Fake Patterns",
    description:
      "Flags suspicious review bursts, incentive signals, and manipulation attempts. Trust the product, not the theater.",
    color: "amber",
    detail: "Review spike detected · 3 risk signals found",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Compare Prices",
    description:
      "Scans marketplaces for matching products, bundles, shipping costs, and cheaper alternatives. Finds the real best deal.",
    color: "emerald",
    detail: "87/100 alternative · Save 913 ₽",
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string; icon: string }> = {
  violet: {
    bg: "bg-violet-500/8",
    border: "border-violet-500/20",
    text: "text-violet-300",
    glow: "shadow-[0_0_40px_rgba(139,92,246,0.15)]",
    icon: "bg-violet-500/15 text-violet-400",
  },
  amber: {
    bg: "bg-amber-500/8",
    border: "border-amber-500/20",
    text: "text-amber-300",
    glow: "shadow-[0_0_40px_rgba(245,158,11,0.12)]",
    icon: "bg-amber-500/15 text-amber-400",
  },
  emerald: {
    bg: "bg-emerald-500/8",
    border: "border-emerald-500/20",
    text: "text-emerald-300",
    glow: "shadow-[0_0_40px_rgba(16,185,129,0.12)]",
    icon: "bg-emerald-500/15 text-emerald-400",
  },
};

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" ref={ref} className="relative py-32 overflow-hidden">
      {/* bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D12] via-[#0f0f18] to-[#0D0D12]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-600/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] mb-4">
            <span className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">How it works</span>
          </div>
          <h2 className="text-[36px] sm:text-[48px] font-black text-white leading-tight">
            Three steps to{" "}
            <span className="gradient-text">smarter decisions</span>
          </h2>
          <p className="mt-4 text-[16px] text-white/35 max-w-lg mx-auto leading-relaxed">
            VEYA works in the background while you browse, turning raw marketplace data into actionable intelligence.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {steps.map((step, i) => {
            const c = colorMap[step.color];
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={`relative group rounded-2xl border ${c.border} bg-[#111118] p-6 overflow-hidden hover:${c.glow} transition-shadow duration-500`}
              >
                {/* Shine */}
                <div className={`absolute inset-0 ${c.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent" />

                {/* Step number */}
                <div className="relative">
                  <span className={`text-[11px] font-black tracking-widest ${c.text} opacity-40`}>
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className={`relative mt-4 mb-5 w-10 h-10 rounded-xl ${c.icon} flex items-center justify-center`}>
                  <Icon size={18} />
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-[18px] font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-[14px] text-white/40 leading-relaxed mb-4">{step.description}</p>

                  {/* Detail chip */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${c.border} ${c.bg}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${c.text} opacity-60`} style={{ background: "currentColor" }} />
                    <span className={`text-[11px] font-medium ${c.text} opacity-70`}>{step.detail}</span>
                  </div>
                </div>

                {/* Arrow connector (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-5 h-5 rounded-full bg-[#111118] border border-white/[0.08] flex items-center justify-center">
                      <svg viewBox="0 0 8 8" className="w-3 h-3 text-white/20">
                        <path d="M1 4h6M4 1l3 3-3 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
