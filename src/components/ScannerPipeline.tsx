import React from "react";

interface ScannerPipelineProps {
  pipelineActive: boolean;
  pipelineStep: number;
}

export const ScannerPipeline = React.memo(function ScannerPipeline({
  pipelineActive,
  pipelineStep,
}: ScannerPipelineProps) {
  if (!pipelineActive) return null;

  return (
    <div className="bg-[#11131a] p-4 rounded-xl border border-dashed border-[#10b981]/50">
      <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase font-black block mb-3">SYSTEM REAL-TIME INTEGRATED CONDUIT (5-LAYER SYNC)</span>
      <div className="grid grid-cols-5 gap-1.5 text-[9px] sm:text-xs">
        <div className={`p-2 rounded border flex flex-col justify-between h-14 ${pipelineStep >= 1 ? "bg-emerald-950/20 border-[#10b981]/40 text-white" : "bg-[#0c0d12] border-zinc-900 text-zinc-650"}`}>
          <span className="font-mono text-[8px] leading-tight text-zinc-500">L1</span>
          <span className="font-bold text-[10px]">OCR SCAN</span>
          <span className="font-mono text-[8px] mt-0.5">{pipelineStep > 1 ? "✓ COMPLETE" : "• RUNNING"}</span>
        </div>
        <div className={`p-2 rounded border flex flex-col justify-between h-14 ${pipelineStep >= 2 ? "bg-emerald-950/20 border-[#10b981]/40 text-white" : "bg-[#0c0d12] border-zinc-900 text-zinc-650"}`}>
          <span className="font-mono text-[8px] leading-tight text-zinc-500">L2</span>
          <span className="font-bold text-[10px]">CARBON MAP</span>
          <span className="font-mono text-[8px] mt-0.5">{pipelineStep > 2 ? "✓ INDEXED" : pipelineStep === 2 ? "• ACTIVE" : "• WAIT"}</span>
        </div>
        <div className={`p-2 rounded border flex flex-col justify-between h-14 ${pipelineStep >= 3 ? "bg-emerald-950/20 border-[#10b981]/40 text-white" : "bg-[#0c0d12] border-zinc-900 text-zinc-650"}`}>
          <span className="font-mono text-[8px] leading-tight text-zinc-500">L3</span>
          <span className="font-bold text-[10px]">TWIN RESYNC</span>
          <span className="font-mono text-[8px] mt-0.5">{pipelineStep > 3 ? "✓ PROJECTED" : pipelineStep === 3 ? "• ACTIVE" : "• WAIT"}</span>
        </div>
        <div className={`p-2 rounded border flex flex-col justify-between h-14 ${pipelineStep >= 4 ? "bg-emerald-950/20 border-[#10b981]/40 text-white" : "bg-[#0c0d12] border-zinc-900 text-zinc-650"}`}>
          <span className="font-mono text-[8px] leading-tight text-zinc-500">L4</span>
          <span className="font-bold text-[10px]">METRO GRID</span>
          <span className="font-mono text-[8px] mt-0.5">{pipelineStep > 4 ? "✓ REGISTERED" : pipelineStep === 4 ? "• ACTIVE" : "• WAIT"}</span>
        </div>
        <div className={`p-2 rounded border flex flex-col justify-between h-14 ${pipelineStep >= 5 ? "bg-emerald-950/20 border-[#10b981]/40 text-white" : "bg-[#0c0d12] border-zinc-900 text-zinc-650"}`}>
          <span className="font-mono text-[8px] leading-tight text-zinc-500">L5</span>
          <span className="font-bold text-[10px]">ADVICE HYDR</span>
          <span className="font-mono text-[8px] mt-0.5">{pipelineStep === 5 ? "• RUNNING" : "• WAIT"}</span>
        </div>
      </div>
    </div>
  );
});
