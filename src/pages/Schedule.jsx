import { useEffect, useState } from "react";
import { client } from "@/api/client";
import MatchCard from "../components/MatchCard";

export default function Schedule() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Alla");

  useEffect(() => {
    async function load() {
      const data = await client.entities.Match.list("date", 100);
      setMatches(data);
      setLoading(false);
    }
    load();
  }, []);

  const upcoming = matches.filter((m) => m.status === "Kommande");
  const played = matches
    .filter((m) => m.status === "Spelad")
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const displayMatches = filter === "Kommande" ? upcoming : filter === "Spelad" ? played : [...upcoming, ...played.slice(0, 10)];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-leeds-concrete border-t-leeds-navy rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {/* Header */}
      <div className="mb-12">
        <span className="font-inter text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
          SÄSONGEN
        </span>
        <h1 className="font-archivo text-3xl lg:text-5xl text-foreground tracking-tight mt-1">
          MATCHSCHEMA
        </h1>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 mb-8">
        {["Alla", "Kommande", "Spelad"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 font-inter text-xs font-bold tracking-wider uppercase transition-colors ${
              filter === f
                ? "bg-leeds-navy text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {f === "Spelad" ? "Resultat" : f}
          </button>
        ))}
      </div>

      {/* Matches */}
      {displayMatches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="font-serif text-muted-foreground text-lg">
            Inga matcher att visa.
          </p>
        </div>
      )}
    </div>
  );
}
