import React from "react";
import { motion } from "motion/react";
import { Upload, RefreshCw, CheckCircle, Leaf, Terminal } from "lucide-react";
import { AnalysisResult, ReceiptItem } from "../types";
import { ScannerPresets } from "./ScannerPresets";
import { ScannerPipeline } from "./ScannerPipeline";

const getEcoColor = (rating: "A" | "B" | "C" | "D" | "E") => {
  switch (rating) {
    case "A": return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30";
    case "B": return "bg-green-500/10 text-green-400 border border-green-500/30";
    case "C": return "bg-amber-500/10 text-amber-400 border border-amber-500/30";
    case "D": return "bg-orange-500/10 text-orange-400 border border-orange-500/30";
    case "E": return "bg-red-500/10 text-red-400 border border-red-500/40 animate-pulse";
    default: return "bg-zinc-800 text-zinc-300 border border-zinc-750";
  }
};

interface WorkspaceScannerProps {
  uploadProgress: string | null;
  dragActive: boolean;
  setDragActive: (active: boolean) => void;
  pipelineActive: boolean;
  pipelineStep: number;
  scanResult: AnalysisResult;
  receiptsHistory: AnalysisResult[];
  setScanResult: (res: AnalysisResult) => void;
  handleFileProcessing: (file: File) => void;
  triggerSampleScan: (sampleId: string) => void;
  triggerToast: (msg: string, type?: "success" | "info") => void;
  setActiveTab: (tab: "workspace" | "twin" | "coach" | "network" | "actions") => void;
  selectedCityNode: string;
  updateScanResultItem: (item: ReceiptItem) => void;
}

