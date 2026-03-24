export function Footer() {
  return (
    <footer className="py-12 md:py-16 px-6 md:px-12 border-t border-white/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
        <div className="flex flex-col gap-2 items-center md:items-start">
          <span className="text-lg md:text-xl font-light tracking-[0.2em] text-[#2d3436]">VALYGATE</span>
          <span className="text-[10px] text-[#7d8da1] uppercase tracking-widest">© 2026 Valygate</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          <a className="text-[10px] font-medium tracking-widest text-[#7d8da1] hover:text-[#44474a] uppercase transition-colors" href="#">
            Docs
          </a>
          <a className="text-[10px] font-medium tracking-widest text-[#7d8da1] hover:text-[#44474a] uppercase transition-colors" href="#">
            GitHub
          </a>
          <a className="text-[10px] font-medium tracking-widest text-[#7d8da1] hover:text-[#44474a] uppercase transition-colors" href="#">
            Security
          </a>
          <a className="text-[10px] font-medium tracking-widest text-[#7d8da1] hover:text-[#44474a] uppercase transition-colors" href="#">
            Status
          </a>
        </div>
        
        <div className="flex items-center gap-4 neo-pressed px-5 py-2.5 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-300 glow-blue"></div>
          <span className="text-[9px] font-medium text-[#7d8da1] tracking-widest uppercase">Systems Active</span>
        </div>
      </div>
    </footer>
  )
}
