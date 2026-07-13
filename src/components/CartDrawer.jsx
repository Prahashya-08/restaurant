import React, { useState, useMemo } from 'react';
import { X, Trash2, ShoppingCart, Percent, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from './ui/Button';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onAddItem,
  onRemoveItem,
  onClearItem,
  onCheckoutClick,
  appliedPromo,
  onApplyPromo,
  onRemovePromo
}) {
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");

  const PACKING_CHARGES = 25;
  const DELIVERY_LIMIT = 299;
  
  // Calculate raw subtotal
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

  // Determine delivery charge (free above a certain threshold)
  const deliveryCharge = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal >= DELIVERY_LIMIT ? 0 : 39;
  }, [subtotal]);

  // Calculate discount based on active promo
  const discountDetails = useMemo(() => {
    if (!appliedPromo || subtotal === 0) return { amount: 0, text: "" };
    
    if (appliedPromo.code === 'PARATHA20') {
      const amt = Math.min(Math.round(subtotal * 0.20), 80); // 20% off up to ₹80
      return { amount: amt, text: "20% off (Max ₹80)" };
    }
    if (appliedPromo.code === 'DESITREAT') {
      const amt = Math.min(Math.round(subtotal * 0.15), 150); // 15% off up to ₹150
      return { amount: amt, text: "15% off (Max ₹150)" };
    }
    if (appliedPromo.code === 'FREECHAACH') {
      return { amount: 49, text: "Free Masala Chaach (Worth ₹49)" };
    }
    
    return { amount: 0, text: "" };
  }, [appliedPromo, subtotal]);

  // Calculate GST (5% of subtotal)
  const gst = useMemo(() => {
    return Math.round((subtotal - discountDetails.amount) * 0.05);
  }, [subtotal, discountDetails.amount]);

  // Calculate grand total
  const grandTotal = useMemo(() => {
    if (subtotal === 0) return 0;
    const val = subtotal - discountDetails.amount + PACKING_CHARGES + deliveryCharge + gst;
    return Math.max(val, 0);
  }, [subtotal, discountDetails.amount, deliveryCharge, gst]);

  // Handle manual code entry
  const handleApplyPromoCode = (codeToApply) => {
    const code = (codeToApply || promoInput).trim().toUpperCase();
    if (!code) return;

    if (code === 'PARATHA20') {
      onApplyPromo({ code: 'PARATHA20', title: 'PARATHA20 Applied!' });
      setPromoError("");
      setPromoInput("");
    } else if (code === 'DESITREAT') {
      if (subtotal < 349) {
        setPromoError("This coupon requires a minimum cart value of ₹349");
      } else {
        onApplyPromo({ code: 'DESITREAT', title: 'DESITREAT Applied!' });
        setPromoError("");
        setPromoInput("");
      }
    } else if (code === 'FREECHAACH') {
      if (subtotal < 199) {
        setPromoError("This coupon requires a minimum cart value of ₹199");
      } else {
        onApplyPromo({ code: 'FREECHAACH', title: 'FREECHAACH Applied!' });
        setPromoError("");
        setPromoInput("");
      }
    } else {
      setPromoError("Invalid promo code. Try PARATHA20!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      
      {/* Background Backdrop Overlay */}
      <div
        className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        {/* Panel container - Responsive: Full screen on mobile, right panel on desktop */}
        <div className="w-screen max-w-md bg-cream flex flex-col shadow-2xl border-l border-charcoal-muted/10 transform transition-transform duration-300 translate-x-0 animate-slide-in">
          
          {/* Header */}
          <div className="px-5 py-4 border-b border-charcoal-muted/10 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-black text-charcoal">Your Food Basket</h3>
              <span className="bg-primary/10 text-primary text-[11px] font-bold px-2 py-0.5 rounded-full">
                {cart.length} Item{cart.length !== 1 && 's'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-xl text-charcoal hover:bg-cream-dark transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center text-4xl">
                  🛒
                </div>
                <div>
                  <h4 className="text-base font-bold text-charcoal">Your cart is empty</h4>
                  <p className="text-xs text-charcoal-muted mt-1 max-w-xs mx-auto">
                    Fill your basket with steaming hot stuffed parathas, chilled lassi, and local sides!
                  </p>
                </div>
                <Button variant="primary" size="sm" onClick={onClose} className="rounded-xl font-bold">
                  Browse Menu Now
                </Button>
              </div>
            ) : (
              <>
                {/* List of items */}
                <div className="space-y-4 bg-white border border-charcoal-muted/15 rounded-2xl p-4 shadow-sm">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-start justify-between gap-3 pb-4 border-b border-charcoal-muted/5 last:pb-0 last:border-b-0">
                      
                      {/* Name / Price */}
                      <div className="flex-1 space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-3.5 h-3.5 border flex items-center justify-center rounded-[2px] p-0.5 flex-shrink-0 ${
                            item.is_veg ? 'border-green-600' : 'border-red-600'
                          }`}>
                            <span className={`w-1 h-1 rounded-full ${item.is_veg ? 'bg-green-600' : 'bg-red-600'}`}></span>
                          </span>
                          <span className="text-xs font-black text-charcoal line-clamp-1">{item.name}</span>
                        </div>
                        <p className="text-xs font-bold text-charcoal-muted">₹{item.price} each</p>
                        <p className="text-xs font-black text-primary">Subtotal: ₹{item.price * item.quantity}</p>
                      </div>

                      {/* Quantity Controller & Delete */}
                      <div className="flex items-center gap-2">
                        <div className="bg-cream-dark border border-charcoal-muted/10 rounded-xl px-2.5 py-1.5 flex items-center gap-3">
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-charcoal hover:text-primary font-bold text-xs active:scale-75 transition-all select-none"
                          >
                            -
                          </button>
                          <span className="text-xs font-extrabold w-4 text-center select-none text-charcoal">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onAddItem(item)}
                            className="text-charcoal hover:text-primary font-bold text-xs active:scale-75 transition-all select-none"
                          >
                            +
                          </button>
                        </div>
                        
                        <button
                          onClick={() => onClearItem(item.id)}
                          className="p-2 text-charcoal-muted hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

                {/* Promo Code Accordion */}
                <div className="bg-white border border-charcoal-muted/15 rounded-2xl p-4 shadow-sm space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-charcoal">
                    <Percent className="w-4 h-4 text-primary" />
                    <span>Apply Special Coupons</span>
                  </div>

                  {appliedPromo ? (
                    <div className="flex items-center justify-between bg-green-50 text-green-700 px-3 py-2 rounded-xl border border-green-200/50">
                      <div>
                        <p className="text-xs font-extrabold">{appliedPromo.code}</p>
                        <p className="text-[10px] text-green-600 mt-0.5">{discountDetails.text}</p>
                      </div>
                      <button
                        onClick={onRemovePromo}
                        className="text-xs font-black text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter Promo Code"
                          value={promoInput}
                          onChange={(e) => {
                            setPromoInput(e.target.value);
                            setPromoError("");
                          }}
                          className="flex-1 px-3 py-2 bg-cream/50 border border-charcoal-muted/20 rounded-xl text-xs uppercase"
                        />
                        <button
                          onClick={() => handleApplyPromoCode()}
                          className="px-4 bg-charcoal text-white hover:bg-charcoal-light font-bold text-xs rounded-xl transition-all"
                        >
                          Apply
                        </button>
                      </div>

                      {promoError && (
                        <p className="text-[10px] text-red-500 font-semibold">{promoError}</p>
                      )}

                      {/* Recommend Promo code Pills */}
                      <div className="space-y-1.5 pt-1.5">
                        
                        {/* PARATHA20 */}
                        <div
                          onClick={() => handleApplyPromoCode('PARATHA20')}
                          className="flex items-center justify-between p-2 rounded-xl border border-dashed border-charcoal-muted/20 hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-colors"
                        >
                          <div>
                            <span className="text-[10px] font-black text-primary bg-primary/10 border border-primary/25 px-1.5 py-0.5 rounded">
                              PARATHA20
                            </span>
                            <span className="text-[10px] text-charcoal-muted ml-2">Flat 20% off up to ₹80</span>
                          </div>
                          <span className="text-[10px] font-bold text-primary hover:underline">Apply</span>
                        </div>

                        {/* DESITREAT */}
                        <div
                          onClick={() => handleApplyPromoCode('DESITREAT')}
                          className={`flex items-center justify-between p-2 rounded-xl border border-dashed border-charcoal-muted/20 hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-colors ${
                            subtotal < 349 ? 'opacity-65' : ''
                          }`}
                        >
                          <div>
                            <span className="text-[10px] font-black text-primary bg-primary/10 border border-primary/25 px-1.5 py-0.5 rounded">
                              DESITREAT
                            </span>
                            <span className="text-[10px] text-charcoal-muted ml-2">15% Off (Above ₹349, Max ₹150)</span>
                          </div>
                          <span className="text-[10px] font-bold text-primary hover:underline">Apply</span>
                        </div>

                        {/* FREECHAACH */}
                        <div
                          onClick={() => handleApplyPromoCode('FREECHAACH')}
                          className={`flex items-center justify-between p-2 rounded-xl border border-dashed border-charcoal-muted/20 hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-colors ${
                            subtotal < 199 ? 'opacity-65' : ''
                          }`}
                        >
                          <div>
                            <span className="text-[10px] font-black text-primary bg-primary/10 border border-primary/25 px-1.5 py-0.5 rounded">
                              FREECHAACH
                            </span>
                            <span className="text-[10px] text-charcoal-muted ml-2">Free Chaach (Above ₹199)</span>
                          </div>
                          <span className="text-[10px] font-bold text-primary hover:underline">Apply</span>
                        </div>

                      </div>
                    </div>
                  )}
                </div>

                {/* Bill Details */}
                <div className="bg-white border border-charcoal-muted/15 rounded-2xl p-4 shadow-sm space-y-2 text-xs font-semibold">
                  <h4 className="text-[10px] font-black tracking-wider text-charcoal-muted uppercase mb-2">Bill Summary</h4>
                  
                  {/* Subtotal */}
                  <div className="flex justify-between text-charcoal">
                    <span>Cart Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>

                  {/* Promo discount */}
                  {appliedPromo && (
                    <div className="flex justify-between text-green-700">
                      <span>Promo discount ({appliedPromo.code})</span>
                      <span>-₹{discountDetails.amount}</span>
                    </div>
                  )}

                  {/* Packing fee */}
                  <div className="flex justify-between text-charcoal">
                    <span>Restaurant Packing Charges</span>
                    <span>₹{PACKING_CHARGES}</span>
                  </div>

                  {/* Delivery charge */}
                  <div className="flex justify-between text-charcoal">
                    <span>Delivery Charges</span>
                    {deliveryCharge === 0 ? (
                      <span className="text-green-700 font-bold">FREE</span>
                    ) : (
                      <span>₹{deliveryCharge}</span>
                    )}
                  </div>

                  {/* Taxes (GST) */}
                  <div className="flex justify-between text-charcoal">
                    <span>Govt Taxes & GST (5%)</span>
                    <span>₹{gst}</span>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-charcoal-muted/10 my-2 pt-2 flex justify-between text-charcoal text-sm font-black">
                    <span>Grand Total</span>
                    <span className="text-primary">₹{grandTotal}</span>
                  </div>

                  {/* Free Delivery Promo Progress Bar */}
                  {subtotal < DELIVERY_LIMIT && (
                    <div className="bg-primary/5 rounded-xl p-3 border border-primary/10 text-[11px] mt-2 font-medium text-charcoal-muted">
                      Add <span className="font-bold text-primary">₹{DELIVERY_LIMIT - subtotal}</span> more for <span className="font-bold text-green-700">FREE Delivery</span>!
                      <div className="w-full bg-cream-dark h-1.5 rounded-full mt-1.5 overflow-hidden">
                        <div
                          className="bg-primary h-full transition-all duration-300"
                          style={{ width: `${(subtotal / DELIVERY_LIMIT) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Safety Badge */}
                <div className="flex items-center justify-center gap-2 text-[10px] text-charcoal-muted font-bold py-1 select-none">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <span>100% Safe & Sealed Deliveries Only</span>
                </div>
              </>
            )}
          </div>

          {/* Footer containing Checkout Button */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-charcoal-muted/10 bg-white">
              <Button
                variant="primary"
                onClick={onCheckoutClick}
                className="w-full rounded-2xl flex items-center justify-between font-bold px-6 shadow-lg shadow-primary/20 hover:scale-[1.01] duration-150"
              >
                <span>Proceed to Checkout</span>
                <span className="flex items-center gap-1.5">
                  <span>₹{grandTotal}</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
