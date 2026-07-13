import React, { useState, useMemo, useRef } from 'react';
import { Search, Flame, Star, Award, Check } from 'lucide-react';
import { Badge } from './ui/Badge';

export default function MenuSection({
  menuItems,
  isLoading,
  cart,
  onAddItem,
  onRemoveItem
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [vegFilter, setVegFilter] = useState(null); // null = all, true = veg, false = non-veg
  const [selectedSpicy, setSelectedSpicy] = useState(null); // null = all, 1 = mild, 2 = medium, 3 = hot
  
  const menuRef = useRef(null);

  // Group items by category to construct the category selector
  const categories = useMemo(() => {
    const list = new Set(menuItems.map(item => item.category));
    return ["All", ...Array.from(list)];
  }, [menuItems]);

  // Filter items based on search, category, veg/non-veg, and spicy filters
  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesVeg = vegFilter === null || item.is_veg === vegFilter;
      const matchesSpicy = selectedSpicy === null || item.spicy_level === selectedSpicy;
      
      return matchesSearch && matchesCategory && matchesVeg && matchesSpicy;
    });
  }, [menuItems, searchQuery, activeCategory, vegFilter, selectedSpicy]);

  // Helper to check current quantity of an item in the cart
  const getItemQty = (itemId) => {
    const cartItem = cart.find(i => i.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  // Render spicy indicators (chili icons)
  const renderSpicyLevel = (level) => {
    if (level === 0) return null;
    return (
      <div className="flex items-center gap-0.5" title={`Spicy Level: ${level}`}>
        {[...Array(level)].map((_, i) => (
          <Flame key={i} className="w-3.5 h-3.5 fill-red-500 text-red-500 animate-pulse" />
        ))}
      </div>
    );
  };

  return (
    <section ref={menuRef} id="menu" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Title Header */}
      <div className="mb-10 text-center md:text-left">
        <h3 className="text-3xl font-extrabold text-charcoal font-sans">
          Explore Our <span className="text-primary font-sans">Sizzling Menu</span>
        </h3>
        <p className="text-sm text-charcoal-muted mt-1 font-sans">
          Fresh, hygienic ingredients, hand-rolled with love & baked fresh per order.
        </p>
      </div>

      {/* Grid Layout: Left sidebar category list, Right main menu */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar (Sticky Categories) - Hidden on mobile, shown on LG+ */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-28 bg-white border border-charcoal-muted/10 rounded-2xl p-4 shadow-sm">
          <h4 className="text-xs font-black tracking-wider text-charcoal-muted uppercase mb-4 px-2 font-sans">Categories</h4>
          <nav className="space-y-1.5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 font-sans flex items-center justify-between group ${
                  activeCategory === category
                    ? 'bg-primary text-white shadow-md shadow-primary/10'
                    : 'text-charcoal hover:bg-cream-dark hover:translate-x-0.5'
                }`}
              >
                <span>{category}</span>
                {activeCategory === category && <Check className="w-4 h-4 text-white" />}
              </button>
            ))}
          </nav>
        </aside>

        {/* Right Main ordering content */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Filters Bar: Search Input & Badge Toggles */}
          <div className="bg-white border border-charcoal-muted/10 rounded-2xl p-4 shadow-sm space-y-4">
            
            {/* Search Input */}
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-muted" />
              <input
                type="text"
                placeholder="Search fresh parathas, lassis, raita..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-cream/50 border border-charcoal-muted/20 rounded-xl text-sm focus:border-primary focus:bg-white transition-all font-sans"
              />
            </div>

            {/* Mobile Category Bar (Horizontal Scrollable tags) */}
            <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl font-bold text-xs transition-colors font-sans ${
                    activeCategory === category
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-cream-dark text-charcoal border border-charcoal-muted/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Filter Toggle Badges (Veg, Non-Veg, Spicy Level) */}
            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-charcoal-muted/10">
              
              {/* Veg Toggle */}
              <button
                onClick={() => setVegFilter(vegFilter === true ? null : true)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  vegFilter === true
                    ? 'bg-green-50 text-green-700 border-green-400 shadow-sm'
                    : 'bg-white border-charcoal-muted/25 text-charcoal hover:bg-cream-dark'
                }`}
              >
                <span className="w-2.5 h-2.5 border border-green-600 flex items-center justify-center rounded-[2px] p-0.5">
                  <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                </span>
                <span>Veg Only</span>
              </button>

              {/* Non-Veg Toggle */}
              <button
                onClick={() => setVegFilter(vegFilter === false ? null : false)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  vegFilter === false
                    ? 'bg-red-50 text-red-700 border-red-400 shadow-sm'
                    : 'bg-white border-charcoal-muted/25 text-charcoal hover:bg-cream-dark'
                }`}
              >
                <span className="w-2.5 h-2.5 border border-red-600 flex items-center justify-center rounded-[2px] p-0.5">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                </span>
                <span>Non-Veg Only</span>
              </button>

              {/* Spice levels */}
              <div className="h-5 w-[1px] bg-charcoal-muted/15 mx-1 hidden sm:block"></div>
              
              <span className="text-[11px] font-bold text-charcoal-muted uppercase tracking-wider hidden sm:inline">Spicy:</span>

              {[
                { label: 'Mild', level: 1 },
                { label: 'Medium', level: 2 },
                { label: 'Spicy', level: 3 }
              ].map((spice) => (
                <button
                  key={spice.level}
                  onClick={() => setSelectedSpicy(selectedSpicy === spice.level ? null : spice.level)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                    selectedSpicy === spice.level
                      ? 'bg-primary/10 text-primary border-primary'
                      : 'bg-white border-charcoal-muted/25 text-charcoal hover:bg-cream-dark'
                  }`}
                >
                  {spice.label}
                </button>
              ))}

              {/* Clear Filters (if any are active) */}
              {(vegFilter !== null || selectedSpicy !== null || searchQuery !== "" || activeCategory !== "All") && (
                <button
                  onClick={() => {
                    setVegFilter(null);
                    setSelectedSpicy(null);
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  className="text-xs text-primary font-bold hover:underline ml-auto font-sans"
                >
                  Clear Filters
                </button>
              )}
            </div>

          </div>

          {/* Menu Items Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white border border-charcoal-muted/5 rounded-2xl p-4 flex gap-4 h-40">
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-charcoal-muted/10 rounded w-2/3"></div>
                    <div className="h-3 bg-charcoal-muted/10 rounded w-5/6"></div>
                    <div className="h-3 bg-charcoal-muted/10 rounded w-1/2"></div>
                  </div>
                  <div className="w-28 h-28 bg-charcoal-muted/10 rounded-xl"></div>
                </div>
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-white border border-charcoal-muted/10 rounded-2xl">
              <span className="text-4xl">🫓</span>
              <h5 className="text-lg font-bold text-charcoal mt-3 font-sans">No delicacies found</h5>
              <p className="text-xs text-charcoal-muted mt-1 max-w-sm mx-auto font-sans">
                Try clearing your filters or search keywords to view our gourmet stuffed paratha menu.
              </p>
              <button
                onClick={() => {
                  setVegFilter(null);
                  setSelectedSpicy(null);
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="mt-4 text-xs bg-primary text-white font-bold px-4 py-2 rounded-xl"
              >
                Reset Menu View
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredItems.map((item) => {
                const qty = getItemQty(item.id);
                return (
                  <div
                    key={item.id}
                    className="bg-white border border-charcoal-muted/10 rounded-2xl p-4 flex gap-4 hover:shadow-md hover:border-primary/20 transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Left: Food description */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        
                        {/* Tags (Veg Indicator & Spicy) */}
                        <div className="flex items-center gap-2">
                          {/* Authentic Veg/Non-Veg Symbol */}
                          <span
                            className={`w-4 h-4 border-2 flex items-center justify-center rounded-[3px] p-0.5 flex-shrink-0 ${
                              item.is_veg ? 'border-green-600' : 'border-red-600'
                            }`}
                            title={item.is_veg ? 'Veg' : 'Non-Veg'}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${item.is_veg ? 'bg-green-600' : 'bg-red-600'}`}></span>
                          </span>
                          
                          {/* Rating and spicy */}
                          {item.is_popular && (
                            <Badge variant="primary" className="py-0 px-2 text-[9px] font-bold uppercase tracking-wider">
                              <Award className="w-2.5 h-2.5 text-primary" />
                              <span>Bestseller</span>
                            </Badge>
                          )}
                          {renderSpicyLevel(item.spicy_level)}
                        </div>

                        {/* Title */}
                        <h4 className="text-base font-extrabold text-charcoal font-sans leading-tight">
                          {item.name}
                        </h4>

                        {/* Price */}
                        <p className="text-sm font-extrabold text-charcoal font-sans">
                          ₹{item.price}
                        </p>

                        {/* Description */}
                        <p className="text-xs text-charcoal-muted leading-relaxed font-sans line-clamp-2" title={item.description}>
                          {item.description}
                        </p>
                      </div>

                      {/* Small Star rating */}
                      <div className="flex items-center gap-1 mt-2.5 text-xs font-bold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span>{item.rating}</span>
                        <span className="text-[10px] text-charcoal-muted font-normal">({item.reviews_count} orders)</span>
                      </div>
                    </div>

                    {/* Right: Picture & Add button */}
                    <div className="w-28 flex flex-col items-center justify-center relative flex-shrink-0">
                      
                      {/* Image Frame */}
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-charcoal-muted/5 relative shadow-sm">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"></div>
                      </div>

                      {/* ADD Button wrapper - floating bottom center overlay */}
                      <div className="absolute -bottom-2 z-10 w-24 sm:w-28 px-1">
                        {qty === 0 ? (
                          <button
                            onClick={() => onAddItem(item)}
                            className="w-full py-1.5 bg-white border border-primary/40 rounded-xl text-primary font-black text-xs uppercase shadow hover:bg-primary/5 hover:border-primary active:scale-95 transition-all flex items-center justify-center gap-1"
                          >
                            <span>ADD</span>
                            <span className="text-[10px] text-primary/70 font-semibold">+</span>
                          </button>
                        ) : (
                          <div className="w-full py-1.5 bg-primary rounded-xl text-white font-black text-xs shadow flex items-center justify-between px-2.5 transform scale-105 duration-200">
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="w-4 h-4 flex items-center justify-center text-white/80 hover:text-white text-sm font-bold active:scale-75 transition-all select-none"
                            >
                              -
                            </button>
                            <span className="w-4 text-center font-black select-none text-xs leading-none">
                              {qty}
                            </span>
                            <button
                              onClick={() => onAddItem(item)}
                              className="w-4 h-4 flex items-center justify-center text-white/80 hover:text-white text-sm font-bold active:scale-75 transition-all select-none"
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </main>
      </div>

    </section>
  );
}
