const QUICK_LINKS = [
  { label: "Bli Medlem", path: "/bli-medlem" },
  { label: "Matchträffar", path: "/matchtraffar" },
  { label: "LUSS-Podd", path: "/podd" },
  { label: "Kontakta Oss", path: "/kontakt" },
  { label: "Forum", path: "/forum" },
  { label: "Matchschema", path: "/matchschema" },
];

export default function About() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      {/* Hero banner */}
      <div className="bg-leeds-navy px-8 py-10 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg, #FFCD00 0, #FFCD00 1px, transparent 0, transparent 50%)", backgroundSize: "10px 10px" }} />
        <div className="relative z-10">
          <div className="inline-block bg-leeds-gold px-3 py-1 mb-3">
            <span className="font-archivo text-leeds-navy text-[11px] tracking-[0.15em] uppercase">Om Föreningen</span>
          </div>
          <h1 className="font-archivo text-white text-3xl lg:text-4xl tracking-tight mb-3">
            LEEDS UNITED SUPPORTERS SWEDEN
          </h1>
          <p className="font-serif text-white/70 max-w-2xl text-lg">
            Den svenska samlingsplatsen för Leeds United-supporters. Grundad 2006 i Finspång.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <main className="space-y-6">
          {/* About text */}
          <div className="border border-border">
            <div className="bg-leeds-navy px-4 py-2">
              <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">Om Klubben</span>
            </div>
            <div className="p-6 bg-white font-serif text-base leading-relaxed text-foreground space-y-4">
              <p>
                Leeds United Supporters Sweden (LUSS) är den officiella svenska supporterklubben för Leeds United-fans. Vi grundades i juni 2006 och har säte i Finspång. LUSS är en ideell förening som är religiöst och partipolitiskt oberoende.
              </p>
              <p>
                Idag räknar vi runt 700–900 medlemmar och är stolta över att vara en av de starkaste internationella supporterklubbarna för Leeds United. Vi är anslutna till Leeds United Supporters Network (LUSN) och samarbetar aktivt med klubben för att ge svenska fans bästa möjliga upplevelse.
              </p>
              <p>
                Vår verksamhet spänner från organiserade resor till Elland Road och pubträffar vid TV-sända matcher, till vår egen podcast och aktiva community online och runt om i Sverige.
              </p>
            </div>
          </div>

          {/* Facts grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border border border-border">
            {[
              { label: "Grundad", value: "Juni 2006" },
              { label: "Medlemmar", value: "700–900" },
              { label: "Säte", value: "Finspång" },
              { label: "Nätverk", value: "LUSN" },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white px-4 py-5 text-center">
                <div className="font-archivo text-2xl text-leeds-navy tracking-tight">{value}</div>
                <div className="font-inter text-[11px] text-muted-foreground uppercase tracking-wider mt-1">{label}</div>
              </div>
            ))}
          </div>

          {/* Activities */}
          <div className="border border-border">
            <div className="bg-leeds-navy px-4 py-2">
              <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">Verksamhet &amp; Aktiviteter</span>
            </div>
            <div className="p-6 bg-white">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Resor till Elland Road", desc: "Vi organiserar gruppbokningar av biljetter och resor till Leeds för varje hemmasäsong." },
                  { title: "Pubträffar", desc: "Gemensamma visningar av TV-sända matcher på pubar runt om i Sverige." },
                  { title: "LUSS-Podden", desc: "Vår egen podcast med fokus på Leeds och en svensk vinkel, tillgänglig på Soundcloud." },
                  { title: "Tipstävlingar", desc: "Säsongstippningar och tävlingar för medlemmar med priser." },
                  { title: "Årsmöte", desc: "Demokratisk förening – alla medlemmar har röst vid val av styrelse och föreningsfrågor." },
                  { title: "Sverige vs Norge", desc: "Vänskapsmatcher och aktiviteter mellan svenska och norska Leeds-fans." },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-leeds-gold mt-1.5 flex-shrink-0" />
                    <div>
                      <div className="font-inter text-sm font-bold text-leeds-navy">{title}</div>
                      <div className="font-serif text-sm text-muted-foreground mt-0.5">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* LUSN affiliation */}
          <div className="border border-border">
            <div className="bg-leeds-navy px-4 py-2">
              <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">Anslutning</span>
            </div>
            <div className="p-6 bg-white font-serif text-base leading-relaxed text-foreground space-y-3">
              <p>
                LUSS är officiellt ansluten till <strong>Leeds United Supporters Network (LUSN)</strong> – det officiella nätverket av supporterklubbar erkända av Leeds United FC. Anslutningen ger oss garanterad tillgång till matchbiljetter och direkt kommunikation med klubben.
              </p>
              <a
                href="https://www.lusn.co.uk/leeds-united-supporters-sweden"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-inter text-sm font-semibold text-leeds-navy hover:text-leeds-gold transition-colors"
              >
                Läs mer om LUSN →
              </a>
            </div>
          </div>
        </main>

        <aside className="space-y-4">
          {/* Quick links */}
          <div className="border border-border">
            <div className="bg-leeds-navy px-4 py-2">
              <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">Snabblänkar</span>
            </div>
            <div className="divide-y divide-border bg-white">
              {QUICK_LINKS.map(({ label, path }) => (
                <a
                  key={label}
                  href={path}
                  className="block px-4 py-3 font-inter text-sm font-semibold text-leeds-navy hover:text-leeds-gold hover:bg-muted/30 transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="border border-border">
            <div className="bg-leeds-navy px-4 py-2">
              <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">Sociala Medier</span>
            </div>
            <div className="p-4 bg-white space-y-3">
              <a
                href="https://www.facebook.com/LeedsSweden"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-8 h-8 bg-[#1877F2] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">f</span>
                </div>
                <span className="font-inter text-sm font-semibold text-leeds-navy group-hover:text-leeds-gold transition-colors">
                  Leeds United Supporters Sweden
                </span>
              </a>
              <a
                href="https://www.laget.se/LUSS/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-8 h-8 bg-leeds-navy flex items-center justify-center flex-shrink-0">
                  <span className="text-leeds-gold font-bold text-xs">L</span>
                </div>
                <span className="font-inter text-sm font-semibold text-leeds-navy group-hover:text-leeds-gold transition-colors">
                  laget.se/LUSS
                </span>
              </a>
            </div>
          </div>

          {/* Contact teaser */}
          <div className="bg-leeds-navy p-5 text-center">
            <img
              src="https://media.base44.com/images/public/user_69d18244733d4a057f86fdd2/b6d5a3225_image.png"
              alt="LUSS"
              className="h-14 w-14 rounded-full mx-auto mb-3"
            />
            <p className="font-archivo text-leeds-gold text-sm tracking-wide mb-1">LUSS</p>
            <p className="font-serif text-white/60 text-xs mb-4">Leeds United Supporters Sweden</p>
            <a
              href="/kontakt"
              className="inline-block bg-leeds-gold text-leeds-navy font-archivo text-xs tracking-wider px-5 py-2 hover:bg-leeds-gold/90 transition-colors"
            >
              KONTAKTA OSS
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
