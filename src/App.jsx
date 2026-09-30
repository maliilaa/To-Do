import { useState, useRef } from "react";
import { Plus, Search } from "lucide-react";
import TodoItem from "./components/TodoItem";
import Sidebar from "./components/Sidebar";
import Stats from "./components/Stats";
import { PRIORITIES, ORDER, FILTERS, CATEGORIES, CAT_KEYS } from "./constants";
import { todayStr, addDays, dueState } from "./utils";

const INITIAL = [
  { id: 1, text: "ซื้อของเข้าบ้าน", done: false, priority: "medium", category: "shopping", due: addDays(0) },
  { id: 2, text: "ตอบอีเมลลูกค้า", done: false, priority: "high", category: "work", due: addDays(-1) },
  { id: 3, text: "อ่านหนังสือ 20 นาที", done: true, priority: "low", category: "personal", due: "" },
  { id: 4, text: "ออกกำลังกายตอนเย็น", done: false, priority: "medium", category: "health", due: addDays(2) },
];

export default function App() {
  const [todos, setTodos] = useState(INITIAL);
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("work");
  const [due, setDue] = useState("");
  const [filter, setFilter] = useState("all");
  const [catFilter, setCatFilter] = useState("all");
  const [query, setQuery] = useState("");
  const nextId = useRef(5);
  const today = todayStr();

  const add = () => {
    const t = text.trim();
    if (!t) return;
    setTodos((l) => [{ id: nextId.current++, text: t, done: false, priority, category, due }, ...l]);
    setText("");
    setDue("");
  };
  const patch = (id, changes) =>
    setTodos((l) => l.map((t) => (t.id === id ? { ...t, ...changes } : t)));
  const toggle = (id) => setTodos((l) => l.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const cycle = (id) =>
    setTodos((l) =>
      l.map((t) =>
        t.id === id
          ? { ...t, priority: ORDER[(ORDER.indexOf(t.priority) + 1) % ORDER.length] }
          : t
      )
    );
  const remove = (id) => {
    patch(id, { removing: true });
    setTimeout(() => setTodos((l) => l.filter((t) => t.id !== id)), 250);
  };
  const clearDone = () => {
    setTodos((l) => l.map((t) => (t.done ? { ...t, removing: true } : t)));
    setTimeout(() => setTodos((l) => l.filter((t) => !t.done)), 250);
  };

  // counts & stats
  const total = todos.length;
  const done = todos.filter((t) => t.done).length;
  const overdue = todos.filter((t) => dueState(t, today) === "overdue").length;
  const active = total - done - overdue;
  const remaining = total - done;
  const catCounts = {};
  todos.forEach((t) => (catCounts[t.category] = (catCounts[t.category] || 0) + 1));

  const q = query.trim().toLowerCase();
  const shown = todos.filter(
    (t) =>
      (filter === "all" ? true : filter === "active" ? !t.done : t.done) &&
      (catFilter === "all" || t.category === catFilter) &&
      (!q || t.text.toLowerCase().includes(q))
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-1">รายการสิ่งที่ต้องทำ</h1>
      <p className="muted text-sm mb-5">จัดการงานของคุณให้เป็นระเบียบ</p>

      <div className="grid gap-4 lg:grid-cols-[220px_1fr] items-start">
        <aside className="space-y-4 min-w-0">
          <Sidebar counts={catCounts} total={total} value={catFilter} onChange={setCatFilter} />
          <Stats total={total} done={done} active={active} overdue={overdue} />
        </aside>

        <main className="space-y-4 min-w-0">
          <div className="card p-4 space-y-3">
            <div className="flex gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && add()}
                placeholder="เพิ่มงานใหม่..."
                className="inp flex-1 min-w-0 px-3 py-2.5 text-base outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                onClick={add}
                className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl px-4 flex items-center gap-1.5 font-medium transition shrink-0"
              >
                <Plus size={18} />
                <span className="hidden sm:inline">เพิ่ม</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="muted text-sm">ความสำคัญ:</span>
                {ORDER.map((k) => (
                  <button
                    key={k}
                    onClick={() => setPriority(k)}
                    className={
                      "text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 border transition " +
                      (priority === k ? PRIORITIES[k].cls + " border-current" : "line muted")
                    }
                  >
                    <span className={"w-2 h-2 rounded-full " + PRIORITIES[k].dot}></span>
                    {PRIORITIES[k].label}
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-2 text-sm">
                <span className="muted">กำหนดส่ง:</span>
                <input
                  type="date"
                  value={due}
                  onChange={(e) => setDue(e.target.value)}
                  className="inp px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </label>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="muted text-sm">หมวดหมู่:</span>
              {CAT_KEYS.map((k) => (
                <button
                  key={k}
                  onClick={() => setCategory(k)}
                  className={
                    "text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 border transition " +
                    (category === k ? CATEGORIES[k].cls + " border-current" : "line muted")
                  }
                >
                  <span className={"w-2 h-2 rounded-full " + CATEGORIES[k].dot}></span>
                  {CATEGORIES[k].label}
                </button>
              ))}
            </div>
          </div>

          <div className="card overflow-hidden">
            <div className="relative border-b line">
              <Search size={16} className="muted absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ค้นหางาน..."
                aria-label="ค้นหางาน"
                className="w-full bg-transparent pl-10 pr-4 py-3 text-base outline-none"
                style={{ color: "var(--text)" }}
              />
            </div>
            <div className="flex border-b line">
              {FILTERS.map(([k, label]) => (
                <button
                  key={k}
                  onClick={() => setFilter(k)}
                  className={
                    "flex-1 py-3 text-sm font-medium transition border-b-2 " +
                    (filter === k ? "border-indigo-500 text-indigo-500" : "border-transparent muted")
                  }
                >
                  {label}
                </button>
              ))}
            </div>

            <ul>
              {shown.map((t) => (
                <TodoItem
                  key={t.id}
                  todo={t}
                  today={today}
                  onToggle={toggle}
                  onDelete={remove}
                  onEdit={(id, v) => patch(id, { text: v })}
                  onCycle={cycle}
                  onDue={(id, v) => patch(id, { due: v })}
                />
              ))}
            </ul>
            {shown.length === 0 && (
              <p className="muted text-center py-10 text-sm">
                {q ? "ไม่พบงานที่ค้นหา" : "ไม่มีงานในหมวดนี้"}
              </p>
            )}

            <div className="flex items-center justify-between px-4 py-3 text-sm">
              <span className="muted">เหลืออีก {remaining} งาน</span>
              <button
                onClick={clearDone}
                disabled={done === 0}
                className="text-red-500 disabled:opacity-40 disabled:cursor-not-allowed hover:underline"
              >
                ล้างที่เสร็จแล้ว ({done})
              </button>
            </div>
          </div>

          <p className="muted text-xs text-center">
            ดับเบิลคลิกที่ข้อความเพื่อแก้ไข · แตะป้ายความสำคัญหรือวันที่เพื่อเปลี่ยน
          </p>
        </main>
      </div>
    </div>
  );
}
