import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { client } from "@/api/client";
import { MessageSquare } from "lucide-react";
import moment from "moment";
import "moment/locale/sv";
import NewsTicker from "../components/NewsTicker";
import HomeSidebar from "../components/HomeSidebar";

moment.locale("sv");

function ArticleListItem({ article }) {
  return (
    <Link
      to={`/artikel/${article.id}`}
      className="flex gap-3 py-3 border-b border-border hover:bg-muted/30 transition-colors -mx-2 px-2 group"
    >
      {article.image_url && (
        <img
          src={article.image_url}
          alt={article.title}
          className="w-[60px] h-[60px] object-cover flex-shrink-0"
        />
      )}
      <div className="flex-1 min-w-0">
        <h4 className="font-inter text-sm font-bold text-leeds-navy group-hover:text-leeds-gold transition-colors leading-tight">
          {article.title}
        </h4>
        <div className="flex items-center gap-2 mt-1 text-[11px] font-inter text-muted-foreground">
          <span>{article.author || "LUSS"}</span>
          <span>•</span>
          <time>{moment(article.created_date).fromNow()}</time>
          <span className="flex items-center gap-1">
            <MessageSquare size={10} />
            {article.comment_count || 0}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [arts, mtchs] = await Promise.all([
          client.entities.Article.list("-created_date", 10),
          client.entities.Match.list("date", 20),
        ]);
        setArticles(arts);
        setMatches(mtchs);
      } catch {
        // leave state as empty arrays; loading cleared below
      }
      setLoading(false);
    }
    load();
  }, []);

  const upcoming = matches.filter((m) => m.status === "Kommande");
  const played = [...matches]
    .filter((m) => m.status === "Spelad")
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const nextMatch = upcoming[0];
  const latestResult = played[0];
  const featuredArticle = articles.find((a) => a.is_featured) || articles[0];
  const listArticles = articles.filter((a) => a.id !== featuredArticle?.id).slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-leeds-concrete border-t-leeds-navy rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-background">
      {/* Ticker */}
      <NewsTicker articles={articles} />

      {/* Main layout */}
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          {/* LEFT: Main content */}
          <main>
            {/* Featured Article */}
            {featuredArticle ? (
              <Link to={`/artikel/${featuredArticle.id}`} className="group block mb-4">
                <div className="relative overflow-hidden">
                  {featuredArticle.image_url ? (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={featuredArticle.image_url}
                        alt={featuredArticle.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <div className="inline-block bg-leeds-gold px-3 py-1 mb-2">
                          <span className="font-archivo text-leeds-navy text-[11px] tracking-[0.12em] uppercase">
                            {featuredArticle.category}
                          </span>
                        </div>
                        <h2 className="font-archivo text-white text-2xl lg:text-3xl xl:text-4xl tracking-tight leading-tight">
                          {featuredArticle.title}
                        </h2>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-leeds-navy p-8">
                      <div className="inline-block bg-leeds-gold px-3 py-1 mb-3">
                        <span className="font-archivo text-leeds-navy text-[11px] tracking-[0.12em] uppercase">
                          {featuredArticle.category}
                        </span>
                      </div>
                      <h2 className="font-archivo text-white text-2xl lg:text-3xl xl:text-4xl tracking-tight leading-tight">
                        {featuredArticle.title}
                      </h2>
                    </div>
                  )}
                </div>
              </Link>
            ) : (
              <div className="bg-leeds-navy p-10 mb-4 text-center">
                <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.15em] uppercase block mb-3">
                  Välkommen
                </span>
                <h2 className="font-archivo text-white text-3xl lg:text-4xl tracking-tight">
                  SVENSKA RÖSTER. LEEDS-HJÄRTAN.
                </h2>
                <p className="font-serif text-white/60 mt-3 max-w-lg mx-auto">
                  Den svenska samlingsplatsen för Leeds United-supporters i Premier League.
                </p>
              </div>
            )}

            {/* Section header */}
            <div className="flex items-center justify-between mb-2 mt-4">
              <h3 className="font-archivo text-[11px] text-leeds-gold tracking-[0.15em] uppercase bg-leeds-navy px-3 py-1">
                Klubbnyheter
              </h3>
              <Link
                to="/nyheter"
                className="font-inter text-[12px] font-semibold text-leeds-navy hover:text-leeds-gold transition-colors uppercase tracking-wider"
              >
                Visa fler nyheter →
              </Link>
            </div>

            {/* Article list */}
            <div>
              {listArticles.map((article) => (
                <ArticleListItem key={article.id} article={article} />
              ))}
              {articles.length === 0 && (
                <div className="py-12 text-center text-muted-foreground font-serif">
                  Inga nyheter publicerade ännu.
                </div>
              )}
            </div>
          </main>

          {/* RIGHT: Sidebar */}
          <HomeSidebar
            nextMatch={nextMatch}
            latestResult={latestResult}
            upcomingMatches={upcoming}
          />
        </div>
      </div>
    </div>
  );
}
