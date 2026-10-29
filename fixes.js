// Every fix in the app. Each one has: what it is, how long it takes, safety steps
// first, tools, a parts list (each part is a store search), the steps, and when to
// call a pro. "kind" decides which stores show: "home" or "car".
// Wording rule: general how-to information. Safety first, and "call a pro" whenever
// a job involves gas, the electrical panel, the roof, or anything the person isn't sure about.

export const CATEGORIES = [
  { id: "plumbing", name: "Plumbing", icon: "🚰" },
  { id: "doors", name: "Doors & windows", icon: "🚪" },
  { id: "walls", name: "Walls & floors", icon: "🧱" },
  { id: "electric", name: "Electrical basics", icon: "💡" },
  { id: "appliances", name: "Appliances & heating/cooling", icon: "🧺" },
  { id: "outdoor", name: "Outdoor & garage", icon: "🏡" },
  { id: "security", name: "Home safety & security", icon: "🔒" },
  { id: "car", name: "Car basics", icon: "🚗" },
];

const WATER_OFF = "Turn off the water to the fixture first: the small valve under the sink or behind the toilet turns clockwise to close.";
const POWER_OFF = "Turn off the power at the breaker box, then check with a non-contact voltage tester that it's really off.";

export const FIXES = [
  // ---------------- Plumbing ----------------
  {
    id: "main-water-shutoff", cat: "plumbing", kind: "home", title: "Find and shut off your main water valve",
    words: "main water shut off valve burst pipe flood leak emergency",
    time: "10 minutes", level: "Easy",
    why: "Know this before an emergency. A burst pipe can pour out gallons a minute; shutting the main stops it.",
    safety: ["If water is near outlets, cords or the electrical panel, stay out of the water and call an electrician or 911."],
    tools: ["Flashlight"],
    parts: [{ name: "Water meter key (for a valve at the street)", q: "water meter key" }],
    steps: [
      "Look where the water line enters the house: basement wall, crawl space, garage, utility closet, or near the water heater. In warm areas it may be outside near the foundation.",
      "The main valve is usually a lever (quarter turn) or a round wheel handle on the pipe coming in.",
      "To shut it off: turn a wheel handle clockwise until it stops, or turn a lever so it sits across the pipe.",
      "Open a faucet on the lowest floor to check that the water stops and to drain the pressure.",
      "If you can't find it, the shutoff at the street (in a box near the curb with the water meter) also works. It may need a water meter key.",
      "Tie a bright tag on the valve so everyone in the house can find it fast.",
    ],
    pro: "the valve is stuck, leaking, or breaks when you turn it. Don't force it; call a plumber or your water company.",
  },
  {
    id: "running-toilet", cat: "plumbing", kind: "home", title: "Stop a running toilet",
    words: "toilet running keeps running constantly refill hissing flapper chain fill valve commode leaking tank",
    time: "15–30 minutes", level: "Easy",
    why: "A running toilet can waste hundreds of gallons a day. Most of the time the flapper or the chain is the problem.",
    safety: [WATER_OFF],
    tools: ["Rubber gloves", "Sponge or towel"],
    parts: [
      { name: "Toilet flapper (bring the old one to match)", q: "toilet flapper" },
      { name: "Fill valve kit (if the flapper isn't it)", q: "toilet fill valve" },
    ],
    steps: [
      "Take the tank lid off and set it somewhere safe (it breaks easily).",
      "Check the chain: it should have a little slack. Too tight and the flapper can't close; too long and it gets caught under it. Adjust it by moving the clip.",
      "Check the water level: it should be about 1 inch below the top of the overflow tube. If water spills into the tube, lower the float (turn the adjustment screw or slide the clip down).",
      "Dye test: put a few drops of food coloring in the tank and wait 15 minutes without flushing. Color in the bowl means the flapper is leaking.",
      "To replace the flapper: turn off the water, flush to empty the tank, unhook the old flapper from the pegs on the overflow tube, hook on the new one and attach the chain.",
      "Turn the water back on, let it fill, and flush a few times to check.",
    ],
    pro: "the tank or bowl is cracked, water is leaking onto the floor from the base, or the shutoff valve won't close.",
  },
  {
    id: "clogged-toilet", cat: "plumbing", kind: "home", title: "Unclog a toilet",
    words: "toilet clogged clog blocked backed up overflowing won't flush plunger commode",
    time: "10–20 minutes", level: "Easy",
    why: "A flange plunger (the kind with a soft flap on the bottom) clears most toilet clogs.",
    safety: [
      "If the bowl is about to overflow, don't flush again. Take the tank lid off and push the flapper down, or turn off the valve behind the toilet.",
      "Don't use chemical drain cleaners in a toilet, and never plunge after using one: it can splash on you.",
    ],
    tools: ["Rubber gloves", "Old towels"],
    parts: [
      { name: "Flange toilet plunger", q: "toilet plunger flange" },
      { name: "Toilet auger (for stubborn clogs)", q: "toilet auger" },
    ],
    steps: [
      "Put towels down around the base.",
      "Make sure there's enough water in the bowl to cover the plunger cup. Add some if needed.",
      "Fold out the flap and fit the plunger snugly into the hole at the bottom of the bowl.",
      "Push down gently the first time (to push air out), then plunge firmly up and down 10–15 times, keeping the seal.",
      "When the water drains, flush once to check. Repeat if needed.",
      "If plunging doesn't work, feed a toilet auger into the bowl, crank it clockwise to break up or grab the clog, then pull it back out.",
    ],
    pro: "several drains in the house are backing up at once, or sewage comes up in a tub or floor drain. That points to a main line clog.",
  },
  {
    id: "slow-drain", cat: "plumbing", kind: "home", title: "Clear a slow or clogged sink or tub drain",
    words: "drain slow clogged clog sink bathroom tub shower hair blocked standing water",
    time: "15–30 minutes", level: "Easy",
    why: "Bathroom drains usually clog with hair and soap. Pulling it out works better than chemicals.",
    safety: ["Skip chemical drain cleaners: they can damage pipes and burn skin, and they're dangerous if you have to plunge or open the pipe afterward."],
    tools: ["Rubber gloves", "Flashlight", "Bucket"],
    parts: [
      { name: "Plastic drain cleaning tool (barbed strip)", q: "drain cleaning tool" },
      { name: "Sink plunger (flat cup)", q: "sink plunger" },
      { name: "Hand drain snake (for deeper clogs)", q: "drain snake" },
    ],
    steps: [
      "Remove the stopper. Many lift straight out or twist off; some sink stoppers are held by a rod under the sink with a small nut.",
      "Clean the hair and gunk off the stopper.",
      "Push the barbed drain tool down the drain, twist, and pull it back up slowly. Repeat until it comes up clean.",
      "Run hot tap water for a minute to check.",
      "Still slow? For a sink, stuff a wet rag in the overflow hole and use a sink plunger. For deeper clogs, use a hand snake.",
    ],
    pro: "the clog keeps coming back, more than one drain is slow, or you hear gurgling from other drains.",
  },
  {
    id: "leaky-faucet", cat: "plumbing", kind: "home", title: "Fix a dripping faucet",
    words: "faucet dripping drip leaky leak tap sink cartridge washer o-ring handle",
    time: "30–60 minutes", level: "Medium",
    why: "A drip usually means a worn cartridge, washer or O-ring inside the handle. Fixing it can save thousands of gallons a year.",
    safety: [WATER_OFF, "Put the stopper in the drain so small parts can't fall in."],
    tools: ["Adjustable wrench", "Screwdrivers", "Allen wrench set", "Rag"],
    parts: [
      { name: "Faucet cartridge (match your faucet brand)", q: "faucet cartridge" },
      { name: "Faucet repair kit (washers and O-rings)", q: "faucet repair kit" },
      { name: "Plumber's grease", q: "plumbers grease" },
    ],
    steps: [
      "Find the faucet brand name (usually on the handle or base) and take a photo of it.",
      "Pop off the decorative cap on the handle, remove the screw under it, and pull the handle off.",
      "Unscrew the retaining nut or clip and pull out the cartridge or stem. Lay parts out in order and take photos as you go.",
      "Take the old cartridge to the store to match it exactly, or order it by brand and model.",
      "Coat the new O-rings with plumber's grease, put the new cartridge in the same way the old one came out, and reassemble.",
      "Turn the water on slowly and check for drips.",
    ],
    pro: "the leak is coming from the pipes under the sink or the faucet body is cracked or corroded.",
  },
  {
    id: "low-pressure-aerator", cat: "plumbing", kind: "home", title: "Fix low water flow from a faucet",
    words: "low water pressure weak flow faucet aerator sputtering clogged screen mineral",
    time: "10 minutes", level: "Easy",
    why: "If only one faucet is weak, the little screen at the tip (the aerator) is probably clogged with minerals.",
    safety: [],
    tools: ["Rag", "Pliers (wrap the jaws in tape to avoid scratches)", "Old toothbrush"],
    parts: [
      { name: "Faucet aerator (bring the old one to match size)", q: "faucet aerator" },
      { name: "White vinegar", q: "white vinegar cleaning" },
    ],
    steps: [
      "Unscrew the aerator from the tip of the faucet by hand (turn it clockwise when looking down from above). Use taped pliers if it's stuck.",
      "Rinse out debris and scrub the screen with a toothbrush.",
      "If it's crusty, soak it in white vinegar for an hour, then rinse.",
      "Screw it back on hand-tight and run the water. Replace it if it's damaged.",
    ],
    pro: "every faucet in the house has low pressure, which can mean a problem with the main valve, pressure regulator or pipes.",
  },
  {
    id: "garbage-disposal", cat: "plumbing", kind: "home", title: "Unjam a garbage disposal",
    words: "garbage disposal disposer jammed humming stuck not working reset button",
    time: "15 minutes", level: "Easy",
    why: "A humming disposal is usually jammed. A hex key underneath frees it, and the reset button restarts it.",
    safety: ["Turn off the switch AND unplug the disposal or turn off its breaker before working on it.", "Never put your hand in the disposal. Use tongs or pliers to pull things out."],
    tools: ["Flashlight", "Tongs or pliers"],
    parts: [{ name: "Disposal wrench (1/4 inch hex key)", q: "garbage disposal wrench" }],
    steps: [
      "Turn off and unplug the disposal (or turn off its breaker).",
      "Shine a flashlight in. Pull out anything stuck with tongs.",
      "Under the sink, find the hex hole in the very bottom center of the disposal. Insert the hex key and work it back and forth until it turns a full circle freely.",
      "Find the small red reset button on the bottom and press it.",
      "Plug it back in, run cold water, and turn it on.",
    ],
    pro: "it's leaking from the body, it trips the breaker every time, or it won't turn on after a reset.",
  },
  {
    id: "recaulk-tub", cat: "plumbing", kind: "home", title: "Re-caulk a tub or shower",
    words: "caulk caulking tub shower moldy cracked gap seal bathroom silicone",
    time: "1 hour plus drying", level: "Easy",
    why: "Cracked or moldy caulk lets water behind the tub and into the wall.",
    safety: ["Open a window or run the fan.", "Use a plastic scraper or be gentle with a blade so you don't scratch the tub."],
    tools: ["Caulk gun", "Utility knife or caulk removal tool", "Rags", "Painter's tape"],
    parts: [
      { name: "100% silicone kitchen and bath caulk", q: "silicone bath caulk" },
      { name: "Caulk removal tool", q: "caulk removal tool" },
      { name: "Rubbing alcohol", q: "rubbing alcohol" },
    ],
    steps: [
      "Cut and scrape out all the old caulk.",
      "Clean the joint, wipe with rubbing alcohol, and let it dry completely (a few hours).",
      "Optional: put painter's tape on both sides of the joint for a straight line.",
      "Cut the caulk tip at an angle with a small hole. Run one steady bead along the joint.",
      "Smooth it with a wet fingertip, then pull the tape off right away.",
      "Let it cure as long as the tube says (often 24 hours) before using the shower.",
    ],
    pro: "the tile or wall behind the tub is soft, crumbling or moldy. That means water damage inside the wall.",
  },
  {
    id: "showerhead", cat: "plumbing", kind: "home", title: "Fix a weak shower: clean or replace the showerhead",
    words: "shower head showerhead weak spray clogged mineral buildup replace leaking",
    time: "20 minutes", level: "Easy",
    why: "Clogged nozzles cause weak, uneven spray. Soaking usually fixes it; a new one takes minutes.",
    safety: [],
    tools: ["Adjustable wrench", "Rag", "Plastic bag and rubber band"],
    parts: [
      { name: "Plumber's tape (thread seal tape)", q: "thread seal tape" },
      { name: "Showerhead", q: "showerhead" },
      { name: "White vinegar", q: "white vinegar cleaning" },
    ],
    steps: [
      "To clean without removing: fill a plastic bag with white vinegar, tie it around the showerhead so the nozzles are covered, and leave it a few hours. Rinse by running the water.",
      "To replace: wrap a rag around the nut and unscrew the old showerhead counterclockwise.",
      "Clean the threads on the pipe and wrap them clockwise 3–4 times with plumber's tape.",
      "Screw on the new showerhead by hand, then snug it with the wrench (rag on it) a quarter turn. Don't overtighten.",
      "Run the water and check for drips at the connection.",
    ],
    pro: "the pipe coming out of the wall is loose or leaks inside the wall.",
  },

  // ---------------- Doors & windows ----------------
  {
    id: "squeaky-door", cat: "doors", kind: "home", title: "Silence a squeaky door",
    words: "door squeaky squeak creaky hinge noisy",
    time: "10 minutes", level: "Easy",
    why: "Squeaks come from dry hinge pins. A little lubricant fixes it.",
    safety: [],
    tools: ["Hammer", "Nail or screwdriver", "Rag"],
    parts: [{ name: "White lithium grease or silicone spray", q: "white lithium grease spray" }],
    steps: [
      "Close the door so it's supported.",
      "Tap the hinge pin up and out from below with a nail and hammer. Do one hinge at a time.",
      "Wipe the pin clean, coat it lightly with grease, and tap it back in.",
      "Open and close the door a few times and wipe off any drips.",
    ],
    pro: "the door frame is cracked or the door has sagged badly.",
  },
  {
    id: "door-latch", cat: "doors", kind: "home", title: "Fix a door that won't latch",
    words: "door won't latch close catch strike plate sagging misaligned stick",
    time: "20–40 minutes", level: "Easy",
    why: "When a door sags, the latch misses the hole in the strike plate. Tightening hinges or moving the plate fixes it.",
    safety: [],
    tools: ["Screwdriver", "Lipstick or a dry-erase marker", "Small file"],
    parts: [{ name: "3 inch wood screws (for loose hinges)", q: "3 inch wood screws" }],
    steps: [
      "Tighten every hinge screw on the door and frame.",
      "If a top hinge screw keeps spinning, replace one of its screws with a 3 inch screw so it bites into the wall framing. This often pulls the door back into line.",
      "Still missing? Rub lipstick on the latch, close the door, and see where it marks the strike plate.",
      "If it's a little off, file the strike plate opening wider on that side. If it's far off, unscrew the plate and move it.",
    ],
    pro: "the frame is split, or the door rubs because the house has shifted a lot.",
  },
  {
    id: "drafty-door", cat: "doors", kind: "home", title: "Stop a drafty door",
    words: "draft drafty door cold air weatherstrip weather stripping sweep gap energy bill",
    time: "30–60 minutes", level: "Easy",
    why: "Gaps around exterior doors leak heating and cooling. Weatherstripping and a door sweep are cheap fixes.",
    safety: [],
    tools: ["Tape measure", "Scissors or utility knife", "Screwdriver"],
    parts: [
      { name: "Door weatherstripping (foam or V-strip)", q: "door weatherstripping" },
      { name: "Door sweep", q: "door sweep" },
    ],
    steps: [
      "On a windy day or with a candle (careful), find where air gets in: sides, top, or bottom.",
      "Pull off old, flattened weatherstripping. Clean the frame.",
      "Measure, cut and press in the new weatherstripping along the stop where the door closes against it.",
      "For the bottom: measure the door width, cut the sweep to fit, and screw it to the inside bottom of the door so it just touches the threshold.",
      "Close the door and check it latches without forcing.",
    ],
    pro: "the door or frame is rotted or the door is badly warped.",
  },
  {
    id: "sliding-door", cat: "doors", kind: "home", title: "Make a sliding patio door glide again",
    words: "sliding door patio stuck hard to open track rollers dirty",
    time: "30 minutes", level: "Easy",
    why: "Dirt in the track and low rollers make sliding doors drag.",
    safety: ["The door panel is very heavy. Don't take it off the track by yourself."],
    tools: ["Vacuum", "Stiff brush", "Screwdriver"],
    parts: [{ name: "Dry silicone spray lubricant", q: "silicone spray lubricant" }],
    steps: [
      "Vacuum the track and scrub it with a stiff brush, then wipe it clean.",
      "Spray a light coat of dry silicone in the track and wipe off extra.",
      "Look for adjustment screws at the bottom ends of the door (often behind small caps). Turning them raises or lowers the rollers.",
      "Raise both sides a little at a time until the door glides without scraping.",
    ],
    pro: "the rollers are broken and need replacing. The door has to come out, which takes two strong people.",
  },

  // ---------------- Walls & floors ----------------
  {
    id: "drywall-hole", cat: "walls", kind: "home", title: "Patch a hole in drywall",
    words: "drywall hole wall patch doorknob hole sheetrock repair spackle",
    time: "1 hour plus drying", level: "Easy",
    why: "Holes up to about 4 inches fix with a self-adhesive patch and spackle.",
    safety: ["Before cutting into a wall, make sure there are no wires or pipes behind that spot.", "Homes built before 1978 may have lead paint. Don't sand old paint; see EPA lead-safe guidance."],
    tools: ["Putty knife (4–6 inch)", "Sanding sponge", "Utility knife"],
    parts: [
      { name: "Drywall patch kit (self-adhesive mesh)", q: "drywall patch kit" },
      { name: "Lightweight spackle", q: "spackle" },
      { name: "Primer and matching paint", q: "interior primer" },
    ],
    steps: [
      "Trim loose paper and crumbs from the edge of the hole.",
      "Stick the mesh patch over the hole so it overlaps all sides.",
      "Spread a thin coat of spackle over the patch, feathering it out a few inches past the edges.",
      "Let it dry, sand lightly, and add a second thin coat. Repeat until smooth.",
      "Prime the patch, then paint.",
    ],
    pro: "the hole is bigger than your hand, the drywall is wet or moldy, or there's water damage.",
  },
  {
    id: "nail-holes", cat: "walls", kind: "home", title: "Fill nail holes and small dents",
    words: "nail holes small holes dents dings wall spackle moving out deposit",
    time: "20 minutes plus drying", level: "Easy",
    why: "Quick, cheap, and handy before moving out of a rental.",
    safety: [],
    tools: ["Small putty knife", "Fine sanding sponge"],
    parts: [{ name: "Lightweight spackle", q: "spackle" }],
    steps: [
      "Press a little spackle into each hole with the putty knife.",
      "Scrape the extra off flat with the wall.",
      "Let it dry, sand lightly, and touch up with paint.",
    ],
    pro: "never needed for this one.",
  },
  {
    id: "squeaky-floor", cat: "walls", kind: "home", title: "Quiet a squeaky floor",
    words: "floor squeaky squeak creaky floorboard subfloor carpet hardwood",
    time: "30–60 minutes", level: "Medium",
    why: "Squeaks happen when the floor rubs against a nail or joist. Screwing it down stops the movement.",
    safety: ["Know what's under the floor before driving screws: pipes, wires and heating ducts can run between joists."],
    tools: ["Stud finder", "Drill"],
    parts: [{ name: "Squeaky floor repair kit (screws for carpet or hardwood)", q: "squeaky floor repair kit" }],
    steps: [
      "Walk the area to find exactly where it squeaks. Mark it.",
      "Use a stud finder to locate the joist nearest the squeak.",
      "With a repair kit, drive the special screw through the carpet or floor into the joist. The kit's tool snaps the screw head off below the surface.",
      "If you can reach the floor from a basement below, a thin wood shim tapped into a gap between the joist and subfloor (with a little wood glue) also works.",
    ],
    pro: "the floor feels soft, bouncy or sloped. That can mean water damage or a structural problem.",
  },

  // ---------------- Electrical basics ----------------
  {
    id: "breaker-gfci", cat: "electric", kind: "home", title: "Reset a tripped breaker or GFCI outlet",
    words: "breaker tripped outlet not working no power gfci reset button bathroom kitchen dead outlet",
    time: "10 minutes", level: "Easy",
    why: "Dead outlets are often a tripped breaker or a GFCI outlet (with TEST and RESET buttons) somewhere else on the same line.",
    safety: [
      "If you smell burning, see scorch marks, or an outlet is hot, leave it off and call an electrician.",
      "Touch the breaker panel only with dry hands, standing on a dry floor.",
    ],
    tools: ["Flashlight"],
    parts: [{ name: "Plug-in outlet tester", q: "outlet tester" }],
    steps: [
      "Unplug things from the dead outlets.",
      "Check GFCI outlets nearby: bathrooms, kitchen, garage, outdoors, laundry. Press RESET firmly on any that clicked off. One GFCI can protect several outlets.",
      "At the breaker box, find a breaker sitting in the middle or in the opposite direction from the rest.",
      "Push it fully to OFF first, then back to ON.",
      "Plug things back in one at a time. If it trips again right away, something plugged in may be the problem.",
    ],
    pro: "a breaker trips again with nothing plugged in, or keeps tripping. That's a wiring problem.",
  },
  {
    id: "smoke-alarm", cat: "electric", kind: "home", title: "Stop a chirping smoke alarm",
    words: "smoke alarm detector chirping beeping low battery carbon monoxide co replace",
    time: "10 minutes", level: "Easy",
    why: "A chirp every minute or so usually means a low battery or an alarm that's too old.",
    safety: [
      "If an alarm sounds a full alarm (not a chirp), get everyone out first and call 911 from outside.",
      "If a carbon monoxide alarm goes off, get everyone outside to fresh air and call 911.",
      "Use a sturdy step ladder, not a chair.",
    ],
    tools: ["Step ladder"],
    parts: [
      { name: "Batteries (check the alarm for the type, often 9V or AA)", q: "9v battery" },
      { name: "Smoke alarm (if 10 years old or more)", q: "smoke alarm" },
      { name: "Carbon monoxide alarm", q: "carbon monoxide alarm" },
    ],
    steps: [
      "Find which alarm is chirping. Wait under each one for a minute.",
      "Twist the alarm off its base. Check the date on the back.",
      "If the date is 10 or more years ago, replace the whole alarm. Alarms wear out.",
      "Otherwise, put in a fresh battery. Hardwired alarms have a backup battery too.",
      "Press and hold the TEST button until it sounds.",
      "Some alarms keep chirping briefly after a battery change; holding TEST for 15–20 seconds can clear it.",
    ],
    pro: "hardwired alarms need to be replaced and you're not comfortable working with wiring.",
  },
  {
    id: "outlet-cover", cat: "electric", kind: "home", title: "Replace a cracked outlet or switch cover",
    words: "outlet cover plate switch plate cracked broken wall plate",
    time: "5 minutes", level: "Easy",
    why: "Cracked covers expose wires. A new plate costs very little.",
    safety: ["Don't touch anything inside the box. If you see damaged wires, scorch marks or a loose outlet, turn the breaker off and call an electrician."],
    tools: ["Flat screwdriver"],
    parts: [{ name: "Outlet or switch cover plate (match the type)", q: "outlet cover plate" }],
    steps: [
      "Look at the cover to match it: standard outlet, rectangular (Decora) outlet, or switch.",
      "Remove the screw(s) and lift off the old plate.",
      "Put the new plate on and screw it in until snug. Don't overtighten or it can crack.",
    ],
    pro: "the outlet itself is loose, cracked, warm, or sparks.",
  },

  // ---------------- Appliances & heating/cooling ----------------
  {
    id: "hvac-filter", cat: "appliances", kind: "home", title: "Change your furnace or AC filter",
    words: "air filter furnace hvac ac air conditioner change filter dusty",
    time: "5 minutes", level: "Easy",
    why: "A dirty filter makes the system work harder and can make it freeze up or overheat.",
    safety: ["Turn the thermostat to OFF before taking the filter out."],
    tools: ["Flashlight"],
    parts: [{ name: "Air filter (the size is printed on the side of the old one)", q: "air filter" }],
    steps: [
      "Find the filter: in a slot by the furnace or air handler, or behind a large return grille on a wall or ceiling.",
      "Write down the size printed on the edge (for example 16x25x1).",
      "Slide the old one out. Note the arrow showing which way the air flows.",
      "Slide the new one in with the arrow pointing toward the furnace (away from the return grille).",
      "Turn the system back on. Check it monthly and replace as the filter package says, often every 1–3 months.",
    ],
    pro: "the system doesn't turn on, ices up, or makes grinding or banging noises.",
  },
  {
    id: "dryer-vent", cat: "appliances", kind: "home", title: "Clean the dryer lint trap and vent",
    words: "dryer taking long clothes not drying lint vent fire hot dryer",
    time: "30–60 minutes", level: "Easy",
    why: "Lint buildup makes drying slow and is a leading cause of home dryer fires.",
    safety: ["Unplug the dryer first. For a gas dryer, don't kink or disturb the gas line; if you smell gas, leave and call the gas company from outside."],
    tools: ["Vacuum with a hose", "Screwdriver"],
    parts: [
      { name: "Dryer vent cleaning kit (brush on flexible rods)", q: "dryer vent cleaning kit" },
      { name: "Metal dryer vent duct (replace plastic or foil)", q: "metal dryer vent duct" },
    ],
    steps: [
      "Clean the lint screen. If it looks clean but water beads on it, wash it with soap and a soft brush (dryer sheets leave a film).",
      "Vacuum inside the lint screen slot.",
      "Pull the dryer out and loosen the clamp to remove the duct from the back.",
      "Run the brush through the duct and the wall vent pipe, then vacuum out the lint.",
      "Outside, clean the vent hood and make sure the flap opens freely.",
      "Replace plastic or foil ducts with metal duct. Reconnect, push the dryer back without crushing the duct, and run it to check air blows out strongly outside.",
    ],
    pro: "the vent run is long, goes through the roof, or you find a bird's nest or heavy blockage you can't reach.",
  },
  {
    id: "fridge-not-cooling", cat: "appliances", kind: "home", title: "Refrigerator not cooling well",
    words: "fridge refrigerator not cooling warm coils door seal gasket freezer",
    time: "30 minutes", level: "Easy",
    why: "Dusty coils, a bad door seal or blocked vents are common, simple causes.",
    safety: ["Unplug the fridge before cleaning the coils. Keep food cold in a cooler with ice if it's going to be off a while."],
    tools: ["Vacuum", "Flashlight"],
    parts: [
      { name: "Refrigerator coil cleaning brush", q: "refrigerator coil brush" },
      { name: "Fridge thermometer", q: "refrigerator thermometer" },
    ],
    steps: [
      "Check the temperature setting. The fridge should be at or below 40°F and the freezer at 0°F.",
      "Make sure food isn't blocking the air vents inside.",
      "Door seal test: close the door on a dollar bill. If it slides out easily, the gasket isn't sealing; clean it with warm soapy water, or replace it.",
      "Unplug the fridge. Find the coils (behind the bottom grille or on the back) and clean them with a coil brush and vacuum.",
      "Plug it back in, and check the thermometer after a few hours.",
    ],
    pro: "it's still warm after a day, the compressor clicks on and off, or you hear it running nonstop.",
  },
  {
    id: "dishwasher-drain", cat: "appliances", kind: "home", title: "Dishwasher not draining",
    words: "dishwasher not draining standing water filter clogged smelly",
    time: "20 minutes", level: "Easy",
    why: "Most dishwashers have a filter at the bottom that clogs with food.",
    safety: ["Turn the dishwasher off (and off at the breaker if you'll reach under the sink).", "Scoop water out with a cup and towels before removing parts."],
    tools: ["Cup and towels", "Soft brush"],
    parts: [{ name: "Dishwasher cleaner", q: "dishwasher cleaner" }],
    steps: [
      "Pull out the bottom rack.",
      "Find the round filter at the bottom (often twists counterclockwise to remove).",
      "Rinse it under the tap and scrub gently with a soft brush.",
      "If you have a garbage disposal, run it: a clogged disposal can block the dishwasher drain. If the disposal is new, make sure its knockout plug was removed.",
      "Put the filter back, run a short cycle, and check it drains.",
    ],
    pro: "it still won't drain or you hear the pump humming without draining.",
  },
  {
    id: "smelly-washer", cat: "appliances", kind: "home", title: "Clean a smelly washing machine",
    words: "washer washing machine smells musty mildew front load gasket",
    time: "1–2 hours (mostly the cycle)", level: "Easy",
    why: "Front-loaders trap water and soap in the rubber door seal, causing a musty smell.",
    safety: ["Don't mix bleach with vinegar or ammonia cleaners."],
    tools: ["Rags", "Old toothbrush"],
    parts: [{ name: "Washing machine cleaner tablets", q: "washing machine cleaner" }],
    steps: [
      "Pull back the rubber door seal and wipe out gunk, hair and lint.",
      "Clean the detergent drawer.",
      "Run the clean cycle (or the hottest, longest cycle) empty with a washer cleaner tablet.",
      "Leave the door and drawer open between washes so it dries out, and use HE detergent in the right amount.",
    ],
    pro: "it leaks, won't spin, or you can see water pooling under it.",
  },
  {
    id: "water-heater-pilot", cat: "appliances", kind: "home", title: "No hot water: what to check",
    words: "no hot water water heater pilot light out gas electric breaker",
    time: "15–30 minutes", level: "Medium",
    why: "Before calling, a few safe checks can find the problem.",
    safety: [
      "If you smell gas (rotten eggs): don't light anything or flip switches. Leave the house and call the gas company or 911 from outside.",
      "The tank and pipes can be very hot. Don't open the drain or relief valve.",
    ],
    tools: ["Flashlight"],
    parts: [],
    steps: [
      "Electric heater: check the breaker for the water heater. If it tripped, reset it once. If it trips again, call a pro.",
      "Gas heater: look through the small window near the bottom to see if the pilot flame is lit.",
      "If the pilot is out, follow the lighting instructions on the label on the tank exactly. Many newer heaters light automatically.",
      "Make sure the gas knob or thermostat is set to ON or a temperature setting, not VACATION or OFF.",
      "Check for water under the tank.",
    ],
    pro: "the pilot won't stay lit, you smell gas, the tank is leaking, or the breaker trips again. Water heater repairs involve gas, high voltage or high pressure.",
  },

  // ---------------- Outdoor & garage ----------------
  {
    id: "gutters", cat: "outdoor", kind: "home", title: "Clean gutters from a ladder",
    words: "gutters clogged overflowing leaves downspout cleaning",
    time: "1–3 hours", level: "Medium",
    why: "Clogged gutters overflow, which can damage the roof edge, siding and foundation.",
    safety: [
      "Use a sturdy extension ladder on firm, level ground, with someone holding it. Keep three points of contact and don't overreach.",
      "Stay away from power lines.",
      "For two-story homes or steep roofs, hire a pro.",
    ],
    tools: ["Extension ladder", "Gloves", "Bucket with a hook", "Garden hose"],
    parts: [
      { name: "Gutter scoop", q: "gutter scoop" },
      { name: "Gutter guards (optional)", q: "gutter guards" },
    ],
    steps: [
      "Start near a downspout. Scoop leaves and gunk into the bucket.",
      "Move the ladder often instead of leaning.",
      "Flush the gutter with the hose and watch that water flows out the downspout.",
      "If the downspout is clogged, spray up from the bottom, or tap the side to loosen it.",
      "Make sure downspouts send water at least a few feet away from the house.",
    ],
    pro: "the house is two stories or more, the roof is steep, or gutters are sagging or pulling loose.",
  },
  {
    id: "winterize-faucet", cat: "outdoor", kind: "home", title: "Protect outdoor faucets from freezing",
    words: "outdoor faucet spigot hose bib freeze winterize frozen pipe winter",
    time: "15 minutes", level: "Easy",
    why: "Water left in an outdoor faucet can freeze, crack the pipe, and leak inside the wall when it thaws.",
    safety: [],
    tools: [],
    parts: [{ name: "Outdoor faucet cover", q: "outdoor faucet cover" }],
    steps: [
      "Disconnect and drain garden hoses before the first freeze.",
      "If there's an indoor shutoff valve for that faucet (often in the basement), close it, then open the outdoor faucet to drain it. Leave it open.",
      "Put an insulated faucet cover on each outdoor faucet.",
      "In spring, close the outdoor faucet, open the indoor valve, and check for leaks.",
    ],
    pro: "a faucet leaks when turned on in spring, or you see water inside the wall. That can mean a frozen and cracked pipe.",
  },
  {
    id: "garage-sensor", cat: "outdoor", kind: "home", title: "Garage door won't close all the way",
    words: "garage door won't close reverses goes back up sensor blinking light safety eye",
    time: "15 minutes", level: "Easy",
    why: "The safety sensors near the floor stop the door if something blocks them. When they're dirty or out of line, the door reverses.",
    safety: ["Never try to adjust or loosen the big springs or cables. They're under extreme tension and can cause serious injury."],
    tools: ["Soft cloth", "Level (optional)"],
    parts: [],
    steps: [
      "Look at the two small sensors on each side of the door, a few inches above the floor.",
      "Clear anything in the way and wipe both lenses clean.",
      "Each sensor has a light. If one is off or blinking, it's out of line: loosen its wing nut, aim it at the other sensor until its light stays solid, and tighten.",
      "Try closing the door again.",
    ],
    pro: "a spring is broken (a loud bang, or the door is very heavy), cables are loose, or the door is off its tracks.",
  },

  // ---------------- Home safety & security ----------------
  {
    id: "reinforce-door", cat: "security", kind: "home", title: "Make your front door harder to kick in",
    words: "door security break in burglar kick in deadbolt strike plate reinforce lock",
    time: "30–60 minutes", level: "Easy",
    why: "Most kicked-in doors fail at the frame, where short screws hold the strike plate. Longer screws and a reinforced strike make a big difference for little money.",
    safety: ["Make sure every outside door can still be opened quickly from inside without a key in an emergency."],
    tools: ["Drill/driver", "Screwdriver"],
    parts: [
      { name: "3 inch screws for the strike plate and hinges", q: "3 inch wood screws" },
      { name: "Door reinforcement kit or heavy-duty strike plate", q: "door reinforcement kit" },
      { name: "Deadbolt (if the door has only a knob lock)", q: "deadbolt" },
    ],
    steps: [
      "Remove one screw at a time from the deadbolt strike plate on the door frame and replace it with a 3 inch screw so it reaches the wall framing.",
      "Do the same with one screw in each hinge on the frame side.",
      "For more strength, install a heavy-duty strike plate or reinforcement kit following its instructions.",
      "Check the deadbolt throws all the way into the frame (about 1 inch). If it doesn't, adjust the strike plate.",
      "If the door has only a knob lock, add a deadbolt, or have a locksmith install one.",
    ],
    pro: "the door or frame is cracked or rotted, or you'd like a locksmith to rekey or install new locks.",
    partner: "simplisafe",
  },
  {
    id: "secure-sliding", cat: "security", kind: "home", title: "Secure a sliding door or windows",
    words: "sliding door security bar window lock break in burglar patio secure",
    time: "20 minutes", level: "Easy",
    why: "Sliding doors and ground-floor windows are common ways in. A bar in the track and simple locks stop them from being forced open or lifted out.",
    safety: [
      "Bedroom windows must stay easy to open from inside for escape in a fire. Use locks that open quickly from inside without a key or tool.",
    ],
    tools: ["Tape measure", "Drill/driver"],
    parts: [
      { name: "Sliding door security bar", q: "sliding door security bar" },
      { name: "Sliding door or window pin lock", q: "sliding door pin lock" },
      { name: "Window locks", q: "window locks" },
    ],
    steps: [
      "Measure the bottom track of the sliding door when it's closed.",
      "Put a security bar (or a wood dowel cut to length) in the track so the door can't slide open.",
      "Add a pin lock through the frame so the door can't be lifted off the track.",
      "Check that each window latch closes fully; add window locks where they're loose or missing.",
      "Keep shrubs near windows trimmed so no one can hide there.",
    ],
    pro: "a door or window frame is damaged or the glass is cracked.",
    partner: "simplisafe",
  },
  {
    id: "diy-security", cat: "security", kind: "home", title: "Set up a do-it-yourself home security system",
    words: "home security system alarm camera doorbell camera monitoring sensors simplisafe burglar",
    time: "1–2 hours", level: "Easy",
    why: "Today's do-it-yourself systems install without tools or wiring, and you choose whether to pay for professional monitoring.",
    safety: [
      "Be careful with door-to-door alarm salespeople: high-pressure pitches and long contracts are a common scam. Don't sign on the spot.",
      "Change any default passwords and turn on two-step sign-in for the app.",
    ],
    tools: [],
    parts: [
      { name: "Video doorbell", q: "video doorbell" },
      { name: "Outdoor motion-sensor light", q: "motion sensor flood light" },
      { name: "Security camera", q: "security camera" },
    ],
    steps: [
      "Walk the house and list the entry points: front, back and garage doors, sliding doors, and ground-floor windows.",
      "Plan an entry sensor on each outside door, a motion sensor in the main hallway or living room, and a keypad near the door you use most.",
      "Decide on monitoring: self-monitoring sends alerts to your phone; professional monitoring calls for help when you can't respond.",
      "Set up the base station near the middle of the house, then stick on sensors following the app's steps.",
      "Add motion lights and a video doorbell at the front door.",
      "Tell your homeowners or renters insurance. Many give a discount for a monitored system.",
    ],
    pro: "you want cameras or alarms hardwired into the walls, or a system tied into existing wiring.",
    partner: "simplisafe",
  },

  // ---------------- Car basics ----------------
  {
    id: "wipers", cat: "car", kind: "car", title: "Replace windshield wiper blades",
    words: "wiper blades windshield streaking squeaking replace wipers",
    time: "10–15 minutes", level: "Easy",
    why: "Streaky or squeaky wipers make it hard to see in rain. Most blades snap on in minutes.",
    safety: ["Hold the wiper arm when the blade is off: if it snaps back, it can crack the windshield. Put a towel on the glass just in case."],
    tools: ["Towel"],
    parts: [{ name: "Wiper blades (sizes are in your owner's manual or the store's lookup)", q: "wiper blades" }],
    steps: [
      "Look up your blade sizes for your year, make and model. Driver and passenger sides are often different sizes.",
      "Lift the wiper arm away from the glass.",
      "Press the small tab where the blade meets the arm and slide the old blade off.",
      "Slide the new blade on until it clicks.",
      "Lower the arm gently and test with washer fluid. Many parts stores will help you put them on.",
    ],
    pro: "the wipers don't move at all or move slowly; that's the motor or linkage.",
  },
  {
    id: "tire-pressure", cat: "car", kind: "car", title: "Check and fill tire pressure",
    words: "tire pressure low tire light tpms air psi flat",
    time: "10 minutes", level: "Easy",
    why: "Correct pressure helps with braking, handling, tire life and gas mileage.",
    safety: ["If a tire is very low or flat, don't drive on it. Put on the spare or call roadside help.", "Use the pressure on the sticker in the driver's door, not the number on the tire."],
    tools: [],
    parts: [
      { name: "Tire pressure gauge", q: "tire pressure gauge" },
      { name: "Portable tire inflator", q: "portable tire inflator" },
    ],
    steps: [
      "Check when tires are cold (before driving, or after the car sits a few hours).",
      "Find the right pressure (PSI) on the sticker inside the driver's door.",
      "Unscrew the valve cap, press the gauge on firmly, and read it.",
      "Add air with an inflator or gas station pump in short bursts, checking as you go. Let some out by pressing the valve pin if it's too high.",
      "Put the caps back. Check monthly and before long trips, including the spare.",
    ],
    pro: "a tire keeps losing air, has a bulge, or the tread is worn down. A tire shop can patch or replace it.",
  },
  {
    id: "jump-start", cat: "car", kind: "car", title: "Jump-start a dead battery",
    words: "dead battery jump start jumper cables car won't start clicking",
    time: "15 minutes", level: "Easy",
    why: "A clicking sound or nothing at all when you turn the key usually means a dead battery.",
    safety: [
      "Batteries can give off explosive gas. No smoking or sparks near them, and never connect the last clamp to the dead battery itself.",
      "Don't jump a battery that is cracked, leaking or frozen.",
      "Check your owner's manual. Some cars, hybrids and EVs have special jump points or instructions.",
    ],
    tools: [],
    parts: [
      { name: "Jumper cables", q: "jumper cables" },
      { name: "Portable jump starter (no second car needed)", q: "portable jump starter" },
    ],
    steps: [
      "Park the working car close, both cars off, in park, parking brakes on.",
      "RED clamp to the + post on the dead battery.",
      "Other RED clamp to the + post on the good battery.",
      "BLACK clamp to the - post on the good battery.",
      "Last BLACK clamp to a bare metal bolt on the dead car's engine, away from the battery.",
      "Start the working car and let it run a few minutes, then start the dead car.",
      "Remove the clamps in reverse order. Drive at least 20–30 minutes. Many parts stores test batteries for free; ask before buying a new one.",
    ],
    pro: "it won't start after a jump, or the battery keeps dying. It may be the battery, alternator or a drain.",
  },
  {
    id: "car-bulb", cat: "car", kind: "car", title: "Replace a burned-out brake light or headlight bulb",
    words: "headlight burned out bulb brake light tail light turn signal replace",
    time: "15–45 minutes", level: "Easy",
    why: "A burned-out light can get you pulled over and makes you harder to see.",
    safety: ["Turn the car and lights off and let the bulbs cool.", "Don't touch the glass of halogen headlight bulbs with bare fingers; skin oils can make them fail early."],
    tools: ["Screwdriver", "Gloves"],
    parts: [{ name: "Replacement bulb (look up the bulb number for your vehicle)", q: "car bulb" }],
    steps: [
      "Find the bulb number in your owner's manual or the store's vehicle lookup.",
      "Brake and tail lights: open the trunk or hatch; there's usually an access panel or screws holding the light housing.",
      "Headlights: open the hood and reach behind the headlight. Twist the bulb holder a quarter turn counterclockwise and pull it out.",
      "Unplug the old bulb and plug in the new one without touching the glass.",
      "Put it back, turn on the lights and check. Have someone press the brake to check brake lights.",
    ],
    pro: "the bulb is new but still doesn't work (could be a fuse or wiring), or the headlight is sealed and needs the bumper removed.",
  },
  {
    id: "check-engine", cat: "car", kind: "car", title: "Check engine light came on",
    words: "check engine light warning light dashboard code scan obd gas cap",
    time: "15 minutes", level: "Easy",
    why: "The light means the car's computer stored a trouble code. Sometimes it's as simple as a loose gas cap; sometimes it needs a mechanic.",
    safety: [
      "If the check engine light is FLASHING, or the car shakes, loses power, or overheats, pull over safely and get it towed or checked right away. Driving on can damage the engine.",
      "If a red oil pressure or temperature light is on, stop as soon as it's safe and turn the engine off.",
    ],
    tools: [],
    parts: [
      { name: "Gas cap (if yours is cracked or won't click)", q: "gas cap" },
      { name: "OBD2 code reader (to read codes yourself)", q: "obd2 scanner" },
    ],
    steps: [
      "Check the gas cap: take it off and put it back on until it clicks several times. The light may take a few days of driving to go off.",
      "Get the code read. Many auto parts stores scan check engine codes for free; ask at the counter. Or plug a code reader into the port under the dashboard on the driver's side.",
      "Write down the code (for example P0455) and what it means. Use the codes to compare repair quotes.",
      "Check for recalls on your vehicle too. Recall repairs are free at the dealer.",
    ],
    pro: "the light is flashing, the car runs rough, or the code points to anything beyond the gas cap. A mechanic can confirm the cause before you buy parts.",
  },
  {
    id: "check-oil", cat: "car", kind: "car", title: "Check your oil and top off fluids",
    words: "check oil dipstick low oil washer fluid coolant fluids top off",
    time: "10 minutes", level: "Easy",
    why: "Low oil can ruin an engine. A quick monthly check catches problems early.",
    safety: [
      "Park on level ground with the engine off. Wait 5–10 minutes so the oil settles.",
      "Never open the radiator or coolant cap when the engine is hot. Hot coolant can spray and burn you.",
    ],
    tools: ["Paper towel or rag", "Funnel"],
    parts: [
      { name: "Motor oil (the type is in your owner's manual or on the oil cap)", q: "motor oil" },
      { name: "Windshield washer fluid", q: "windshield washer fluid" },
    ],
    steps: [
      "Open the hood and pull out the oil dipstick (often a yellow or orange handle).",
      "Wipe it clean, push it all the way back in, and pull it out again.",
      "The oil should be between the two marks. If it's at or below the low mark, add a little of the right oil through the oil cap (not the dipstick tube unless your manual says so), wait, and recheck.",
      "Washer fluid: fill the tank with the windshield symbol on the cap.",
      "Look at the coolant reservoir (cold engine only): the level should be between MIN and MAX.",
    ],
    pro: "the oil is milky or very low again soon after topping off, you see leaks under the car, or a warning light stays on.",
  },
];

