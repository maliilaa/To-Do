import { useState, useRef } from "react";
import { Plus } from "lucide-react";
import TodoItem from "./components/TodoItem";
import { PRIORITIES, ORDER, FILTERS } from "./constants";

const INITIAL = [
  { id: 1, text: "ซื้อของเข้าบ้าน", done: false, priority: "medium" },
  { id: 2, text: "ตอบอีเมลลูกค้า", done: false, priority: "high" },
  { id: 3, text: "อ่านหนังสือ 20 นาที", done: true, priority: "low" },
];

export default function App() {
  const [todos, setTodos] = useState(INITIAL);
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [filter, setFilter] = useState("all");
  const nextId = useRef(4);

  const add = () => {
    const t = text.trim();
    if (!t) return;
    setTodos((l) => [{ id: nextId.current++, text: t, done: false, priority }, ...l]);
    setText("");
  };
  const toggle = (id) =>
    setTodos((l) => l.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const edit = (id, newText) =>
    setTodos((l) => l.map((t) => (t.id === id ? { ...t, text: newText } : t)));
  const cycle = (id) =>
    setTodos((l) =>
      l.map((t) =>
        t.id === id
          ? { ...t, priority: ORDER[(ORDER.indexOf(t.priority) + 1) % ORDER.length] }
          : t
      )
    );
  const remove = (id) => {
    setTodos((l) => l.map((t) => (t.id === id ? { ...t, removing: true } : t)));
    setTimeout(() => setTodos((l) => l.filter((t) => t.id !== id)), 250);
  };
  const clearDone = () => {
    setTodos((l) => l.map((t) => (t.done ? { ...t, removing: true } : t)));
    setTimeout(() => setTodos((l) => l.filter((t) => !t.done)), 250);
  };

  const remaining = todos.filter((t) => !t.done).length;
  const doneCount = todos.length - remaining;
  const shown = todos.filter((t) =>
    filter === "all" ? true : filter === "active" ? !t.done : t.done
  );

  return (
    <div className="max-w-xl mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-1">รายการสิ่งที่ต้องทำ</h1>
      <p className="muted text-sm mb-5">จัดการงานของคุณให้เป็นระเบียบ</p>

      <div className="card p-4 mb-4">
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
        <div className="flex items-center gap-2 mt-3">
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
      </div>

      <div className="card overflow-hidden">
        <div className="flex border-b line">
          {FILTERS.map(([k, label]) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={
                "flex-1 py-3 text-sm font-medium transition border-b-2 " +
                (filter === k
                  ? "border-indigo-500 text-indigo-500"
                  : "border-transparent muted")
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
              onToggle={toggle}
              onDelete={remove}
              onEdit={edit}
              onCycle={cycle}
            />
          ))}
        </ul>
        {shown.length === 0 && (
          <p className="muted text-center py-10 text-sm">ไม่มีงานในหมวดนี้</p>
        )}

        <div className="flex items-center justify-between px-4 py-3 text-sm">
          <span className="muted">เหลืออีก {remaining} งาน</span>
          <button
            onClick={clearDone}
            disabled={doneCount === 0}
            className="text-red-500 disabled:opacity-40 disabled:cursor-not-allowed hover:underline"
          >
            ล้างที่เสร็จแล้ว ({doneCount})
          </button>
        </div>
      </div>

      <p className="muted text-xs text-center mt-4">
        ดับเบิลคลิกที่ข้อความเพื่อแก้ไข · แตะป้ายความสำคัญเพื่อเปลี่ยนระดับ
      </p>
    </div>
  );
}
