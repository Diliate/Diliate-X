"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Server,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Trash2,
  Activity,
  Globe,
  Lock,
} from "lucide-react";

const AGENT_TOKEN = "mailflow-agent-2026";

type InstanceStatus = "active" | "quarantined" | "offline" | "checking";

interface Instance {
  id: string;
  ip: string;
  port: number;
  status: InstanceStatus;
  label: string;
  lastPing: string;
  region: string;
}

const defaultInstances: Instance[] = [
  {
    id: "1",
    ip: "52.91.244.144",
    port: 3000,
    status: "active",
    label: "Primary Agent",
    lastPing: "2s ago",
    region: "us-east-1",
  },
];

const statusStyles: Record<InstanceStatus, string> = {
  active: "bg-green-400/10 text-green-400",
  quarantined: "bg-orange-400/10 text-orange-400",
  offline: "bg-red-400/10 text-red-400",
  checking: "bg-[#f5c842]/10 text-[#f5c842]",
};

const statusIcons: Record<InstanceStatus, React.ElementType> = {
  active: CheckCircle,
  quarantined: AlertCircle,
  offline: XCircle,
  checking: RefreshCw,
};

export default function InstancesPage() {
  const [instances, setInstances] = useState<Instance[]>(defaultInstances);
  const [newIp, setNewIp] = useState("");
  const [newPort, setNewPort] = useState("3000");
  const [newLabel, setNewLabel] = useState("");
  const [adding, setAdding] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [pinging, setPinging] = useState<string | null>(null);

  const pingAll = async () => {
    for (const inst of instances) {
      await pingInstance(inst.id);
    }
  };

  const pingInstance = async (id: string) => {
    setPinging(id);
    const inst = instances.find((i) => i.id === id);
    if (!inst) return;

    try {
      const res = await fetch(`http://${inst.ip}:${inst.port}/health`, {
        method: "GET",
        signal: AbortSignal.timeout(5000),
      });
      const data = await res.json();
      setInstances((prev) =>
        prev.map((i) =>
          i.id === id
            ? { ...i, status: data.status === "ok" ? "active" : "offline", lastPing: "just now" }
            : i
        )
      );
    } catch {
      setInstances((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: "offline", lastPing: "just now" } : i))
      );
    } finally {
      setPinging(null);
    }
  };

  const addInstance = async () => {
    if (!newIp) return;
    setAdding(true);
    try {
      const res = await fetch(`http://${newIp}:${newPort}/health`, {
        signal: AbortSignal.timeout(5000),
      });
      const data = await res.json();
      const status: InstanceStatus = data.status === "ok" ? "active" : "offline";
      setInstances((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          ip: newIp,
          port: parseInt(newPort),
          status,
          label: newLabel || `Agent ${prev.length + 1}`,
          lastPing: "just now",
          region: "us-east-1",
        },
      ]);
      setNewIp("");
      setNewLabel("");
      setShowAdd(false);
    } catch {
      setInstances((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          ip: newIp,
          port: parseInt(newPort),
          status: "offline",
          label: newLabel || `Agent ${prev.length + 1}`,
          lastPing: "just now",
          region: "us-east-1",
        },
      ]);
      setShowAdd(false);
    } finally {
      setAdding(false);
    }
  };

  const removeInstance = (id: string) => {
    setInstances((prev) => prev.filter((i) => i.id !== id));
  };

  const activeCount = instances.filter((i) => i.status === "active").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#f0f0f0]">EC2 Instances</h1>
          <p className="mt-1 text-sm text-[#555]">Manage your email sending agents</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={pingAll}
            className="flex items-center gap-2 rounded-md border border-[#2a2a2a] px-3 py-2 text-sm text-[#888] transition-all hover:bg-[#1a1a1a] hover:text-[#f0f0f0]"
          >
            <RefreshCw className="h-4 w-4" />
            Ping All
          </button>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 rounded-md bg-[#f5c842] px-4 py-2 text-sm font-semibold text-[#0d0d0d] transition-all hover:bg-[#f0c030]"
          >
            <Plus className="h-4 w-4" />
            Add Instance
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Instances", value: instances.length, icon: Server },
          { label: "Active", value: activeCount, icon: CheckCircle },
          {
            label: "Quarantined / Offline",
            value: instances.length - activeCount,
            icon: AlertCircle,
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="rounded-xl border border-[#1e1e1e] bg-[#111] p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#555]">{stat.label}</p>
              <stat.icon className="h-4 w-4 text-[#444]" />
            </div>
            <p className="mt-3 text-3xl font-bold text-[#f0f0f0]">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Add instance form */}
      {showAdd && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-[#f5c842]/30 bg-[#f5c842]/5 p-5"
        >
          <h3 className="mb-4 text-sm font-semibold text-[#f0f0f0]">Add New EC2 Instance</h3>
          <div className="grid gap-3 sm:grid-cols-4">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs text-[#666]">IP Address</label>
              <input
                type="text"
                placeholder="52.91.x.x"
                value={newIp}
                onChange={(e) => setNewIp(e.target.value)}
                className="w-full rounded-md border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2 text-sm text-[#f0f0f0] placeholder-[#444] outline-none focus:border-[#f5c842]/50"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-[#666]">Port</label>
              <input
                type="number"
                value={newPort}
                onChange={(e) => setNewPort(e.target.value)}
                className="w-full rounded-md border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2 text-sm text-[#f0f0f0] outline-none focus:border-[#f5c842]/50"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-[#666]">Label (optional)</label>
              <input
                type="text"
                placeholder="Agent 2"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                className="w-full rounded-md border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2 text-sm text-[#f0f0f0] placeholder-[#444] outline-none focus:border-[#f5c842]/50"
              />
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={addInstance}
              disabled={adding || !newIp}
              className="rounded-md bg-[#f5c842] px-4 py-2 text-sm font-semibold text-[#0d0d0d] disabled:opacity-40"
            >
              {adding ? "Checking..." : "Add & Ping"}
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="rounded-md border border-[#2a2a2a] px-4 py-2 text-sm text-[#666] hover:bg-[#1a1a1a]"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Instance list */}
      <div className="rounded-xl border border-[#1e1e1e] bg-[#111]">
        <div className="border-b border-[#1e1e1e] px-5 py-4">
          <h2 className="text-sm font-semibold text-[#f0f0f0]">Agent Instances</h2>
        </div>
        {instances.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Server className="mb-3 h-10 w-10 text-[#2a2a2a]" />
            <p className="text-sm text-[#444]">No instances configured</p>
            <button
              onClick={() => setShowAdd(true)}
              className="mt-3 text-sm text-[#f5c842] hover:underline"
            >
              Add your first instance →
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[#1e1e1e]">
            {instances.map((inst) => {
              const StatusIcon = statusIcons[inst.status];
              return (
                <div key={inst.id} className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1e1e1e]">
                      <Server className="h-5 w-5 text-[#555]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-[#f0f0f0]">{inst.label}</p>
                        <span
                          className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[inst.status]}`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {inst.status}
                        </span>
                      </div>
                      <div className="mt-0.5 flex items-center gap-3 text-xs text-[#555]">
                        <span className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          {inst.ip}:{inst.port}
                        </span>
                        <span>{inst.region}</span>
                        <span>Pinged: {inst.lastPing}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => pingInstance(inst.id)}
                      disabled={pinging === inst.id}
                      className="flex items-center gap-1.5 rounded-md border border-[#2a2a2a] px-3 py-1.5 text-xs text-[#666] transition-all hover:bg-[#1a1a1a] hover:text-[#888] disabled:opacity-50"
                    >
                      <Activity className="h-3.5 w-3.5" />
                      {pinging === inst.id ? "Pinging..." : "Ping"}
                    </button>
                    <button
                      onClick={() => removeInstance(inst.id)}
                      className="rounded-md p-1.5 text-[#444] transition-all hover:bg-red-900/20 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Agent token info */}
      <div className="rounded-xl border border-[#1e1e1e] bg-[#111] p-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#f0f0f0]">
          <Lock className="h-4 w-4 text-[#f5c842]" />
          Agent Configuration
        </div>
        <p className="mt-2 text-xs text-[#555]">
          Your EC2 agents authenticate using the agent token below. Make sure each instance has this
          token configured in its environment.
        </p>
        <div className="mt-3 flex items-center gap-2 rounded-md border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2">
          <code className="flex-1 font-mono text-xs text-[#f5c842]">{AGENT_TOKEN}</code>
          <button
            onClick={() => navigator.clipboard.writeText(AGENT_TOKEN)}
            className="text-xs text-[#444] hover:text-[#888]"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}
