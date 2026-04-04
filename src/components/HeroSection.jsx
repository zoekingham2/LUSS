                </Link>
              ) : (
                <div>
                  <span className="inline-block bg-leeds-gold text-leeds-navy font-inter text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1 mb-4">
                    VÄLKOMMEN
                  </span>
                  <h1 className="font-archivo text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[0.95] tracking-tight">
                    SVENSKA RÖSTER.<br />LEEDS-HJÄRTAN.
                  </h1>
                  <p className="mt-4 font-serif text-white/60 text-base lg:text-lg max-w-xl leading-relaxed">
                    Den svenska samlingsplatsen för Leeds United-supporters. 
                    Nyheter, matcher och gemenskap – allt på svenska.
                  </p>
                </div>
              )}
            </motion.div>

            {/* Match Cards */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 flex flex-col gap-3"
            >
              {/* Next Match */}
              {nextMatch && (
                <div className="bg-leeds-gold p-5 border border-leeds-gold/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={14} className="text-leeds-navy" />
                    <span className="text-[10px] font-inter font-bold tracking-[0.15em] uppercase text-leeds-navy">
                      NÄSTA MATCH
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-archivo text-leeds-navy text-sm">{nextMatch.home_team}</span>
                    <span className="font-archivo text-leeds-navy/60 text-lg">V</span>
                    <span className="font-archivo text-leeds-navy text-sm">{nextMatch.away_team}</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-leeds-navy/10 text-xs font-inter text-leeds-navy/70">
                    {moment(nextMatch.date).format("ddd D MMM YYYY • HH:mm")}
                    {nextMatch.venue && <span className="ml-2">• {nextMatch.venue}</span>}
                  </div>
                </div>
              )}

              {/* Latest Result */}
              {latestResult && (
                <div className="bg-white/10 backdrop-blur-sm p-5 border border-white/10">
                  <span className="text-[10px] font-inter font-bold tracking-[0.15em] uppercase text-white/50 mb-3 block">
                    SENASTE MATCH
                  </span>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-archivo text-white text-sm">{latestResult.home_team}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-archivo text-white text-2xl">{latestResult.home_score}</span>
                      <span className="text-white/40">–</span>
                      <span className="font-archivo text-white text-2xl">{latestResult.away_score}</span>
                    </div>
                    <span className="font-archivo text-white text-sm">{latestResult.away_team}</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/10 text-xs font-inter text-white/40">
                    {moment(latestResult.date).format("ddd D MMM YYYY • HH:mm")}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
