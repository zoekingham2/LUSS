import { Link } from "react-router-dom";

export default function JoinMember() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <main>
          <div className="bg-leeds-navy px-4 py-2 mb-4 inline-block">
            <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">Medlemskap</span>
          </div>
          <h1 className="font-archivo text-3xl text-foreground tracking-tight mb-6">BLI MEDLEM I LUSS</h1>
          
          <div className="font-serif text-base leading-relaxed text-foreground space-y-4 max-w-2xl mb-8">
            <p>
              Bli en del av Leeds United Supporters Sweden – den svenska supporterklubben för alla Leeds-fans! 
              Medlemskap ger dig tillgång till gemenskap, matchträffar och exklusiva event.
            </p>
          </div>

          {/* Member benefits */}
          <div className="border border-border mb-6">
            <div className="bg-leeds-navy px-4 py-2">
              <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">Vad ingår i medlemskapet?</span>
            </div>
            <div className="p-4 bg-white space-y-3">
              {[
                "Tillgång till exklusiva matchträffar runt om i Sverige",
                "Möjlighet att delta i organiserade resor till Elland Road",
                "Nyhetsbrev och uppdateringar direkt till din e-post",
                "Röst i LUSS årsmöte och val av styrelse",
                "Kontakt med svenska Leeds-fans i hela landet",
                "LUSS-nål och välkomstbrev vid registrering",
              ].map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-leeds-gold mt-1.5 flex-shrink-0" />
                  <span className="font-inter text-sm text-foreground">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-4 flex-wrap">
            <a
              href="https://www.laget.se/LUSS/Member"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-leeds-gold text-leeds-navy font-archivo text-sm tracking-wider px-6 py-3 hover:bg-leeds-gold/90 transition-colors"
            >
              BLI MEDLEM HÄR →
            </a>
            <Link
              to="/profil"
              className="inline-flex items-center gap-2 bg-leeds-navy text-white font-archivo text-sm tracking-wider px-6 py-3 hover:bg-leeds-navy/90 transition-colors"
            >
              REDAN MEDLEM? LOGGA IN
            </Link>
          </div>
        </main>

        <aside>
          <div className="border border-border bg-leeds-navy p-6 text-center">
            <img
              src="https://media.base44.com/images/public/user_69d18244733d4a057f86fdd2/b6d5a3225_image.png"
              alt="LUSS"
              className="h-16 w-16 rounded-full mx-auto mb-4"
            />
            <h3 className="font-archivo text-leeds-gold text-lg tracking-tight mb-2">LUSS</h3>
            <p className="font-serif text-white/70 text-sm">Leeds United Supporters Sweden</p>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="font-inter text-white/50 text-xs">Grundad 2001</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
