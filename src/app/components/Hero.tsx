"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, TrendingDown } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

/* ── Trust Score Arc ── */
function ScoreRing({ score }: { score: number }) {
  const r = 52;
  const circumference = 2 * Math.PI * r;
  const dash = (score / 100) * circumference * 0.78; // 78% of circle visible
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <defs>
        <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>
      </defs>
      {/* Track */}
      <circle
        cx="60" cy="60" r={r}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={`${circumference * 0.78} ${circumference}`}
        strokeDashoffset="0"
        transform="rotate(130 60 60)"
      />
      {/* Fill */}
      <motion.circle
        cx="60" cy="60" r={r}
        fill="none"
        stroke="url(#arcGrad)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circumference}`}
        strokeDashoffset="0"
        transform="rotate(130 60 60)"
        initial={{ strokeDasharray: `0 ${circumference}` }}
        animate={{ strokeDasharray: `${dash} ${circumference}` }}
        transition={{ duration: 1.4, delay: 1.2, ease: "easeOut" }}
        style={{ filter: "drop-shadow(0 0 8px rgba(139,92,246,0.8))" }}
      />
    </svg>
  );
}

/* ── Progress Bar ── */
function ProgressBar({ value, color = "purple", delay = 0 }: { value: number; color?: string; delay?: number }) {
  const colors: Record<string, string> = {
    purple: "from-violet-500 to-purple-400",
    green: "from-emerald-500 to-green-400",
    blue: "from-blue-500 to-cyan-400",
  };
  return (
    <div className="h-[3px] w-full rounded-full bg-white/[0.07] overflow-hidden">
      <motion.div
        className={`h-full rounded-full bg-gradient-to-r ${colors[color]}`}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.2, delay: 1 + delay, ease: "easeOut" }}
      />
    </div>
  );
}

