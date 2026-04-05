export default function About() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <main>
          <div className="bg-leeds-navy px-4 py-2 mb-4 inline-block">
            <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">Om Leeds Sverige</span>
          </div>
          <h1 className="font-archivo text-3xl text-foreground tracking-tight mb-6">
            OM LEEDS SVERIGE (LUSS)
          </h1>
          <div className="font-serif text-base leading-relaxed text-foreground space-y-4 max-w-2xl">
            <p>
              Leeds United Supporters Sweden (LUSS) är den officiella supporterklubben för svenska Leeds United-fans. Vi grundades för att samla svenska supporters och skapa en gemenskap kring vår gemensamma kärlek till Leeds United FC.
            </p>
            <p>
              Som medlem i LUSS får du tillgång till exklusiva evenemang, matchträffar runt om i Sverige, möjlighet att delta i resor till Elland Road och ett stort nätverk av likasinnade Leeds-fans.
            </p>
            <p>
              Vi är anslutna till Leeds United FC:s officiella supporterklubbnätverk och arbetar aktivt för att representera svenska fans på bästa möjliga sätt.
            </p>
            <h2 className="font-archivo text-xl tracking-tight mt-6 mb-2">KONTAKTA OSS</h2>
            <p>
              Har du frågor om LUSS eller vill bli medlem? Besök vår{" "}
              <a href="/bli-medlem" className="text-leeds-navy underline hover:text-leeds-gold">
                bli-medlem-sida
              </a>{" "}
              eller hör av dig via{" "}
              <a href="/forum" className="text-leeds-navy underline hover:text-leeds-gold">
                forumet
              </a>.
            </p>
          </div>
        </main>
        <aside>
          <div className="border border-border">
            <div className="bg-leeds-navy px-4 py-2">
              <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">Snabblänkar</span>
            </div>
            <div className="divide-y divide-border bg-white">
              {["Bli Medlem", "Forum", "Matchschema", "Nyheter"].map((l) => (
                <a
                  key={l}
                  href={`/${l.toLowerCase().replace(" ", "-")}`}
                  className="block px-4 py-3 font-inter text-sm font-semibold text-leeds-navy hover:text-leeds-gold hover:bg-muted/30 transition-colors"
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
