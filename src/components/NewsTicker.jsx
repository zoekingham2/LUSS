import { Link } from "react-router-dom";

export default function NewsTicker({ articles }) {
  const items = articles.slice(0, 6);
  if (items.length === 0) return null;

  return (
    <div className="bg-white border-b border-leeds-concrete overflow-hidden h-9 flex items-center">
      <div className="flex items-center h-full">
        <div className="bg-leeds-navy px-4 h-full flex items-center flex-shrink-0">
          <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] whitespace-nowrap">
            SENASTE NYTT
          </span>
        </div>
      </div>
      <div className="flex-1 overflow-hidden relative">
        <div
          className="flex items-center gap-0 animate-marquee whitespace-nowrap"
          style={{
            animation: "marquee 40s linear infinite",
          }}
        >
          {[...items, ...items].map((a, i) => (
            <Link
              key={`${a.id}-${i}`}
              to={`/artikel/${a.id}`}
              className="inline-flex items-center gap-2 px-6 font-inter text-[13px] text-leeds-navy hover:text-leeds-gold transition-colors"
            >
              {a.title}
              {i < items.length - 1 || i >= items.length ? <span className="text-muted-foreground ml-6">•</span> : null}
            </Link>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
