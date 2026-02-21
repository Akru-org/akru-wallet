import { useMemo, useState, memo } from "react";
import type { Asset } from "@/types";
import { SparklineChart } from "@/components/market/SparklineChart";
import { cn } from "@/lib/utils";

const VES_TO_USD = 36.5;

export type SortKey = "rank" | "name" | "price" | "change1h" | "change24h" | "change7d" | "marketCap" | "volume24h";

interface MarketTableProps {
  assets: Asset[];
  onBuy?: (asset: Asset) => void;
}

function toUsd(asset: Asset): number {
  return asset.currency === "VES" ? asset.price / VES_TO_USD : asset.price;
}

function formatMarketCap(n: number): string {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  return `$${n.toLocaleString()}`;
}

const HEADERS: { key: SortKey | null; label: string; align: "left" | "right" }[] = [
  { key: "rank", label: "#", align: "right" },
  { key: "name", label: "Name", align: "left" },
  { key: "price", label: "Price", align: "right" },
  { key: "change1h", label: "1h", align: "right" },
  { key: "change24h", label: "24h", align: "right" },
  { key: "change7d", label: "7d", align: "right" },
  { key: "marketCap", label: "Market Cap", align: "right" },
  { key: "volume24h", label: "Volume (24h)", align: "right" },
  { key: null, label: "Last 7 Days", align: "left" },
  { key: null, label: "Buy", align: "right" },
];

export function MarketTable({ assets, onBuy }: MarketTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("marketCap");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const sorted = useMemo(() => {
    const list = [...assets];
    list.sort((a, b) => {
      let va: number | string = 0;
      let vb: number | string = 0;
      switch (sortKey) {
        case "rank":
          va = a.marketCap;
          vb = b.marketCap;
          break;
        case "name":
          va = a.name;
          vb = b.name;
          break;
        case "price":
          va = toUsd(a);
          vb = toUsd(b);
          break;
        case "change1h":
          va = a.change1h;
          vb = b.change1h;
          break;
        case "change24h":
          va = a.change24h;
          vb = b.change24h;
          break;
        case "change7d":
          va = a.change7d;
          vb = b.change7d;
          break;
        case "marketCap":
          va = a.marketCap;
          vb = b.marketCap;
          break;
        case "volume24h":
          va = a.volume24h;
          vb = b.volume24h;
          break;
        default:
          return 0;
      }
      if (typeof va === "string") return sortDir === "asc" ? (va as string).localeCompare(vb as string) : (vb as string).localeCompare(va as string);
      const diff = (va as number) - (vb as number);
      return sortDir === "asc" ? diff : -diff;
    });
    return list;
  }, [assets, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-neutral-800 bg-[#121212]">
      <table className="w-full min-w-[900px] text-sm">
        <thead>
          <tr className="border-b border-neutral-800 text-xs font-medium text-neutral-400">
            {HEADERS.map((h, i) => (
              <th
                key={i}
                className={cn(
                  "whitespace-nowrap px-3 py-3",
                  h.align === "right" ? "text-right" : "text-left",
                  h.key != null && "cursor-pointer hover:text-[#00F5D4]"
                )}
                onClick={() => h.key != null && toggleSort(h.key)}
              >
                {h.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800">
          {sorted.map((asset, index) => (
            <MarketRow key={asset.id} asset={asset} rank={index + 1} onBuy={onBuy} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

const MarketRow = memo(function MarketRow({
  asset,
  rank,
  onBuy,
}: {
  asset: Asset;
  rank: number;
  onBuy?: (a: Asset) => void;
}) {
  const priceUsd = toUsd(asset);
  const positive7d = asset.change7d >= 0;

  return (
    <tr className="transition-colors hover:bg-neutral-800/50">
      <td className="px-3 py-3 text-right tabular-nums text-neutral-400">{rank}</td>
      <td className="px-3 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#007AFF]/20 text-sm font-bold text-[#007AFF]">
            {asset.symbol.slice(0, 2)}
          </div>
          <div>
            <p className="font-semibold text-white">{asset.symbol}</p>
            <p className="text-xs text-neutral-400">{asset.name}</p>
          </div>
        </div>
      </td>
      <td className="px-3 py-3 text-right font-medium tabular-nums text-white">
        ${priceUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
      </td>
      <td className="px-3 py-3 text-right">
        <ChangeCell value={asset.change1h} />
      </td>
      <td className="px-3 py-3 text-right">
        <ChangeCell value={asset.change24h} />
      </td>
      <td className="px-3 py-3 text-right">
        <ChangeCell value={asset.change7d} />
      </td>
      <td className="px-3 py-3 text-right tabular-nums text-neutral-400">
        {formatMarketCap(asset.marketCap)}
      </td>
      <td className="px-3 py-3 text-right tabular-nums text-neutral-400">
        {formatMarketCap(asset.volume24h)}
      </td>
      <td className="px-3 py-3" style={{ width: 120 }}>
        <SparklineChart data={asset.priceHistory} positive={positive7d} />
      </td>
      <td className="px-3 py-3 text-right">
        <button
          type="button"
          onClick={() => onBuy?.(asset)}
          className="rounded-lg bg-[#007AFF] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#007AFF]/90"
        >
          Buy
        </button>
      </td>
    </tr>
  );
});

function ChangeCell({ value }: { value: number }) {
  const isPositive = value >= 0;
  return (
    <span className={cn("tabular-nums font-medium", isPositive ? "text-emerald-500" : "text-red-500")}>
      {isPositive ? "+" : ""}
      {value.toFixed(2)}%
    </span>
  );
}
