const pad = (n) => String(n).padStart(2, "0");
export const toStr = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const todayStr = () => toStr(new Date());
export const addDays = (n) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return toStr(d);
};

// none | done | overdue | today | future
export function dueState(todo, today) {
  if (!todo.due) return "none";
  if (todo.done) return "done";
  if (todo.due < today) return "overdue";
  if (todo.due === today) return "today";
  return "future";
}

export function fmtDate(s) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("th-TH", {
    day: "numeric",
    month: "short",
  });
}
