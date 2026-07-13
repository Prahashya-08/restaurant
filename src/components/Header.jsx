import React from 'react';
import { MapPin, ShoppingBag, Clock, Sparkles } from 'lucide-react';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

export default function Header({ cartCount, cartTotal, onCartClick }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-primary/5 glass-effect py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-amber-500 text-white shadow-md shadow-primary/20 transform hover:scale-105 transition-transform">
              <span className="font-extrabold text-xl font-sans">🫓</span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-charcoal font-sans">
                  Desi <span className="text-primary font-sans">parathas</span>
                </h1>
                <Badge variant="primary" className="hidden sm:inline-flex py-0.5 px-2">
                  <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                  <span className="font-sans text-[10px] uppercase font-bold tracking-wider">Tandoori Special</span>
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-charcoal-muted font-medium mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span className="truncate max-w-[150px] sm:max-w-none">Sarjapura - Attibele Rd, Bengaluru</span>
              </div>
            </div>
          </div>

          {/* Center Info Banner (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 bg-cream-dark px-3 py-1.5 rounded-xl border border-charcoal-muted/5">
              <Clock className="w-4 h-4 text-primary" />
              <div className="text-left">
                <p className="text-[11px] font-bold text-charcoal leading-none">OPEN DAILY</p>
                <p className="text-[10px] text-charcoal-muted mt-0.5 leading-none">4:00 PM – 10:30 PM</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-xl border border-green-200/40">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[11px] font-bold text-green-700">Kitchen is Active & Delivering</span>
            </div>
          </div>

          {/* Action Area: Cart & Hours */}
          <div className="flex items-center gap-3">
            <div className="sm:hidden flex items-center gap-1 bg-cream-dark px-2.5 py-1.5 rounded-lg text-charcoal-muted">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-bold">4 - 10:30 PM</span>
            </div>

            <Button
              variant="secondary"
              onClick={onCartClick}
              className="relative rounded-2xl flex items-center gap-2 px-4 shadow-sm hover:shadow active:scale-95 transition-all"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2.5 -right-2 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-charcoal animate-scale-in">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-bold">Cart</span>
              {cartCount > 0 && (
                <span className="hidden sm:inline border-l border-white/20 pl-2 text-primary-light font-bold text-xs">
                  ₹{cartTotal}
                </span>
              )}
            </Button>
          </div>

        </div>
      </div>
    </header>
  );
}
