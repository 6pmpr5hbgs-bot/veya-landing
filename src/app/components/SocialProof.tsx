"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function Counter({ to, suffix = "", duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = to;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, to, duration]);

  const formatted = count >= 1000000
    ? `${(count / 1000000).toFixed(1)}M`
    : count >= 1000
    ? `${(count / 1000).toFixed(0)}K`
    : count.toString();

  return (
    <span ref={ref}>
      {formatted}{suffix}
    </span>
  );
}

const stats = [
  { value: 2400000, label: "Reviews analyzed", suffix: "", description: "Across all supported marketplaces" },
  { value: 180000, label: "Products compared", suffix: "", description: "With real-time price tracking" },
  { value: 12, label: "Marketplaces monitored", suffix: "+", description: "Including Ozon, eBay, Amazon, WB" },
];

const testimonials = [
  {
    text: "Saved 900₽ on my first purchase. VEYA found the exact same sunscreen on eBay for half the price.",
    author: "Early tester, Moscow",
    avatar: "M",
  },
  {
    text: "The fake review detection is incredibly accurate. Caught 3 products I was about to buy from shady sellers.",
    author: "Beta user, St. Petersburg",
    avatar: "A",
  },
  {
    text: "This is what browser extensions should be. Works silently, gives you the data exactly when you need it.",
    author: "Tech reviewer, Novosibirsk",
    avatar: "K",
  },
];

export default function SocialProof() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="social-proof" ref={ref} className="relative py-32 overflow-hidden">
      {/* bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D12] via-[#0c0c14] to-[#0D0D12]" />
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/3 via-transparent to-blue-600/3" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] mb-4">
            <span className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">Built for scale</span>
          </div>
          <h2 className="text-[36px] sm:text-[48px] font-black text-white leading-tight">
            Built for smarter{" "}
            <span className="gradient-text">online shopping</span>
          </h2>
          <p className="mt-4 text-[16px] text-white/35 max-w-lg mx-auto">
            From marketplace giants to niche sellers — VEYA tracks it all so you never have to.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
              className="relative group rounded-2xl border border-white/[0.07] bg-[#111118] p-6 text-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-violet-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="text-[40px] sm:text-[48px] font-black gradient-text leading-none mb-2">
                  <Counter to={stat.value} suffix={stat.suffix} duration={2.5} />
                </div>
                <p className="text-[15px] font-semibold text-white/70 mb-1">{stat.label}</p>
                <p className="text-[12px] text-white/30">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="rounded-2xl border border-white/[0.07] bg-[#111118] p-5"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} viewBox="0 0 12 12" className="w-3 h-3 text-amber-400" fill="currentColor">
                    <path d="M6 1l1.5 3h3l-2.5 2 1 3L6 7.5 3 9l1-3L1.5 4h3L6 1z" />
                  </svg>
                ))}
              </div>
              <p className="text-[13px] text-white/55 leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
                  {t.avatar}
                </div>
                <span className="text-[12px] text-white/35">{t.author}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
