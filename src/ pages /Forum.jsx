import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ForumThreadCard from "../components/ForumThreadCard";

const FORUM_CATEGORIES = ["Generellt", "Matchdiskussion", "Transferrykten", "Övrigt"];

export default function Forum() {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState("Generellt");
  const [creating, setCreating] = useState(false);
  const [filterCat, setFilterCat] = useState("Alla");

  useEffect(() => {
    loadThreads();
  }, []);

  async function loadThreads() {
    const data = await base44.entities.ForumThread.list("-created_date", 100);
    setThreads(data);
    setLoading(false);
  }

  async function handleCreate() {
    if (!newTitle.trim() || !newContent.trim()) return;
    setCreating(true);
    await base44.entities.ForumThread.create({
      title: newTitle.trim(),
      content: newContent.trim(),
      category: newCategory,
    });
    setNewTitle("");
    setNewContent("");
    setNewCategory("Generellt");
    setDialogOpen(false);
    setCreating(false);
    loadThreads();
  }

  const filtered =
    filterCat === "Alla"
      ? threads
      : threads.filter((t) => t.category === filterCat);

  const pinned = filtered.filter((t) => t.is_pinned);
  const unpinned = filtered.filter((t) => !t.is_pinned);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-leeds-concrete border-t-leeds-navy rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {/* Header */}
      <div className="flex items-end justify-between mb-12">
        <div>
          <span className="font-inter text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
            DISKUSSION
          </span>
          <h1 className="font-archivo text-3xl lg:text-5xl text-foreground tracking-tight mt-1">
            FORUMET
          </h1>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-leeds-navy text-white hover:bg-leeds-navy/90 font-inter text-xs font-bold tracking-wider uppercase gap-2">
              <Plus size={16} />
              NY TRÅD
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-archivo text-xl tracking-tight">
                Skapa ny tråd
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <Input
                placeholder="Titel"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="font-inter"
              />
              <Select value={newCategory} onValueChange={setNewCategory}>
                <SelectTrigger className="font-inter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FORUM_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea
                placeholder="Skriv ditt inlägg..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={5}
                className="font-serif"
              />
              <Button
                onClick={handleCreate}
                disabled={creating || !newTitle.trim() || !newContent.trim()}
                className="w-full bg-leeds-gold text-leeds-navy hover:bg-leeds-gold/90 font-archivo tracking-wider"
              >
                {creating ? "Skapar..." : "PUBLICERA"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {["Alla", ...FORUM_CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            className={`whitespace-nowrap px-4 py-2 font-inter text-xs font-bold tracking-wider uppercase transition-colors ${
              filterCat === cat
                ? "bg-leeds-navy text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Threads */}
      <div className="divide-y-0">
        {pinned.map((thread) => (
          <ForumThreadCard key={thread.id} thread={thread} />
        ))}
        {unpinned.map((thread) => (
          <ForumThreadCard key={thread.id} thread={thread} />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-serif text-muted-foreground text-lg">
              Inga trådar ännu. Bli den första att starta en diskussion!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
