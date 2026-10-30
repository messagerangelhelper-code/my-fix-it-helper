import { useEffect, useMemo, useRef, useState } from "react";
import { pointTo } from "./highlight.js";
import { BRAND, storesFor, storeLink, prosFor, PARTNERS } from "./brand.js";
import { CATEGORIES, FIXES, CHECKLIST, REMINDER_PRESETS, searchFixes, fixById, periodKey, seasonOf } from "./fixes.js";
import { loadData, saveData } from "./storage.js";
import { supabase } from "./account.js";
import Account from "./Account.jsx";
import Premium from "./Premium.jsx";
import { isPremium, checkPremiumOnce, syncAccount } from "./premium.js";

const pad = (n) => String(n).padStart(2, "0");
const isoLocal = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
function niceDate(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
  if (!m) return "";
  return new Date(+m[1], +m[2] - 1, +m[3]).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
function addMonths(iso, months) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
  if (!m) return isoLocal();
  const d = new Date(+m[1], +m[2] - 1 + months, +m[3]);
  return isoLocal(d);
}
const dueDate = (r) => (r.last ? addMonths(r.last, r.months) : isoLocal());
const money = (v) => { const n = Number(String(v || "").replace(/[$,\s]/g, "")); return Number.isFinite(n) && n > 0 ? n : 0; };
const SEASON_NAME = { spring: "Spring", summer: "Summer", fall: "Fall", winter: "Winter" };
const LEVEL_CLASS = { Easy: "badge-easy", Medium: "badge-medium" };

function StoreButtons({ part, kind }) {
  return (
    <div className="store-row">
      {storesFor(kind).map((s) => (
        <a key={s.id} className="store-btn" href={storeLink(s, part.q)} target="_blank" rel="noopener noreferrer sponsored">
          {s.name} ↗
        </a>
      ))}
    </div>
  );
}

