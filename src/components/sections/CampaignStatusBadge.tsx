import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  running: "bg-blue-400/10 text-blue-400",
  sending: "bg-blue-400/10 text-blue-400",
  sent: "bg-green-400/10 text-green-400",
  completed: "bg-green-400/10 text-green-400",
  paused: "bg-orange-400/10 text-orange-400",
  failed: "bg-red-400/10 text-red-400",
};

/** Colored pill for a campaign status (draft, running, sent, paused, failed). */
export default function CampaignStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
        statusStyles[status] ?? statusStyles.draft,
      )}
    >
      {status}
    </span>
  );
}
