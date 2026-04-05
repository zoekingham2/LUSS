import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="bg-leeds-navy px-8 py-10 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg, #FFCD00 0, #FFCD00 1px, transparent 0, transparent 50%)", backgroundSize: "10px 10px" }} />
        <div className="relative z-10">
          <div className="inline-block bg-leeds-gold px-3 py-1 mb-3">
            <span className="font-archivo text-leeds-navy text-[11px] tracking-[0.15em] uppercase">Kontakt</span>
          </div>
          <h1 className="font-archivo text-white text-3xl lg:text-4xl tracking-tight mb-3">
            KONTAKTA LUSS
          </h1>
          <p className="font-serif text-white/70 max-w-2xl text-lg">
            Har du frågor om medlemskap, biljetter eller aktiviteter? Hör av dig!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <main className="space-y-6">
          {/* Contact details */}
          <div className="border border-border">
            <div className="bg-leeds-navy px-4 py-2">
              <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">Kontaktuppgifter</span>
            </div>
            <div className="p-6 bg-white space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-leeds-navy flex items-center justify-center flex-shrink-0">
                  <span className="text-leeds-gold font-archivo text-sm">✉</span>
                </div>
                <div>
                  <div className="font-inter text-sm font-bold text-leeds-navy uppercase tracking-wider mb-0.5">Kontaktperson</div>
                  <div className="font-serif text-base text-foreground">Steen Hansen</div>
                  <div className="font-serif text-sm text-muted-foreground mt-0.5">Ordförande, LUSS</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#1877F2] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">f</span>
                </div>
                <div>
                  <div className="font-inter text-sm font-bold text-leeds-navy uppercase tracking-wider mb-0.5">Facebook</div>
                  <a
                    href="https://www.facebook.com/LeedsSweden"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-base text-leeds-navy hover:text-leeds-gold transition-colors"
                  >
                    Leeds United Supporters Sweden (LUSS)
                  </a>
                  <div className="font-serif text-sm text-muted-foreground mt-0.5">facebook.com/LeedsSweden</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-leeds-navy flex items-center justify-center flex-shrink-0">
                  <span className="text-leeds-gold font-archivo text-xs">L</span>
                </div>
                <div>
                  <div className="font-inter text-sm font-bold text-leeds-navy uppercase tracking-wider mb-0.5">Hemsida (laget.se)</div>
                  <a
                    href="https://www.laget.se/LUSS/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-base text-leeds-navy hover:text-leeds-gold transition-colors"
                  >
                    laget.se/LUSS
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Organisation info */}
          <div className="border border-border">
            <div className="bg-leeds-navy px-4 py-2">
              <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">Föreningsinformation</span>
            </div>
            <div className="p-6 bg-white">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Namn", value: "Leeds United Supporters Sweden" },
                  { label: "Förkortning", value: "LUSS" },
                  { label: "Grundad", value: "Juni 2006" },
                  { label: "Säte", value: "Finspång, Sverige" },
                  { label: "Typ", value: "Ideell förening" },
                  { label: "Nätverk", value: "Leeds United Supporters Network (LUSN)" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <dt className="font-inter text-xs font-bold text-muted-foreground uppercase tracking-wider">{label}</dt>
                    <dd className="font-serif text-sm text-foreground mt-0.5">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Forum CTA */}
          <div className="border border-border">
            <div className="bg-leeds-navy px-4 py-2">
              <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">Forum</span>
            </div>
            <div className="p-6 bg-white">
              <p className="font-serif text-base text-foreground mb-4">
                Har du frågor eller vill diskutera med andra LUSS-medlemmar? Besök forumet!
              </p>
              <Link
                to="/forum"
                className="inline-block bg-leeds-gold text-leeds-navy font-archivo text-sm tracking-wider px-6 py-3 hover:bg-leeds-gold/90 transition-colors"
              >
                TILL FORUMET →
              </Link>
            </div>
          </div>
        </main>

        <aside className="space-y-4">
          <div className="border border-border">
            <div className="bg-leeds-navy px-4 py-2">
              <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">Snabblänkar</span>
            </div>
            <div className="divide-y divide-border bg-white">
              {[
                { label: "Om Oss", path: "/om-oss" },
                { label: "Bli Medlem", path: "/bli-medlem" },
                { label: "Matchträffar", path: "/matchtraffar" },
                { label: "LUSS-Podd", path: "/podd" },
                { label: "Forum", path: "/forum" },
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
