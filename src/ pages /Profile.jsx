import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { User, Mail, Calendar, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import moment from "moment";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const me = await base44.auth.me();
      setUser(me);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-leeds-concrete border-t-leeds-navy rounded-full animate-spin" />
      </div>
    );
  }

  const initials = user?.full_name
    ? user.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "LS";

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {/* Header */}
      <div className="mb-12">
        <span className="font-inter text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
          DITT KONTO
        </span>
        <h1 className="font-archivo text-3xl lg:text-4xl text-foreground tracking-tight mt-1">
          PROFIL
        </h1>
      </div>

      {/* Profile Card */}
      <div className="bg-card border border-border p-8">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-leeds-navy flex items-center justify-center flex-shrink-0">
            <span className="font-archivo text-2xl text-white">{initials}</span>
          </div>

          <div className="flex-1">
            <h2 className="font-archivo text-xl text-foreground tracking-tight">
              {user?.full_name || "Medlem"}
            </h2>
            <p className="font-inter text-sm text-muted-foreground mt-1">
              Medlem i Leeds Sverige
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-3 py-3 border-b border-border">
            <Mail size={16} className="text-muted-foreground" />
            <div>
              <span className="font-inter text-[10px] font-bold tracking-wider uppercase text-muted-foreground block">
                E-POST
              </span>
              <span className="font-inter text-sm text-foreground">
                {user?.email || "–"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 py-3 border-b border-border">
            <User size={16} className="text-muted-foreground" />
            <div>
              <span className="font-inter text-[10px] font-bold tracking-wider uppercase text-muted-foreground block">
                ROLL
              </span>
              <span className="font-inter text-sm text-foreground capitalize">
                {user?.role || "Medlem"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 py-3 border-b border-border">
            <Calendar size={16} className="text-muted-foreground" />
            <div>
              <span className="font-inter text-[10px] font-bold tracking-wider uppercase text-muted-foreground block">
                MEDLEM SEDAN
              </span>
              <span className="font-inter text-sm text-foreground">
                {user?.created_date
                  ? moment(user.created_date).format("D MMMM YYYY")
                  : "–"}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={() => base44.auth.logout()}
            className="font-inter text-xs font-bold tracking-wider uppercase gap-2 text-destructive border-destructive/30 hover:bg-destructive/5"
          >
            <LogOut size={14} />
            LOGGA UT
          </Button>
        </div>
      </div>
    </div>
  );
}