/* ── Main Dashboard Card ── */
function DashboardCard() {
  return (
    <div className="relative w-full max-w-[680px] mx-auto">
      {/* Glow behind */}
      <div className="absolute inset-0 blur-[80px] bg-violet-600/20 rounded-3xl scale-90 translate-y-8" />

      {/* Main panel */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative rounded-2xl border border-white/[0.1] bg-[#13131c]/90 backdrop-blur-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
      >
        {/* Shine */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07]">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 text-violet-400">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M8 1L10.5 6H15L11 9.5L12.5 14.5L8 11.5L3.5 14.5L5 9.5L1 6H5.5L8 1Z" fill="currentColor" opacity="0.8"/>
              </svg>
            </div>
            <span className="text-[11px] font-semibold tracking-widest text-white/40 uppercase">VEYA</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-white/30">AI analyzed 1h ago</span>
          </div>
        </div>

        {/* Score + product info */}
        <div className="flex items-start gap-4 px-5 pt-4 pb-3">
          <div className="flex-shrink-0">
            <div className="text-[42px] font-black leading-none text-white">72</div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 font-medium border border-amber-500/20">
                Wait
              </span>
              <span className="text-[10px] text-white/25">•</span>
              <span className="text-[10px] text-emerald-400/80">Enough data</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-medium text-white/80 leading-snug line-clamp-2">
              SKIN1004 Centella SPF50 Sun Serum SPF50+
            </p>
            <p className="text-[15px] font-bold text-violet-400 mt-1">922 ₽</p>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-white/[0.07] px-5">
          {["Verdict", "Trust", "Price", "Compare"].map((t, i) => (
            <button
              key={t}
              className={`px-3 py-2 text-[11px] font-semibold border-b-2 transition-colors ${
                i === 0
                  ? "border-violet-500 text-violet-400"
                  : "border-transparent text-white/25 hover:text-white/50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Body: 2-col */}
        <div className="grid grid-cols-2 gap-0 divide-x divide-white/[0.06]">
          {/* Left: reviews */}
          <div className="p-4 space-y-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25">What buyers say</p>
            <p className="text-[12px] text-white/50">
              <span className="text-emerald-400 font-semibold">74%</span> of reviews — positive
            </p>
            <div className="space-y-1.5">
              <p className="text-[9px] uppercase tracking-widest text-white/25">Most praised</p>
              {["30 mention ease of use", "20 mention visible effect"].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-1 h-1 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[10px] text-white/45">{t}</span>
                </div>
              ))}
            </div>
            <div className="space-y-1.5">
              <p className="text-[9px] uppercase tracking-widest text-white/25">Criticisms</p>
              {["10 mention low quantity", "10 mention oily skin"].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-1 h-1 rounded-full bg-amber-400" />
                  </div>
                  <span className="text-[10px] text-white/45">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: score ring + trust */}
          <div className="p-4 space-y-3">
            <div className="relative w-24 h-24 mx-auto">
              <ScoreRing score={72} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[18px] font-black text-white">72</span>
                <span className="text-[8px] text-white/30">out of 100</span>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { label: "Product trust", value: 85, color: "purple" },
                { label: "Seller trust", value: 90, color: "green" },
                { label: "Review trust", value: 70, color: "blue" },
              ].map((item, i) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[9px] text-white/35">{item.label}</span>
                    <span className="text-[9px] font-semibold text-white/60">{item.value}%</span>
                  </div>
                  <ProgressBar value={item.value} color={item.color} delay={i * 0.15} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Score breakdown footer */}
        <div className="border-t border-white/[0.07] px-4 py-3">
          <p className="text-[9px] uppercase tracking-widest text-white/25 mb-2">Score breakdown</p>
          <div className="flex gap-3">
            {[
              { label: "Reviews", val: "20/30" },
              { label: "Seller", val: "20/25" },
              { label: "Price", val: "25/25" },
              { label: "Discounts", val: "7/20" },
            ].map((item) => (
              <div key={item.label} className="flex-1 text-center">
                <p className="text-[11px] font-bold text-white/70">{item.val}</p>
                <p className="text-[8px] text-white/25 mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Floating side cards ── */}

      {/* Rating comparison — top left */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -left-28 top-8 w-44 rounded-xl border border-white/[0.08] bg-[#16161f]/90 backdrop-blur-xl p-3.5 shadow-[0_16px_40px_rgba(0,0,0,0.6)] hidden lg:block"
      >
        <div className="flex items-center gap-1.5 mb-3">
          <div className="w-3 h-3 text-amber-400">★</div>
          <span className="text-[10px] font-semibold text-white/60">Rating comparison</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-[10px] text-white/40">Marketplace</span>
            <span className="text-[10px] font-bold text-white">4.9</span>
          </div>
          {[
            { label: "Low quantity", val: "-0.2", color: "text-red-400" },
            { label: "Oily skin", val: "-0.2", color: "text-red-400" },
            { label: "Partial seal", val: "-0.1", color: "text-red-400" },
          ].map((r) => (
            <div key={r.label} className="flex justify-between items-center">
              <span className="text-[9px] text-white/30 leading-tight">{r.label}</span>
              <span className={`text-[10px] font-semibold ${r.color}`}>{r.val}</span>
            </div>
          ))}
          <div className="border-t border-white/[0.06] pt-2 flex justify-between items-center">
            <span className="text-[10px] font-semibold text-white/60">VEYA Score</span>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-bold text-white">4</span>
              <span className="text-amber-400 text-[10px]">★★★★</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Best alternative — bottom left */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -left-28 bottom-4 w-48 rounded-xl border border-white/[0.08] bg-[#16161f]/90 backdrop-blur-xl p-3.5 shadow-[0_16px_40px_rgba(0,0,0,0.6)] hidden lg:block"
      >
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-3 h-3 text-amber-400">🏆</div>
          <span className="text-[10px] font-semibold text-white/60">Best alternative</span>
        </div>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-[20px] font-black text-white">87</span>
          <span className="text-[8px] px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 font-medium">/100</span>
          <span className="text-[8px] px-1.5 py-0.5 rounded bg-white/[0.06] text-white/40">Same product</span>
        </div>
        <p className="text-[9px] text-white/50 leading-snug mb-2">
          Skin1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF50+
        </p>
        <p className="text-[14px] font-bold text-violet-400">8.51 USD</p>
        <p className="text-[9px] text-white/30">≈ 783 ₽</p>
        <div className="mt-2 pt-2 border-t border-white/[0.06]">
          <span className="text-[10px] font-semibold text-emerald-400">Save 913 ₽</span>
        </div>
      </motion.div>

      {/* eBay alternatives — right */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute -right-36 top-12 w-48 rounded-xl border border-white/[0.08] bg-[#16161f]/90 backdrop-blur-xl p-3.5 shadow-[0_16px_40px_rgba(0,0,0,0.6)] hidden xl:block"
      >
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-3 h-3 rounded-full bg-blue-500/20 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          </div>
          <span className="text-[10px] font-semibold text-white/60">eBay alternatives</span>
        </div>
        <div className="w-full aspect-video rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/10 mb-2 flex items-center justify-center">
          <div className="w-8 h-12 rounded bg-white/10" />
        </div>
        <p className="text-[9px] text-white/50 leading-snug mb-1">
          Skin1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF50+
        </p>
        <div className="flex items-center gap-1 mb-2">
          <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 font-medium">
            88% match
          </span>
          <span className="text-[8px] text-white/25">Trusted seller</span>
        </div>
        <p className="text-[13px] font-bold text-violet-400">8.51 USD</p>
        <p className="text-[10px] text-blue-400 mt-1 cursor-pointer hover:underline">Open on eBay →</p>
      </motion.div>
    </div>
  );
}

/* ── Hero ── */
export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#0D0D12]" />
        {/* Radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/8 rounded-full blur-[100px]" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0D0D12]" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#0D0D12]/80" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/25 bg-violet-500/8 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-[12px] font-medium text-violet-300">Private beta opening soon</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-center text-[52px] sm:text-[68px] lg:text-[82px] font-black leading-[1.0] tracking-tight mb-4"
        >
          <span className="gradient-text-warm">AI Shopping</span>
          <br />
          <span className="text-white/90">Copilot</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-center text-[22px] sm:text-[28px] font-semibold text-white/30 mb-4"
        >
          Never overpay online again.
        </motion.p>

        {/* Description */}
        <motion.p
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-center text-[15px] sm:text-[17px] text-white/40 max-w-xl leading-relaxed mb-10"
        >
          AI analyzes reviews, detects suspicious patterns, and finds cheaper alternatives
          across marketplaces.
        </motion.p>

        {/* CTA */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-col sm:flex-row items-center gap-3 mb-16"
        >
          <a
            href="#waitlist"
            className="group relative px-7 py-3.5 rounded-xl text-[15px] font-semibold text-white overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-500 blur-lg opacity-0 group-hover:opacity-60 transition-opacity" />
            <span className="relative flex items-center gap-2">
              Join Beta
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          <a
            href="#how-it-works"
            className="px-7 py-3.5 rounded-xl text-[15px] font-semibold text-white/50 hover:text-white border border-white/[0.08] hover:border-white/[0.14] bg-white/[0.03] hover:bg-white/[0.06] transition-all"
          >
            See how it works
          </a>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex items-center gap-6 mb-16 flex-wrap justify-center"
        >
          {[
            { icon: Shield, text: "Scam detection" },
            { icon: Zap, text: "Real-time analysis" },
            { icon: TrendingDown, text: "Price comparison" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-white/30">
              <Icon size={14} className="text-violet-400/60" />
              <span className="text-[12px] font-medium">{text}</span>
            </div>
          ))}
        </motion.div>

        {/* Dashboard visual */}
        <motion.div
          custom={6}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="w-full"
        >
          <DashboardCard />
        </motion.div>
      </div>
    </section>
  );
}
