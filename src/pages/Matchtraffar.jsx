import { Link } from "react-router-dom";

export default function Matchtraffar() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="bg-leeds-navy px-8 py-10 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg, #FFCD00 0, #FFCD00 1px, transparent 0, transparent 50%)", backgroundSize: "10px 10px" }} />
        <div className="relative z-10">
          <div className="inline-block bg-leeds-gold px-3 py-1 mb-3">
            <span className="font-archivo text-leeds-navy text-[11px] tracking-[0.15em] uppercase">Matchträffar</span>
          </div>
          <h1 className="font-archivo text-white text-3xl lg:text-4xl tracking-tight mb-3">
            PUBTRÄFFAR &amp; MATCHVISNINGAR
          </h1>
          <p className="font-serif text-white/70 max-w-2xl text-lg">
            Se Leeds-matcher med likasinnade fans runt om i Sverige. Vi ordnar pubträffar vid TV-sända matcher.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <main className="space-y-6">
          {/* About match gatherings */}
          <div className="border border-border">
            <div className="bg-leeds-navy px-4 py-2">
              <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">Om Matchträffarna</span>
            </div>
            <div className="p-6 bg-white font-serif text-base leading-relaxed text-foreground space-y-3">
              <p>
                LUSS anordnar regelbundet pubträffar i samband med TV-sända Leeds-matcher. Vi samlas på utvalda pubar runt om i Sverige för att titta på matcher tillsammans och fira eller sörja resultaten som en gemenskap.
              </p>
              <p>
                Träffarna annonseras via vår Facebook-sida och på laget.se. Alla – medlemmar och icke-medlemmar – är välkomna att delta!
              </p>
            </div>
          </div>

          {/* Elland Road trips */}
          <div className="border border-border">
            <div className="bg-leeds-navy px-4 py-2">
              <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">Resor till Elland Road</span>
            </div>
            <div className="p-6 bg-white space-y-4">
              <p className="font-serif text-base leading-relaxed text-foreground">
                Vi organiserar resor till Leeds för att se matcher live på Elland Road. Som LUSN-ansluten klubb har LUSS garanterad tillgång till 30 biljetter per hemmamatch, vilket gör det möjligt för oss att erbjuda svenska fans biljetter som annars är svåra att få tag i.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border border border-border">
                {[
                  { icon: "🎫", label: "Biljetter", desc: "30 garanterade platser per hemmamatch via LUSN" },
                  { icon: "🏨", label: "Hotell", desc: "Rabatt på hotell i Leeds för LUSS-medlemmar" },
                  { icon: "✈", label: "Resor", desc: "Hjälp med planering av resa och logistik" },
                ].map(({ icon, label, desc }) => (
                  <div key={label} className="bg-white p-4 text-center">
                    <div className="text-2xl mb-2">{icon}</div>
                    <div className="font-inter text-xs font-bold text-leeds-navy uppercase tracking-wider mb-1">{label}</div>
                    <div className="font-serif text-xs text-muted-foreground">{desc}</div>
                  </div>
                ))}
              </div>
              <p className="font-serif text-sm text-muted-foreground">
                Information om kommande resor annonseras via forumet och Facebook. Bli medlem för att säkra din plats.
              </p>
            </div>
          </div>

          {/* Norway match */}
          <div className="border border-border">
            <div className="bg-leeds-navy px-4 py-2">
              <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">Sverige vs Norge</span>
            </div>
            <div className="p-6 bg-white font-serif text-base leading-relaxed text-foreground">
              <p>
                LUSS arrangerar ibland vänskapsmatcher och aktiviteter tillsammans med norska Leeds-fans. Det är ett populärt event som stärker banden inom den nordiska Leeds-communityn.
              </p>
            </div>
          </div>

          {/* Stay updated */}
          <div className="border border-border">
            <div className="bg-leeds-navy px-4 py-2">
              <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">Håll Dig Uppdaterad</span>
            </div>
            <div className="p-6 bg-white space-y-3">
              <p className="font-serif text-base text-foreground">
                Kommande matchträffar annonseras i forumet och på vår Facebook-sida. Kom och titta på matcher med oss!
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/forum"
                  className="inline-block bg-leeds-gold text-leeds-navy font-archivo text-sm tracking-wider px-5 py-2.5 hover:bg-leeds-gold/90 transition-colors"
                >
                  TILL FORUMET →
                </Link>
                <a
                  href="https://www.facebook.com/LeedsSweden"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#1877F2] text-white font-archivo text-sm tracking-wider px-5 py-2.5 hover:bg-[#1877F2]/90 transition-colors"
                >
                  FACEBOOK →
                </a>
              </div>
            </div>
          </div>
        </main>

        <aside className="space-y-4">
          <div className="border border-border">
            <div className="bg-leeds-navy px-4 py-2">
              <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">Nästa Match</span>
            </div>
            <div className="p-4 bg-white">
              <p className="font-serif text-sm text-muted-foreground">
                Se matchschemat för kommande Leeds-matcher.
              </p>
              <Link
                to="/matchschema"
                className="block mt-3 font-inter text-xs font-semibold text-leeds-navy hover:text-leeds-gold transition-colors"
              >
                Matchschema →
              </Link>
            </div>
          </div>

          <div className="border border-border">
            <div className="bg-leeds-navy px-4 py-2">
              <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">Snabblänkar</span>
            </div>
            <div className="divide-y divide-border bg-white">
              {[
                { label: "Bli Medlem", path: "/bli-medlem" },
                { label: "Om Oss", path: "/om-oss" },
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
