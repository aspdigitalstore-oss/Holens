import { Building2, PackageCheck } from "lucide-react";
import { MOQ_LABEL, MOQ_NOTICE } from "@/lib/moq";
import { NO_RETAIL_NOTICE, WHOLESALE_HERO_NOTICE, WHOLESALE_ONLY_LABEL } from "@/lib/company";

export function WholesaleNotice({
  compact = false,
  dark = false,
}: {
  compact?: boolean;
  dark?: boolean;
}) {
  const tone = dark ? "border-white/15 bg-white/10 text-white" : "border-black/10 bg-bone text-ink";
  const muted = dark ? "text-white/70" : "text-muted-foreground";

  return (
    <div className={`rounded-md border ${tone} ${compact ? "p-4" : "p-6 md:p-8"}`}>
      <div className="flex items-start gap-3">
        <Building2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em]">
            {WHOLESALE_ONLY_LABEL}
          </p>
          <p className={`${compact ? "mt-1 text-sm" : "mt-2 text-lg font-medium"}`}>
            {WHOLESALE_HERO_NOTICE}
          </p>
          <p className={`mt-1 text-sm ${muted}`}>{NO_RETAIL_NOTICE}</p>
        </div>
      </div>
    </div>
  );
}

export function MOQNotice({
  compact = false,
  dark = false,
}: {
  compact?: boolean;
  dark?: boolean;
}) {
  const tone = dark
    ? "border-white/15 bg-white/10 text-white"
    : "border-lime-dim/30 bg-lime/10 text-ink";
  const muted = dark ? "text-white/70" : "text-ink/70";

  return (
    <div className={`rounded-md border ${tone} ${compact ? "p-4" : "p-6 md:p-8"}`}>
      <div className="flex items-start gap-3">
        <PackageCheck className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
        <div>
          <p className="text-sm font-semibold">{MOQ_LABEL}</p>
          <p className={`mt-1 text-sm ${muted}`}>{MOQ_NOTICE}</p>
        </div>
      </div>
    </div>
  );
}
