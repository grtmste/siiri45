"use client";

import { useCallback, useEffect, useState } from "react";

type Rsvp = {
  id: string;
  name: string;
  attending: boolean;
  plus_one: boolean;
  plus_one_name: string | null;
  created_at: string;
};

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/rsvps", { cache: "no-store" });
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      const data = await res.json();
      setRsvps(data.rsvps ?? []);
      setAuthed(true);
    } catch {
      setAuthed(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setRsvps([]);
  }

  if (authed === null) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <p className="font-body text-lg text-cream/60">Laen…</p>
      </main>
    );
  }

  if (!authed) {
    return <LoginForm onSuccess={load} />;
  }

  return <Dashboard rsvps={rsvps} onLogout={handleLogout} />;
}

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        onSuccess();
      } else {
        setError("Vale kasutajanimi või parool.");
      }
    } catch {
      setError("Midagi läks valesti, proovi uuesti.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="card w-full max-w-sm rounded-2xl p-8">
        <h1 className="text-center font-display text-3xl tracking-wide text-gold-bright">
          Admin
        </h1>
        <div className="hairline mx-auto my-6 w-20" />
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="username" className="field-label">
              Kasutajanimi
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="field-input"
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="field-label">
              Parool
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field-input"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p role="alert" className="font-body text-base" style={{ color: "#E7B4A0" }}>
              {error}
            </p>
          )}

          <button type="submit" disabled={submitting} className="btn-gold w-full">
            {submitting ? "Sisenen…" : "Logi sisse"}
          </button>
        </form>
      </div>
    </main>
  );
}

function Dashboard({
  rsvps,
  onLogout,
}: {
  rsvps: Rsvp[];
  onLogout: () => void;
}) {
  const attendingCount = rsvps.filter((r) => r.attending).length;
  const plusOneCount = rsvps.filter((r) => r.plus_one).length;
  const totalPeople = attendingCount + plusOneCount;
  const notComing = rsvps.filter((r) => !r.attending).length;

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl tracking-wide text-gold-bright sm:text-4xl">
          Admin
        </h1>
        <button type="button" onClick={onLogout} className="btn-outline">
          Logi välja
        </button>
      </div>

      <div className="hairline my-8" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Tulijaid" value={attendingCount} />
        <StatCard label="+1 kaaslasi" value={plusOneCount} />
        <StatCard label="Kokku inimesi" value={totalPeople} highlight />
        <StatCard label="Ei tule" value={notComing} />
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-gold/25">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-emerald/40 text-cream/80">
                <Th>Nimi</Th>
                <Th>Tuleb?</Th>
                <Th>+1</Th>
                <Th>Kaaslase nimi</Th>
                <Th>Aeg</Th>
              </tr>
            </thead>
            <tbody>
              {rsvps.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center font-body text-lg text-cream/50"
                  >
                    Vastuseid veel ei ole.
                  </td>
                </tr>
              ) : (
                rsvps.map((r) => (
                  <tr
                    key={r.id}
                    className="border-t border-gold/10 font-body text-cream/90"
                  >
                    <Td>{r.name}</Td>
                    <Td>
                      <span
                        className={
                          r.attending ? "text-gold-bright" : "text-cream/50"
                        }
                      >
                        {r.attending ? "Jah" : "Ei"}
                      </span>
                    </Td>
                    <Td>{r.plus_one ? "Jah" : "–"}</Td>
                    <Td>{r.plus_one_name || "–"}</Td>
                    <Td>{formatTime(r.created_at)}</Td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`card rounded-2xl p-5 text-center ${
        highlight ? "shadow-glow" : ""
      }`}
    >
      <div
        className={`font-display text-4xl ${
          highlight ? "text-gold-bright" : "text-gold"
        }`}
      >
        {value}
      </div>
      <div className="mt-1 font-body text-base tracking-wide text-cream/70">
        {label}
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 font-body text-base font-semibold tracking-wide">
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3 text-base">{children}</td>;
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("et-EE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}
