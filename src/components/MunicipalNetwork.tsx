import React from "react";
import { motion } from "motion/react";
import { MapPin, TrendingDown, TrendingUp } from "lucide-react";
import { CityData } from "../types";

interface MunicipalNetworkProps {
  citiesData: CityData[];
  selectedCityNode: string;
  setSelectedCityNode: (city: string) => void;
  triggerToast: (msg: string, type?: "success" | "info") => void;
}

export const MunicipalNetwork = React.memo(function MunicipalNetwork({
  citiesData,
  selectedCityNode,
  setSelectedCityNode,
  triggerToast,
}: MunicipalNetworkProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-6"
      id="municipal-network-panel"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white uppercase font-sans">Metropolitan Carbon Integration Grid</h2>
          <p className="text-xs text-zinc-400 font-sans leading-relaxed">
            Live monitoring nodes syncing consolidated supermarket basket footprints. Every scan recalibrates metropolitan averages.
          </p>
        </div>
        <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider bg-[#11131a] px-2.5 py-1.5 rounded border border-zinc-800 shrink-0">
          Global Baseline Median Target: 4.8kg CO₂e
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {citiesData.map((city) => {
          const isCitySelectedNode = city.name.toLowerCase() === selectedCityNode.toLowerCase() || (selectedCityNode === "Bengaluru" && city.name === "Bengaluru");
          return (
            <div 
              key={city.name}
              onClick={() => {
                setSelectedCityNode(city.name);
                triggerToast(`Focused grid benchmarks on ${city.name} cluster`, "info");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedCityNode(city.name);
                  triggerToast(`Focused grid benchmarks on ${city.name} cluster`, "info");
                }
              }}
              role="button"
              tabIndex={0}
              className={`p-5 rounded-lg border transition-all duration-300 flex flex-col justify-between space-y-4 cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-500/50 group ${
                isCitySelectedNode 
                  ? "bg-[#131621] border-[#10b981]/50 shadow shadow-[#10b981]/5" 
                  : "bg-[#11131a] border-zinc-800 hover:border-zinc-700"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-1.5">
                  <MapPin className={`h-4 w-4 ${isCitySelectedNode ? "text-[#10b981]" : "text-[#3b82f6]"}`} />
                  <span className="text-sm font-bold font-sans text-white">{city.name}</span>
                </div>
                <span className="text-[9px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 px-1.5 py-[1px] rounded leading-none shrink-0">RANK {city.rank}</span>
              </div>

              <div>
                <span className="text-[9px] text-zinc-500 font-mono uppercase font-black tracking-wider block mb-0.5">Basket Average Footprint</span>
                <div className="flex items-baseline gap-1">
                  <span className={`text-2xl font-mono font-black ${isCitySelectedNode ? "text-emerald-400" : "text-white"}`}>{city.avgCo2}</span>
                  <span className="text-[10px] text-zinc-500 font-mono font-bold">KG CO₂e</span>
                </div>
              </div>

              <div className="border-t border-zinc-800/80 pt-3 space-y-1 text-[10px] font-mono leading-relaxed">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Emission Leader</span>
                  <span className="text-emerald-400 font-semibold truncate max-w-[110px] block">{city.emissionLeader}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Highest Sector</span>
                  <span className="text-zinc-200 truncate max-w-[110px] block">{city.topSector}</span>
                </div>
              </div>

              <div className="flex justify-center items-center py-1 rounded bg-black/30 text-[9px] uppercase font-mono font-bold">
                {city.trend === "improving" ? (
                  <span className="text-emerald-400 flex items-center gap-1 leading-none">
                    <TrendingDown className="h-3.5 w-3.5" />
                    CONTR_STEADY
                  </span>
                ) : (
                  <span className="text-orange-400 flex items-center gap-1 leading-none">
                    <TrendingUp className="h-3.5 w-3.5" />
                    EXCEED_MEDIAN
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-[#11131a] p-5 rounded-xl border border-[#1e2230]">
        <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-zinc-400 mb-3 block">Metropolitan Cooperative Leaderboards</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1e2230] pb-2 text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                <th className="py-2 font-bold">Grid Sub-Cluster</th>
                <th className="py-2 font-bold">Local Cooperatives</th>
                <th className="py-2 font-bold text-center">Consolidated Contraction %</th>
                <th className="py-2 font-bold text-right">Synchronization State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-805 text-[11px] font-mono">
              <tr className="hover:bg-white/[0.005]">
                <td className="py-3 font-sans text-xs font-semibold text-zinc-200">Bengaluru East Node (Whitefield Cooperative)</td>
                <td className="py-3 text-[#3b82f6]">42 Organic Hubs</td>
                <td className="py-3 text-center text-emerald-400 font-bold">-26.4% CO₂</td>
                <td className="py-3 text-right">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px]">ACTIVE_NODE</span>
                </td>
              </tr>
              <tr className="hover:bg-white/[0.005]">
                <td className="py-3 font-sans text-xs font-semibold text-zinc-200">Mumbai West Core (Bandra Local Union)</td>
                <td className="py-3 text-[#3b82f6]">29 Transit Hubs</td>
                <td className="py-3 text-center text-emerald-400 font-bold">-18.2% CO₂</td>
                <td className="py-3 text-right">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px]">ACTIVE_NODE</span>
                </td>
              </tr>
              <tr className="hover:bg-white/[0.005]">
                <td className="py-3 font-sans text-xs font-semibold text-zinc-200">Pune Metro Ring (Kothrud Carbon Front)</td>
                <td className="py-3 text-[#3b82f6]">54 Food Clusters</td>
                <td className="py-3 text-center text-emerald-400 font-bold">-34.1% CO₂</td>
                <td className="py-3 text-right">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px]">ACTIVE_NODE</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
});
