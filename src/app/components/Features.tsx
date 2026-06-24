"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Brain, GitCompare, Package, TrendingDown } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Trust Score",
    description:
      "Composite 0–100 score combining product authenticity, seller reliability, and review quality. One number that tells the real story.",
    tag: "Core",
    mockup: "score",
  },
  {
    icon: Brain,
    title: "AI Review Analysis",
    description:
      "NLP pipeline reads thousands of reviews, extracts sentiment trends, detects fake burst patterns, and surfaces the signal from the noise.",
    tag: "AI-powered",
    mockup: "reviews",
  },
  {
    icon: GitCompare,
    title: "Marketplace Comparison",
    description:
      "Cross-references the same product across Ozon, Wildberries, AliExpress, eBay, and Amazon — accounting for shipping, duties, and bundles.",
    tag: "Multi-market",
    mockup: "compare",
  },
  {
    icon: Package,
    title: "Alternative Products",
    description:
      "When a product is risky or overpriced, VEYA surfaces better-reviewed alternatives with matching specs, often at a fraction of the cost.",
    tag: "Discovery",
    mockup: "alt",
  },
  {
    icon: TrendingDown,
    title: "Price Insights",
    description:
      "Tracks price history, flags suspicious discounts, and calculates the true cost — including hidden fees and shipping surprises.",
    tag: "Analytics",
    mockup: "price",
  },
];

/* Small mockup components for each feature */
function ScoreMockup() {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px]">
        <span className="text-white/30">Trust Score</span>
        <span className="text-violet-400 font-bold">72 / 100</span>
      </div>
      <div className="flex gap-1.5">
        {[85, 90, 70, 35].map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full bg-white/[0.06] rounded-full h-12 relative overflow-hidden flex items-end">
              <motion.div
                className="w-full rounded-full bg-gradient-to-t from-violet-500 to-purple-400"
                initial={{ height: 0 }}
                whileInView={{ height: `${v}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                viewport={{ once: true }}
              />
            </div>
            <span className="text-[8px] text-white/25">{v}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewsMockup() {
  return (
    <div className="space-y-2">
      {[
        { label: "Very positive", pct: 74, color: "bg-emerald-500" },
        { label: "Neutral", pct: 16, color: "bg-white/20" },
        { label: "Negative", pct: 10, color: "bg-red-500/60" },
      ].map((row) => (
        <div key={row.label} className="space-y-1">
          <div className="flex justify-between text-[9px]">
            <span className="text-white/30">{row.label}</span>
            <span className="text-white/50 font-medium">{row.pct}%</span>
          </div>
          <div className="h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${row.color}`}
              initial={{ width: 0 }}
              whileInView={{ width: `${row.pct}%` }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function CompareMockup() {
  return (
    <div className="space-y-1.5">
      {[
        { market: "Ozon", price: "922 ₽", score: 72, active: true },
        { market: "eBay", price: "783 ₽", score: 87, active: false },
        { market: "Amazon", price: "891 ₽", score: 79, active: false },
      ].map((row) => (
        <div
          key={row.market}
          className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[10px] ${
            row.active ? "bg-violet-500/15 border border-violet-500/20" : "bg-white/[0.04]"
          }`}
        >
          <span className={row.active ? "text-violet-300 font-semibold" : "text-white/40"}>{row.market}</span>
          <span className={row.active ? "text-violet-300 font-bold" : "text-white/50"}>{row.price}</span>
          <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${row.score >= 80 ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400"}`}>
            {row.score}
          </span>
        </div>
      ))}
    </div>
  );
}

function AltMockup() {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-white/50 font-medium">Best alternative found</p>
          <p className="text-[13px] font-bold text-emerald-400 mt-0.5">87 / 100</p>
        </div>
        <div className="w-8 h-10 rounded bg-white/[0.06] flex items-center justify-center">
          <Package size={14} className="text-white/20" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Same product
        </span>
        <span className="text-[9px] text-white/30">88% match</span>
      </div>
      <p className="text-[12px] font-bold text-violet-400">Save 913 ₽</p>
    </div>
  );
}

function PriceMockup() {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] text-white/30">
        <span>Price history (30d)</span>
        <span className="text-red-400 font-medium">-58% off</span>
      </div>
      <div className="flex items-end gap-0.5 h-10">
        {[40, 100, 95, 80, 60, 100, 100, 42].map((h, i) => (
          <motion.div
            key={i}
            className={`flex-1 rounded-sm ${i === 7 ? "bg-violet-500" : "bg-white/[0.08]"}`}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            viewport={{ once: true }}
          />
        ))}
      </div>
      <div className="flex justify-between text-[9px]">
        <span className="text-white/25">2,200 ₽ original</span>
        <span className="text-violet-400 font-semibold">922 ₽ now</span>
      </div>
    </div>
  );
}

const mockupMap: Record<string, React.ReactNode> = {
  score: <ScoreMockup />,
  reviews: <ReviewsMockup />,
  compare: <CompareMockup />,
  alt: <AltMockup />,
  price: <PriceMockup />,
};

export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#0D0D12]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f18] via-[#0D0D12] to-[#0D0D12]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] mb-4">
            <span className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">Features</span>
          </div>
          <h2 className="text-[36px] sm:text-[48px] font-black text-white leading-tight">
            Everything you need to{" "}
            <span className="gradient-text">shop with confidence</span>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            const isLarge = i === 0;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.05 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative rounded-2xl border border-white/[0.07] bg-[#111118] overflow-hidden hover:border-violet-500/20 transition-all duration-500 ${
                  isLarge ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 via-transparent to-blue-500/0 group-hover:from-violet-500/5 group-hover:to-blue-500/5 transition-all duration-500" />

                <div className="p-5">
                  {/* Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-xl bg-violet-500/10 flex items-center justify-center">
                      <Icon size={17} className="text-violet-400" />
                    </div>
                    <span className="text-[10px] font-semibold text-white/25 px-2 py-0.5 rounded-full bg-white/[0.05]">
                      {feat.tag}
                    </span>
                  </div>

                  {/* Mockup */}
                  <div className="mb-4 p-3 rounded-xl bg-[#0D0D12] border border-white/[0.05]">
                    {mockupMap[feat.mockup]}
                  </div>

                  <h3 className="text-[16px] font-bold text-white mb-1.5">{feat.title}</h3>
                  <p className="text-[13px] text-white/35 leading-relaxed">{feat.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
