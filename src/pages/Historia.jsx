import { Link } from "react-router-dom";

const TIMELINE = [
  {
    year: "2006",
    title: "Grundandet",
    desc: "Leeds United Supporters Sweden grundades i juni 2006 i Finspång av en grupp passionerade svenska Leeds-fans som ville skapa en formell gemenskap.",
  },
  {
    year: "2006+",
    title: "Anslutning till LUSN",
    desc: "LUSS ansluter sig till Leeds United Supporters Network (LUSN), det officiella nätverket av erkända supporterklubbar runt om i världen.",
  },
  {
    year: "Tidigt",
    title: "Växande community",
    desc: "Föreningen växer snabbt och organiserar de första resorna till Elland Road samt pubträffar vid TV-sända matcher runt om i Sverige.",
  },
  {
    year: "Nutid",
    title: "700–900 medlemmar",
    desc: "LUSS räknar idag runt 700–900 aktiva medlemmar och är en av de starkaste nordiska Leeds-supporterklubbarna.",
  },
];

export default function Historia() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="bg-leeds-navy px-8 py-10 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg, #FFCD00 0, #FFCD00 1px, transparent 0, transparent 50%)", backgroundSize: "10px 10px" }} />
        <div className="relative z-10">
          <div className="inline-block bg-leeds-gold px-3 py-1 mb-3">
            <span className="font-archivo text-leeds-navy text-[11px] tracking-[0.15em] uppercase">Historia</span>
          </div>
          <h1 className="font-archivo text-white text-3xl lg:text-4xl tracking-tight mb-3">
            LUSS HISTORIA
          </h1>
          <p className="font-serif text-white/70 max-w-2xl text-lg">
            Från grundandet 2006 till en av Nordens starkaste internationella supporterklubbar.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <main className="space-y-6">
          {/* Intro */}
          <div className="border border-border">
            <div className="bg-leeds-navy px-4 py-2">
              <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">Bakgrund</span>
            </div>
            <div className="p-6 bg-white font-serif text-base leading-relaxed text-foreground space-y-3">
              <p>
                Leeds United Supporters Sweden (LUSS) grundades i juni 2006 och har sedan dess vuxit till en av de mest aktiva internationella supporterklubbarna för Leeds United. Med säte i Finspång driver vi en ideell förening som är religiöst och partipolitiskt oberoende.
              </p>
              <p>
                Vår mission är enkel: att samla svenska Leeds-fans och ge dem de bästa möjligheterna att uppleva och stödja sitt lag – oavsett om det är på Elland Road eller framför TV:n på en pub i Sverige.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="border border-border">
            <div className="bg-leeds-navy px-4 py-2">
              <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">Tidslinje</span>
            </div>
            <div className="bg-white">
              {TIMELINE.map((item, i) => (
                <div key={i} className={`flex gap-5 px-6 py-5 ${i < TIMELINE.length - 1 ? "border-b border-border" : ""}`}>
                  <div className="flex-shrink-0 w-16 text-center">
                    <div className="inline-block bg-leeds-gold text-leeds-navy font-archivo text-xs tracking-wider px-2 py-1 w-full text-center">
                      {item.year}
                    </div>
                  </div>
                  <div>
                    <div className="font-inter text-sm font-bold text-leeds-navy mb-1">{item.title}</div>
                    <div className="font-serif text-sm text-foreground leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Marching on together */}
          <div className="bg-leeds-navy px-6 py-8 text-center">
            <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.2em] uppercase block mb-3">Alltid Leeds</span>
            <blockquote className="font-archivo text-white text-2xl lg:text-3xl tracking-tight">
              "Marching On Together"
            </blockquote>
          </div>
        </main>

        <aside className="space-y-4">
          <div className="border border-border">
            <div className="bg-leeds-navy px-4 py-2">
              <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">Fakta</span>
            </div>
            <div className="divide-y divide-border bg-white">
              {[
                { label: "Grundad", value: "Juni 2006" },
                { label: "Säte", value: "Finspång" },
                { label: "Typ", value: "Ideell förening" },
                { label: "Medlemmar", value: "700–900" },
                { label: "Nätverk", value: "LUSN" },
              ].map(({ label, value }) => (
                <div key={label} className="px-4 py-3 flex justify-between items-center">
                  <span className="font-inter text-xs font-bold text-muted-foreground uppercase tracking-wider">{label}</span>
                  <span className="font-serif text-sm text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-border">
            <div className="bg-leeds-navy px-4 py-2">
              <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">Snabblänkar</span>
            </div>
            <div className="divide-y divide-border bg-white">
              {[
                { label: "Om Oss", path: "/om-oss" },
                { label: "Bli Medlem", path: "/bli-medlem" },
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
