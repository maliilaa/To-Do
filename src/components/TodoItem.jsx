import { useState, useRef, useEffect } from "react";
import { Check, Trash2, CalendarDays } from "lucide-react";
import { PRIORITIES, CATEGORIES, DUE_STYLES } from "../constants";
import { dueState, fmtDate } from "../utils";

export default function TodoItem({ todo, today, onToggle, onDelete, onEdit, onCycle, onDue }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const ref = useRef(null);

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
      ref.current.select();
    }
  }, [editing]);

  const save = () => {
    const t = draft.trim();
    if (t) onEdit(todo.id, t);
    else setDraft(todo.text);
    setEditing(false);
  };

  const p = PRIORITIES[todo.priority];
  const c = CATEGORIES[todo.category];
  const ds = dueState(todo, today);
  const dueLabel =
    ds === "none"
      ? "ไม่มีกำหนด"
      : ds === "overdue"
      ? "เลยกำหนด · " + fmtDate(todo.due)
      : ds === "today"
      ? "วันนี้"
      : fmtDate(todo.due);

  return (
    <li className={"item in " + (todo.removing ? "out" : "")}>
      <div className="flex items-start gap-3 px-4 py-3 border-b line">
        <button
          onClick={() => onToggle(todo.id)}
          aria-label="ทำเสร็จแล้ว"
          className={
            "w-5 h-5 mt-0.5 shrink-0 rounded-md border-2 flex items-center justify-center transition " +
            (todo.done
              ? "bg-indigo-500 border-indigo-500 text-white"
              : "border-gray-400 hover:border-indigo-500")
          }
        >
          {todo.done && <Check size={14} strokeWidth={3} />}
        </button>

        <div className="flex-1 min-w-0">
          {editing ? (
            <input
              ref={ref}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={save}
              onKeyDown={(e) => {
                if (e.key === "Enter") save();
                if (e.key === "Escape") {
                  setDraft(todo.text);
                  setEditing(false);
                }
              }}
              className="inp w-full px-2 py-1 text-base outline-none focus:ring-2 focus:ring-indigo-400"
            />
          ) : (
            <span
              onDoubleClick={() => {
                setDraft(todo.text);
                setEditing(true);
              }}
              title="ดับเบิลคลิกเพื่อแก้ไข"
              className={
                "block break-words cursor-text select-none " +
                (todo.done ? "line-through muted" : "")
              }
            >
              {todo.text}
            </span>
          )}

          <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
            <button
              onClick={() => onCycle(todo.id)}
              title="เปลี่ยนความสำคัญ"
              className={"text-xs font-medium px-2.5 py-1 rounded-full " + p.cls}
            >
              {p.label}
            </button>
            <span className={"text-xs font-medium px-2.5 py-1 rounded-full " + c.cls}>
              {c.label}
            </span>
            <label
              title="เปลี่ยนวันครบกำหนด"
              className={
                "relative inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full cursor-pointer " +
                DUE_STYLES[ds]
              }
            >
              <CalendarDays size={12} />
              {dueLabel}
              <input
                type="date"
                value={todo.due}
                onChange={(e) => onDue(todo.id, e.target.value)}
                onClick={(e) => {
                  try { e.currentTarget.showPicker(); } catch { /* ignore */ }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </label>
          </div>
        </div>

        <button
          onClick={() => onDelete(todo.id)}
          aria-label="ลบ"
          className="muted hover:text-red-500 p-1.5 rounded-lg transition shrink-0"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </li>
  );
}
