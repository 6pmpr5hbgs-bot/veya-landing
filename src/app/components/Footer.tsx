import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#0D0D12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <Image
              src="/logo.png"
              alt="VEYA"
              width={28}
              height={35}
              className="object-contain opacity-60 hover:opacity-90 transition-opacity"
            />
          </a>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-[12px] text-white/30 hover:text-white/60 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-[12px] text-white/30 hover:text-white/60 transition-colors">
              Terms of Service
            </a>
          </div>

          {/* Copyright */}
          <p className="text-[12px] text-white/20">
            © {new Date().getFullYear()} VEYA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
