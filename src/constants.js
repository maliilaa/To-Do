export const PRIORITIES = {
  low: {
    label: "ต่ำ",
    cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    dot: "bg-emerald-500",
  },
  medium: {
    label: "กลาง",
    cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    dot: "bg-amber-500",
  },
  high: {
    label: "สูง",
    cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    dot: "bg-red-500",
  },
};
export const ORDER = ["low", "medium", "high"];

export const CATEGORIES = {
  work: {
    label: "งาน",
    cls: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
    dot: "bg-sky-500",
  },
  personal: {
    label: "ส่วนตัว",
    cls: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
    dot: "bg-violet-500",
  },
  shopping: {
    label: "ช้อปปิ้ง",
    cls: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
    dot: "bg-pink-500",
  },
  health: {
    label: "สุขภาพ",
    cls: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
    dot: "bg-teal-500",
  },
};
export const CAT_KEYS = Object.keys(CATEGORIES);

export const FILTERS = [
  ["all", "ทั้งหมด"],
  ["active", "ยังไม่เสร็จ"],
  ["done", "เสร็จแล้ว"],
];

export const DUE_STYLES = {
  overdue: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  today: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
  future: "bg-gray-100 text-gray-600 dark:bg-gray-700/50 dark:text-gray-300",
  done: "bg-gray-100 text-gray-400 dark:bg-gray-700/50 dark:text-gray-500",
  none: "border border-dashed line muted",
};
