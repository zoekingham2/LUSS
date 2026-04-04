import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/sv";
import { useState } from "react";

moment.locale("sv");

function CalendarWidget() {
  const [current, setCurrent] = useState(moment());
  const start = current.clone().startOf("month").startOf("isoWeek");
  const end = current.clone().endOf("month").endOf("isoWeek");
  const today = moment();

  const days = [];
  let d = start.clone();
  while (d.isBefore(end, "day") || d.isSame(end, "day")) {
    days.push(d.clone());
    d.add(1, "day");
  }

  const dayLabels = ["Mån", "Tis", "Ons", "Tor", "Fre", "Lör", "Sön"];

  return (
    <div className="border border-border">
      <div className="flex items-center justify-between px-3 py-2 bg-leeds-navy">
        <button
          onClick={() => setCurrent(current.clone().subtract(1, "month"))}
          className="text-white/60 hover:text-white font-inter text-sm px-1"
        >
          «
        </button>
        <span className="font-archivo text-white text-sm tracking-wider uppercase">
          {current.format("MMMM YYYY")}
        </span>
        <button
          onClick={() => setCurrent(current.clone().add(1, "month"))}
          className="text-white/60 hover:text-white font-inter text-sm px-1"
        >
          »
        </button>
      </div>
      <div className="p-2">
        <div className="grid grid-cols-7 mb-1">
          {dayLabels.map((l) => (
            <div key={l} className="text-center font-inter text-[10px] font-bold text-muted-foreground py-1">
              {l}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {days.map((day, i) => {
            const isToday = day.isSame(today, "day");
            const isCurrentMonth = day.month() === current.month();
            return (
              <div
                key={i}
                className={`text-center py-1.5 font-inter text-xs rounded-sm mx-0.5 ${
                  isToday
                    ? "bg-leeds-gold text-leeds-navy font-bold"
                    : isCurrentMonth
                    ? "text-foreground hover:bg-muted cursor-pointer"
                    : "text-muted-foreground/40"
                }`}
              >
                {day.date()}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function HomeSidebar({ nextMatch, latestResult, upcomingMatches }) {
  return (
    <aside className="space-y-4">
      {/* Next Match */}
      {nextMatch && (
        <div className="border border-border">
          <div className="bg-leeds-navy px-4 py-2">
            <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">
              Nästa Match
            </span>
          </div>
          <div className="p-4 bg-white">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="font-archivo text-sm text-foreground leading-tight text-center flex-1">{nextMatch.home_team}</span>
              <span className="font-archivo text-2xl text-muted-foreground font-bold px-2">V</span>
              <span className="font-archivo text-sm text-foreground leading-tight text-center flex-1">{nextMatch.away_team}</span>
            </div>
            <div className="text-center text-[11px] font-inter text-muted-foreground border-t border-border pt-2">
              {moment(nextMatch.date).format("ddd D MMM YYYY • HH:mm")}
            </div>
            <div className="text-center text-[10px] font-inter text-muted-foreground mt-1 uppercase tracking-wider">
              {nextMatch.competition}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-3">
              <Link to="/forum" className="text-center text-[11px] font-inter font-semibold text-leeds-navy hover:text-leeds-gold">
                Diskutera matchen
              </Link>
              <Link to="/matchschema" className="text-center text-[11px] font-inter font-semibold text-leeds-navy hover:text-leeds-gold">
                Matchschema
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Latest Result */}
      {latestResult && (
        <div className="border border-border">
          <div className="bg-leeds-navy px-4 py-2">
            <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">
              Senaste Match
            </span>
          </div>
          <div className="p-4 bg-white">
            <div className="flex items-center justify-between gap-2">
              <span className="font-archivo text-sm text-foreground text-center flex-1 leading-tight">
                {latestResult.home_team}
              </span>
              <div className="text-center px-2">
                <span className="font-archivo text-2xl text-foreground">
                  {latestResult.home_score}–{latestResult.away_score}
                </span>
              </div>
              <span className="font-archivo text-sm text-foreground text-center flex-1 leading-tight">
                {latestResult.away_team}
              </span>
            </div>
            <div className="text-center text-[11px] font-inter text-muted-foreground mt-2 border-t border-border pt-2">
              {moment(latestResult.date).format("ddd D MMM YYYY • HH:mm")}
            </div>
            <div className="mt-2 flex justify-between">
              <Link to="/nyheter" className="text-[11px] font-inter font-semibold text-leeds-navy hover:text-leeds-gold">
                Läs matchrapport
              </Link>
              <Link to="/statistik" className="text-[11px] font-inter font-semibold text-leeds-navy hover:text-leeds-gold">
                Statistik
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Calendar */}
      <CalendarWidget />

      {/* Upcoming Events */}
      {upcomingMatches && upcomingMatches.length > 0 && (
        <div className="border border-border">
          <div className="bg-leeds-navy px-4 py-2">
            <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.12em] uppercase">
              Kommande Matcherna
            </span>
          </div>
          <div className="divide-y divide-border">
            {upcomingMatches.slice(0, 4).map((m) => (
              <div key={m.id} className="px-4 py-3 bg-white">
                <div className="text-[11px] font-inter font-bold text-foreground">
                  {moment(m.date).format("D MMM YYYY")}
                </div>
                <div className="text-[12px] font-inter text-muted-foreground mt-0.5">
                  <span className="font-semibold text-leeds-navy">{m.home_team} v {m.away_team}</span>{" "}
                  {moment(m.date).format("HH:mm")}
                </div>
                <div className="text-[10px] font-inter text-muted-foreground mt-0.5 uppercase tracking-wider">
                  {m.competition}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
