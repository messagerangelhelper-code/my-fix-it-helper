// Rebrand the app here: change the name, tagline and colors, and the whole app follows.
// (Also update the <title> and theme-color in index.html.)
export const BRAND = {
  name: "My Fix-It Helper",
  tagline: "Simple step-by-step fixes for your home and car, with the parts list and when to call a pro.",
  colors: {
    main: "#b45309", // header, buttons
    mainHover: "#c2610f",
    soft: "#fdf1e3", // light highlight
  },
};

// Store buttons on every shopping list. Each one opens that store's own search, so
// prices and stock are always current. Home fixes show the home stores; car fixes
// show the auto parts stores.
// After joining a store's affiliate program (Home Depot and Advance Auto Parts and
// AutoZone: Impact; Lowe's: FlexOffers), set its "affiliate" to a function that wraps
// the store link in your tracking link, and every button for that store earns from then on.
// Example: affiliate: (url) => `https://YOUR-TRACKING-LINK?u=${encodeURIComponent(url)}`
export const STORES = [
  { id: "homedepot", name: "Home Depot", for: "home", search: (q) => `https://www.homedepot.com/s/${encodeURIComponent(q)}`, affiliate: null },
  { id: "lowes", name: "Lowe's", for: "home", search: (q) => `https://www.lowes.com/search?searchTerm=${encodeURIComponent(q)}`, affiliate: null },
  { id: "autozone", name: "AutoZone", for: "car", search: (q) => `https://www.autozone.com/searchresult?searchText=${encodeURIComponent(q)}`, affiliate: null },
  { id: "advance", name: "Advance Auto", for: "car", search: (q) => `https://shop.advanceautoparts.com/web/SearchResults?searchTerm=${encodeURIComponent(q)}`, affiliate: null },
  { id: "oreilly", name: "O'Reilly", for: "car", search: (q) => `https://www.oreillyauto.com/search?q=${encodeURIComponent(q)}`, affiliate: null },
];

export function storesFor(kind) {
  return STORES.filter((s) => s.for === kind);
}

export function storeLink(store, query) {
  const url = store.search(query);
  return store.affiliate ? store.affiliate(url) : url;
}

// "Call a pro" buttons on home fixes. Angi finds local pros; American Home Shield is a
// home warranty that covers many appliance and system repairs. Add an affiliate link
// the same way as the stores if you join their programs later.
export const PROS = [
  { id: "angi", name: "Find a pro on Angi", url: "https://www.angi.com/", note: "Compare local pros and reviews", cats: null, affiliate: null },
  { id: "ahs", name: "American Home Shield", url: "https://www.ahs.com/", note: "Home warranty for appliances and systems", cats: ["plumbing", "electric", "appliances"], affiliate: null },
];

export function prosFor(cat) {
  return PROS.filter((p) => !p.cats || p.cats.includes(cat));
}

// Partner offers shown under certain fixes (fixes.js "partner"). Disclosed in the app as
// a partner. Add the affiliate link once approved (SimpliSafe: Impact).
export const PARTNERS = {
  simplisafe: {
    name: "SimpliSafe",
    title: "Want a security system that installs in minutes?",
    text: "SimpliSafe is a do-it-yourself home security system: no drilling, no long-term contract, and optional 24/7 professional monitoring.",
    button: "See SimpliSafe",
    url: "https://simplisafe.com/",
    affiliate: null,
  },
};
