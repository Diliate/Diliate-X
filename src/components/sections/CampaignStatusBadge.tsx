import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  running: "bg-blue-50 text-blue-700",
  sending: "bg-blue-50 text-blue-700",
  sent: "bg-green-50 text-green-700",
  completed: "bg-green-50 text-green-700",
  paused: "bg-orange-50 text-orange-700",
  failed: "bg-red-50 text-red-700",
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
