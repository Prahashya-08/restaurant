import React, { useState, useEffect, useMemo } from 'react';
import { supabase, isMock } from './supabaseClient';
import Header from './components/Header';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import { ShoppingBag, ChevronRight, X, AlertCircle, CheckCircle2, RefreshCw, Star, MapPin } from 'lucide-react';
import { Button } from './components/ui/Button';
import { Badge } from './components/ui/Badge';

export default function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Cart & UI control states
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('desi_parathas_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState(null);
  
  // Toast notifications state
  const [toasts, setToasts] = useState([]);
  
  // Order history
  const [orderHistory, setOrderHistory] = useState(() => {
    const saved = localStorage.getItem('desi_parathas_orders_history');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('desi_parathas_cart', JSON.stringify(cart));
  }, [cart]);

  // Persist order history to localStorage
  useEffect(() => {
    localStorage.setItem('desi_parathas_orders_history', JSON.stringify(orderHistory));
  }, [orderHistory]);

  // Fetch menu data from Supabase client
  useEffect(() => {
    async function loadMenu() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.from('menu_items').select('*');
        if (error) throw error;
        setMenuItems(data || []);
      } catch (err) {
        console.error("Failed to load menu items:", err);
        showToast("Error linking to server. Loading backup menu.", "error");
      } finally {
        setIsLoading(false);
      }
    }
    loadMenu();
  }, []);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    const id = `toast-${Math.random().toString(36).substr(2, 9)}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  // Cart Handlers
  const handleAddItem = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      showToast(`${item.name} added to your plate!`);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleRemoveItem = (id) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (!existing) return prev;
      if (existing.quantity === 1) {
        showToast(`Removed ${existing.name} from basket`, 'info');
        return prev.filter(i => i.id !== id);
      }
      return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
    });
  };

  const handleClearItem = (id) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing) {
        showToast(`Removed ${existing.name} from basket`, 'info');
      }
      return prev.filter(i => i.id !== id);
    });
  };

  // Memoized Cart calculations
  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const cartTotal = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;
    if (appliedPromo) {
      if (appliedPromo.code === 'PARATHA20') {
        discount = Math.min(Math.round(subtotal * 0.20), 80);
      } else if (appliedPromo.code === 'DESITREAT') {
        discount = Math.min(Math.round(subtotal * 0.15), 150);
      } else if (appliedPromo.code === 'FREECHAACH') {
        discount = 49;
      }
    }
    const packing = subtotal > 0 ? 25 : 0;
    const delivery = subtotal === 0 || subtotal >= 299 ? 0 : 39;
    const gst = Math.round((subtotal - discount) * 0.05);
    return Math.max(subtotal - discount + packing + delivery + gst, 0);
  }, [cart, appliedPromo]);

  // Order Placement Success Handler
  const handleOrderSuccess = async (completedOrder) => {
    // Save to server database via Supabase client
    try {
      const { error } = await supabase.from('orders').insert([completedOrder]);
      if (error) throw error;
      showToast("Order registered in Supabase database!");
    } catch (err) {
      console.warn("Failed to insert order into Supabase, saved to LocalStorage history instead:", err);
      showToast("Database link offline. Saved order offline.", "warning");
    }

    // Save to history
    setOrderHistory(prev => [completedOrder, ...prev]);
    
    // Reset Cart
    setCart([]);
    setAppliedPromo(null);
  };

  // Scroll to menu section smooth helper
  const scrollToMenu = () => {
    const el = document.getElementById("menu");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleCombosView = () => {
    const el = document.getElementById("menu");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      // Trigger Specials or show combos
      showToast("Viewing Special Stuffed Parathas and Drinks!");
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col relative">
      
      {/* Toast Alert overlay notifications */}
      <div className="fixed bottom-20 sm:bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-2xl shadow-xl border text-xs font-bold transition-all duration-300 animate-scale-in ${
              toast.type === 'error'
                ? 'bg-red-50 text-red-800 border-red-200'
                : toast.type === 'warning'
                ? 'bg-amber-50 text-amber-800 border-amber-200'
                : 'bg-charcoal text-white border-white/10'
            }`}
          >
            <div className="flex items-center gap-2">
              {toast.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
              )}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
              className="ml-4 hover:opacity-70 transition-opacity"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Sticky Premium Header */}
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Main Container Content */}
      <main className="flex-grow">
        
        {/* Banner notifying if running in Simulated local storage mode */}
        {isMock && (
          <div className="bg-amber-500/10 border-b border-amber-500/15 py-1.5 px-4 text-center select-none">
            <p className="text-[10px] sm:text-xs font-bold text-amber-800 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping"></span>
              <span>Supabase offline fallback active. Database is simulated in LocalStorage.</span>
            </p>
          </div>
        )}

        {/* Hero Section */}
        <Hero
          onOrderNowClick={scrollToMenu}
          onViewCombosClick={handleCombosView}
        />

        {/* Dynamic menu list section */}
        <MenuSection
          menuItems={menuItems}
          isLoading={isLoading}
          cart={cart}
          onAddItem={handleAddItem}
          onRemoveItem={handleRemoveItem}
        />

        {/* Order History Showcase (High-converting social trust element) */}
        {orderHistory.length > 0 && (
          <section className="bg-cream-dark/50 border-t border-charcoal-muted/10 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="text-xl font-black text-charcoal mb-6 flex items-center gap-2 font-sans">
                <span>Your Past Orders</span>
                <span className="bg-charcoal/10 text-charcoal text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {orderHistory.length}
                </span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {orderHistory.slice(0, 3).map((order) => (
                  <div
                    key={order.id}
                    className="bg-white border border-charcoal-muted/10 rounded-2xl p-4 shadow-sm space-y-3"
                  >
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-charcoal-muted font-mono">{order.id}</span>
                      <Badge variant="veg" className="py-0.5 px-2">Delivered</Badge>
                    </div>
                    
                    <div className="text-xs font-semibold text-charcoal space-y-1">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span className="text-charcoal-muted line-clamp-1">{item.name} x {item.quantity}</span>
                          <span>₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-charcoal-muted/5 pt-2 flex justify-between items-center text-xs font-bold">
                      <span className="text-charcoal-muted">Total Paid</span>
                      <span className="text-primary font-black text-sm">₹{order.total_amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-charcoal text-white border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-4">
            <h4 className="text-lg font-black text-white font-sans">Desi parathas</h4>
            <p className="text-xs text-charcoal-muted leading-relaxed font-sans max-w-sm">
              Premium tandoori and tawa flatbreads served sizzling-hot. Fresh ingredients, high-hygiene standards, and traditional recipe preparations.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-black tracking-wider uppercase text-white font-sans">Store Location</h4>
            <p className="text-xs text-charcoal-muted flex items-center gap-2 font-sans">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Sarjapura - Attibele Rd, Bangalore, Karnataka</span>
            </p>
            <p className="text-xs text-charcoal-muted font-sans">
              Open daily: 4:00 PM – 10:30 PM
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-black tracking-wider uppercase text-white font-sans">Contact & Support</h4>
            <p className="text-xs text-charcoal-muted font-sans">
              Phone: +91 98765 43210 <br />
              Email: hello@desiparathas.com
            </p>
            <p className="text-[10px] text-charcoal-muted mt-4 font-sans">
              © {new Date().getFullYear()} Desi parathas. All rights reserved.
            </p>
          </div>

        </div>
      </footer>

      {/* Persistent Mobile Bottom Sticky View Cart Bar */}
      {cartCount > 0 && !isCartOpen && (
        <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40 animate-slide-up">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-primary hover:bg-primary-dark text-white rounded-2xl shadow-xl p-4 flex items-center justify-between font-sans border border-primary/20 transform active:scale-98 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl text-white">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-black">{cartCount} Item{cartCount !== 1 && 's'} Added</p>
                <p className="text-[10px] text-primary-light font-bold">₹{cartTotal} • Taxes/fees breakdown inside</p>
              </div>
            </div>
            <div className="flex items-center gap-1 font-black text-sm">
              <span>View Cart</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}

      {/* Cart Slider Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onAddItem={handleAddItem}
        onRemoveItem={handleRemoveItem}
        onClearItem={handleClearItem}
        appliedPromo={appliedPromo}
        onApplyPromo={(promo) => {
          setAppliedPromo(promo);
          showToast(`Coupon ${promo.code} applied successfully!`);
        }}
        onRemovePromo={() => {
          setAppliedPromo(null);
          showToast("Coupon removed", "info");
        }}
        onCheckoutClick={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout step-by-step Dialog Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        cartTotal={cartTotal}
        appliedPromo={appliedPromo}
        onOrderSuccess={handleOrderSuccess}
      />

    </div>
  );
}
