export default function Stats({ total, done, active, overdue }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  const parts = [
    { label: "เสร็จแล้ว", n: done, color: "#10b981" },
    { label: "กำลังทำ", n: active, color: "#6366f1" },
    { label: "เลยกำหนด", n: overdue, color: "#ef4444" },
  ];
  let offset = 25; // start at top
  const segs = parts.map((p) => {
    const len = total ? (p.n / total) * 100 : 0;
    const seg = { ...p, len, offset };
    offset -= len;
    return seg;
  });

  return (
    <section className="card p-4" aria-label="สถิติ">
      <h2 className="font-semibold text-sm mb-3">สถิติ</h2>
      <div className="flex items-center gap-4">
        <div className="relative w-24 h-24 shrink-0">
          <svg viewBox="0 0 36 36" className="w-full h-full" role="img"
            aria-label={`เสร็จแล้ว ${pct}%`}>
            <circle cx="18" cy="18" r="15.9155" fill="none" stroke="currentColor"
              strokeWidth="4" className="text-gray-200 dark:text-gray-700" />
            {segs.filter((s) => s.len > 0).map((s) => (
              <circle key={s.label} cx="18" cy="18" r="15.9155" fill="none"
                stroke={s.color} strokeWidth="4"
                strokeDasharray={`${s.len} ${100 - s.len}`}
                strokeDashoffset={s.offset} />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-semibold leading-none">{pct}%</span>
            <span className="muted text-[10px]">เสร็จ</span>
          </div>
        </div>
        <ul className="text-sm space-y-1.5 flex-1 min-w-0">
          <li className="flex justify-between gap-2">
            <span className="muted">งานทั้งหมด</span>
            <span className="font-medium tabular-nums">{total}</span>
          </li>
          {parts.map((p) => (
            <li key={p.label} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }}></span>
              <span className="flex-1 truncate">{p.label}</span>
              <span className="tabular-nums">{p.n}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