export const WorkspaceScanner = React.memo(function WorkspaceScanner({
  uploadProgress,
  dragActive,
  setDragActive,
  pipelineActive,
  pipelineStep,
  scanResult,
  receiptsHistory,
  setScanResult,
  handleFileProcessing,
  triggerSampleScan,
  triggerToast,
  setActiveTab,
  selectedCityNode,
  updateScanResultItem,
}: WorkspaceScannerProps) {
  // Inline edit states
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editName, setEditName] = React.useState<string>("");
  const [editQuantity, setEditQuantity] = React.useState<string>("");
  const [editCategory, setEditCategory] = React.useState<string>("");
  const [editEcoRating, setEditEcoRating] = React.useState<"A" | "B" | "C" | "D" | "E">("A");
  const [editCo2, setEditCo2] = React.useState<number>(0);

  const startEditing = (item: ReceiptItem) => {
    setEditingId(item.id);
    setEditName(item.name);
    setEditQuantity(item.quantity);
    setEditCategory(item.category);
    setEditEcoRating(item.ecoRating);
    setEditCo2(item.co2);
  };

  const saveEditing = (item: ReceiptItem) => {
    if (!editName.trim()) {
      triggerToast("Name cannot be empty", "info");
      return;
    }
    const updated: ReceiptItem = {
      ...item,
      name: editName.trim(),
      quantity: editQuantity.trim(),
      category: editCategory.trim(),
      ecoRating: editEcoRating,
      co2: editCo2
    };
    updateScanResultItem(updated);
    setEditingId(null);
    triggerToast("Item updated successfully", "success");
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcessing(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcessing(e.target.files[0]);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch"
    >
      <div className="xl:col-span-5 flex flex-col justify-between gap-6">
        <div className="bg-[#11131a] p-5 rounded-xl border border-[#1e2230] space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
            <div className="space-y-0.5">
              <span className="text-[#10b981] text-[9px] font-mono tracking-widest uppercase font-black block">Playground Engine</span>
              <h1 className="text-xl font-sans font-black tracking-tight text-white leading-none">Invoice Capture Frame</h1>
            </div>
            <span className="text-[9px] font-mono text-zinc-500 font-bold bg-[#1d1f27] px-2 py-[2px] rounded border border-zinc-850">INPUT_TRAY</span>
          </div>

          <p className="text-xs text-[#94a3b8] leading-relaxed">
            Drag and drop screenshots, PDFs, or photos of food labels and grocery bills directly into our sub-continental Carbon Index engine.
          </p>

          <div 
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`relative p-6 rounded-lg border border-dashed transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer min-h-[180px] bg-[#0c0d12] ${
              dragActive ? "border-emerald-400 bg-emerald-500/5 scale-95" : "border-zinc-800 hover:border-zinc-700"
            }`}
            id="drag-and-drop-zone"
            aria-label="Upload capture receipt file frame"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") document.getElementById("receipt-file")?.click(); }}
          >
            <input 
              type="file" 
              id="receipt-file" 
              className="hidden" 
              accept="image/*,.pdf" 
              onChange={handleFileChange}
            />

            {uploadProgress ? (
              <div className="flex flex-col items-center py-2">
                <RefreshCw className="h-8 w-8 text-emerald-400 animate-spin mb-3" />
                <p className="text-xs font-bold font-mono text-zinc-200 tracking-wide mb-1">{uploadProgress}</p>
                <div className="w-40 h-1 bg-zinc-800 rounded-full overflow-hidden mt-3">
                  <div className="h-full bg-emerald-400 transition-all duration-300" style={{ width: `${pipelineStep * 20}%` }} />
                </div>
              </div>
            ) : (
              <label htmlFor="receipt-file" className="cursor-pointer flex flex-col items-center py-2 w-full">
                <div className="h-10 w-10 rounded bg-[#13151f] border border-zinc-800 flex items-center justify-center text-[#10b981] mb-3">
                  <Upload className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-zinc-200 mb-1">Simulate screenshot file upload</span>
                <span className="text-[10px] text-zinc-500">PNG, JPEG, or PDF. Drop file directly here.</span>
              </label>
            )}
          </div>
        </div>

        <div className="bg-[#11131a] p-5 rounded-xl border border-[#1e2230] space-y-4">
          <div>
            <span className="text-[9px] text-[#3b82f6] font-mono uppercase tracking-widest font-bold block mb-1">Pre-configured prompts</span>
            <h3 className="text-xs font-mono font-black text-white uppercase tracking-wider block">Ingest preset datasets</h3>
          </div>

          <ScannerPresets triggerSampleScan={triggerSampleScan} />

          {receiptsHistory.length > 1 && (
            <div className="pt-3 border-t border-zinc-800 space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block font-bold">Saved prompt runs ({receiptsHistory.length - 1})</span>
              <div className="max-h-24 overflow-y-auto space-y-1 pr-1" style={{ scrollbarWidth: "thin" }}>
                {receiptsHistory.slice(1).map((hist, index) => (
                  <div 
                    key={index}
                    onClick={() => {
                      setScanResult(hist);
                      triggerToast(`Loaded cached ledger run worth ${hist.totalCo2}kg CO₂e`, "info");
                    }}
                    className="flex items-center justify-between text-[11px] p-2 bg-[#0c0d12] border border-zinc-855 hover:border-zinc-700 rounded cursor-pointer font-mono"
                  >
                    <span className="text-zinc-400 truncate max-w-[150px]">Run #{receiptsHistory.length - index - 1}: {hist.items[0]?.name || "Parsed Goods"}</span>
                    <span className="font-bold text-emerald-400 text-[10px]">-{hist.totalCo2}kg</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="xl:col-span-7 flex flex-col gap-6" id="playground-results-stage">
        <ScannerPipeline pipelineActive={pipelineActive} pipelineStep={pipelineStep} />

        <div className="bg-[#11131a] rounded-xl border border-[#1e2230] overflow-hidden flex-1 flex flex-col justify-between" id="carbon-audit-ledger-frame">
          <div className="px-5 py-3 border-b border-[#1e2230] flex items-center justify-between bg-[#131620]">
            <div className="flex items-center gap-2.5">
              <div className="w-2 rounded-full h-2 bg-[#10b981]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">Carbon Allocation Audit Output</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#10b981] bg-[#10b981]/5 px-2 py-[2px] rounded border border-[#10b981]/15 leading-none">
              Current Node: {selectedCityNode} Grid
            </span>
          </div>

          <div className="p-5 flex-grow space-y-6 flex flex-col justify-between">
            <div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse" id="workspace-emissions-table">
                  <thead>
                    <tr className="border-b border-[#1e2230] pb-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                      <th className="py-2.5 font-bold">Ingredient Element</th>
                      <th className="py-2.5 font-bold text-center">Batch Weight</th>
                      <th className="py-2.5 font-bold text-center">Category Node</th>
                      <th className="py-2.5 font-bold text-center">Eco Multiplier</th>
                      <th className="py-2.5 font-bold text-right">Methane Weight</th>
                      <th className="py-2.5 font-bold text-center w-24">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e2230]/40 text-xs">
                    {scanResult.items.map((item) => {
                      const isEditing = editingId === item.id;
                      return (
                        <tr key={item.id} className="hover:bg-white/[0.008] transition-colors">
                          {isEditing ? (
                            <>
                              <td className="py-2">
                                <input
                                  type="text"
                                  value={editName}
                                  onChange={(e) => setEditName(e.target.value)}
                                  className="bg-[#0c0d12] border border-zinc-800 text-zinc-100 rounded px-2 py-1 text-xs focus:outline-none focus:border-emerald-500/50 w-full font-sans"
                                  placeholder="Element Name"
                                  id={`edit-name-${item.id}`}
                                />
                              </td>
                              <td className="py-2 text-center">
                                <input
                                  type="text"
                                  value={editQuantity}
                                  onChange={(e) => setEditQuantity(e.target.value)}
                                  className="bg-[#0c0d12] border border-zinc-800 text-zinc-100 rounded px-2 py-1 text-xs text-center focus:outline-none focus:border-emerald-500/50 w-20 mx-auto font-mono"
                                  placeholder="Quantity"
                                  id={`edit-quantity-${item.id}`}
                                />
                              </td>
                              <td className="py-2 text-center">
                                <select
                                  value={editCategory}
                                  onChange={(e) => setEditCategory(e.target.value)}
                                  className="bg-[#0c0d12] border border-zinc-850 text-zinc-200 rounded px-1.5 py-1 text-xs focus:outline-none focus:border-emerald-500/50 w-24 mx-auto font-mono uppercase"
                                  id={`edit-category-${item.id}`}
                                >
                                  {["Dairy", "Produce", "Bakery", "Dessert/Beverage", "Grains", "Fats", "Meat", "Other"].map((cat) => (
                                    <option key={cat} value={cat} className="bg-[#0c0d12]">{cat}</option>
                                  ))}
                                </select>
                              </td>
                              <td className="py-2 text-center">
                                <select
                                  value={editEcoRating}
                                  onChange={(e) => setEditEcoRating(e.target.value as any)}
                                  className="bg-[#0c0d12] border border-zinc-850 text-zinc-200 rounded px-1.5 py-1 text-xs focus:outline-none focus:border-emerald-500/50 w-14 mx-auto font-mono font-bold"
                                  id={`edit-ecorating-${item.id}`}
                                >
                                  {["A", "B", "C", "D", "E"].map((rate) => (
                                    <option key={rate} value={rate} className="bg-[#0c0d12]">{rate}</option>
                                  ))}
                                </select>
                              </td>
                              <td className="py-2 text-right">
                                <input
                                  type="number"
                                  step="0.1"
                                  min="0"
                                  value={editCo2}
                                  onChange={(e) => setEditCo2(parseFloat(e.target.value) || 0)}
                                  className="bg-[#0c0d12] border border-zinc-800 text-zinc-100 rounded px-2 py-1 text-xs text-right focus:outline-none focus:border-emerald-500/50 w-16 ml-auto font-mono font-bold text-emerald-400"
                                  placeholder="CO2"
                                  id={`edit-co2-${item.id}`}
                                />
                              </td>
                              <td className="py-2 text-center">
                                <div className="flex justify-center gap-1">
                                  <button
                                    onClick={() => saveEditing(item)}
                                    className="px-2 py-0.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-mono transition-colors font-bold cursor-pointer"
                                    id={`save-btn-${item.id}`}
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={() => setEditingId(null)}
                                    className="px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded text-[10px] font-mono transition-colors cursor-pointer"
                                    id={`cancel-btn-${item.id}`}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="py-3 font-semibold text-zinc-100 font-sans text-sm">{item.name}</td>
                              <td className="py-3 text-center text-zinc-400 font-mono text-xs">{item.quantity}</td>
                              <td className="py-3 text-center">
                                <span className="text-[9px] font-mono font-bold bg-[#1e2230] text-zinc-300 border border-zinc-700 px-2 py-0.5 rounded uppercase">{item.category}</span>
                              </td>
                              <td className="py-3 text-center">
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded font-mono ${getEcoColor(item.ecoRating)}`}>{item.ecoRating}</span>
                              </td>
                              <td className="py-3 text-right font-mono font-black text-emerald-400 text-sm">{item.co2.toFixed(1)}kg</td>
                              <td className="py-3 text-center">
                                <button
                                  onClick={() => startEditing(item)}
                                  className="px-2.5 py-0.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 text-zinc-300 rounded text-[10px] font-mono transition-all cursor-pointer"
                                  id={`edit-btn-${item.id}`}
                                >
                                  Edit
                                </button>
                              </td>
                            </>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-1.5 text-zinc-500">
                  <Leaf className="h-4.5 w-4.5 text-emerald-400" />
                  <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider font-extrabold">Recommended Carbon Swapping Parameters</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="swap-recommendations-row">
                  {scanResult.items.filter(it => it.co2 >= 1.0).map((it) => (
                    <div 
                      key={`swap-${it.id}`} 
                      className="bg-[#0b0c10] p-3 rounded-lg border border-zinc-800 flex flex-col justify-between hover:border-emerald-500/30 transition-all cursor-pointer group"
                      onClick={() => {
                        triggerToast(`Modeling optimized trace for alternative: '${it.alternative}'`, "info");
                        setActiveTab("twin");
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] text-[#94a3b8] uppercase font-mono block">Replace: {it.name}</span>
                        <span className="text-[10px] font-mono font-bold text-red-400">({it.co2}kg)</span>
                      </div>
                      <div className="text-xs text-emerald-400 mt-2 font-mono flex items-center gap-1.5 bg-emerald-500/5 p-2 rounded border border-emerald-500/10 group-hover:border-emerald-500/30 transition-all">
                        <CheckCircle className="h-3 w-3 text-emerald-400 shrink-0" />
                        <span>Swap: {it.alternative}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-[#1e2230] pt-5 flex flex-col md:flex-row items-stretch justify-between gap-5">
              <div className="bg-[#0c0d12] p-3.5 rounded-lg border border-zinc-855 flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Terminal className="h-4 w-4 text-[#3b82f6]" />
                  <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider font-bold">Lifecycle Analyzer Output</span>
                </div>
                <p className="text-[11px] text-[#94a3b8] leading-relaxed italic font-sans">&ldquo;{scanResult.explanation}&rdquo;</p>
              </div>

              <div className="flex flex-col justify-center items-center md:items-end px-5 py-3 bg-[#131620] rounded-lg border border-[#1e2230] text-center md:text-right min-w-[150px] shrink-0 font-mono">
                <span className="text-[9px] text-zinc-500 uppercase tracking-widest block mb-0.5">TOTAL CO₂ WEIGHT</span>
                <span className="text-4xl font-black text-white tracking-tighter">{scanResult.totalCo2.toFixed(1)}</span>
                <span className="text-[9px] text-emerald-400 uppercase tracking-widest font-bold mt-1 mb-1">KILOGRAM EQUIVALENT</span>
                <span className="text-[8px] text-zinc-400 text-center md:text-right leading-relaxed block">
                  ≈ {Math.round(scanResult.totalCo2 * 25)} scooter-km<br />
                  ≈ {parseFloat((scanResult.totalCo2 / 42.5).toFixed(2))} LPG cylinder
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Carbon Trend Analytics Dashboard */}
        <div className="bg-[#11131a] p-5 rounded-xl border border-[#1e2230] space-y-4" id="carbon-trend-dashboard">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
            <div className="space-y-0.5">
              <span className="text-[#10b981] text-[9px] font-mono tracking-widest uppercase font-black block">Grid Telemetry</span>
              <h3 className="text-sm font-sans font-black tracking-tight text-white leading-none">Carbon Trend Analytics</h3>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Personal Footprint (kg CO₂e)</span>
              </div>
            </div>
          </div>

          {(() => {
            const trendHistory = [...receiptsHistory].slice(0, 8).reverse();
            const svgWidth = 500;
            const svgHeight = 160;
            const paddingLeft = 40;
            const paddingRight = 20;
            const paddingTop = 20;
            const paddingBottom = 30;
            const maxCo2 = Math.max(...trendHistory.map(d => d.totalCo2), 6);
            const minCo2 = 0;
            const chartWidth = svgWidth - paddingLeft - paddingRight;
            const chartHeight = svgHeight - paddingTop - paddingBottom;
            const points = trendHistory.map((item, index) => {
              const x = paddingLeft + (trendHistory.length > 1 ? (index / (trendHistory.length - 1)) * chartWidth : chartWidth / 2);
              const y = svgHeight - paddingBottom - ((item.totalCo2 - minCo2) / (maxCo2 - minCo2)) * chartHeight;
              return { x, y, item };
            });
            let linePath = "";
            let areaPath = "";
            if (points.length > 0) {
              linePath = `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(" ");
              areaPath = `${linePath} L ${points[points.length - 1].x} ${svgHeight - paddingBottom} L ${points[0].x} ${svgHeight - paddingBottom} Z`;
            }
            const gridLevels = [0, 0.33, 0.66, 1.0];

            return trendHistory.length === 0 ? (
              <div className="h-[160px] flex items-center justify-center text-xs font-mono text-zinc-500 bg-[#0c0d12] rounded-lg border border-zinc-855">
                No telemetry logs parsed on this session.
              </div>
            ) : (
              <div className="bg-[#0c0d12] p-3 rounded-lg border border-zinc-855 relative">
                <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto" aria-label="Carbon footprint trend line chart">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.00" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines & Labels */}
                  {gridLevels.map((lvl, idx) => {
                    const val = minCo2 + lvl * (maxCo2 - minCo2);
                    const y = svgHeight - paddingBottom - lvl * chartHeight;
                    return (
                      <g key={`grid-${idx}`}>
                        <line 
                          x1={paddingLeft} 
                          y1={y} 
                          x2={svgWidth - paddingRight} 
                          y2={y} 
                          stroke="#1e2230" 
                          strokeDasharray="4 4" 
                        />
                        <text 
                          x={paddingLeft - 8} 
                          y={y + 3} 
                          fill="#64748b" 
                          fontSize="8" 
                          fontFamily="monospace"
                          textAnchor="end"
                        >
                          {val.toFixed(1)}
                        </text>
                      </g>
                    );
                  })}

                  {/* Chart Paths */}
                  {points.length > 1 && (
                    <>
                      <path 
                        d={areaPath} 
                        fill="url(#chartGradient)" 
                      />
                      <path 
                        d={linePath} 
                        fill="none" 
                        stroke="#10b981" 
                        strokeWidth="2.5" 
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  )}

                  {/* Data Points */}
                  {points.map((p, idx) => (
                    <g key={`point-${idx}`} className="group cursor-pointer">
                      <circle 
                        cx={p.x} 
                        cy={p.y} 
                        r="3.5" 
                        fill="#0d0e12" 
                        stroke="#10b981" 
                        strokeWidth="1.5" 
                        className="hover:r-5 hover:fill-emerald-400 transition-all duration-155"
                      />
                      <text
                        x={p.x}
                        y={p.y - 8}
                        fill="#10b981"
                        fontSize="8"
                        fontFamily="monospace"
                        fontWeight="bold"
                        textAnchor="middle"
                        className="opacity-0 group-hover:opacity-100 transition-opacity bg-black duration-155"
                      >
                        {p.item.totalCo2.toFixed(1)}
                      </text>
                    </g>
                  ))}

                  {/* X Axis Labels */}
                  {points.map((p, idx) => {
                    const name = p.item.items[0]?.name || "Scan";
                    const labelName = name.length > 10 ? `${name.substring(0, 9)}...` : name;
                    return (
                      <text 
                        key={`label-${idx}`}
                        x={p.x} 
                        y={svgHeight - 8} 
                        fill="#64748b" 
                        fontSize="8" 
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        {labelName}
                      </text>
                    );
                  })}
                </svg>
              </div>
            );
          })()}
        </div>
      </div>
    </motion.div>
  );
});
