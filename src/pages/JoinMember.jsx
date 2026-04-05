import { Link } from "react-router-dom";

const BENEFITS = [
  "Garanterad tillgång till 30 matchbiljetter per säsong via LUSN-nätverket",
  "Möjlighet till hospitalitybiljetter till rabatterat pris",
  "Rabatt på hotell i Leeds",
  "Elektroniskt medlemskort via laget.se-appen",
  "Rabatt på restaurangkedjan O'Learys",
  "Deltagande i pubträffar, tipstävlingar och matchdagar",
  "Röst vid LUSS årsmöte och val av styrelse",
  "Köp produkter från Leeds shop via gruppen och spara på tullavgifter",
  "Möjlighet till förtur vid biljettköp via Guldmedlemskap",
];

export default function JoinMember() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="bg-leeds-navy px-8 py-10 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg, #FFCD00 0, #FFCD00 1px, transparent 0, transparent 50%)", backgroundSize: "10px 10px" }} />
        <div className="relative z-10">
          <div className="inline-block bg-leeds-gold px-3 py-1 mb-3">
            <span className="font-archivo text-leeds-navy text-[11px] tracking-[0.15em] uppercase">Medlemskap</span>
          </div>
          <h1 className="font-archivo text-white text-3xl lg:text-4xl tracking-tight mb-3">
            BLI MEDLEM I LUSS
          </h1>
          <p className="font-serif text-white/70 max-w-2xl text-lg">
            Gå med i den svenska gemenskapen för Leeds-fans. Tillgång till biljetter, resor, events och mycket mer.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <main className="space-y-6">
          {/* Pricing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Individual */}
            <div className="border-2 border-leeds-gold">
              <div className="bg-leeds-gold px-4 py-2">
                <span className="font-archivo text-leeds-navy text-[11px] tracking-[0.12em] uppercase">Enskilt Medlemskap</span>
              </div>
              <div className="p-6 bg-white text-center">
                <div className="font-archivo text-4xl text-leeds-navy tracking-tight">125 kr</div>
                <div className="font-inter text-xs text-muted-foreground mt-1 uppercase tracking-wider">per år</div>
                <p className="font-serif text-sm text-foreground mt-4">
                  För dig som vill vara en del av LUSS-gemenskapen. Alla förmåner ingår.
                </p>
                <a
                  href="https://www.laget.se/LUSS/Member"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block w-full bg-leeds-gold text-leeds-navy font-archivo text-sm tracking-wider px-6 py-3 hover:bg-leeds-gold/90 transition-colors text-center"
                >
                  REGISTRERA →
                </a>
              </div>
            </div>

            {/* Family */}
            <div className="border border-border">
              <div className="bg-leeds-navy px-4 py-2">
                <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">Familjemedlemskap</span>
              </div>
              <div className="p-6 bg-white text-center">
                <div className="font-archivo text-4xl text-leeds-navy tracking-tight">225 kr</div>
                <div className="font-inter text-xs text-muted-foreground mt-1 uppercase tracking-wider">per år</div>
                <p className="font-serif text-sm text-foreground mt-4">
                  Perfekt för familjer. Alla familjemedlemmar räknas som fullvärdiga LUSS-medlemmar.
                </p>
                <a
                  href="https://www.laget.se/LUSS/Member"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block w-full bg-leeds-navy text-white font-archivo text-sm tracking-wider px-6 py-3 hover:bg-leeds-navy/90 transition-colors text-center"
                >
                  REGISTRERA →
                </a>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="border border-border">
            <div className="bg-leeds-navy px-4 py-2">
              <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">Vad ingår i medlemskapet?</span>
            </div>
            <div className="p-6 bg-white space-y-3">
              {BENEFITS.map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-leeds-gold mt-1.5 flex-shrink-0" />
                  <span className="font-inter text-sm text-foreground">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* LUSN info */}
          <div className="border border-border">
            <div className="bg-leeds-navy px-4 py-2">
              <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">Biljetter via LUSN</span>
            </div>
            <div className="p-6 bg-white font-serif text-sm leading-relaxed text-foreground space-y-2">
              <p>
                LUSS är ansluten till Leeds United Supporters Network (LUSN). Det innebär att vi som officiell supporterklubb har garanterad tillgång till <strong>30 biljetter per hemmamatch</strong> per säsong – en förmån som enbart LUSN-anslutna klubbar får.
              </p>
              <p>
                Biljetter fördelas bland betalande LUSS-medlemmar. Guldmedlemmar har förtur.
              </p>
            </div>
          </div>
        </main>

        <aside className="space-y-4">
          <div className="bg-leeds-navy p-6 text-center">
            <img
              src="https://media.base44.com/images/public/user_69d18244733d4a057f86fdd2/b6d5a3225_image.png"
              alt="LUSS"
              className="h-16 w-16 rounded-full mx-auto mb-4"
            />
            <h3 className="font-archivo text-leeds-gold text-lg tracking-tight mb-1">LUSS</h3>
            <p className="font-serif text-white/70 text-sm">Leeds United Supporters Sweden</p>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="font-inter text-white/50 text-xs">Grundad juni 2006 · Finspång</p>
            </div>
          </div>

          <div className="border border-border">
            <div className="bg-leeds-navy px-4 py-2">
              <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">Redan Medlem?</span>
            </div>
            <div className="p-4 bg-white space-y-3">
              <p className="font-serif text-sm text-foreground">
                Logga in med ditt LUSS-konto för att se ditt profil, kommentera artiklar och delta i forumet.
              </p>
              <Link
                to="/profil"
                className="inline-block w-full text-center bg-leeds-navy text-white font-archivo text-xs tracking-wider px-4 py-2.5 hover:bg-leeds-navy/90 transition-colors"
              >
                LOGGA IN
              </Link>
            </div>
          </div>

          <div className="border border-border">
            <div className="bg-leeds-navy px-4 py-2">
              <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">Frågor?</span>
            </div>
            <div className="p-4 bg-white space-y-2">
              <p className="font-serif text-sm text-foreground">
                Kontakta oss via kontaktsidan eller på Facebook.
              </p>
              <Link to="/kontakt" className="block font-inter text-xs font-semibold text-leeds-navy hover:text-leeds-gold transition-colors">
                Kontaktsidan →
              </Link>
              <a
                href="https://www.facebook.com/LeedsSweden"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-inter text-xs font-semibold text-leeds-navy hover:text-leeds-gold transition-colors"
              >
                Facebook →
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
