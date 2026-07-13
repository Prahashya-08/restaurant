import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle, CreditCard, Banknote, ShieldAlert, Sparkles, Loader2, Bike, UtensilsCrossed, CheckSquare, Gift } from 'lucide-react';
import { Button } from './ui/Button';
import { Skeleton } from './ui/Skeleton';
import confetti from 'canvas-confetti';

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  cartTotal,
  appliedPromo,
  onOrderSuccess
}) {
  const [step, setStep] = useState(1); // 1 = Form, 2 = Processing, 3 = Tracker
  
  // Form fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  
  // Validation errors
  const [errors, setErrors] = useState({});
  
  // Mock states
  const [processingStatus, setProcessingStatus] = useState("Securing connection...");
  const [trackerStep, setTrackerStep] = useState(0); // 0 = Confirmed, 1 = Preparing, 2 = En route, 3 = Delivered
  const [orderId, setOrderId] = useState("");
  
  const timerRef = useRef(null);

  // Validate fields
  const validateForm = () => {
    const tempErrors = {};
    if (!name.trim()) tempErrors.name = "Full Name is required";
    
    // 10 digit Indian phone validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phone.trim()) {
      tempErrors.phone = "Phone Number is required";
    } else if (!phoneRegex.test(phone.trim())) {
      tempErrors.phone = "Enter a valid 10-digit mobile number (starts with 6-9)";
    }
    
    if (!address.trim()) tempErrors.address = "Precise delivery address is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Submit Order Form
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Generate simulated order ID
    const randomId = `DESI-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(randomId);
    
    // Go to Processing phase
    setStep(2);

    // Simulate payment gateway loading sequence
    const statusMessages = [
      "Establishing encrypted connection...",
      "Validating delivery route...",
      "Authorizing simulated transaction...",
      "Securing slot with the Tandoor kitchen...",
      "Order placed successfully!"
    ];

    for (let i = 0; i < statusMessages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProcessingStatus(statusMessages[i]);
    }

    // Trigger celebration confetti
    triggerConfetti();

    // Advance to Live Tracker step
    setStep(3);

    // Pass details to parent to clear cart & record history
    if (onOrderSuccess) {
      onOrderSuccess({
        id: randomId,
        customer_name: name,
        customer_phone: phone,
        delivery_address: address,
        items: cart,
        total_amount: cartTotal,
        payment_method: paymentMethod,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }
  };

  // Launch celebratory confetti when order is approved
  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ea580c', '#f59e0b', '#10b981']
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ea580c', '#f59e0b', '#10b981']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  // Simulated live delivery tracker state advancement
  useEffect(() => {
    if (step === 3) {
      setTrackerStep(0);
      
      // Clear any prior interval
      if (timerRef.current) clearInterval(timerRef.current);
      
      // Auto-advance stages every 10 seconds for manual presentation
      timerRef.current = setInterval(() => {
        setTrackerStep(prev => {
          if (prev >= 3) {
            clearInterval(timerRef.current);
            return 3;
          }
          return prev + 1;
        });
      }, 10000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [step]);

  if (!isOpen) return null;

  // Render different views based on active checkout phase
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-sans">
      
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        onClick={step === 1 ? onClose : undefined} // Lock closure during payment processing
      />

      {/* Main Dialog Panel Container */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-charcoal-muted/10 mx-4 z-10 animate-scale-in max-h-[90vh] flex flex-col">
        
        {/* Close Button (only available in step 1 or step 3) */}
        {step !== 2 && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-xl text-charcoal hover:bg-cream-dark transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Scrollable Modal Contents */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8">

          {/* STEP 1: FORM INPUT */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-charcoal leading-none">Confirm Delivery</h3>
                <p className="text-xs text-charcoal-muted mt-1.5">Please provide your details to place the order.</p>
              </div>

              <form onSubmit={handleSubmitOrder} className="space-y-4">
                
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-charcoal-light">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors(prev => ({ ...prev, name: "" }));
                    }}
                    className={`w-full px-4 py-3 bg-cream/30 border rounded-xl text-sm focus:bg-white transition-all ${
                      errors.name ? 'border-red-500' : 'border-charcoal-muted/20'
                    }`}
                  />
                  {errors.name && <p className="text-[10px] text-red-500 font-semibold">{errors.name}</p>}
                </div>

                {/* Mobile Phone */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-charcoal-light">Mobile Number (Indian Format)</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-charcoal-muted font-bold select-none">+91</span>
                    <input
                      type="tel"
                      required
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value.replace(/\D/g, '').slice(0, 10)); // numeric only, limit to 10 digits
                        if (errors.phone) setErrors(prev => ({ ...prev, phone: "" }));
                      }}
                      className={`w-full pl-13 pr-4 py-3 bg-cream/30 border rounded-xl text-sm focus:bg-white transition-all ${
                        errors.phone ? 'border-red-500' : 'border-charcoal-muted/20'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-[10px] text-red-500 font-semibold">{errors.phone}</p>}
                </div>

                {/* Delivery Address */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-charcoal-light">Delivery Address</label>
                  <textarea
                    required
                    rows="3"
                    placeholder="Flat/House No., Building Name, Street Area, near Landmark (Sarjapura)"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      if (errors.address) setErrors(prev => ({ ...prev, address: "" }));
                    }}
                    className={`w-full px-4 py-3 bg-cream/30 border rounded-xl text-sm focus:bg-white transition-all resize-none ${
                      errors.address ? 'border-red-500' : 'border-charcoal-muted/20'
                    }`}
                  />
                  {errors.address && <p className="text-[10px] text-red-500 font-semibold">{errors.address}</p>}
                </div>

                {/* Payment Methods Toggle */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-charcoal-light">Select Payment Method</label>
                  <div className="grid grid-cols-3 gap-3">
                    
                    {/* UPI Option */}
                    <div
                      onClick={() => setPaymentMethod('upi')}
                      className={`cursor-pointer rounded-2xl border-2 p-3.5 flex flex-col items-center justify-center gap-1.5 transition-all text-center select-none ${
                        paymentMethod === 'upi'
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-charcoal-muted/10 bg-white text-charcoal-muted hover:bg-cream-dark'
                      }`}
                    >
                      <Sparkles className="w-5 h-5" />
                      <span className="text-[11px] font-black leading-none font-sans">UPI (GPay/Pe)</span>
                    </div>

                    {/* Card Option */}
                    <div
                      onClick={() => setPaymentMethod('card')}
                      className={`cursor-pointer rounded-2xl border-2 p-3.5 flex flex-col items-center justify-center gap-1.5 transition-all text-center select-none ${
                        paymentMethod === 'card'
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-charcoal-muted/10 bg-white text-charcoal-muted hover:bg-cream-dark'
                      }`}
                    >
                      <CreditCard className="w-5 h-5" />
                      <span className="text-[11px] font-black leading-none font-sans">Debit / Card</span>
                    </div>

                    {/* Cash Option */}
                    <div
                      onClick={() => setPaymentMethod('cod')}
                      className={`cursor-pointer rounded-2xl border-2 p-3.5 flex flex-col items-center justify-center gap-1.5 transition-all text-center select-none ${
                        paymentMethod === 'cod'
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-charcoal-muted/10 bg-white text-charcoal-muted hover:bg-cream-dark'
                      }`}
                    >
                      <Banknote className="w-5 h-5" />
                      <span className="text-[11px] font-black leading-none font-sans">Cash (COD)</span>
                    </div>

                  </div>
                </div>

                {/* Submit button */}
                <Button
                  variant="primary"
                  type="submit"
                  className="w-full rounded-2xl font-bold py-4 shadow-lg shadow-primary/20 text-sm mt-3"
                >
                  Place Order (₹{cartTotal})
                </Button>
              </form>
            </div>
          )}

          {/* STEP 2: PROCESSING SKELETON LOADER */}
          {step === 2 && (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
              
              {/* Spinning Loader Logo */}
              <div className="relative flex items-center justify-center w-20 h-20 bg-primary/5 rounded-full">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <span className="absolute text-2xl animate-pulse">🫓</span>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-black text-charcoal">Processing Payment</h4>
                <p className="text-xs text-charcoal-muted max-w-xs mx-auto animate-pulse font-sans font-semibold">
                  {processingStatus}
                </p>
              </div>

              {/* Pulsating skeleton block mimics checkout logs */}
              <div className="w-full bg-cream-dark border border-charcoal-muted/5 rounded-2xl p-4 text-left space-y-2.5 max-w-sm">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-5/6" />
              </div>
            </div>
          )}

          {/* STEP 3: SUCCESS & LIVE DELIVERY PROGRESS TRACKER */}
          {step === 3 && (
            <div className="space-y-6">
              
              {/* Success Banner */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-green-50 border border-green-200 rounded-full text-green-600 mb-2">
                  <CheckCircle className="w-8 h-8 fill-green-50 text-green-600 animate-scale-in" />
                </div>
                <h3 className="text-2xl font-black text-charcoal">Order Placed!</h3>
                <p className="text-xs text-charcoal-muted">
                  Your kitchen ticket is active. Order ID: <span className="font-extrabold text-charcoal font-mono">{orderId}</span>
                </p>
              </div>

              {/* Stepper Details card */}
              <div className="bg-cream-dark border border-charcoal-muted/15 rounded-3xl p-5 space-y-5">
                <h4 className="text-xs font-black tracking-wider text-charcoal-muted uppercase font-sans">Live Status</h4>
                
                {/* Stepper timeline */}
                <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-charcoal-muted/15">
                  
                  {/* Step 0: Confirmed */}
                  <div className="flex gap-4 relative">
                    <div className={`w-7.5 h-7.5 rounded-full flex items-center justify-center border-2 font-bold text-[11px] z-10 ${
                      trackerStep >= 0
                        ? 'bg-green-600 border-green-600 text-white'
                        : 'bg-white border-charcoal-muted/20 text-charcoal-muted'
                    }`}>
                      {trackerStep > 0 ? <CheckSquare className="w-3.5 h-3.5" /> : "1"}
                    </div>
                    <div>
                      <p className={`text-xs font-black leading-none ${trackerStep >= 0 ? 'text-charcoal' : 'text-charcoal-muted'}`}>Order Received</p>
                      <p className="text-[10px] text-charcoal-muted mt-1">Confirmed with Sarjapura kitchen.</p>
                    </div>
                  </div>

                  {/* Step 1: Cooking */}
                  <div className="flex gap-4 relative">
                    <div className={`w-7.5 h-7.5 rounded-full flex items-center justify-center border-2 font-bold text-[11px] z-10 ${
                      trackerStep >= 1
                        ? 'bg-green-600 border-green-600 text-white'
                        : trackerStep === 0
                        ? 'bg-primary border-primary text-white animate-pulse'
                        : 'bg-white border-charcoal-muted/20 text-charcoal-muted'
                    }`}>
                      {trackerStep > 1 ? <CheckSquare className="w-3.5 h-3.5" /> : <UtensilsCrossed className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <p className={`text-xs font-black leading-none ${trackerStep >= 1 ? 'text-charcoal' : trackerStep === 0 ? 'text-primary font-extrabold' : 'text-charcoal-muted'}`}>
                        Preparing Food {trackerStep === 0 && <span className="text-[9px] uppercase tracking-widest font-black text-primary ml-1.5 animate-pulse">(Active)</span>}
                      </p>
                      <p className="text-[10px] text-charcoal-muted mt-1">
                        {trackerStep === 0 && "Rolling fresh wheat parathas with premium butter..."}
                        {trackerStep >= 1 && "Fresh parathas stuffed and cooked in Ghee."}
                        {trackerStep < 0 && "Pending preparation start."}
                      </p>
                    </div>
                  </div>

                  {/* Step 2: En Route */}
                  <div className="flex gap-4 relative">
                    <div className={`w-7.5 h-7.5 rounded-full flex items-center justify-center border-2 font-bold text-[11px] z-10 ${
                      trackerStep >= 2
                        ? 'bg-green-600 border-green-600 text-white'
                        : trackerStep === 1
                        ? 'bg-primary border-primary text-white animate-pulse'
                        : 'bg-white border-charcoal-muted/20 text-charcoal-muted'
                    }`}>
                      {trackerStep > 2 ? <CheckSquare className="w-3.5 h-3.5" /> : <Bike className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <p className={`text-xs font-black leading-none ${trackerStep >= 2 ? 'text-charcoal' : trackerStep === 1 ? 'text-primary font-extrabold' : 'text-charcoal-muted'}`}>
                        Out for Delivery {trackerStep === 1 && <span className="text-[9px] uppercase tracking-widest font-black text-primary ml-1.5 animate-pulse">(Active)</span>}
                      </p>
                      <p className="text-[10px] text-charcoal-muted mt-1">
                        {trackerStep === 1 && "Rider is picking up your sealed hot package."}
                        {trackerStep >= 2 && "Rider Rajesh is en-route on Sarjapura Rd."}
                        {trackerStep < 1 && "Pending package pickup."}
                      </p>
                    </div>
                  </div>

                  {/* Step 3: Delivered */}
                  <div className="flex gap-4 relative">
                    <div className={`w-7.5 h-7.5 rounded-full flex items-center justify-center border-2 font-bold text-[11px] z-10 ${
                      trackerStep >= 3
                        ? 'bg-green-600 border-green-600 text-white animate-bounce'
                        : 'bg-white border-charcoal-muted/20 text-charcoal-muted'
                    }`}>
                      🎉
                    </div>
                    <div>
                      <p className={`text-xs font-black leading-none ${trackerStep >= 3 ? 'text-green-700 font-extrabold' : 'text-charcoal-muted'}`}>Delivered!</p>
                      <p className="text-[10px] text-charcoal-muted mt-1">
                        {trackerStep >= 3 ? "Order handed over. Enjoy your piping-hot parathas!" : "Delivery confirmation pending."}
                      </p>
                    </div>
                  </div>

                </div>

              </div>

              {/* Delivery charges and checkout details */}
              <div className="bg-white border border-charcoal-muted/10 rounded-2xl p-4 space-y-2.5 text-xs text-charcoal-muted">
                <div className="flex justify-between font-bold">
                  <span>Deliver To:</span>
                  <span className="text-charcoal font-sans max-w-[200px] truncate">{address}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Phone Number:</span>
                  <span className="text-charcoal font-mono">+91 {phone}</span>
                </div>
                <div className="flex justify-between font-bold border-t border-charcoal-muted/10 pt-2.5 text-charcoal text-sm">
                  <span>Total Amount Paid:</span>
                  <span className="text-primary font-black">₹{cartTotal} ({paymentMethod.toUpperCase()})</span>
                </div>
              </div>

              {/* Promo code confirmation if applied */}
              {appliedPromo && (
                <div className="bg-green-50 border border-green-200/50 rounded-2xl p-3 flex items-center gap-2 text-green-700 font-sans text-xs select-none">
                  <Gift className="w-4 h-4 text-green-600" />
                  <span>Coupon <span className="font-extrabold font-mono">{appliedPromo.code}</span> successfully applied to this order receipt!</span>
                </div>
              )}

              {/* Return to menu button */}
              <Button
                variant="secondary"
                onClick={onClose}
                className="w-full rounded-2xl font-bold py-3.5 text-sm shadow-md"
              >
                Go Back to Menu
              </Button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
