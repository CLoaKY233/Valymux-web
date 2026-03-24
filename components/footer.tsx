import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-12 md:py-16 px-6 md:px-12 border-t border-white/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-lg font-light tracking-[0.2em] text-[#2d3436]">VALYGATE</Link>
            <p className="text-xs text-[#7d8da1] font-light mt-3 leading-relaxed">
              The simple gateway for developers building with AI providers.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-[10px] font-medium tracking-widest text-[#44474a] uppercase mb-4">Product</h4>
            <div className="flex flex-col gap-2.5">
              <Link className="text-xs font-light text-[#7d8da1] hover:text-[#44474a] transition-colors" href="/product">How It Works</Link>
              <Link className="text-xs font-light text-[#7d8da1] hover:text-[#44474a] transition-colors" href="/security">Security</Link>
              <Link className="text-xs font-light text-[#7d8da1] hover:text-[#44474a] transition-colors" href="/roadmap">Roadmap</Link>
            </div>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-[10px] font-medium tracking-widest text-[#44474a] uppercase mb-4">Community</h4>
            <div className="flex flex-col gap-2.5">
              <Link className="text-xs font-light text-[#7d8da1] hover:text-[#44474a] transition-colors" href="/open-source">Open Source</Link>
              <a className="text-xs font-light text-[#7d8da1] hover:text-[#44474a] transition-colors" href="https://github.com/cloaky233/Valygate" target="_blank" rel="noopener noreferrer">GitHub</a>
              <Link className="text-xs font-light text-[#7d8da1] hover:text-[#44474a] transition-colors" href="/faq">FAQ</Link>
            </div>
          </div>

          {/* Get Started */}
          <div>
            <h4 className="text-[10px] font-medium tracking-widest text-[#44474a] uppercase mb-4">Get Started</h4>
            <div className="flex flex-col gap-2.5">
              <Link className="text-xs font-light text-[#7d8da1] hover:text-[#44474a] transition-colors" href="/waitlist">Join Waitlist</Link>
              <a className="text-xs font-light text-[#7d8da1] hover:text-[#44474a] transition-colors" href="https://github.com/cloaky233/Valygate" target="_blank" rel="noopener noreferrer">Star on GitHub</a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/15">
          <span className="text-[10px] text-[#7d8da1] uppercase tracking-widest">© 2026 Valygate</span>
          <div className="flex items-center gap-4 neo-pressed px-5 py-2.5 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-300 glow-blue" />
            <span className="text-[9px] font-medium text-[#7d8da1] tracking-widest uppercase">Systems Active</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
