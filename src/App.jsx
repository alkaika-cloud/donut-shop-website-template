const { useEffect, useMemo, useRef, useState } = React;

    // Site content: update these values to personalize the shop.
    const SHOP = {
      name: "Sugarcloud Donuts",
      tagline: "A little joy, glazed.",
      description: "We make small-batch donuts with big-hearted ingredients. Every morning starts with slow-raised dough, real butter, and whatever delicious idea we can’t stop thinking about.",
      heroImageUrl: "illustration",
      heroImageAlt: "A freshly glazed strawberry donut with colorful sprinkles",
      storyImageUrl: "illustration",
      storyImageAlt: "A chocolate donut topped with colorful sprinkles",
      address: "214 Juniper Street, Portland, OR 97205",
      mapUrl: "https://maps.google.com/?q=214+Juniper+Street+Portland+OR+97205",
      phone: "(503) 555-0148",
      hours: [
        { day: "Monday – Friday", openTime: "7:00 AM", closeTime: "2:00 PM" },
        { day: "Saturday", openTime: "8:00 AM", closeTime: "3:00 PM" },
        { day: "Sunday", openTime: null, closeTime: null }
      ],
      orderingUrl: "https://www.doordash.com/"
    };

    const MENU_ITEMS = [
      { id: "cloud-nine", name: "Cloud Nine", description: "Our pillowy original, dipped in a silky vanilla bean glaze.", price: 3.25, category: "Glazed", imageUrl: "illustration", imageAlt: "Vanilla-glazed donut with rainbow sprinkles", dietaryTags: ["Vegetarian"], isFeatured: true, flavor: "vanilla" },
      { id: "berry-blush", name: "Berry Blush", description: "Strawberry icing, a little lemon zest, and a happy handful of sprinkles.", price: 3.75, category: "Seasonal", imageUrl: "illustration", imageAlt: "Pink strawberry-glazed donut with colorful sprinkles", dietaryTags: ["Vegetarian"], isFeatured: true, flavor: "berry" },
      { id: "midnight-crunch", name: "Midnight Crunch", description: "Dark chocolate glaze finished with crunchy cacao nibs.", price: 3.75, category: "Chocolate", imageUrl: "illustration", imageAlt: "Rich chocolate-glazed donut with bright sprinkles", dietaryTags: ["Vegan"], isFeatured: true, flavor: "chocolate" },
      { id: "maple-daydream", name: "Maple Daydream", description: "Warm maple glaze with toasted pecans and a pinch of sea salt.", price: 4.00, category: "Classic", imageUrl: "illustration", imageAlt: "Maple-glazed donut with toasted pecan pieces", dietaryTags: [], isFeatured: false, flavor: "maple" },
      { id: "lemon-cloud", name: "Lemon Cloud", description: "A sunny lemon curd center tucked inside a soft sugar-dusted shell.", price: 4.25, category: "Filled", imageUrl: "illustration", imageAlt: "Lemon-yellow filled donut with sugar dusting", dietaryTags: ["Vegetarian"], isFeatured: false, flavor: "lemon" },
      { id: "cinnamon-sugar", name: "Cinnamon Sugar", description: "Still-warm, golden, and rolled in our cozy house cinnamon sugar.", price: 3.25, category: "Classic", imageUrl: "illustration", imageAlt: "Golden cinnamon-sugar donut", dietaryTags: ["Vegan"], isFeatured: false, flavor: "cinnamon" },
      { id: "pistachio-petal", name: "Pistachio Petal", description: "Pistachio glaze, crushed nuts, and a little rose for the finish.", price: 4.25, category: "Seasonal", imageUrl: "illustration", imageAlt: "Pistachio-green glazed donut with nut sprinkles", dietaryTags: ["Vegetarian"], isFeatured: false, flavor: "pistachio" },
      { id: "choco-hazelnut", name: "Choco Hazelnut", description: "A generous hazelnut-chocolate filling under a glossy cocoa top.", price: 4.25, category: "Filled", imageUrl: "illustration", imageAlt: "Chocolate-topped donut filled with hazelnut cream", dietaryTags: [], isFeatured: false, flavor: "hazelnut" }
    ];

    const FLAVORS = {
      vanilla: { icing: "#f4d79e", accent: "#bf5776", sprinkles: ["#bb5272", "#5e8797", "#e49b44", "#7c9a68"] },
      berry: { icing: "#e88eaa", accent: "#ae4567", sprinkles: ["#fff0c4", "#694b70", "#f2c85c", "#5c8a72"] },
      chocolate: { icing: "#604037", accent: "#39251f", sprinkles: ["#efc55a", "#ee91a8", "#8cbd9a", "#fff0d4"] },
      maple: { icing: "#c8813f", accent: "#874d2e", sprinkles: ["#f0d298", "#5c392d", "#fff0d4", "#bb5272"] },
      lemon: { icing: "#f3d76c", accent: "#d2a632", sprinkles: ["#fff0d4", "#bb5272", "#6c9b74", "#e99252"] },
      cinnamon: { icing: "#d8a16d", accent: "#a96643", sprinkles: ["#f6dcad", "#875139", "#bb5272", "#f0bf56"] },
      pistachio: { icing: "#9db582", accent: "#67805d", sprinkles: ["#f5d88d", "#bb5272", "#f4eee2", "#745843"] },
      hazelnut: { icing: "#8a5743", accent: "#563526", sprinkles: ["#efc55a", "#e88eaa", "#f7e7c9", "#7d9a70"] }
    };

    function DonutArt({ flavor = "berry", alt = "", className = "" }) {
      const palette = FLAVORS[flavor] || FLAVORS.berry;
      const sprinkles = [
        [115, 83, -28], [157, 60, 19], [207, 60, -14], [253, 78, 36],
        [289, 112, -24], [274, 163, 20], [230, 194, -32], [183, 199, 18],
        [133, 181, -17], [103, 143, 32], [163, 105, 42], [222, 99, -35],
        [248, 142, 27], [196, 174, -12], [145, 143, 35], [224, 154, -24]
      ];
      return (
        <svg className={className} viewBox="0 0 400 260" role="img" aria-label={alt} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={"dough-" + flavor} x1="0" y1="0" x2="0.8" y2="1">
              <stop offset="0%" stopColor="#f4c98f" />
              <stop offset="100%" stopColor="#c9824e" />
            </linearGradient>
            <filter id={"shadow-" + flavor} x="-25%" y="-30%" width="150%" height="170%">
              <feDropShadow dx="0" dy="11" stdDeviation="9" floodColor="#57372b" floodOpacity=".2" />
            </filter>
          </defs>
          <g filter={"url(#shadow-" + flavor + ")"} transform="rotate(-7 200 130)">
            <path fill={"url(#dough-" + flavor + ")"} fillRule="evenodd" d="M200 32 C277 32 342 75 342 130 C342 185 277 228 200 228 C123 228 58 185 58 130 C58 75 123 32 200 32 Z M200 91 C226 91 247 108 247 130 C247 152 226 169 200 169 C174 169 153 152 153 130 C153 108 174 91 200 91 Z" />
            <path fill={palette.icing} fillRule="evenodd" d="M200 42 C270 42 329 81 329 130 C329 179 270 218 200 218 C130 218 71 179 71 130 C71 81 130 42 200 42 Z M200 96 C225 96 242 110 242 130 C242 150 225 164 200 164 C175 164 158 150 158 130 C158 110 175 96 200 96 Z" />
            <path d="M77 111 C94 105 103 120 116 117 C127 115 130 101 144 99" fill="none" stroke={palette.accent} strokeWidth="7" strokeLinecap="round" opacity=".55" />
            <path d="M255 65 C269 76 265 89 280 95 C292 100 304 91 316 102" fill="none" stroke={palette.accent} strokeWidth="6" strokeLinecap="round" opacity=".45" />
            {sprinkles.map(([x, y, angle], i) => (
              <rect key={i} x={x - 7} y={y - 3} width="14" height="6" rx="3"
                transform={`rotate(${angle} ${x} ${y})`} fill={palette.sprinkles[i % palette.sprinkles.length]} />
            ))}
          </g>
          <ellipse cx="200" cy="131" rx="34" ry="25" fill="none" stroke="rgba(89,49,35,.12)" strokeWidth="3" />
        </svg>
      );
    }

    function Icon({ name, className = "h-5 w-5" }) {
      const common = { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
      if (name === "arrow") return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
      if (name === "search") return <svg {...common}><circle cx="10.8" cy="10.8" r="6.6" /><path d="m16 16 4.2 4.2" /></svg>;
      if (name === "menu") return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
      if (name === "close") return <svg {...common}><path d="m6 6 12 12M18 6 6 18" /></svg>;
      if (name === "pin") return <svg {...common}><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.2" /></svg>;
      if (name === "phone") return <svg {...common}><path d="M7 3H5a2 2 0 0 0-2 2 16 16 0 0 0 16 16 2 2 0 0 0 2-2v-2l-4-2-2 2a13 13 0 0 1-6-6l2-2-2-4Z" /></svg>;
      if (name === "clock") return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
      return null;
    }

    function DonutCard({ item, compact = false }) {
      return (
        <article className={`group overflow-hidden rounded-[1.35rem] border border-[#eee4d9] bg-white shadow-soft transition duration-200 hover:-translate-y-1 hover:shadow-lift ${compact ? "" : ""}`}>
          <div className="relative overflow-hidden bg-[#f5e9df]">
            <DonutArt flavor={item.flavor} alt={item.imageAlt || item.name} className="block h-48 w-full transition duration-300 group-hover:scale-[1.03]" />
            {item.isFeatured && (
              <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold tracking-wide text-berry shadow-sm">★ HOUSE FAVORITE</span>
            )}
          </div>
          <div className="p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-xl font-bold leading-tight text-cocoa">{item.name}</h3>
              <span className="shrink-0 rounded-full bg-[#fbf3e8] px-3 py-1 text-sm font-bold text-cocoa">${item.price.toFixed(2)}</span>
            </div>
            <p className="mt-2 min-h-[3rem] text-sm leading-6 text-[#75645c]">{item.description}</p>
            {item.dietaryTags?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2" aria-label="Dietary information">
                {item.dietaryTags.map(tag => (
                  <span key={tag} className="rounded-full bg-[#edf1e8] px-2.5 py-1 text-xs font-semibold text-[#526648]">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </article>
      );
    }

    function App() {
      const [mobileOpen, setMobileOpen] = useState(false);
      const [query, setQuery] = useState("");
      const [category, setCategory] = useState("All");
      const [menuItems, setMenuItems] = useState(() => {
        try { return Array.isArray(MENU_ITEMS) ? MENU_ITEMS : null; }
        catch (error) { return null; }
      });
      const menuButtonRef = useRef(null);

      useEffect(() => {
        function handleKeyDown(event) {
          if (event.key === "Escape" && mobileOpen) {
            setMobileOpen(false);
            menuButtonRef.current?.focus();
          }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
      }, [mobileOpen]);

      const categories = useMemo(() => {
        if (!menuItems) return [];
        return ["All", ...new Set(menuItems.map(item => item.category).filter(Boolean))];
      }, [menuItems]);

      const normalizedQuery = query.trim().toLowerCase();
      const matches = useMemo(() => {
        if (!menuItems) return [];
        return menuItems.filter(item => {
          const categoryMatch = category === "All" || item.category === category;
          const searchMatch = !normalizedQuery ||
            item.name.toLowerCase().includes(normalizedQuery) ||
            item.description.toLowerCase().includes(normalizedQuery);
          return categoryMatch && searchMatch;
        });
      }, [menuItems, category, normalizedQuery]);

      const featuredItems = matches.filter(item => item.isFeatured);
      const hasFilters = category !== "All" || query.length > 0;
      const hasStory = Boolean(SHOP.description || SHOP.storyImageUrl);
      const hasVisit = Boolean(SHOP.address || SHOP.phone || (SHOP.hours && SHOP.hours.length));
      const navItems = [
        ...(menuItems?.length ? [{ label: "Menu", href: "#menu" }] : []),
        ...(hasStory ? [{ label: "Our story", href: "#story" }] : []),
        ...(hasVisit ? [{ label: "Find us", href: "#visit" }] : [])
      ];

      function clearFilters() {
        setCategory("All");
        setQuery("");
      }

      function closeMobileNav() {
        setMobileOpen(false);
      }

      function formatPhone(phone) {
        return `tel:${phone.replace(/[^\d+]/g, "")}`;
      }

      return (
        <div className="min-h-screen overflow-hidden">
          <header className="sticky top-0 z-40 border-b border-[#eee5da] bg-cream/95 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
              <a href="#top" className="flex items-center gap-2.5 rounded-lg" aria-label={`${SHOP.name} home`}>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-berry text-xl text-white" aria-hidden="true">✿</span>
                <span className="font-display text-lg font-bold tracking-tight text-cocoa sm:text-xl">{SHOP.name}</span>
              </a>
              <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
                {navItems.map(item => <a key={item.href} className="text-sm font-semibold text-[#6e5c53] transition hover:text-berry" href={item.href}>{item.label}</a>)}
                {SHOP.orderingUrl && <a href={SHOP.orderingUrl} target="_blank" rel="noreferrer" className="rounded-full bg-berry px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#a54162] active:scale-[.98]">Order online</a>}
              </nav>
              <button ref={menuButtonRef} type="button" className="grid h-11 w-11 place-items-center rounded-full border border-[#e8ddd2] text-cocoa transition hover:bg-white md:hidden"
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileOpen} aria-controls="mobile-navigation"
                onClick={() => setMobileOpen(open => !open)}>
                <Icon name={mobileOpen ? "close" : "menu"} />
              </button>
            </div>
            {mobileOpen && (
              <nav id="mobile-navigation" className="border-t border-[#eee5da] bg-cream px-5 pb-5 pt-3 md:hidden" aria-label="Mobile navigation">
                <div className="mx-auto flex max-w-7xl flex-col gap-1">
                  {navItems.map(item => <a key={item.href} onClick={closeMobileNav} className="rounded-xl px-3 py-3 font-semibold text-cocoa hover:bg-white" href={item.href}>{item.label}</a>)}
                  {SHOP.orderingUrl && <a onClick={closeMobileNav} href={SHOP.orderingUrl} target="_blank" rel="noreferrer" className="mt-2 flex items-center justify-center rounded-full bg-berry px-5 py-3 font-bold text-white">Order online <Icon name="arrow" className="ml-2 h-4 w-4" /></a>}
                </div>
              </nav>
            )}
          </header>

          <main id="top">
            <section className="mx-auto grid max-w-7xl items-center gap-8 px-5 pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-14 lg:grid-cols-2 lg:gap-12 lg:pb-24 lg:pt-16">
              <div className="order-2 lg:order-1">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#f4e8dc] px-4 py-2 text-xs font-bold uppercase tracking-[.14em] text-[#865d43]">
                  <span aria-hidden="true">✦</span> Small batches, big smiles
                </span>
                <h1 className="mt-5 max-w-xl font-display text-5xl font-bold leading-[1.05] tracking-[-.04em] text-cocoa sm:text-6xl lg:text-7xl">
                  {SHOP.name}<span className="text-berry">.</span>
                </h1>
                <p className="mt-4 font-display text-2xl italic text-berry sm:text-3xl">{SHOP.tagline}</p>
                <p className="mt-5 max-w-lg text-base leading-7 text-[#75645c] sm:text-lg sm:leading-8">
                  Fresh from the fryer, finished by hand, and made to turn an ordinary morning into your favorite part of the day.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  {SHOP.orderingUrl && (
                    <a href={SHOP.orderingUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-berry px-7 py-4 font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[#a54162] active:translate-y-0">
                      Order online <Icon name="arrow" />
                    </a>
                  )}
                  {menuItems?.length > 0 && <a href="#menu" className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#dfd1c4] px-7 py-4 font-bold text-cocoa transition hover:border-berry hover:bg-white">Explore the menu</a>}
                </div>
                <p className="mt-5 flex items-center gap-2 text-sm font-medium text-[#816e63]">
                  <span className="text-caramel" aria-hidden="true">✦</span> Made fresh every morning in Portland
                </p>
              </div>
              <div className="order-1 relative mx-auto w-full max-w-[560px] lg:order-2">
                <div className="absolute -left-3 top-8 h-20 w-20 rounded-full bg-[#f0d8d1] sm:-left-5 sm:h-28 sm:w-28" aria-hidden="true"></div>
                <div className="absolute -right-2 bottom-5 h-16 w-16 rounded-full bg-[#e8ebd9] sm:-right-4 sm:h-24 sm:w-24" aria-hidden="true"></div>
                <div className="relative overflow-hidden rounded-[2rem] border-[7px] border-white bg-[#f1e3d9] shadow-lift sm:rounded-[2.6rem] sm:border-[10px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#f4e8dc] via-[#f0ddd2] to-[#e9d5c7]" aria-hidden="true"></div>
                  <div className="absolute left-8 top-7 text-3xl text-white/80" aria-hidden="true">✦</div>
                  <div className="absolute right-9 top-12 text-xl text-berry/70" aria-hidden="true">✿</div>
                  <DonutArt flavor="berry" alt={SHOP.heroImageAlt} className="relative block aspect-[1.25/1] w-full scale-[1.08] sm:aspect-[1.28/1]" />
                  <div className="absolute bottom-4 left-4 rounded-2xl bg-white/90 px-4 py-3 shadow-sm backdrop-blur sm:bottom-6 sm:left-6">
                    <p className="text-xs font-bold uppercase tracking-[.13em] text-berry">The daily little joy</p>
                    <p className="mt-1 font-display text-lg font-bold text-cocoa">Baked with love, daily.</p>
                  </div>
                </div>
              </div>
            </section>

            {menuItems?.length > 0 && featuredItems.length > 0 && (
              <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-8 sm:pb-20" aria-labelledby="featured-heading">
                <div className="mb-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[.16em] text-berry">The ones we love</p>
                    <h2 id="featured-heading" className="mt-2 font-display text-3xl font-bold text-cocoa sm:text-4xl">Featured favorites</h2>
                  </div>
                  <a href="#menu" className="hidden items-center gap-2 pb-1 text-sm font-bold text-berry hover:text-[#963852] sm:inline-flex">See the full menu <Icon name="arrow" className="h-4 w-4" /></a>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {featuredItems.map(item => <DonutCard key={`featured-${item.id}`} item={item} compact />)}
                </div>
              </section>
            )}

            <section id="menu" className="scroll-mt-24 bg-[#f5eee5] py-14 sm:py-20" aria-labelledby="menu-heading">
              <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="mx-auto max-w-2xl text-center">
                  <p className="text-xs font-bold uppercase tracking-[.16em] text-berry">A very good reason to get up</p>
                  <h2 id="menu-heading" className="mt-2 font-display text-4xl font-bold tracking-tight text-cocoa sm:text-5xl">The donut menu</h2>
                  <p className="mt-3 text-[#75645c]">A little something for every kind of sweet tooth.</p>
                </div>

                {!menuItems ? (
                  <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-[#eadbd0] bg-white p-8 text-center" role="status">
                    <p className="font-display text-2xl font-bold text-cocoa">Our menu is taking a little breather.</p>
                    <p className="mt-2 text-[#75645c]">Please check back soon for the latest from the fryer.</p>
                  </div>
                ) : menuItems.length === 0 ? (
                  <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-[#eadbd0] bg-white p-8 text-center">
                    <p className="font-display text-2xl font-bold text-cocoa">Menu coming soon</p>
                    <p className="mt-2 text-[#75645c]">We’re dreaming up something delicious. Come back soon!</p>
                  </div>
                ) : (
                  <>
                    <div className="mx-auto mt-8 flex max-w-4xl flex-col gap-4">
                      <label className="relative block">
                        <span className="sr-only">Search donuts by name or description</span>
                        <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8d786c]" />
                        <input type="search" value={query} onChange={event => setQuery(event.target.value)}
                          placeholder="Find your new favorite..."
                          className="min-h-14 w-full rounded-2xl border border-[#e6d8cb] bg-white py-3 pl-12 pr-4 text-base text-cocoa shadow-sm placeholder:text-[#a18e82] focus:border-berry focus:outline-none focus:ring-2 focus:ring-berry/20" />
                      </label>
                      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filter donuts by category">
                        {categories.map(item => (
                          <button key={item} type="button" onClick={() => setCategory(item)}
                            aria-pressed={category === item}
                            className={`min-h-11 rounded-full px-4 py-2 text-sm font-bold transition active:scale-[.98] ${category === item ? "bg-cocoa text-white shadow-sm" : "border border-[#e2d3c6] bg-white text-[#66544a] hover:border-berry hover:text-berry"}`}>
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-b border-[#e4d8cc] pb-4">
                      <p className="text-sm font-semibold text-[#76645a]" aria-live="polite">
                        {matches.length} {matches.length === 1 ? "donut" : "donuts"} to make your day
                      </p>
                      {hasFilters && <button type="button" onClick={clearFilters} className="rounded-lg px-2 py-1 text-sm font-bold text-berry underline decoration-berry/40 underline-offset-4 hover:text-[#963852]">Clear filters</button>}
                    </div>

                    {matches.length === 0 ? (
                      <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-[#eadbd0] bg-white p-8 text-center">
                        <span className="text-3xl" aria-hidden="true">🍩</span>
                        <p className="mt-3 font-display text-2xl font-bold text-cocoa">No donuts match your search or filters</p>
                        <p className="mt-2 text-[#75645c]">Try another flavor or clear your filters to see everything.</p>
                        <button type="button" onClick={clearFilters} className="mt-5 rounded-full bg-berry px-5 py-3 font-bold text-white transition hover:bg-[#a54162]">Clear filters</button>
                      </div>
                    ) : (
                      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {matches.map(item => <DonutCard key={item.id} item={item} />)}
                      </div>
                    )}
                  </>
                )}
              </div>
            </section>

            {hasStory && (
              <section id="story" className="scroll-mt-24 mx-auto grid max-w-7xl items-center gap-8 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-14" aria-labelledby="story-heading">
                {SHOP.storyImageUrl && (
                  <div className="overflow-hidden rounded-[2rem] bg-[#eadbd0] shadow-soft">
                    <DonutArt flavor="chocolate" alt={SHOP.storyImageAlt || "A freshly made donut from Sugarcloud Donuts"} className="block aspect-[1.35/1] w-full" />
                  </div>
                )}
                <div className={SHOP.storyImageUrl ? "" : "mx-auto max-w-3xl text-center"}>
                  <p className="text-xs font-bold uppercase tracking-[.16em] text-berry">A little about us</p>
                  <h2 id="story-heading" className="mt-2 font-display text-4xl font-bold leading-tight text-cocoa sm:text-5xl">Good mornings start here.</h2>
                  <p className="mt-5 text-base leading-8 text-[#75645c]">{SHOP.description}</p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <span className="rounded-full bg-[#f3e6dc] px-4 py-2 text-sm font-semibold text-[#765641]">Small-batch, always</span>
                    <span className="rounded-full bg-[#edf0e6] px-4 py-2 text-sm font-semibold text-[#526648]">Made fresh daily</span>
                  </div>
                </div>
              </section>
            )}

            {hasVisit && (
              <section id="visit" className="scroll-mt-24 bg-[#3c2923] py-14 text-white sm:py-20" aria-labelledby="visit-heading">
                <div className="mx-auto max-w-7xl px-5 sm:px-8">
                  <div className="mb-8">
                    <p className="text-xs font-bold uppercase tracking-[.16em] text-[#f1b6c6]">Come say hello</p>
                    <h2 id="visit-heading" className="mt-2 font-display text-4xl font-bold sm:text-5xl">Find your happy place.</h2>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    {(SHOP.address || SHOP.phone) && (
                      <div className="rounded-[1.5rem] border border-white/10 bg-white/[.06] p-6 sm:p-8">
                        <div className="flex items-center gap-3">
                          <span className="grid h-11 w-11 place-items-center rounded-full bg-[#583c34] text-[#f2b9c8]"><Icon name="pin" /></span>
                          <h3 className="font-display text-2xl font-bold">Drop by</h3>
                        </div>
                        {SHOP.address && (
                          <a href={SHOP.mapUrl || `https://maps.google.com/?q=${encodeURIComponent(SHOP.address)}`} target="_blank" rel="noreferrer"
                            className="mt-5 inline-flex items-start gap-2 text-base leading-7 text-[#f5e8dd] underline decoration-white/30 underline-offset-4 transition hover:text-white">
                            <span>{SHOP.address}</span><Icon name="arrow" className="mt-1 h-4 w-4 shrink-0" />
                          </a>
                        )}
                        {SHOP.phone && (
                          <a href={formatPhone(SHOP.phone)} className="mt-4 flex min-h-11 items-center gap-2 font-semibold text-[#f1b6c6] transition hover:text-white">
                            <Icon name="phone" className="h-4 w-4" /> {SHOP.phone}
                          </a>
                        )}
                      </div>
                    )}
                    {SHOP.hours?.length > 0 && (
                      <div className="rounded-[1.5rem] border border-white/10 bg-white/[.06] p-6 sm:p-8">
                        <div className="flex items-center gap-3">
                          <span className="grid h-11 w-11 place-items-center rounded-full bg-[#583c34] text-[#f2b9c8]"><Icon name="clock" /></span>
                          <h3 className="font-display text-2xl font-bold">Opening hours</h3>
                        </div>
                        <dl className="mt-5 space-y-3">
                          {SHOP.hours.map((hours, index) => (
                            <div key={`${hours.day}-${index}`} className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                              <dt className="text-sm font-medium text-[#e8d9ce] sm:text-base">{hours.day}</dt>
                              <dd className="text-right text-sm font-semibold text-white sm:text-base">
                                {hours.openTime && hours.closeTime ? `${hours.openTime} – ${hours.closeTime}` : "Closed"}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}
          </main>

          <footer className="bg-[#30201c] px-5 py-7 text-center text-sm text-[#d6c5ba]">
            <p><span className="font-display font-bold text-white">{SHOP.name}</span> <span className="mx-1 text-berry">✿</span> A little joy, made fresh.</p>
            <a href="#top" className="mt-2 inline-block rounded-lg px-2 py-1 text-xs font-semibold text-[#e9d8ce] underline decoration-white/30 underline-offset-4 hover:text-white">Back to top</a>
          </footer>
        </div>
      );
    }

export default App;
