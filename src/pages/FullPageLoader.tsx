export const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="flex flex-col items-center gap-3 p-8 rounded-2xl bg-slate-900/80 backdrop-blur-md shadow-2xl shadow-black/40 border border-slate-700/40">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-cyan-500/10">
          <div className="w-10 h-10 border-4 border-slate-500 border-t-cyan-400 border-r-cyan-400 rounded-full animate-spin" />
        </div>

        <p className="text-lg font-semibold tracking-wide text-slate-200">
          Loading
        </p>
      </div>
    </div>
  );
};