// Seasonal home checklist (free). Ticks reset each month, season or year.
export const CHECKLIST = [
  {
    id: "monthly", name: "Every month", period: "month",
    items: [
      { id: "test-alarms", text: "Test smoke and carbon monoxide alarms (press TEST)", fix: "smoke-alarm" },
      { id: "check-filter", text: "Check the furnace/AC filter; replace if dirty", fix: "hvac-filter" },
      { id: "gfci-test", text: "Press TEST then RESET on GFCI outlets", fix: "breaker-gfci" },
      { id: "under-sinks", text: "Look under sinks for drips or water stains" },
      { id: "car-tires", text: "Check car tire pressure", fix: "tire-pressure" },
    ],
  },
  {
    id: "spring", name: "Spring", period: "season", seasons: ["spring"],
    items: [
      { id: "gutters-spring", text: "Clean gutters and check downspouts", fix: "gutters" },
      { id: "ac-service", text: "Have the AC checked before summer, and clear plants away from the outdoor unit" },
      { id: "outdoor-faucets-on", text: "Turn outdoor faucets back on and check for leaks", fix: "winterize-faucet" },
      { id: "roof-look", text: "Look over the roof from the ground for missing or damaged shingles" },
      { id: "wipers-spring", text: "Replace streaky wiper blades", fix: "wipers" },
    ],
  },
  {
    id: "summer", name: "Summer", period: "season", seasons: ["summer"],
    items: [
      { id: "dryer-vent", text: "Clean the dryer vent all the way outside", fix: "dryer-vent" },
      { id: "fridge-coils", text: "Clean refrigerator coils", fix: "fridge-not-cooling" },
      { id: "caulk-check", text: "Check tub, shower and window caulk", fix: "recaulk-tub" },
      { id: "deck-fence", text: "Check deck, railings and fence for loose boards or rot" },
    ],
  },
  {
    id: "fall", name: "Fall", period: "season", seasons: ["fall"],
    items: [
      { id: "gutters-fall", text: "Clean gutters after the leaves fall", fix: "gutters" },
      { id: "furnace-service", text: "Have the furnace checked before winter" },
      { id: "faucets-off", text: "Disconnect hoses and cover outdoor faucets", fix: "winterize-faucet" },
      { id: "weatherstrip", text: "Check door weatherstripping for drafts", fix: "drafty-door" },
      { id: "fans-reverse", text: "Switch ceiling fans to turn clockwise on low (pushes warm air down)" },
    ],
  },
  {
    id: "winter", name: "Winter", period: "season", seasons: ["winter"],
    items: [
      { id: "freeze-watch", text: "On very cold nights, open cabinet doors under sinks on outside walls and let a faucet drip" },
      { id: "main-valve", text: "Make sure everyone knows where the main water shutoff is", fix: "main-water-shutoff" },
      { id: "car-kit", text: "Keep jumper cables, a blanket and a flashlight in the car", fix: "jump-start" },
      { id: "ice-dams", text: "Watch for icicles and ice buildup along the roof edge" },
    ],
  },
  {
    id: "yearly", name: "Once a year", period: "year",
    items: [
      { id: "alarm-batteries", text: "Replace smoke alarm batteries (unless they're 10-year sealed); replace alarms 10 years or older", fix: "smoke-alarm" },
      { id: "extinguisher", text: "Check the fire extinguisher gauge is in the green" },
      { id: "water-heater", text: "Have the water heater checked or flushed as its manual recommends", fix: "water-heater-pilot" },
      { id: "shutoffs", text: "Test that the water shutoff valves under sinks and toilets still turn", fix: "main-water-shutoff" },
      { id: "recalls", text: "Check your car and appliances for safety recalls" },
    ],
  },
];

