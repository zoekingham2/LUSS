import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { client } from "@/api/client";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useAuth();

  const [mode, setMode] = useState("login"); // "login" | "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      let data;
      if (mode === "login") {
        data = await client.auth.login(email, password);
      } else {
        if (!fullName.trim()) {
          setError("Ange ditt namn.");
          setLoading(false);
          return;
        }
        data = await client.auth.register(email, password, fullName);
      }
      setUser(data.user);
      setIsAuthenticated(true);
      navigate("/");
    } catch (err) {
      setError(err.message || "Något gick fel. Försök igen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      {/* Logo / branding */}
      <div className="mb-8 text-center">
        <div className="inline-block bg-leeds-navy px-6 py-3 mb-3">
          <span className="font-archivo text-leeds-gold text-2xl tracking-[0.15em] uppercase">
            LUSS
          </span>
        </div>
        <p className="font-inter text-sm text-muted-foreground">
          Leeds United Supporters Sweden
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-card border border-border p-8">
        {/* Mode tabs */}
        <div className="flex mb-6 border-b border-border">
          {["login", "register"].map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(null); }}
              className={`flex-1 pb-3 font-inter text-xs font-bold tracking-wider uppercase transition-colors ${
                mode === m
                  ? "text-leeds-navy border-b-2 border-leeds-navy -mb-px"
                  : "text-muted-foreground"
              }`}
            >
              {m === "login" ? "Logga in" : "Registrera"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <Input
              placeholder="Namn"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="font-inter"
            />
          )}
          <Input
            type="email"
            placeholder="E-post"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="font-inter"
          />
          <Input
            type="password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="font-inter"
          />

          {error && (
            <p className="font-inter text-xs text-destructive">{error}</p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-leeds-navy text-white hover:bg-leeds-navy/90 font-archivo tracking-wider uppercase"
          >
            {loading
              ? "Laddar..."
              : mode === "login"
              ? "LOGGA IN"
              : "SKAPA KONTO"}
          </Button>
        </form>
      </div>

      <Link
        to="/"
        className="mt-6 font-inter text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Fortsätt utan inloggning
      </Link>
    </div>
  );
}
