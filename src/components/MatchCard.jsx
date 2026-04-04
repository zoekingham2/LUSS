import moment from "moment";
import { motion } from "framer-motion";

export default function MatchCard({ match, compact = false }) {
  if (!match) return null;

  const isPlayed = match.status === "Spelad";
  const isLive = match.status === "Pågår";
  const isLeeds = (team) =>
    team?.toLowerCase().includes("leeds");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`border border-border bg-card group ${
        compact ? "p-3" : "p-4 lg:p-5"
      }`}
    >
      {/* Competition & Date */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-inter font-bold tracking-[0.15em] uppercase text-muted-foreground">
          {match.competition}
        </span>
        {isLive && (
          <span className="flex items-center gap-1.5 text-[10px] font-inter font-bold text-red-500">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            LIVE
          </span>
        )}
      </div>

      {/* Teams & Score */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 text-right">
          <span
            className={`font-archivo text-sm lg:text-base tracking-tight ${
              isLeeds(match.home_team) ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {match.home_team}
          </span>
        </div>

        <div className="flex-shrink-0 px-3">
          {isPlayed || isLive ? (
            <div className="flex items-center gap-2 group-hover:animate-pulse">
              <span className="font-archivo text-xl lg:text-2xl text-foreground">
                {match.home_score}
              </span>
              <span className="text-muted-foreground text-sm">–</span>
              <span className="font-archivo text-xl lg:text-2xl text-foreground">
                {match.away_score}
              </span>
            </div>
          ) : (
            <span className="font-archivo text-lg text-muted-foreground">
              V
            </span>
          )}
        </div>

        <div className="flex-1">
          <span
            className={`font-archivo text-sm lg:text-base tracking-tight ${
              isLeeds(match.away_team) ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {match.away_team}
          </span>
        </div>
      </div>

      {/* Date & Venue */}
      <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs font-inter text-muted-foreground">
        <time>{moment(match.date).format("ddd D MMM • HH:mm")}</time>
        {match.venue && <span>{match.venue}</span>}
      </div>
    </motion.div>
  );
}
