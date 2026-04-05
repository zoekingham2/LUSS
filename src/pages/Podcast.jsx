import { Link } from "react-router-dom";

const EPISODES_PLACEHOLDER = [
  {
    title: "LUSS-Podden – Leeds inför säsongen",
    desc: "Vi går igenom truppen, värvningarna och förväntningarna inför årets säsong.",
    url: "https://soundcloud.com/luss-podd",
  },
  {
    title: "LUSS-Podden – Matchanalys och snack",
    desc: "Veckans avsnitt med matchgenomgång och diskussion kring LUFC:s spel.",
    url: "https://soundcloud.com/luss-podd",
  },
];

export default function Podcast() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="bg-leeds-navy px-8 py-10 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg, #FFCD00 0, #FFCD00 1px, transparent 0, transparent 50%)", backgroundSize: "10px 10px" }} />
        <div className="relative z-10">
          <div className="inline-block bg-leeds-gold px-3 py-1 mb-3">
            <span className="font-archivo text-leeds-navy text-[11px] tracking-[0.15em] uppercase">Podcast</span>
          </div>
          <h1 className="font-archivo text-white text-3xl lg:text-4xl tracking-tight mb-3">
            LUSS-PODDEN
          </h1>
          <p className="font-serif text-white/70 max-w-2xl text-lg">
            Vår egen podcast om Leeds United med en svensk vinkel. Lyssna på Soundcloud.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <main className="space-y-6">
          {/* About the podcast */}
          <div className="border border-border">
            <div className="bg-leeds-navy px-4 py-2">
              <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">Om Podden</span>
            </div>
            <div className="p-6 bg-white font-serif text-base leading-relaxed text-foreground space-y-3">
              <p>
                LUSS-Podden är föreningens egen podcast som produceras av och för svenska Leeds-fans. Här diskuterar vi matcher, spelartransaktioner, klubbnyheter och allt annat som rör Leeds United – med en tydlig svensk vinkel.
              </p>
              <p>
                Podden finns tillgänglig på Soundcloud. Prenumerera för att alltid få de senaste avsnitten direkt.
              </p>
              <a
                href="https://soundcloud.com/luss-podd"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#FF5500] text-white font-archivo text-sm tracking-wider px-5 py-2.5 hover:bg-[#FF5500]/90 transition-colors mt-2"
              >
                LYSSNA PÅ SOUNDCLOUD →
              </a>
            </div>
          </div>

          {/* Episodes placeholder */}
          <div className="border border-border">
            <div className="bg-leeds-navy px-4 py-2">
              <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">Avsnitt</span>
            </div>
            <div className="divide-y divide-border">
              {EPISODES_PLACEHOLDER.map((ep, i) => (
                <div key={i} className="p-5 bg-white flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#FF5500] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white font-archivo text-sm">▶</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-inter text-sm font-bold text-leeds-navy leading-tight">{ep.title}</div>
                    <div className="font-serif text-sm text-muted-foreground mt-1">{ep.desc}</div>
                    <a
                      href={ep.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 font-inter text-xs font-semibold text-leeds-navy hover:text-leeds-gold transition-colors"
                    >
                      Lyssna →
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-muted/20 text-center">
              <a
                href="https://soundcloud.com/luss-podd"
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-xs font-semibold text-leeds-navy hover:text-leeds-gold transition-colors uppercase tracking-wider"
              >
                Se alla avsnitt på Soundcloud →
              </a>
            </div>
          </div>
        </main>

        <aside className="space-y-4">
          <div className="bg-[#FF5500] p-5 text-center">
            <div className="font-archivo text-white text-2xl tracking-tight mb-1">☁</div>
            <div className="font-archivo text-white text-sm tracking-wider mb-2">SOUNDCLOUD</div>
            <a
              href="https://soundcloud.com/luss-podd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#FF5500] font-archivo text-xs tracking-wider px-4 py-2 hover:bg-white/90 transition-colors"
            >
              FÖLJ OSS →
            </a>
          </div>

          <div className="border border-border">
            <div className="bg-leeds-navy px-4 py-2">
              <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">Snabblänkar</span>
            </div>
            <div className="divide-y divide-border bg-white">
              {[
                { label: "Om Oss", path: "/om-oss" },
                { label: "Nyheter", path: "/nyheter" },
                { label: "Forum", path: "/forum" },
                { label: "Kontakta Oss", path: "/kontakt" },
              ].map(({ label, path }) => (
                <Link
                  key={label}
                  to={path}
                  className="block px-4 py-3 font-inter text-sm font-semibold text-leeds-navy hover:text-leeds-gold hover:bg-muted/30 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
