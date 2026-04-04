import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import NewsCard from "../components/NewsCard";

const CATEGORIES = ["Alla", "Nyheter", "Matchrapport", "Analys"];

export default function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Alla");

  useEffect(() => {
    async function load() {
      const data = await base44.entities.Article.list("-created_date", 50);
      setArticles(data);
      setLoading(false);
    }
    load();
  }, []);

  const filtered =
    activeCategory === "Alla"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

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
          LÄSNING
        </span>
        <h1 className="font-archivo text-3xl lg:text-5xl text-foreground tracking-tight mt-1">
          NYHETER & ANALYS
        </h1>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-4 py-2 font-inter text-xs font-bold tracking-wider uppercase transition-colors ${
              activeCategory === cat
                ? "bg-leeds-navy text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((article, i) => (
            <NewsCard
              key={article.id}
              article={article}
              featured={i === 0}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="font-serif text-muted-foreground text-lg">
            Inga artiklar i denna kategori ännu.
          </p>
        </div>
      )}
    </div>
  );
}
