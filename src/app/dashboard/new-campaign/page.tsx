"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Mail,
  Server,
  Zap,
  FileText,
  Paperclip,
  X,
  ChevronDown,
  AlertCircle,
  Play,
} from "lucide-react";

const sendingModes = [
  { value: "smtp_csv", label: "SMTP (CSV list)", desc: "Upload CSV with SMTP credentials per row" },
  { value: "smtp_list", label: "SMTP (Single server)", desc: "One SMTP server for all recipients" },
  { value: "gmail_api", label: "Gmail API", desc: "Send via OAuth2 Gmail accounts from pool" },
];

interface Attachment {
  name: string;
  size: number;
  base64: string;
  type: string;
}

export default function NewCampaignPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Step 1 — Campaign basics
  const [name, setName] = useState("");
  const [sendMode, setSendMode] = useState("smtp_csv");
  const [pages, setPages] = useState(1);

  // Step 2 — Recipients & SMTP
  const [recipientFile, setRecipientFile] = useState<File | null>(null);
  const [smtpHost, setSmtpHost] = useState("");
  const [smtpPort, setSmtpPort] = useState("587");
  const [smtpUser, setSmtpUser] = useState("");
  const [smtpPass, setSmtpPass] = useState("");

  // Step 3 — Email content
  const [subject, setSubject] = useState("");
  const [fromName, setFromName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [htmlBody, setHtmlBody] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const fileRef = useRef<HTMLInputElement>(null);
  const attachRef = useRef<HTMLInputElement>(null);

  const handleAttachment = async (files: FileList | null) => {
    if (!files) return;
    for (const file of Array.from(files)) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(",")[1];
        setAttachments((prev) => [
          ...prev,
          { name: file.name, size: file.size, base64, type: file.type },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLaunch = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("diliate_token");
      const body: Record<string, unknown> = {
        name,
        sendMode,
        pages,
        subject,
        fromName,
        fromEmail,
        htmlBody,
        attachments,
      };

      if (sendMode === "smtp_list") {
        body.smtpConfig = { host: smtpHost, port: parseInt(smtpPort), user: smtpUser, pass: smtpPass };
      }

      // Upload recipient file if present
      if (recipientFile) {
        const text = await recipientFile.text();
        body.recipientsCsv = text;
      }

      const res = await fetch("/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create campaign");
      window.location.href = `/dashboard/campaigns/${data.id}`;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#f0f0f0]">New Campaign</h1>
        <p className="mt-1 text-sm text-[#555]">Configure and launch your email campaign</p>
      </div>

      {/* Steps indicator */}
      <div className="flex items-center gap-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <button
              onClick={() => setStep(s)}
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${
                step === s
                  ? "bg-[#f5c842] text-[#0d0d0d]"
                  : step > s
                  ? "bg-[#f5c842]/20 text-[#f5c842]"
                  : "bg-[#1e1e1e] text-[#444]"
              }`}
            >
              {s}
            </button>
            <span className={`text-xs ${step === s ? "text-[#f0f0f0]" : "text-[#444]"}`}>
              {s === 1 ? "Basics" : s === 2 ? "Recipients" : "Content"}
            </span>
            {s < 3 && <div className="h-px w-8 bg-[#1e1e1e]" />}
          </div>
        ))}
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-md border border-red-900/50 bg-red-900/20 px-4 py-3 text-sm text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {/* ── Step 1: Basics ── */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-5 rounded-xl border border-[#1e1e1e] bg-[#111] p-6"
        >
          <h2 className="text-base font-semibold text-[#f0f0f0]">Campaign Basics</h2>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#888]">Campaign Name</label>
            <input
              type="text"
              placeholder="e.g. Q4 Newsletter Blast"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2.5 text-sm text-[#f0f0f0] placeholder-[#444] outline-none focus:border-[#f5c842]/50 focus:ring-1 focus:ring-[#f5c842]/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#888]">Sending Mode</label>
            <div className="space-y-2">
              {sendingModes.map((mode) => (
                <button
                  key={mode.value}
                  onClick={() => setSendMode(mode.value)}
                  className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-all ${
                    sendMode === mode.value
                      ? "border-[#f5c842]/50 bg-[#f5c842]/5"
                      : "border-[#1e1e1e] hover:border-[#2a2a2a] hover:bg-[#1a1a1a]"
                  }`}
                >
                  <div
                    className={`mt-0.5 h-4 w-4 rounded-full border-2 ${
                      sendMode === mode.value
                        ? "border-[#f5c842] bg-[#f5c842]"
                        : "border-[#333]"
                    }`}
                  />
                  <div>
                    <div className="text-sm font-medium text-[#f0f0f0]">{mode.label}</div>
                    <div className="text-xs text-[#555]">{mode.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Pages (multi-page) */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#888]">
              Number of Pages{" "}
              <span className="text-[#444]">(simultaneous sending threads, max 4)</span>
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  onClick={() => setPages(n)}
                  className={`h-9 w-12 rounded-md text-sm font-medium transition-all ${
                    pages === n
                      ? "bg-[#f5c842] text-[#0d0d0d]"
                      : "border border-[#2a2a2a] text-[#555] hover:border-[#444] hover:text-[#888]"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            {pages > 1 && (
              <p className="mt-1.5 text-xs text-[#555]">
                Each page uses a different EC2 instance IP for better deliverability.
              </p>
            )}
          </div>

          <button
            disabled={!name}
            onClick={() => setStep(2)}
            className="w-full rounded-md bg-[#f5c842] py-2.5 text-sm font-semibold text-[#0d0d0d] transition-all hover:bg-[#f0c030] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue
          </button>
        </motion.div>
      )}

      {/* ── Step 2: Recipients ── */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-5 rounded-xl border border-[#1e1e1e] bg-[#111] p-6"
        >
          <h2 className="text-base font-semibold text-[#f0f0f0]">Recipients & Sending Config</h2>

          {/* CSV Upload */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#888]">
              {sendMode === "smtp_csv" ? "SMTP CSV File (email,host,port,user,pass)" : "Recipient List (CSV — one email per row)"}
            </label>
            <div
              className="cursor-pointer rounded-lg border border-dashed border-[#2a2a2a] p-6 text-center transition-all hover:border-[#f5c842]/30 hover:bg-[#f5c842]/5"
              onClick={() => fileRef.current?.click()}
            >
              <Upload className="mx-auto mb-2 h-6 w-6 text-[#444]" />
              {recipientFile ? (
                <p className="text-sm text-[#f0f0f0]">{recipientFile.name}</p>
              ) : (
                <>
                  <p className="text-sm text-[#555]">Click to upload or drag & drop</p>
                  <p className="text-xs text-[#444]">.csv files only</p>
                </>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => setRecipientFile(e.target.files?.[0] ?? null)}
            />
          </div>

          {/* SMTP config (for smtp_list mode) */}
          {sendMode === "smtp_list" && (
            <div className="space-y-3 rounded-lg border border-[#1e1e1e] p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#555]">SMTP Configuration</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs text-[#666]">SMTP Host</label>
                  <input
                    type="text"
                    placeholder="smtp.gmail.com"
                    value={smtpHost}
                    onChange={(e) => setSmtpHost(e.target.value)}
                    className="w-full rounded-md border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2 text-sm text-[#f0f0f0] placeholder-[#444] outline-none focus:border-[#f5c842]/50"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-[#666]">Port</label>
                  <input
                    type="number"
                    placeholder="587"
                    value={smtpPort}
                    onChange={(e) => setSmtpPort(e.target.value)}
                    className="w-full rounded-md border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2 text-sm text-[#f0f0f0] placeholder-[#444] outline-none focus:border-[#f5c842]/50"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-[#666]">Username</label>
                  <input
                    type="text"
                    placeholder="your@email.com"
                    value={smtpUser}
                    onChange={(e) => setSmtpUser(e.target.value)}
                    className="w-full rounded-md border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2 text-sm text-[#f0f0f0] placeholder-[#444] outline-none focus:border-[#f5c842]/50"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-[#666]">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={smtpPass}
                    onChange={(e) => setSmtpPass(e.target.value)}
                    className="w-full rounded-md border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2 text-sm text-[#f0f0f0] placeholder-[#444] outline-none focus:border-[#f5c842]/50"
                  />
                </div>
              </div>
            </div>
          )}

          {sendMode === "gmail_api" && (
            <div className="rounded-lg border border-blue-900/40 bg-blue-900/10 px-4 py-3 text-sm text-blue-400">
              Gmail API mode will use accounts from your Gmail Pool. Configure accounts in Settings → Gmail Pool.
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="flex-1 rounded-md border border-[#2a2a2a] py-2.5 text-sm font-semibold text-[#888] transition-all hover:bg-[#1a1a1a]"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex-1 rounded-md bg-[#f5c842] py-2.5 text-sm font-semibold text-[#0d0d0d] transition-all hover:bg-[#f0c030]"
            >
              Continue
            </button>
          </div>
        </motion.div>
      )}

      {/* ── Step 3: Content ── */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-5 rounded-xl border border-[#1e1e1e] bg-[#111] p-6"
        >
          <h2 className="text-base font-semibold text-[#f0f0f0]">Email Content</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#888]">From Name</label>
              <input
                type="text"
                placeholder="Your Company"
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
                className="w-full rounded-md border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2.5 text-sm text-[#f0f0f0] placeholder-[#444] outline-none focus:border-[#f5c842]/50 focus:ring-1 focus:ring-[#f5c842]/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#888]">From Email</label>
              <input
                type="email"
                placeholder="hello@yourcompany.com"
                value={fromEmail}
                onChange={(e) => setFromEmail(e.target.value)}
                className="w-full rounded-md border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2.5 text-sm text-[#f0f0f0] placeholder-[#444] outline-none focus:border-[#f5c842]/50 focus:ring-1 focus:ring-[#f5c842]/20"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#888]">Subject Line</label>
            <input
              type="text"
              placeholder="Your email subject..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-md border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2.5 text-sm text-[#f0f0f0] placeholder-[#444] outline-none focus:border-[#f5c842]/50 focus:ring-1 focus:ring-[#f5c842]/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#888]">
              HTML Body{" "}
              <span className="text-[#444]">(paste your HTML email template)</span>
            </label>
            <textarea
              rows={12}
              placeholder="<html><body>Your email content here...</body></html>"
              value={htmlBody}
              onChange={(e) => setHtmlBody(e.target.value)}
              className="w-full rounded-md border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2.5 font-mono text-sm text-[#f0f0f0] placeholder-[#444] outline-none focus:border-[#f5c842]/50 focus:ring-1 focus:ring-[#f5c842]/20"
            />
          </div>

          {/* Attachments */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#888]">
              Attachments <span className="text-[#444]">(optional)</span>
            </label>
            <div
              className="cursor-pointer rounded-lg border border-dashed border-[#2a2a2a] p-4 text-center transition-all hover:border-[#f5c842]/30"
              onClick={() => attachRef.current?.click()}
            >
              <Paperclip className="mx-auto mb-1 h-5 w-5 text-[#444]" />
              <p className="text-xs text-[#555]">Click to attach files</p>
            </div>
            <input
              ref={attachRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleAttachment(e.target.files)}
            />
            {attachments.length > 0 && (
              <div className="mt-2 space-y-1.5">
                {attachments.map((att, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-md border border-[#1e1e1e] px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-[#555]" />
                      <span className="text-xs text-[#888]">{att.name}</span>
                      <span className="text-xs text-[#444]">
                        ({(att.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <button
                      onClick={() => setAttachments(attachments.filter((_, j) => j !== i))}
                      className="text-[#444] hover:text-red-400"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="flex-1 rounded-md border border-[#2a2a2a] py-2.5 text-sm font-semibold text-[#888] transition-all hover:bg-[#1a1a1a]"
            >
              Back
            </button>
            <button
              onClick={handleLaunch}
              disabled={loading || !subject || !htmlBody}
              className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#f5c842] py-2.5 text-sm font-semibold text-[#0d0d0d] transition-all hover:bg-[#f0c030] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Play className="h-4 w-4" />
              {loading ? "Launching..." : "Launch Campaign"}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
