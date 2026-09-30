import { CATEGORIES, CAT_KEYS } from "../constants";

export default function Sidebar({ counts, total, value, onChange }) {
  const items = [
    { key: "all", label: "ทั้งหมด", dot: "bg-indigo-500", n: total },
    ...CAT_KEYS.map((k) => ({
      key: k,
      label: CATEGORIES[k].label,
      dot: CATEGORIES[k].dot,
      n: counts[k] || 0,
    })),
  ];
  return (
    <nav aria-label="หมวดหมู่" className="card p-2">
      <ul className="flex lg:flex-col gap-1 overflow-x-auto">
        {items.map((it) => (
          <li key={it.key} className="shrink-0 lg:shrink">
            <button
              onClick={() => onChange(it.key)}
              className={
                "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition whitespace-nowrap " +
                (value === it.key
                  ? "bg-indigo-500/10 text-indigo-500 font-medium"
                  : "hover:bg-black/5 dark:hover:bg-white/5")
              }
            >
              <span className={"w-2 h-2 rounded-full " + it.dot}></span>
              <span className="flex-1 text-left">{it.label}</span>
              <span className="muted text-xs tabular-nums">{it.n}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
