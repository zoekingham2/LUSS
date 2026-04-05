import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { ArrowLeft, Clock } from "lucide-react";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

export default function Article() {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id: articleId } = useParams();

  useEffect(() => {
    async function load() {
      if (!articleId) return;
      try {
        const found = await client.entities.Article.get(articleId);
        setArticle(found);
      } catch {
        setArticle(null);
      }
      setLoading(false);
    }
    load();
  }, [articleId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-leeds-concrete border-t-leeds-navy rounded-full animate-spin" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="font-archivo text-2xl text-foreground">Artikeln hittades inte</h1>
        <Link to="/nyheter" className="mt-4 inline-flex items-center gap-2 text-leeds-navy font-inter text-sm font-semibold">
          <ArrowLeft size={16} /> Tillbaka till nyheter
        </Link>
      </div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero Image */}
      {article.image_url && (
        <div className="relative h-[40vh] lg:h-[50vh] overflow-hidden">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back link */}
        <Link
          to="/nyheter"
          className="inline-flex items-center gap-2 text-muted-foreground font-inter text-sm hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Tillbaka
        </Link>

        {/* Category */}
        <span className="inline-block bg-leeds-gold text-leeds-navy font-inter text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1 mb-4">
          {article.category}
        </span>

        {/* Title */}
        <h1 className="font-archivo text-3xl lg:text-5xl text-foreground tracking-tight leading-[0.95]">
          {article.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 mt-6 pb-8 border-b border-border">
          {article.author && (
            <span className="font-inter text-sm font-semibold text-foreground">
              {article.author}
            </span>
          )}
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm font-inter">
            <Clock size={14} />
            <time>{moment(article.created_date).format("D MMMM YYYY")}</time>
          </div>
        </div>

        {/* Content */}
        <div className="mt-8 font-serif text-lg leading-[1.8] text-foreground prose prose-lg max-w-none prose-headings:font-archivo prose-headings:tracking-tight prose-a:text-leeds-navy prose-a:underline">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      </div>
    </motion.article>
  );
}