// Meteorological seasons (Northern Hemisphere): Spring Mar–May, Summer Jun–Aug, Fall Sep–Nov, Winter Dec–Feb.
export function seasonOf(d = new Date()) {
  const m = d.getMonth();
  if (m >= 2 && m <= 4) return "spring";
  if (m >= 5 && m <= 7) return "summer";
  if (m >= 8 && m <= 10) return "fall";
  return "winter";
}

// The key that a tick belongs to: a new month, season or year starts fresh.
export function periodKey(group, d = new Date()) {
  const y = d.getFullYear();
  if (group.period === "month") return `${y}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  if (group.period === "year") return String(y);
  const s = seasonOf(d);
  return `${s === "winter" && d.getMonth() < 2 ? y - 1 : y}-${s}`;
}

// Suggested reminders for My Home (Premium).
export const REMINDER_PRESETS = [
  { text: "Change the furnace/AC filter", months: 3, fix: "hvac-filter" },
  { text: "Test smoke and CO alarms", months: 1, fix: "smoke-alarm" },
  { text: "Clean the gutters", months: 6, fix: "gutters" },
  { text: "Clean the dryer vent", months: 12, fix: "dryer-vent" },
  { text: "Clean refrigerator coils", months: 6, fix: "fridge-not-cooling" },
  { text: "Clean the dishwasher filter", months: 1, fix: "dishwasher-drain" },
  { text: "Check car tire pressure", months: 1, fix: "tire-pressure" },
  { text: "Check car oil", months: 1, fix: "check-oil" },
];

// ---------- search ----------
const SYN = {
  leak: ["leaking", "leaky", "drip", "dripping", "drips"],
  clog: ["clogged", "clogs", "blocked", "backed", "stopped"],
  toilet: ["commode", "potty"],
  faucet: ["tap", "spigot"],
  fridge: ["refrigerator", "freezer"],
  ac: ["air", "conditioner", "cooling", "hvac", "heat", "heater", "furnace"],
  car: ["truck", "vehicle", "suv", "auto"],
  noise: ["squeak", "squeaky", "squeaking", "creak", "creaky", "noisy"],
  power: ["electric", "electricity", "outlet", "breaker"],
};
const ROOT = {};
Object.entries(SYN).forEach(([k, list]) => { ROOT[k] = k; list.forEach((w) => { ROOT[w] = k; }); });

function stem(w) {
  let s = w.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (ROOT[s]) return ROOT[s];
  if (s.length > 5 && s.endsWith("ing")) s = s.slice(0, -3);
  else if (s.length > 4 && s.endsWith("ed")) s = s.slice(0, -2);
  else if (s.length > 3 && s.endsWith("s") && !s.endsWith("ss")) s = s.slice(0, -1);
  return ROOT[s] || s;
}
const STOP = new Set(["a", "an", "the", "my", "is", "it", "to", "of", "and", "or", "in", "on", "how", "do", "i", "fix", "won't", "wont", "not", "what", "with", "keep", "for", "can"]);
const tokens = (text) => String(text || "").split(/[\s/,.\-()]+/).map((w) => w.toLowerCase()).filter((w) => w && !STOP.has(w)).map(stem).filter(Boolean);

const INDEX = FIXES.map((f) => ({
  f,
  title: new Set(tokens(f.title)),
  words: new Set(tokens(`${f.words} ${f.cat} ${f.parts.map((p) => p.name).join(" ")}`)),
}));

export function searchFixes(query) {
  const q = tokens(query);
  if (!q.length) return [];
  return INDEX.map(({ f, title, words }) => {
    let score = 0;
    q.forEach((w) => {
      if (title.has(w)) score += 3;
      else if (words.has(w)) score += 1;
      else if (w.length >= 4 && [...title, ...words].some((t) => t.startsWith(w))) score += 0.5;
    });
    return { f, score: score / q.length };
  }).filter((r) => r.score >= 0.5).sort((a, b) => b.score - a.score).map((r) => r.f);
}

export const fixById = (id) => FIXES.find((f) => f.id === id);