export default function App() {
  const [data, setData] = useState(loadData);
  const [premium, setPremium] = useState(isPremium);
  const [notice, setNotice] = useState("");
  const [view, setView] = useState({ name: "home" }); // home | cat | fix | list | checklist | myhome | premium | settings
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  const [logDraft, setLogDraft] = useState(null);
  const [remDraft, setRemDraft] = useState(null);

  const update = (fn) => setData((d) => { const next = fn(d); saveData(next); return next; });
  const go = (name, extra = {}) => { setView({ name, ...extra }); window.scrollTo({ top: 0 }); };

  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty("--main", BRAND.colors.main);
    root.setProperty("--main-2", BRAND.colors.mainHover);
    root.setProperty("--soft", BRAND.colors.soft);
    document.title = BRAND.name;
    checkPremiumOnce().then((status) => {
      setPremium(isPremium());
      if (status === "activated") { setNotice("Premium is active. Thank you! My Home is unlocked."); go("myhome"); }
      else if (status === "expired") setNotice("Your Premium plan has ended. Your My Home info is still saved on this phone.");
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT") return;
      syncAccount().then(() => setPremium(isPremium()));
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => { document.documentElement.classList.toggle("big-text", !!data.bigText); }, [data.bigText]);
  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(""), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  const results = useMemo(() => searchFixes(query), [query]);
  const answerRef = useRef(null);
  const listCount = data.list.filter((i) => !i.got).length;
  const today = isoLocal();
  const reminders = data.reminders || [];
  const dueReminders = reminders.filter((r) => dueDate(r) <= today);
  const projects = data.saved || [];
  const log = data.log || [];

  // ---------- actions ----------
  function addPart(fix, part) {
    if (data.list.some((i) => i.q === part.q && i.kind === fix.kind && !i.got)) return setToast("Already on your list.");
    update((d) => ({ ...d, list: [...d.list, { id: uid(), name: part.name, q: part.q, kind: fix.kind, fix: fix.id, got: false }] }));
    setToast("Added to your shopping list.");
  }
  function addAllParts(fix) {
    const have = new Set(data.list.filter((i) => !i.got).map((i) => `${i.kind}:${i.q}`));
    const fresh = fix.parts.filter((p) => !have.has(`${fix.kind}:${p.q}`));
    if (!fresh.length) return setToast("Already on your list.");
    update((d) => ({ ...d, list: [...d.list, ...fresh.map((p) => ({ id: uid(), name: p.name, q: p.q, kind: fix.kind, fix: fix.id, got: false }))] }));
    setToast(`Added ${fresh.length} ${fresh.length === 1 ? "item" : "items"} to your shopping list.`);
  }
  function saveProject(fix) {
    if (!premium) return go("premium");
    if (projects.some((p) => p.fix === fix.id && p.status !== "done")) return setToast("Already in My Home.");
    update((d) => ({ ...d, saved: [{ id: uid(), fix: fix.id, title: fix.title, status: "planned", notes: "", added: today }, ...(d.saved || [])] }));
    setToast("Saved to My Home.");
  }
  function setProjectStatus(p, status) {
    update((d) => ({ ...d, saved: d.saved.map((x) => (x.id === p.id ? { ...x, status } : x)) }));
    if (status === "done") {
      setLogDraft({ date: today, what: p.title, who: "Me", cost: "", notes: p.notes || "" });
      setToast("Nice work! Add it to your repair log.");
    }
  }
  function checklistTick(group, item, on) {
    const key = periodKey(group);
    update((d) => {
      const checks = { ...(d.checks || {}) };
      const g = { [key]: [...((checks[group.id] || {})[key] || [])] };
      g[key] = on ? [...new Set([...g[key], item.id])] : g[key].filter((x) => x !== item.id);
      checks[group.id] = g; // older periods are dropped
      return { ...d, checks };
    });
  }
  async function shareList() {
    const items = data.list.filter((i) => !i.got);
    const text = `Shopping list from ${BRAND.name}:\n${items.map((i) => `• ${i.name}`).join("\n")}`;
    if (navigator.share) { try { await navigator.share({ title: "Shopping list", text }); return; } catch { /* cancelled */ } }
    try { await navigator.clipboard.writeText(text); setToast("List copied. Paste it into a text or note."); } catch { setToast("Couldn't copy on this browser."); }
  }

  // ---------- screens ----------
  const FixCard = ({ f }) => (
    <li>
      <button type="button" className="card fix-card" onClick={() => go("fix", { id: f.id, from: view })}>
        <span className="fc-icon" aria-hidden="true">{CATEGORIES.find((c) => c.id === f.cat)?.icon}</span>
        <span className="fc-body">
          <strong>{f.title}</strong>
          <span className="fc-meta">
            <span className={`badge ${LEVEL_CLASS[f.level] || ""}`}>{f.level}</span>
            <span className="muted small">{f.time}</span>
          </span>
        </span>
      </button>
    </li>
  );

  let body;
  if (view.name === "premium") {
    body = <Premium premium={premium} onBack={() => go(premium ? "myhome" : "home")} />;
  } else if (view.name === "settings") {
    body = (
      <>
        <button type="button" className="link back" onClick={() => go("home")}>← Back</button>
        <section className="card">
          <h2>Settings</h2>
          <label className="toggle">
            <input type="checkbox" checked={!!data.bigText} onChange={(e) => update((d) => ({ ...d, bigText: e.target.checked }))} />
            <span>Bigger text</span>
          </label>
          <p className="muted small">Your shopping list, checklist and My Home are saved on this phone.</p>
        </section>
        <Account premium={premium} />
      </>
    );
  } else if (view.name === "fix") {
    const f = fixById(view.id);
    const cat = CATEGORIES.find((c) => c.id === f.cat);
    body = (
      <>
        <button type="button" className="link back" onClick={() => go(view.from?.name || "home", view.from || {})}>← Back</button>
        <article className="card fix">
          <p className="muted small">{cat.icon} {cat.name}</p>
          <h1>{f.title}</h1>
          <div className="fc-meta">
            <span className={`badge ${LEVEL_CLASS[f.level] || ""}`}>{f.level}</span>
            <span className="muted small">⏱ {f.time}</span>
          </div>
          <p className="why">{f.why}</p>

          {f.safety.length > 0 && (
            <div className="safety" role="note">
              <h2>⚠️ Safety first</h2>
              <ul>{f.safety.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
          )}

          {f.tools.length > 0 && (
            <>
              <h2>🧰 Tools</h2>
              <ul className="plain">{f.tools.map((t) => <li key={t}>{t}</li>)}</ul>
            </>
          )}

          {f.parts.length > 0 && (
            <>
              <div className="row-between">
                <h2>🛒 Shopping list</h2>
                <button type="button" className="link" onClick={() => addAllParts(f)}>+ Add all to my list</button>
              </div>
              <ul className="parts">
                {f.parts.map((p) => (
                  <li key={p.q} className="part">
                    <div className="row-between">
                      <span className="part-name">{p.name}</span>
                      <button type="button" className="link small" onClick={() => addPart(f, p)} aria-label={`Add ${p.name} to my list`}>+ List</button>
                    </div>
                    <StoreButtons part={p} kind={f.kind} />
                  </li>
                ))}
              </ul>
              <p className="muted small">Store buttons open that store's search, with today's prices. {f.kind === "car" ? "Store staff can look up the exact part for your year, make and model." : "Bring the old part to the store to match it."}</p>
            </>
          )}

          <h2 className="hl">👉 Steps</h2>
          <ol className="steps">{f.steps.map((s) => <li key={s}>{s}</li>)}</ol>

          <div className="pro">
            <h2>📞 Call a pro if…</h2>
            <p>{f.pro.charAt(0).toUpperCase() + f.pro.slice(1)}</p>
            {f.kind === "home" && (
              <>
                <div className="pro-links">
                  {prosFor(f.cat).map((p) => (
                    <a key={p.id} className="pro-btn" href={p.affiliate ? p.affiliate(p.url) : p.url} target="_blank" rel="noopener noreferrer sponsored">
                      <strong>{p.name} ↗</strong>
                      <span className="muted small">{p.note}</span>
                    </a>
                  ))}
                </div>
                <p className="muted small">Have a home warranty or homeowners insurance? Check what it covers before paying for a repair. Get a written estimate, and check the pro's license and reviews.</p>
              </>
            )}
            {f.kind === "car" && <p className="muted small">Get a written estimate first, and ask for your old parts back.</p>}
          </div>

          <div className="button-row">
            <button type="button" className="btn-primary" onClick={() => saveProject(f)}>
              ★ Save to My Home{!premium && <span className="pill-premium">Premium</span>}
            </button>
          </div>
        </article>
        {f.partner && PARTNERS[f.partner] && (() => {
          const pt = PARTNERS[f.partner];
          return (
            <section className="card partner">
              <p className="partner-tag">Partner</p>
              <h2>🔒 {pt.title}</h2>
              <p className="muted">{pt.text}</p>
              <a className="btn-primary link-btn" href={pt.affiliate ? pt.affiliate(pt.url) : pt.url} target="_blank" rel="noopener noreferrer sponsored">{pt.button} ↗</a>
            </section>
          );
        })()}
        {f.kind === "car" && (
          <section className="card cross">
            <h2>🚗 Any open recalls on your car?</h2>
            <p className="muted">Recall repairs are free at the dealer. My Recall Check, another CashCow app, checks yours in seconds.</p>
            <a className="btn-secondary link-btn" href="https://my-recall-check.onrender.com" target="_blank" rel="noopener noreferrer">Check for recalls</a>
          </section>
        )}
        {f.kind === "home" && (
          <section className="card cross">
            <h2>🛡️ Hiring someone?</h2>
            <p className="muted">Get a written estimate, never pay in full up front, and be wary of door-to-door "storm repair" offers. ScamShield, another CashCow app, checks a suspicious offer or text in seconds.</p>
            <a className="btn-secondary link-btn" href="https://cashcowai.online/scamshield.html" target="_blank" rel="noopener noreferrer">Check out ScamShield</a>
          </section>
        )}
      </>
    );
  } else if (view.name === "cat") {
    const c = CATEGORIES.find((x) => x.id === view.id);
    body = (
      <>
        <button type="button" className="link back" onClick={() => go("home")}>← All fixes</button>
        <section className="card hero"><h1>{c.icon} {c.name}</h1></section>
        <ul className="fix-list">{FIXES.filter((f) => f.cat === c.id).map((f) => <FixCard key={f.id} f={f} />)}</ul>
      </>
    );
  } else if (view.name === "list") {
    const open = data.list.filter((i) => !i.got);
    const got = data.list.filter((i) => i.got);
    body = (
      <>
        <button type="button" className="link back" onClick={() => go("home")}>← Back</button>
        <section className="card">
          <div className="row-between">
            <h1>🛒 Shopping list</h1>
            {open.length > 0 && <button type="button" className="btn-secondary small-btn" onClick={shareList}>Share</button>}
          </div>
          {data.list.length === 0 && <p className="muted">Your list is empty. Open a fix and tap "+ List" next to a part.</p>}
          <ul className="parts">
            {[...open, ...got].map((i) => {
              const f = fixById(i.fix);
              return (
                <li key={i.id} className={`part${i.got ? " got" : ""}`}>
                  <div className="part-top">
                    <input type="checkbox" className="tick" checked={i.got} aria-label={`Got ${i.name}`} onChange={(e) => update((d) => ({ ...d, list: d.list.map((x) => (x.id === i.id ? { ...x, got: e.target.checked } : x)) }))} />
                    <span className="part-name">{i.name}{f && <span className="muted small block">for: {f.title}</span>}</span>
                    <button type="button" className="link danger small" aria-label={`Remove ${i.name}`} onClick={() => update((d) => ({ ...d, list: d.list.filter((x) => x.id !== i.id) }))}>✕</button>
                  </div>
                  {!i.got && <StoreButtons part={i} kind={i.kind} />}
                </li>
              );
            })}
          </ul>
          {got.length > 0 && <button type="button" className="link" onClick={() => update((d) => ({ ...d, list: d.list.filter((x) => !x.got) }))}>Clear checked items</button>}
        </section>
      </>
    );
  } else if (view.name === "checklist") {
    const season = seasonOf();
    const groups = CHECKLIST.filter((g) => !g.seasons || g.seasons.includes(season));
    body = (
      <>
        <button type="button" className="link back" onClick={() => go("home")}>← Back</button>
        <section className="card hero">
          <h1>✅ Home checklist</h1>
          <p className="muted">Showing what to do this month, this season ({SEASON_NAME[season]}) and this year. Checkmarks reset when a new month, season or year starts.</p>
        </section>
        {groups.map((g) => {
          const done = new Set(((data.checks || {})[g.id] || {})[periodKey(g)] || []);
          return (
            <section key={g.id} className="card">
              <div className="row-between">
                <h2>{g.period === "season" ? `${g.name} (this season)` : g.name}</h2>
                <span className="muted small">{done.size}/{g.items.length}</span>
              </div>
              <ul className="rows">
                {g.items.map((it) => (
                  <li key={it.id} className={`row${done.has(it.id) ? " done" : ""}`}>
                    <input type="checkbox" className="tick" checked={done.has(it.id)} aria-label={it.text} onChange={(e) => checklistTick(g, it, e.target.checked)} />
                    <span className="row-title">{it.text}</span>
                    {it.fix && <button type="button" className="link small" onClick={() => go("fix", { id: it.fix, from: view })}>How</button>}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
        <section className="card premium-teaser">
          <h2>Want reminders?</h2>
          <p className="muted">My Home (Premium) remembers when you last did each job and flags it when it's due again.</p>
          <button type="button" className="btn-primary" onClick={() => go(premium ? "myhome" : "premium")}>{premium ? "Open My Home" : "See Premium"}</button>
        </section>
      </>
    );
  } else if (view.name === "myhome") {
    if (!premium) {
      body = (
        <>
          <button type="button" className="link back" onClick={() => go("home")}>← Back</button>
          <section className="card premium-teaser">
            <h1>🏠 My Home</h1>
            <p>Keep track of your home in one place:</p>
            <ul className="plain">
              <li>★ Projects: save fixes and track them from planned to done</li>
              <li>📒 Repair log: what was fixed, when, by whom and the cost</li>
              <li>⏰ Reminders: filters, alarms, gutters and more, flagged when due</li>
            </ul>
            <button type="button" className="btn-primary" onClick={() => go("premium")}>See Premium</button>
          </section>
        </>
      );
    } else {
      const total = log.reduce((s, e) => s + money(e.cost), 0);
      const sortedRem = [...reminders].sort((a, b) => dueDate(a).localeCompare(dueDate(b)));
      const presets = REMINDER_PRESETS.filter((p) => !reminders.some((r) => r.text === p.text));
      body = (
        <>
          <button type="button" className="link back" onClick={() => go("home")}>← Back</button>
          <section className="card hero"><h1>🏠 My Home</h1><p className="muted">Saved on this phone.</p></section>

          <section className="card">
            <h2>⏰ Reminders</h2>
            {sortedRem.length === 0 && <p className="muted">No reminders yet. Tap one below to start.</p>}
            <ul className="rows">
              {sortedRem.map((r) => {
                const due = dueDate(r);
                const late = due <= today;
                return (
                  <li key={r.id} className="row">
                    <span className="row-main static">
                      <span className="row-title">{r.text}</span>
                      <span className={`row-sub${late ? " overdue" : ""}`}>{late ? "Due now" : `Next: ${niceDate(due)}`} · every {r.months === 1 ? "month" : `${r.months} months`}{r.last ? ` · last done ${niceDate(r.last)}` : ""}</span>
                    </span>
                    <span className="row-actions">
                      <button type="button" className="btn-secondary small-btn" onClick={() => { update((d) => ({ ...d, reminders: d.reminders.map((x) => (x.id === r.id ? { ...x, last: today } : x)) })); setToast("Done! Next reminder is set."); }}>Done</button>
                      {r.fix && <button type="button" className="link small" onClick={() => go("fix", { id: r.fix, from: view })}>How</button>}
                      <button type="button" className="link danger small" aria-label={`Delete reminder ${r.text}`} onClick={() => update((d) => ({ ...d, reminders: d.reminders.filter((x) => x.id !== r.id) }))}>✕</button>
                    </span>
                  </li>
                );
              })}
            </ul>
            {presets.length > 0 && (
              <>
                <p className="label">Quick add</p>
                <div className="chips">
                  {presets.map((p) => (
                    <button key={p.text} type="button" className="chip" onClick={() => update((d) => ({ ...d, reminders: [...(d.reminders || []), { id: uid(), ...p, last: null }] }))}>+ {p.text}</button>
                  ))}
                </div>
              </>
            )}
            {remDraft ? (
              <form className="form inline-form" onSubmit={(e) => { e.preventDefault(); if (!remDraft.text.trim()) return; update((d) => ({ ...d, reminders: [...(d.reminders || []), { id: uid(), text: remDraft.text.trim().slice(0, 80), months: Number(remDraft.months) || 1, last: remDraft.last || null }] })); setRemDraft(null); }}>
                <div className="field"><label className="label" htmlFor="rem-text">Reminder</label><input id="rem-text" value={remDraft.text} maxLength={80} placeholder="Flush the water heater" onChange={(e) => setRemDraft({ ...remDraft, text: e.target.value })} /></div>
                <div className="field"><label className="label" htmlFor="rem-months">Every</label>
                  <select id="rem-months" value={remDraft.months} onChange={(e) => setRemDraft({ ...remDraft, months: e.target.value })}>
                    {[1, 2, 3, 6, 12, 24].map((m) => <option key={m} value={m}>{m === 1 ? "month" : `${m} months`}</option>)}
                  </select>
                </div>
                <div className="field"><label className="label" htmlFor="rem-last">Last done (optional)</label><input id="rem-last" type="date" max={today} value={remDraft.last} onChange={(e) => setRemDraft({ ...remDraft, last: e.target.value })} /></div>
                <div className="button-row"><button type="submit" className="btn-primary">Add reminder</button><button type="button" className="btn-secondary" onClick={() => setRemDraft(null)}>Cancel</button></div>
              </form>
            ) : (
              <button type="button" className="link" onClick={() => setRemDraft({ text: "", months: 3, last: "" })}>+ Your own reminder</button>
            )}
          </section>

          <section className="card">
            <h2>★ Projects</h2>
            {projects.length === 0 && <p className="muted">Open any fix and tap "Save to My Home".</p>}
            <ul className="rows">
              {projects.map((p) => (
                <li key={p.id} className={`row project${p.status === "done" ? " done" : ""}`}>
                  <button type="button" className="row-main" onClick={() => go("fix", { id: p.fix, from: view })}>
                    <span className="row-title">{p.title}</span>
                    <span className="row-sub">Saved {niceDate(p.added)}</span>
                  </button>
                  <select className="status" value={p.status} aria-label={`Status of ${p.title}`} onChange={(e) => setProjectStatus(p, e.target.value)}>
                    <option value="planned">Planned</option>
                    <option value="doing">In progress</option>
                    <option value="done">Done</option>
                  </select>
                  <button type="button" className="link danger small" aria-label={`Remove ${p.title}`} onClick={() => update((d) => ({ ...d, saved: d.saved.filter((x) => x.id !== p.id) }))}>✕</button>
                </li>
              ))}
            </ul>
          </section>

          <section className="card">
            <div className="row-between">
              <h2>📒 Repair log</h2>
              {total > 0 && <span className="muted small">Total: ${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>}
            </div>
            {logDraft ? (
              <form className="form inline-form" onSubmit={(e) => { e.preventDefault(); if (!logDraft.what.trim()) return; update((d) => ({ ...d, log: [{ id: uid(), ...logDraft, what: logDraft.what.trim().slice(0, 120) }, ...(d.log || [])] })); setLogDraft(null); setToast("Added to your repair log."); }}>
                <div className="field"><label className="label" htmlFor="log-what">What was fixed</label><input id="log-what" value={logDraft.what} maxLength={120} onChange={(e) => setLogDraft({ ...logDraft, what: e.target.value })} /></div>
                <div className="field"><label className="label" htmlFor="log-date">Date</label><input id="log-date" type="date" value={logDraft.date} onChange={(e) => setLogDraft({ ...logDraft, date: e.target.value })} /></div>
                <div className="field"><label className="label" htmlFor="log-who">Who did it</label><input id="log-who" value={logDraft.who} maxLength={80} placeholder="Me, or the company's name" onChange={(e) => setLogDraft({ ...logDraft, who: e.target.value })} /></div>
                <div className="field"><label className="label" htmlFor="log-cost">Cost ($)</label><input id="log-cost" inputMode="decimal" value={logDraft.cost} maxLength={12} placeholder="45.00" onChange={(e) => setLogDraft({ ...logDraft, cost: e.target.value })} /></div>
                <div className="field"><label className="label" htmlFor="log-notes">Notes</label><textarea id="log-notes" rows={2} value={logDraft.notes} maxLength={500} placeholder="Part numbers, warranty, receipt location" onChange={(e) => setLogDraft({ ...logDraft, notes: e.target.value })} /></div>
                <div className="button-row"><button type="submit" className="btn-primary">Save entry</button><button type="button" className="btn-secondary" onClick={() => setLogDraft(null)}>Cancel</button></div>
              </form>
            ) : (
              <button type="button" className="btn-secondary" onClick={() => setLogDraft({ date: today, what: "", who: "Me", cost: "", notes: "" })}>+ Add a repair</button>
            )}
            <ul className="rows">
              {log.map((e) => (
                <li key={e.id} className="row">
                  <span className="row-main static">
                    <span className="row-title">{e.what}</span>
                    <span className="row-sub">{[niceDate(e.date), e.who, money(e.cost) ? `$${money(e.cost).toFixed(2)}` : ""].filter(Boolean).join(" · ")}</span>
                    {e.notes && <span className="row-sub">{e.notes}</span>}
                  </span>
                  <button type="button" className="link danger small" aria-label={`Delete ${e.what}`} onClick={() => window.confirm("Delete this repair from your log?") && update((d) => ({ ...d, log: d.log.filter((x) => x.id !== e.id) }))}>✕</button>
                </li>
              ))}
            </ul>
          </section>
        </>
      );
    }
  } else {
    // home
    body = (
      <>
        <section className="card hero">
          <h1>What needs fixing?</h1>
          <p className="muted">{BRAND.tagline}</p>
          <label className="sr-only" htmlFor="q">Search fixes</label>
          <form role="search" onSubmit={(e) => { e.preventDefault(); e.target.querySelector("input").blur(); pointTo(answerRef.current); }}>
            <input id="q" type="search" enterKeyHint="search" value={query} placeholder="Try: toilet keeps running" onChange={(e) => setQuery(e.target.value)} autoComplete="off" />
          </form>
        </section>

        <div className="gas-banner" role="note">
          <strong>Smell gas?</strong> Don't flip switches or light anything. Leave now, then call the gas company or 911 from outside.
        </div>

        {query.trim() ? (
          <section ref={answerRef} className="card answer" aria-live="polite">
            <p className="answer-tag">👉 Your answer</p>
            <h2 className="section-title">{results.length ? `${results.length} ${results.length === 1 ? "fix" : "fixes"} for "${query.trim()}"` : `No fix found for "${query.trim()}"`}</h2>
            {results.length ? <ul className="fix-list">{results.map((f) => <FixCard key={f.id} f={f} />)}</ul> : (
              <p className="card muted">Try other words, like "leak", "clog", "door" or "battery", or browse below. For anything with gas, the breaker panel or the roof, call a pro.</p>
            )}
          </section>
        ) : null}

        {premium && dueReminders.length > 0 && (
          <button type="button" className="card due-card" onClick={() => go("myhome")}>
            <strong>⏰ {dueReminders.length} home {dueReminders.length === 1 ? "reminder is" : "reminders are"} due</strong>
            <span className="muted small">{dueReminders.slice(0, 3).map((r) => r.text).join(" · ")}</span>
          </button>
        )}

        <nav className="quick-nav" aria-label="Your tools">
          <button type="button" className="qn" onClick={() => go("list")}><span aria-hidden="true">🛒</span>Shopping list{listCount > 0 && <span className="count">{listCount}</span>}</button>
          <button type="button" className="qn" onClick={() => go("checklist")}><span aria-hidden="true">✅</span>Home checklist</button>
          <button type="button" className="qn wide" onClick={() => go("myhome")}><span aria-hidden="true">🏠</span>My Home{!premium && <span className="pill-premium">Premium</span>}</button>
        </nav>

        <section>
          <h2 className="section-title">Browse fixes</h2>
          <ul className="cat-grid">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <button type="button" className="cat-btn" onClick={() => go("cat", { id: c.id })}>
                  <span className="cat-icon" aria-hidden="true">{c.icon}</span>
                  <span>{c.name}</span>
                  <span className="muted small">{FIXES.filter((f) => f.cat === c.id).length} fixes</span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        {!premium && (
          <section className="card premium-teaser">
            <h2>My Home Premium</h2>
            <p className="muted">Projects, a repair log with costs, and reminders for filters, alarms and gutters. From $1.99 a month.</p>
            <button type="button" className="btn-primary" onClick={() => go("premium")}>See plans</button>
          </section>
        )}

        <section className="card">
          <h2>✉️ Bad repair job?</h2>
          <p className="muted">If a contractor or store won't make it right, My Letter Helper, another CashCow app, writes the complaint or refund letter for you.</p>
          <a className="btn-secondary link-btn" href="https://my-letter-helper.onrender.com" target="_blank" rel="noopener noreferrer">Open My Letter Helper</a>
        </section>
        <section className="card">
          <h2>💬 CashCow Community</h2>
          <p className="muted">Ask other members for repair tips. Uses your free CashCow account.</p>
          <a className="btn-secondary link-btn" href="https://cashcowai.online/community.html#general" target="_blank" rel="noopener noreferrer">Open the community</a>
        </section>
      </>
    );
  }

  return (
    <div className="app">
      <header className="top">
        <button type="button" className="brand" onClick={() => { setQuery(""); go("home"); }} aria-label={`${BRAND.name} home`}>
          <span className="logo" aria-hidden="true">🔧</span>
          <span>{BRAND.name}</span>
        </button>
        <button type="button" className="link light" onClick={() => go("settings")}>Settings</button>
      </header>
      <main>
        {notice && (
          <div className="notice" role="status">
            <span>{notice}</span>
            <button type="button" className="link" onClick={() => setNotice("")} aria-label="Dismiss">✕</button>
          </div>
        )}
        {body}
        <p className="disclaimer">
          General how-to information. Work at your own risk and follow the product's instructions. For gas, the electrical panel, the roof, or anything you're unsure about, call a licensed pro.
          Store and partner links open their own sites; {BRAND.name} may earn a commission on purchases.
        </p>
      </main>
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
