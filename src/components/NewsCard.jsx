import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import moment from "moment";

export default function NewsCard({ article, featured = false }) {
  if (!article) return null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`group relative overflow-hidden ${
        featured ? "col-span-2 row-span-2" : ""
      }`}
    >
      <Link to={`/artikel/${article.id}`} className="block">
        <div
          className={`relative overflow-hidden bg-leeds-navy ${
            featured ? "aspect-[16/10]" : "aspect-[4/3]"
          }`}
        >
          {article.image_url ? (
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-leeds-navy to-leeds-navy/80" />
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-block bg-leeds-gold text-leeds-navy font-inter text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1">
              {article.category}
            </span>
          </div>

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
            <h3
              className={`font-archivo text-white leading-tight tracking-tight ${
                featured
                  ? "text-2xl lg:text-4xl"
                  : "text-lg lg:text-xl"
              }`}
            >
              {article.title}
            </h3>
            {featured && article.excerpt && (
              <p className="mt-2 font-serif text-white/70 text-sm lg:text-base line-clamp-2">
                {article.excerpt}
              </p>
            )}
            <div className="mt-3 flex items-center gap-3 text-white/50 text-xs font-inter">
              {article.author && <span>{article.author}</span>}
              <span>•</span>
              <time>{moment(article.created_date).format("D MMM YYYY")}</time>
            </div>
          </div>

          {/* Hover prompt */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-leeds-gold transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </div>
      </Link>
    </motion.article>
  );
}
