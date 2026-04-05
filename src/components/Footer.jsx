import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-leeds-navy text-white/60 border-t-4 border-leeds-gold mt-8">
      <div className="max-w-screen-xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://media.base44.com/images/public/user_69d18244733d4a057f86fdd2/b6d5a3225_image.png"
                alt="LUSS"
                className="h-10 w-10 rounded-full"
              />
              <span className="font-archivo text-white text-base tracking-tight">LEEDS SVERIGE</span>
            </div>
            <p className="font-inter text-xs text-white/40 leading-relaxed">
              Leeds United Supporters Sweden.<br />
              Svenska röster. Leeds-hjärtan.
            </p>
          </div>

          {/* Föreningen */}
          <div>
            <h4 className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase mb-3">
              Föreningen
            </h4>
            <nav className="space-y-2">
              <Link to="/om-oss" className="block font-inter text-xs hover:text-white transition-colors">Om Leeds Sverige</Link>
              <Link to="/historia" className="block font-inter text-xs hover:text-white transition-colors">Historia</Link>
              <Link to="/bli-medlem" className="block font-inter text-xs hover:text-white transition-colors">Bli Medlem</Link>
              <Link to="/matchtraffar" className="block font-inter text-xs hover:text-white transition-colors">Matchträffar</Link>
              <Link to="/podd" className="block font-inter text-xs hover:text-white transition-colors">LUSS-Podd</Link>
              <Link to="/kontakt" className="block font-inter text-xs hover:text-white transition-colors">Kontakta Oss</Link>
            </nav>
          </div>

          {/* Leeds FC */}
          <div>
            <h4 className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase mb-3">
              Leeds FC
            </h4>
            <nav className="space-y-2">
              <Link to="/matchschema" className="block font-inter text-xs hover:text-white transition-colors">Matchschema</Link>
              <Link to="/nyheter" className="block font-inter text-xs hover:text-white transition-colors">Nyheter</Link>
              <Link to="/forum" className="block font-inter text-xs hover:text-white transition-colors">Forum</Link>
            </nav>
          </div>

          {/* Externt */}
          <div>
            <h4 className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase mb-3">
              Externt
            </h4>
            <nav className="space-y-2">
              <a href="https://www.leedsunited.com" target="_blank" rel="noopener noreferrer" className="block font-inter text-xs hover:text-white transition-colors">leedsunited.com</a>
              <a href="https://www.laget.se/LUSS/" target="_blank" rel="noopener noreferrer" className="block font-inter text-xs hover:text-white transition-colors">laget.se/LUSS</a>
              <a href="https://www.lusn.co.uk/leeds-united-supporters-sweden" target="_blank" rel="noopener noreferrer" className="block font-inter text-xs hover:text-white transition-colors">LUSN</a>
              <a href="https://www.facebook.com/LeedsSweden" target="_blank" rel="noopener noreferrer" className="block font-inter text-xs hover:text-white transition-colors">Facebook</a>
            </nav>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-inter text-[11px] text-white/30">
            © {new Date().getFullYear()} Leeds Sverige (LUSS). Ej officiellt ansluten till Leeds United FC.
          </p>
          <div className="h-1 w-20 scarf-bar rounded-full opacity-60" />
        </div>
      </div>
    </footer>
  );
}
