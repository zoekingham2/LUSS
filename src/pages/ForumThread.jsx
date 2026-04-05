import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import moment from "moment";
import { motion } from "framer-motion";

export default function ForumThread() {
  const [thread, setThread] = useState(null);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newReply, setNewReply] = useState("");
  const [sending, setSending] = useState(false);

  const { id: threadId } = useParams();

  useEffect(() => {
    loadThread();
  }, [threadId]);

  async function loadThread() {
    if (!threadId) return;
    const [thread, allReplies] = await Promise.all([
      client.entities.ForumThread.get(threadId),
      client.entities.ForumReply.filter({ thread_id: threadId }, "-created_date", 200),
    ]);
    setThread(thread);
    setReplies(allReplies);
    setLoading(false);
  }

  async function handleReply() {
    if (!newReply.trim()) return;
    setSending(true);
    await client.entities.ForumReply.create({
      thread_id: threadId,
      content: newReply.trim(),
    });
    setNewReply("");
    setSending(false);
    loadThread();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-leeds-concrete border-t-leeds-navy rounded-full animate-spin" />
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="font-archivo text-2xl text-foreground">Tråden hittades inte</h1>
        <Link to="/forum" className="mt-4 inline-flex items-center gap-2 text-leeds-navy font-inter text-sm font-semibold">
          <ArrowLeft size={16} /> Tillbaka till forumet
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {/* Back */}
      <Link
        to="/forum"
        className="inline-flex items-center gap-2 text-muted-foreground font-inter text-sm hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft size={16} /> Tillbaka till forumet
      </Link>

      {/* Thread Header */}
      <div className="mb-8">
        <span className="inline-block bg-muted px-2 py-0.5 text-[10px] font-inter font-bold tracking-wider uppercase text-muted-foreground mb-3">
          {thread.category}
        </span>
        <h1 className="font-archivo text-2xl lg:text-3xl text-foreground tracking-tight">
          {thread.title}
        </h1>
        <div className="mt-3 flex items-center gap-3 text-sm font-inter text-muted-foreground">
          <span className="font-semibold text-foreground">{thread.created_by}</span>
          <span>•</span>
          <time>{moment(thread.created_date).format("D MMM YYYY, HH:mm")}</time>
        </div>
      </div>

      {/* Original Post */}
      <div className="pb-8 mb-8 border-b border-border">
        <p className="font-serif text-lg leading-[1.7] text-foreground whitespace-pre-wrap">
          {thread.content}
        </p>
      </div>

      {/* Replies */}
      <div className="space-y-0">
        <h3 className="font-inter text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-6">
          SVAR ({replies.length})
        </h3>
        {replies.map((reply, i) => {
          const initial = reply.created_by ? reply.created_by.charAt(0).toUpperCase() : "?";
          return (
            <motion.div
              key={reply.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-4 py-5 border-b border-border"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-leeds-navy flex items-center justify-center">
                <span className="font-archivo text-xs text-white">{initial}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs font-inter text-muted-foreground mb-2">
                  <span className="font-semibold text-foreground">{reply.created_by}</span>
                  <span>•</span>
                  <time>{moment(reply.created_date).fromNow()}</time>
                </div>
                <p className="font-inter text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                  {reply.content}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Reply Form */}
      <div className="mt-8 pt-8 border-t border-border">
        <h3 className="font-inter text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-4">
          SKRIV ETT SVAR
        </h3>
        <Textarea
          placeholder="Ditt svar..."
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          rows={4}
          className="font-inter mb-3"
        />
        <Button
          onClick={handleReply}
          disabled={sending || !newReply.trim()}
          className="bg-leeds-navy text-white hover:bg-leeds-navy/90 font-inter text-xs font-bold tracking-wider uppercase gap-2"
        >
          <Send size={14} />
          {sending ? "Skickar..." : "SKICKA SVAR"}
        </Button>
      </div>
    </div>
  );
}
