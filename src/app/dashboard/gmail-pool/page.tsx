"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Inbox, Mail, PlusCircle, RefreshCw, Trash2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import {
  apiFetch,
  formatDate,
  toGmailAccounts,
  type GmailAccount,
} from "@/lib/dashboard";

const accountStatusStyles: Record<string, string> = {
  active: "bg-green-400/10 text-green-400",
  connected: "bg-green-400/10 text-green-400",
  paused: "bg-orange-400/10 text-orange-400",
  expired: "bg-red-400/10 text-red-400",
  error: "bg-red-400/10 text-red-400",
  revoked: "bg-red-400/10 text-red-400",
};

export default function GmailPoolPage() {
  const [accounts, setAccounts] = useState<GmailAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const loadAccounts = useCallback(
    () =>
      apiFetch("/api/gmail-pool")
        .then((data) => {
          setAccounts(toGmailAccounts(data));
          setError("");
        })
        .catch((err: Error) =>
          setError(err.message || "Could not load Gmail accounts"),
        )
        .finally(() => setLoading(false)),
    [],
  );

  useEffect(() => {
    loadAccounts();
    // Refresh when the user returns from the OAuth tab.
    const onFocus = () => loadAccounts();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [loadAccounts]);

  const handleConnect = async () => {
    setConnecting(true);
    setError("");
    // Open the tab synchronously so popup blockers allow it, then point it at the OAuth URL.
    const tab = window.open("", "_blank");
    try {
      const data = await apiFetch<{ authUrl?: string; url?: string }>(
        "/api/gmail-pool/auth",
      );
      const authUrl = data.authUrl ?? data.url;
      if (!authUrl)
        throw new Error("The backend did not return an authorization URL");
      if (tab) {
        tab.opener = null;
        tab.location.href = authUrl;
      } else {
        window.location.href = authUrl;
      }
    } catch (err: unknown) {
      tab?.close();
      setError(
        err instanceof Error ? err.message : "Could not start Gmail connection",
      );
    } finally {
      setConnecting(false);
    }
  };

  const handleRemove = async (account: GmailAccount) => {
    if (!window.confirm(`Remove ${account.email} from your Gmail pool?`))
      return;
    setRemovingId(account.id);
    setError("");
    try {
      await apiFetch(`/api/gmail-pool?id=${encodeURIComponent(account.id)}`, {
        method: "DELETE",
      });
      setAccounts((prev) => prev.filter((a) => a.id !== account.id));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not remove account");
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-foreground text-2xl font-bold">Gmail Pool</h1>
          <p className="text-secondary-foreground mt-1 text-sm">
            Gmail accounts connected via OAuth that campaigns can send from.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setLoading(true);
              loadAccounts();
            }}
            aria-label="Refresh accounts"
            className="border-border text-secondary-foreground hover:bg-secondary hover:text-foreground rounded-md border p-2"
          >
            <RefreshCw aria-hidden className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleConnect}
            disabled={connecting}
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-60"
          >
            <PlusCircle aria-hidden className="h-4 w-4" />
            {connecting ? "Opening Google…" : "Connect Gmail Account"}
          </button>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-md border border-red-900/50 bg-red-900/20 px-4 py-3 text-sm text-red-400"
        >
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <Spinner label="Loading Gmail accounts" />
        </div>
      ) : accounts.length === 0 ? (
        <div className="border-border bg-card flex flex-col items-center gap-3 rounded-xl border border-dashed px-6 py-16 text-center">
          <div className="bg-primary/10 rounded-full p-3">
            <Inbox aria-hidden className="text-primary h-6 w-6" />
          </div>
          <p className="text-secondary-foreground text-sm">
            No Gmail accounts connected yet. Connect one to start sending.
          </p>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {accounts.map((account, i) => (
            <motion.li
              key={account.id || account.email}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="border-border bg-card flex flex-col gap-4 rounded-xl border p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="bg-secondary flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                    <Mail
                      aria-hidden
                      className="text-muted-foreground h-4 w-4"
                    />
                  </div>
                  <p
                    className="text-foreground truncate text-sm font-medium"
                    title={account.email}
                  >
                    {account.email}
                  </p>
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                    accountStatusStyles[account.status] ??
                      "bg-muted text-muted-foreground",
                  )}
                >
                  {account.status}
                </span>
              </div>
              <div className="text-secondary-foreground flex items-center justify-between text-xs">
                <span>Connected {formatDate(account.connectedAt)}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(account)}
                  disabled={removingId === account.id}
                  className="text-secondary-foreground flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:bg-red-400/10 hover:text-red-400 disabled:opacity-60"
                >
                  <Trash2 aria-hidden className="h-3.5 w-3.5" />
                  {removingId === account.id ? "Removing…" : "Remove"}
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
}
