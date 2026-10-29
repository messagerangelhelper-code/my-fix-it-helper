// Saved on this phone only: shopping list, checklist ticks, and My Home (projects, repair log, reminders).
const KEY = "mfh-data";

const DEFAULTS = { list: [], saved: [], log: [], reminders: [], checks: {}, bigText: false };

export function loadData() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "null");
    return { ...DEFAULTS, ...(v && typeof v === "object" ? v : {}) };
  } catch {
    return { ...DEFAULTS };
  }
}

export function saveData(d) {
  try {
    localStorage.setItem(KEY, JSON.stringify(d));
  } catch {
    /* storage not available (private window); the app still works */
  }
}
