import { Link } from "react-router-dom";
import { MessageSquare, Pin } from "lucide-react";
import moment from "moment";

export default function ForumThreadCard({ thread }) {
  if (!thread) return null;

  const initials = thread.created_by
    ? thread.created_by.charAt(0).toUpperCase()
    : "?";

  return (
    <Link
      to={`/forum/${thread.id}`}
      className="group block py-4 border-b border-border hover:bg-muted/30 transition-colors px-4 -mx-4"
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-leeds-navy flex items-center justify-center">
          <span className="font-archivo text-sm text-white">{initials}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {thread.is_pinned && (
              <Pin size={12} className="text-leeds-gold flex-shrink-0" />
            )}
            <h3 className="font-inter font-semibold text-sm text-foreground truncate group-hover:text-leeds-navy transition-colors">
              {thread.title}
            </h3>
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs font-inter text-muted-foreground">
            <span className="bg-muted px-2 py-0.5 rounded-sm text-[10px] font-semibold tracking-wider uppercase">
              {thread.category}
            </span>
            <span>{thread.created_by}</span>
            <span>•</span>
            <time>{moment(thread.created_date).fromNow()}</time>
          </div>
        </div>

        {/* Reply count */}
        <div className="flex-shrink-0 flex items-center gap-1.5 text-muted-foreground">
          <MessageSquare size={14} />
          <span className="font-inter text-xs font-medium">
            {thread.reply_count || 0}
          </span>
        </div>
      </div>
    </Link>
  );
}
